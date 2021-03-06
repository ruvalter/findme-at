import React from 'react';
import Avatar from '../avatar/Avatar';
import FancyLink from '../fancy-link/FancyLink';
import './LinkList.scss';

function LinkList({ links, avatarImage, avatarName }) {
  const backgroundColours = {
    1: 'rgb(255, 194, 19)',
    2: 'rgb(11, 175, 255)',
    3: 'rgb(237, 99, 210)',
    4: 'rgb(117, 81, 231)',
  };

  return (
    <div className='link-list'>
      <div style={{ marginBottom: '2rem' }}>
        <Avatar imageUrl={avatarImage} name={avatarName} />
      </div>
      <div style={{ marginBottom: '3rem' }}>
        {links.map((link, index) => {
          return (
            <FancyLink
              key={link.id}
              link={link.url}
              linkName={link.name}
              type={index % 4}
              icon={link.icon}
              backgroundColor={backgroundColours[(index % 4) + 1]}
              textColor='black'
            />
          );
        })}
      </div>
    </div>
  );
}

export default LinkList;
