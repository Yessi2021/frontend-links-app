import React from 'react'
import { useAuthStore } from '../../hooks'
import { NavLink } from "react-router-dom"

export const Navbar = () => {

   
const getLinks = () => {
  
//    setTimeout(() => {
//     location.assign(location.href);
//    }, 500);
}

 const { startLogout, user } = useAuthStore()

  return (
    <div  className='navbar navbar-dark bg-dark mb-4 px-4' >
        <span className='navbar-brand' >
            <i className="fa fa-address-book"></i>
            &nbsp;
           { user.name }
        </span>
        <button className='btn btn-success'
        onClick={ getLinks }
        >
        <NavLink  to="/links" style={{textDecoration:"none", color:"white"}} >
            <i className="fa fa-id-card" aria-hidden="true"></i>
            &nbsp;
            <span>
                my Links
            </span>
            </NavLink>

            

       
        </button>
        <button className='btn btn-danger' 
         onClick={ startLogout }
        >
            <i className="fas fa-sign-out-alt"></i>
            <span>
                Logout
            </span>
        </button>
    </div>
  )
}
