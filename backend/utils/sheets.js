const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const SHEET_HEADERS = [
  'createdAt', 'fullName', 'email', 'phone', 'package',
  'adults', 'children', 'infants', 'message',
];

let cachedDoc = null;

async function getSheet() {
  const {
    GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY,
  } = process.env;

  if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    return null; // Google Sheets sync not configured - skip silently.
  }

  if (!cachedDoc) {
    const jwt = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    cachedDoc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt);
    await cachedDoc.loadInfo();
  }

  let sheet = cachedDoc.sheetsByTitle['Enquiries'];
  if (!sheet) {
    sheet = await cachedDoc.addSheet({ title: 'Enquiries', headerValues: SHEET_HEADERS });
  }
  return sheet;
}

async function appendEnquiryToSheet(enquiry) {
  const sheet = await getSheet();
  if (!sheet) return false; // Not configured - caller should rely on local DB only.
  await sheet.addRow({
    createdAt: enquiry.createdAt,
    fullName: enquiry.fullName,
    email: enquiry.email,
    phone: enquiry.phone,
    package: enquiry.package || 'General enquiry',
    adults: enquiry.adults,
    children: enquiry.children,
    infants: enquiry.infants,
    message: enquiry.message || '',
  });
  return true;
}

module.exports = { appendEnquiryToSheet };
