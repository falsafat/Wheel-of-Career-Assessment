/**
 * Score calculation engine — FR-05, BR-04, BR-05, BR-06.
 *
 * Raw Section Score = sum of 5 question scores (range 5–25)
 * Wheel Score = rawScore / 25 * 10 (range 2.0–10.0)
 * Rounded to 1 decimal place.
 */

import { getData, getAnswers } from '../state.js';

/**
 * Calculate all section scores from current answers.
 * @returns {Array<{sectionId, name, color, icon, rawScore, wheelScore, interpretation, interpretationClass, insightLevel, insight}>}
 */
export function calculateScores() {
  const data = getData();
  const answers = getAnswers();
  const results = [];

  for (const section of data.sections) {
    let rawScore = 0;
    for (const q of section.questions) {
      rawScore += answers[q.id] || 0;
    }

    // Wheel Score = Raw / 25 * 10, rounded to 1 decimal
    const wheelScore = Math.round((rawScore / 25) * 100) / 10;

    // Determine interpretation
    const interp = getInterpretation(data.interpretation, wheelScore);

    // Determine insight level
    let insightLevel;
    if (wheelScore >= 8.0) insightLevel = 'high';
    else if (wheelScore >= 6.0) insightLevel = 'medium';
    else insightLevel = 'low';

    results.push({
      sectionId: section.id,
      name: section.name,
      color: section.color,
      icon: section.icon,
      rawScore,
      wheelScore,
      interpretation: interp.label,
      interpretationClass: interp.className,
      insightLevel,
      insight: section.insights[insightLevel],
    });
  }

  return results;
}

/**
 * Look up interpretation for a given score.
 */
function getInterpretation(interpretations, score) {
  for (const interp of interpretations) {
    if (score >= interp.min && score <= interp.max) {
      return interp;
    }
  }
  // Fallback
  return interpretations[interpretations.length - 1];
}
