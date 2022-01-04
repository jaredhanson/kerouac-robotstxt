var events = require('events')
  , util = require('util');


function Browser() {
  events.EventEmitter.call(this);
}

util.inherits(Browser, events.EventEmitter);

Browser.prototype.start = function() {
  this.request('/robots.txt');
  this.emit('finish');
};


module.exports = Browser;
