import React from 'react';
import { FiPlus } from 'react-icons/fi';
import './BlockButton.scss';

const BlockButton = ({label, handle, type}: any) => {
    return (
        <button
            type={type}
            className="block__button"
            onClick={handle}
          >
            <FiPlus />
            { label ? <span>{label}</span> : null }
        </button>
    );
}

export default BlockButton;