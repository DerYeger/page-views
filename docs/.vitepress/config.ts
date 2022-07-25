import { defineConfig } from 'vitepress'

import Package from '../../package.json'

const ogImage = `${Package.homepage}/og-logo.png`

export default defineConfig({
  // site config
  lang: 'en-US',
  title: Package.name,
  description: Package.description,

  head: [
    ['meta', { property: 'og:title', content: Package.name }],
    [
      'meta',
      {
        property: 'og:description',
        content: Package.description,
      },
    ],
    ['meta', { property: 'og:url', content: Package.homepage }],
    [
      'meta',
      {
        property: 'og:image',
        content: ogImage,
      },
    ],
    ['meta', { name: 'twitter:title', content: Package.name }],
    [
      'meta',
      {
        name: 'twitter:description',
        content: Package.description,
      },
    ],
    [
      'meta',
      {
        name: 'twitter:image',
        content: ogImage,
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/og-logo.png',
        sizes: '1024x2024',
      },
    ],
  ],

  themeConfig: {
    editLink: {
      pattern: 'https://github.com/DerYeger/page-views/tree/master/docs/:path',
      text: 'Suggest changes to this page',
    },

    logo: '/logo.svg',

    // algolia: {
    // },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Config', link: '/config/' },
      { text: 'Examples', link: '/examples/' },
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/DerYeger' },
      {
        icon: 'github',
        link: 'https://github.com/DerYeger/page-views',
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-PRESENT Jan Müller',
    },
  },
})
