import React, { useContext, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import { CircularProgress } from '@mui/material';

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

const addHeaderText = (pageType, pdf, imgHeightOffset, maxWidth) => {
  pdf.setFont('helvetica', '', 'bold');
  pdf.setFontSize(12);
  pdf.text(`${pageType} from ‘Projecting Extreme Precipitation in the Delaware River Basin’`, maxWidth * 0.5 + 5, imgHeightOffset, { align: 'center' });
  return imgHeightOffset + 6;
}

const addFooterText = (pageType, pdf, maxWidth) => {
  const offsetHeight = 270;

  pdf.setFillColor('#cddefa');
  pdf.rect(maxWidth - 60, offsetHeight - 2.2, 8, 3, 'F');
  pdf.rect(7.5, offsetHeight + 1, 44.8, 3, 'F');
  pdf.rect(maxWidth - 91, offsetHeight + 1, 44.5, 3, 'F');

  pdf.link(maxWidth - 60, offsetHeight - 2.2, 8, 3, { url: window.location.href });
  pdf.link(7.5, offsetHeight + 1, 44.8, 3, { url: 'https:/www.nrcc.cornell.edu/' });
  pdf.link(maxWidth - 91, offsetHeight + 1, 44.5, 3, { url: 'https://www.nj.gov/drbc/' });
  
  pdf.setFont('helvetica', '', 'normal');
  pdf.setFontSize(8);
  pdf.text(`This ${pageType} was downloaded from ‘Projecting Extreme Precipitation in the Delaware River Basin’ available here. The projection tool was developed by the Northeast Regional Climate Center (NRCC) at Cornell University on behalf of the Delaware River Basin Commission (DRBC). Any person who publishes or re-posts this data in whole or in part should credit the DRBC. The DRBC is a federal-interstate commission formed in 1961 to manage, protect, and improve the water resources of the Delaware River Basin. The project was funded, in part, by the U.S. Fish and Wildlife Service (FWS) through the National Fish and Wildlife Foundation’s (NFWF) Delaware Watershed Conservation Fund (DWCF). The views and conclusions contained in this document are those of the authors and should not be interpreted as representing the opinions or policies of the U.S. Government or the National Fish and Wildlife Foundation and its funding sources. Mention of trade names or commercial products does not constitute their endorsement by the U.S. Government, or the National Fish and Wildlife Foundation or its funding sources.`, maxWidth * 0.5 + 4, offsetHeight, { maxWidth, align: 'center' });
}

export default function PdfDownloadButton() {
  const { changeFactorRef, precipDataRef, chartRef } = useContext(PdfContext);
  const { selectedLocation } = useContext(MapContext);

  const [creating, setCreating] = useState(false);

  const handlePdfDownload = async () => {
    setCreating(true);

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

    imgHeightOffset = addHeaderText('Table', pdf, imgHeightOffset, maxWidth + pdfPadding);

    imgHeightOffset = await htmlToImg(
      chartRef.current.container,
      pdf,
      maxWidth,
      null,
      pdfPadding,
      imgHeightOffset + 43
    );

    addFooterText('table', pdf, maxWidth + pdfPadding);
    pdf.addPage()
    imgHeightOffset = pdfPadding;

    imgHeightOffset = addHeaderText('Data', pdf, imgHeightOffset, maxWidth + pdfPadding);

    imgHeightOffset = await htmlToImg(
      changeFactorRef,
      pdf,
      maxWidth * (3/4),
      null,
      pdfPadding,
      imgHeightOffset + 10,
      maxWidth * (1/8)
    );

    await htmlToImg(precipDataRef, pdf, maxWidth, 90, pdfPadding, imgHeightOffset);

    addFooterText('data', pdf, maxWidth + pdfPadding);

    pdf.save(`${lng}-${lat}.pdf`);

    setCreating(false);
  };

  return (
    <Button onClick={handlePdfDownload} buttonType='export'>
      {creating ? <CircularProgress size={24} sx={{ color: 'rgb(174, 215, 235)' }} /> : <InsertChartIcon />}
      PDF
    </Button>
  );
}
