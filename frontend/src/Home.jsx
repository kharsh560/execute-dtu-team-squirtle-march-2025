import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function App() {
  const userName = useSelector(state => state.userData.user);

  const [message, setMessage] = useState("");
  const [healthCheck, setHealthCheck] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5600/api/v1/healthcheck");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setHealthCheck(true);
        const data = await response.json();
        setMessage(data.message || JSON.stringify(data)); // Update state with response
      } catch (error) {
        console.error("Error fetching health check:", error);
        setMessage("Failed to fetch health check");
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className=' flex flex-col items-center'>
      <h1>Hello {userName}</h1>
      <h1 className=' text-3xl font-bold'>{message}</h1>
      {healthCheck ? (<h1>So, the <span className=' text-red-600'>CORS origin</span> error is <span className=' text-green-600'>resolved</span>. This app's frontend has been set to run on port <span className='text-amber-400'>3000</span>.</h1>) : ""}
      
    </div>
    </>
  )
}

export default App
