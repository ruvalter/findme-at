import React from 'react';
import LinkList from '../../components/link-list/LinkList';
import './Links.scss';

const Links = () => {
  document.title = 'Links | Link Explorer';
  return (
    <div className="Links">
        <LinkList />
    </div>

  );
};

export default Links;