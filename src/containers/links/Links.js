import React, { useEffect, useState } from 'react';
import LinkList from '../../components/link-list/LinkList';
import './Links.scss';
import LinksService from '../../shared/links-service';

const Links = () => {
  document.title = 'Links | Link Explorer';
  const [links, updateLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      updateLinks(await new LinksService().getAllLinks());
    };
    fetchData();
  }, []);

  return (
    <div className='Links'>
      <LinkList links={Object.keys(links).map((id) => links[id])} />
    </div>
  );
};

export default Links;
