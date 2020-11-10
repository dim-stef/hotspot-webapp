import {Layout} from 'antd';
import React from 'react';

function Wrapper({children}){
  return(
    <Layout.Content className="app">
      <div style={{display:'flex',justifyContent:'center',alignItems:'center', flexFlow:'column', width:'100%', maxWidth:500}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center', flexFlow:'column',margin:50}}>
          <img src="/logo.png" style={{height:100,width:100,borderRadius:'100%'}}/>
          <h1>Hotspot</h1>
        </div>
        {children}
      </div>
    </Layout.Content>
  )
}

export default Wrapper;
