// Google Apps Script for Quiet Room Waitlist
// This script handles POST requests and saves email addresses to a Google Spreadsheet

// Replace 'YOUR_SPREADSHEET_ID' with your actual Google Spreadsheet ID
const SPREADSHEET_ID = '1FlFdI9G6VqgRXcf5bi5eUHMTIGzoUCj_XYieQc6Y8pw';

function doPost(e) {
  try {
    console.log('doPost function called');
    
    // Check if e and e.postData exist
    if (!e || !e.postData || !e.postData.contents) {
      console.error('Invalid request: missing postData');
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Invalid request format' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed data:', data);
    
    // Extract email from the request
    const email = data.email;
    const timestamp = data.timestamp || new Date().toISOString();
    const source = data.source || 'Quiet Room Waitlist';
    
    console.log('Email:', email, 'Timestamp:', timestamp, 'Source:', source);
    
    // Validate email
    if (!email || !isValidEmail(email)) {
      console.log('Invalid email:', email);
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Invalid email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the spreadsheet and sheet
    console.log('Opening spreadsheet with ID:', SPREADSHEET_ID);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    console.log('Sheet name:', sheet.getName());
    
    // Check if headers exist, if not create them
    const headerRow = sheet.getRange(1, 1, 1, 3).getValues()[0];
    if (!headerRow[0] || headerRow[0] !== 'Email') {
      console.log('Setting up headers');
      sheet.getRange(1, 1, 1, 3).setValues([['Email', 'Timestamp', 'Source']]);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
      sheet.getRange(1, 1, 1, 3).setBackground('#f0f0f0');
    }
    
    // Check if email already exists (only if there are existing rows)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const existingEmails = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
      console.log('Existing emails:', existingEmails);
      if (existingEmails.includes(email)) {
        console.log('Email already exists:', email);
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, error: 'Email already exists' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Add new row to spreadsheet
    const newRow = [email, timestamp, source];
    console.log('Adding new row:', newRow);
    sheet.appendRow(newRow);
    console.log('Row added successfully');
    
    // Optional: Send email notification to yourself
    try {
      sendNotificationEmail(email);
    } catch (emailError) {
      console.log('Email notification failed:', emailError);
    }
    
    // Return success response
    console.log('Returning success response');
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Email added successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Server error: ' + error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (optional)
  return ContentService
    .createTextOutput('Quiet Room Waitlist API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sendNotificationEmail(newEmail) {
  try {
    // Replace with your email address
    const adminEmail = 'tejasshyamfulumbarkar@gmail.com';
    
    const subject = 'New Quiet Room Waitlist Signup';
    const message = `
      New waitlist signup received!
      
      Email: ${newEmail}
      Time: ${new Date().toLocaleString()}
      Source: Quiet Room Waitlist
      
      Total signups: ${getTotalSignups()}
    `;
    
    // Try to send email, but don't fail if it doesn't work
    try {
      MailApp.sendEmail(adminEmail, subject, message);
      console.log('Notification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Continue execution even if email fails
    }
  } catch (error) {
    console.error('Error in sendNotificationEmail:', error);
  }
}

function getTotalSignups() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    return sheet.getLastRow() - 1; // Subtract 1 for header row
  } catch (error) {
    return 'Unknown';
  }
}

function setupSpreadsheet() {
  // This function sets up the spreadsheet with headers
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Set headers
    sheet.getRange(1, 1, 1, 3).setValues([['Email', 'Timestamp', 'Source']]);
    
    // Format headers
    sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
    sheet.getRange(1, 1, 1, 3).setBackground('#f0f0f0');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 3);
    
    console.log('Spreadsheet setup completed');
  } catch (error) {
    console.error('Error setting up spreadsheet:', error);
  }
} 