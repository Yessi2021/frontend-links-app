import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';




const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const RegisterPage = () => {

  const {  errorMesage, startRegister } =  useAuthStore()



   const { registerName, registerEmail, registerPassword,registerPassword2, onInputChange:onRegisterInputChane } = useForm( registerFormFields )


   const registerSubmit = (event) => {
    event.preventDefault()

    if ( registerPassword !== registerPassword2 ) {
        Swal.fire("Error in register", "Password are differents", 'error'  )
            return  
    }

    
    startRegister({ name: registerName,email: registerEmail,password: registerPassword } )
}


useEffect(()=>{

    if ( errorMesage !== undefined ) {
        Swal.fire('Error in the autentication', errorMesage, 'error' )
    }

},[errorMesage])

    return (
        <div className="container login-container">
            <div className="row">
               
                <div className="login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={ registerSubmit } >
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"

                                name='registerName'
                                value={ registerName }
                                onChange={ onRegisterInputChane }

                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name='registerEmail'
                                value={ registerEmail }
                                onChange={ onRegisterInputChane }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 

                                name='registerPassword'
                                value={ registerPassword }
                                onChange={ onRegisterInputChane }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat the password" 

                                name='registerPassword2'
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChane }

                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create account" />
                        </div>
                    </form>
                    <Link style={{color:'#fff'}} to='/auth/' > Login </Link>
                </div>
            </div>
        </div>
    )
}