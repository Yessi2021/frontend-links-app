import { useMemo, useState } from "react";
import Modal from "react-modal"
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from "sweetalert2"

import "../../style.css"
import { useUiStore } from "../../hooks/useUiStore";
import { useEffect } from "react";
import { useLinksStore } from "../../hooks";
import { useNavigate } from "react-router-dom";



export const LinksModal = () => {

   

    // const [isModalOpen, setIsModalOpen] = useState(false)
    const [formSubmited, setFormSubmited] = useState(false)
    const [formValues, setFormValues] = useState({
        title: '',
        notes: ''
    })

    const { activeEvent, startSavingLink } = useLinksStore()

   const {  isModalOpen, onCloseDateMoal } = useUiStore()

    const titleClass = useMemo(()=>{
        if ( !formSubmited ) return ''

        return ( formValues.title.length > 0 )
                ? 'is-valid'
                : 'is-invalid'

    },[formValues.title, formSubmited])

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

      useEffect(() => {

        if ( activeEvent !== null ){
            setFormValues({...activeEvent})
        }
 
      }, [ activeEvent ])
      

      Modal.setAppElement('#root');

      const onCloseModal = () => {
        onCloseDateMoal()
      }

      const onInputChanged = ({target}) => {
            setFormValues({
                ...formValues,
                [target.name]: target.value
            })
      }

      const onSubmit = async (event) => {
            event.preventDefault();
            setFormSubmited(true)
            if (  formValues.title.length <= 0 )  return

            // console.log( formValues );

            // TODO
            // close modal
           await startSavingLink(formValues)
            onCloseDateMoal()
            setFormSubmited(false)

           
           
      }

  return (
  <>
  
      <Modal 
    isOpen={ isModalOpen }
    onRequestClose={onCloseModal}
    style={customStyles}
    className="modal"
    overlayClassName="modal-fondo"
    closeTimeoutMS={200}
    
    >

<h1> New link event </h1>
<hr />
<form className="container" onSubmit={ onSubmit } >

  
    <hr />
    <div className="form-group mb-2">
        <label>Title or Note</label>
        <input 
            type="text" 
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ formValues.title }
            onChange={ onInputChanged }
        />
        <small id="emailHelp" className="form-text text-muted">paste your note or link</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="url" 
            className="form-control"
            placeholder="Enter your url note"
            rows="5"
            name="notes"
            value={ formValues.notes }
            onChange={ onInputChanged }
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Information about it</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span>Save</span>
    </button>

</form>

    </Modal>
  </>
  )
}
