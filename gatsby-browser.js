'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onRouteUpdate = undefined;

var _tools = require('./tools.js');

// auto track routes via `page()`
var onRouteUpdate = exports.onRouteUpdate = function onRouteUpdate(_ref) {
  var location = _ref.location;

  if (!window.analytics || typeof window.analytics.page !== 'function') {
    console.warn('Unable to locate analytics.js');
    return;
  }
  (0, _tools.log)('analytics.page()', location);
  window.analytics.page();
};