// var EventEmitter = require("events");
// module.exports = new EventEmitter();

class EventEmitter {
  events = {}
  on(eventName, fn) {
    this.events[eventName] = fn
  }
  emit(eventName, ...args) {
    this.events[eventName](...args)
  }
}
module.exports = new EventEmitter()