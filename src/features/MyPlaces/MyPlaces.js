import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {Card, PageHeader, Button, Descriptions, Typography} from 'antd';
import {UserContext} from '../../context/UserContext';
import PopulationButton from '../PopulationButton/PopulationButton';
import axios from 'axios';
import './MyPlaces.css';

const colors = {
  backgroundLow: '#4caf5096',
  backgroundMedium: '#03a9f45e',
  backgroundHigh: '#f403035e',
  textLow: 'green',
  textMedium: '#03a9f4',
  textHigh: '#f44336',
};

function MyPlaces(){
  const userContext = useContext(UserContext);
  const history = useHistory();
  const [places, setPlaces] = useState([]);
  async function getPlaces(){
    try{
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/my_places`,{
        headers: {
          'Authorization': `Bearer ${userContext.isAuth}`
        }
      })
      setPlaces(response.data);
    }catch(e){

    }
  }

  function handleClick(place){
    history.push(`/place/${place.id}`);
  }

  useEffect(()=>{
    getPlaces();
  },[])

  return(
    <div style={{display:'flex',flexFlow:'column'}}>
      {places.map(place=>{
        return(
          <React.Fragment key={place.id}>
            <Card title={false} style={{ width: 400, margin:30, cursor:'pointer' }} className="card" 
            onClick={()=>handleClick(place)}>
              <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                <div style={{display:'flex',flexFlow:'row'}}>
                  {place.profile_image?
                  <img alt="Profile" src={`${process.env.REACT_APP_DOMAIN_URL}${place.profile_image.url}`} 
                  style={{height:60,width:60, objectFit:'cover',borderRadius:'100%'}}/>
                  :<div style={{height:60,width:60, display:'flex', justifyContent:'center',
                  alignItems:'center',backgroundColor:'#f0f2f5',borderRadius:'100%'}}>
                    <Typography.Title style={{margin:0}} level={3}>
                      {place.name.charAt(0).toUpperCase()}
                    </Typography.Title>
                  </div>}
                  <div style={{display:'flex', flexFlow:'column',justifyContent:'center',alignItems:'flex-start',
                  margin:'0 20px'}}>
                    <Typography.Title style={{margin:0}} level={5}>
                      {place.name}
                    </Typography.Title>
                    {place.last_assessment ? (
                      <Typography.Paragraph style={{fontSize: 12, color: 'gray', margin:0}}>
                        Τελ. ενημέρωση πριν{' '}
                        {timeSince(new Date(place.last_assessment.created_at))}
                      </Typography.Paragraph>
                    ) : null}
                  </div>
                </div>
                <PopulationButton population={place.population}/>
              </div>
            </Card>
          </React.Fragment>
        )
      })}
      
    </div>
  )
}

function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + ' χρόνια';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' μήνες';
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' μέρες';
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' ώρες';
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' λεπτά';
  }
  return Math.floor(seconds) + ' δευτ.';
}

export default MyPlaces;
