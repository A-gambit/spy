'use strict';

var proto = require('./proto');
var uid = 0;

module.exports = function(obj, func) {
  var methodName;
  // spy()
  if (!arguments.length) {
    func = function() {};
    obj = {};
    methodName = 'spyKey';
  }

  // spy(func)
  else if (typeof obj === 'function' && !func) {
    func = obj;
    obj = {};
    methodName = 'spyKey';
  }

  else {
    methodName = func;
    func = obj[methodName];
  }

  // will not wrap more than once
  if (func.spyid !== undefined) {
    return func;
  }

  var wrap = function wrapMethod() {
    var args = [].slice.call(arguments);
    return wrap.invork(args, this, this instanceof wrapMethod);
  };

  extend(wrap, proto);

  wrap.obj = obj;
  wrap.methodName = methodName;
  wrap.spyid = uid++;
  wrap.method = func;
  wrap.reset();

  return obj[methodName] = wrap;
};

function extend(target, src) {
  for (var i in src) {
    target[i] = src[i];
  }
}
