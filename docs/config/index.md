# Configuration

<ViewCounter />

The functions [`PageViews.autoSubmitViews()`](/guide/#automatic-submission), [`PageViews.submitView()`](/guide/#manual-submission) and [`PageViews.getViews()`](/guide/#fetching-page-views) receive an optional configuration as their first argument.
This configuration will be merged with the default configuration seen below.

<<< @/../src/main.ts#config{0}

## backendUrl

- Type: `string`
- Default: `https://page-views.up.railway.app/api/views`

This is the URL of the backend that will be used for aggregating a view counter.

You may use the provided backend instance, self-host an instance, deploy an instance on Railway (by clicking the button below) or even use a custom backend that adheres to the schema used.

<DeployOnRailwayButton />

## filter

- Type: `(page: string) => boolean`
- Default: `() => true`

The `filter` function is called before a page view is submitted.
It can be used to exclude specific pages from being submitted.

## Throttle

- Type: `number | false`
- Default: `86400000`

The `throttle` property decides if clients should throttle submitting repeated views of a page.
If set to `false`, every single view will be submitted.
Otherwise, the value will is used as a timeout (in milliseconds) for submitting a page view again.

::: warning
To achieve this, the library will create `localStorage` items for each submitted page with a timestamp of the submission.
The prefix `eu.yeger.page-views.` is used to prevent key collisions.
:::

## trackPopState

- Type: `boolean`
- Default: `false`

If this option is set to `true`, `PageViews.autoSubmitViews()` will also submit views on `popstate` events, i.e., back-navigation.
