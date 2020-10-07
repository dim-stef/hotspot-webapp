import React, {useContext, useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Layout, Content } from 'antd';
import Login from './features/Authentication/Login/Login';
import Register from './features/Authentication/Register/Register';
import SplashScreen from './features/SplashScreen/SplashScreen';
import MyPlaces from './features/MyPlaces/MyPlaces';
import HomeScreen from './features/HomeScreen/HomeScreen';
import PlacePopulationChange from './features/PlacePopulationChange/PlacePopulationChange';
import {UserContext} from './context/UserContext';
import axios from 'axios';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  const userContext = useContext(UserContext);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isAuth, setAuth] = useState(getLocalToken());
  const [user, setUser] = useState(null);

  function getLocalToken(){
    if(localStorage.getItem('token')==='null'){
      return null;
    }else{
      return localStorage.getItem('token')
    }
  }

  async function getUser(){
    setLoadingUser(true);
    try{
      let response = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/users/me`,{
        headers: {
          'Authorization': `Bearer ${isAuth}`,
        },
      })
      setUser(response.data);
      setLoadingUser(false);
      console.log(response)
      if(response.status === 401){
        setUser(null);
      }
    }catch(e){
      setAuth(null);
      setUser(null);
      setLoadingUser(false);
    }
  }

  useEffect(()=>{
    localStorage.setItem('token', isAuth);
    axios.interceptors.request.use(function (config) {
      const token = isAuth;

      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }else{
        delete axios.defaults.headers.common["Authorization"];
      }

      return config;
    });
    getUser();
  },[isAuth])

  return (
    <UserContext.Provider value={{isAuth:isAuth, setAuth:setAuth, user:user, setUser:setUser}}>
      <Layout style={{height:'100%', justifyContent:'center', alignItems:'center'}}>
        <Layout.Content className="app">
          {loadingUser?<SplashScreen/>:
            <Router>
            <Switch>
              <Route exact path="/">
                <HomeScreen/> 
              </Route>
              <Route exact path="/myplaces">
                <MyPlaces/> 
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/register">
                <Register/>
              </Route>
              <Route path="/place/:id">
                <PlacePopulationChange/>
              </Route>
              
            </Switch>
          </Router>}
        </Layout.Content>
      </Layout>
    </UserContext.Provider>
  );
}

export default App;
