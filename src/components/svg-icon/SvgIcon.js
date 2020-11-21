import { React , Fragment }from 'react';
import { BsBook } from 'react-icons/bs';
import { BiChat } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineSmile } from 'react-icons/ai';
import { CgFileDocument } from 'react-icons/cg';
import { GiMusicalNotes, GiSoundWaves } from 'react-icons/gi';
import { MdOndemandVideo  } from 'react-icons/md';
import { FiFacebook } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';

const SvgIcon = ({iconName }) => {

    const icons = {
        book: <BsBook />,
        doc: <CgFileDocument />,
        email: <HiOutlineMail />,
        face: <AiOutlineSmile />,
        music: <GiMusicalNotes />,
        sound: <GiSoundWaves />,
        chat: <BiChat />,
        facebook: <FiFacebook />,
        tv: <MdOndemandVideo />,
        whatsapp: <SiWhatsapp />
    }


    return (
        <Fragment>
            {
                icons[iconName] ? icons[iconName] : null
            }
        </Fragment>
    );
}

export default SvgIcon;