import Keycloak from 'keycloak-js';

const client = new Keycloak({
    url: 'https://sso.mprating.ru/',
    realm: 'mprating',
    clientId: 'general',
});

export default client;