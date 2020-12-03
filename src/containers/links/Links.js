import React, { useEffect, useState } from 'react';
import LinkList from '../../components/link-list/LinkList';
import './Links.scss';
import LinksService from '../../shared/links-service';
// import { NavLink } from 'react-router-dom';

// import {  VscSettings } from 'react-icons/vsc';

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

  const linkList = Object.keys(links).map((id) => links[id]);
  const orderList = linkList.sort((a, b) => a.order - b.order);

  return (
    <div className='links'>
      {/* <NavLink
          className="links__settings"
          to={`/admin/links`}>
              <VscSettings />
      </NavLink> */}
      <LinkList links={ orderList.filter(link => link.enabled)} />
    </div>
  );
};

export default Links;
