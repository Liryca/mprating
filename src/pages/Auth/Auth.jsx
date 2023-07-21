import React,{useEffect} from 'react';
import './Auth.scss';
import Form from '../../components/Form/Form';
import Header from '../../components/Header/Header';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';


const Auth = () => {

    const state = useSelector(state=>state);
const navigate = useNavigate();
const location = useLocation();
const fromPage = location.state?.from?.pathname || '/';


useEffect(()=>{

if(state.auth.isAuth){
    navigate(fromPage, {replace:true});
}
       
},[fromPage, navigate, state.auth.isAuth, state.auth.isLoading])

//     if(!state.auth.isLoading){
//           return <TailSpin
//             height="140"
//             width="140"
//             ariaLabel="tail-spin-loading"
//             radius="1"
//             wrapperStyle={{}}
//             wrapperClass="tail-spin-loading"
//             visible={true}
//             color='#E5E7EB'
//         />
// }



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
