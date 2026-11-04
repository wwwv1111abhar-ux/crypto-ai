const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-invoice', async (req, res) => {
  try {
    const amount = req.body.amount;
    const BOT_TOKEN = "9079967416:AAHN_ZH21A_bDVKxEs-ByDbxknnAokgr-34"; // توکن رباتت
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: "Premium Subscription",
        description: "Unlimited AI Signals",
        payload: "custom_payload_" + Date.now(),
        provider_token: "",
        currency: "XTR",
        prices: [{ label: "Premium", amount: parseInt(amount) }]
      })
    });

    const data = await response.json();
    if (!data.ok) throw new Error(data.description);
    res.json({ invoiceLink: data.result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));