import React, { useEffect, useRef, useState } from 'react';
import LinkList from '../../components/link-list/LinkList';
import './Links.scss';
import LinksService from '../../shared/links-service';
import { getUserInfo } from '../../shared/user-service';
import { NavLink, withRouter } from 'react-router-dom';
import {  VscSettings } from 'react-icons/vsc';
import { auth } from '../../firebase/firebase';



const Links = (props: any) => {
  document.title = 'Links | Link Explorer';
  const [links, updateLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const addThemeClass = (theme: string) => document.body.classList.add(theme);
  const removeThemeClass = (theme: string) => document.body.classList.remove(theme);
  const isMounted = useRef(true);

  const exposedUrl = useRef(props.match.params.exposedUrl)

  useEffect(() => {
    let theme: string;
    
    const fetchData = async () => {
      auth.onAuthStateChanged(async (user: any) => {
        const info = await getUserInfo(user?.uid) as any;
        theme = info.themeId;
        const isUserLogged = localStorage.getItem('AuthToken');
        setUser(isUserLogged as any);
        setLoading(false);
        addThemeClass(theme);
      });

      if (isMounted.current) {
        updateLinks(await new LinksService().getExposedLinksByProfile(exposedUrl.current));
      }
      
    };
    fetchData();
    return () => { 
      removeThemeClass(theme);
      isMounted.current = false;
      exposedUrl.current = null;
    };
  }, []);

  const linkList = Object.keys(links).map((id: any) => links[id]);
  // const orderList = linkList.sort((a, b) => a.order - b.order);

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
      <LinkList links={ linkList.filter((link: any) => link.enabled)} />
    </div>
  );
};

export default withRouter(Links);
