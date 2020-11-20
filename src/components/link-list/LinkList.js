import React from 'react';
import Avatar from '../avatar/Avatar';
import FancyLink from '../fancy-link/FancyLink';
import SocialNetwork from '../social-network/SocialNetwork';
import './LinkList.scss';

function LinkList(props) {

  const backgroundColours = {
    yellow: 'rgb(255, 194, 19)',
    blue: 'rgb(11, 175, 255)',
    pink: 'rgb(237, 99, 210)',
    purple: 'rgb(117, 81, 231)'
  }
  const LINKS = [ 
        { 
          url: 'https://docs.google.com/presentation/d/e/2PACX-1vQ7WswpUMziICGFPZUhOB42NpJgMgpJg_oZfRad7crXp-caKE3UdsWmWRq89l4GFsOT2PdtkSUiAqDQ/pub?start=false&amp;loop=false&amp;delayms=3000&amp;utm_medium=social&amp;utm_source=linktree&amp;utm_campaign=o+que+%C3%89+o+portugu%C3%8As+l%C3%9Adico%3F', 
          name: 'O QUE É O PORTUGUÊS LÚDICO?',
          icon: 'test',
          backgorundColor: backgroundColours.purple,
          textColor: 'black'
        },
        {
          url: "https://docs.google.com/presentation/d/1FHf45ZRG7R_v9AqCp_lri-9EYWWa0vOQut463rlke_g/edit?usp=sharing&amp;utm_medium=social&amp;utm_source=linktree&amp;utm_campaign=recursos+educacionais+gratuitos",
          name: 'Recursos Educacionais Gratuitos',
          icon: 'test',
          backgorundColor: backgroundColours.yellow,
          textColor: 'black'
        },
        {
          url: '',
          name: 'Cadastre-se para ficar ligado nas nossas programações',
          icon: 'test',
          backgorundColor: backgroundColours.pink,
          textColor: 'black'
        },
        {
          url: '',
          name: 'PLAYLIST NO SPOTIFY - Músicas em Português',
          icon: 'test',
          backgorundColor: backgroundColours.blue,
          textColor: 'black'
        },
        {
          url: '',
          name: 'Playlist no Spotify - Histórias em Português',
          icon: 'test',
          backgorundColor: backgroundColours.purple,
          textColor: 'black'
        },
        {
          url: '',
          name: 'E-BOOK "Português como Língua de Herança',
          icon: 'test',
          backgorundColor: backgroundColours.yellow,
          textColor: 'black'
        },
        {
          url: '',
          name: 'Nosso artigo no Blog da Gaby no Canadá: Português como Língua de Herança',
          icon: 'test',
          backgorundColor: backgroundColours.pink,
          textColor: 'black'
        },
        {
          url: '',
          name: 'Nosso artigo no Blog da Gaby no Canadá: Mitos sobre o bilinguismo',
          icon: 'test',
          backgorundColor: backgroundColours.blue,
          textColor: 'black'
        },
        {
          url: '',
          name: 'BATE PAPO SOBRE PLH (NPB Maternidade no Canada A importância de manter o Português em Casa)',
          icon: 'test',
          backgorundColor: backgroundColours.purple,
          textColor: 'black'
        },
        {
          url: '',
          name: 'YOUTUBE',
          icon: 'test',
          backgorundColor: backgroundColours.yellow,
          textColor: 'black'
        },
        {
          url: '',
          name: 'FACEBOOK',
          icon: 'test',
          backgorundColor: backgroundColours.pink,
          textColor: 'black'
        },
        {
          url: '',
          name: 'INSCREVA-SE COM SEU CONTATO DE CELULAR',
          icon: 'test',
          backgorundColor: backgroundColours.blue,
          textColor: 'black'
        }
    ]

    document.title = 'Links List | FindMeAt'

    return (
        <div className="link-list">
            <Avatar />
            <div style={{ marginBottom: '3rem'}}>
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
            <SocialNetwork />
        </div>
    );
}

export default LinkList;