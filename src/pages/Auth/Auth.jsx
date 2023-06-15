import React, { useState, useEffect } from 'react';
import './Auth.scss';
import Form from '../../components/Form/Form';
import Header from '../../components/Header/Header';


const Auth = () => {

    console.log('auth')

    return (
            <div className='auth'>
                {/* <div> */}
               <Header />
                  <Form />
                <div className='left'> </div>
   <div className='auth__version notice'><p>Версия программы</p></div>
                </div>
  
             
            // </div>
    );
};

export default Auth;
