import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { links } from './navigate';
import PrivateRouter from './hoc/PrivateRouter';
import PublicRouter from './hoc/PublicRouter';
import Auth from './pages/Auth/Auth';
import { instance } from './api/authConfig';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsyncAction } from './store/auth/action';
import Main from './pages/Main/Main';
import Settings from './pages/Settings/Settings';


function App() {
  
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
 
  // const headers = {
 
  //   "Content-Type": "application/json",
  // };

  // let url = '127.0.0.1:8000/api/test/';
  // let response =  fetch(url,{
  //   method:"POST"
  // });

  // console.log(response);




  // async function logJSONData() {
  //   const response = await fetch(url, {
  //     method: "POST",
   
  //   })
  //   const jsonData = await response.json();
  //   console.log(jsonData);
  // }

  // logJSONData()


  // useEffect(() => {
  //   // if (localStorage.getItem('token')) {
  //     dispatch(checkAuthAsyncAction())
  //   // }
  // }, [])

  // if (auth.isLoading) {
  //   return <div>Загрузка...</div>
  // }

 
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {<Route path='/' element={<Auth />}></Route>} 
          {links.map((el, i) =>{
            return <Route key={el.path} path={el.path} element={<PrivateRouter><div className={el.class}><el.component/></div></PrivateRouter>}></Route>
          }) }
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
