const logger = require('./logger.js');
const path = require('path');
const fs = require('fs');
// The var z here will not be in global object contrary to window object(which will have it)
var z = 100;
logger('Global Object of Node : ', global);

// Points to remember:
// 1.Every file in node application is considered as a module
// 2.This module will not be in global node object
logger(module);
// 3.Node never execuets our files directly if enclose them in a wrapper function
//   which has following signature :(function (exports, require, module, _filename, __dirname){...})
var pathObj = path.parse(__filename);
// logger('Path Object: ', pathObj);

const files = fs.readdirSync('./'); // synchronous
// logger(files);

const files2 = fs.readdir('./', (err, files) => {
  if (err) logger(err);
  else logger(files);
});
