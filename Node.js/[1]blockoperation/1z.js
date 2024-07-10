const http = require('http');

function performBlockingRequest(url) {
  const startTime = process.hrtime();

  const req = http.request(url, (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      const endTime = process.hrtime(startTime);
      const elapsedTime = endTime[0] * 1000 + endTime[1] / 1e6; 
      console.log(`Блокирующий запрос к ${url} завершен. Время выполнения: ${elapsedTime} мс`);
    });
  });

  req.end();
}


function performNonBlockingRequest(url) {
  const startTime = process.hrtime();

  http.get(url, (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      const endTime = process.hrtime(startTime);
      const elapsedTime = endTime[0] * 1000 + endTime[1] / 1e6; 
      console.log(`Неблокирующий запрос к ${url} завершен. Время выполнения: ${elapsedTime} мс`);
    });
  });
}


const urls = [
  'http://github.com',
  'http://www.google.com',
  'http://vk.com'
];


urls.forEach((url) => {
  performBlockingRequest(url);
});


urls.forEach((url) => {
  performNonBlockingRequest(url);
});