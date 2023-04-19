import React, { useContext } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import InsertChartIcon from '@mui/icons-material/InsertChart';

import Button from '../button/button.component';
import { PdfContext } from '../../contexts/pdf.context';
import { MapContext } from '../../contexts/map.context';

const htmlToImg = async (
  ref,
  pdf,
  maxWidth,
  maxHeight,
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

  console.log(imgHeight);
  if (maxHeight && imgHeight > maxHeight) {
    imgWidth = (imgWidth * maxHeight) / imgHeight;
    imgHeight = maxHeight;
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
  const { selectedLocation } = useContext(MapContext);

  const handlePdfDownload = async () => {
    const lng = (
      Math.round(selectedLocation.coords.lng * 10000) / 10000
    ).toFixed(4);
    const lat = (
      Math.round(selectedLocation.coords.lat * 10000) / 10000
    ).toFixed(4);
    
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfPadding = 10;
    const maxWidth = pdfWidth - 2 * pdfPadding;
    let imgHeightOffset = pdfPadding;

    imgHeightOffset = await htmlToImg(
      changeFactorRef,
      pdf,
      maxWidth * (2 / 3),
      null,
      pdfPadding,
      imgHeightOffset,
      maxWidth * (1 / 6)
    );
    imgHeightOffset = await htmlToImg(
      chartRef.current.container,
      pdf,
      maxWidth,
      null,
      pdfPadding,
      imgHeightOffset
    );
    await htmlToImg(precipDataRef, pdf, maxWidth, 90, pdfPadding, imgHeightOffset);

    pdf.save(`${lng}-${lat}.pdf`);
  };

  return (
    <Button onClick={handlePdfDownload} buttonType='export'>
      <InsertChartIcon />
      PDF
    </Button>
  );
}
