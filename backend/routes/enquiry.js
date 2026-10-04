const express = require('express');
const { saveEnquiry, readAll } = require('../utils/db');
const { sendEnquiryEmail } = require('../utils/mailer');
const { appendEnquiryToSheet } = require('../utils/sheets');

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/enquiry - create a new enquiry
router.post('/', async (req, res) => {
  try {
    const {
      fullName, email, phone, adults = 0, children = 0, infants = 0, message = '', package: pkg = '',
    } = req.body || {};

    if (!fullName || !email || !phone) {
      return res.status(400).json({ ok: false, error: 'fullName, email and phone are required.' });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
    }

    const enquiry = {
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      adults: Number(adults) || 0,
      children: Number(children) || 0,
      infants: Number(infants) || 0,
      message: String(message).trim(),
      package: String(pkg).trim(),
      createdAt: new Date().toISOString(),
    };

    // 1. Persist locally (always succeeds, acts as the source of truth / backup)
    const saved = saveEnquiry(enquiry);

    // 2. Best-effort: sync to Google Sheet (skips silently if not configured)
    appendEnquiryToSheet(enquiry).catch((err) => {
      console.error('[sheets] failed to append row:', err.message);
    });

    // 3. Best-effort: send notification email
    let emailSent = true;
    try {
      await sendEnquiryEmail(enquiry);
    } catch (err) {
      emailSent = false;
      console.error('[mailer] failed to send email:', err.message);
    }

    return res.status(201).json({ ok: true, id: saved.id, emailSent });
  } catch (err) {
    console.error('[enquiry] unexpected error:', err);
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again.' });
  }
});

// GET /api/enquiry - list saved enquiries (protect this in production!)
router.get('/', (req, res) => {
  const all = readAll();
  res.json({ ok: true, count: all.length, enquiries: all });
});

module.exports = router;
