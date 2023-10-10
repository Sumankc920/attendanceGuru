import React, {useState, useEffect, useContext} from 'react'
import SidebarItem from '../../Components/Searchbar/SidebarItem/SidebarItem'
import Searchbar from '../../Components/Searchbar/Searchbar/Searchbar'
import UserProfileSidebar from '../../Components/Searchbar/UserProfileSidebar/UserProfileSidebar'
import logo from '../../assets/Images/logo-handwritten.png'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Dashboard from '../DashboardPages/Dashboard/Dashboard'
import LineChartComp from '../../Components/Searchbar/LineChart/LineChart'
import SubjectPie from '../../Components/Searchbar/SubjectPie/SubjectPie'
import HomeIcon from '@mui/icons-material/Home'
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartComp from '../../Components/Searchbar/BarChart/BarChart'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SubjectInfoCard from '../../Components/SubjectInfoCard/SubjectInfoCard'
import Calendar from '../../Components/Searchbar/Calendar/Calendar'
import Bars from 'react-loading-icons/dist/esm/components/bars';


import './TeacherDashboard.css'
import TopAttendeesTable from '../../Components/Searchbar/TopAttendeesTable/TopAttendeesTable'

import { useNavigate } from 'react-router-dom'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'

import Toastify from '../../Components/Toastify/Toastify'
import Setting from '../DashboardPages/Setting/Setting'

import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import { isAuthenticatedUser } from '../../authService/authService'

import { authenticate } from '../../authService/authService';

import AuthContext from '../../context/AuthProvider'


