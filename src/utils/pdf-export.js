/**
 * PDF Export
 * Builds a printable, structured report with jsPDF instead of screenshotting
 * the results page.
 */

import { jsPDF } from 'jspdf';

const COLORS = {
  ink: '#111827',
  muted: '#64748B',
  lightText: '#F8FAFC',
  navy: '#0F172A',
  blue: '#2563EB',
  paleBlue: '#EFF6FF',
  line: '#E2E8F0',
  panel: '#F8FAFC',
  white: '#FFFFFF',
  green: '#059669',
  amber: '#D97706',
  orange: '#EA580C',
  red: '#DC2626',
};

const PAGE = {
  marginX: 16,
  top: 18,
  bottom: 276,
  width: 210,
  height: 297,
};

/**
 * Generate and download the PDF report.
 * @param {HTMLElement} container - The results page container.
 * @param {string} dateStr - YYYY-MM-DD completion date string.
 * @param {Array} scores - The computed scores array.
 * @param {Object} data - The assessment data object.
 * @returns {Promise<void>}
 */
export async function downloadPDF(container, dateStr, scores, data) {
  const fileName = `wheel-of-career-result-${dateStr}.pdf`;

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
  await waitForPaint();

  const pdf = new jsPDF('p', 'mm', 'a4');
  const state = { y: PAGE.top };
  const displayDate = formatDate(dateStr);
  const sorted = [...scores].sort((a, b) => b.wheelScore - a.wheelScore);
  const strongest = sorted[0];
  const priority = sorted[sorted.length - 1];
  const average = scores.reduce((sum, score) => sum + score.wheelScore, 0) / scores.length;
  const chartImage = getChartImage(container);

  drawCover(pdf, state, { displayDate, strongest, priority, average, chartImage, scores, data });
  drawScoreTable(pdf, state, scores);
  drawInterpretationGuide(pdf, state, data.interpretation);
  drawInsights(pdf, state, scores);
  drawReflections(pdf, state, data.reflectionQuestions);
  drawDisclaimer(pdf, state, data.meta.disclaimer);
  drawFooters(pdf, displayDate);

  pdf.save(fileName);
}

function drawCover(pdf, state, context) {
  const { displayDate, strongest, priority, average, chartImage, scores, data } = context;

  setFill(pdf, COLORS.navy);
  pdf.rect(0, 0, PAGE.width, 52, 'F');
  setText(pdf, COLORS.lightText);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(24);
  pdf.text('Wheel of Career Assessment', PAGE.marginX, 24);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.text(`Personal career health report | Completed ${displayDate}`, PAGE.marginX, 34);
  pdf.text('A self-reflection report for growth conversations and development planning.', PAGE.marginX, 42);

  state.y = 64;
  drawMetricCards(pdf, state, [
    { label: 'Overall average', value: average.toFixed(1), note: 'out of 10', color: COLORS.blue },
    { label: 'Strongest area', value: strongest.name, note: `${strongest.wheelScore.toFixed(1)} / 10`, color: strongest.color },
    { label: 'Growth priority', value: priority.name, note: `${priority.wheelScore.toFixed(1)} / 10`, color: priority.color },
  ]);

  state.y += 12;
  drawSectionTitle(pdf, state, 'Career Wheel Snapshot');

  const chartTop = state.y;
  const chartCardHeight = 108;
  drawCard(pdf, PAGE.marginX, chartTop, 178, chartCardHeight);

  if (chartImage) {
    pdf.addImage(chartImage, 'PNG', PAGE.marginX + 10, chartTop + 8, 88, 88);
  } else {
    setText(pdf, COLORS.muted);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Chart image was not available at export time.', PAGE.marginX + 12, chartTop + 48);
  }

  drawScoreBars(pdf, PAGE.marginX + 106, chartTop + 10, 62, scores);
  state.y = chartTop + chartCardHeight + 12;

  drawSectionTitle(pdf, state, 'How To Read This Report');
  const intro = `${data.meta.description} Use the score table to scan your current career health, then use the insights and reflection prompts to choose focused next actions.`;
  state.y = drawParagraph(pdf, intro, PAGE.marginX, state.y, 178, 5, 10, COLORS.ink) + 2;
}

function drawMetricCards(pdf, state, cards) {
  const gap = 5;
  const width = (178 - gap * 2) / 3;
  const height = 34;

  cards.forEach((card, index) => {
    const x = PAGE.marginX + index * (width + gap);
    drawCard(pdf, x, state.y, width, height);
    setFill(pdf, card.color);
    pdf.rect(x, state.y, 2.2, height, 'F');
    setText(pdf, COLORS.muted);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.text(card.label.toUpperCase(), x + 5, state.y + 8);
    setText(pdf, COLORS.ink);
    pdf.setFontSize(card.value.length > 18 ? 10 : 16);
    pdf.text(fitText(pdf, card.value, width - 10), x + 5, state.y + 19);
    setText(pdf, COLORS.muted);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text(card.note, x + 5, state.y + 28);
  });

  state.y += height;
}

