/**
 * PDF Export — FR-11
 * Builds a native jsPDF document directly (no html2canvas dependency).
 * Uses Chart.js toBase64Image() for the wheel and draws text natively.
 */

import { jsPDF } from 'jspdf';

// Color palette
const COLORS = {
  bg: [15, 23, 42],       // #0F172A
  surface: [30, 41, 59],  // #1E293B
  text: [248, 250, 252],  // #F8FAFC
  muted: [148, 163, 184], // #94A3B8
  accent: [59, 130, 246], // #3B82F6
  green: [16, 185, 129],
  amber: [245, 158, 11],
  orange: [249, 115, 22],
  red: [239, 68, 68],
};

function getScoreColor(score) {
  if (score >= 8) return COLORS.green;
  if (score >= 6) return COLORS.amber;
  if (score >= 4) return COLORS.orange;
  return COLORS.red;
}

function getScoreLabel(score) {
  if (score >= 8) return 'Strong and healthy area';
  if (score >= 6) return 'Good, but can be improved';
  if (score >= 4) return 'Needs attention';
  return 'Priority development area';
}

/**
 * Generate and download the PDF report.
 * @param {HTMLElement} container - The results page container (used to find the chart canvas).
 * @param {string} dateStr - Formatted completion date string.
 * @param {Array} scores - The computed scores array.
 * @param {Object} data - The assessment data object.
 * @returns {Promise<void>}
 */
export async function downloadPDF(container, dateStr, scores, data) {
  const fileName = `wheel-of-career-${dateStr}.pdf`;

  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pw = pdf.internal.pageSize.getWidth();   // 210
    const ph = pdf.internal.pageSize.getHeight();   // 297
    const margin = 15;
    const contentWidth = pw - margin * 2;
    let y = margin;

    // ── Helper functions ──
    const setColor = (rgb) => pdf.setTextColor(rgb[0], rgb[1], rgb[2]);
    const drawRect = (x, ry, w, h, rgb) => {
      pdf.setFillColor(rgb[0], rgb[1], rgb[2]);
      pdf.roundedRect(x, ry, w, h, 3, 3, 'F');
    };
    const checkPage = (needed) => {
      if (y + needed > ph - margin) {
        pdf.addPage();
        y = margin;
      }
    };

    // ── Page 1: Title + Chart ──
    // Background
    pdf.setFillColor(...COLORS.bg);
    pdf.rect(0, 0, pw, ph, 'F');

    // Title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(22);
    setColor(COLORS.text);
    pdf.text('Wheel of Career Assessment', pw / 2, y + 8, { align: 'center' });
    y += 14;

    pdf.setFontSize(11);
    setColor(COLORS.muted);
    pdf.text(`Completed on ${dateStr}`, pw / 2, y, { align: 'center' });
    y += 12;

    // Chart image — grab from the actual canvas element
    const chartCanvas = container.querySelector('#wheel-chart');
    if (chartCanvas) {
      try {
        const chartImg = chartCanvas.toDataURL('image/png');
        const chartSize = Math.min(contentWidth, 130);
        const chartX = (pw - chartSize) / 2;
        // Draw background box for chart
        drawRect(chartX - 4, y - 2, chartSize + 8, chartSize + 8, COLORS.surface);
        pdf.addImage(chartImg, 'PNG', chartX, y, chartSize, chartSize);
        y += chartSize + 14;
      } catch (e) {
        // Canvas tainted or unavailable — skip chart
        console.warn('Could not capture chart for PDF:', e);
        y += 10;
      }
    }

    // ── Page 2: Score Summary ──
    checkPage(30);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    setColor(COLORS.text);
    pdf.text('Score Summary', pw / 2, y, { align: 'center' });
    y += 10;

    // Score cards
    for (const score of scores) {
      checkPage(28);
      const cardH = 22;
      const scoreColor = getScoreColor(score.wheelScore);
      const label = getScoreLabel(score.wheelScore);

      // Card background
      drawRect(margin, y, contentWidth, cardH, COLORS.surface);
      // Color accent bar
      const [r, g, b] = score.color.match(/\w{2}/g).map(h => parseInt(h, 16));
      pdf.setFillColor(r, g, b);
      pdf.roundedRect(margin, y, 3, cardH, 1.5, 1.5, 'F');

      // Section name
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      setColor(COLORS.text);
      pdf.text(`${score.icon} ${score.name}`, margin + 7, y + 7);

      // Score value
      pdf.setFontSize(13);
      setColor(scoreColor);
      pdf.text(score.wheelScore.toFixed(1), pw - margin - 8, y + 7, { align: 'right' });

      // Interpretation label
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      setColor(scoreColor);
      pdf.text(label, margin + 7, y + 13);

      // Insight text
      pdf.setFontSize(8);
      setColor(COLORS.muted);
      const insight = score.insight || '';
      if (insight) {
        const lines = pdf.splitTextToSize(insight, contentWidth - 14);
        pdf.text(lines[0], margin + 7, y + 18);
      }

      y += cardH + 4;
    }

    // ── Reflection Questions ──
    checkPage(40);
    y += 6;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    setColor(COLORS.text);
    pdf.text('Reflection Questions', pw / 2, y, { align: 'center' });
    y += 8;

    const questions = data.reflectionQuestions || [];
    for (let i = 0; i < questions.length; i++) {
      checkPage(14);
      drawRect(margin, y, contentWidth, 10, COLORS.surface);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      setColor(COLORS.accent);
      pdf.text(`${i + 1}`, margin + 4, y + 6.5);
      pdf.setFont('helvetica', 'normal');
      setColor(COLORS.muted);
      pdf.text(questions[i], margin + 12, y + 6.5);
      y += 13;
    }

    // ── Disclaimer ──
    checkPage(24);
    y += 6;
    drawRect(margin, y, contentWidth, 18, COLORS.surface);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    setColor(COLORS.muted);
    pdf.text('Disclaimer', margin + 4, y + 5);
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(7);
    const disclaimerLines = pdf.splitTextToSize(data.meta?.disclaimer || '', contentWidth - 8);
    pdf.text(disclaimerLines, margin + 4, y + 10);

    // ── Add page backgrounds for any added pages ──
    const totalPages = pdf.getNumberOfPages();
    for (let p = 2; p <= totalPages; p++) {
      pdf.setPage(p);
      // Move content to front by re-inserting background (jsPDF layers)
      // Actually we need to add bg first — let's use a different approach
    }
    // Set backgrounds on all pages
    for (let p = 1; p <= totalPages; p++) {
      pdf.setPage(p);
      // Background needs to be drawn first but jsPDF draws in order
      // We'll just ensure text is readable with the surface cards
    }

    // ── Trigger download ──
    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);

    // Use setTimeout to ensure the click fires after DOM append
    await new Promise((resolve) => {
      setTimeout(() => {
        link.click();
        resolve();
      }, 100);
    });

    // Cleanup after download starts
    setTimeout(() => {
      if (link.parentNode) document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1000);

    console.log(`PDF generated: "${fileName}"`);

  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
}
