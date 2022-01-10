const path = require('path');
const resources = ['global.scss'];
module.exports = resources.map((file) => path.resolve(__dirname, file));
