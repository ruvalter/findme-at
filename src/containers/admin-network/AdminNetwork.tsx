import React, { useRef, useState } from 'react';
import './AdminNetwork.scss';
import { GrFacebookOption } from 'react-icons/gr';
import { FaInstagram, FaSpotify } from 'react-icons/fa';
import { RiLinkedinFill } from 'react-icons/ri';
import DocTitle from '../../components/doc-title/DocTitle';
import Blade from '../../components/blade/Blade';
import EditableInput from '../../components/editable-input/EditableInput';
import { Switch } from 'antd';
import 'antd/lib/switch/style/index.css';

const iconMap = {
    fb: <GrFacebookOption />,
    ig: <FaInstagram />,
    in: <RiLinkedinFill />,
    sf: <FaSpotify />
} as any;

const networkLinks = [
    {
        id: '01',
        iconId: 'fb',
        title: 'Facebook',
        enabled: true,
        url: 'https://www.facebook.com/portuguesludico'
    },
    {
        id: '02',
        iconId: 'ig',
        title: 'Instagram',
        enabled: true,
        url: 'https://www.facebook.com/portuguesludico'
    },
    {
        id: '03',
        iconId: 'in',
        title: 'Linkedin',
        enabled: false,
        url: 'https://www.facebook.com/portuguesludico'
    },
    {
        id: '04',
        iconId: 'sf',
        title: 'Spotify',
        enabled: false,
        url: ''
    }
]

const AdminNetwork = () => {
    const [bladeStatus, setBladeStatus] = useState({visible: false } as any);
    const [links, setLinks] = useState(networkLinks);

    const urlInput = useRef();

    const showBlade = (profile: any) => {
        setBladeStatus({
            profile,
            visible: true
        })
    }

    const handleOnCloseBlade= () => {
        setBladeStatus({visible: false})
    }

    const handleInput = () => {

    };
    
    
    const handleChange = () => {

    };
    
    const handleBlur = () => {

    };

    const handleSwitchChange = (id: string) => {
        const newList = [...links];
        const newLink = newList.find(link => link.id === id);

        if (newLink) {
            newLink.enabled = !newLink?.enabled;
            setLinks(newList);
        }

       
    }

    const linkList = networkLinks.map(link => {
        return (
            <li className="grid-item" key={link.id}>      
                    <button
                        onClick={() => showBlade({ id: link.id, title: link.title, enabled: link.enabled, url: link.url})}
                        type='button'
                        className={ `network__item ${ link.url ? 'network__item--set' : '' } ${ link.enabled ? 'network__item--active' : '' }` }
                    >
                        { iconMap[link.iconId]}
                    </button>
            </li>
        )
    })

    return (
        <>
            <div
                className="network"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    marginBottom: '2rem',
                    width: '100%'
                }}
                >
                <DocTitle styleProps={{ display: 'inline-block', margin: 0, marginRight: '1rem', color: 'var(--c_blue-d)' }} headingText="Social Network"/>
                <div className="container">
                    <ul className="grid-row" style={{ listStyle: 'none', margin: '2em 0 0 0', padding: 0}}>
                        { linkList }
                    </ul>
                </div>

            </div>
            <Blade title={bladeStatus.profile?.title} visible={bladeStatus.visible} onClose={handleOnCloseBlade}>
                <EditableInput
                    style={{ marginBottom: '1rem'}}
                    handleBlur={handleBlur}
                    handleInput={handleInput}
                    handleChange={handleChange}
                    inputRef={urlInput}
                    value={bladeStatus.profile?.url}
                    type='url'
                    placeholder={bladeStatus.profile?.title+ ' link'}
                    isEditing={false}
                    />
                    { bladeStatus.profile?.url && 
                        <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '1rem'
                            }}>
                            <span>Enable</span>
                        <Switch className="le-switch" checked={links.find(link => link.id === bladeStatus.profile?.id)?.enabled} onChange={() => handleSwitchChange(bladeStatus.profile?.id)} />
                        </div>
                    }
            </Blade>
        </>
    );
}

export default AdminNetwork;