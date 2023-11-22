import React, { useEffect, useState } from 'react';
import client from "./keycloak";
import { KeycloakContext } from './KeycloakContext';
import { TailSpin } from "react-loader-spinner";

export function KeycloakProvider({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.init({
            onLoad: "check-sso",
        })
            .then((authorization) => {
                if (authorization) {
                    localStorage.setItem('token',client.token)
                    setLoading(false);
                }
                else {
                    client.login();
                }
            })
            .catch(() => {
                console.log("Keycloak Error");
                client.login();
            });
    }, [client]);

    if (loading) {
        return <TailSpin
            height="140"
            width="140"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass="tail-spin-loading"
            visible={true}
            color='#E5E7EB' />
    }

    return (
        <KeycloakContext.Provider value={{ keycloak: client }}>
            {children}
        </KeycloakContext.Provider>
    );
}