import React, {useState, useRef, useEffect, useContext} from 'react'
import axios from '../../api/axios';
import background from '../../assets/Images/background.png'
import {
    Link,
    useNavigate
  } from "react-router-dom";
import AuthContext from '../../context/AuthProvider';
import Bars from 'react-loading-icons/dist/esm/components/bars';

import { isAuthenticatedUser } from '../../authService/authService';

import { authenticate } from '../../authService/authService';

const Login = () => {
  const {setAuth} = useContext(AuthContext);
  const firstInputBoxRef = useRef();

  const [email, updateEmail] = useState(null);
  const [password, updatePassword] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    firstInputBoxRef.current.focus();
  }, [])

  const checkPattern = (pattern , str) => {
    let search = str.search(pattern);
    return search;
  }

  const onButtonClick = (e) => {
    // let emailPattern = /^([a-z_A-Z]+)([0-9]*)(\.?)([0-9]*)(\@)([a-z_A-Z]+)(\.)([a-z_A-Z]+)(\.?)([a-z_A-Z]*)$/;

    // let emailSearch = checkPattern(emailPattern, email)
    let emailSearch = 0;
    e.preventDefault();
    if(email !== '' && password !== '' && emailSearch === 0){
      postData();
    }else{
      setErrMsg("Invalid User")
    }

    // if(password.length < 8){
    //     setErrMsg('Passwords must be at least of 8 characters');
    // }
    // if(password.length > 24){
    //     setErrMsg('Passwords must be at most of 8 characters');
    // }
  }

  const postData = async () => {
      setErrMsg('');
      setIsButtonLoading(true);
      const formData = {
          email : email,
          password : password,
      }

      try{
          const response = await axios.post("/admin/signIn", 
              JSON.stringify(formData), 
              {
                  headers : {'Content-Type' : 'application/json'},
                  withCredentials : true
              }
          );
          const data = await response.data;
          console.log(data);

          if(data === 'success'){
            navigate('/dashboard/admin');
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
          }
          else setErrMsg(data);
          // if(data.role === 'student'){
          //   localStorage.setItem("studentStatus", 1);
          //   navigate('/dashboard/student')
          // }else if(data.role === 'teacher'){
          //   localStorage.setItem("teacherStatus", 1);
          //   navigate('/dashboard/teacher')
          // }else{
          //   setErrMsg(data.message);
          // }
          setIsButtonLoading(false);
          // navigate('/dashboard/student');
      }catch(error){
          if (!error?.response){
              setErrMsg('No Server Response');
          }else if (error.response?.status === 400){
              setErrMsg('Missing Email or Password');
          }else if (error.response?.status === 401) {
              setErrMsg('Unauthorized');
          }else {
              setErrMsg('Login Failed');
          }
          setIsButtonLoading(false);
      }
  }

  useEffect(() => {
    if(localStorage.getItem("email") && localStorage.getItem("password")){
      let email = localStorage.getItem("email");
      let password = localStorage.getItem("token");
      setAuth({email,password});
      authenticate();
      navigate("/dashboard/admin")
    }

    if(!isAuthenticatedUser()) navigate('/');
  },[])


    
  return (
    <div class='bg-cover bg-center bg-no-repeat bg-fixed md:h-screen md:w-screen md:flex md:justify-center md:items-center' style={{backgroundImage : `url(${background})`}}>
      <div class='h-screen w-screen bg-discordBlack text-discordWhite py-10 px-6  md:h-auto md:w-1/3'>
        <h1 class='text-center text-2xl'>Welcome Admin!</h1>
        <h2 class='mb-4 text-center text-lg'>Glad to see you again</h2>
        {(errMsg)?<p class='my-3 text-center text-red-500'>{errMsg}</p>:<p class='my-3 text-center text-red-500 invisible'>this is something</p>}
        <p class='uppercase hidden md:block'>Username</p>
        <input type="text" class='bg-discordDarkBlack w-full placeholder:uppercase mb-3 p-2 outline-none md:placeholder:opacity-0' required placeholder='email' onChange={(el) => {updateEmail(el.target.value); setErrMsg('');}}  ref={firstInputBoxRef}></input>
        <p class='uppercase hidden md:block'>Password</p>
        <input type="password" class='bg-discordDarkBlack w-full placeholder:uppercase mb-3 p-2 outline-none md:placeholder:opacity-0' required placeholder='password' onChange={(el) => {updatePassword(el.target.value); setErrMsg('');}}></input>
        {/* <p class='mb-4'>Not a user, <span class='text-discordBlue underline'><Link to="/signup">Sign Up</Link></span></p> */}
        <button class='bg-discordBlue text-discordWhite border-discordBlue rounded-none w-full p-2 flex justify-center h-10' onClick={onButtonClick}>{(isButtonLoading)?<Bars class='w-5 h-5' style={{width : '20px', height:'20px'}} />:"Login"}</button>
      </div>
    </div>
  )
}

export default Login
