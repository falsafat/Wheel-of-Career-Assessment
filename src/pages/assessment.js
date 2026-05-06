/**
 * Assessment Page — FR-02, FR-03, FR-04
 * Displays one section (5 questions) at a time.
 */

import { getData, setAnswer, getAnswer, getAnsweredCount, getCurrentSection, setCurrentSection, isSectionComplete, isAssessmentComplete, setScores } from '../state.js';
import { navigate } from '../router.js';
import { calculateScores } from '../utils/scoring.js';

export function renderAssessment(app) {
  const data = getData();
  const sections = data.sections;
  const totalQuestions = data.meta.totalQuestions;

  function render() {
    const sectionIndex = getCurrentSection();
    const section = sections[sectionIndex];
    const questionsAnswered = getAnsweredCount();
    const progressPercent = Math.round((questionsAnswered / totalQuestions) * 100);

    // Calculate question offset for numbering
    let questionOffset = 0;
    for (let i = 0; i < sectionIndex; i++) {
      questionOffset += sections[i].questions.length;
    }

    app.innerHTML = `
      <div class="assessment-page">
        <!-- Sticky Header -->
        <header class="assessment-header">
          <div class="assessment-header-inner">
            <div class="progress-info">
              <span class="progress-section-name">${section.icon} ${section.name}</span>
              <span class="progress-count">${questionsAnswered} of ${totalQuestions} answered · ${progressPercent}%</span>
            </div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
            </div>
            <div class="section-dots" style="margin-top: 12px; justify-content: center;">
              ${sections.map((s, i) => {
                let cls = 'section-dot';
                if (i === sectionIndex) cls += ' active';
                else if (isSectionComplete(i)) cls += ' completed';
                return `<button class="${cls}" data-section="${i}" title="${s.name}" aria-label="Go to ${s.name}"></button>`;
              }).join('')}
            </div>
          </div>
        </header>

        <!-- Questions -->
        <main class="assessment-body">
          <div class="section-container">
            <div class="section-header">
              <div class="section-icon" style="background: ${section.color}20; color: ${section.color}">
                ${section.icon}
              </div>
              <div>
                <h2 class="section-title" style="color: ${section.color}">${section.name}</h2>
                <div class="section-subtitle">Section ${sectionIndex + 1} of ${sections.length} · 5 questions</div>
              </div>
            </div>

            <div class="questions-list stagger-children">
              ${section.questions.map((q, qi) => {
                const qNum = questionOffset + qi + 1;
                const selectedScore = getAnswer(q.id);
                return `
                  <div class="question-card" id="card-${q.id}">
                    <div class="question-number">Question ${qNum} of ${totalQuestions}</div>
                    <div class="question-text">${q.text}</div>
                    <div class="option-group" role="radiogroup" aria-label="${q.text}">
                      ${q.options.map(opt => `
                        <label class="option-item ${selectedScore === opt.score ? 'selected' : ''}" for="${q.id}-${opt.label}">
                          <input type="radio" id="${q.id}-${opt.label}" name="${q.id}" value="${opt.score}" ${selectedScore === opt.score ? 'checked' : ''} />
                          <span class="option-label">
                            <span class="option-letter">${opt.label}.</span>
                            ${opt.text}
                          </span>
                        </label>
                      `).join('')}
                    </div>
                    <div class="question-error">⚠ Please select an answer for this question.</div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Navigation -->
            <nav class="assessment-nav">
              ${sectionIndex > 0 ? `
                <button class="btn btn-secondary" id="prev-btn">← Previous</button>
              ` : '<div class="nav-spacer"></div>'}

              ${sectionIndex < sections.length - 1 ? `
                <button class="btn btn-primary" id="next-btn">Next →</button>
              ` : `
                <button class="btn btn-primary btn-lg" id="submit-btn">Submit Assessment ✓</button>
              `}
            </nav>
          </div>
        </main>
      </div>
    `;

    bindEvents(sectionIndex, section);
  }

  function bindEvents(sectionIndex, section) {
    // Radio change handlers
    app.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const questionId = e.target.name;
        const score = parseInt(e.target.value, 10);
        setAnswer(questionId, score);

        // Update visual state
        const card = document.getElementById(`card-${questionId}`);
        card.classList.remove('has-error');
        card.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
        e.target.closest('.option-item').classList.add('selected');

        // Update progress bar
        const count = getAnsweredCount();
        const pct = Math.round((count / getData().meta.totalQuestions) * 100);
        const fill = app.querySelector('.progress-bar-fill');
        if (fill) fill.style.width = `${pct}%`;
        const countEl = app.querySelector('.progress-count');
        if (countEl) countEl.textContent = `${count} of ${getData().meta.totalQuestions} answered · ${pct}%`;

        // Update section dot
        const dots = app.querySelectorAll('.section-dot');
        if (isSectionComplete(sectionIndex) && dots[sectionIndex]) {
          dots[sectionIndex].classList.add('completed');
        }
      });
    });

    // Section dot navigation
    app.querySelectorAll('.section-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.section, 10);
        setCurrentSection(idx);
        render();
      });
    });

    // Previous button
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        setCurrentSection(sectionIndex - 1);
        render();
      });
    }

    // Next button
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        setCurrentSection(sectionIndex + 1);
        render();
      });
    }

    // Submit button
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (!isAssessmentComplete()) {
          // Highlight unanswered questions across all sections
          highlightUnanswered();
          return;
        }
        // Calculate and store scores
        const scores = calculateScores();
        setScores(scores);
        navigate('#results');
      });
    }
  }

  function highlightUnanswered() {
    const data = getData();
    // Find first incomplete section
    for (let i = 0; i < data.sections.length; i++) {
      if (!isSectionComplete(i)) {
        setCurrentSection(i);
        render();
        // After render, highlight unanswered in current section
        setTimeout(() => {
          const section = data.sections[i];
          section.questions.forEach(q => {
            if (getAnswer(q.id) === null) {
              const card = document.getElementById(`card-${q.id}`);
              if (card) {
                card.classList.add('has-error');
                // Scroll to first error
                if (!document.querySelector('.scrolled-to-error')) {
                  card.classList.add('scrolled-to-error');
                  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }
            }
          });
        }, 100);
        return;
      }
    }
  }

  render();
}
