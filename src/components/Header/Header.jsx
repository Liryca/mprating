import React from 'react';
import { useLocation } from "react-router-dom";
import logo from './images/ic_logo.svg';
import './Header.scss';
import Profile from '../Profil/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfileShow } from '../../store/profile/action';
import { NavLink } from 'react-router-dom';

const Header = () => {

    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile)

    function handleProfil() {
        dispatch(changeProfileShow(profile.show))
    }


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
                        {(location === '/main' || location === '/history' || location === '/instruction') &&
                            <div className='header__item'><NavLink className='header__menu-item main-font' to="/instruction">Инструкция</NavLink></div>}
                    </div>
                    <div className='header__second-column'>
                        {(location === '/main' || location === '/history' || location === '/instruction') &&
                            <div className='header__item'><NavLink className='header__menu-item strategy main-font' to="/main">Стратегия</NavLink></div>}
                        {(location === '/main' || location === '/history' || location === '/instruction') &&
                            <div className='header__item'><NavLink className='header__menu-item main-font history' to="/history">История</NavLink></div>}
                        {location !== '/' &&
                            <div
                                onClick={handleProfil}
                                className='header__profil-wrapp'>
                                <div className={!profile.show ? 'header__item profil-icon ' : ' header__item profil-icon-active'}></div>
                                {profile.show && <Profile />}
                            </div>}
                    </div>

                </div>

            </nav>
        </header>
    );
};

export default Header;