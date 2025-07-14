import React from 'react'
import {Button} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import Category from '../../components/category/Category.jsx'
import Products from '../../components/products/Products.jsx'
import Loader from '../../components/shared/Loader.jsx';
function Home() {
  return (
    <>
     
  <Category/>
  <Products/>
  
    </>
  )
}

export default Home