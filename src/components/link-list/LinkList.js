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
          icon: 'face',
          backgorundColor: backgroundColours.purple,
          textColor: 'black'
        },
        {
          url: "https://docs.google.com/presentation/d/1FHf45ZRG7R_v9AqCp_lri-9EYWWa0vOQut463rlke_g/edit?usp=sharing&amp;utm_medium=social&amp;utm_source=linktree&amp;utm_campaign=recursos+educacionais+gratuitos",
          name: 'Recursos Educacionais Gratuitos',
          icon: 'book',
          backgorundColor: backgroundColours.yellow,
          textColor: 'black'
        },
        {
          url: 'https://mailchi.mp/f354fb514a14/portugus-ldico?utm_medium=social&utm_source=linktree&utm_campaign=cadastre-se+para+ficar+ligado+nas+nossas+programa%C3%A7%C3%B5es',
          name: 'Cadastre-se para ficar ligado nas nossas programações',
          icon: 'doc',
          backgorundColor: backgroundColours.pink,
          textColor: 'black'
        },
        {
          url: 'https://open.spotify.com/playlist/6pgH4qaMs6ZmE8hfJHfH9k?si=HEun1ExzSN-M_oTJK3lTkg&utm_medium=social&utm_source=linktree&utm_campaign=playlist+no+spotify+-+m%C3%BAsicas+em+portugu%C3%AAs',
          name: 'PLAYLIST NO SPOTIFY - Músicas em Português',
          icon: 'music',
          backgorundColor: backgroundColours.blue,
          textColor: 'black'
        },
        {
          url: 'https://open.spotify.com/playlist/3WMWiPdCORg7ZnxkfaCW5s?si=vGPbmgYqQ66Hd4shoFLaNQ&utm_medium=social&utm_source=linktree&utm_campaign=playlist+no+spotify+-+hist%C3%B3rias+em+portugu%C3%AAs',
          name: 'Playlist no Spotify - Histórias em Português',
          icon: 'sound',
          backgorundColor: backgroundColours.purple,
          textColor: 'black'
        },
        {
          url: 'https://docs.google.com/presentation/d/e/2PACX-1vTgVnrVTGFn0dhyguwDsNGooJguaz2pS9yazKVdnPFDj5IuQdDjJT0_Wn9xXi-yPBZqI2pYBXAqMF6W/pub?start=false&loop=false&delayms=3000&slide=id.g8c890637e2_1_22',
          name: 'E-BOOK "Português como Língua de Herança',
          icon: 'book',
          backgorundColor: backgroundColours.yellow,
          textColor: 'black'
        },
        {
          url: 'https://gabynocanada.com/2017/04/21/projeto-portugues-ludico-o-portugues-como-lingua-de-heranca-para-filhos-de-pais-brasileiros-aqui-em-toronto/?utm_medium=social&utm_source=linktree&utm_campaign=nosso+artigo+no+blog+da+gaby+no+canad%C3%A1%3A+portugu%C3%AAs+como+l%C3%ADngua+de+heran%C3%A7a',
          name: 'Nosso artigo no Blog da Gaby no Canadá: Português como Língua de Herança',
          icon: 'doc',
          backgorundColor: backgroundColours.pink,
          textColor: 'black'
        },
        {
          url: 'https://gabynocanada.com/2016/11/13/tres-grandes-mitos-do-bilinguismo/?utm_medium=social&utm_source=linktree&utm_campaign=nosso+artigo+no+blog+da+gaby+no+canad%C3%A1%3A+mitos+sobre+o+bilinguismo',
          name: 'Nosso artigo no Blog da Gaby no Canadá: Mitos sobre o bilinguismo',
          icon: 'doc',
          backgorundColor: backgroundColours.blue,
          textColor: 'black'
        },
        {
          url: 'https://youtu.be/gU0BTkEjzKY',
          name: 'BATE PAPO SOBRE PLH (NPB Maternidade no Canada A importância de manter o Português em Casa)',
          icon: 'chat',
          backgorundColor: backgroundColours.purple,
          textColor: 'black'
        },
        {
          url: 'https://www.youtube.com/channel/UC3UnSzMgLKcy80W_UWfotKQ?utm_medium=social&utm_source=linktree&utm_campaign=youtube%3Fsub_confirmation%3D1',
          name: 'YOUTUBE',
          icon: 'tv',
          backgorundColor: backgroundColours.yellow,
          textColor: 'black'
        },
        {
          url: 'https://www.facebook.com/portuguesludico?utm_medium=social&utm_source=linktree&utm_campaign=facebook',
          name: 'FACEBOOK',
          icon: 'facebook',
          backgorundColor: backgroundColours.pink,
          textColor: 'black'
        },
        {
          url: 'https://api.whatsapp.com/send?phone=14168027450',
          name: 'INSCREVA-SE COM SEU CONTATO DE CELULAR',
          icon: 'whatsapp',
          backgorundColor: backgroundColours.blue,
          textColor: 'black'
        }
    ]

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
                    icon={ link.icon }
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