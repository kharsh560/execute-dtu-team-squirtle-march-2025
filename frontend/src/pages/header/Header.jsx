import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className='bg-blue-200 font-bold  p-1 flex justify-between'>
        <div className='text-xl text-blue-700'>MachineCoding</div>
        <div>
            <NavLink to='/' className={({isActive}) => `rounded-xl p-1 cursor-pointer ${isActive ? "text-red-800" : "text-black"}`} > Home </NavLink> 
            <NavLink to='/user' className={({isActive}) => `rounded-xl p-1 cursor-pointer ${isActive ? "text-red-800" : "text-black"}`} > Log In </NavLink>
        </div>
    </div>
  )
}

export default Header