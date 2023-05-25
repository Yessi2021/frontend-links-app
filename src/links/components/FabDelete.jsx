import { useLinksStore, useUiStore } from "../../hooks"


export const FabDelete = () => {

  //  const { openDateModal } = useUiStore()
   const { startDeletingLink, hasEventSelected } = useLinksStore()

   const handleDelete = () => {
    startDeletingLink();
   }
   

  return (
    <>
        <button className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{ display: hasEventSelected ? '' : 'none' }}
        >
            <i className="fas fa-trash-alt"></i>
          
        </button>
    </>
  )
}
