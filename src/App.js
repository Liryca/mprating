import './App.css';
import React, { useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { links } from './navigate/navigate';
import { useDispatch, useSelector } from 'react-redux';
import { apiKeyAction, getApiKeyThunk } from './store/apiKey/action';
import client from './keycloak/keycloak';
import { KeycloakProvider } from "./keycloak/KeycloakProvider";
import { useKeycloak } from './keycloak/hook';
import { TailSpin } from 'react-loader-spinner';



function App() {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const apiKey = useSelector(state => state.apiKey)
    const keycloak = useKeycloak()


    // useEffect(() => {
    //     if (!keycloak.authenticated)
    //     client.onTokenExpired = () => {
    //         console.log("Token expired!");
          
    //         client.updateToken(30)
    //           .then((refreshed) => {
    //             if (refreshed) {
    //               console.log("Token was successfully refreshed");
    //             } else {
    //               console.log("Token is still valid");
    //             }
    //           })
    //           .catch(() => client.login({
    //             redirectUri: window.location.origin,
    //           }));
    //       };
    //   },[keycloak.authenticated])
  
    useEffect(() => {
        if (keycloak) {
          dispatch(getApiKeyThunk())
        }
    },[])

    return (
            <BrowserRouter>
                <div className="app">
                    <Routes>
                        {links.map((el) => {
                            return <Route
                                key={el.path}
                                path={el.path}
                                element={<div className={el.class}>
                                    <el.component />
                                </div>}
                            />
                        })}
                    </Routes>
                </div>
            </BrowserRouter>
    );
}

export default App;
