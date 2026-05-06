/**
 * Results Page — FR-06, FR-07, FR-08, FR-09, FR-10, FR-11, FR-12
 */

import { getData, getScores, getCompletionDate, resetState } from '../state.js';
import { navigate } from '../router.js';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { downloadPDF } from '../utils/pdf-export.js';

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

  app.innerHTML = `
    <div class="results-page container-wide" style="margin: 0 auto;">
      <div id="pdf-content">
        <!-- Header -->
        <div class="results-header animate-fade-in-up">
          <h1>🎡 Your Wheel of Career</h1>
          <p class="results-date">Completed on ${dateStr}</p>
        </div>

        <!-- Wheel Chart -->
        <div class="wheel-section animate-scale-in">
          <div class="wheel-wrapper">
            <canvas id="wheel-chart"></canvas>
          </div>
        </div>

        <!-- Score Cards -->
        <div class="score-section">
          <h2>📊 Score Summary</h2>
          <div class="score-grid stagger-children">
            ${scores.map(s => `
              <div class="score-card" style="--card-color: ${s.color}">
                <style>
                  .score-card[style*="${s.color}"]::before { background: ${s.color}; }
                </style>
                <div class="score-card-header">
                  <div class="score-card-name">
                    <span class="score-card-icon">${s.icon}</span>
                    ${s.name}
                  </div>
                  <span class="score-badge ${s.interpretationClass}">${s.interpretation}</span>
                </div>
                <div class="score-card-value" style="color: ${s.color}">${s.wheelScore.toFixed(1)}<span style="font-size: 0.9rem; color: var(--text-muted)"> / 10</span></div>
                <div class="score-card-bar">
                  <div class="score-card-bar-fill" style="width: ${s.wheelScore * 10}%; background: ${s.color}"></div>
                </div>
                <div class="score-card-details">
                  <span>Raw: ${s.rawScore} / 25</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Interpretation Guide -->
        <div class="interpretation-section">
          <h2>📖 Interpretation Guide</h2>
          <div class="interpretation-grid">
            ${data.interpretation.map(interp => `
              <div class="interpretation-card">
                <div class="interpretation-range ${interp.className}">${interp.min.toFixed(1)} – ${interp.max < 10 ? interp.max.toFixed(1) : '10.0'}</div>
                <div class="interpretation-label">${interp.label}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Personalized Insights -->
        <div class="insights-section">
          <h2>💡 Personalized Insights</h2>
          <div class="stagger-children">
            ${scores.map(s => `
              <div class="insight-card" style="border-left-color: ${s.color}">
                <div class="insight-card-header">
                  <span class="insight-card-title">
                    ${s.icon} ${s.name}
                    <span class="score-badge ${s.interpretationClass}" style="margin-left: 8px; font-size: 0.75rem;">${s.wheelScore.toFixed(1)}</span>
                  </span>
                </div>
                <p class="insight-card-text">${s.insight}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Reflection Questions -->
        <div class="reflections-section">
          <h2>🤔 Reflection Questions</h2>
          <ul class="reflection-list stagger-children">
            ${data.reflectionQuestions.map((q, i) => `
              <li class="reflection-item">
                <span class="reflection-number">${i + 1}</span>
                <span class="reflection-text">${q}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Disclaimer in PDF -->
        <div class="landing-privacy" style="margin-bottom: var(--space-lg);">
          <strong>Disclaimer</strong>
          <em>${data.meta.disclaimer}</em>
        </div>
      </div>

      <!-- Action Buttons (not in PDF content) -->
      <div class="results-actions no-print">
        <button class="btn btn-primary btn-lg" id="download-pdf-btn">📄 Download PDF</button>
        <button class="btn btn-outline" id="retake-btn">🔄 Retake Assessment</button>
      </div>
    </div>
  `;

  // Render radar chart
  renderWheel(scores);

  // Bind PDF download
  document.getElementById('download-pdf-btn').addEventListener('click', () => {
    downloadPDF(app, dateFileStr);
  });

  // Bind retake with confirmation
  document.getElementById('retake-btn').addEventListener('click', () => {
    showRetakeConfirmation(app);
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
  const labels = scores.map(s => s.name);
  const values = scores.map(s => s.wheelScore);
  const colors = scores.map(s => s.color);

  // Create gradient fill
  const bgColors = colors.map(c => c + '30'); // 30 = ~19% opacity hex

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
              size: 11,
              family: "'Inter', sans-serif",
              weight: '500',
            },
            padding: 16,
          },
        },
      },
    },
  });
}

function showRetakeConfirmation(app) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-content">
      <h3>🔄 Retake Assessment?</h3>
      <p>This will clear all your current answers and results. Are you sure you want to start over?</p>
      <div class="modal-actions">
        <button class="btn btn-secondary" id="cancel-retake">Cancel</button>
        <button class="btn btn-primary" id="confirm-retake">Yes, Start Over</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

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
