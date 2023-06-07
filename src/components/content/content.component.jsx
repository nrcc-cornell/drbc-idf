import React, { useContext, Fragment } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

import Chart from '../chart/chart.component';

import { OptionsContext } from '../../contexts/options.context';

import './content.styles.scss';

const componentOptions = {
  highchart: <Chart />
};

const HeadingTypography = styled((props) => <Typography {...props} />)({
  fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
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
        <BodyTypography key={j} component={bodyContent.element} sx={bodyContent.styles}>
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
      return <div>{
        tabContent.map((content, i) => {
          let html = '';
          if (content.sectionType === 'normal') {
            html = (
              <div key={i} style={{ padding: '6px' }}>
                {renderNormalContent(content.sectionContent, i)}
              </div>
            );
          } else if (content.sectionType === 'component') {
            html = (
              <Fragment key={i}>
                {componentOptions[content.sectionContent]}
              </Fragment>
            );
          }
          return html;
        })
      }</div>;
    } else {
      return <></>;
    }
  };

  return <div id='content-container'>{renderContent(tabContent)}</div>;
}
