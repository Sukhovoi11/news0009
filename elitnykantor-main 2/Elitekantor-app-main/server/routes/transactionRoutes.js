const express = require('express');
const db = require('../db');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

function getRate(code, cb) {
  db.get(
    'SELECT mid_rate FROM EXCHANGE_RATES WHERE currency_code = ?',
    [code.toUpperCase()],
    (err, row) => {
      if (err || !row) return cb('Brak kursu dla ' + code);
      cb(null, row.mid_rate);
    }
  );
}

router.post('/buy', auth, (req, res) => {
  const userId = req.user.userId;
  const { currencyTo, amountPln } = req.body;

  if (!currencyTo || !amountPln || amountPln <= 0) {
    return res.status(400).json({ message: 'Błędne dane wejściowe' });
  }

  getRate(currencyTo, (err, rate) => {
    if (err) return res.status(400).json({ message: err });

    const amountForeign = amountPln / rate;

    db.serialize(() => {
      db.get(
        'SELECT * FROM WALLET_BALANCE WHERE user_id = ? AND currency_code = ?',
        [userId, 'PLN'],
        (errP, pln) => {
          if (!pln || pln.amount < amountPln) {
            return res.status(400).json({ message: 'Niewystarczające środki PLN na koncie Elitekantor' });
          }

          db.run(
            'UPDATE WALLET_BALANCE SET amount = amount - ? WHERE balance_id = ?',
            [amountPln, pln.balance_id]
          );

          db.get(
            'SELECT * FROM WALLET_BALANCE WHERE user_id = ? AND currency_code = ?',
            [userId, currencyTo],
            (errF, foreign) => {
              if (foreign) {
                db.run(
                  'UPDATE WALLET_BALANCE SET amount = amount + ? WHERE balance_id = ?',
                  [amountForeign, foreign.balance_id]
                );
              } else {
                db.run(
                  'INSERT INTO WALLET_BALANCE (user_id, currency_code, amount) VALUES (?, ?, ?)',
                  [userId, currencyTo, amountForeign]
                );
              }

              db.run(
                `INSERT INTO TRANSACTIONS
                 (user_id, type, currency_from, currency_to, amount, rate)
                 VALUES (?, 'BUY', 'PLN', ?, ?, ?)`,
                [userId, currencyTo, amountForeign, rate]
              );

              res.json({
                message: 'Transakcja zakupu zakończona sukcesem',
                rate,
                amountForeign,
              });
            }
          );
        }
      );
    });
  });
});

router.post('/sell', auth, (req, res) => {
  const userId = req.user.userId;
  const { currencyFrom, amountForeign } = req.body;

  if (!currencyFrom || !amountForeign || amountForeign <= 0) {
    return res.status(400).json({ message: 'Błędne dane wejściowe' });
  }

  getRate(currencyFrom, (err, rate) => {
    if (err) return res.status(400).json({ message: err });

    const amountPln = amountForeign * rate;

    db.serialize(() => {
      db.get(
        'SELECT * FROM WALLET_BALANCE WHERE user_id = ? AND currency_code = ?',
        [userId, currencyFrom],
        (errF, foreign) => {
          if (!foreign || foreign.amount < amountForeign) {
            return res
              .status(400)
              .json({ message: 'Brak wystarczającej ilości jednostek ' + currencyFrom });
          }

          db.run(
            'UPDATE WALLET_BALANCE SET amount = amount - ? WHERE balance_id = ?',
            [amountForeign, foreign.balance_id]
          );

          db.get(
            'SELECT * FROM WALLET_BALANCE WHERE user_id = ? AND currency_code = ?',
            [userId, 'PLN'],
            (errP, pln) => {
              if (pln) {
                db.run(
                  'UPDATE WALLET_BALANCE SET amount = amount + ? WHERE balance_id = ?',
                  [amountPln, pln.balance_id]
                );
              } else {
                db.run(
                  'INSERT INTO WALLET_BALANCE (user_id, currency_code, amount) VALUES (?, ?, ?)',
                  [userId, 'PLN', amountPln]
                );
              }

              db.run(
                `INSERT INTO TRANSACTIONS
                 (user_id, type, currency_from, currency_to, amount, rate)
                 VALUES (?, 'SELL', ?, 'PLN', ?, ?)`,
                [userId, currencyFrom, amountForeign, rate]
              );

              res.json({
                message: 'Transakcja sprzedaży zakończona sukcesem',
                rate,
                amountPln,
              });
            }
          );
        }
      );
    });
  });
});

router.get('/history', auth, (req, res) => {
  const userId = req.user.userId;

  db.all(
    'SELECT * FROM TRANSACTIONS WHERE user_id = ? ORDER BY created_at DESC',
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Błąd bazy danych' });
      res.json(rows);
    }
  );
});

module.exports = router;
