import React from 'react';
import { useLocation } from "react-router-dom";
import logo from './images/ic_logo.svg';
import './Header.scss';
import Profil from '../Profil/Profil';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfilShow } from '../../store/profil/action';


const Header = () => {


    const location = useLocation().pathname;
    const dispatch = useDispatch();
    const { profil } = useSelector(state => state)

    function handleProfil() {
        dispatch(changeProfilShow(profil.show))
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
                        {location === '/main' && <div className='header__item'><a className='main-font' href=''>Инструкция</a></div>}
                    </div>
                    <div className='header__second-column'>
                        {location === '/main' && <div className='header__item main-font strategy' >Стратегия</div>}
                        {location === '/main' && <div className='header__item main-font'>История</div>}
                        {location !== '/' &&
                            <div
                                onClick={handleProfil}
                                className='header__profil-wrapp'>
                                 <div className ={!profil.show? 'header__item profil-icon ':' header__item profil-icon-active' }></div>
                                {profil.show && <Profil />}
                            </div>}
                    </div>

                </div>

            </nav>
        </header>
    );
};

export default Header;