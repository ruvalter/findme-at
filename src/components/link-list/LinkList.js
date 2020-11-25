import React from 'react';
import Avatar from '../avatar/Avatar';
import FancyLink from '../fancy-link/FancyLink';
import SocialNetwork from '../social-network/SocialNetwork';
import './LinkList.scss';

function LinkList({ links }) {
  const backgroundColours = {
    yellow: 'rgb(255, 194, 19)',
    blue: 'rgb(11, 175, 255)',
    pink: 'rgb(237, 99, 210)',
    purple: 'rgb(117, 81, 231)',
  };

  return (
    <div className='link-list'>
      <Avatar />
      <div style={{ marginBottom: '3rem' }}>
        {links.map((link) => {
          return (
            <FancyLink
              key={link.name}
              link={link.url}
              linkName={link.name}
              icon={link.icon}
              backgroundColor={link.backgorundColor}
              textColor={link.textColor}
            />
          );
        })}
      </div>
      <SocialNetwork />
    </div>
  );
}

export default LinkList;
