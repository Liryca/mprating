import React,{useEffect} from 'react';
import './Auth.scss';
import Form from '../../components/Form/Form';
import Header from '../../components/Header/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

    const state = useSelector(state=>state);
const navigate = useNavigate();

console.log(state)

useEffect(()=>{
if(state.auth.isAuth){
    navigate("/main");
}
       
},[navigate, state.auth.isAuth])

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
