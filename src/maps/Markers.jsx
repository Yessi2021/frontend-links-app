import { Marker } from "react-leaflet"
import { IconLocation } from "./IconLocation"
import { useEffect, useState } from "react"


export const Markers = () => {

  
   

  const [place, setPlace] = useState([])

    let data = []
    const getPlaces = () => {
      const mapsExist = localStorage.getItem('maps')
      if ( mapsExist ) {
        const resultMaps = JSON.parse(mapsExist)
        console.log(resultMaps);
        let dataSend = {
          name:resultMaps.name,
          geometry: [
            resultMaps.latitude,
            resultMaps.longitude
          ]
        }
       
        //  setPlace([place,...dataSend])
        return dataSend
       }
    }

  let dataMap = []
 
  useEffect(()=>{
    
   let result = getPlaces()
   setPlace(result)

  },[])

  // dataMap.push(place)
  console.log(place);
 

  return (
      <>
        {
          dataMap && (
            dataMap.map((place,i) => (
              <Marker 
              key={i}
              position={place.geometry} 
              icon={ IconLocation } 
              />
          ))
          )
        }
      </>
  )
}
