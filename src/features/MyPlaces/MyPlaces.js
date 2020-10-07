import React, {useState, useContext, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {Card, PageHeader, Button, Descriptions, Typography} from 'antd';
import {UserContext} from '../../context/UserContext';
import PopulationButton from '../PopulationButton/PopulationButton';
import PlaceList from '../PlaceList/PlaceList';
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


  useEffect(()=>{
    getPlaces();
  },[])

  return(
    <PlaceList places={places}/>
  )
}


export default MyPlaces;
