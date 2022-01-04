var Browser = require('./browser');

exports = module.exports = require('./middleware/robots');

exports.browser = function() {
  return new Browser();
};
