# Andaman Dream Yatra

A complete, responsive travel-agency website (frontend + backend) for **Andaman Dream Yatra**,
built from the provided spec: coastal design theme, 7 core pages + 12 destination guides, a package
carousel, and an enquiry form that emails `andamandreamyatra@gmail.com` and syncs to a local
database + Google Sheet.

---

## 1. Project structure

```
andaman-dream-yatra/
├── frontend/                  Plain HTML / CSS / JS - no build step required
│   ├── index.html              Home
│   ├── destinations.html       South / Middle / North Andaman, with "Know More" links
│   ├── destinations/           12 blog-style detail pages (history, facts, gallery per island)
│   │   ├── neil-island.html, havelock-island.html, barren-island.html,
│   │   │   port-blair-museums-sunset-points.html  (South Andaman)
│   │   ├── baratang-island.html, parrot-island.html, dhani-nallah-beach.html,
│   │   │   morich-dera-beach.html                  (Middle Andaman)
│   │   └── saddle-peak.html, ramnagar-beach.html, kalipur-beach.html,
│   │       ross-and-smith-island.html              (North Andaman)
│   ├── packages.html           6-package carousel
│   ├── services.html           Flight, transport, sightseeing, hotel, cruise, custom
│   ├── activities.html         Scuba, snorkelling, parasailing, kayaking, etc.
│   ├── cancellation.html       Full cancellation & refund policy (slabs, force majeure, refund timelines)
│   ├── contact.html            Info + enquiry form (persons counter, message)
│   ├── images/                 Real logo (transparent PNG) + generated favicons
│   ├── css/style.css           Design system (coastal palette, wave dividers, oval buttons)
│   └── js/main.js              Nav, carousel, tabs, counters, form submission
│
├── backend/                   Node.js + Express API
│   ├── server.js               App entry point
│   ├── routes/enquiry.js       POST /api/enquiry, GET /api/enquiry
│   ├── utils/mailer.js         Nodemailer → sends email to andamandreamyatra@gmail.com
│   ├── utils/sheets.js         Google Sheets sync (optional, auto-skips if not configured)
│   ├── utils/db.js             Local JSON-file database (data/enquiries.json)
│   ├── package.json
│   └── .env.example            All required environment variables, explained
│
└── README.md                  You are here
```

---

## 1a. Contact details on file

All contact details across the site are now final, as provided:

- **Email:** `andamandreamyatra@gmail.com`
- **Phone / WhatsApp:** `+91 95319 18146` (primary - used for `tel:` and WhatsApp links) and
  `+91 96795 62303` (alternate - shown alongside the primary number wherever a phone is displayed)
- **Office address:** Royal Colony, Dollygunj, Sri Vijaya Puram, Andaman & Nicobar Islands – 744103

If any of these change later, search each `frontend/*.html` and `frontend/destinations/*.html` file
for the current values (and `js/main.js` for the WhatsApp fallback message) and update in one pass.

---

## 2. Run the frontend

The frontend is plain static HTML - no build tools needed.

```bash
cd frontend
# any static server works, e.g.:
npx serve .
# or just open index.html directly in a browser
```

If you serve the backend from a different host/port than the frontend, set this **before**
`main.js` loads (e.g. add a line in each HTML `<head>` or edit `js/main.js`):

```html
<script>window.ADY_API_BASE = "https://your-backend-domain.com";</script>
<script src="js/main.js"></script>
```

By default it points at `http://localhost:5000`.

---

## 3. Run the backend

```bash
cd backend
npm install
cp .env.example .env
# fill in .env - see steps below
npm start          # or: npm run dev  (with nodemon)
```

The API starts on `http://localhost:5000` with:

- `POST /api/enquiry` - accepts the enquiry form payload, saves it locally, emails the team,
  and (if configured) appends a row to a Google Sheet.
- `GET /api/enquiry` - lists saved enquiries (add authentication before using this in production).

### 3.1 Email setup (Gmail + Nodemailer)

1. Use (or create) a Gmail account that will **send** the notification emails - this can be the
   same `andamandreamyatra@gmail.com` account or a separate sender account.
2. Turn on **2-Step Verification** on that Google account.
3. Generate an **App Password**: https://myaccount.google.com/apppasswords → choose "Mail" →
   copy the 16-character password.
4. In `.env`:
   ```
   MAIL_USER=your-sending-account@gmail.com
   MAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
   MAIL_TO=andamandreamyatra@gmail.com
   ```
5. Every enquiry submitted on the site now emails `MAIL_TO` with the visitor's details, and sets
   `replyTo` to the visitor's email so you can reply directly.

### 3.2 Local database (always on)

Every enquiry is saved to `backend/data/enquiries.json` automatically - no setup needed. This is
your backup even if email or Google Sheets fail.

### 3.3 Google Sheets sync (optional but recommended)

1. Go to https://console.cloud.google.com/ → create a project (or reuse one).
2. Enable the **Google Sheets API** for that project.
3. Create a **Service Account** (IAM & Admin → Service Accounts) → create a JSON key and download it.
4. Open the JSON key file - copy the `client_email` and `private_key` values.
5. Create a new Google Sheet (or use an existing one). Copy its ID from the URL:
   `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`
6. Click **Share** on the sheet and share it with the service account's `client_email`
   (give it **Editor** access).
7. In `.env`:
   ```
   GOOGLE_SHEET_ID=the-id-from-the-url
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```
   Keep the `\n` characters literal (in quotes) - the code converts them back to real newlines.
8. Restart the server. The first enquiry will auto-create a sheet tab named **"Enquiries"** with
   the correct headers and append a row per submission - this gives you a live, always-current
   spreadsheet instead of a scheduled export.

> Prefer a scheduled weekly/monthly export instead of live sync? Keep Sheets sync disabled (leave
> those 3 vars blank) and instead write a small script that reads `data/enquiries.json` and pushes
> new rows on a cron job / Google Apps Script trigger - the JSON file already has everything needed.

---

## 4. Deployment notes

- **Frontend**: deploy `frontend/` as-is to any static host (Netlify, Vercel, GitHub Pages, S3).
- **Backend**: deploy `backend/` to any Node host (Render, Railway, Fly.io, a VPS). Set the same
  `.env` variables in that host's environment settings, and set `CLIENT_ORIGIN` to your deployed
  frontend URL so CORS allows the browser requests.
- Update `window.ADY_API_BASE` in the frontend to point at your deployed backend URL.
- Replace the placeholder phone number (`+91-XXXXXXXXXX`) throughout the frontend with the real
  contact number.
- Replace the Unsplash stock photography with Andaman Dream Yatra's own island photography before going live.
- Paste your finalised cancellation/refund policy text into `cancellation.html` (marked with
  `[Paste ... here]` placeholders).

---

## 5. Tech stack

- **Frontend**: HTML5, CSS3 (custom design system, no framework), vanilla JS. Google Fonts:
  Playfair Display (headings), Poppins (body), Space Mono (labels/prices).
- **Backend**: Node.js, Express, Nodemailer (Gmail SMTP), google-spreadsheet (Sheets sync),
  a lightweight JSON-file store as the always-on database, express-rate-limit for basic abuse
  protection.
