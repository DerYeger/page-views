---
layout: home
hero:
  name: '@yeger/page-views'
  text: ''
  tagline: 'A privacy-friendly counter for page views.'
  image:
    src: /logo.svg
    alt: '@yeger/page-views'
  actions:
    - text: Get Started
      link: /guide/
      theme: brand
    - text: View on GitHub
      link: https://github.com/DerYeger/page-views
      theme: alt
features:
  - icon: 🕵🏻‍♂️
    title: 'Privacy-friendly'
    details: 'No user-tracking. Clients decide when to submit a page view.'
  - icon: 🪶
    title: 'Lightweight & Simple'
    details: Less than a kilobyte gzipped. Can be configured to automatically submit views, even after client-side navigation.
  - icon: 💻
    title: 'Self-hostable'
    details: 'By default, a public instance of the backend is used. Alternatively, a self-hosted instance or a custom backend adhering to the scheme can be used.'
---

<DeployOnRailwayButton style="margin-top: 2rem;" />
<ViewCounter />
