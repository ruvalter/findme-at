import React, { useEffect, useRef, useState } from 'react';
import LinkList from '../../components/link-list/LinkList';
import './Links.scss';

import { getUserByExposedUrl } from '../../shared/user-service';
import { NavLink, withRouter } from 'react-router-dom';
import {  VscSettings } from 'react-icons/vsc';
import { getExposedLinksByProfile } from '../../shared/links-service';



const Links = (props: any) => {
  document.title = 'Links | Link Explorer';
  const [links, updateLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const addThemeClass = (theme: string) => document.body.classList.add(theme);
  const isMounted = useRef(true);

  const exposedUrl = useRef(props.match.params.exposedUrl)

  useEffect(() => {    
    const fetchData = async () => {
      const currentUser = await getUserByExposedUrl(exposedUrl.current);

      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        addThemeClass(currentUser.themeId);
      }

      if (isMounted.current) {
        updateLinks(await getExposedLinksByProfile(exposedUrl.current));
      }
      
    };
    fetchData();
    return () => { 
      isMounted.current = false;
      exposedUrl.current = null;
    };
  }, []);

  const linkList = Object.keys(links).map((id: any) => links[id]);

  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <div className='links'>
      { user && <NavLink
          className="links__settings"
          to={`/admin/links`}>
              <VscSettings />
      </NavLink>
      }
      <LinkList avatarName={(user as any).name} avatarImage={(user as any).imageUrl} links={ linkList.filter((link: any) => link.enabled)} />
    </div>
  );
};

export default withRouter(Links);
