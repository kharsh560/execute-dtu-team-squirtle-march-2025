import React, { useState } from 'react'

function ProgressBar({width}) {
    console.log(width);
  return (
    <div className=' flex flex-col'>
        <h1>ProgressBar</h1>
        {/* <div className='flex w-80'>
            <div className={`bg-green-500 transition-width duration-200 ${ width == 100 ? "rounded-full" : "rounded-l-full"} `} style={{width:`${width}%`}}> <p className=' text-white text-end p-1 text-sm'> {width}% </p> </div>
            <div className={`bg-white transition-width duration-200 ${ width == 0 ? "rounded-full" : "rounded-r-full"} `} style={{width:`${100-width}%`}}></div>
        </div> */}
        <div className=' outer border-2 border-white w-[500px] rounded-xl  border-solid overflow-hidden  '>
            <div className={`bg-green-400 p-1 overflow-hidden transition-all duration-150  text-end ${ width == 100 ? "rounded-[10px]" : "rounded-none"}`} style={{transform: `translateX(-${100-width}%)`, }} >{width}% </div> 
            {/* inner + padding = outer + borderWidth */}
        </div>
    </div>

  )
}

export default ProgressBar