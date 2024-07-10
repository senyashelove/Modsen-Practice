const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class FileWatcher extends EventEmitter {
  constructor(directory) {
    super();
    this.directory = directory;
  }

  start() {
    fs.watch(this.directory, { recursive: true }, (eventType, filename) => {
      const filePath = path.join(this.directory, filename);

      if (eventType === 'change') {
        this.emit('fileChanged', filePath);
      } else if (eventType === 'rename') {
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            this.emit('fileDeleted', filePath);
          } else {
            this.emit('fileAdded', filePath);
          }
        });
      }
    });
  }
}

const directoryToWatch = '/practice/dir1';

const fileWatcher = new FileWatcher(directoryToWatch);

fileWatcher.on('fileAdded', (filePath) => {
  console.log(`Файл добавлен: ${filePath}`);
});

fileWatcher.on('fileChanged', (filePath) => {
  console.log(`Файл изменен: ${filePath}`);
});

fileWatcher.on('fileDeleted', (filePath) => {
  console.log(`Файл удален: ${filePath}`);
});

fileWatcher.start();