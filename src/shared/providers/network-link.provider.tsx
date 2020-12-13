import React, { createContext, useContext, useEffect, useState } from 'react';
import { NetworkEntity } from '../models/network-link.model';
import { getAccounts } from '../services/network-link-service';
import { useAuthContext } from './auth-provider';

export const NetworkLinkContext = createContext({} as any);

export const useNetworkLinkContext = () => useContext(NetworkLinkContext);

const NetworkLinkProvider = (props: any) => {
  const initState = {} as NetworkEntity;
  const [accounts, setAccounts] = useState(initState);
  const { loggedUser } = useAuthContext();

  useEffect(() => {
    const fetchLinks = async () => {
      const accounts = await getAccounts(loggedUser?.userId);
      setAccounts(accounts);
    };
    fetchLinks();
  }, [loggedUser]);

  return (
    <>
      <NetworkLinkContext.Provider
        value={{
          accounts,
        }}
      >
        {props.children}
      </NetworkLinkContext.Provider>
    </>
  );
};

export default NetworkLinkProvider;
