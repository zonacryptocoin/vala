const axios = require("axios");
const { BASE_URL } = require("./config");

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = api;
