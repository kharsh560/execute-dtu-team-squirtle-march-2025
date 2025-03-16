import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import ProgressBar from './ProgressBar';

function WorkSpace1() {
    const userName = useSelector(state => state.userData.user);
    const [width, setWidth] = useState(0);
    const [text, setText] = useState("");
    const textAreaRef = useRef(null);

    useEffect(() => {
      if (text.length > 100) {
        if (textAreaRef) {
          // console.log(textAreaRef.current);
          // inputRef.current.setAttribute("disabled", "true"); 
          setText(textAreaRef.current.value);
        }
        return;
      } 
      setWidth(text.length);
    }, [text]);
    // const reactToTextTyping = (e) => {
      // if (text.length > 100) return;
      // setText(e.target.value);
      // setWidth(text.length);
    // }

  return (
    <div>
        <div className=' flex flex-col items-center'>
            <h1>Hi {userName}! You are welcomed to Workspace1.</h1>
            <input ref={textAreaRef} type='text' className=' bg-amber-50 rounded-xl text-black p-1' value={text} 
            onChange={(e) => {
              if (text.length >= 100) return; // Note: I have to put "=" bcoz of compulsion!
              setText(e.target.value);
            }} />
            <ProgressBar width={width} />
            <button className=' mt-2 bg-amber-600 active:bg-amber-800 active:scale-90 rounded-xl p-1 cursor-pointer' 
            onClick={() => {
              setWidth(0);
              setText("");
            }}>reset</button>
        </div>
    </div>
  )
}

export default WorkSpace1