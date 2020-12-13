import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllLinks } from '../services/links-service';
import { useAuthContext } from './auth-provider';

export const LinkContext = createContext({} as any);

export const useLinkContext = () => useContext(LinkContext as any);

const LinkProvider = (props: any) => {
  const initState = {};
  const [userLinks, setLinks] = useState(initState);
  const { loggedUser } = useAuthContext();

  useEffect(() => {
    const fetchLinks = async () => {
      const links = await getAllLinks(loggedUser?.userId);
      setLinks(links);
    };
    fetchLinks();
  }, [loggedUser]);

  return (
    <>
      <LinkContext.Provider
        value={{
          userLinks,
        }}
      >
        {props.children}
      </LinkContext.Provider>
    </>
  );
};

export default LinkProvider;
