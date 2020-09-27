import React, {useContext} from 'react';

export const UserContext = React.createContext({
  isAuth: null,
  setAuth: ()=>{},
  user: null,
  setUser: ()=>{},
})