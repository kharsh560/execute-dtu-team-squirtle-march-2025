import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Home.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import User from './pages/user/User.jsx'
import { Provider } from 'react-redux'
import { store } from './appStore/store/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path='' element={<App />} />
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
