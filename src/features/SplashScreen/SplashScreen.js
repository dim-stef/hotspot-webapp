import React from 'react';

function SplashScreen(){
  return(
    <div style={{display:'flex',justifyContent:'center',alignItems:'center', flexFlow:'column',margin:50}}>
      <img src="/logo.png" style={{height:200,width:200,borderRadius:'100%'}}/>
    </div>
  )
}

export default SplashScreen;
