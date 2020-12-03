import React from 'react';
import './Avatar.scss';

const Avatar = ({hasLabel = true, size = 'large'}) => {
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
                    src="https://d1fdloi71mui9q.cloudfront.net/7OMTzNoWRUyemfCm2cp0_22bfaaf9ec190f011141289a3cb182ed4" 
                    alt="Português Lúdico Logo"/>
            </div>
            { hasLabel ? <p>Português Lúdico</p> : null }
        </div>
    );
}

export default Avatar;