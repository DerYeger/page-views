<h1 align="center">@yeger/page-views</h1>

<p align="center">
  <img src="docs/public/logo.svg" alt="Logo" width="256px" height="256px">
</p>

<p align="center">
  <a href="https://page-views.yeger.eu">
    Documentation
  </a>
</p>

<p align="center">
  <a href="https://railway.app/new/template/ZbP0ks?referralCode=FzqVFW">
    <img alt="Deploy on Railway" src="https://railway.app/button.svg">
  </a>
</p>

<p align="center">
  A privacy-friendly counter for page views.
</p>

<p align="center">
  <a href="https://github.com/DerYeger/page-views/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/github/workflow/status/DerYeger/page-views/CI?label=ci&logo=github&color=#4DC71F">
  </a>
  <a href="https://www.npmjs.com/package/@yeger/page-views">
    <img alt="NPM" src="https://img.shields.io/npm/v/@yeger/page-views?logo=npm">
  </a>
  <a href="https://codecov.io/gh/DerYeger/page-views">
    <img alt="Coverage" src="https://codecov.io/gh/DerYeger/page-views/branch/master/graph/badge.svg?token=p35W6u2noe">
  </a>
  <a href="https://lgtm.com/projects/g/DerYeger/page-views">
    <img alt="LGTM Grade" src="https://img.shields.io/lgtm/grade/javascript/github/DerYeger/page-views?logo=lgtm">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img alt="MIT" src="https://img.shields.io/npm/l/@yeger/page-views?color=%234DC71F">
  </a>
  <a href="https://bundlephobia.com/package/@yeger/page-views">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/@yeger/page-views">
  </a>
</p>

# Features

- 🕵🏻‍♂️ **Privacy-friendly**: No user-tracking. Clients decide when to submit a page view.
- 🪶 **Lightweight & Simple**: Less than a kilobyte gzipped. Can be configured to automatically submit views, even after client-side navigation.
- 💻 **Self-hostable**: By default, a public instance of the backend is used. Alternatively, a self-hosted instance or a custom backend adhering to the scheme can be used.

## Installation

```bash
# yarn
$ yarn add @yeger/page-views

# npm
$ npm install @yeger/page-views
```

## Usage

```typescript
import PageViews from '@yeger/page-views'

// Manually submit a view of the current page
await PageViews.submitView()

// Automatically submit views
PageViews.autoSubmitViews()

// Get views of current page
await PageViews.getViews()
```

### Examples

React and Vue examples can be found [here](https://page-views.yeger.eu/examples/).

## Development

```bash
# install dependencies
$ yarn install

# build for production
$ yarn build

# build in watch mode
$ yarn dev

# lint project files
$ yarn lint

# serve docs
$ yarn docs:dev
```

## License

[MIT](./LICENSE) - Copyright &copy; Jan Müller
