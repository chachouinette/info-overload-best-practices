const express = require('express');
const cors = require('cors');
const { bestPractices } = require('../bestPractices');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// GET /api/best-practices : retourne toutes les bonnes pratiques
app.get('/api/best-practices', (req, res) => {
  res.json(bestPractices);
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
