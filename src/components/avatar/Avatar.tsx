import React from 'react';
import './Avatar.scss';

const Avatar = ({name, imageUrl, size = 'large'}: { name?: string, imageUrl: string, size: 'large' | 'medium' | 'small'}) => {
    const sizeMap = {
        small: '40px',
        medium: '80px',
        large: '112px'
    }
    return (
        <div className="avatar">
            <div className="image-container">
                <img 
                    style={{ width: sizeMap[size], height: sizeMap[size] }}
                    src={imageUrl} 
                    alt={name}/>
            </div>
            { name ? <p>{name}</p> : null }
        </div>
    );
}

export default Avatar;