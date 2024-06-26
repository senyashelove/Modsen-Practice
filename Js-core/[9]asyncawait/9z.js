async function processData() {
    try {
      const firstData = await fetchFromFirstServ();
      console.log('данные от первого сервера:', firstData);

      const secondData = await fetchFromSecondServ(firstData);
      console.log('данные от второго сервера:', secondData);

    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function fetchFromFirstServ() {
    const response = await fetch('http://localhost:3000/data');
    return await response.json();
  }
  
  async function fetchFromSecondServ(data) {
    const response = await fetch('http://localhost:5000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }
  
  processData();