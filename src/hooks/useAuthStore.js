import { useDispatch, useSelector } from "react-redux"


import Api from "../api/crudApi"
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutLink } from "../store"



export const useAuthStore = () => {
  
    const { status, user, errorMesage } = useSelector( state => state.auth )


   const dispath = useDispatch()

//    START LOGIN
   const startLogin = async ({email,password}) => {

    // console.log({email,password});
    dispath( onChecking() )

    try {
      
        const {data} = await Api.post('auth',{email,password})
        // console.log({resp});
        // vamos a guardar el token en el localstorage
        localStorage.setItem('token',data.token)
        // para saber cuando vence el token
        localStorage.setItem('token-init-date', new Date().getTime())

        // el payload que recibe es el usuario
        dispath( onLogin( {name:data.name, uid:data.uid} ))
        
    } catch (error) {
            console.log({error});
            dispath( onLogout("Credenciales incorrectas") )

            setTimeout(() => { 
                // limpiar el error
                dispath( clearErrorMessage())
            }, 100);
         }

    }



    // START REGISTER

    const startRegister = async ({email,password, name}) => {

        // console.log({email,password});
        dispath( onChecking() )
    
        try {
          
            const {data} = await Api.post('auth/new',{email,password, name})
            // console.log({resp});
            // vamos a guardar el token en el localstorage
            localStorage.setItem('token',data.token)
            // para saber cuando vence el token
            localStorage.setItem('token-init-date', new Date().getTime())
    
            // el payload que recibe es el usuario
            dispath( onLogin( {name:data.name, uid:data.uid} ))
            
        } catch (error) {
                console.log({error});
                dispath( onLogout( error.response.data?.msg || "---" ) )
    
                setTimeout(() => { 
                    // limpiar el error
                    dispath( clearErrorMessage())
                }, 100);
             }
    
        }



        // VERIFICAR QUE YA ESTA AUTENTICADO CON EL TOKEN

        const checkAuthToken = async () => {
            const token = localStorage.getItem('token');
            // la sacamos del login si ya expiro el token
            if (!token) return dispath( onLogout())

            try {

                const { data } = await Api.get('auth/renew')
                // vamos a establecer el nuevo token
                // console.log({data});
                localStorage.setItem('token',data.token)
                // nueva fecha de creacion  
                localStorage.setItem('token-init-date', new Date().getTime())
                dispath( onLogin( {name:data.name, uid:data.uid} ))
                
            } catch (error) {
                localStorage.clear()
              
                dispath(onLogout())
                
            }
                
        }

        // CERRRAR SESION

        const startLogout = () => {
            localStorage.clear()
            dispath( onLogout())
            dispath(onLogoutLink() )
        }
    

    return {
        status,
         user,
          errorMesage,

        //autenticacion
          startLogin,
          startRegister,
          checkAuthToken,
          startLogout
    }

}
