const express = require('express');
const db = require('../db');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, (req, res) => {
  const userId = req.user.userId;
  db.all(
    'SELECT * FROM PAYMENT_REMINDERS WHERE user_id = ? ORDER BY due_date ASC',
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Błąd bazy danych' });
      res.json(rows);
    }
  );
});

router.post('/', auth, (req, res) => {
  const userId = req.user.userId;
  const { title, amount, dueDate } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ message: 'Tytuł i termin są wymagane' });
  }

  db.run(
    `INSERT INTO PAYMENT_REMINDERS (user_id, title, amount, due_date)
     VALUES (?, ?, ?, ?)`,
    [userId, title, amount || null, dueDate],
    function (err) {
      if (err) return res.status(500).json({ message: 'Błąd bazy danych' });
      res.status(201).json({ reminderId: this.lastID });
    }
  );
});

router.patch('/:reminderId', auth, (req, res) => {
  const userId = req.user.userId;
  const reminderId = req.params.reminderId;
  const { isPaid } = req.body;

  db.run(
    'UPDATE PAYMENT_REMINDERS SET is_paid = ? WHERE reminder_id = ? AND user_id = ?',
    [isPaid ? 1 : 0, reminderId, userId],
    function (err) {
      if (err) return res.status(500).json({ message: 'Błąd bazy danych' });
      if (!this.changes) return res.status(404).json({ message: 'Nie znaleziono przypomnienia' });
      res.json({ message: 'Status zaktualizowany' });
    }
  );
});

module.exports = router;
