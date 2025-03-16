import React from 'react'
import { useSelector } from 'react-redux';

function WorkSpace3() {
  const userName = useSelector(state => state.userData.user);
  return (
    <div>
        <div className=' flex flex-col items-center'>
            <h1>Hi {userName}! You are welcomed to Workspace3.</h1>
        </div>
    </div>
  )
}

export default WorkSpace3