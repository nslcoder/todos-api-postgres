const pool = require('./config');

const queryCall = (query, params) => {
  return pool.query(query, params);
};

module.exports = queryCall;
