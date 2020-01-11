"use strict";

const axios = require("axios");

/**
 * Axios Async Function with headers
 *
 * @returns {Object} Response
 */
exports.submitRequest = async function(url, headers) {
  return axios.get(url, headers).then(response => {
    return {
      statusCode: response.status,
      data: response.data
    };
  });
};
