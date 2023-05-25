import { useEffect, useState } from "react"
import { FabAddNew, FabDelete, LinksModal, Navbar } from "../"
import { useAuthStore, useUiStore } from "../../hooks/"
import { useLinksStore } from "../../hooks/useLinksStore"

import '../../style.css';



// const events = [
//   {
//     title:'aprender',
//     notes:'Hay que aprender mas Nextjs',
//     user: {
//       _id:1234,
//       name: "Alexander"
//     }
//   }
// ]

export const LinkPage = () => {

const [colorCard, setColorCard] = useState(false)

const { openDateModal } = useUiStore()

const  { user } = useAuthStore()

 const { eventsLink, setActiveLinks, startLoadingLinks } = useLinksStore()
      const [userLink, setUserLink] = useState([])

     
     
    
// const onDoubleClick = (evento) => {}

const onShowModal = () => {
  openDateModal()
}


const onSelect = (evento) => {
  // console.log(evento);
  setActiveLinks(evento)
  setColorCard( !colorCard )

  
}



useEffect(()=>{

  const newData = eventsLink.filter( link=> link.user._id === user.uid)
  setUserLink( newData )
  console.log( eventsLink );
  startLoadingLinks()

},[ eventsLink ])

// console.log( userLink );



  return (
    <>
      <Navbar/>
    <div className="container">
        <h2 className="text-center" >All links Company</h2>
    </div>
    <div className="links">
      <div className="row">
      {
          eventsLink.map( (event) => (
            <div key={event.id} 
            className=" col-md-4"
            >

        <div className="card mb-2" style={{width:"18rem"}}
         
        >
          <div className='card-body'>
            <h5 className="card-title"> {event.title} </h5>
            <h6 className="card-subtitle mb-2 text-muted">Creacted by</h6>
            <p className="card-text"> { event.user.name } </p>
            <h6 className="card-subtitle mb-2 text-muted">Notes</h6>
            <p> {event.notes} </p>
            <a
                onClick={ ()=> onSelect(event) }
                onDoubleClick={ onShowModal}
                 className='btn btn-secondary'  
                 > 
                Double click to Edit Link
                </a>
              
          </div>
        </div>

            </div>
          ))
        }
      </div>
    </div>
  
  <LinksModal/>
  <FabAddNew/>
  <FabDelete/>
    </>
  )
}
