/**
 * PDF Export
 * Uses html2canvas to capture the DOM accurately, then embeds the image into jsPDF.
 */

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generate and download the PDF report.
 * @param {HTMLElement} container - The results page container.
 * @param {string} dateStr - Formatted completion date string.
 * @param {Array} scores - The computed scores array.
 * @param {Object} data - The assessment data object.
 * @returns {Promise<void>}
 */
export async function downloadPDF(container, dateStr, scores, data) {
  const fileName = `wheel-of-career-result-${dateStr}.pdf`;
  console.log('--- PDF Generation Started ---');
  console.log(`Target File Name: ${fileName}`);

  const actions = container.parentElement?.querySelector('.results-actions');

  try {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    await waitForPaint();

    console.log('Capturing DOM with html2canvas...');
    container.classList.add('pdf-exporting');
    if (actions) actions.classList.add('pdf-export-hidden');

    const canvas = await html2canvas(container, {
      scale: 2, // High resolution
      useCORS: true,
      backgroundColor: '#0F172A', // Match CSS var(--bg-primary)
      logging: false,
      windowWidth: document.documentElement.scrollWidth,
    });

    console.log('Initializing jsPDF document...');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pdfWidth - margin * 2;
    const contentHeight = pdfHeight - margin * 2;
    
    // Calculate the scaled height of the canvas image inside the PDF
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * contentWidth) / imgProps.width;

    console.log(`Adding captured image to PDF (total scaled height: ${imgHeight}mm)...`);

    let renderedHeight = 0;
    let pageIndex = 0;
    while (renderedHeight < imgHeight) {
      if (pageIndex > 0) pdf.addPage();
      pdf.setFillColor(15, 23, 42); // #0F172A
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
      pdf.addImage(imgData, 'PNG', margin, margin - renderedHeight, contentWidth, imgHeight);
      renderedHeight += contentHeight;
      pageIndex += 1;
    }

    pdf.save(fileName);
    console.log(`--- PDF generation SUCCESS: "${fileName}" ---`);

  } catch (error) {
    console.error('--- PDF generation FAILED ---');
    console.error(error);
    throw error;
  } finally {
    container.classList.remove('pdf-exporting');
    if (actions) actions.classList.remove('pdf-export-hidden');
  }
}

function waitForPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}
