function sendPersonalizedEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var startRow = 2; // Start at second row (first row is headers)
  var numRows = sheet.getLastRow() - 1; // Number of rows to process
  var dataRange = sheet.getRange(startRow, 1, numRows, 2); // Adjust column number if needed
  var data = dataRange.getValues(); // Fetch the names and email addresses

  var subject = "Your Subject Here"; // Set your subject
  var closingRemark = "Best regards,\nYour Name"; // Customize your closing remark

  for (var i = 0; i < data.length; i++) {
    var name = data[i][0]; // Get the name from the first column
    var emailAddress = data[i][1]; // Get the email address from the second column
    
    // Create a personalized message
    var message = "Dear " + name + ",\n\n" + 
                  "Your message body here.\n\n" + 
                  closingRemark;

    MailApp.sendEmail(emailAddress, subject, message);
  }
}
