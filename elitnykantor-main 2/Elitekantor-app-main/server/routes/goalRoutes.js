const express = require('express');
const db = require('../db');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, (req, res) => {
  const userId = req.user.userId;
  db.all(
    'SELECT * FROM SAVINGS_GOALS WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Błąd bazy danych' });
      res.json(rows);
    }
  );
});

router.post('/', auth, (req, res) => {
  const userId = req.user.userId;
  const { title, targetAmount, dueDate } = req.body;

  if (!title || !targetAmount || targetAmount <= 0) {
    return res.status(400).json({ message: 'Błędne dane wejściowe' });
  }

  db.run(
    `INSERT INTO SAVINGS_GOALS (user_id, title, target_amount, due_date)
     VALUES (?, ?, ?, ?)`,
    [userId, title, targetAmount, dueDate || null],
    function (err) {
      if (err) return res.status(500).json({ message: 'Błąd bazy danych' });
      res.status(201).json({ goalId: this.lastID });
    }
  );
});

router.post('/:goalId/contribute', auth, (req, res) => {
  const userId = req.user.userId;
  const goalId = req.params.goalId;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Kwota musi być większa od 0' });
  }

  db.serialize(() => {
    db.get(
      'SELECT * FROM SAVINGS_GOALS WHERE goal_id = ? AND user_id = ?',
      [goalId, userId],
      (errG, goal) => {
        if (errG || !goal) return res.status(404).json({ message: 'Nie znaleziono celu' });

        db.get(
          'SELECT * FROM WALLET_BALANCE WHERE user_id = ? AND currency_code = ?',
          [userId, 'PLN'],
          (errP, pln) => {
            if (!pln || pln.amount < amount) {
              return res.status(400).json({ message: 'Brak wystarczających środków w PLN' });
            }

            db.run(
              'UPDATE WALLET_BALANCE SET amount = amount - ? WHERE balance_id = ?',
              [amount, pln.balance_id]
            );

            db.run(
              'UPDATE SAVINGS_GOALS SET saved_amount = saved_amount + ? WHERE goal_id = ?',
              [amount, goal.goal_id],
              (errU) => {
                if (errU) return res.status(500).json({ message: 'Błąd bazy danych' });

                db.run(
                  `INSERT INTO TRANSACTIONS
                   (user_id, type, currency_from, currency_to, amount, rate)
                   VALUES (?, 'SAVING', 'PLN', ?, ?, 1)`,
                  [userId, goal.title, amount],
                  (errT) => {
                    if (errT) return res.status(500).json({ message: 'Błąd zapisu historii' });
                    res.json({ message: 'Środki odłożone', savedAmount: goal.saved_amount + amount });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});

module.exports = router;
