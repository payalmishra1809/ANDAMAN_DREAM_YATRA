const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Load enquiry routes
const enquiryRoutes = require('./routes/enquiry');
app.use('/api/enquiry', enquiryRoutes);

// Root API status check
app.get('/api', (req, res) => {
  res.json({ ok: true, service: 'Andaman Dream Yatra API', status: 'running' });
});

// Start local server during offline development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// CRITICAL FOR VERCEL: Export module
module.exports = app;
