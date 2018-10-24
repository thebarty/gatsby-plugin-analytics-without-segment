'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onRenderBody = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tools = require('./tools.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__dirname = '/Users/henning/StaticSites/teampilot-gatsby/gatsby/plugins/gatsby-plugin-analytics-without-segment/src';

var fs = require('fs');
var path = require('path');
var Terser = require('terser');
var template = require('lodash/template');

var getSnippet = function getSnippet(pluginOptions) {
  var cdnUrl = pluginOptions.cdnUrl,
      services = pluginOptions.services;
  // in development, stub out all analytics.js methods
  // this prevents "dirtying" your real analytics with local testing/traffic

  var _process$env$NODE_ENV = process.env.NODE_ENV,
      NODE_ENV = _process$env$NODE_ENV === undefined ? 'development' : _process$env$NODE_ENV;

  if (NODE_ENV === 'development') {
    (0, _tools.log)('development mode detected! NOT sending data to analytics-tools');
    return '\n      (function () {\n        // analytics.js stub\n        const analytics = window.analytics = {}\n        const methods = [\n          \'trackSubmit\', \'trackClick\', \'trackLink\', \'trackForm\', \'pageview\',\n          \'identify\', \'reset\', \'group\', \'track\', \'ready\', \'alias\', \'debug\',\n          \'page\', \'once\', \'off\', \'on\'\n        ]\n        methods.forEach(method =>\n          analytics[method] = (...args) => console.log(`[gatsby-plugin-analytics-without-segment development-mode active] analytics.${method}`, ...args)\n        )\n      })()\n    ';
  }
  var templatePath = path.join(__dirname, '../template/snippet.js');
  var source = fs.readFileSync(templatePath, { encoding: 'utf8' });
  var theTemplate = template(source);
  var sourceWithValues = theTemplate({
    cdnUrl: cdnUrl,
    services: JSON.stringify(services)
  });
  var result = Terser.minify(sourceWithValues); // see https://www.npmjs.com/package/terser
  if (result.error) throw new Error(result.error);
  return result.code;
};

var onRenderBody = exports.onRenderBody = function onRenderBody(_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents;

  if (!pluginOptions) throw new Error('please set options for "gatsby-plugin-analytics-js-without-segment" in gatsby-config or remove this plugin');
  delete pluginOptions.plugins; // clean up. For some reason gatsby adds empty `.plugins` property
  (0, _tools.log)('pluginOptions', pluginOptions);
  var snippet = getSnippet(pluginOptions);
  var id = 'analytics-without-segment';
  return setHeadComponents([_react2.default.createElement('script', { id: id, key: id, dangerouslySetInnerHTML: { __html: snippet } })]);
};