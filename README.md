<h1 align="center">page-views</h1>

<p align="center">
  <a href="https://page-views.yeger.eu">
    Documentation
  </a>
</p>

<!-- <p align="center">
    TODO
</p> -->

<p align="center">
  <a href="https://github.com/DerYeger/page-views/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/github/workflow/status/DerYeger/page-views/CI?label=ci&logo=github&color=#4DC71F">
  </a>
  <a href="https://www.npmjs.com/package/page-views">
    <img alt="NPM" src="https://img.shields.io/npm/v/page-views?logo=npm">
  </a>
  <a href="https://codecov.io/gh/DerYeger/page-views">
    <img alt="Coverage" src="https://codecov.io/gh/DerYeger/page-views/branch/master/graph/badge.svg?token=p35W6u2noe">
  </a>
  <a href="https://lgtm.com/projects/g/DerYeger/page-views">
    <img alt="LGTM Grade" src="https://img.shields.io/lgtm/grade/javascript/github/DerYeger/page-views?logo=lgtm">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img alt="MIT" src="https://img.shields.io/npm/l/page-views?color=%234DC71F">
  </a>
  <a href="https://bundlephobia.com/package/page-views">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/page-views">
  </a>
</p>

## Installation

```bash
# yarn
$ yarn add page-views

# npm
$ npm install page-views
```

## Usage

```typescript
import PageViews from 'page-views'

// Manually submit a view of the current page
await PageViews.submitView()

// Automatically submit views
PageViews.autoSubmitViews()

// Get views of current page
await PageViews.getViews()
```

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
