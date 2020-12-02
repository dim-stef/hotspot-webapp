import React from 'react';

function Logo(){
  return (
    <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo"
    style={{height:50,width:50, objectFit:'cover', borderRadius:'100%'}}/>
  )
}

export default Logo;
