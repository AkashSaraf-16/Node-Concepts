const EventEmitter = require('events');

class Logger extends EventEmitter {
  notify(message) {
    console.log(`Message-----> ${message}`);
    // Raising events from other module
    this.emit('event1', { data: 'relevant data' });
  }
}

module.exports = Logger;
