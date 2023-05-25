import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { useAuthStore, useLinksStore } from '../../hooks'
import { MapView } from '../../maps/MapView'
import { HomeView } from '../../maps/HomeView'
import { Link } from 'react-router-dom'
import '../../style.css';
import { useSelector } from 'react-redux'


export const MyOwnLinks = () => {
    
  const { user } =  useAuthStore()
  const { eventsLink, startLoadingLinks, getLinks } = useLinksStore()
  const newData = eventsLink.filter( link => link.user._id === user.uid)
  
  const [valUser, setValUser] = useState( newData )
    

  const { eventsLink: event } = useSelector( state => state.linkUser );

  console.log( event );


  useEffect(()=>{

    

    getLinks()

    
     startLoadingLinks()
  },[eventsLink])


  // console.log( valUser );

  if ( Array.isArray(event) ) {
      console.log('es un array');
  }

  return (
    <>
    <Navbar />
        <div className="container">
           <Link className='back' to="/" > 
           <h4 className='b-4' >
           <i className="fa fa-arrow-left" aria-hidden="true"></i>
           &nbsp;
            Back all links
           </h4>
            </Link>
        {
              Array.isArray(event)  &&
             ( event.length === 0 && (
              <h2>There are not links</h2>
             ))   
        }

     <div className="row">
        <div className="col-md-6">
          <div className="container m-4">
            <h2> User: <strong> {user.name}</strong> </h2>
          <h2 className='text-center' >My links</h2>
          </div>
        <div className="row">
          {
              Array.isArray(event)  && 
              ( event.map(link =>(
                <div className="col-4" key={link.id} style={{margin:"30px"}} >
                    <div className="card"  style={{width:"14rem"}} >
                    <div className="card-body">
                      <h5 className="card-title"> {link.title} </h5>
                      <span className="card-subtitle mb-2 text-muted">
                      Created by:
                      </span>
                      <h4>  <strong>{ link.user.name }</strong> </h4>
                     <span> <strong>Link</strong> {link.notes} </span>
                    </div>
                  </div>
                </div>
              )))
          }
        </div>
        </div>
        <div className="col-md-6">
            <HomeView/>
        </div>
     </div>
    </div>
    </>
  )
}
