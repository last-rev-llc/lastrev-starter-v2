import { NextResponse } from 'next/server';

export function middleware() {
  const defaultSources = [
    'self',
    'https://*.flowise.theanswer.ai',
    'https://*.theanswer.ai',
    'localhost:8888',
    'https://*.sentry.io',
    'https://*.facebook.com',
    'https://vitals.vercel-insights.com',
    'https://*.hubapi.com',
    'https://*.hsforms.com',
    'https://*.hs-scripts.com',
    'https://*.hsforms.net',
    'https://*.hscollectedforms.net',
    'https://*.netlify.app',
    'https://*.googletagmanager.com'
  ];

  const styleSources = [
    'self',
    'unsafe-inline',
    'https://*.sentry.io',
    'https://fonts.googleapis.com',
    'https://vitals.vercel-insights.com',
    'https://*.hs-scripts.com',
    'https://*.hsforms.net',
    'https://*.googletagmanager.com'
  ];

  const scriptSources = [
    'self',
    'unsafe-inline',
    'unsafe-eval',
    'https://*.flowise.theanswer.ai',
    'https://*.theanswer.ai',
    'https://*.sentry.io',
    'https://*.google-analytics.com',
    'https://*.googletagmanager.com',
    'https://vitals.vercel-insights.com',
    'https://*.hs-analytics.net',
    'https://*.hs-banner.com',
    'https://*.hsadspixel.net',
    'https://*.hscollectedforms.net',
    'https://*.jquery.com',
    'https://*.hs-scripts.com',
    'https://*.hsforms.net',
    'https://netlify-cdp-loader.netlify.app'
  ];

  const fontSources = [
    'self',
    'https://*.sentry.io',
    'https://fonts.gstatic.com',
    'https://*.hs-scripts.com',
    'https://*.hsforms.net',
    'data:',
    'https://*.googletagmanager.com'
  ];

  const frameSources = [
    'self',
    'https://lastrev.com',
    'https://forms.hsforms.com',
    'https://*.theanswer.ai',
    'https://*.flowise.theanswer.ai',
    'https://*.googletagmanager.com'
  ];

  const imgSources = [
    'self',
    'https://*.googletagmanager.com',
    'https://*.google-analytics.com',
    'https://*.ctfassets.net',
    'data:'
  ];

  const connectSources = [
    'self',
    'https://*.googletagmanager.com',
    'https://*.google-analytics.com'
  ];

  const cspHeader = {
    'default-src': defaultSources,
    'style-src': styleSources,
    'script-src': scriptSources,
    'font-src': fontSources,
    'frame-src': frameSources,
    'img-src': imgSources,
    'connect-src': connectSources,
    'media-src': ['*', 'data:'],
    'object-src': ['none'],
    'base-uri': ['self'],
    'form-action': ['self'],
    'frame-ancestors': [
      'self',
      'https://app.contentful.com',
      'https://lastrev.com',
      'https://lr-live-editor.netlify.app',
      'https://*.theanswer.ai',
      'https://*.flowise.theanswer.ai'
    ],
    'block-all-mixed-content': true,
    'upgrade-insecure-requests': true
  };

  const requestHeaders = new Headers();

  const securityHeaders = [
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
      key: 'Content-Security-Policy',
      value: Object.entries(cspHeader)
        .map(([key, value]) => {
          if (typeof value === 'boolean') {
            return key;
          } else if (Array.isArray(value)) {
            return `${key} ${value.join(' ')}`;
          } else {
            throw new Error(`Unexpected value type for CSP key ${key}`);
          }
        })
        .join('; ')
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin'
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=()'
    }
  ];
  // Setting request headers
  securityHeaders.forEach(({ key, value }) => {
    requestHeaders.set(key, value);
  });

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
};
