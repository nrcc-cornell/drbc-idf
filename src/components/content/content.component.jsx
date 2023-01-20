import React, { useContext, Fragment } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

import { OptionsContext } from '../../contexts/options.context';

import './content.styles.scss';

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

export default function Content() {
  const { tabContent } = useContext(OptionsContext);

  const renderContent = (tabContent) => {
    if (tabContent.length) {
      return tabContent.map((content, i) => (
        <Fragment key={i}>
          {content.heading && (
            <HeadingTypography component='h2'>
              {content.heading}
            </HeadingTypography>
          )}
          {content.body.map((bodyContent, j) => (
            <BodyTypography key={`${i}-${j}`} component={bodyContent.element}>
              {bodyContent.text}
            </BodyTypography>
          ))}
        </Fragment>
      ));
    } else {
      return <></>;
    }
  };

  return <div className='content-container'>{renderContent(tabContent)}</div>;
}