const TeacherDashboard = () => {
  

  const {setAuth} = useContext(AuthContext);


  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token") && localStorage.getItem("email")  && localStorage.getItem("teacherStatus") == 1){
      let email = localStorage.getItem("email");
      let accessToken = localStorage.getItem("token");
      let roles = 'teacher';
      setAuth({email,roles,accessToken});
      authenticate();
    }
    if(!isAuthenticatedUser()) navigate('/login');
  },[])

  const [showMenu, setShowMenu] = useState(true);

  const [dashboardClicked, setDashboarClicked] = useState(true);
  const [classesClicked, setClassesClicked] = useState(false);
  const [calendarClicked, setCalendarClicked] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);
  const [settingClicked, setSettingClicked] = useState(false);

  const [subjectClick, setSubjectClick] = useState(false);
  const [notificationClick, onNotificationClick] = useState(false);

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [email, setEmail] = useState('');

  const [date, setDate] = useState('');

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [presentStudents, setPresentStudents] = useState([])
  const [absenetStudents, setAbsentStudents] = useState([])


  // const [profileClicked, setProfileClicked] = useState(false);

  const getSubjectsOnClassesClicked = async () => {
    setIsButtonLoading(true);
    try{
      const response = await axiosPrivate.get("/teacher/classes");
      const data = await response.data;
      setClasses([...data]);
      setIsButtonLoading(false);
    }catch(error){
      setIsButtonLoading(false);
    }
    
  }

  const onDashboardClicked = () => {
    setDashboarClicked(true);
    setClassesClicked(false);
    setCalendarClicked(false);
    setProfileClicked(false);
    setSettingClicked(false);
  }

  const onClassesClicked = () => {
    setDashboarClicked(false);
    setClassesClicked(true);
    setCalendarClicked(false);
    setProfileClicked(false);
    setSettingClicked(false);

    getSubjectsOnClassesClicked();
  }

  // const onCalendarClicked = () => {
  //   setDashboarClicked(false);
  //   setClassesClicked(false);
  //   setCalendarClicked(true);
  //   setProfileClicked(false);
  //   setSettingClicked(false);
  // }

  // const onProfileClicked = () => {
  //   setDashboarClicked(false);
  //   setClassesClicked(false);
  //   setCalendarClicked(false);
  //   setProfileClicked(true);
  //   setSettingClicked(false);
  // }

  const onSettingClicked = () => {
    setDashboarClicked(false);
    setClassesClicked(false);
    setCalendarClicked(false);
    setProfileClicked(false);
    setSettingClicked(true);
  }


  useEffect(() => {
    let teacherStatus = localStorage.getItem("student");
    // if(teacherStatus !== 1){
    //   navigate('/login');
    // }
    console.log("classes", classes)
    console.log(typeof(classes))
  },[classes])

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, [email])

  useEffect(() => {
    console.log("The date is " + date);
  }, [date])

  const getPresentStudents = async (sub_short, date, class_id) => {
    const formData = {
      sub_name : sub_short , 
      date :  date ,
      class_id : class_id
  }

  try{
      const response = await axiosPrivate.post("/teacher/get_attendance", 
      JSON.stringify(formData), 
      {
          headers : {'Content-Type' : 'application/json'},
          withCredentials : true
      });
      const data = await response.data;
      console.log("Present students",data);
      await setPresentStudents(data);
  }catch(error){
      console.log(error);
  }
  }

  const onClassBoxClicked = async (class_id) => {
    setSubjectClick(true);
    console.log("Class Id" + class_id);
    const response = await axiosPrivate.get("/teacher/classes/subject/" + class_id);
    const data = await response.data;
    console.log("subjects : ", data);
    setSubjects([data]);
    getPresentStudents(data.short_name, "2023-10-06", class_id);
  }

  const transparent = <div class=' w-full h-screen bg-gray-200 dark:bg-darkTransparent z-5 absolute' onClick={() => {
    setSubjectClick(false);
  }}></div>;

  let classBox = classes.map((item) => {
    return (
      <div key={item.class_id} class='cursor-pointer flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20' onClick={() => onClassBoxClicked(item.class_id)}>
        <h1 class='text-3xl text-discordBlue'>{item.faculty + " " +  item.semester + " " + item.shift}</h1>
      </div>
    )
  })

  let subjectInfoCard = (subjects.length>=1)?<SubjectInfoCard class='z-10' subjectName={subjects[0].name} date={setDate} present={presentStudents} />:null;

  if(!isAuthenticatedUser()) return null

  else return (
    <>
    {(notificationClick)?<Toastify notify={notificationClick} msg="Login Successful" />:null}
    <div class='hidden md:flex md:h-screen md:w-screen  md:justify-between md:overflow-hidden'>
      {/* Sidebar */}
      <div class='basis-1/6 dark:bg-darkLeftSidebar'>
        {/* Project Logo */}
        {/* <h1 class='text-2xl text-blue-500 mt-6'>NCIT</h1> */}
        <div class='flex justify-center py-6 px-2 items-center cursor-pointer space-x-2 '>
          <img alt='attendance guru logo' src={`${logo}`} class='w-50 h-50' />
        </div>
        <div>
          <SidebarItem muiIcon={<HomeIcon />} itemText='Dashboard' textSize='text-lg' onClick={onDashboardClicked} leftBorder={(dashboardClicked)?'border-r-4 border-r-discordBlue bg-gray-300':''} />
          <SidebarItem muiIcon={<SchoolIcon />} itemText='Classes' textSize='text-lg' onClick={onClassesClicked} leftBorder={(classesClicked)?'border-r-4 border-r-discordBlue bg-gray-300':''} />
          {/* <SidebarItem muiIcon={<PersonIcon />} itemText='Profile' textSize='text-lg' onClick={onProfileClicked} leftBorder={(profileClicked)?'border-r-4 border-r-discordBlue bg-gray-300':''} /> */}
          <SidebarItem muiIcon={<SettingsIcon />} itemText='Setting' textSize='text-lg' onClick={onSettingClicked} leftBorder={(settingClicked)?'border-r-4 border-r-discordBlue bg-gray-300':''} />
          {/* <div class='flex justify-center'>
            <button class='text-center border-2 p-1 border-discordBlue bg-discordBlue text-white hover:bg-white hover:text-discordBlue'>Log Out</button>
          </div> */}
        </div>
        

        {/* sidebar elements */}
        {/* Dashboard */}
      </div>


      {/* middle section */}
      <div class='basis-5/6 bg-gray-100 dark:bg-darkMiddlebar'>
        {/* Searchbar */}
        <div class='w-full flex  items-center py-4 bg-gray-300 dark:bg-darkMiddlebar  '>
            <Searchbar />
            <div class='relative'>
            <UserProfileSidebar profileClick={setProfileClicked} notificationClick={onNotificationClick} />
                {(profileClicked)?<ProfileCard onSettingClicked={onSettingClicked} profileClicked={setProfileClicked} email={email} />:null}
            </div>
        </div>
        
        {(dashboardClicked)?
        (<div class='h-full overflow-y-scroll mt-6 pb-32'><h1 class='text-2xl text-discordBlue text-center'>Dashboard</h1>

        <div class='my-6'>
          <h3 class='text-lg text-discordBlue text-center mb-1'>Class Attendance Performance</h3>
          <BarChartComp />
        </div>

        {/* Top Attendees List*/}
        <div>
          <div class='text-center flex justify-center space-x-2'>
            <div class='text-discordBlue'>
              <EmojiEventsIcon />
            </div>
            <h3 class='text-center text-lg text-discordBlue mb-4'>Top Attendees</h3>
          </div>
          {/* list of top attendees */}
          <div class='px-28 text-discordBlue'>
              <TopAttendeesTable />
          </div>
          
          
        </div></div>):null}

        {(classesClicked)?(
          <div class=' w-full h-full relative'>
          {(isButtonLoading && !classes)?<Bars class='w-5 h-5' stroke='#5765f2' fill='#5765f2' style={{width : '50px', height:'50px'}} />:(subjectClick)?<>{transparent}<div class='flex justify-center bg-black p-10'>{subjectInfoCard}</div></>:null}
          {(!subjectClick)?<><h1 class='text-center text-2xl text-discordBlue my-4 mb-8'>Classes</h1>
          <div class='flex w-full justify-center space-x-5 flex-wrap relative'>
            {/* <div class='cursor-pointer flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20' onClick={() => setSubjectClick(true)}>
              <h1 class='text-3xl text-discordBlue'>AINN</h1>
            </div>
            <div class='cursor-pointer flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <h1 class='text-3xl text-discordBlue'>WT</h1>
            </div>
            <div class='cursor-pointer flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <h1 class='text-3xl text-discordBlue'>PPL</h1>
            </div>
            <div class='cursor-pointer flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <h1 class='text-3xl text-discordBlue'>OOSD</h1>
            </div>
            <div class='cursor-pointer flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <h1 class='text-3xl text-discordBlue'>EE</h1>
            </div> */}
            {(isButtonLoading)?<Bars class='w-5 h-5' stroke='#5765f2' fill='#5765f2' style={{width : '50px', height:'50px'}} />:(classes)?classBox:null}
            
            
          </div></>:null}
        </div>
        ):null
        }

        {/* {(profileClicked)?(
          <h1>profile</h1>
        ):null
        }

        {(calendarClicked)?(
          <h1>calendar</h1>
        ):null
        } */}

        {(settingClicked)?(
          <div class='w-full h-full flex justify-center '><Setting notificationClick={onNotificationClick} /></div>
        ):null
        }

      </div>
    </div>



    {/* For smaller Device */}
    <div class='h-screen w-screen no-scrollbar md:hidden dark:bg-darkMiddlebar'>
      <div class='p-3 flex items-center justify-between'>
          {/* handwritten logo */} 
          <div class='w-40 cursor-pointer justify-self-start'>
            <img src={logo} alt='attendance guru logo' />
          </div>
          {/* hamburger icon */}
          <div class='text-discordBlue text-md justify-self-end dark:text-white' onClick={() => setShowMenu(!showMenu)}>
            {(showMenu)?<MenuIcon />:<CloseIcon />}
          </div>
      </div>

      {/* sidebar items */}
      {(!showMenu)?(<div>
        <SidebarItem itemText='Dashboard' textSize='text-lg' onClick={onDashboardClicked} leftBorder={(dashboardClicked)?'border-l-4 border-l-discordBlue bg-gray-100':''} />
        <SidebarItem itemText='Classes' textSize='text-lg' onClick={onClassesClicked} leftBorder={(classesClicked)?'border-l-4 border-l-discordBlue bg-gray-100':''} />
        {/* <SidebarItem itemText='Profile' textSize='text-lg' onClick={onProfileClicked} leftBorder={(profileClicked)?'border-l-4 border-l-discordBlue bg-gray-100':''} /> */}
        <SidebarItem itemText='Setting' textSize='text-lg' onClick={onSettingClicked} leftBorder={(settingClicked)?'border-l-4 border-l-discordBlue bg-gray-100':''} />
      </div>):null}

      {(showMenu && dashboardClicked)?(
        <div class='h-full overflow-y-scroll mt-6 pb-32'><h1 class='text-2xl text-discordBlue text-center'>Dashboard</h1>

        <div class='my-6'>
          <h3 class='text-lg text-discordBlue text-center mb-1'>Class Attendance Performance</h3>
          <BarChartComp />
        </div>

        {/* Top Attendees List*/}
        <div>
          <div class='text-center flex justify-center space-x-2'>
            <div class='text-discordBlue'>
              <EmojiEventsIcon />
            </div>
            <h3 class='text-center text-lg text-discordBlue mb-4'>Top Attendees</h3>
          </div>
          {/* list of top attendees */}
          <div class='text-discordBlue overflow-y-scroll'>
              <TopAttendeesTable />
          </div>
          
          
        </div></div>
      ):null
      }

      {(showMenu && classesClicked)?(
        <div class='px-20 w-full h-full'>
        <h1 class='text-center text-2xl text-discordBlue my-4 mb-8'>Classes</h1>
        <div class='flex justify-center my-4'><Calendar /></div>
        <div class='flex w-full justify-center space-x-5 flex-wrap relative'>
        {/* {(subjectClick)?<>{transparent}<SubjectInfoCard class='z-10' /></>:null} */}
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20' onClick={() => setSubjectClick(true)}>
            <h1 class='text-3xl text-discordBlue'>AINN</h1>
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
            <h1 class='text-3xl text-discordBlue'>WT</h1>
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
            <h1 class='text-3xl text-discordBlue'>PPL</h1>
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
            <h1 class='text-3xl text-discordBlue'>OOSD</h1>
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
            <h1 class='text-3xl text-discordBlue'>EE</h1>
          </div>
        </div>
      </div>
      ):null
      }

      {/* {(showMenu && profileClicked)?(
        <h1>profile</h1>
      ):null
      }

      {(showMenu && calendarClicked)?(
        <h1>calendar</h1>
      ):null
      } */}

      {(showMenu && settingClicked)?(
        <div class='w-full h-full flex justify-center px-5 '><Setting notificationClick={onNotificationClick} /></div>
      ):null
      }
      
      <style>
      {`
          @layer utilities {
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
          }
        `}
      </style>
      
    </div>
    </>
  )
}

export default TeacherDashboard
