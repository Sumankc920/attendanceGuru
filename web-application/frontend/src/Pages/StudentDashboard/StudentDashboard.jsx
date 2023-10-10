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
import SubjectInfoCard from '../../Components/SubjectInfoCard/SubjectInfoCard'
import Calendar from '../../Components/Searchbar/Calendar/Calendar'

import { useNavigate } from 'react-router-dom'
import StudentSubjectInfo from '../../Components/StudentSubjectInfo/StudentSubjectInfo'

import ProfileCard from '../../Components/ProfileCard/ProfileCard'

import Toastify from '../../Components/Toastify/Toastify'
import Setting from '../DashboardPages/Setting/Setting'

import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import { isAuthenticatedUser } from '../../authService/authService';

import { authenticate } from '../../authService/authService';

import AuthContext from '../../context/AuthProvider'


const StudentDashboard = () => {

  
  const {setAuth} = useContext(AuthContext);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token") && localStorage.getItem("email") && localStorage.getItem("studentStatus") == 1){
      let email = localStorage.getItem("email");
      let accessToken = localStorage.getItem("token");
      let roles = 'student';
      setAuth({email,roles,accessToken});
      authenticate();
    }
    console.log(isAuthenticatedUser())
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

  const [subjects, setSubjects] = useState([]);
  const [email, setEmail] = useState('');
  const [subjectClickData, setSubjectClickData] = useState([]);
  const [date, setDate] = useState('');


  const getSubjectsOnClassesClicked = async () => {
    const response = await axiosPrivate.get("/student/classes");
    const data = await response.data;
    console.log(data);
    setSubjects([...data]);
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

  const onCalendarClicked = () => {
    setDashboarClicked(false);
    setClassesClicked(false);
    setCalendarClicked(true);
    setProfileClicked(false);
    setSettingClicked(false);
  }

  const onProfileClicked = () => {
    setDashboarClicked(false);
    setClassesClicked(false);
    setCalendarClicked(false);
    setProfileClicked(true);
    setSettingClicked(false);
  }

  const onSettingClicked = () => {
    setDashboarClicked(false);
    setClassesClicked(false);
    setCalendarClicked(false);
    setProfileClicked(false);
    setSettingClicked(true);
  }

  const getInfoOnSubjectClick = async (sub) => {
    const formData = {
        "sub_name" : sub , 
        "date" : "2023-10-07"
        // "data" : date
    }
    try{
      const response = await axiosPrivate.post("/student/get_subject_teacher", 
        JSON.stringify(formData), 
        {
            headers : {'Content-Type' : 'application/json'},
            withCredentials : true
        }
        );
        const data = await response.data;
        console.log(data);
        setSubjectClickData([...data]);
        // full subject name
        // teacher email
        // student roll
        // student attendance
    }catch(error){
      console.log(error);
    }
    
  }

  useEffect(() => {
    let studentStatus = localStorage.getItem("student");
    // if(studentStatus !== 1){
    //   navigate('/login');
    // }
  })

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, [email])

  const transparent = <div class=' w-full h-screen bg-gray-200 dark:bg-darkTransparent z-5 absolute' onClick={() => {
    setSubjectClick(false);
  }}></div>;

  let count = 0;
  let subjectCount = subjects.length;
  let subjectBox = subjects.map((subject) => {
    count++;
    if(count<subjectCount){
      return (
        <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20' onClick={
          () => {
            setSubjectClick(true);
            getInfoOnSubjectClick(subject.subject);
        }
          }>
          <SubjectPie percentage={80} subjectName={subject.subject} widthHeight='w-32 h-32' />
        </div>
      )
    }else return null
  })

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
          {/* <SidebarItem muiIcon={<CalendarMonthIcon />} itemText='Calendar' textSize='text-lg' onClick={onCalendarClicked} leftBorder={(calendarClicked)?'border-r-4 border-r-discordBlue bg-gray-300':''} /> */}
          {/* <SidebarItem muiIcon={<PersonIcon />} itemText='Profile' textSize='text-lg' onClick={onProfileClicked} leftBorder={(profileClicked)?'border-r-4 border-r-discordBlue bg-gray-300':''} /> */}
          <SidebarItem muiIcon={<SettingsIcon />} itemText='Setting' textSize='text-lg' onClick={onSettingClicked} leftBorder={(settingClicked)?'border-r-4 border-r-discordBlue bg-gray-300':''} />
        </div>
        

        {/* sidebar elements */}
        {/* Dashboard */}
      </div>


      {/* middle section */}
      <div class='basis-5/6 bg-gray-100 pb-10 dark:bg-darkMiddlebar'>
        {/* Searchbar */}
        <div class='w-full flex  items-center py-4 bg-gray-300 dark:bg-darkMiddlebar'>
            <Searchbar />
            <div class='relative'>
                <UserProfileSidebar profileClick={setProfileClicked} notificationClick={onNotificationClick} />
                {(profileClicked)?<ProfileCard onSettingClicked={onSettingClicked} profileClicked={setProfileClicked} email={email} />:null}
            </div>
        </div>
        
        {(dashboardClicked)?
        (<><h1 class='text-2xl text-discordBlue text-center mt-2'>Dashboard</h1>

        <div class='my-6'>
          <h3 class='text-lg text-discordBlue text-center mb-1'>Attendance Overview</h3>
          <LineChartComp />
        </div>

        {/* Subject Pies */}
        <div>
          <h3 class='text-center text-lg text-discordBlue mb-4'>Attendance per Subject</h3>
          <div class='flex w-full justify-center space-x-5'>
            <div class='flex flex-col space-y-2'>
              <SubjectPie percentage={80} subjectName="PPL" widthHeight='w-32 h-32' />
            </div>
            <div class='flex flex-col space-y-2'>
              <SubjectPie percentage={75} subjectName="CN" widthHeight='w-32 h-32' />
            </div>
            <div class='flex flex-col space-y-2'>
              <SubjectPie percentage={65} subjectName="EE" widthHeight='w-32 h-32' />
            </div>
            <div class='flex flex-col space-y-2'>
              <SubjectPie percentage={70} subjectName="OOSD" widthHeight='w-32 h-32' />
            </div>
            <div class='flex flex-col space-y-2'>
              <SubjectPie percentage={85} subjectName="MMS" widthHeight='w-32 h-32' />
            </div>
          </div>
        </div></>):null}


        {(classesClicked)?(
          <div class=' w-full h-full relative'>
          {(subjectClick)?<>{transparent}<div class='flex justify-center bg-black p-10'><StudentSubjectInfo class='z-10' 
          subjectName="Principles of Programming Language" 
          teacherEmail="rishi.marseni@ncit.edu.np" 
          studentEmail={email} 
          attendance="Present"
          data={subjectClickData} /></div></>:null}
          {(!subjectClick)?<><h1 class='text-center text-2xl text-discordBlue my-4 mb-8'>Classes</h1>
          <div class='flex w-full justify-center space-x-5 flex-wrap relative'>
          {/* {(subjectClick)?<>{transparent}<StudentSubjectInfo class='z-10' /></>:null} */}
            {/* <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20' onClick={() => setSubjectClick(true)}>
              <SubjectPie percentage={80} subjectName="PPL" widthHeight='w-32 h-32' />
            </div>
            <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <SubjectPie percentage={75} subjectName="CN" widthHeight='w-32 h-32' />
            </div>
            <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <SubjectPie percentage={65} subjectName="EE" widthHeight='w-32 h-32' />
            </div>
            <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <SubjectPie percentage={70} subjectName="OOSD" widthHeight='w-32 h-32' />
            </div>
            <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <SubjectPie percentage={85} subjectName="MMS" widthHeight='w-32 h-32' />
            </div> */}
            {(subjects)?subjectBox:null}
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
        {/* <SidebarItem itemText='Calendar' textSize='text-lg' onClick={onCalendarClicked} leftBorder={(calendarClicked)?'border-l-4 border-l-discordBlue bg-gray-100':''} /> */}
        {/* <SidebarItem itemText='Profile' textSize='text-lg' onClick={onProfileClicked} leftBorder={(profileClicked)?'border-l-4 border-l-discordBlue bg-gray-100':''} /> */}
        <SidebarItem itemText='Setting' textSize='text-lg' onClick={onSettingClicked} leftBorder={(settingClicked)?'border-l-4 border-l-discordBlue bg-gray-100':''} />
      </div>):null}

      {(showMenu && dashboardClicked)?(
        <div class='w-full'>
          <h3 class='text-lg text-discordBlue text-center mb-1'>Attendance Overview</h3>
          <LineChartComp />
          <div>
          <h3 class='text-center text-lg text-discordBlue mb-4'>Attendance per Subject</h3>
          <div class='flex w-full justify-center space-x-5 flex-wrap px-20'>
            <div class='flex flex-col space-y-2'>
              <SubjectPie percentage={80} subjectName="PPL" widthHeight='w-40 h-40' />
            </div>
            <div class='flex flex-col space-y-2'>
              <SubjectPie percentage={75} subjectName="CN" widthHeight='w-40 h-40' />
            </div>
            <div class='flex flex-col space-y-2'>
              <SubjectPie percentage={65} subjectName="EE" widthHeight='w-40 h-40' />
            </div>
            <div class='flex flex-col space-y-2'>
              <SubjectPie percentage={70} subjectName="OOSD" widthHeight='w-40 h-40' />
            </div>
            <div class='flex flex-col space-y-2'>
              <SubjectPie percentage={85} subjectName="MMS" widthHeight='w-40 h-40' />
            </div>
          </div>
        </div>
        </div>
      ):null
      }

      {(showMenu && classesClicked)?(
        <div class='px-20 w-full h-full'>
        <h1 class='text-center text-2xl text-discordBlue my-4 mb-8'>Classes</h1>
        <div class='flex w-full justify-center space-x-5 flex-wrap relative'>
        {/* {(subjectClick)?<>{transparent}<StudentSubjectInfo class='z-10' /></>:null} */}
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20' onClick={() => setSubjectClick(true)}>
            <SubjectPie percentage={80} subjectName="PPL" widthHeight='w-32 h-32' />
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
            <SubjectPie percentage={75} subjectName="CN" widthHeight='w-32 h-32' />
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
            <SubjectPie percentage={65} subjectName="EE" widthHeight='w-32 h-32' />
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
            <SubjectPie percentage={70} subjectName="OOSD" widthHeight='w-32 h-32' />
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
            <SubjectPie percentage={85} subjectName="MMS" widthHeight='w-32 h-32' />
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
      
    </div>
    </>
  )
}

export default StudentDashboard
