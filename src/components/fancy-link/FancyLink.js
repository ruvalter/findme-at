import React from 'react';
import './FancyLink.scss'

function FancyLink(props) {
    return (
        <a href={props.link} className="link" style={{ backgroundColor: props.backgroundColor, borderColor: props.textColor }}>
            <p style={{ color: props.textColor }}>{ props.linkName }</p>
        </a>
    );
}

export default FancyLink;