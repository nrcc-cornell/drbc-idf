import React, { useContext } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import InsertChartIcon from '@mui/icons-material/InsertChart';

import Button from '../button/button.component';
import { PdfContext } from '../../contexts/pdf.context';

const refToImg = async (
  ref,
  pdf,
  maxWidth,
  pdfPadding,
  imgHeightOffset,
  leftMargin = 0
) => {
  const element = ref.current;
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const imgProperties = pdf.getImageProperties(imgData);

  let imgHeight = imgProperties.height;
  let imgWidth = imgProperties.width;
  if (imgWidth > maxWidth) {
    imgHeight = (imgHeight * maxWidth) / imgWidth;
    imgWidth = maxWidth;
  }

  pdf.addImage(
    imgData,
    'PNG',
    pdfPadding + leftMargin,
    imgHeightOffset,
    imgWidth,
    imgHeight
  );
  return imgHeightOffset + imgHeight + pdfPadding;
};

export default function PdfDownloadButton() {
  const { changeFactorRef, precipDataRef, chartRef } = useContext(PdfContext);

  const handlePdfDownload = async () => {
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfPadding = 10;
    const maxWidth = pdfWidth - 2 * pdfPadding;
    let imgHeightOffset = pdfPadding;

    imgHeightOffset = await refToImg(
      changeFactorRef,
      pdf,
      maxWidth * (2 / 3),
      pdfPadding,
      imgHeightOffset,
      maxWidth * (1 / 6)
    );
    imgHeightOffset = await refToImg(
      chartRef.current.container,
      pdf,
      maxWidth,
      pdfPadding,
      imgHeightOffset
    );
    await refToImg(precipDataRef, pdf, maxWidth, pdfPadding, imgHeightOffset);

    pdf.save('test.pdf');
  };

  return (
    <Button onClick={handlePdfDownload} buttonType='export'>
      <InsertChartIcon />
      PDF
    </Button>
  );
}
