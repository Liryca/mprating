import React, {useState,useEffect} from 'react';
import './Auth.scss';
import Form from '../../components/Form/Form';
import Header from '../../components/Header/Header';


const Auth = () => {

    console.log('auth')

    return (
        <><Header /><div className='auth'>
            <div className='auth__right-block'>
                <p className='auth__version notice'>Версия программы</p>
            </div>
            <Form />
        </div></>
    );
};

export default Auth;
