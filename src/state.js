/**
 * Central state store for the assessment.
 * All state is in-memory only — nothing is persisted (BRSD §10.2 Option 1).
 */

const state = {
  data: null,           // Assessment JSON data
  answers: {},          // { questionId: score }
  currentSection: 0,    // Current section index (0-7)
  scores: null,         // Calculated results after submission
  completionDate: null, // Date of assessment completion
};

/** Load assessment data from JSON */
export async function loadAssessmentData() {
  const response = await fetch('/data/assessment.json');
  state.data = await response.json();
  return state.data;
}

/** Get loaded data */
export function getData() {
  return state.data;
}

/** Set answer for a question */
export function setAnswer(questionId, score) {
  state.answers[questionId] = score;
}

/** Get answer for a question */
export function getAnswer(questionId) {
  return state.answers[questionId] ?? null;
}

/** Get all answers */
export function getAnswers() {
  return { ...state.answers };
}

/** Get count of answered questions */
export function getAnsweredCount() {
  return Object.keys(state.answers).length;
}

/** Get current section index */
export function getCurrentSection() {
  return state.currentSection;
}

/** Set current section index */
export function setCurrentSection(index) {
  state.currentSection = index;
}

/** Check if all questions in a section are answered */
export function isSectionComplete(sectionIndex) {
  const section = state.data.sections[sectionIndex];
  return section.questions.every(q => state.answers[q.id] !== undefined);
}

/** Check if entire assessment is complete */
export function isAssessmentComplete() {
  if (!state.data) return false;
  return state.data.sections.every((_, i) => isSectionComplete(i));
}

/** Store calculated scores */
export function setScores(scores) {
  state.scores = scores;
  state.completionDate = new Date();
}

/** Get calculated scores */
export function getScores() {
  return state.scores;
}

/** Get completion date */
export function getCompletionDate() {
  return state.completionDate;
}

/** Reset all state for retake */
export function resetState() {
  state.answers = {};
  state.currentSection = 0;
  state.scores = null;
  state.completionDate = null;
}
