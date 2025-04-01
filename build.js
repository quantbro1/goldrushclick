const fs = require('fs-extra');
const path = require('path');

const apiKey = process.env.FIREBASE_API_KEY || "MISSING_API_KEY";
const srcDir = 'src';
const imgDir = 'images';
const distDir = 'dist';
const sourcePath = path.join(__dirname, srcDir, 'index.html');
const distPath = path.join(__dirname, distDir, 'index.html');

// Clear and ensure dist directory exists
fs.emptyDirSync(distDir);

// Copy src/ to dist/, excluding node_modules
fs.copySync(srcDir, distDir, { filter: src => !src.includes('node_modules') });

// Read the source HTML, replace the placeholder, and write to dist
let html = fs.readFileSync(sourcePath, 'utf8');
html = html.replace("FIREBASE_API_KEY_PLACEHOLDER", apiKey);
fs.writeFileSync(distPath, html);

// Copy images/ to dist/images/
fs.copySync(imgDir, path.join(distDir, 'images'), { overwrite: true });

// Copy manifest.json to dist/
fs.copySync('manifest.json', path.join(distDir, 'manifest.json'), { overwrite: true });

console.log('Build complete. API key injected:', apiKey === "MISSING_API_KEY" ? "Missing" : "Present");
console.log('Files in dist:', fs.readdirSync(distDir));
