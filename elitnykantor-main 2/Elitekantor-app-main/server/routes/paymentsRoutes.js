const express = require('express');
const auth = require('../middleware/authMiddleware');
const { createPayuOrder } = require('../services/payuService');

const router = express.Router();

router.post('/payu/create', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = req.user;

    const value = parseFloat(amount);
    if (!value || value <= 0) {
      return res.status(400).json({ message: 'Kwota doładowania musi być większa niż 0' });
    }

    const result = await createPayuOrder(
        value,
        'Elitekantor - Doładowanie konta', // Обновлено описание
        user?.email
    );

    const redirectUri = result.redirectUri;

    if (!redirectUri) {
      console.log('PAYU ORDER RESPONSE (no redirectUri):', result);
      return res
          .status(500)
          .json({ message: 'Błąd bramki płatniczej: brak adresu przekierowania' });
    }

    res.json({ redirectUri });
  } catch (err) {
    console.error('PAYU CREATE ERROR:', err.response?.data || err.message);
    res.status(500).json({
      message: 'Błąd tworzenia zamówienia PayU',
      details: err.response?.data || err.message,
    });
  }
});

router.post('/payu/notify', (req, res) => {
  console.log('PAYU NOTIFY BODY:', req.body);
  res.sendStatus(200);
});

module.exports = router;
