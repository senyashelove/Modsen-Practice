async function fetchData(url, timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
  
    try {
      const response = await fetch(url, { signal: controller.signal });
      const data = await response.json();
      clearTimeout(timeoutId);
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
  
  const apiUrl = 'https://www.nbrb.by/apihelp/exrates';
  const requestTimeout = 5000; 
  
  async function main() {
    try {
      const data = await fetchData(apiUrl, requestTimeout);
      console.log(data);
    } catch (error) {
      console.log('Ошибка при получении данных:', error.message);
    }
  }
  
  main();