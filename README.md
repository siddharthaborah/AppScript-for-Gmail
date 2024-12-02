# Personalized Email Sender with Attachment

This repository contains a Google Apps Script that allows you to send personalized emails with attachments to a list of recipients stored in a Google Sheets document. The script retrieves names and email addresses from the sheet, constructs personalized messages, and sends emails using Gmail.

## Features

- Send personalized emails to multiple recipients.
- Include attachments from Google Drive.
- Customize email subject and closing remarks.

## Prerequisites

Before you can use this script, you need:

- A Google account with access to Google Sheets and Google Drive.
- A Google Sheet containing names and email addresses:
  - Column A: Names
  - Column B: Email Addresses
- The ID of the file you want to attach (you can find this in the file's URL).

## Getting Started

### Step 1: Set Up Your Google Sheet

1. Create a new Google Sheet.
2. In the first row, add headers (e.g., "Name" in Column A and "Email" in Column B).
3. Fill in the subsequent rows with names and corresponding email addresses.

### Step 2: Open Google Apps Script

1. In your Google Sheet, click on `Extensions` > `Apps Script`.
2. Delete any existing code in the script editor.

### Step 3: Copy the Script

Copy the following script into the Apps Script editor:

```javascript
function sendPersonalizedEmailsWithAttachment() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var startRow = 2; // Start at second row (first row is headers)
  var numRows = sheet.getLastRow() - 1; // Number of rows to process
  var dataRange = sheet.getRange(startRow, 1, numRows, 2); // Adjust column number if needed
  var data = dataRange.getValues(); // Fetch the names and email addresses

  var subject = "Your Subject Here"; // Set your subject
  var closingRemark = "Best regards,\nYour Name"; // Customize your closing remark

  // Specify the ID of the file to attach
  var fileId = "YOUR_FILE_ID_HERE"; // Replace with your actual file ID
  var attachment = DriveApp.getFileById(fileId); // Get the file from Drive

  for (var i = 0; i < data.length; i++) {
    var name = data[i]; // Get the name from the first column
    var emailAddress = data[i]; // Get the email address from the second column
    
    // Create a personalized message
    var message = "Dear " + name + ",\n\n" + 
                  "Your message body here.\n\n" + 
                  closingRemark;

    // Send the email with attachment
    MailApp.sendEmail({
      to: emailAddress,
      subject: subject,
      body: message,
      attachments: [attachment] // Attach the file
    });
  }
}
