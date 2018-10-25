import React from 'react'
import { renderAnalytics } from 'analytics-js-without-segment'

import { log } from './tools.js'

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  if (!pluginOptions) throw new Error('please set options for "gatsby-plugin-analytics-without-segment" in gatsby-config or remove this plugin')
  if (!pluginOptions.services) throw new Error('please set "services"-options for "gatsby-plugin-analytics-without-segment" in gatsby-config or remove this plugin. See README for details')
  delete pluginOptions.plugins  // clean up. For some reason gatsby adds empty `.plugins` property
  log('pluginOptions', pluginOptions)
  const snippet = renderAnalytics(pluginOptions)
  const id = 'gatsby-plugin-analytics-without-segment'
  return setHeadComponents([
    <script id={id} key={id} dangerouslySetInnerHTML={{ __html: snippet }} />
  ])
}
