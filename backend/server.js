const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
const enquiryRoutes = require('./routes/enquiry');
app.use('/api/enquiry', enquiryRoutes);

// API Status Route
app.get('/api', (req, res) => {
  res.json({ ok: true, service: 'Andaman Dream Yatra API', status: 'running' });
});

// Wildcard Route: Serve frontend HTML pages for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start local server during offline development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Module export for Vercel Serverless
module.exports = app;
