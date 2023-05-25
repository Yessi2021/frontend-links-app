import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MapView } from "./MapView"


export const HomeView = () => {

  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  })

  const [show, setShow] = useState(false)
  const [mapVlue, setMapVlue] = useState({
    name: '',
    latitude: 0,
    longitude:0
  })
 
  const handleShow = () => {
    setShow(!show)
  }



  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position){
        // console.log(position);
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
       
      },
      function(error){
          console.log(error);
      },
      {
         enableHighAccuracy: true,
        });
  }, [])
  

const handleMaps = (e) => {
  const { name, value } = e.target;
    setMapVlue({...mapVlue, [name]: value})
    
}

  const handleSaveLocation = () => {
    // e.preventDefault()
    console.log('click');
   
      const mapsCoors = JSON.stringify(state)
        localStorage.setItem('maps', mapsCoors )

  }

  const handleSubmitMaps = (e) => {
    e.preventDefault()
    // console.log( {mapVlue} );
    const mapsCoors = JSON.stringify(mapVlue)
    localStorage.setItem('maps', mapsCoors )
  }


  return (
   <div className="row">
    <div className="col-md-6">
    <div>
      <h2 className="text-center" > Geolocation </h2>
      <p>Current Longitud: <strong> { state.longitude } </strong> </p>
      <p>Current Latitud:  <strong> { state.latitude } </strong> </p>

     <div className="form-group mb-2">
     <button
     className="btn btn-info w-100"
      onClick={ handleSaveLocation }
      > Save my current location
      </button>
     </div>

      <div className="form-group">
      <button
      className="btn btn-warning w-100"
         onClick={ handleShow }
       > 
      { show ? ' Close the map' : 'See the map' }
      </button>
      </div>
{
  show &&  <MapView setShow={setShow} show={show} state={state} />
}
     
    </div>
    </div>
    <div className="col-md-6">
        <form onSubmit={ handleSubmitMaps } >
            <div className="form-group">
            <label >
                Name
            <input type="text" 
             className="form-control" 
              value={ mapVlue.name  }
              name="name"
              onChange={ handleMaps }
              placeholder="name"
            />
            </label>
               </div>
               <div className="form-group">
            <label >
              Latitude
            <input type="number"
            className="form-control" 
            name="latitude"
              value={ mapVlue.latitude }
              onChange={ handleMaps }
              placeholder="latitude"
            />
            </label>
            </div>
               <div className="form-group">
            <label>
              Longitude
            <input type="number" 
             className="form-control" 
            placeholder="longitude"
            name="longitude"
              value={ mapVlue.longitude }
              onChange={ handleMaps }
            />
            </label>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-success w-100 m-2" > Save another location 
                </button>
            </div>
        </form>
    </div>
   </div>
  )
}
