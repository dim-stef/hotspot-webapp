import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  useParams
} from "react-router-dom";
import {Layout, Affix, Typography, Input, PageHeader } from 'antd';
import {UserContext} from '../context/UserContext';
import useTranslations from '../features/Translations/useTranslations';
import useWindowScroll from '../features/GenericHooks/useWindowScroll';
import PlaceList from '../features/PlaceList/PlaceList';
import axios from 'axios';

const { Search } = Input;

const initFilters = {
  place_type: {
    param: 'place_type.type',
    value: null,
  },
  location: {
    param: 'location.short_name',
    value: null,
  },
  population: {
    param: 'population_contains',
    value: null,
  },
};

function buildQuery(baseUri, params, extra = {}) {
  params = {...params, ...extra};
  if (params) {
    var esc = encodeURIComponent;
    var query = Object.keys(params)
      .filter(k => params[k].value !== null)
      .map(k => esc(params[k].param) + '=' + esc(params[k].value))
      .join('&');
    let newUri = query ? `${baseUri}?${query}` : baseUri;
    return newUri;
  }
  return baseUri;
}

function SearchScreen(){
  const [filters, setFilters] = useState(initFilters);
  const userContext = useContext(UserContext);

  function filtersActive() {
    return Object.keys(filters).some(k => filters[k].value !== null);
  }

  return(
    <HomePlaceList filters={filters} setFilters={setFilters}/>
  )
}

function HomePlaceList({filters, setFilters}){
  const limit = 10;
  const start = useRef(0);
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState(null);
  const hasMore = useRef(false);
  const [translations, setTranslations] = useState([]);
  //const [start, setStart] = useState(0);
  const [_, getTranslatedType, getTypeValueFromTranslation] = useTranslations(
    'place_types',
  );
  let [position, reachedBottom] = useWindowScroll();
  async function getPlaces() {
    console.log(search)
    let coreUrl = '/places';
    let params = search?{
      name_contains:{
        param:'name_contains',
        value:search
      },
      start: {
        param: '_start',
        value: start.current,
      },
      limit: {
        param: '_limit',
        value: limit,
      },
    }:{
      start: {
        param: '_start',
        value: start.current,
      },
      limit: {
        param: '_limit',
        value: limit,
      },
    }
    try {
      let uri = buildQuery(process.env.REACT_APP_API_URL + coreUrl, filters, params);
      let response = await fetch(uri);
      let json = await response.json();
      if(json.length==0){
        hasMore.current = false;
      }
      if (start.current != 0) {
        setPlaces([...places, ...json]);
      } else {
        setPlaces(json);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function getTranslations() {
    try {
      let response = await fetch(process.env.REACT_APP_API_URL + '/translations');
      let json = await response.json();
      setTranslations(json[0].place_type);
    } catch (e) {}
  }

  function loadData() {
    start.current = start.current + limit;
    getPlaces();
  }

  function handleChange(e){
    setSearch(e.target.value)
  }

  useEffect(() => {
    //getPlaces();
    getTranslations();
  }, []);

  useEffect(()=>{
    if(reachedBottom && hasMore.current){
      loadData();
    }
  },[reachedBottom])

  useEffect(()=>{
    start.current = 0;
    hasMore.current = true;
    getPlaces();
  },[search])

  useEffect(() => {
    start.current = 0;
    hasMore.current = true;
    getPlaces();
  }, [filters]);

  return(
    <Layout.Content className="app">
      <div>
        <Affix offsetTop={0}></Affix>
        <PageHeader title="Μέρη"
        onBack={() => null}>
          <Search placeholder="Ψάξε μέρος, καφετέρια, κατάστημα κτλ." enterButton onChange={handleChange}/>
          <PlaceList places={places}/>
        </PageHeader>
      </div>
    </Layout.Content>
  )
}
export default SearchScreen;
