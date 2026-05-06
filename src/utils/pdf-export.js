/**
 * PDF Export — FR-11
 * Generates a multi-page PDF report using html2canvas + jsPDF.
 * Uses manual blob download for cross-browser reliability.
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
    // Capture the content as a canvas — use scale 1.5 for quality/size balance
    const canvas = await html2canvas(pdfContent, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: '#0F172A',
      logging: false,
      onclone: (doc) => {
        // Force all animations to their completed state in the clone
        const allAnimated = doc.querySelectorAll('[class*="animate-"], [class*="stagger-"]');
        allAnimated.forEach(el => {
          el.style.animation = 'none';
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
        const staggerChildren = doc.querySelectorAll('.stagger-children > *');
        staggerChildren.forEach(el => {
          el.style.animation = 'none';
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      },
    });

    // Convert canvas to JPEG (much smaller than PNG) at 85% quality
    const imgData = canvas.toDataURL('image/jpeg', 0.85);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const usableWidth = pageWidth - (margin * 2);
    const usableHeight = pageHeight - (margin * 2);
    const imgHeight = (canvas.height * usableWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    // First page
    pdf.addImage(imgData, 'JPEG', margin, position, usableWidth, imgHeight);
    heightLeft -= usableHeight;

    // Add subsequent pages if content overflows
    while (heightLeft > 0) {
      position = -(imgHeight - heightLeft) + margin;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', margin, position, usableWidth, imgHeight);
      heightLeft -= usableHeight;
    }

    // Manual blob download for cross-browser reliability
    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 200);

    const elapsed = performance.now() - startTime;
    console.log(`PDF generated: "${fileName}" in ${Math.round(elapsed)}ms`);

    if (elapsed > 5000) {
      console.warn('PDF generation exceeded 5-second target.');
    }
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
}
