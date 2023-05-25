import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

// const registerFormFields = {
//     registerName: '',
//     registerEmail: '',
//     registerPassword: '',
//     registerPassword2: ''
// }

export const LoginPage = () => {

  const { startLogin, errorMesage, startRegister } =  useAuthStore()

   const { loginEmail, loginPassword, onInputChange:onLoginInputChane } = useForm( loginFormFields )



   const loginSubmit = (event) => {
        event.preventDefault()
        // console.log( {loginEmail, loginPassword } );

        startLogin({email: loginEmail, password: loginPassword })

   }




useEffect(()=>{

    if ( errorMesage !== undefined ) {
        Swal.fire('Error in the autentication', errorMesage, 'error' )
    }

},[errorMesage])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={loginSubmit} >
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={ loginEmail }
                                onChange={ onLoginInputChane }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"

                                name='loginPassword'
                                value={ loginPassword }
                                onChange={ onLoginInputChane }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                   <Link to='/auth/register' > Register </Link>
                </div>
            </div>
        </div>
    )
}