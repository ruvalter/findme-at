import React from 'react';
import { FiPlus } from 'react-icons/fi';
import './FlyingButton.scss';

const FlyingButton = ({label, handle, type}: any) => {
    return (
        <button
            type={type}
            className="flying__button"
            onClick={handle}
          >
            <FiPlus />
            { label ? <span>{label}</span> : null }
        </button>
    );
}

export default FlyingButton;