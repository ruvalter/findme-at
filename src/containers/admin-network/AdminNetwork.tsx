import React from 'react';
import './AdminNetwork.scss';
import { GrFacebookOption } from 'react-icons/gr';
import { FaInstagram } from 'react-icons/fa';
import { RiLinkedinFill } from 'react-icons/ri';

const AdminNetwork = () => {
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
                <h1 style={{ margin: 0, marginRight: '1rem', color: 'var(--c_blue-d)' }}>Social Network</h1>
                <div className="container">
                    <ul className="grid-row" style={{ listStyle: 'none', margin: '2em 0 0 0', padding: 0}}>
                        <li className="grid-item">
                                
                                <button
                                    type='button'
                                    className="network__item network__item--set"
                                >
                                    <GrFacebookOption />
                                </button>
                                {/* Facebook */}
                        </li>
                        <li className="grid-item">
                            <button
                                type='button'
                                className="network__item network__item--active"
                            >
                                <FaInstagram />
                            </button>
                        </li>
                        <li className="grid-item">
                        <button
                                type='button'
                                className="network__item"
                            >
                                <RiLinkedinFill />
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
}

export default AdminNetwork;