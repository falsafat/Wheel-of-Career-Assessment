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
  const fileName = `wheel-of-career-${dateStr}.pdf`;
  console.log('--- PDF Generation Started ---');
  console.log(`Target File Name: ${fileName}`);

  try {
    console.log('Capturing DOM with html2canvas...');
    // Hide action buttons during capture
    const actions = container.parentElement.querySelector('.results-actions');
    if (actions) actions.style.display = 'none';

    const canvas = await html2canvas(container, {
      scale: 2, // High resolution
      useCORS: true,
      backgroundColor: '#0F172A', // Match CSS var(--bg-primary)
      logging: false,
    });

    if (actions) actions.style.display = 'flex';

    console.log('Initializing jsPDF document...');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pdfWidth - margin * 2;
    
    // Calculate the scaled height of the canvas image inside the PDF
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * contentWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = margin;

    console.log(`Adding captured image to PDF (total scaled height: ${imgHeight}mm)...`);

    // Add the first page
    pdf.setFillColor(15, 23, 42); // #0F172A
    pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
    pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, imgHeight);
    heightLeft -= (pdfHeight - margin * 2);

    // Add subsequent pages if the content overflows
    while (heightLeft > 0) {
      console.log('Adding new page for overflow content...');
      position = heightLeft - imgHeight + margin; // Shift the image up
      pdf.addPage();
      pdf.setFillColor(15, 23, 42); // #0F172A
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
      pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    console.log('Generating PDF blob...');
    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);
    console.log(`Blob URL created: ${url}`);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);

    console.log('Triggering download click event...');
    await new Promise((resolve) => setTimeout(resolve, 100));
    link.click();

    setTimeout(() => {
      if (link.parentNode) document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log('Cleanup complete.');
    }, 1000);

    console.log(`--- PDF generation SUCCESS: "${fileName}" ---`);

  } catch (error) {
    console.error('--- PDF generation FAILED ---');
    console.error(error);
    throw error;
  }
}
