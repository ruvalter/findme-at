import React from 'react';
import LinkList from '../../components/link-list/LinkList';
import './Links.scss';
import { LINKS } from '../../shared/app-constants';

const Links = () => {
  document.title = 'Links | Link Explorer';
  return (
    <div className='Links'>
      <LinkList links={LINKS} />
    </div>
  );
};

export default Links;
