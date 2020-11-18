import React from 'react';
import './FancyLink.scss'

function FancyLink(props) {
    return (
        <div className="link" style={{ backgroundColor: props.backgroundColor, borderColor: props.textColor }}>
            <a href={props.link} >
                <p style={{ color: props.textColor }}>{ props.linkName }</p>
            </a>
        </div>
        
    );
}

export default FancyLink;