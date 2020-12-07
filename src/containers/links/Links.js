import React, { useEffect, useRef, useState } from 'react';
import LinkList from '../../components/link-list/LinkList';
import './Links.scss';
import LinksService from '../../shared/links-service';
// import { useRouteMatch } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

// import {  VscSettings } from 'react-icons/vsc';



const Links = (props) => {
  document.title = 'Links | Link Explorer';
  const [links, updateLinks] = useState([]);

  // const { params } = useRouteMatch();

  const addThemeClass = (theme) => document.body.classList.add(theme);
  const removeThemeClass = (theme) => document.body.classList.remove(theme);
  const isMounted = useRef(true);

  useEffect(() => {
    const theme = 'theme-portugues-ludico';
    addThemeClass(theme);
    const fetchData = async () => {
      if (isMounted.current) {
        updateLinks(await new LinksService().getAllLinks());
      }
    };
    fetchData();
    return () => { 
      removeThemeClass(theme);
      isMounted.current = false;
    };
  }, []);

  const linkList = Object.keys(links).map((id) => links[id]);
  const orderList = linkList.sort((a, b) => a.order - b.order);

  console.log('props', props)

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
