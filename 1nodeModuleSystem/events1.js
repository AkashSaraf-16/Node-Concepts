// const EventEmitter = require('events'); // this returns a class
const Logger = require('./events2.js');

// Creating object of Logger class
const logger = new Logger();

// Registering for the events(first register than emit)
logger.on('event1', (arg) => {
  console.log(`Responded to event1!!! and got the ${arg.data}`);
});

logger.notify('Testing');
//  adding an event inside the same module
// emitter.emit('event1', { data: 'relevant data' });
