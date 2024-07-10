const axios = require('axios');

const username = 'senyashelove';

axios.get(`https://api.github.com/users/${username}/repos`)
  .then(response => {
    const repositories = response.data;

    console.log(`Имя пользователя: ${username}`);
    console.log('Список репозиториев:');
    repositories.forEach(repo => {
      console.log(repo.name);
    });

  })
  .catch(error => {
    console.error('Произошла ошибка при выполнении запроса:', error.message);
  });