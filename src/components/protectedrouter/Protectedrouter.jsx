import React from 'react'
import { Navigate } from 'react-router';

export default function Protectedrouter({children}) {
    const token =localStorage.getItem("userToken");
    if(!token){
        return <Navigate to ={'/login'}/>
    }
  return children ;
  
}
