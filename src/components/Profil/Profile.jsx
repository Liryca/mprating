import React from 'react';
import instr from './images/Ic_instr.svg';
import set from './images/Ic_set.svg';
import exit from './images/Ic_exit.svg';
import mark from './images/mark.svg';
import './Profile.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfileShow } from '../../store/profile/action';
import { authLogoutAsyncAction } from '../../store/auth/action';
import {useKeycloak} from "../../keycloak/hook";


const Profile = () => {

    const dispatch = useDispatch();
    const profile = useSelector(state => state.profil);
    const navigate = useNavigate();
    const keycloak = useKeycloak();

    function logoutUser() {
        keycloak.logout();
        navigate("/main");
    }

    const handleProfileShow = () => dispatch(changeProfileShow(!profile.show));

    return (
        <div className='profil'>
            <div className='profil__menu '>
                <img className='profil__mark-icon' src={mark} alt='mark'></img>
                <Link onClick={handleProfileShow} to='/settings' className='profil__menu-item first-item'>
                    <p className='profil__menu-text title'>Нaстройки</p>
                    <img className='profil__menu-icon ' src={set} alt='settings'></img>
                </Link>
                <Link onClick={handleProfileShow} to='/instruction' className='profil__menu-item second-item'>
                    <p className='profil__menu-text title' >Инструкция</p>
                    <img className='profil__menu-icon ' src={instr} alt='instruction'></img>
                </Link>
                <div onClick={logoutUser} className='profil__menu-item third-item' >
                    <p className='profil__menu-text title'>Выход</p>
                    <img className='profil__menu-icon' src={exit} alt='exit'></img>
                </div>
            </div>
        </div>
    );
};

export default Profile;
