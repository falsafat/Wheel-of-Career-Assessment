/**
 * PDF Export — FR-11
 * Generates a multi-page PDF report using html2canvas + jsPDF.
 */

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generate and download the PDF report.
 * @param {HTMLElement} resultsContainer - The results page DOM element to capture.
 * @param {string} dateStr - Formatted completion date string.
 */
export async function downloadPDF(resultsContainer, dateStr) {
  const fileName = `wheel-of-career-result-${dateStr}.pdf`;

  // Show loading state
  const downloadBtn = resultsContainer.querySelector('#download-pdf-btn');
  const originalText = downloadBtn?.textContent;
  if (downloadBtn) {
    downloadBtn.textContent = 'Generating PDF...';
    downloadBtn.disabled = true;
  }

  try {
    // Create a wrapper for PDF content
    const pdfContent = resultsContainer.querySelector('#pdf-content');
    if (!pdfContent) throw new Error('PDF content container not found');

    const canvas = await html2canvas(pdfContent, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#0F172A',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20; // 10mm margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let yPosition = 10;
    let remainingHeight = imgHeight;

    // Add first page
    pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);

    // If content is taller than one page, add more pages
    remainingHeight -= (pageHeight - 20);
    while (remainingHeight > 0) {
      pdf.addPage();
      yPosition = -(imgHeight - remainingHeight) + 10;
      pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);
      remainingHeight -= (pageHeight - 20);
    }

    pdf.save(fileName);
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('We could not generate your PDF. Please try again.');
  } finally {
    if (downloadBtn) {
      downloadBtn.textContent = originalText;
      downloadBtn.disabled = false;
    }
  }
}
