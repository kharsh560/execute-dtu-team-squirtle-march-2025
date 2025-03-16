import React from 'react'
import Header from './pages/header/Header'
import Footor from './pages/footer/Footor'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className=' bg-black text-blue-50 flex-grow'>
        <Outlet />
      </div>
      <Footor />
    </div>
  )
}

export default Layout