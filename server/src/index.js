const path = require('path');
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
