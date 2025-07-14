import React, { useState , useEffect } from 'react'
import axios from 'axios';

function useFetch(url) {
    
        const[data,setData]=useState([]);
        const[isLoader,setIsLoader]=useState(true);
        const[error,setErrror]=useState(null);
        const getData= async ()=>{
            try{
                const response=await axios.get(url);
            setData(response.data);
            }
            catch(error){
                setErrror(error)
    
            }
            finally{
                setIsLoader(false)
            }
        }
        useEffect( ()=> 
        {getData() ; }
         ,[] )
  return {data,isLoader,error}
}

export default useFetch