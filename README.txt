USHA GIFT HOUSE - website
==========================
Open index.html in any browser. No build step or internet-only tools needed
(only Google Fonts loads online; a fallback serif/sans is used offline).

FILES
  index.html      page content (text, sections, product cards)
  css/style.css   all styling  (colors are CSS variables at the top: --brown, --cream ...)
  js/main.js      interactions. Change WhatsApp number on line 3:  WA_NUMBER
  images/         all product photos (webp)

EDIT CHECKLIST
  1. js/main.js      -> WA_NUMBER, WA_TEXT
  2. index.html      -> search "98765" and replace phone; "ushagifthouse.com" for email;
                        "Shop No. 12" for the address
  3. Product cards   -> each <article class="gcard"> in the #rail section: name, description, price
  4. Reviews / FAQ / stats (5k+, 35+, 100%) are sample text - replace with real ones
  5. Add a product: copy one <article class="gcard">...</article>, change image in images/

HOSTING: upload the whole folder to Netlify / Vercel / GitHub Pages / any web hosting.

SUBSCRIBER STORAGE
  1. Create a Google Sheet, then open Extensions > Apps Script.
  2. Copy subscriber-apps-script.js into the Apps Script editor and save.
  3. Deploy > New deployment > Web app; execute as yourself and allow access to anyone.
  4. Copy the Web app URL ending in /exec into SUBSCRIBER_API_URL in main.js.
  5. Keep the spreadsheet private. It stores emails; the public page only shows
      subscriber names under “Our Subscribers”. The form asks for name and email.
    6. After changing Apps Script later, use Deploy > Manage deployments > Edit,
      select New version, and deploy again. The /exec URL normally stays the same.

CUSTOMER REVIEWS
  The review form is below the testimonials on the home page. Submissions are
  stored in the same private spreadsheet in a separate “Reviews” tab with a
  Pending status. After updating subscriber-apps-script.js, deploy a New version
  of the Apps Script Web App for review submissions to start saving.
