import React, { useEffect, useState } from 'react'
 import { useDispatch, useSelector } from 'react-redux';
 import { Link, useNavigate, useParams } from 'react-router-dom'
 import { login } from '../../appStore/storeFeatures/authSlice';
 import { useNotification } from '../../utils/NotificationProvider';
 
 
 function SignIn() {
     const { showNotification } = useNotification();
     const darkMode = useSelector((state) => state.themeSlice.darkMode);
     const {userId} = useParams();
     const dispatch = useDispatch();
     // const userName = useSelector(state => state.userData.user);
   const [email, setEmail] = useState(null);
   const [password, setPassword] = useState(null);
   const navigate = useNavigate();
    
 
   const submitHandler = async (e) => {
     e.preventDefault();
 
     // console.log(email);
     // console.log(password);
 
     try {
       const response = await fetch(
         "http://localhost:5600/api/v1/user/signin",
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           credentials: "include", // Required for cookies in cross-origin requests
           body: JSON.stringify({
             email,
             password,
           }),
         }
       );
 
       if (!response.ok) {
         // response.json().then((jsonRes) => {
         //   console.log("errorMessage: ", jsonRes.error);
         //   showNotification("error", jsonRes.error);
         // })
         // return;
         const jsonResponse = await response.json();
         showNotification("error", jsonResponse.error);
         return;
         // console.log("I'm here");
         // console.log(jsonResponse);
         // const errorMessage = jsonResponse.error;
         // console.log("errorMessage: ", errorMessage);
         // throw new Error("Failed to sign in");
       }
 
       const jsonResponse = await response.json();
 
       if (jsonResponse) {
         dispatch(login(jsonResponse.user));
       }
 
       console.log("Sign-in successful:", jsonResponse.user);
       showNotification(
         "success",
         `Hello! Welcome back ${jsonResponse?.user?.name}!`
       );
       navigate("/");
     } catch (error) {
       // showNotification("error", error.message);
       showNotification("error", "Something went wrong! Please try again!");
       console.error("Error signing in:", error);
     }
   };
 
   return (
     <div className={`flex h-full flex-col items-center justify-center`}>
       <div className={`mx-auto w-full max-w-lg rounded-xl p-10  shadow-lg border  ${darkMode ? 'bg-black border-gray-800 text-white ' : 'bg-white border-gray-200 '}`}>
         <h2 className="text-center text-3xl font-semibold ">
           Log in to your account
         </h2>
         <p className="mt-2 text-center text-sm">
           Don&apos;t have an account?&nbsp;
           <Link
             to="/signup"
             className="font-medium text-blue-600 hover:underline"
           >
             Sign Up
           </Link>
         </p>
         <form className="mt-6">
           <div className="space-y-4">
             <div>
               <label
                 htmlFor="email"
                 className="block text-sm font-medium"
               >
                 Email
               </label>
               <input
                 id="email"
                 type="email"
                 placeholder="Enter your email"
                 onChange={(e) => setEmail(e.target.value)}
                 className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
               />
             </div>
             <div>
               <label
                 htmlFor="password"
                 className="block text-sm font-medium"
               >
                 Password
               </label>
               <input
                 id="password"
                 type="password"
                 placeholder="Enter your password"
                 onChange={(e) => setPassword(e.target.value)}
                 className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
               />
             </div>
             <button
               type="submit"
               onClick={submitHandler}
               className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
             >
               Sign In
             </button>
             <p className="mt-2 text-center text-sm text-gray-600">
               Don&apos;t want to sign in? &nbsp;
               <Link
                 to="/"
                 className="font-medium text-blue-600 hover:underline"
               >
                 Go back to Home
               </Link>
             </p>
           </div>
         </form>
       </div>
     </div>
   );
 }
 
 export default SignIn