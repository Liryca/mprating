import React from 'react';
import { useLocation } from "react-router-dom";
import logo from './images/ic_logo.svg';
import telegram from './images/Ic_telegram.svg';
import youtube from './images/Ic_youtube (1).svg';
import './Header.scss';
import { NavLink } from 'react-router-dom';



const Header = () => {

    const location = useLocation().pathname;
    return (
        <header className='header'>
            <nav className='header__nav-bar'>
                <div className='header__list'>
                    <div className='header__first-column'>
                        <div className='header__item'>
                            <a href='' className='header__logo'>
                                <img src={logo} alt='MPrating'></img>
                            </a>
                        </div>
                        {(location !== '/') &&
                            <><div className='header__item'><NavLink className='header__menu-item main-font' to="/instruction">Инструкция</NavLink></div>
                                <div className='header__item'><NavLink className='header__menu-item main-font' to="/main">Главная</NavLink></div></>}

                    </div>
                    <div className='header__second-column'>
                        {(location !== '/') &&
                            <div className='header__social-icons'>
                                <a target="_blank" href='https://www.youtube.com/@mprating'><img className='youtube-icon' src={youtube} alt='youtube'></img></a>
                                <a target="_blank" href='https://t.me/+cuZi8Td6KmFhYTA6'><img className='tg-' src={telegram} alt='telegram'></img></a>
                            </div>}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;