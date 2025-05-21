// gtm.js
type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export const page_view = (url: string) => {
  if (typeof window.dataLayer !== 'undefined') {
    console.log('GTM Pageview Event:', { event: 'page_view', page: url });
    window.dataLayer.push({
      event: 'page_view',
      page: url,
      page_title: document.title,
      page_path: url,
      timestamp: new Date().toISOString()
    });
  } else {
    console.warn('dataLayer is not defined');
  }
};
