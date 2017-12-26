const env = process.env.NODE_ENV || 'development';
const tmp = require(`./${env}`);

module.exports = tmp;