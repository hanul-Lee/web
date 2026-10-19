/* GA4 standard (free). Reports are available only to authorized Google accounts.
 * Set the web data stream's public measurement ID below after account setup.
 * This is not an API secret. Never put an API secret in this file.
 */
(() => {
  'use strict';

  const measurementId = 'G-WD9CM53DY0';
  const localHosts = new Set(['localhost', '127.0.0.1', '[::1]']);
  if (!/^G-[A-Z0-9]+$/.test(measurementId) ||
      !/^https?:$/.test(window.location.protocol) ||
      localHosts.has(window.location.hostname) ||
      window.navigator.doNotTrack === '1' || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    // Preserve campaign attribution, but omit unrelated query strings and fragments.
    page_location: (() => {
      const url = new URL(window.location.href);
      const campaign = new URLSearchParams();
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content']) {
        if (url.searchParams.has(key)) campaign.set(key, url.searchParams.get(key));
      }
      url.search = campaign.toString();
      url.hash = '';
      return url.href;
    })(),
    page_referrer: (() => {
      try {
        const url = new URL(document.referrer);
        return url.origin + url.pathname;
      } catch { return ''; }
    })()
  });

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(tag);

  // Downloads, page views, scroll and engagement use GA4 enhanced measurement.
  // Contact events contain the type only, never an email address or phone number.
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    const method = href.startsWith('mailto:') ? 'email' : href.startsWith('tel:') ? 'phone' : '';
    if (method) window.gtag('event', 'contact_click', { contact_method: method });
  });
})();
