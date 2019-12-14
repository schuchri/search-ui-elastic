// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait) {
  var timeout;
  return function() {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, [...arguments]), wait);
  };
}


function logAStatement(stmt) {
  console.log(stmt);
}

var logAStatementDebounced = debounce(logAStatement('Hallo'), 2000);
