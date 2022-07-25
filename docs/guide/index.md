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

### Automatic submission

`PageViews.autoSubmitViews()` will submit a view of the current page and listen for client-side navigation events to submit those as well.

::: warning
In order to achieve automatic submitting, the function `history.pushState` will be augmented to fire a custom event `loationchange`.
As outlined in [this](https://stackoverflow.com/a/52809105) StackOverflow answer, there's currently no other way to achieve this.
:::

::: tip
It is safe to call `PageViews.autoSubmitViews()` multiple times, as consecutive calls will have no effect.
:::

### Manual submission

`PageViews.submitView()` can be used to manually submit a view.
Its main use-case are static pages without client side navigation.
As such, it should be called in the entry-point of your application.

### Fetching page views

`PageViews.getViews()` will resolve to the views of the current page.

### Examples

#### React

<<< @/guide/samples/ViewCounter.tsx{0}

#### Vue

<<< @/.vitepress/components/ViewCounter.vue#example{0}
