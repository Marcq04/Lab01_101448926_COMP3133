const fs = require('fs');

console.log('Reading file...');
fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});

let file = fs.readFileSync('input.txt', 'utf-8');
console.log(file);

console.log('Done...');