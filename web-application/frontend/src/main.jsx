import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Pages/ErrorPage/ErrorPage.jsx';
import Signup from './Pages/Signup/Signup.jsx';
import Login from './Pages/Login/Login.jsx';
import Homepage from './Pages/Homepage/Homepage';
import StudentDashboard from './Pages/StudentDashboard/StudentDashboard';
import TeacherDashboard from './Pages/TeacherDashboard/TeacherDashboard';

import { AuthProvider } from './context/AuthProvider';
import Otp from './Pages/OTP/Otp';


const router = createBrowserRouter([
  {
    path : "/",
    element : <Signup />
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path : "/signup/otp-verification",
    element : <Otp />
  },
  {
    path : '/login',
    element : <Login />,
  },
  {
    path : '/dashboard/student',
    element :  <StudentDashboard />
  },
  {
    path : '/dashboard/teacher',
    element : <TeacherDashboard />
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
