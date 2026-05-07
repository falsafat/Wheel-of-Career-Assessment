/**
 * Landing Page — FR-01
 * Accessible, keyboard-navigable landing with explanation of the Wheel of Career.
 */

import { getData } from '../state.js';
import { navigate } from '../router.js';

export function renderLanding(app) {
  const data = getData();
  const meta = data.meta;

  app.innerHTML = `
    <main class="landing-page" id="main-content" role="main">
      <!-- Decorative Background Elements -->
      <div class="bg-orb orb-1"></div>
      <div class="bg-orb orb-2"></div>
      <div class="bg-orb orb-3"></div>

      <div class="landing-container">
        <!-- Left Column: Hero Content -->
        <div class="landing-hero animate-slide-in-left">
          <div class="hero-badge">✨ Discover Your Potential</div>
          <h1 class="landing-title">
            <span class="title-highlight">Wheel of Career</span><br/>
            Assessment
          </h1>
          <p class="landing-subtitle">${meta.description}</p>
          
          <div class="hero-cta">
            <button id="start-assessment-btn" class="btn btn-primary btn-glow btn-xl" aria-label="Begin the career assessment">
              Start Assessment <span class="arrow">→</span>
            </button>
            <div class="hero-time-estimate">
              <span aria-hidden="true">⏱️</span> Takes ${meta.estimatedTime}
            </div>
          </div>

          <div class="hero-stats">
            <div class="hero-stat-item">
              <span class="stat-number">${meta.totalQuestions}</span>
              <span class="stat-text">Deep<br/>Questions</span>
            </div>
            <div class="stat-divider"></div>
            <div class="hero-stat-item">
              <span class="stat-number">8</span>
              <span class="stat-text">Career<br/>Dimensions</span>
            </div>
            <div class="stat-divider"></div>
            <div class="hero-stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-text">Personalized<br/>Report</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Visuals & Info -->
        <div class="landing-visuals animate-slide-in-right">
          <div class="glass-panel">
            <h2 class="panel-title">Why take the assessment?</h2>
            <ul class="benefit-list">
              <li>
                <div class="benefit-icon">🎯</div>
                <div class="benefit-content">
                  <strong>Gain Self-Awareness</strong>
                  <p>Visualize exactly what's working and what needs attention in your career right now.</p>
                </div>
              </li>
              <li>
                <div class="benefit-icon">💬</div>
                <div class="benefit-content">
                  <strong>Guide Conversations</strong>
                  <p>Use your personalized radar chart to drive meaningful 1-on-1s with your manager.</p>
                </div>
              </li>
              <li>
                <div class="benefit-icon">📈</div>
                <div class="benefit-content">
                  <strong>Actionable Growth</strong>
                  <p>Receive tailored insights and reflection questions to plan your next career move.</p>
                </div>
              </li>
            </ul>

            <h3 class="dimensions-title">Dimensions Assessed</h3>
            <div class="dimension-chips stagger-children">
              ${data.sections.map(s => `
                <div class="chip">
                  <span class="chip-dot" style="background:${s.color}"></span>
                  ${s.name}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Footer / Disclaimer -->
      <footer class="landing-footer animate-fade-in">
        <div class="privacy-notice">
          <strong>🔒 Privacy First</strong>
          <p>${meta.privacyNotice} ${meta.disclaimer}</p>
        </div>
      </footer>
    </main>
  `;

  // Bind start button
  const startBtn = document.getElementById('start-assessment-btn');
  startBtn.addEventListener('click', () => {
    navigate('#assessment');
  });

  // Keyboard: Enter activates start
  startBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate('#assessment');
    }
  });

  // Auto-focus the start button after page renders
  requestAnimationFrame(() => {
    startBtn.focus({ preventScroll: true });
  });
}
