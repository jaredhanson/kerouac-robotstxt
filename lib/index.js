var Mapper = require('./mapper');

exports = module.exports = require('./middleware/robots');

exports.createMapper = function() {
  return new Mapper();
};
