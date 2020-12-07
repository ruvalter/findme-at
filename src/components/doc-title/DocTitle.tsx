import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

export interface DocTitleProps {
    tabTitle?: string,
    headingText: string,
    srOnly?: boolean,
    styleProps?: any
}

const DocTitle = ({tabTitle, headingText, srOnly=false, styleProps}: DocTitleProps) => {

    // const srStyles = {
    //     position: 'absolute',
    //     width: '1px',
    //     height: '1px',
    //     padding: '0',
    //     margin: '-1px',
    //     overflow: 'hidden',
    //     clip: 'rect(0,0,0,0)',
    //     border: 0
    // }

    const headingRef = useRef({ focus: () => null} as any);

    useEffect(() => {
        headingRef.current?.focus();
    }, []);

    return (
        <>
            <Helmet>
                <title>{tabTitle ? tabTitle : headingText} | Linke Explorer </title>
            </Helmet>
            <h1 ref={headingRef} tabIndex={-1} className={ srOnly ? 'sr-only' : ''} style={{...styleProps}}>{headingText}</h1>
        </>
    );
}

export default DocTitle;