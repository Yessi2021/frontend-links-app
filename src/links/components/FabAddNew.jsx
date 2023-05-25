
import { useLinksStore, useUiStore } from "../../hooks"


export const FabAddNew = () => {

   const { openDateModal } = useUiStore()
   const { setActiveLinks } = useLinksStore()


   const handleClickNew = () => {

    setActiveLinks({
      
        title:'',
        notes:'',
        user: {
          _id:1234,
          name: "Alexander"
        }
    })

        openDateModal()
       
   }
   

  return (
    <>
        <button className="btn btn-success fab"
        onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>
          
        </button>
    </>
  )
}
