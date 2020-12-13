import React, { useEffect, useRef, useState } from 'react';
import './AdminNetwork.scss';

import { GrFacebookOption } from 'react-icons/gr';
import { FaInstagram, FaSpotify } from 'react-icons/fa';
import { RiLinkedinFill } from 'react-icons/ri';
import { AiOutlineYoutube } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

import DocTitle from '../../components/doc-title/DocTitle';
import Blade from '../../components/blade/Blade';
import EditableInput from '../../components/editable-input/EditableInput';
import { Switch } from 'antd';
import 'antd/lib/switch/style/index.css';
import useWindowSize from '../../shared/hooks/widow-size';
import { NetworkEntity } from '../../shared/models/network-link.model';
import { useNetworkLinkContext } from '../../shared/providers/network-link.provider';
import { updateAccount } from '../../shared/services/network-link-service';
import { useAuthContext } from '../../shared/providers/auth-provider';

const iconMap = {
  facebook: <GrFacebookOption />,
  instagram: <FaInstagram />,
  linkedin: <RiLinkedinFill />,
  spotify: <FaSpotify />,
  youtube: <AiOutlineYoutube />,
  email: <HiOutlineMail />,
  whatsapp: <FaWhatsapp />,
} as any;

const AdminNetwork = () => {
  const { loggedUser } = useAuthContext();
  const [bladeStatus, setBladeStatus] = useState({ visible: false } as any);
  const [links, setLinks] = useState({} as NetworkEntity);
  const { width } = useWindowSize();
  const urlInput = useRef();

  const [account, setAccount] = useState({} as any);

  const { accounts } = useNetworkLinkContext() as { accounts: NetworkEntity };

  useEffect(() => {
    setLinks(accounts);
  }, [accounts]);

  const showBlade = (profile: any) => {
    setBladeStatus({
      visible: true,
    });
    setAccount(profile);
  };

  const handleOnCloseBlade = () => {
    setBladeStatus({ visible: false });
  };

  const handleInput = (type: string, ref: any) => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.select();
      }
    }, 100);

    console.log('ref', ref);

    const newAccount = { ...account };
    newAccount.urlEditing = true;
    setAccount(newAccount);
  };

  const handleBlur = () => {};

  const handleSwitchChange = async (id: string) => {
    const newList = {
      ...links,
    } as NetworkEntity;

    newList[id].enabled = !newList[id].enabled;

    await updateAccount(loggedUser.userId, id, newList[id]);
    setLinks(newList);
  };

  const handleChange = async (id: string, payload: any) => {
    const newList = {
      ...links,
    } as NetworkEntity;

    newList[id] = { ...newList[id], ...payload };

    await updateAccount(loggedUser.userId, id, newList[id]);
    setLinks(newList);
  };

  const linkList = Object.values(links).map((link) => {
    return (
      <li className='grid-item' key={link.id}>
        <button
          onClick={() =>
            showBlade({
              id: link.id,
              title: link.label,
              enabled: link.enabled,
              url: link.url,
            })
          }
          type='button'
          className={`network__item ${link.url ? 'network__item--set' : ''} ${
            link.enabled ? 'network__item--active' : ''
          }`}
        >
          {link.icon && iconMap[link.icon]}
        </button>
      </li>
    );
  });

  return (
    <>
      <div
        className='network'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginBottom: '2rem',
          width: '100%',
        }}
      >
        <DocTitle
          styleProps={{
            display: 'inline-block',
            margin: 0,
            marginRight: '1rem',
            color: 'var(--c_blue-d)',
          }}
          headingText={'Social Network'}
        />
        <div className='container'>
          <ul
            className='grid-row'
            style={{ listStyle: 'none', margin: '2em 0 0 0', padding: 0 }}
          >
            {linkList}
          </ul>
        </div>
      </div>
      <Blade
        title={account?.title}
        visible={bladeStatus.visible}
        placement={width > 768 ? 'right' : 'bottom'}
        onClose={handleOnCloseBlade}
      >
        <EditableInput
          style={{ marginBottom: '1rem' }}
          handleBlur={handleBlur}
          handleInput={handleInput}
          handleChange={handleChange}
          inputRef={urlInput}
          value={account.url}
          type='url'
          placeholder={account?.title + ' link'}
          isEditing={account.urlEditing}
        />
        {account?.url && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '1rem',
            }}
          >
            <span>Enable</span>
            <Switch
              className='le-switch'
              checked={links[account?.id]?.enabled}
              onChange={() => handleSwitchChange(account?.id)}
            />
          </div>
        )}
      </Blade>
    </>
  );
};

export default AdminNetwork;
