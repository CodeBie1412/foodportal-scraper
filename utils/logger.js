const fs = require('fs');
const path = require('path');

function logToFile(logMessage, logFilePath = 'app.log', ...variables) {
    const logTimestamp = new Date().toISOString();
    const formattedVariables = variables.map(varObj => JSON.stringify(varObj, null, 2)).join(', ');
    const logEntry = `[${logTimestamp}] ${logMessage}: ${formattedVariables}\n`;

    // Append log entry to file
    fs.appendFile(path.resolve(__dirname, logFilePath), logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

module.exports = { logToFile };
