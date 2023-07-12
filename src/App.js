import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { links } from './navigate/navigate';
import PrivateRouter from './hoc/PrivateRouter';
import PublicRouter from './hoc/PublicRouter';
import Auth from './pages/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsyncAction } from './store/auth/action';
import axios from 'axios';


function App() {

  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);


  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     dispatch(checkAuthAsyncAction())
  //   }
  // }, [])

  // if (auth.isLoading) {
  //   return <div>Загрузка...</div>
  // }

  // "proxy": "http://205f6154688e.vps.myjino.ru:49283",
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {<Route path='/' element={<PublicRouter><Auth/></PublicRouter>}></Route>}
          {links.map((el) => {
            return <Route
              key={el.path}
              path={el.path}
              element={<PrivateRouter>
                <div className={el.class}><el.component /></div>
              </PrivateRouter>}>
            </Route>
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
