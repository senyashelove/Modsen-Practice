function fetchUrls(urls) {
    return Promise.all(urls.map(url => fetchUrl(url)));
  }
  
  function fetchUrl(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.text())
        .then(content => resolve({ url, content }))
        .catch(error => reject({ url, error }));
    });
  }
  
  const urls = [
    'https://www.google.com',
    'https://www.github.com'
  ];
  
  fetchUrls(urls)
    .then(results => {
      results.forEach(result => {
        console.log(`URL: ${result.url}`);
        console.log(`Content: ${result.content}`);
      });
    })
    .catch(errors => {
      errors.forEach(error => {
        console.error(`URL: ${error.url}`);
        console.error(`Error: ${error.error}`);
      });
    });