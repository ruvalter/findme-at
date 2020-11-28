import React, { useEffect, useState } from 'react';
import LinkList from '../../components/link-list/LinkList';
import './Links.scss';
import LinksService from '../../shared/links-service';

const addThemeClass = (theme) => document.body.classList.add(theme);

const removeThemeClass = (theme) => document.body.classList.remove(theme);

const Links = () => {
  document.title = 'Links | Link Explorer';
  const [links, updateLinks] = useState([]);

  useEffect(() => {
    const theme = 'theme-portugues-ludico';
    addThemeClass(theme);
    const fetchData = async () => {
      updateLinks(await new LinksService().getAllLinks());
    };
    fetchData();
    return () => removeThemeClass(theme);
  }, []);

  return (
    <div className='Links'>
      <LinkList links={Object.keys(links).map((id) => links[id])} />
    </div>
  );
};

export default Links;
