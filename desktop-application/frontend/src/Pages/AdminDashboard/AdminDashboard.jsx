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

import { useNavigate } from 'react-router-dom'
import Classrooms from '../DashboardPages/Classrooms/Classrooms'
import Students from '../DashboardPages/Students/Students'
import Teachers from '../DashboardPages/Teachers/Teachers'
import ClassroomCard from '../../Components/Searchbar/ClassroomCard/ClassroomCard'
import SubjectInfoCard from '../../Components/SubjectInfoCard/SubjectInfoCard'

import Toastify from '../../Components/Toastify/Toastify';

import ProfileCard from '../../Components/ProfileCard/ProfileCard';

import Setting from '../../Components/Setting/Setting';

import useAxiosPrivate from '../../hooks/useAxiosPrivate'

import axios from '../../api/axios'

import StudentCard from '../../Components/Searchbar/StudentCard/StudentCard'

import { isAuthenticatedUser} from '../../authService/authService';

import { authenticate } from '../../authService/authService';

import AuthContext from '../../context/AuthProvider'



const AdminDashboard = () => {

  const {setAuth} = useContext(AuthContext);


  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(true);

  const [dashboardClicked, setDashboarClicked] = useState(true);
  const [classroomsClicked, setClassroomsClicked] = useState(false);
  const [teachersClicked, setTeachersClicked] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);
  const [studentsClicked, setStudentsClicked] = useState(false);
  const [settingClicked, setSettingClicked] = useState(false);

  const [semesterSelect, setSemesterSelect] = useState(2);
  const [studentSemesterSelect, setStudentSemesterSelect] = useState('');

  const [addClassroomClicked, updateAddClassroomClicked] = useState(false);
  const [addStudentClicked, updateAddStudentClicked] = useState(false);


  const [subjectClick, setSubjectClick] = useState(false);
  const [notificationClick, onNotificationClick] = useState(false);

  const [subjects, setSubjects] = useState([]);

  const [subjectDetails, setSubjectDetails] = useState(null);

  const [teachersList, setTeachersList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);

  const getStudentsOnStudentsClicked = async () => {
    const formData = {
      semester : 6,
      shift : "M",
    }
    try{
      const response = await axios.post("/admin/get_students", 
        JSON.stringify(formData), 
        {
            headers : {'Content-Type' : 'application/json'},
            withCredentials : true
        }
        );
        const data = await response.data;
        console.log(data);
        setStudentsList([...data]);
    }catch(error){
      console.log(error);
    }
    
  }

  const getClassroomOnClassroomsClicked = async () => {
    const formData = {
      semester : 6,
      shift : "M",
    }
    try{
      const response = await axios.post("/admin/subjects/details", 
        JSON.stringify(formData), 
        {
            headers : {'Content-Type' : 'application/json'},
            withCredentials : true
        }
        );
        const data = await response.data;
        console.log(data);
        setSubjects([...data]);
    }catch(error){
      console.log(error);
    }
    
  }


  useEffect(() => {
    console.log("Semester : ", studentSemesterSelect[0] , "Shift : " , studentSemesterSelect[1]);
  },[studentSemesterSelect])

  
  const getTeachersList = async () => {
    
    try{
      const response = await axios.get("admin/all_teachers");
      const data = await response.data;
      console.log(data);
      setTeachersList(data);
    }catch(error){
      console.log(error);
    }
    
  }


  const onDashboardClicked = () => {
    setDashboarClicked(true);
    setClassroomsClicked(false);
    setTeachersClicked(false);
    setStudentsClicked(false);
    setSettingClicked(false);
    setProfileClicked(false);
  }

  const onClassroomsClicked = () => {
    setDashboarClicked(false);
    setClassroomsClicked(true);
    setTeachersClicked(false);
    setStudentsClicked(false);
    setSettingClicked(false);
    setProfileClicked(false);

    getClassroomOnClassroomsClicked();
  }

  const onTeachersClicked = () => {
    setDashboarClicked(false);
    setClassroomsClicked(false);
    setTeachersClicked(true);
    setStudentsClicked(false);
    setSettingClicked(false);
    setProfileClicked(false);

    getTeachersList();
  }

  const onStudentsClicked = () => {
    setDashboarClicked(false);
    setClassroomsClicked(false);
    setTeachersClicked(false);
    setStudentsClicked(true);
    setSettingClicked(false);
    setProfileClicked(false);

    getStudentsOnStudentsClicked();
  }

  const onSettingClicked = () => {
    setDashboarClicked(false);
    setClassroomsClicked(false);
    setTeachersClicked(false);
    setStudentsClicked(false);
    setSettingClicked(true);
    setProfileClicked(false);
  }

  const transparent = <div class='opacity-70 w-full h-full bg-gray-200 dark:bg-darkTransparent z-0 absolute' onClick={() => {
    updateAddClassroomClicked(false);
    setSubjectClick(false);
    updateAddStudentClicked(false);
  }}></div>;

  const onSubjectClick = async (sub) => {
    const formData = {
      semester : 6,
      shift : "M",
      sub_name : sub
    }
    try{
      const response = await axios.post("admin/get_sub_details", 
      JSON.stringify(formData), 
      {
          headers : {'Content-Type' : 'application/json'},
          withCredentials : true
      }
      );
      const data = await response.data;
      console.log(data);
      setSubjectDetails(data);
    }catch(error){
      console.log(error);
      setSubjectClick(false);
    }
    
  }

  useEffect(() => {
    if(localStorage.getItem("email") && localStorage.getItem("password")){
      let email = localStorage.getItem("email");
      let password = localStorage.getItem("token");
      setAuth({email,password});
      authenticate();
    }
    if(!isAuthenticatedUser()) navigate('/');
  },[])



  return (
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
          <SidebarItem muiIcon={<SchoolIcon />} itemText='ClassRooms' textSize='text-lg' onClick={onClassroomsClicked} leftBorder={(classroomsClicked)?'border-r-4 border-r-discordBlue bg-gray-300':''} />
          <SidebarItem muiIcon={<PersonIcon />} itemText='Teachers' textSize='text-lg' onClick={onTeachersClicked} leftBorder={(teachersClicked)?'border-r-4 border-r-discordBlue bg-gray-300':''} />
          <SidebarItem muiIcon={<PersonIcon />} itemText='Students' textSize='text-lg' onClick={onStudentsClicked} leftBorder={(studentsClicked)?'border-r-4 border-r-discordBlue bg-gray-300':''} />
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
                {(profileClicked)?<ProfileCard onSettingClicked={onSettingClicked} profileClicked={setProfileClicked} />:null}
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


        {(classroomsClicked)?(
          <div class=' w-full h-full relative'>
          {(addClassroomClicked)?<>{transparent}<div class='w-full h-full flex justify-center items-center'><ClassroomCard class='z-10' semester={semesterSelect[0]} shift={semesterSelect[1]} off={updateAddClassroomClicked} /></div></>:null}
          {(subjectClick)?<>{transparent}<div class='w-full h-full flex justify-center items-center'><SubjectInfoCard class='z-10' subjectDetails={subjectDetails} /></div></>:null}
          {(!addClassroomClicked && !subjectClick)?<><h1 class='text-center text-2xl text-discordBlue my-4 mb-8'>Classes</h1>
          {/* Dropdown to select semester */}
          <div class='my-5 text-xl text-center text-discordBlue border-discordBlue outline-discordBlue'>
            <select onChange={(e) => setSemesterSelect(e.target.value)}>
              {/* <option value='2M'>Semester 2 Morning</option>
              <option value='2D'>Semester 2 Day</option>
              <option value='4M'>Semester 4 Morning</option>
              <option value='4D'>Semester 4 Day</option> */}
              <option value='6M' selected>Semester 6 Morning</option>
              {/* <option value='6D'>Semester 6 Day</option> */}
              {/* <option value='8M'>Semester 8 Morning</option>
              <option value='8D'>Semester 8 Day</option> */}
            </select>
          </div>
          <div class='flex w-full justify-center space-x-5 flex-wrap relative'>
            <>
              <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20 cursor-pointer' onClick={() => updateAddClassroomClicked(true)}>
                <div class='text-8xl text-center text-discordBlue'>+</div>
                <h1 class='text-2xl text-discordBlue'>Add Classroom</h1>
            </div>
            {<Classrooms subjectClick={setSubjectClick} subjects={subjects} onSubjectClick={onSubjectClick} />}</>
          </div></>:null}
        </div>
        ):null
        }
        {(teachersClicked)?(
          <div class='px-20 w-full h-full'>
            <h1 class='text-center text-2xl text-discordBlue my-4 mb-8'>List of Teachers</h1>
            <Teachers teachers={teachersList} />
            {/* name */}
            {/* email */}
          </div>
        ):null
        }

        {(studentsClicked)?(
          <div class='px-20 w-full h-full relative'>
            {(addStudentClicked)?<>{transparent}<div class='w-full h-full flex justify-center items-center'><StudentCard class='z-10' semester={6} shift={"M"} off={updateAddStudentClicked} /></div></>:null}
            {(!addStudentClicked)?<><h1 class='text-center text-2xl text-discordBlue my-4 mb-8'>List of Students</h1>
            <div class='my-5 text-xl text-center text-discordBlue border-discordBlue outline-discordBlue'>
              <select onChange={(e) => setStudentSemesterSelect(e.target.value)}>
              {/* <option value='2M'>Semester 2 Morning</option>
              <option value='2D'>Semester 2 Day</option>
              <option value='4M'>Semester 4 Morning</option>
              <option value='4D'>Semester 4 Day</option> */}
              <option value='6M' selected>Semester 6 Morning</option>
              {/* <option value='6D'>Semester 6 Day</option> */}
              {/* <option value='8M'>Semester 8 Morning</option>
              <option value='8D'>Semester 8 Day</option> */}
              </select>
              <div class='flex w-full justify-center items-center mt-5 mb-0'>
                <div class='flex w-52 h-5 space-y-2 border-1 items-center space-x-2 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 cursor-pointer' onClick={() => updateAddStudentClicked(true)}>
                  <div class='text-2xl text-center text-discordBlue'>+</div>
                  <h1 class='text-xl text-discordBlue'>Add Student</h1>
                </div>
              </div>
              
            </div>
            <Students students={studentsList} /></>:null}
          </div>):null
        }

        {(settingClicked)?(
          <div class='w-full h-full flex justify-center '><Setting notificationClick={onNotificationClick} /></div>
        ):null
        }
      </div>
    </div>



    {/* For smaller Device */}
    <div class='h-screen w-screen no-scrollbar md:hidden'>
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
        <SidebarItem itemText='ClassRooms' textSize='text-lg' onClick={onClassroomsClicked} leftBorder={(classroomsClicked)?'border-l-4 border-l-discordBlue bg-gray-100':''} />
        <SidebarItem itemText='Teachers' textSize='text-lg' onClick={onTeachersClicked} leftBorder={(teachersClicked)?'border-l-4 border-l-discordBlue bg-gray-100':''} />
        <SidebarItem itemText='Students' textSize='text-lg' onClick={onStudentsClicked} leftBorder={(studentsClicked)?'border-l-4 border-l-discordBlue bg-gray-100':''} />
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

      {(showMenu && classroomsClicked)?(
        <div class='px-20 w-full h-full'>
        <h1 class='text-center text-2xl text-discordBlue my-4 mb-8'>Classes</h1>
        <div class='my-5 text-xl text-center text-discordBlue border-discordBlue outline-discordBlue'>
            <select onChange={(e) => setSemesterSelect(e.target.value)}>
              <option value='2'>Semester 2</option>
              <option value='4'>Semester 4</option>
              <option value='6'>Semester 6</option>
              <option value='8'>Semester 8</option>
            </select>
        </div>
        <div class='flex w-full justify-center space-x-5 flex-wrap'>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20 cursor-pointer'>
              <div class='text-8xl text-center text-discordBlue'>+</div>
              <h1 class='text-2xl text-discordBlue'>Add Classroom</h1>
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <div class='flex justify-center items-center w-32 h-32'>
                <h1 class='text-5xl text-discordBlue'>PPL</h1>
              </div>
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <div class='flex justify-center items-center w-32 h-32'>
                <h1 class='text-5xl text-discordBlue'>CN</h1>
              </div>
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <div class='flex justify-center items-center w-32 h-32'>
                <h1 class='text-5xl text-discordBlue'>EE</h1>
              </div>
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <div class='flex justify-center items-center w-32 h-32'>
                <h1 class='text-5xl text-discordBlue'>OOSD</h1>
              </div>
          </div>
          <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20'>
              <div class='flex justify-center items-center w-32 h-32'>
                <h1 class='text-5xl text-discordBlue'>MMS</h1>
              </div>
          </div>
        </div>
      </div>
      ):null
      }

      {(showMenu && teachersClicked)?(
        <h1>profile</h1>
      ):null
      }

      {(showMenu && studentsClicked)?(
        <h1>calendar</h1>
      ):null
      }

      {(showMenu && settingClicked)?(
        <h1>setting</h1>
      ):null
      }
      
    </div>
    </>
  )
}

export default AdminDashboard
