const fs = require('fs');
const path = require('path');

const DB_FILE = path.resolve(process.env.DB_FILE || './data/enquiries.json');

function ensureDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

function readAll() {
  ensureDb();
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveEnquiry(enquiry) {
  ensureDb();
  const all = readAll();
  const record = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8), ...enquiry };
  all.push(record);
  fs.writeFileSync(DB_FILE, JSON.stringify(all, null, 2));
  return record;
}

module.exports = { saveEnquiry, readAll };
