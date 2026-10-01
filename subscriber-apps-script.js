function doPost(event) {
  var payload = JSON.parse(event.postData.contents || '{}');
  if (payload.type === 'review') {
    return saveReview(payload);
  }

  var name = String(payload.name || '').trim();
  var email = String(payload.email || '').trim().toLowerCase();
  if (!name) {
    return jsonOutput({ ok: false, message: 'Name is required.' });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return jsonOutput({ ok: false, message: 'Invalid email address.' });
  }

  var sheet = getSubscriberSheet();
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var rows = sheet.getLastRow();
    if (rows > 1) {
      var savedEmails = sheet.getRange(2, 2, rows - 1, 1).getValues();
      if (savedEmails.some(function(row) { return row[0] === email; })) {
        return jsonOutput({ ok: true, duplicate: true });
      }
    }
    sheet.appendRow([new Date(), email, name]);
  } finally {
    lock.releaseLock();
  }
  return jsonOutput({ ok: true });
}

function saveReview(payload) {
  var name = String(payload.name || '').trim().slice(0, 80);
  var review = String(payload.review || '').trim().slice(0, 1000);
  var rating = Number(payload.rating);
  if (!name || !review || rating < 1 || rating > 5 || Math.floor(rating) !== rating) {
    return jsonOutput({ ok: false, message: 'Please provide a name, a review, and a rating from 1 to 5.' });
  }

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Reviews');
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Reviews');
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Submitted At', 'Name', 'Rating', 'Review', 'Status']);
  }
  sheet.appendRow([new Date(), name, rating, review, 'Pending']);
  return jsonOutput({ ok: true });
}

function doGet(event) {
  var sheet = getSubscriberSheet();
  var lastRow = sheet.getLastRow();
  var names = lastRow > 1
    ? sheet.getRange(2, 3, lastRow - 1, 1).getDisplayValues().map(function(row) { return row[0]; })
    : [];
  var result = JSON.stringify({ names: names });
  var callback = String((event.parameter && event.parameter.callback) || '');

  if (callback) {
    if (!/^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
      return ContentService.createTextOutput('Invalid callback');
    }
    return ContentService.createTextOutput(callback + '(' + result + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return jsonOutput({ names: names });
}

function getSubscriberSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Subscribers');
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Subscribers');
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Subscribed At', 'Email', 'Name']);
  } else if (sheet.getRange(1, 3).getValue() === 'Username') {
    sheet.getRange(1, 3).setValue('Name');
  }
  return sheet;
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}