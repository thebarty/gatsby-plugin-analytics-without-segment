# gatsby-plugin-segment

A [Gatsby](https://www.gatsbyjs.org) plugin for [Segment](https://segment.com/).

Check out which integrations are supported at
 * OVERVIEW https://github.com/segment-integrations
 * MIXPANEL https://github.com/segment-integrations/analytics.js-integration-mixpanel


## Usage

In your `gatsby-config.js`, add:

```js
module.exports = {
  plugins: [
    // your other plugins...
    {
      resolve: 'gatsby-plugin-analytics-without-segment',
      options: {
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/analytics.js/2.9.1/analytics.min.js',
        services: {
          // see integration https://github.com/segment-integrations/analytics.js-integration-google-analytics/blob/master/lib/index.js
          'Google Analytics': {
            trackingId: 'UA-XXX-1',
            anonymizeIp: true,
          },
          // see integration https://github.com/segment-integrations/analytics.js-integration-mixpanel/blob/master/lib/index.js
          'Mixpanel': {
            token: 'XXX',
            people: true,
            trackAllPages: true,
          },
          // see integration https://github.com/segment-integrations/analytics.js-integration-fullstory/blob/master/lib/index.js
          'FullStory': {
            org: 'XXX',
            debug: true,
          },
        },
      },
    },
    // ...your other plugins
  ]
}
```

## Inspirations

This is project is based on https://gist.github.com/typpo/5e2e4403c60314e04e8b6b257555f6de
 and the related blogpost at http://www.ianww.com/blog/2017/08/06/analytics-js-standalone-library/.

## Contribute

CLI cheatsheat:

```
npm run build-watch;  # auto-compile on file-change from /src to / via babel
```

## License

MIT
