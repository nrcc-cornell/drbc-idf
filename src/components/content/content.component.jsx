import React, { useContext, Fragment } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

import Chart from '../chart/chart.component';

import { OptionsContext } from '../../contexts/options.context';

import './content.styles.scss';

const componentOptions = {
  highchart: <Chart />,
  testing: <div>Rendered Test div</div>,
};

const HeadingTypography = styled((props) => <Typography {...props} />)({
  fontFamily: "Georgia, 'Times New Roman', Times, serif",
  color: 'rgb(100,100,100)',
});

const BodyTypography = styled((props) => <Typography {...props} />)({
  fontSize: '13px',
  paddingLeft: '10px',
  marginBottom: '15px',
  fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
});

const renderNormalContent = (content, i) => {
  return (
    <Fragment key={i}>
      {content.heading && (
        <HeadingTypography component='h2'>{content.heading}</HeadingTypography>
      )}
      {content.body.map((bodyContent, j) => (
        <BodyTypography key={j} component={bodyContent.element}>
          {bodyContent.text}
        </BodyTypography>
      ))}
    </Fragment>
  );
};

export default function Content() {
  const { tabContent } = useContext(OptionsContext);

  const renderContent = (tabContent) => {
    if (tabContent.length) {
      return tabContent.map((content, i) => {
        if (content.sectionType === 'normal') {
          return (
            <div key={i} style={{ padding: '6px' }}>
              {renderNormalContent(content.sectionContent, i)}
            </div>
          );
        } else if (content.sectionType === 'component') {
          return (
            <Fragment key={i}>
              {componentOptions[content.sectionContent]}
            </Fragment>
          );
        }
      });
    } else {
      return <></>;
    }
  };

  return <div className='content-container'>{renderContent(tabContent)}</div>;
}
