import React from 'react'
import { Outlet } from 'react-router'
function DashboardLayout() {
  return (
    <>
    <h1>admin page</h1>
    <Outlet/>
   
    </>
  )
}

export default DashboardLayout