const fs = require('fs');
const path = require('path');

// copy the html folder into the dist folder
// (automatically runs after vites part of the build
//  when we use: 'npm run build')
fs.cpSync(
  path.join(__dirname, 'html'),
  path.join(__dirname, 'dist', 'html'),
  { recursive: true }
);