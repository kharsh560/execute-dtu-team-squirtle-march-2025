import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Home.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import WorkSpace1 from './pages/workspace1/WorkSpace1.jsx'
import WorkSpace2 from './pages/workspace2/WorkSpace2.jsx'
import WorkSpace3 from './pages/workspace3/WorkSpace3.jsx'
import User from './pages/user/User.jsx'
import { Provider } from 'react-redux'
import { store } from './appStore/store/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path='' element={<App />} />
      <Route path='workspace1' element={<WorkSpace1 />} />
      <Route path='workspace2' element={<WorkSpace2 />} />
      <Route path='workspace3' element={<WorkSpace3 />} />
      <Route path='user' element={<User />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
)
