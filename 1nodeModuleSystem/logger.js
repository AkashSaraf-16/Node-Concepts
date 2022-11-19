function logger(message) {
  console.log(message);
  console.log(
    '=================================================================='
  );
  console.log(
    '------------------------------------------------------------------'
  );
  console.log(
    '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'
  );
}

// exporting it by using module.exports property of module object
module.exports = logger; // when we just want to export a fucntion as a function
// module.exports.log = logger    // when we want to export as a object={log:logger()}
// exports.log = logger      // this is also valid way of exporting
// exports = logger          // this is not valid as we are completely changing the reference here
