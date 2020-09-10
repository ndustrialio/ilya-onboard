var _ = require('lodash');
var env = process.env.NODE_ENV || 'development';

module.exports = _.extend(
  require(__dirname + '/env/all'),
  require(__dirname + '/env/' + env)
);

module.exports.env = env;
