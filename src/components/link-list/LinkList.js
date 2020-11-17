import React from 'react';
import FancyLink from '../fancy-link/FancyLink';
import './LinkList.scss';

function LinkList(props) {
    const LINKS = [ 
        { 
          url: 'https://docs.google.com/forms/d/e/1FAIpQLSeJb3ykK36rMehBKro7oyBWX3h3gsDIrSi5o1gafPpwbV8u-g/viewform', 
          name: 'Clubinho Literário Online - Novembro TURMA 2',
          icon: 'test',
          backgorundColor: 'yellow',
          textColor: 'black'
        },
        { 
          url: 'https://docs.google.com/presentation/d/e/2PACX-1vQ7WswpUMziICGFPZUhOB42NpJgMgpJg_oZfRad7crXp-caKE3UdsWmWRq89l4GFsOT2PdtkSUiAqDQ/pub?start=false&amp;loop=false&amp;delayms=3000&amp;utm_medium=social&amp;utm_source=linktree&amp;utm_campaign=o+que+%C3%89+o+portugu%C3%8As+l%C3%9Adico%3F', 
          name: 'O QUE É O PORTUGUÊS LÚDICO?',
          icon: 'test',
          backgorundColor: 'pink',
          textColor: 'white'
        }
    ]

    return (
        <div className="link-list">
            {
              LINKS.map(link => {
                return <FancyLink 
                  key={link.name } 
                  link={link.url } 
                  linkName={ link.name } 
                  backgroundColor={ link.backgorundColor }
                  textColor={ link.textColor } />
              })  
            }
        </div>
    );
}

export default LinkList;