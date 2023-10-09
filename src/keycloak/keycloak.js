import Keycloak from 'keycloak-js';

// https://app.mprating.ru/rest/v1/client/keys
// https://app.mprating.ru/.

const client = new Keycloak({
    url: 'https://sso.mprating.ru/',
    realm: 'mprating',
    clientId: 'general',
});

export default client;