function drawScoreBars(pdf, x, y, width, scores) {
  scores.forEach((score, index) => {
    const rowY = y + index * 11;
    setText(pdf, COLORS.ink);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.text(fitText(pdf, score.name, 36), x, rowY + 3);
    setText(pdf, COLORS.muted);
    pdf.setFont('helvetica', 'normal');
    pdf.text(score.wheelScore.toFixed(1), x + width - 7, rowY + 3, { align: 'right' });
    setFill(pdf, COLORS.line);
    pdf.rect(x, rowY + 5, width, 2.6, 'F');
    setFill(pdf, score.color);
    pdf.rect(x, rowY + 5, width * (score.wheelScore / 10), 2.6, 'F');
  });
}

function drawScoreTable(pdf, state, scores) {
  ensureSpace(pdf, state, 90);
  drawSectionTitle(pdf, state, 'Score Summary');

  const x = PAGE.marginX;
  const widths = [68, 24, 24, 62];
  const headerHeight = 10;
  const rowHeight = 11;
  const headers = ['Dimension', 'Wheel', 'Raw', 'Interpretation'];

  drawTableHeader(pdf, x, state.y, widths, headerHeight, headers);
  state.y += headerHeight;

  scores.forEach((score, index) => {
    ensureSpace(pdf, state, rowHeight + 4);
    const fill = index % 2 === 0 ? COLORS.white : COLORS.panel;
    setFill(pdf, fill);
    pdf.rect(x, state.y, 178, rowHeight, 'F');
    setFill(pdf, score.color);
    pdf.rect(x, state.y, 2.2, rowHeight, 'F');
    setStroke(pdf, COLORS.line);
    pdf.line(x, state.y + rowHeight, x + 178, state.y + rowHeight);

    setText(pdf, COLORS.ink);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.text(score.name, x + 5, state.y + 7);
    pdf.setFont('helvetica', 'normal');
    pdf.text(score.wheelScore.toFixed(1), x + widths[0] + 8, state.y + 7);
    pdf.text(`${score.rawScore} / 25`, x + widths[0] + widths[1] + 7, state.y + 7);
    pdf.text(fitText(pdf, score.interpretation, widths[3] - 5), x + widths[0] + widths[1] + widths[2] + 5, state.y + 7);
    state.y += rowHeight;
  });

  state.y += 8;
}

function drawInterpretationGuide(pdf, state, interpretations) {
  ensureSpace(pdf, state, 44);
  drawSectionTitle(pdf, state, 'Interpretation Guide');

  const colors = [COLORS.green, COLORS.amber, COLORS.orange, COLORS.red];
  const gap = 4;
  const cardWidth = (178 - gap * 3) / 4;
  const cardHeight = 26;

  interpretations.forEach((item, index) => {
    const x = PAGE.marginX + index * (cardWidth + gap);
    drawCard(pdf, x, state.y, cardWidth, cardHeight);
    setFill(pdf, colors[index] || COLORS.blue);
    pdf.rect(x, state.y, cardWidth, 3, 'F');
    setText(pdf, COLORS.ink);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    const max = item.max < 10 ? item.max.toFixed(1) : '10.0';
    pdf.text(`${item.min.toFixed(1)}-${max}`, x + 4, state.y + 11);
    setText(pdf, COLORS.muted);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.text(pdf.splitTextToSize(item.label, cardWidth - 8), x + 4, state.y + 18);
  });

  state.y += cardHeight + 10;
}

function drawInsights(pdf, state, scores) {
  drawSectionTitle(pdf, state, 'Personalized Insights');

  scores.forEach((score) => {
    const textLines = pdf.splitTextToSize(score.insight, 154);
    const cardHeight = Math.max(24, 15 + textLines.length * 4.6);
    ensureSpace(pdf, state, cardHeight + 5);

    drawCard(pdf, PAGE.marginX, state.y, 178, cardHeight);
    setFill(pdf, score.color);
    pdf.rect(PAGE.marginX, state.y, 3, cardHeight, 'F');

    setText(pdf, COLORS.ink);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text(`${score.name} (${score.wheelScore.toFixed(1)} / 10)`, PAGE.marginX + 7, state.y + 8);
    setText(pdf, COLORS.muted);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text(score.interpretation, PAGE.marginX + 171, state.y + 8, { align: 'right' });
    setText(pdf, COLORS.ink);
    pdf.setFontSize(9);
    pdf.text(textLines, PAGE.marginX + 7, state.y + 16);

    state.y += cardHeight + 5;
  });
}

