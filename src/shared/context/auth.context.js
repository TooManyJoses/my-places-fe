import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  loggedIn: () => {console.log('Logged In')},
  loggedOut: () => {console.log('Logged out')},
});
