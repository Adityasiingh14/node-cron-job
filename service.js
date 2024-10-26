const axios = require("axios");

const makeRequest = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

const makeRequestWithAuth = async (url, token) => {
    const response = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}

module.exports = {
    makeRequest,
    makeRequestWithAuth
}