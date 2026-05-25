// 检测旧版浏览器并添加 class
const addLegacyBrowser = function () {
  var ua = navigator.userAgent;

  var chromeMatch = ua.match(/Chrome\/(\d+)/);
  var chromeVersion = chromeMatch ? parseInt(chromeMatch[1], 10) : 0;

  var isAndroidWebView =
    /wv|WebView/.test(ua) || (ua.includes('Android') && !ua.includes('Chrome'));

  if (chromeVersion > 0 && chromeVersion < 109) {
    document.documentElement.classList.add('legacy-browser');
  } else if (isAndroidWebView) {
    document.documentElement.classList.add('legacy-browser');
    console.log('[LegacyBrowser] Detected Android WebView');
  }
};

function checkHasSelectorSupport(): boolean {
  try {
    return (
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('selector(:has(*))')
    );
  } catch {
    return false;
  }
}

function checkInertSupport(): boolean {
  try {
    const el = document.createElement('div');
    return 'inert' in el;
  } catch {
    return false;
  }
}

function applyInertPolyfill(): void {
  if (checkInertSupport()) {
    return;
  }

  const inertElements = document.querySelectorAll('[inert]');

  inertElements.forEach(function (el: Element) {
    el.classList.add('inert');
    disableDescendants(el as HTMLElement);
  });

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node instanceof Element && node.hasAttribute('inert')) {
          node.classList.add('inert');
          disableDescendants(node as HTMLElement);
        }
      });

      mutation.removedNodes.forEach(function (node) {
        if (node instanceof Element && node.hasAttribute('inert')) {
          node.classList.remove('inert');
          enableDescendants(node as HTMLElement);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['inert'],
  });
}

function disableDescendants(el: HTMLElement): void {
  const focusable = el.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  focusable.forEach(function (item: Element) {
    const htmlEl = item as HTMLElement;
    if (!htmlEl.hasAttribute('data-inert-original-tabindex')) {
      htmlEl.setAttribute('data-inert-original-tabindex', String(htmlEl.tabIndex));
    }
    htmlEl.tabIndex = -1;
    htmlEl.setAttribute('aria-hidden', 'true');
  });
}

function enableDescendants(el: Element): void {
  const focusable = el.querySelectorAll('button, [href], input, select, textarea, [tabindex]');

  focusable.forEach(function (item: Element) {
    const htmlEl = item as HTMLElement;
    const originalTabIndex = htmlEl.getAttribute('data-inert-original-tabindex');
    if (originalTabIndex !== null) {
      htmlEl.tabIndex = parseInt(originalTabIndex, 10);
      htmlEl.removeAttribute('data-inert-original-tabindex');
    }
    htmlEl.removeAttribute('aria-hidden');
  });
}

function applyHasPolyfill(): void {
  if (checkHasSelectorSupport()) {
    return;
  }

  document.body.classList.add('no-has-selector-support');

  const navbarToggle = document.querySelector('.navbar .navbar-toggle');
  if (navbarToggle) {
    const observer = new MutationObserver(function () {
      const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
      const sidebar = document.querySelector('.theme-layout-navbar-sidebar');

      if (sidebar) {
        if (isExpanded) {
          sidebar.classList.add('navbar-expanded');
        } else {
          sidebar.classList.remove('navbar-expanded');
        }
      }
    });

    observer.observe(navbarToggle, {
      attributes: true,
      attributeFilter: ['aria-expanded'],
    });

    if (navbarToggle.getAttribute('aria-expanded') === 'true') {
      const sidebar = document.querySelector('.theme-layout-navbar-sidebar');
      if (sidebar) {
        sidebar.classList.add('navbar-expanded');
      }
    }
  }

  const paragraphs = document.querySelectorAll('li > p');
  paragraphs.forEach(function (p) {
    let hasNextSibling = false;
    let sibling = p.nextElementSibling;

    while (sibling) {
      if (sibling.tagName === 'UL' || sibling.tagName === 'OL') {
        hasNextSibling = true;
        break;
      }
      sibling = sibling.nextElementSibling;
    }

    if (hasNextSibling) {
      p.classList.add('has-child-list');
    }
  });
}

function initLegacyBrowserPolyfills() {
  addLegacyBrowser();
  applyInertPolyfill();
  applyHasPolyfill();
}

export { addLegacyBrowser, applyInertPolyfill, applyHasPolyfill, initLegacyBrowserPolyfills };
