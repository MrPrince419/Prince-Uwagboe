const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

// Paths
const cssInputPath = path.join(__dirname, 'styles.css');
const cssOutputPath = path.join(__dirname, 'styles.min.css');
const jsInputPath = path.join(__dirname, 'script.js');
const jsOutputPath = path.join(__dirname, 'script.min.js');

// Minify CSS
async function minifyCSS() {
  try {
    const cssContent = fs.readFileSync(cssInputPath, 'utf8');
    const minifiedCSS = new CleanCSS({
      level: 2,
      format: 'keep-breaks'
    }).minify(cssContent);
    
    fs.writeFileSync(cssOutputPath, minifiedCSS.styles);
    console.log(`CSS minified: ${cssInputPath} -> ${cssOutputPath}`);
    console.log(`Original size: ${(cssContent.length / 1024).toFixed(2)} KB`);
    console.log(`Minified size: ${(minifiedCSS.styles.length / 1024).toFixed(2)} KB`);
    console.log(`Saved: ${((1 - minifiedCSS.styles.length / cssContent.length) * 100).toFixed(2)}%`);
  } catch (err) {
    console.error('CSS minification error:', err);
  }
}

// Minify JS
async function minifyJS() {
  try {
    const jsContent = fs.readFileSync(jsInputPath, 'utf8');
    
    // Remove console.log statements
    const noConsoleLogs = jsContent.replace(/console\.log\([^)]*\);?/g, '');
    
    const minifiedJS = await minify(noConsoleLogs, {
      compress: {
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        keep_fargs: false,
        passes: 2
      },
      mangle: true,
      format: {
        comments: false
      }
    });
    
    fs.writeFileSync(jsOutputPath, minifiedJS.code);
    console.log(`JavaScript minified: ${jsInputPath} -> ${jsOutputPath}`);
    console.log(`Original size: ${(jsContent.length / 1024).toFixed(2)} KB`);
    console.log(`Minified size: ${(minifiedJS.code.length / 1024).toFixed(2)} KB`);
    console.log(`Saved: ${((1 - minifiedJS.code.length / jsContent.length) * 100).toFixed(2)}%`);
  } catch (err) {
    console.error('JavaScript minification error:', err);
  }
}

// Run minification
(async () => {
  console.log('Starting minification process...');
  await minifyCSS();
  await minifyJS();
  console.log('Minification complete!');
})();
