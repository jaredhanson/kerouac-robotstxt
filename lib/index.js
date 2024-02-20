var kerouac = require('kerouac')
  , Mapper = require('./mapper');

exports = module.exports = function(options) {
  var router = new kerouac.Router();
  router.page('/robots.txt', require('./middleware/robots')(options));
  return router;
}

exports.createMapper = function() {
  return new Mapper();
};
