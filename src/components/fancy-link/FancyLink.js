import React from 'react';
import './FancyLink.scss';

import { GoLinkExternal } from 'react-icons/go';

function FancyLink(props) {
    return (
        <div 
        className="link" 
        style={{ backgroundColor: props.backgroundColor, borderColor: props.textColor }}>
            <a href={props.link} >
                <GoLinkExternal className="link__icon"/>
                <p style={{ color: props.textColor }}>{ props.linkName }</p>
            </a>
        </div>
        
    );
}

export default FancyLink;