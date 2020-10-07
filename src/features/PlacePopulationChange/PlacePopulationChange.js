import React, {useEffect, useState, useContext} from 'react';
import {
  useParams
} from "react-router-dom";
import {UserContext} from '../../context/UserContext';
import axios from 'axios';
import { Typography } from 'antd';

const colors = {
  backgroundLow: '#4caf5096',
  backgroundMedium: '#03a9f45e',
  backgroundHigh: '#f403035e',
  textLow: 'green',
  textMedium: '#03a9f4',
  textHigh: '#f44336',
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function PlacePopulationChange(){
  const [status, setStatus] = useState(null);
  const [prevStatus, setPrevStatus] = useState(status);
  const [place, setPlace] = useState(null);
  let { id } = useParams();
  const userContext = useContext(UserContext);

  async function postStatus(type) {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/population-assessments/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userContext.isAuth}`,
        },
        body: JSON.stringify({
          assessment: type,
          place: place.id,
        }),
      });
      let json = await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  async function getPlace(){
    try{
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/places/${id}`);
      setPlace(response.data);
    }catch(e){

    }
  }
  
  function handleClick(type){
    postStatus(type);
    setStatus(type);
  }

  useEffect(()=>{
    if(place && place.population){
      setStatus(capitalizeFirstLetter(place.population))
    }
  },[place])
  useEffect(()=>{
    getPlace();
  },[])

  if(place){
    return (
      <div style={{display:'flex',flexFlow:'column',flex: 1, margin: 20, maxWidth:500}}>
        <Typography.Paragraph style={{fontWeight: 'bold', fontSize: 24}}>
          Ανανέωσε τον πληθυσμό
        </Typography.Paragraph>
        <Typography.Paragraph style={{marginTop: 10, marginBottom: 10}}>
          Για την καλύτερη εμπειρία είναι καλό να ανανεώνεις τον πληθυσμό κάθε 1
          ώρα ή όταν παρατηρείται αλλαγή
        </Typography.Paragraph>
        <div
          style={{
            display:'flex',
            flexDirection: 'row',
            padding: 0,
          }}>
          <StatusButton
            status={status}
            value="Low"
            label="Λίγος"
            backgroundColor={colors.backgroundLow}
            color={colors.textLow}
            onClick={() => handleClick('Low')}
            style={{
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              borderRightColor: '#ececec',
              borderRightWidth: 1,
            }}
          />
          <StatusButton
            status={status}
            value="Medium"
            label="Μεσαίος"
            backgroundColor={colors.backgroundMedium}
            color={colors.textMedium}
            onClick={() => handleClick('Medium')}
            style={{borderRightColor: '#ececec', borderRightWidth: 1}}
          />
          <StatusButton
            status={status}
            value="High"
            label="Πολύς"
            backgroundColor={colors.backgroundHigh}
            color={colors.textHigh}
            onClick={() => handleClick('High')}
            style={{borderTopRightRadius: 10, borderBottomRightRadius: 10}}
          />
        </div>
      </div>
    );
  }else{
    return null;
  }
}

function StatusButton({
  status,
  value,
  label,
  backgroundColor,
  color,
  onClick,
  style = {},
}) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor:'pointer',
        height: 100,
        display:'flex',
        flexGrow: 1,
        backgroundColor: status === value ? backgroundColor : '#f7f7f7',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}>
      <Typography.Title
        style={{
          margin:0,
          fontSize: 20,
          color: status === value ? color : 'black',
          fontWeight: 'bold',
        }}>
        {label}
      </Typography.Title>
    </div>
  );
}


export default PlacePopulationChange;
