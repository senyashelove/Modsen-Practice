const path = require('path');

const directory = process.argv[2];
const filename = process.argv[3];
const extension = process.argv[4];

const filePath = path.join(directory, filename + extension);
const normalizedPath = path.normalize(filePath);

console.log('Итоговый путь:', normalizedPath);