require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const enquiryRouter = require('./routes/enquiry');

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));

// Basic abuse protection on the public enquiry endpoint
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { ok: false, error: 'Too many requests. Please try again later.' },
});

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'Andaman Dream Yatra API', status: 'running' });
});

// Keep app.listen for local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// CRITICAL FOR VERCEL: Export the app module
module.exports = app;

app.use('/api/enquiry', enquiryLimiter, enquiryRouter);

app.use((req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Andaman Dream Yatra backend listening on http://localhost:${PORT}`);
});
