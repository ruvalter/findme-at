import React from 'react';
import './FancyLink.scss';
import SvgIcon from '../svg-icon/SvgIcon';

function FancyLink({ backgroundColor, icon, link, linkName, textColor, type }) {
  return (
    <div
      htmlFor={type}
      className='link'
      style={{ backgroundColor: backgroundColor, borderColor: textColor }}
    >
      <a href={link} target='_blank' rel='noopener noreferrer'>
        <div className='link__icon'>
          <SvgIcon iconName={icon} />
        </div>
        <p style={{ color: textColor }}>{linkName}</p>
      </a>
    </div>
  );
}

export default FancyLink;
