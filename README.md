# gatsby-plugin-analytics-without-segment

A [Gatsby](https://www.gatsbyjs.org) plugin to use Segments open-source analytics library (analytics.js) **WITHOUT using the paid Segment service (segment.com)**.

## Pitch
The concept of analytics.js is awesome. **BUT Segments's  free tier (max 1.000 monthly users) might not work for you**, if you have a lot of non-paying visitors on your website.

So if you want an **easy-to-configure** `analytics.js`-wrapper for your analytics (**Google Analytics, Mixpanel, Hotjar, YouNameIt, ...**), then this is your go-to! Basically **ALL big analytics-integrations are supported**.

**This solution is open source, unlimited and free forever!**

*Background (state 2018-10-24): Segment.com has aggressive pay-or-leave policies, which they will apply after you hit the 1000 free monthly users limit. They will lock your account and stop processing your events after a deadline.*

## Details

 * **Best-practise loading of analytics.js**: This plugin loads [Segments analytics.js](https://github.com/segmentio/analytics.js) following [best-practises](http://www.ianww.com/blog/2017/08/06/analytics-js-standalone-library/) and enables you to easily set options (`cdnUrl` and `services`) via Gatsby-config.
 * **Unlimited and free**: You'll use the free analytics.js and not depend on Segment (which has aggressive pay-or-leave policies, after you hit the 1000 free monthly users)
 * **Auto-Track route changes**: Routes are **automatically** tracked via `analytics.page()` via Gatsby
 * **Track events anywhere**: You can track custom-events anywhere in your code via `analytics.track()`
 * **Supported integrations**: A LOT of analytics-tools are supported. see https://github.com/segment-integrations.
 * **Development-mode**: In development you'll only see the events in the console. Your events will NOT be forwarded
 * **Production-mode**: All events will be routed to the services. Check your console for possible errors.

## Usage

In your `gatsby-config.js`, add:

```js
module.exports = {
  plugins: [
    // your other plugins...
    {
      resolve: 'gatsby-plugin-analytics-without-segment',
      options: {
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/analytics.js/2.9.1/analytics.min.js',  // host yourself or use cdnjs (https://cdnjs.com/libraries/analytics.js)
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
          // ... other service? See supported integrations (that can be loaded via analytics.js) at https://github.com/segment-integrations.
        },
      },
    },
    // ...your other plugins
  ]
}
```

In your code you can track events like:

```
analytics.track('Some event', {
  property1: 'xyz',
  // more data
})
```

## WHY using this?

Advantages:
 * You will NOT run out of segments free tier after hitting 1000 MPU (monthly users), because you simply do NOT use it
 * You'll have a single API for tracking analytics (p.e. `analytics.page()` or `analytics.track()`)

Disadvantages:
 * This does NOT work on server-side
 * It might take a bit more time to configure than using segment
 * You do NOT any of segments other cool features (which you will not need when starting a side-project)

## Question: What analytics-services are supported?
You should be able to use ALL services that segment itself supports and has integrations available. You'll have to dig around a bit in segment's code to find the options for each individual tool.

Check out the supported Integrations (that can be loaded via analytics.js) at https://github.com/segment-integrations.

## Credits

This is project is based on https://gist.github.com/typpo/5e2e4403c60314e04e8b6b257555f6de
 and the related blogpost at http://www.ianww.com/blog/2017/08/06/analytics-js-standalone-library/.

## Contribute

CLI cheatsheat:

```
npm run build-watch;  # auto-compile on file-change from /src to / via babel
```

## License

MIT
