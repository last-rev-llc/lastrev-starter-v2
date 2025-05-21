const pages = require('./apps/web/cypress/fixtures/generated_pages.json');

module.exports = {
  id: 'visual-regression',
  viewports: [
    {
      label: 'desktop',
      width: 1440,
      height: 900
    }
  ],
  scenarios: pages.map((path) => ({
    label: path === '/' ? 'home' : path.replace(/\//g, '-').replace(/^-/,'') ,
    url: `http://localhost:3000${path}`
  })),
  paths: {
    bitmaps_reference: 'backstop_data/bitmaps_reference',
    bitmaps_test: 'backstop_data/bitmaps_test',
    engine_scripts: 'backstop_data/engine_scripts',
    html_report: 'backstop_data/html_report',
    ci_report: 'backstop_data/ci_report'
  },
  engine: 'puppeteer',
  report: ['browser'],
  debug: false
};
