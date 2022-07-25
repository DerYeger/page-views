# Guide

<ViewCounter />

## Installation

```bash
# with yarn
yarn add @yeger/page-views

# or with npm
npm install @yeger/page-views

# or with pnpm
pnpm add @yeger/page-views
```

## Usage

### Automatic Submission

`PageViews.autoSubmitViews()` will submit a view of the current page and listen for client-side navigation events to submit those as well.
Ideally, you should call this function in the entry-point of your application.

::: warning
In order to achieve automatic submitting, the function `history.pushState` will be augmented to fire a custom event `loationchange`.
As outlined in [this](https://stackoverflow.com/a/52809105) StackOverflow answer, there's currently no other way to achieve this.
:::

::: tip
It is safe to call `PageViews.autoSubmitViews()` multiple times, as consecutive calls will have no effect.
:::

### Manual Submission

`PageViews.submitView()` can be used to manually submit a view.
Its main use-case are static pages without client side navigation.
As such, it should be called in the entry-point of your pages.

However, [automatic submission](./#automatic-submission) is recommended over manual submission.

### Fetching Page Views

`PageViews.getViews()` will resolve to the views of the current page.

### Custom Pages

As an optional second argument, both `PageViews.submitView()` and `PageViews.getViews()` can receive a string that will be submitted instead of the current page.
