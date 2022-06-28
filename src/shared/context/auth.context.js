import { createContext } from 'react';

export const Authcontext = createContext({
  isLoggedIn: false,
  loggedIn: () => {},
  loggedOut: () => {},
});
