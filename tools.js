'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
var _process$env$NODE_ENV = process.env.NODE_ENV,
    NODE_ENV = _process$env$NODE_ENV === undefined ? 'development' : _process$env$NODE_ENV;
var isDevelopment = exports.isDevelopment = NODE_ENV === 'development';

function log() {
  if (isDevelopment) {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_console = console).log.apply(_console, ['[gatsby-plugin-analytics-without-segment]'].concat(args));
  }
}