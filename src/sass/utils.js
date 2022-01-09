const path = require('path');
const resources = ['abstracts/*', 'base/*'];
module.exports = resources.map((file) => path.resolve(__dirname, file));
