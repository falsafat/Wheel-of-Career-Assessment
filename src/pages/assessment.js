/**
 * Assessment Page — FR-02, FR-03, FR-04
 * Displays one section (5 questions) at a time.
 * Phase 7: Enhanced keyboard navigation, focus management, smooth transitions.
 */

import { getData, setAnswer, getAnswer, getAnsweredCount, getCurrentSection, setCurrentSection, isSectionComplete, isAssessmentComplete, setScores } from '../state.js';
import { navigate } from '../router.js';
import { calculateScores } from '../utils/scoring.js';

export function renderAssessment(app) {
  const data = getData();
  const sections = data.sections;
  const totalQuestions = data.meta.totalQuestions;

  function render(direction = 'none') {
    const sectionIndex = getCurrentSection();
    const section = sections[sectionIndex];
    const questionsAnswered = getAnsweredCount();
    const progressPercent = Math.round((questionsAnswered / totalQuestions) * 100);

    // Calculate question offset for numbering
    let questionOffset = 0;
    for (let i = 0; i < sectionIndex; i++) {
      questionOffset += sections[i].questions.length;
    }

    // Determine transition animation class
    const transitionClass = direction === 'next' ? 'slide-in-right'
                          : direction === 'prev' ? 'slide-in-left'
                          : 'fade-in';

    app.innerHTML = `
      <div class="assessment-page">
        <!-- Sticky Header -->
        <header class="assessment-header" role="banner">
          <div class="assessment-header-inner">
            <div class="progress-info">
              <span class="progress-section-name">${section.icon} ${section.name}</span>
              <span class="progress-count" aria-live="polite">${questionsAnswered} of ${totalQuestions} answered · ${progressPercent}%</span>
            </div>
            <div class="progress-bar-track" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100" aria-label="Assessment progress">
              <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
            </div>
            <nav class="section-dots" style="margin-top: 12px; justify-content: center;" aria-label="Section navigation">
              ${sections.map((s, i) => {
                let cls = 'section-dot';
                if (i === sectionIndex) cls += ' active';
                else if (isSectionComplete(i)) cls += ' completed';
                const status = i === sectionIndex ? ' (current)' : isSectionComplete(i) ? ' (completed)' : '';
                return `<button class="${cls}" data-section="${i}" title="${s.name}${status}" aria-label="Section ${i + 1}: ${s.name}${status}" aria-current="${i === sectionIndex ? 'step' : 'false'}"></button>`;
              }).join('')}
            </nav>
          </div>
        </header>

        <!-- Questions -->
        <main class="assessment-body" id="main-content" role="main">
          <div class="section-container section-${transitionClass}">
            <div class="section-header">
              <div class="section-icon" style="background: ${section.color}20; color: ${section.color}" aria-hidden="true">
                ${section.icon}
              </div>
              <div>
                <h2 class="section-title" style="color: ${section.color}" id="section-heading" tabindex="-1">${section.name}</h2>
                <div class="section-subtitle">Section ${sectionIndex + 1} of ${sections.length} · 5 questions</div>
              </div>
            </div>

            <div class="questions-list stagger-children" aria-labelledby="section-heading">
              ${section.questions.map((q, qi) => {
                const qNum = questionOffset + qi + 1;
                const selectedScore = getAnswer(q.id);
                return `
                  <fieldset class="question-card" id="card-${q.id}">
                    <legend class="question-number">Question ${qNum} of ${totalQuestions}</legend>
                    <div class="question-text" id="q-label-${q.id}">${q.text}</div>
                    <div class="option-group" role="radiogroup" aria-labelledby="q-label-${q.id}">
                      ${q.options.map((opt, oi) => `
                        <label class="option-item ${selectedScore === opt.score ? 'selected' : ''}" for="${q.id}-${opt.label}">
                          <input type="radio" id="${q.id}-${opt.label}" name="${q.id}" value="${opt.score}" ${selectedScore === opt.score ? 'checked' : ''} tabindex="0" />
                          <span class="option-label">
                            <span class="option-letter">${opt.label}.</span>
                            ${opt.text}
                          </span>
                        </label>
                      `).join('')}
                    </div>
                    <div class="question-error" role="alert" aria-live="assertive">⚠ Please select an answer for this question.</div>
                  </fieldset>
                `;
              }).join('')}
            </div>

            <!-- Navigation -->
            <nav class="assessment-nav" aria-label="Section navigation controls">
              ${sectionIndex > 0 ? `
                <button class="btn btn-secondary" id="prev-btn" aria-label="Go to previous section: ${sections[sectionIndex - 1].name}">← Previous</button>
              ` : '<div class="nav-spacer"></div>'}

              ${sectionIndex < sections.length - 1 ? `
                <button class="btn btn-primary" id="next-btn" aria-label="Go to next section: ${sections[sectionIndex + 1].name}">Next →</button>
              ` : `
                <button class="btn btn-primary btn-lg" id="submit-btn" aria-label="Submit your assessment answers">Submit Assessment ✓</button>
              `}
            </nav>
          </div>
        </main>
      </div>
    `;

    bindEvents(sectionIndex, section);

    // Focus management: announce the new section for screen readers
    requestAnimationFrame(() => {
      const heading = document.getElementById('section-heading');
      if (heading) heading.focus({ preventScroll: true });
    });
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
        const track = app.querySelector('.progress-bar-track');
        if (track) track.setAttribute('aria-valuenow', pct);
        const countEl = app.querySelector('.progress-count');
        if (countEl) countEl.textContent = `${count} of ${getData().meta.totalQuestions} answered · ${pct}%`;

        // Update section dot
        const dots = app.querySelectorAll('.section-dot');
        if (isSectionComplete(sectionIndex) && dots[sectionIndex]) {
          dots[sectionIndex].classList.add('completed');
        }
      });
    });

    // Keyboard navigation: Arrow keys within option groups
    app.querySelectorAll('.option-group').forEach(group => {
      group.addEventListener('keydown', (e) => {
        const radios = [...group.querySelectorAll('input[type="radio"]')];
        const current = radios.findIndex(r => r === document.activeElement);
        if (current === -1) return;

        let next = -1;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          next = (current + 1) % radios.length;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          next = (current - 1 + radios.length) % radios.length;
        }

        if (next !== -1) {
          radios[next].focus();
          radios[next].checked = true;
          radios[next].dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });

    // Section dot navigation
    app.querySelectorAll('.section-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.section, 10);
        
        // Prevent skipping ahead if current section is incomplete
        if (idx > sectionIndex && !isSectionComplete(sectionIndex)) {
          highlightUnansweredCurrent(sectionIndex);
          showToast('⚠️ Please answer all questions before proceeding.', 'error');
          return;
        }

        const direction = idx > sectionIndex ? 'next' : 'prev';
        setCurrentSection(idx);
        render(direction);
      });
    });

    // Previous button
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        setCurrentSection(sectionIndex - 1);
        render('prev');
      });
    }

    // Next button
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!isSectionComplete(sectionIndex)) {
          highlightUnansweredCurrent(sectionIndex);
          showToast('⚠️ Please answer all questions before proceeding.', 'error');
          return;
        }
        setCurrentSection(sectionIndex + 1);
        render('next');
      });
    }

    // Submit button
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (!isAssessmentComplete()) {
          // Highlight unanswered questions
          highlightUnanswered();
          showToast('⚠️ Please answer all questions before submitting.', 'error');
          return;
        }
        // Calculate and store scores
        const scores = calculateScores();
        setScores(scores);
        navigate('#results');
      });
    }
  }

  function highlightUnansweredCurrent(sectionIdx) {
    const data = getData();
    const section = data.sections[sectionIdx];
    let firstError = null;
    section.questions.forEach(q => {
      if (getAnswer(q.id) === null) {
        const card = document.getElementById(`card-${q.id}`);
        if (card) {
          card.classList.add('has-error');
          card.classList.add('animate-shake');
          if (!firstError) firstError = card;
        }
      }
    });
    // Scroll to first error
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus the first radio in the error card
      const firstRadio = firstError.querySelector('input[type="radio"]');
      if (firstRadio) setTimeout(() => firstRadio.focus(), 400);
    }
  }

  function highlightUnanswered() {
    const data = getData();
    // Find first incomplete section
    for (let i = 0; i < data.sections.length; i++) {
      if (!isSectionComplete(i)) {
        setCurrentSection(i);
        render('next');
        // After render, highlight unanswered in current section
        setTimeout(() => {
          highlightUnansweredCurrent(i);
        }, 100);
        return;
      }
    }
  }

  render();
}

/**
 * Show a toast notification.
 */
function showToast(message, type = 'info') {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.textContent = message;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  // Auto-hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
