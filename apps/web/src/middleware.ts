import { NextResponse } from 'next/server';

export function middleware() {
  const cspHeader = `
    default-src 'self' https://*.flowise.theanswer.ai https://*.theanswer.ai localhost:8888 https://*.sentry.io https://*.facebook.com vitals.vercel-insights.com https://*.hubapi.com https://*.hsforms.com https://*.hs-scripts.com https://*.hsforms.net https://*.hscollectedforms.net https://*.netlify.app https://*.googletagmanager.com https://*.googletagmanager.com https://*.google-analytics.com;
    style-src 'self' 'unsafe-inline' https://*.sentry.io fonts.googleapis.com vitals.vercel-insights.com https://*.hs-scripts.com https://*.hsforms.net https://*.googletagmanager.com https://*.googletagmanager.com https://*.google-analytics.com;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.flowise.theanswer.ai https://*.theanswer.ai https://*.sentry.io https://*.google-analytics.com https://*.googletagmanager.com vitals.vercel-insights.com https://*.hs-analytics.net https://*.hs-banner.com https://*.hsadspixel.net https://*.hscollectedforms.net https://*.jquery.com https://*.hs-scripts.com https://*.hsforms.net https://*.hubspot.com https://js.hs-scripts.com https://js.hsforms.net https://js.hubspot.com https://netlify-cdp-loader.netlify.app https://*.netlify.app https://f.vimeocdn.com https://www.gstatic.com https://*.googleadservices.com https://*.doubleclick.net https://*.g.doubleclick.net https://*.analytics.google.com https://analytics.google.com;
    font-src 'self' https://*.sentry.io fonts.gstatic.com https://*.hs-scripts.com https://*.hsforms.net data: https://*.googletagmanager.com https://*.googletagmanager.com https://*.google-analytics.com;
    connect-src https://*.hsforms.com https://*.hsforms.net https://*.hubapi.com https://*.hs-scripts.com https://*.hscollectedforms.net https://track.hubspot.com https://*.hubspot.com https://*.hs-analytics.net https://*.hubspot.net https://*.google-analytics.com https://*.analytics.google.com https://*.doubleclick.net https://*.g.doubleclick.net;
    frame-src 'self' lastrev.com forms.hsforms.com https://*.theanswer.ai https://*.flowise.theanswer.ai https://*.googletagmanager.com https://www.google.com https://www.youtube.com https://*.hubspot.com https://meetings.hubspot.com https://*.doubleclick.net https://*.g.doubleclick.net;
    img-src 'self' https://*.googletagmanager.com https://*.ctfassets.net https://images.contentful.com https://forms-na1.hsforms.com https://*.hsforms.com https://track.hubspot.com https://*.hubspot.com data: https://*.hsforms.net https://*.hs-analytics.net https://*.google.com https://*.doubleclick.net https://*.g.doubleclick.net https://*.analytics.google.com;
    media-src * data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://*.hsforms.com;
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
