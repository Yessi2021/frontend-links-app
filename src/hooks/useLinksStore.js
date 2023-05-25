import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteLinks, onLoadLinks, onSetActiveLinks, onUpdateLinks  } from "../store";
import Api from "../api/crudApi";
import { converLinks } from "../helpers/converLinks";
import Swal from "sweetalert2";
import { onLoadLinksUser } from "../store/links/linkUserLink";




export const useLinksStore = () => {
   
    const dispath = useDispatch()

    const { eventsLink,activeEvent } = useSelector( state => state.link );
    const { user } = useSelector( state => state.auth );

    const setActiveLinks = (linkEvent) => {
        dispath(onSetActiveLinks(linkEvent) )
    }




    const startSavingLink = async (linkEvent) => {

      try {
        
        if ( linkEvent.id ) {
        // si el linkEvent tiene el id significa que se esta ctualizadno
      // de lo contrario estaria creando
          const { data } = await Api.put(`/links/${ linkEvent.id }`, linkEvent)
             // actualizando
             dispath( onUpdateLinks( {...linkEvent, user} ) )
          
          return
         
        }
          // creando
  
          const { data } = await Api.post('/links', linkEvent )
           
          dispath ( onAddNewEvent({...linkEvent, id: data.evento.id, user })) 
        // }

      } catch (error) {
          console.log(error);
          Swal.fire('Error to save',error.response.data.msg, 'error' )
      }

    }


    const startDeletingLink = async () => {
      try {
           await Api.delete(`/links/${activeEvent.id}` )
           dispath( onDeleteLinks())

      } catch (error) {
          console.log(error);
          Swal.fire('Error to delete',error.response.data.msg, 'error' )
      }
       
    }

    // LOAD DATA
    const startLoadingLinks = async () => {
        try {

          const { data } = await Api.get('links')
          //  console.log(data);
          // si vamos a modificar la fecha podemos agregar esta linea de lo contrario
          // no
          // const links = converLinks(data.eventos)
          // console.log(links);
          dispath(onLoadLinks(data.eventos))

        } catch (error) {
          console.log(error);
            console.log('Error loading links');
        }
    }

    const getLinks = async () => {
      const { data } = await Api.get('links')
        // console.log(data);
        let nL = []
         data.eventos.map( u => {
          if ( u.user._id === user.uid ) {
              nL.push(u)
          }
        })
        // console.log( nL );
         dispath(onLoadLinksUser(nL))
    }
   

  return {

    // propiedades
   eventsLink,
   activeEvent,
  //  si activeEvent es null va regresar falso pero si tiene un objecto regresar true, por eso los !!
   hasEventSelected: !!activeEvent,

// metodos
  setActiveLinks,
  startSavingLink,
  startDeletingLink,
  startLoadingLinks,

  getLinks

  }
  
  
}
