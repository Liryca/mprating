import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { links } from './navigate/navigate';
import PrivateRouter from './hoc/PrivateRouter';
import PublicRouter from './hoc/PublicRouter';
import Auth from './pages/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsyncAction } from './store/auth/action';
import { authAction } from './store/auth/action';
import axios from 'axios';
import { getApiKeyThunk } from './store/apiKey/action';
// "proxy": "http://ovz21.j90211046.m6zkp.vps.myjino.ru:49156",

function App() {

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  // const location = useLocation();
  // const navigate = useNavigate();
  // const fromPage = location.state?.from?.pathname || '/'

  console.log(state.products.productList)


  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(authAction(true, localStorage.getItem('id')))
      dispatch(getApiKeyThunk(localStorage.getItem('id')))

 

      // navigate(fromPage, { replace: true });
    }
  }, [])


  let data = '{\r\n    "login":"222",\r\n    "password":"222"\r\n}';

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://auth.mprating.ru:8765/login',
    headers: {
      'Content-Type': 'text/plain'
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });




  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     dispatch(checkAuthAsyncAction())
  //   }
  // }, [])

  // if (auth.isLoading) {
  //   return <div>Загрузка...</div>
  // }

  //

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {<Route path='/' element={<PublicRouter><Auth /></PublicRouter>}></Route>}
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
