import { Map,  TileLayer } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import "../style.css";
import { Markers } from "./Markers";
import { places } from "../assets/data.json"
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./maps.css";


export const MapView = ({state}) => {
  console.log(state);
  // console.log(state.latitude);
  // console.log(state.longitude);
    const [coorV, setCoorV] = useState({
        currentLocation: { lat: state.latitude, lng: state.longitude },
        zoom: 13,
     })

 

    useEffect(()=>{
  
      if ( state.longitude &&  state.latitude ) {
          const currenLocation = {
            lat: state.latitude,
            lng: state.longitude
          }
        
          setCoorV({...coorV,currenLocation})
      }

    },[])

    // console.log( coorV );
  return (
    <div className="container maps animate__animated animate__bounce animate__delay-2s" >
        <Map center={ coorV.currentLocation } zoom={coorV.zoom} >
            <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/> 
            <Markers places={places} />
        </Map>
    </div>
  )
}
