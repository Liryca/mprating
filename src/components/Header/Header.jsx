import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from './images/logo.png';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon/Icon';
import IconsSvg from "./images/icons.svg";
import tg from './images/telegram.svg';
import youtub from './images/youtube.svg';

const Header = () => {

    const location = useLocation().pathname;
    return (
        <header className='header'>
            <nav className='header__nav-bar'>
                <div className='header__list'>
                    <div className='header__first-column'>
                        <div className='header__item'>
                            <Link className='header__logo' to={"/main"}>
                            <img src={logo} alt='MPrating'></img>
                                </Link>
                         
                        </div>
                      
                        {/* <div className='header__item'><NavLink  className='header__menu-item main-font disabled-link' to="/history">История</NavLink> </div> */}

                    </div>
                    <div className='header__second-column'>
                    <div className='header__item'><NavLink target='_blank' className='header__menu-item main-font' to="/instruction">Инструкция по работе</NavLink></div>
                        <div className='header__social-icons'>
                            <a target="_blank" href='https://www.youtube.com/@mprating'>
                            <img className='youtube-icon' src={youtub} alt='youtub'></img>
                                {/* <Icon classN={'youtube-icon'} id={'#State=Hover'} size={25} iconsSvg={IconsSvg} /> */}
                              
                            </a>
                            <a target="_blank" href='https://t.me/+cuZi8Td6KmFhYTA6'>
                            <img className='tg-' src={tg} alt='tg'></img>
                                {/* <Icon classN={'tg-'} id={'#State=Hover (1)'} size={25} iconsSvg={IconsSvg} /> */}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;