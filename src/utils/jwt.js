import auth0 from '../services/auth0';

export const getTokenExpirationDate = (token) => {
  const decoded = auth0.decodeJwt(token);

  if (!decoded.exp) {
    return null;
  }

  // The 0 here is the key, which sets the date to the epoch.
  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);

  return date;
}
