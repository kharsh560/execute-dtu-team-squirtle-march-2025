import { useState } from 'react'
import { useSelector } from 'react-redux'

function App() {
  const [counter, setCounter]  = useState(15)

  const addValue = () => {
    // setCounter(prevCounter => prevCounter + 1);
    // console.log(counter); 
    // Stale value issue because of JS's Closure!!! In simple terms

    setCounter(prevCounter => prevCounter + 1)
    setCounter(prevCounter => prevCounter + 1)
    setCounter(prevCounter => prevCounter + 1)
    setCounter(prevCounter => prevCounter + 1)
    console.log(counter);
  }
  const subtractValue = () => {
    setCounter(prevCounter => prevCounter - 1);
    console.log(counter);
  }

  const userName = useSelector(state => state.userData.user);

  return (
    <>
    <div className=' flex flex-col items-center'>
      <h1>Hi {userName}! You are welcomed to MachineCoding's home page.</h1>
      <h1>If you want to change the username, head towards "user" in the navbar!</h1>
      <h1>Exploring the concept of closures in react that's affecting useEffect and useState!</h1>
      <h2>Counter value: {counter}</h2>
      <div className=' flex gap-2 p-3'>
        <button className=' bg-amber-600 active:bg-amber-800 active:scale-90 rounded-xl p-1 cursor-pointer' onClick={addValue}> Add value {counter}</button> 
        <button className=' bg-amber-600 active:bg-amber-800 active:scale-90 rounded-xl p-1 cursor-pointer' onClick={subtractValue}>subtract value {counter}</button>
      </div>
    </div>

    {/* <div className='p-2'>
      <h2>Pages: </h2>
      <div className='mt-2 flex gap-2'>
        <button className=' bg-amber-600 active:bg-amber-800 active:scale-90 rounded-xl p-1 cursor-pointer' > WorkSpace1 </button> 
        <button className=' bg-amber-600 active:bg-amber-800 active:scale-90 rounded-xl p-1 cursor-pointer' > WorkSpace2 </button>
        <button className=' bg-amber-600 active:bg-amber-800 active:scale-90 rounded-xl p-1 cursor-pointer' > WorkSpace3 </button>
      </div>
    </div> */}
    </>
  )
}

export default App
