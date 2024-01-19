import './App.scss';
import React, { useEffect} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { links } from './navigate/navigate';
import { useDispatch } from 'react-redux';
import {getApiKeyThunk } from './store/apiKey/action';
import { useKeycloak } from './keycloak/hook';
import { getCountAsyncAction, getNotificationsAcyncAction } from './store/notifications/action';


function App() {

    const dispatch = useDispatch();
    const keycloak = useKeycloak()

    useEffect(() => {
        if (keycloak) {
            dispatch(getApiKeyThunk())
            dispatch(getNotificationsAcyncAction());
            dispatch(getCountAsyncAction());
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
