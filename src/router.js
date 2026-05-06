/**
 * Simple hash-based page router.
 */

const routes = {};
let currentCleanup = null;

/** Register a route */
export function registerRoute(hash, renderFn) {
  routes[hash] = renderFn;
}

/** Navigate to a hash route */
export function navigate(hash) {
  window.location.hash = hash;
}

/** Initialize the router */
export function initRouter() {
  const handleRoute = async () => {
    // Clean up previous page if needed
    if (currentCleanup && typeof currentCleanup === 'function') {
      currentCleanup();
      currentCleanup = null;
    }

    const hash = window.location.hash || '#landing';
    const renderFn = routes[hash] || routes['#landing'];

    if (renderFn) {
      const app = document.getElementById('app');
      app.innerHTML = '';
      currentCleanup = await renderFn(app);
      // Scroll to top on navigation
      window.scrollTo(0, 0);
    }
  };

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
