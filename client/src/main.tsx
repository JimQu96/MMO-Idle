import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Login from './components/Login/Login.tsx'
import Home from './pages/Home/index.tsx'
import RoleSelect from './components/RoleSelect/RoleSelect.tsx'
import TestSignalR from './components/testSignalR/testSignalR'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // 默认子路由
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/roleSelect",
        element: <RoleSelect />,
      },
      {
        path: "/testSignalR", 
        element: <TestSignalR />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
