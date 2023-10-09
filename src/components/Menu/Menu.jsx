import React from 'react';
import './Menu.scss';
import auto_soft from './images/Ic_auto_soft.svg';
import log_out from './images/Ic_log_out.svg';
import rates from './images/Ic_rates.svg';
import settings from './images/Ic_settings.svg';
import repricer from './images/Ic_smart_repricer.svg';
import wb_browser from './images/Ic_wb_browser.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogoutAsyncAction } from '../../store/auth/action';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import {useKeycloak} from "../../keycloak/hook";

const Menu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const keycloak = useKeycloak();

    function logoutUser() {
        keycloak.logout();
        navigate("/main");
    }

    return (
        <div className='menu__wrapper'>
                    <div className='menu'>
            <div className='menu__top-block'>
                <ul className='menu__products'>

                    <li className='products__item'><a href=''><img className='menu__ic_repricer' src={repricer} alt='repricer' ></img></a></li>
                    <li className='products__item'><a href=''><img  className='menu__ic_wb_browser' src={wb_browser} alt='wb_browser' ></img></a></li>
                    <li className='products__item'><a href=''><img  className='menu__ic_auto_soft'  src={auto_soft} alt='auto_soft' ></img></a></li>

                    <li className='products__item'>
                        <Tooltip title="Тарифы" placement="right" arrow>
                            <a href=''> <img  className='menu__ic_auto_rates' src={rates} alt='rates' ></img>   </a>
                        </Tooltip>
                    </li>


                </ul>
            </div>
            <div className='menu__bottom-block'>
                <ul className='menu__list'>
                    <li onClick={logoutUser} className='list__item'><a><img  className='menu__ic_log_out' src={log_out} alt='log_out'></img></a></li>
                    <li className='list__item'> <Link to='/settings'> <img  className='menu__ic_settings' src={settings} alt='settings'></img>  </Link> </li>
                </ul>
            </div>
        </div>
        </div>

    );
};

export default Menu;