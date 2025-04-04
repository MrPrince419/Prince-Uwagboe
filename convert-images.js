/**
 * Image Converter Script
 * 
 * This script uses Sharp to convert images to WebP format
 * Install dependencies: npm install sharp glob
 * 
 * Usage: node convert-images.js
 */

const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Find all image files (jpg, png, gif)
glob('**/*.{jpg,jpeg,png,gif}', { ignore: 'node_modules/**' }, (err, files) => {
  if (err) {
    console.error('Error finding images:', err);
    return;
  }

  console.log(`Found ${files.length} images to convert`);

  files.forEach(file => {
    const outputFilename = path.join(
      'images',
      path.basename(file, path.extname(file)) + '.webp'
    );

    // Skip if WebP version already exists
    if (fs.existsSync(outputFilename)) {
      console.log(`Skipping ${file} - WebP version already exists`);
      return;
    }

    // Convert image to WebP with 80% quality
    sharp(file)
      .webp({ quality: 80 })
      .toFile(outputFilename)
      .then(() => {
        console.log(`Converted ${file} to ${outputFilename}`);
        
        // Create optimized OpenGraph image with dimensions 1200x630
        if (file.includes('profile')) {
          sharp(file)
            .resize(1200, 630, { fit: 'cover', position: 'center' })
            .webp({ quality: 85 })
            .toFile(path.join('images', 'prince-uwagboe-og.webp'))
            .then(() => {
              console.log('Created OpenGraph image');
            })
            .catch(err => {
              console.error(`Error creating OpenGraph image: ${err}`);
            });
        }
      })
      .catch(err => {
        console.error(`Error converting ${file}: ${err}`);
      });
  });
});

console.log('Image conversion process started...');

/**
 * Image Format Conversion Utility
 * This script helps convert webp images to jpg format for better compatibility
 * 
 * To use:
 * 1. Install required dependencies: npm install fs sharp
 * 2. Run: node convert-images.js
 */

// Check if directory exists
if (!fs.existsSync(imagesDir)) {
    console.error('Images directory not found!');
    process.exit(1);
}

// Create function to convert webp images to jpg
async function convertWebpToJpg() {
    try {
        const files = fs.readdirSync(imagesDir);
        
        for (const file of files) {
            if (path.extname(file).toLowerCase() === '.webp') {
                const inputPath = path.join(imagesDir, file);
                const outputPath = path.join(imagesDir, file.replace('.webp', '.jpg'));
                
                console.log(`Converting ${file} to jpg format...`);
                
                await sharp(inputPath)
                    .jpeg({ quality: 90 })
                    .toFile(outputPath);
                
                console.log(`Successfully converted ${file} to jpg!`);
            }
        }
        
        console.log('Conversion complete!');
    } catch (error) {
        console.error('Error converting images:', error);
    }
}

// Run the conversion
convertWebpToJpg();
