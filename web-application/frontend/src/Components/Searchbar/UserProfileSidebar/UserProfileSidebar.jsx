import React, {useState, useEffect} from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Avatar, Badge } from '@mui/material';

const UserProfileSidebar = (props) => {
  const [lightMode, setLightMode] = useState(("lightMode" in localStorage)? localStorage.getItem("lightMode"):true);

  const [notificationCount, setNotificationCount] = useState(2);

  // useEffect(() => {
  //   console.log(lightMode);
  //   if(lightMode === true){
  //     console.log(lightMode);
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("lightMode", true);
  //   }else if(lightMode === false){
  //     console.log(lightMode);
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("lightMode", false);
  //   }
  // },[lightMode])

  useEffect(() => {
    localStorage.setItem("lightMode", lightMode);
    const mode = localStorage.getItem("lightMode");
    if(mode === 'true'){
      document.documentElement.classList.remove("dark");
    }else {
      document.documentElement.classList.add("dark");    
    }
  }, [lightMode])

  return (
    <div class='flex space-x-2 items-center px-3'>
      {/* light-dark icon */}
      <div class='basis-1/3 text-discordBlue border-1 bg-white p-2 shadow-sm shadow-gray rounded cursor-pointer' onClick={() => setLightMode(!lightMode)}>
        {(lightMode)?<DarkModeIcon />:<LightModeIcon />}
      </div>
      {/* bell */}
      <div class='text-discordBlue basis-1/3 border-1 bg-white p-2 shadow-sm shadow-gray rounded cursor-pointer' onClick={() => {setNotificationCount(0); props.notificationClick(true);}}>
      <Badge badgeContent={notificationCount} color="secondary"><NotificationsNoneIcon /></Badge>
      </div>
      {/* user avatar */}
      <div class='basis-1/3 text-discordBlue border-1 bg-white p-2 shadow-sm shadow-gray rounded cursor-pointer' onClick={() => props.profileClick(true)}>
        <Avatar src='../../../assets/Images/userprofile.jpg' sx={{ width: 24, height: 24 }} />
        </div>
    </div>
  )
}

export default UserProfileSidebar
