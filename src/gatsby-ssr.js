import React from 'react'
const fs = require('fs')
const path = require('path')
const Terser = require('terser')
const template = require('lodash/template')

import { log } from './tools.js'

const getSnippet = (pluginOptions) => {
  const { cdnUrl, services } = pluginOptions
  // in development, stub out all analytics.js methods
  // this prevents "dirtying" your real analytics with local testing/traffic
  const { NODE_ENV = 'development' } = process.env
  if (NODE_ENV === 'development') {
    log('development mode detected! NOT sending data to analytics-tools')
    return `
      (function () {
        // analytics.js stub
        const analytics = window.analytics = {}
        const methods = [
          'trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview',
          'identify', 'reset', 'group', 'track', 'ready', 'alias', 'debug',
          'page', 'once', 'off', 'on'
        ]
        methods.forEach(method =>
          analytics[method] = (...args) => console.log(\`[gatsby-plugin-analytics-without-segment development-mode active] analytics.\${method}\`, ...args)
        )
      })()
    `
  }
  const templatePath = path.join(__dirname, '../template/snippet.js')
  const source = fs.readFileSync(templatePath, { encoding: 'utf8' })
  const theTemplate = template(source)
  const sourceWithValues = theTemplate({
    cdnUrl,
    services: JSON.stringify(services),
  })
  const result = Terser.minify(sourceWithValues)  // see https://www.npmjs.com/package/terser
  if (result.error) throw new Error(result.error)
  return result.code
}

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  if (!pluginOptions) throw new Error('please set options for "gatsby-plugin-analytics-js-without-segment" in gatsby-config or remove this plugin')
  delete pluginOptions.plugins  // clean up. For some reason gatsby adds empty `.plugins` property
  log('pluginOptions', pluginOptions)
  const snippet = getSnippet(pluginOptions)
  const id = 'analytics-without-segment'
  return setHeadComponents([
    <script id={id} key={id} dangerouslySetInnerHTML={{ __html: snippet }} />
  ])
}
