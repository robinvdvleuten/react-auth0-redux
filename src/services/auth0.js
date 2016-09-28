import Auth0 from 'auth0-js';

export default new Auth0({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  callbackOnLocationHash: true
});
