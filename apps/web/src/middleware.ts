import { NextResponse } from 'next/server';

export function middleware() {
  const cspHeader = `
    default-src 'self' https://*.flowise.theanswer.ai https://*.theanswer.ai localhost:8888 https://*.sentry.io https://*.facebook.com https://vitals.vercel-insights.com https://*.hubapi.com https://*.hsforms.com https://*.hs-scripts.com https://*.hsforms.net https://*.hscollectedforms.net https://*.netlify.app https://*.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://*.sentry.io https://fonts.googleapis.com https://vitals.vercel-insights.com https://*.hs-scripts.com https://*.hsforms.net https://*.googletagmanager.com;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.flowise.theanswer.ai https://*.theanswer.ai https://*.sentry.io https://*.google-analytics.com https://*.googletagmanager.com https://vitals.vercel-insights.com https://*.hs-analytics.net https://*.hs-banner.com https://*.hsadspixel.net https://*.hscollectedforms.net https://*.jquery.com https://*.hs-scripts.com https://*.hsforms.net https://netlify-cdp-loader.netlify.app;
    font-src 'self' https://*.sentry.io https://fonts.gstatic.com https://*.hs-scripts.com https://*.hsforms.net data: https://*.googletagmanager.com;
    frame-src 'self' https://lastrev.com https://forms.hsforms.com https://*.theanswer.ai https://*.flowise.theanswer.ai https://*.googletagmanager.com;
    img-src 'self' https://*.googletagmanager.com https://*.google-analytics.com data:;
    connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com;
    media-src * data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self' https://app.contentful.com https://lastrev.com https://lr-live-editor.netlify.app https://*.theanswer.ai https://*.flowise.theanswer.ai;
    block-all-mixed-content;
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers();

  const securityHeaders = [
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
      key: 'Content-Security-Policy',
      value: cspHeader.replace(/\s{2,}/g, ' ').trim()
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
