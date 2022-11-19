const express = require('express');
const { env } = require('process');
const server = express();
const logger = require('./middleware1.js');
const config = require('config');
server.use(express.json());
server.use(logger);

console.log(server.get('env')); // how to which environment
server.get('/test', (req, res) => {
  const output = `<h1>TESTING</h1>`;
  res.send(output);
});

// Configuration
console.log('Name:' + config.get('name'));
console.log('Host:' + config.get('mail.host'));
console.log('Pswd:' + config.get('mail.password'));

// Using environment variables:
const PORT = env.PORT || 2000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
