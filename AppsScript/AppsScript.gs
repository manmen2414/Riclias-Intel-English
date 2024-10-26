function myFunction() {
    const sheet = SpreadsheetApp.openById("Your Sheet id here").getSheetByName("Main");
    const cells = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).getValues();
    return cells.join("\n")
}