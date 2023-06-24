import React, { useContext } from 'react';


// import Chart from '../chart/chart.component';

import { OptionsContext } from '../../contexts/options.context';

import './content.styles.scss';

// const componentOptions = {
//   highchart: <Chart />
// };



// const renderBodyContent = (key, { element, styles, text }) => {
//   if (element === 'p' || element === 'span') {
//     return (
//       <BodyTypography key={key} component={element} sx={styles}>
//         {text}
//       </BodyTypography>
//     );
//   }
// };

// const renderNormalContent = (content, i) => {
//   return (
//     <Fragment key={i}>
//       {content.heading && (
//         <HeadingTypography component='h2'>{content.heading}</HeadingTypography>
//       )}
//       {content.body.map((bodyContent, j) => renderBodyContent(j, bodyContent))}
//     </Fragment>
//   );
// };

export default function Content() {
  const { tabContent } = useContext(OptionsContext);

  const renderContent = (tabContent) => {
    return <div>{tabContent}</div>
    
    // if (tabContent.length) {
    //   return <div>{
    //     tabContent.map((content, i) => {
    //       let html = '';
    //       if (content.sectionType === 'normal') {
    //         html = (
    //           <div key={i} style={{ padding: '6px' }}>
    //             {renderNormalContent(content.sectionContent, i)}
    //           </div>
    //         );
    //       } else if (content.sectionType === 'component') {
    //         html = (
    //           <Fragment key={i}>
    //             {componentOptions[content.sectionContent]}
    //           </Fragment>
    //         );
    //       }
    //       return html;
    //     })
    //   }</div>;
    // } else {
    //   return <></>;
    // }
  };

  return <div id='content-container'>{renderContent(tabContent)}</div>;
}
