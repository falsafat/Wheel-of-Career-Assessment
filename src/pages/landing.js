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
      <div class="landing-content animate-fade-in-up">
        <div class="landing-icon" aria-hidden="true">🎡</div>
        <h1 class="landing-title">${meta.title}</h1>
        <p class="landing-subtitle">${meta.description}</p>

        <!-- What is the Wheel of Career -->
        <section class="landing-about" aria-label="About the Wheel of Career">
          <h2 class="about-title">What is the Wheel of Career?</h2>
          <p class="about-text">
            The Wheel of Career is a self-reflection framework designed to help you evaluate
            where you stand across the most important dimensions of your professional life.
            By answering 40 carefully crafted questions, you'll receive a visual radar chart
            — your personal "career wheel" — that highlights your strengths and areas for growth.
          </p>
          <div class="about-highlights">
            <div class="highlight-item">
              <span class="highlight-icon" aria-hidden="true">🔍</span>
              <div>
                <strong>Self-Awareness</strong>
                <span>Gain clarity on what's working and what needs attention in your career</span>
              </div>
            </div>
            <div class="highlight-item">
              <span class="highlight-icon" aria-hidden="true">💬</span>
              <div>
                <strong>Development Conversations</strong>
                <span>Use your results to guide meaningful discussions with managers and mentors</span>
              </div>
            </div>
            <div class="highlight-item">
              <span class="highlight-icon" aria-hidden="true">📊</span>
              <div>
                <strong>Actionable Insights</strong>
                <span>Receive personalized feedback and reflection questions based on your scores</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Assessment overview stats -->
        <div class="landing-stats" role="list" aria-label="Assessment overview">
          <div class="stat-card" role="listitem">
            <div class="stat-value" aria-label="${meta.totalQuestions} questions">${meta.totalQuestions}</div>
            <div class="stat-label">Questions</div>
          </div>
          <div class="stat-card" role="listitem">
            <div class="stat-value" aria-label="8 career dimensions">8</div>
            <div class="stat-label">Dimensions</div>
          </div>
          <div class="stat-card" role="listitem">
            <div class="stat-value stat-value-time" aria-label="Estimated time: ${meta.estimatedTime}">${meta.estimatedTime}</div>
            <div class="stat-label">Est. Time</div>
          </div>
        </div>

        <!-- 8 Dimension chips -->
        <h3 class="dimensions-heading">Career Dimensions Assessed</h3>
        <div class="landing-dimensions stagger-children" role="list" aria-label="Career dimensions assessed">
          ${data.sections.map(s => `
            <div class="dimension-chip" role="listitem">
              <span class="dimension-dot" style="background:${s.color}" aria-hidden="true"></span>
              <span aria-hidden="true">${s.icon}</span> ${s.name}
            </div>
          `).join('')}
        </div>

        <div class="landing-cta">
          <button id="start-assessment-btn" class="btn btn-primary btn-lg" aria-label="Begin the career assessment">
            Start Assessment →
          </button>
        </div>

        <aside class="landing-privacy" aria-label="Privacy and disclaimer information">
          <strong>📋 Privacy & Disclaimer</strong>
          ${meta.privacyNotice}<br/><br/>
          <em>${meta.disclaimer}</em>
        </aside>
      </div>
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
