import React from 'react';

import './footer.styles.scss';

export default function Footer() {
  return (
    <footer className='drbc-footer'>
      <p>This projection tool was developed by the <a href='https://www.nrcc.cornell.edu/' target='_blank' rel='noreferrer'>Northeast Regional Climate Center (NRCC)</a> at Cornell University on behalf of the <a href='https://www.nj.gov/drbc/' target='_blank' rel='noreferrer'>Delaware River Basin Commission (DRBC)</a>. The DRBC is a federal-interstate compact agency formed in 1961 to manage, protect, and improve the water resources of the Delaware River Basin.</p>
      <p>Any person who publishes or re-posts this data in whole or in part should credit the DRBC.</p>
      <p>The downloadable data accompanying the ‘Projecting Extreme Precipitation in the Delaware River Basin’ visualization tool are products of the Northeast Regional Climate Center at Cornell University and are for the unique purposes of the visualization tool. The Delaware River Basin Commission makes no express or implied warranty regarding the utility of the data for other purposes or their display on all computer systems, nor does the act of distribution constitute any such warranty.</p>
      <p>This project was funded, in part, by the U.S. Fish and Wildlife Service (FWS) through the National Fish and Wildlife Foundation’s (NFWF) Delaware Watershed Conservation Fund (DWCF). The views and conclusions contained in this document are those of the authors and should not be interpreted as representing the opinions or policies of the U.S. Government or the National Fish and Wildlife Foundation and its funding sources. Mention of trade names or commercial products does not constitute their endorsement by the U.S. Government, or the National Fish and Wildlife Foundation or its funding sources.</p>
    </footer>
  );
}