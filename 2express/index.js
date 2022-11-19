const express = require('express');
const Joi = require('joi'); // For input validation
const router = require('./course');
const { env } = require('process');
const server = express();
server.use(express.json()); // to parse the incoming request with JSON payload
server.use('/courses', router);

server.get('/', (req, res) => {
  res.send('Hello World!!!');
});

server.get('/test/:id', (req, res) => {
  const output = `<h1>${req.params.id}</h1> <h3>${JSON.stringify(
    req.query
  )}</h3>`;
  res.send(output);
});

// Validation function
function validateBody(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}
// Using environment variables:
const PORT = env.PORT || 2000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
