import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';
import { LinkPage, MyOwnLinks } from '../links';
import { MapView } from '../maps/MapView';
import { RegisterPage } from '../auth/pages/RegisterPage';




export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore()

    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

    useEffect(()=> {
        checkAuthToken()
    },[])

  if ( status === 'checking' ) {
        return (
            <h1> Loading... </h1>
        )
  }



    return (
        <Routes>
            
            {
                ( status === 'not-authenticated')  
                    ? ( 
                        <> 
                    <Route path="/auth/*" element={ <LoginPage /> } />
                    < Route path='/auth/register*' element={ <RegisterPage/> } />
                    <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                  
                        </>

                    )
                    : ( 
                        <>
                            <Route path="/" element={ <LinkPage /> } />
                            <Route path="/links*" element={ <MyOwnLinks/> }  />
                              <Route path="/*" element={ <Navigate to="/" /> } />
                           
                        </>
                     )
            }
    
       
        </Routes>
    )
}
