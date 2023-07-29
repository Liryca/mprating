import React from 'react';
import instr from './images/Ic_instr.svg';
import set from './images/Ic_set.svg';
import exit from './images/Ic_exit.svg';
import mark from './images/mark.svg';
import './Profil.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfilShow } from '../../store/profil/action';
import { authLogoutAsyncAction } from '../../store/auth/action';


const Profil = () => {

    const dispatch = useDispatch();
    const profil = useSelector(state => state.profil);
    const navigate = useNavigate();

    function logoutUser() {
        dispatch({ type: 'RESET_APP' });
        dispatch(authLogoutAsyncAction());
        navigate("/");
    }

    const handleProfileShow = () => dispatch(changeProfilShow(!profil.show));

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

export default Profil;