function drawReflections(pdf, state, questions) {
  ensureSpace(pdf, state, 38);
  drawSectionTitle(pdf, state, 'Reflection Questions');

  questions.forEach((question, index) => {
    const lines = pdf.splitTextToSize(question, 158);
    const rowHeight = Math.max(13, 6 + lines.length * 4.8);
    ensureSpace(pdf, state, rowHeight + 3);

    setFill(pdf, index % 2 === 0 ? COLORS.panel : COLORS.white);
    pdf.rect(PAGE.marginX, state.y, 178, rowHeight, 'F');
    setStroke(pdf, COLORS.line);
    pdf.rect(PAGE.marginX, state.y, 178, rowHeight, 'S');
    setFill(pdf, COLORS.blue);
    pdf.circle(PAGE.marginX + 7, state.y + 7, 3.4, 'F');
    setText(pdf, COLORS.white);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.text(String(index + 1), PAGE.marginX + 7, state.y + 8.8, { align: 'center' });
    setText(pdf, COLORS.ink);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text(lines, PAGE.marginX + 16, state.y + 8);
    state.y += rowHeight + 3;
  });
}

function drawDisclaimer(pdf, state, disclaimer) {
  const lines = pdf.splitTextToSize(disclaimer, 166);
  const height = 16 + lines.length * 4.5;
  ensureSpace(pdf, state, height + 5);

  setFill(pdf, COLORS.paleBlue);
  pdf.rect(PAGE.marginX, state.y, 178, height, 'F');
  setStroke(pdf, '#BFDBFE');
  pdf.rect(PAGE.marginX, state.y, 178, height, 'S');
  setText(pdf, COLORS.blue);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.text('Disclaimer', PAGE.marginX + 6, state.y + 8);
  setText(pdf, COLORS.ink);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.text(lines, PAGE.marginX + 6, state.y + 16);
  state.y += height + 5;
}

function drawSectionTitle(pdf, state, title) {
  ensureSpace(pdf, state, 14);
  setText(pdf, COLORS.navy);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.text(title, PAGE.marginX, state.y);
  setStroke(pdf, COLORS.blue);
  pdf.setLineWidth(0.6);
  pdf.line(PAGE.marginX, state.y + 3.5, PAGE.marginX + 178, state.y + 3.5);
  state.y += 9;
}

function drawTableHeader(pdf, x, y, widths, height, labels) {
  setFill(pdf, COLORS.navy);
  pdf.rect(x, y, 178, height, 'F');
  setText(pdf, COLORS.lightText);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  let cursor = x;
  labels.forEach((label, index) => {
    pdf.text(label.toUpperCase(), cursor + 4, y + 6.5);
    cursor += widths[index];
  });
}

function drawCard(pdf, x, y, width, height) {
  setFill(pdf, COLORS.white);
  pdf.roundedRect(x, y, width, height, 2, 2, 'F');
  setStroke(pdf, COLORS.line);
  pdf.roundedRect(x, y, width, height, 2, 2, 'S');
}

function drawParagraph(pdf, text, x, y, width, lineHeight, fontSize, color) {
  setText(pdf, color);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(fontSize);
  const lines = pdf.splitTextToSize(text, width);
  pdf.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function ensureSpace(pdf, state, requiredHeight) {
  if (state.y + requiredHeight <= PAGE.bottom) return;
  pdf.addPage();
  drawRunningHeader(pdf);
  state.y = 28;
}

function drawRunningHeader(pdf) {
  setText(pdf, COLORS.muted);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.text('Wheel of Career Assessment Report', PAGE.marginX, 14);
  setStroke(pdf, COLORS.line);
  pdf.line(PAGE.marginX, 17, PAGE.width - PAGE.marginX, 17);
}

function drawFooters(pdf, displayDate) {
  const totalPages = pdf.getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    pdf.setPage(page);
    setStroke(pdf, COLORS.line);
    pdf.line(PAGE.marginX, 284, PAGE.width - PAGE.marginX, 284);
    setText(pdf, COLORS.muted);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text(`Generated ${displayDate}`, PAGE.marginX, 290);
    pdf.text(`Page ${page} of ${totalPages}`, PAGE.width - PAGE.marginX, 290, { align: 'right' });
  }
}

function getChartImage(container) {
  const canvas = container?.querySelector('canvas');
  if (!canvas) return null;

  try {
    return canvas.toDataURL('image/png', 1);
  } catch (error) {
    console.warn('Unable to export chart canvas for PDF.', error);
    return null;
  }
}

function formatDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function fitText(pdf, text, width) {
  const value = String(text);
  if (pdf.getTextWidth(value) <= width) return value;

  let trimmed = value;
  while (trimmed.length > 3 && pdf.getTextWidth(`${trimmed}...`) > width) {
    trimmed = trimmed.slice(0, -1);
  }
  return `${trimmed}...`;
}

function setText(pdf, color) {
  pdf.setTextColor(...hexToRgb(color));
}

function setFill(pdf, color) {
  pdf.setFillColor(...hexToRgb(color));
}

function setStroke(pdf, color) {
  pdf.setDrawColor(...hexToRgb(color));
}

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function waitForPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}
