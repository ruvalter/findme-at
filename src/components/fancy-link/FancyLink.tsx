import React from 'react';
import './FancyLink.scss';
import SvgIcon from '../svg-icon/SvgIcon';

export interface Link {
  backgroundColor: string; 
  icon: string; 
  link: string; 
  linkName: string; 
  textColor: string;
}

const FancyLink = ({ backgroundColor, icon, link, linkName, textColor }: Link) => {
  return (
    <div
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
