const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

function deleteFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        reject(err); 
      } else {
        resolve(); 
      }
    });
  });
}

function appendToFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        reject(err); 
      } else {
        resolve();
      }
    });
  });
}

// Main processing logic
async function processCSV() {
  try {
    // Step 1: Delete files if they exist
    await Promise.all([deleteFile(canadaFile), deleteFile(usaFile)]);
    console.log('Old files deleted.');

    // Step 2: Read and process the CSV file
    fs.createReadStream(inputFile)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          if (row.country === 'Canada') {
            await appendToFile(canadaFile, JSON.stringify(row) + '\n');
          } else if (row.country === 'United States') {
            await appendToFile(usaFile, JSON.stringify(row) + '\n');
          }
        } catch (err) {
          console.error('Error appending data:', err);
        }
      })
      .on('end', () => {
        console.log('Data processing complete.');
      })
      .on('error', (err) => {
        console.error('Error reading CSV file:', err);
      });
  } catch (err) {
    console.error('Error during processing:', err);
  }
}

processCSV();
