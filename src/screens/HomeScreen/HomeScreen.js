import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  useParams,
  useHistory,
  Link
} from "react-router-dom";
import {Affix, Typography, Input, PageHeader } from 'antd';
import {AppleOutlined} from '@ant-design/icons';
import { FaApple, FaGooglePlay } from "react-icons/fa";
import FrontPage from '../../svgs/FrontPage';
import Logo from '../../common/Logo/Logo';
import './HomeScreen.css';

function HomeScreen(){
  let history = useHistory();
  let androidUrl = 'https://play.google.com/store/apps/details?id=com.tsekit';

  return (
    <div className="landing-page-container">
      <div style={{position:'absolute', top:0, width:'100%', height:70, display:'flex'}}>
      <div style={{padding:20}}>
        <Logo/>
      </div>
      
      {/*<Link to="/login" style={{padding:20, cursor:'pointer', textDecoration:'none'}}>
          <span style={{color:'white', fontWeight:'bold', fontSize:'1.2rem'}}>Login</span>
        </Link> */}
      </div>
      <div className="half-container" style={{minHeight:'100%'}}>
        <div style={{display:'flex', flexDirection:'column', margin:30}}>
          <h1 style={{fontSize:'3rem', fontWeight:'bold', letterSpacing:3}}>Introducing Hotspot</h1>
          <h3>Know the population in each place you decide to go.</h3>
          <h3>Make your trips safe and Covid-free.</h3>
          <div style={{marginTop:80}}>
            <Link to={{ pathname: androidUrl }} target="_blank" 
            style={{padding:10,paddingLeft:30,paddingRight:30, borderRadius:100,
            backgroundColor:'#0d0d15d4',width:'max-content',cursor:'pointer',
            display:'flex', justifyContent:'center', alignItems:'center'}}>
              <FaGooglePlay color="white" size="1.7em"/>
              <div style={{display:'flex', flexDirection:'column',justifyContent:'center',
              alignItems:'flex-start',color:'white',marginLeft:15, fontSize:'0.7rem'}}>
                <p style={{margin:0}}>Get it from</p>
                <p style={{fontSize:'1.4em', margin:0}}>Play store</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="half-container" style={{backgroundColor:'#ec4a4a', minHeight:'100%', display:'flex', flexFlow:'column'}}>
        <FrontPage style={{height:'auto', width:'50%', maxHeight:800}}/>
        <p style={{marginTop:20}}>*Image above does not reflect real data</p>
      </div>
      
    </div>
  );
}


export default HomeScreen;
