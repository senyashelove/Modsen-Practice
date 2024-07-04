const axios = require('axios');

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

async function getWeather(params) {
    try {
        const response = await axios.get(BASE_URL, {
            params,
        });
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

async function updateWeather(data, params) {
    try {
        const response = await axios.put(BASE_URL, data, {
            params,
        });
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

module.exports = {
    getWeather,
    updateWeather,
};
