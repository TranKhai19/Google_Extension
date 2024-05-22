const path = require('path');

module.exports = {
  entry: './popup.js', // Entry point of your script
  output: {
    filename: 'popup.bundle.js', // Output file name
    path: path.resolve(__dirname) // Output directory (current directory)
  }
};