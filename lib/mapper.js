var events = require('events')
  , util = require('util');


function Mapper() {
  events.EventEmitter.call(this);
}

util.inherits(Mapper, events.EventEmitter);

Mapper.prototype.map = function() {
  this.request('/robots.txt');
  this.emit('finish');
};


module.exports = Mapper;
