const fs = require('fs');
const path = require('path');

const apiKey = process.env.FIREBASE_API_KEY || "MISSING_API_KEY";
const sourcePath = path.join(__dirname, 'src', 'index.html');
const distPath = path.join(__dirname, 'dist', 'index.html');

// Ensure dist directory exists
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
}

// Read the source HTML, replace the placeholder, and write to dist
let html = fs.readFileSync(sourcePath, 'utf8');
html = html.replace("FIREBASE_API_KEY_PLACEHOLDER", apiKey);
fs.writeFileSync(distPath, html);

console.log('Build complete. API key injected:', apiKey === "MISSING_API_KEY" ? "Missing" : "Present");

const fs = require('fs-extra');
const path = require('path');

const srcDir = 'src';
const imgDir = 'images';
const distDir = 'dist';

fs.emptyDirSync(distDir);
fs.copySync(srcDir, distDir, { filter: src => !src.includes('node_modules') });
fs.copySync(imgDir, path.join(distDir, 'images'), { overwrite: true });

console.log('Build complete! Files in dist:', fs.readdirSync(distDir));
