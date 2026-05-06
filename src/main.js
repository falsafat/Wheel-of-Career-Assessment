/**
 * Main entry point — Wheel of Career Assessment
 */

import './styles/index.css';
import './styles/landing.css';
import './styles/assessment.css';
import './styles/results.css';

import { loadAssessmentData } from './state.js';
import { registerRoute, initRouter } from './router.js';
import { renderLanding } from './pages/landing.js';
import { renderAssessment } from './pages/assessment.js';
import { renderResults } from './pages/results.js';

async function init() {
  // Load assessment data
  await loadAssessmentData();

  // Register routes
  registerRoute('#landing', renderLanding);
  registerRoute('#assessment', renderAssessment);
  registerRoute('#results', renderResults);

  // Start router
  initRouter();
}

init().catch(console.error);
