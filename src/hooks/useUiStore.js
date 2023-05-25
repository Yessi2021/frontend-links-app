import { useDispatch, useSelector } from "react-redux"
import { onOpenModal, onCloseModal  } from "../store/"


export const useUiStore = () => {

   const dispath = useDispatch()

  const { isModalOpen } =  useSelector(  state => state.ui)

  const openDateModal = () =>{
        dispath( onOpenModal() )
  }

  const onCloseDateMoal = () => {
        dispath(onCloseModal())
  }

  const toggleModal = () => {
    ( isModalOpen )
    ? openDateModal()
    : onCloseDateMoal()
  }



  return {
    // propiedades
    isModalOpen,

    // metodos
    openDateModal,
    onCloseDateMoal,
    toggleModal
  }

}