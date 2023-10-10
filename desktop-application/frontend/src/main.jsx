import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Pages/ErrorPage/ErrorPage.jsx';
import Login from './Pages/Login/Login.jsx';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';

import { AuthProvider } from './context/AuthProvider';


const router = createBrowserRouter([
  {
    path : "/",
    element : <Login />
  },
  {
    path : '/login',
    element : <Login />,
  },
  {
    path : '/dashboard/admin',
    element :  <AdminDashboard />
  },
  {
    path : "*",
    element : <ErrorPage />,
    errorElement : <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
