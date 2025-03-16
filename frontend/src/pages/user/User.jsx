import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { login } from '../../appStore/storeFeatures/userSlice';


function User() {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const userName = useSelector(state => state.userData.user);
    console.log(userName);
    const [newUserName, setNewUserName] = useState("");

    const changeUserName = (e) => {
        // I have used form in here. And that's why I needed this preventDefault bcoz without it the page refreshes and as it refreshes, the redux data flushes away!
        e.preventDefault();
        // And why did I change "div" to "form"? So that, simple "enter/return" can be pressed to register submit automatically! Without needing extra workaround with "events"
        if (newUserName == "") return;
        dispatch(login(newUserName));
        setNewUserName("");
    }

  return (
    <div>
        <div className=' flex flex-col items-center'>
            <div>Welcome {userName}. Hope you are having a great day!</div>
            <form className=' flex flex-col w-fit items-center'>
                <label>Change the Username if you want.</label>
                <input className='m-1 p-1 max-w-60 text-black bg-amber-50' type='text' value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                <button onClick={(e) => changeUserName(e)} className=' mt-2 bg-amber-600 active:bg-amber-800 active:scale-90 rounded-xl p-1 cursor-pointer'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default User