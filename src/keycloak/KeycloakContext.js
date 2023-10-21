import client from './keycloak';
import React from 'react';

export const KeycloakContext = React.createContext({
    keycloak: client,
});

