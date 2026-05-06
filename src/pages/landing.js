/**
 * Landing Page — FR-01
 */

import { getData } from '../state.js';
import { navigate } from '../router.js';

export function renderLanding(app) {
  const data = getData();
  const meta = data.meta;

  app.innerHTML = `
    <div class="landing-page">
      <div class="landing-content animate-fade-in-up">
        <div class="landing-icon">🎡</div>
        <h1 class="landing-title">${meta.title}</h1>
        <p class="landing-subtitle">${meta.description}</p>

        <div class="landing-stats">
          <div class="stat-card">
            <div class="stat-value">${meta.totalQuestions}</div>
            <div class="stat-label">Questions</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">8</div>
            <div class="stat-label">Dimensions</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${meta.estimatedTime}</div>
            <div class="stat-label">Est. Time</div>
          </div>
        </div>

        <div class="landing-dimensions stagger-children">
          ${data.sections.map(s => `
            <div class="dimension-chip">
              <span class="dimension-dot" style="background:${s.color}"></span>
              ${s.icon} ${s.name}
            </div>
          `).join('')}
        </div>

        <div class="landing-cta">
          <button id="start-assessment-btn" class="btn btn-primary btn-lg">
            Start Assessment →
          </button>
        </div>

        <div class="landing-privacy">
          <strong>📋 Privacy & Disclaimer</strong>
          ${meta.privacyNotice}<br/><br/>
          <em>${meta.disclaimer}</em>
        </div>
      </div>
    </div>
  `;

  // Bind start button
  document.getElementById('start-assessment-btn').addEventListener('click', () => {
    navigate('#assessment');
  });
}
