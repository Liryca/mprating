import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import back from './images/But_ back.svg'

const Footer = () => {

    return (
        <div className='footer'>
            <Link className='footer__icon' to='/main'><img src={back} alt='back' ></img></Link>
        </div>
    );
};

export default Footer;