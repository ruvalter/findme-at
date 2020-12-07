import React, { useState } from 'react';
import './AdminNetwork.scss';
import { GrFacebookOption } from 'react-icons/gr';
import { FaInstagram } from 'react-icons/fa';
import { RiLinkedinFill } from 'react-icons/ri';
import DocTitle from '../../components/doc-title/DocTitle';
import Blade from '../../components/blade/Blade';

const AdminNetwork = () => {
    const [bladeStatus, setBladeStatus] = useState({ visible: false } as any);

    const showBlade = (title: string) => {
        setBladeStatus({title, visible: true})
    }

    const handleOnCloseBlade= () => {
        console.log('called')
        setBladeStatus({visible: false})
    }

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
                        <li className="grid-item">
                                
                                <button
                                    onClick={() => showBlade('Facebook')}
                                    type='button'
                                    className="network__item network__item--set"
                                >
                                    <GrFacebookOption />
                                </button>
                        </li>
                        <li className="grid-item">
                            <button
                                onClick={() => showBlade('Instagram')}
                                type='button'
                                className="network__item network__item--active"
                                
                            >
                                <FaInstagram />
                            </button>
                        </li>
                        <li className="grid-item">
                        <button
                            onClick={() => showBlade('Linkdin')}
                            type='button'
                            className="network__item"
                            >
                                <RiLinkedinFill />
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
            <Blade title={bladeStatus.title} visible={bladeStatus.visible} onClose={handleOnCloseBlade}>
                <p>Test</p>
            </Blade>
        </>
    );
}

export default AdminNetwork;