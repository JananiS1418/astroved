const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Restore the original CSS file using git
  execSync('git checkout src/app/pages/live-astrology-consultation/live-astrology-consultation.css', { stdio: 'inherit' });
  console.log('Successfully restored css file');
  
  const cssFile = path.join(__dirname, 'src', 'app', 'pages', 'live-astrology-consultation', 'live-astrology-consultation.css');
  const cssContent = fs.readFileSync(cssFile, 'utf8');
  
  // Extract global CSS
  const globalCssStart = cssContent.indexOf('/* ============================================================\r\n   GLOBAL & REUSABLE STYLES FOR NEW SECTIONS');
  let globalCssEnd = cssContent.indexOf('/* ============================================================\r\n     1. TRUST BANNER SECTION');
  if (globalCssEnd === -1) {
    globalCssEnd = cssContent.indexOf('/* ============================================================\n     1. TRUST BANNER SECTION');
  }
  
  let globalCss = '';
  const headerStart = cssContent.indexOf('/* ----- FULL-WIDTH HEADER ----- */');
  
  if (headerStart !== -1) {
    globalCss += cssContent.substring(0, headerStart);
  }
  
  if (globalCssStart !== -1 && globalCssEnd !== -1) {
    globalCss += cssContent.substring(globalCssStart, globalCssEnd);
  }
  
  // Write the global CSS back to the file
  fs.writeFileSync(cssFile, globalCss);
  console.log('Successfully wrote global CSS');
  
} catch (error) {
  console.error('Failed:', error.message);
}
