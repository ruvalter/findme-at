import React from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { MdDeleteSweep } from 'react-icons/md';

const ToolBox = ({toggleActivation, handleDelete, linkObj }: any) => {
    return (
        <ul style={{ 
                padding: '10px 0 0',
                marginTop: '1em',
                display: 'flex',
                borderTop: '1px solid var(--c_grey-l)'
            }}>
            <li>
            <button
                onClick={() => toggleActivation()}
                aria-pressed={linkObj.enabled}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: linkObj.enabled ? '#2fc4b2' : '#c1c8d1',
                    padding: 0,
                    paddingRight: '.5em'
                }}
                >
                <AiOutlineLink />
                
                </button>
            </li>
            <li>
            <button
                onClick={() => handleDelete(linkObj.id)}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: 'var(--c_blue-d)',
                    padding: 0
                }}
                >
                <MdDeleteSweep />
                </button>
            </li>
        </ul>
    );
}

export default ToolBox;