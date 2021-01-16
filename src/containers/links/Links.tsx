import React, { useEffect, useRef, useState } from 'react';
import LinkList from '../../components/link-list/LinkList';
import './Links.scss';

import { NavLink, withRouter } from 'react-router-dom';
import { VscSettings } from 'react-icons/vsc';
import { getExposedLinksByProfile } from '../../shared/services/links-service';
import { useAuthContext } from '../../shared/providers/auth-provider';
import { getUserByExposedUrl } from '../../shared/services/user-service';
import SocialNetwork from '../../components/social-network/SocialNetwork';
import { useNetworkLinkContext } from '../../shared/providers/network-link.provider';
import { NetworkEntity } from '../../shared/models/network-link.model';

const Links = (props: any) => {
  document.title = 'Links | Link Explorer';
  const [links, updateLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { accounts } = useNetworkLinkContext() as { accounts: NetworkEntity };

  const addThemeClass = (theme: string) => document.body.classList.add(theme);
  const removeThemeClass = (theme: string) =>
    document.body.classList.remove(theme);

  const isMounted = useRef(true);
  const { loggedUser } = useAuthContext();

  const exposedUrl = useRef(props.match.params.exposedUrl);

  useEffect(() => {
    let theme: string;
    const fetchData = async () => {
      if (isMounted.current) {
        updateLinks(await getExposedLinksByProfile(exposedUrl.current));
      }

      const currentUser = await getUserByExposedUrl(exposedUrl.current);

      if (currentUser) {
        setUser(currentUser);
        theme = currentUser?.themeId;
        addThemeClass(theme);
      }
      setLoading(false);
    };
    fetchData();
    return () => {
      isMounted.current = false;
      exposedUrl.current = null;
      removeThemeClass(theme);
    };
  }, []);

  const linkList = Object.keys(links).map((id: any) => links[id]);

  if (loading) {
    return <span>Loading links...</span>;
  }

  return (
    <div className='links'>
      {loggedUser && (
        <NavLink className='links__settings' to={`/admin/links`}>
          <VscSettings />
        </NavLink>
      )}
      <LinkList
        avatarName={(user as any).name}
        avatarImage={(user as any).imageUrl}
        links={linkList.filter((link: any) => link.enabled)}
      />
      <SocialNetwork accounts={accounts} />
    </div>
  );
};

export default withRouter(Links);
