import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router'
import { Container } from '@mui/material'
import { useLocation } from 'react-router-dom';

function MainLayout() {

  const location = useLocation();
const hiddenRoutes = ['/register'];
  const hideLayout = hiddenRoutes.includes(location.pathname);

  return (
   <>
     {!hideLayout && <Navbar />}
  {hideLayout ? <Outlet /> : <Container><Outlet /></Container>}
  {!hideLayout && <Footer />}

   </>
  )
}

export default MainLayout