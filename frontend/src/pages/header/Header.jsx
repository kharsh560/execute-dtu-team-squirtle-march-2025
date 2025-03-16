import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className='bg-blue-200 font-bold  p-1 flex justify-between'>
        <div className='text-xl text-blue-700'>MachineCoding</div>
        <div>
            <NavLink to='/' className={({isActive}) => `rounded-xl p-1 cursor-pointer ${isActive ? "text-red-800" : "text-black"}`} > Home </NavLink> 
            <NavLink to='/workspace1' className={({isActive}) => `rounded-xl p-1 cursor-pointer ${isActive ? "text-red-800" : "text-black"}`} > WorkSpace1 </NavLink> 
            <NavLink to='/workspace2' className={({isActive}) => `rounded-xl p-1 cursor-pointer ${isActive ? "text-red-800" : "text-black"}`} > WorkSpace2 </NavLink>
            <NavLink to='/workspace3' className={({isActive}) => `rounded-xl p-1 cursor-pointer ${isActive ? "text-red-800" : "text-black"}`} > WorkSpace3 </NavLink>
            <NavLink to='/user' className={({isActive}) => `rounded-xl p-1 cursor-pointer ${isActive ? "text-red-800" : "text-black"}`} > User </NavLink>
        </div>
    </div>
  )
}

export default Header