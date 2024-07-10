const fs = require('fs');
const path = require('path');

const sourceDir = '/practice/dir2';
const destinationDir = '/practice/dir1';

fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Ошибка чтения директории:', err);
    return;
  }

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const destinationPath = path.join(destinationDir, file);
    
    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error(`Ошибка при перемещении файла ${file}:`, err);
      } else {
        console.log(`Файл ${file} успешно перемещен в ${destinationDir}`);
      }
    });
  });
});