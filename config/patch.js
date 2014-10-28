//source: http://stackoverflow.com/questions/19152287/loading-multiple-instances-of-requirejs-and-backbone

'use strict';

require.load = function(context, moduleName, url) {
  var x = new XMLHttpRequest();
  x.open('GET', url);
  x.onload = function() {
      var code = x.responseText;
      x += '\n//@ sourceURL=' + url; // Optional, for debugging.
      window.eval(code);
      context.completeLoad(moduleName);
  };
  x.onerror = function() {
      // Log error if you wish. This is usually not needed, because
      // Chrome's developer tools does already log "404 Not found"
      // errors for scripts to the console.
  };
  x.send();
};