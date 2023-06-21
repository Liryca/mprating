import React from 'react';
import './Auth.scss';
import Form from '../../components/Form/Form';
import Header from '../../components/Header/Header';

const Auth = () => {

    return (
        <div className='auth'>
            <Header />
            <Form />
            <div className='left'> </div>
            <div className='auth__version notice'><p>Версия программы</p></div>
        </div>
    );
};

export default Auth;
