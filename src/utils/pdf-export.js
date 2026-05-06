/**
 * PDF Export — FR-11
 * Generates a multi-page PDF report using html2canvas + jsPDF.
 * Phase 7: Loading state, error handling, performance measurement.
 */

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generate and download the PDF report.
 * @param {HTMLElement} resultsContainer - The results page DOM element to capture.
 * @param {string} dateStr - Formatted completion date string (YYYY-MM-DD).
 * @returns {Promise<void>}
 */
export async function downloadPDF(resultsContainer, dateStr) {
  const fileName = `wheel-of-career-result-${dateStr}.pdf`;
  const startTime = performance.now();

  const pdfContent = resultsContainer.querySelector('#pdf-content');
  if (!pdfContent) {
    throw new Error('PDF content container not found');
  }

  try {
    const canvas = await html2canvas(pdfContent, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#0F172A',
      logging: false,
      // Ensure fonts are loaded before capturing
      onclone: (doc) => {
        // Force all animations to complete state for the clone
        const allAnimated = doc.querySelectorAll('[class*="animate-"], [class*="stagger-"]');
        allAnimated.forEach(el => {
          el.style.animation = 'none';
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
        // Also force stagger children
        const staggerChildren = doc.querySelectorAll('.stagger-children > *');
        staggerChildren.forEach(el => {
          el.style.animation = 'none';
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      },
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgWidth = pageWidth - (margin * 2);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let yPosition = margin;
    let remainingHeight = imgHeight;

    // Add first page
    pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);

    // If content is taller than one page, add more pages
    remainingHeight -= (pageHeight - (margin * 2));
    while (remainingHeight > 0) {
      pdf.addPage();
      yPosition = -(imgHeight - remainingHeight) + margin;
      pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
      remainingHeight -= (pageHeight - (margin * 2));
    }

    pdf.save(fileName);

    const elapsed = performance.now() - startTime;
    console.log(`PDF generated in ${Math.round(elapsed)}ms`);

    // NFR-02: Warn if generation exceeded 5 seconds
    if (elapsed > 5000) {
      console.warn('PDF generation exceeded 5 second target.');
    }
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error; // Re-throw so the caller can handle it
  }
}
