const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../.next/server/app');

function injectScript(htmlPath) {
  try {
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    // Check if script is already injected
    if (html.includes('dashboard-console-capture.js')) {
      return;
    }
    
    // Inject script before closing head tag
    html = html.replace(
      '</head>',
      '<script src="/dashboard-console-capture.js"></script></head>'
    );
    
    fs.writeFileSync(htmlPath, html);
    console.log(`Injected console capture into ${htmlPath}`);
  } catch (error) {
    console.error(`Error injecting script into ${htmlPath}:`, error);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

// Run injection
if (fs.existsSync(distDir)) {
  walkDir(distDir);
  console.log('Console capture injection complete');
} else {
  console.log('Build directory not found - skipping injection');
}