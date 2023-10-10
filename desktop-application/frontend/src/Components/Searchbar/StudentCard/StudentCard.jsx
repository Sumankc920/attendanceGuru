import React, {useState, useRef, useEffect, useContext} from 'react'
import axios from '../../../api/axios';
import {
    Link,
    useNavigate
  } from "react-router-dom";
import Bars from 'react-loading-icons/dist/esm/components/bars';

const StudentCard = (props) => {
  const firstInputBoxRef = useRef();

  const [email, updateEmail] = useState('');
  const [roll, updateRoll] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const navigate = useNavigate();

  const onAddClassroomClicked = async () => {
    const formData = {
      email : email,
      roll : roll,
      user_role : 'Student',
      semester : props.semester,
      shift : props.shift,
    }
    // const formData = {
    //   email : "subash@ncit.edu.np",
    //   roll : 191640,
    //   user_role : "Student",
    //   semester : 6,
    //   shift : "M"
    // }
    setIsButtonLoading(true);
    try{
      const response = await axios.post("/admin/add_student", 
        JSON.stringify(formData), 
        {
            headers : {'Content-Type' : 'application/json'},
            withCredentials : true
        }
      );
      const data = await response.data;
      console.log(data);
      setIsButtonLoading(false);
      if(data == "New Student Added"){
        props.off(false);
      }else{
        props.off(true);
        setErrMsg(data);
      }
      
    }catch(error){
      setIsButtonLoading(false);
      setErrMsg("Unable to add");
    }
  }


  useEffect(() => {
    // firstInputBoxRef.current.focus();
    console.log(email,roll);
    console.log(props.shift, props.semester)
  }, [email, roll])

  const checkPattern = (pattern , str) => {
    let search = str.search(pattern);
    return search;
  }

  const onButtonClick = (e) => {
    e.preventDefault();
    if(email !== '' && roll !== '' && props.shift !== '' && props.semester !== ''){
      onAddClassroomClicked();
    }else{
      setErrMsg("Input Box should not be empty")
    }
  }

  // const postData = async () => {
  //     setErrMsg('');
  //     setIsButtonLoading(true);
  //     const formData = {
  //         subject : subject,
  //         teacher : teacher,
  //         students : students,
  //     }

  //     try{
  //         const response = await axios.post("/signIn", 
  //             JSON.stringify(formData), 
  //             {
  //                 headers : {'Content-Type' : 'application/json'},
  //                 withCredentials : true
  //             }
  //         );
  //         const data = await response.data;
  //         console.log(data);
  //         if(data.role === 'student'){
  //           localStorage.setItem("studentStatus", 1);
  //           navigate('/dashboard/student')
  //         }else if(data.role === 'teacher'){
  //           localStorage.setItem("teacherStatus", 1);
  //           navigate('/dashboard/teacher')
  //         }else{
  //           setErrMsg(data.message);
  //         }
  //         setIsButtonLoading(false);
  //         // navigate('/dashboard/student');
  //     }catch(error){
  //         if (!error?.response){
  //             setErrMsg('No Server Response');
  //         }else if (error.response?.status === 400){
  //             setErrMsg('Missing Email or Password');
  //         }else if (error.response?.status === 401) {
  //             setErrMsg('Unauthorized');
  //         }else {
  //             setErrMsg('Login Failed');
  //         }
  //         setIsButtonLoading(false);
  //     }
  // }


    
  return (
      <div class='h-screen w-screen bg-discordBlack text-discordWhite py-10 px-6  md:h-auto md:w-1/3 shadow-md shadow-discordBlack absolute top-40'>
        <h1 class='text-center text-2xl'>Add Student</h1>
        {(errMsg)?<p class='my-3 text-center text-red-500'>{errMsg}</p>:<p class='my-3 text-center text-red-500 invisible'>this is something</p>}
        <p class='uppercase hidden md:block'>Email</p>
        <input type="email" class='bg-discordDarkBlack w-full placeholder:uppercase mb-3 p-2 outline-none md:placeholder:opacity-0' required placeholder='email' onChange={(el) => {updateEmail(el.target.value); setErrMsg('');}}  ref={firstInputBoxRef}></input>
        <p class='uppercase hidden md:block'>Roll</p>
        <input type="text" class='bg-discordDarkBlack w-full placeholder:uppercase mb-3 p-2 outline-none md:placeholder:opacity-0' required placeholder='roll' onChange={(el) => {updateRoll(el.target.value); setErrMsg('');}}></input>
        {/* <p class='mb-4'>Not a user, <span class='text-discordBlue underline'><Link to="/signup">Sign Up</Link></span></p> */}
        <button class='bg-discordBlue text-discordWhite border-discordBlue rounded-none w-full p-2 flex justify-center h-10' onClick={onButtonClick}>{(isButtonLoading)?<Bars class='w-5 h-5' style={{width : '20px', height:'20px'}} />:"Add"}</button>
      </div>
  )
}

export default StudentCard
