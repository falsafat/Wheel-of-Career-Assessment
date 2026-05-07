/**
 * Results Page — FR-06, FR-07, FR-08, FR-09, FR-10, FR-11, FR-12
 * Phase 7: Accessibility, polished animations, improved PDF.
 */

import { getData, getScores, getCompletionDate, resetState } from '../state.js';
import { navigate } from '../router.js';
import { downloadPDF } from '../utils/pdf-export.js';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';

// Register Chart.js components
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

let chartInstance = null;

export function renderResults(app) {
  const data = getData();
  const scores = getScores();
  const completionDate = getCompletionDate();

  if (!scores) {
    navigate('#landing');
    return;
  }

  const dateStr = completionDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const dateFileStr = completionDate.toISOString().slice(0, 10);

  // Sort scores for overview: highest and lowest
  const sorted = [...scores].sort((a, b) => b.wheelScore - a.wheelScore);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  app.innerHTML = `
    <div class="results-page container-wide" style="margin: 0 auto;">
      <div id="pdf-content">
        <!-- Header -->
        <div class="results-header animate-fade-in-up">
          <h1 id="main-content" tabindex="-1">🎡 Your Wheel of Career</h1>
          <p class="results-date">Completed on ${dateStr}</p>
        </div>

        <!-- Wheel Chart -->
        <div class="wheel-section animate-scale-in">
          <div class="wheel-wrapper" role="img" aria-label="Radar chart showing your scores across 8 career dimensions. Strongest: ${strongest.name} at ${strongest.wheelScore.toFixed(1)}. Weakest: ${weakest.name} at ${weakest.wheelScore.toFixed(1)}.">
            <canvas id="wheel-chart" aria-hidden="true"></canvas>
          </div>
        </div>

        <!-- Score Cards -->
        <section class="score-section" aria-label="Score summary">
          <h2>📊 Score Summary</h2>
          <div class="score-grid stagger-children">
            ${scores.map(s => `
              <div class="score-card" data-color="${s.color}" aria-label="${s.name}: ${s.wheelScore.toFixed(1)} out of 10, ${s.interpretation}">
                <div class="score-card-header">
                  <div class="score-card-name">
                    <span class="score-card-icon" aria-hidden="true">${s.icon}</span>
                    ${s.name}
                  </div>
                  <span class="score-badge ${s.interpretationClass}">${s.interpretation}</span>
                </div>
                <div class="score-card-value" style="color: ${s.color}">${s.wheelScore.toFixed(1)}<span style="font-size: 0.9rem; color: var(--text-muted)"> / 10</span></div>
                <div class="score-card-bar" role="progressbar" aria-valuenow="${s.wheelScore * 10}" aria-valuemin="0" aria-valuemax="100">
                  <div class="score-card-bar-fill" style="width: ${s.wheelScore * 10}%; background: ${s.color}"></div>
                </div>
                <div class="score-card-details">
                  <span>Raw: ${s.rawScore} / 25</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Interpretation Guide -->
        <section class="interpretation-section" aria-label="Score interpretation guide">
          <h2>📖 Interpretation Guide</h2>
          <div class="interpretation-grid">
            ${data.interpretation.map(interp => `
              <div class="interpretation-card">
                <div class="interpretation-range ${interp.className}">${interp.min.toFixed(1)} – ${interp.max < 10 ? interp.max.toFixed(1) : '10.0'}</div>
                <div class="interpretation-label">${interp.label}</div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Personalized Insights -->
        <section class="insights-section" aria-label="Personalized insights for each dimension">
          <h2>💡 Personalized Insights</h2>
          <div class="stagger-children">
            ${scores.map(s => `
              <div class="insight-card" style="border-left-color: ${s.color}">
                <div class="insight-card-header">
                  <span class="insight-card-title">
                    <span aria-hidden="true">${s.icon}</span> ${s.name}
                    <span class="score-badge ${s.interpretationClass}" style="margin-left: 8px; font-size: 0.75rem;">${s.wheelScore.toFixed(1)}</span>
                  </span>
                </div>
                <p class="insight-card-text">${s.insight}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Reflection Questions -->
        <section class="reflections-section" aria-label="Reflection questions for self-development">
          <h2>🤔 Reflection Questions</h2>
          <ol class="reflection-list stagger-children">
            ${data.reflectionQuestions.map((q, i) => `
              <li class="reflection-item">
                <span class="reflection-number" aria-hidden="true">${i + 1}</span>
                <span class="reflection-text">${q}</span>
              </li>
            `).join('')}
          </ol>
        </section>

        <!-- Disclaimer in PDF -->
        <aside class="landing-privacy" style="margin-bottom: var(--space-lg);" aria-label="Disclaimer">
          <strong>Disclaimer</strong>
          <em>${data.meta.disclaimer}</em>
        </aside>
      </div>

      <!-- Action Buttons -->
      <div class="results-actions no-print">
        <button class="btn btn-primary btn-lg" id="print-pdf-btn" aria-label="Download your results as a PDF file">📄 Download PDF Report</button>
        <button class="btn btn-outline" id="retake-btn" aria-label="Retake the assessment from the beginning">🔄 Retake Assessment</button>
      </div>
    </div>
  `;

  // Render radar chart
  renderWheel(scores);

  // Apply dynamic score-card left-border colors
  document.querySelectorAll('.score-card').forEach(card => {
    const color = card.dataset.color;
    card.style.setProperty('--card-accent', color);
    const before = document.createElement('style');
    before.textContent = `.score-card[data-color="${color}"]::before { background: ${color}; }`;
    card.appendChild(before);
  });

  // Bind Print / PDF
  document.getElementById('print-pdf-btn').addEventListener('click', async (e) => {
    const btn = e.target;
    btn.disabled = true;
    btn.classList.add('btn-loading');
    btn.textContent = 'Generating...';

    try {
      showToast('Generating PDF... Please wait.');
      const container = document.getElementById('pdf-content');
      await waitForChartRender();
      await downloadPDF(container, dateFileStr, scores, data);
      showToast('PDF downloaded successfully!', 'success');
    } catch (error) {
      console.error(error);
      showToast('Failed to generate PDF.', 'error');
    } finally {
      btn.disabled = false;
      btn.classList.remove('btn-loading');
      btn.textContent = '📄 Download PDF Report';
    }
  });

  // Bind retake with confirmation
  document.getElementById('retake-btn').addEventListener('click', () => {
    showRetakeConfirmation();
  });

  // Focus the heading on results load
  requestAnimationFrame(() => {
    const heading = document.getElementById('main-content');
    if (heading) heading.focus({ preventScroll: true });
  });

  // Cleanup function
  return () => {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  };
}

function renderWheel(scores) {
  const canvas = document.getElementById('wheel-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  // Split long labels into multi-line arrays for Chart.js
  const labels = scores.map(s => {
    const words = s.name.split(' ');
    if (words.length <= 2) return s.name;
    // Split at the midpoint or after "&"
    const ampIdx = words.indexOf('&');
    if (ampIdx > 0) {
      return [words.slice(0, ampIdx).join(' '), words.slice(ampIdx).join(' ')];
    }
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
  });
  const values = scores.map(s => s.wheelScore);
  const colors = scores.map(s => s.color);

  chartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Your Score',
        data: values,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.12)',
        borderWidth: 2.5,
        pointBackgroundColor: colors,
        pointBorderColor: '#0F172A',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 800,
        easing: 'easeOutQuart',
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1E293B',
          titleColor: '#F8FAFC',
          bodyColor: '#94A3B8',
          borderColor: '#334155',
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          callbacks: {
            label: (ctx) => `Score: ${ctx.raw.toFixed(1)} / 10`,
          },
        },
      },
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 2,
            color: '#64748B',
            backdropColor: 'transparent',
            font: { size: 10 },
          },
          grid: {
            color: '#334155',
            lineWidth: 1,
          },
          angleLines: {
            color: '#334155',
            lineWidth: 1,
          },
          pointLabels: {
            color: '#94A3B8',
            font: {
              size: 12,
              family: "'Inter', sans-serif",
              weight: '500',
            },
            padding: 24,
          },
        },
      },
    },
  });
}

function waitForChartRender() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      if (chartInstance) chartInstance.update('none');
      requestAnimationFrame(resolve);
    });
  });
}

function showRetakeConfirmation() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'retake-title');
  overlay.innerHTML = `
    <div class="modal-content">
      <h3 id="retake-title">🔄 Retake Assessment?</h3>
      <p>This will clear all your current answers and results. Are you sure you want to start over?</p>
      <div class="modal-actions">
        <button class="btn btn-secondary" id="cancel-retake">Cancel</button>
        <button class="btn btn-primary" id="confirm-retake">Yes, Start Over</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Focus the cancel button by default (safe choice)
  requestAnimationFrame(() => {
    document.getElementById('cancel-retake').focus();
  });

  // Trap focus inside modal
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlay.remove();
      return;
    }
    if (e.key === 'Tab') {
      const focusable = overlay.querySelectorAll('button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  document.getElementById('cancel-retake').addEventListener('click', () => {
    overlay.remove();
  });

  document.getElementById('confirm-retake').addEventListener('click', () => {
    overlay.remove();
    resetState();
    navigate('#landing');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

/**
 * Show a toast notification.
 */
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
