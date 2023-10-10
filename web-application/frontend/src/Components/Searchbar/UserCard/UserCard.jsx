import React from 'react'
import { Avatar } from '@mui/material';
import { useNavigate } from "react-router-dom";

const UserCard = (props) => {
  let avatarStyle = '';
  let h1Style = '';
  let avatarUrl = '';
  let bgStyle = '';
  if(props.userType === 'Student'){
    avatarUrl = '../../../assets/Images/student-avatar.jpg';
    bgStyle = 'bg-student-avatar';
    h1Style = " text-blue-500"
  }
  if(props.userType === 'Teacher'){
    avatarUrl = '../../../assets/Images/teacher-avatar.jpg';
    bgStyle = 'bg-teacher-avatar';
    h1Style = " text-pink-500"
  }

  const navigate = useNavigate();

  const onCardClick = () => {
    navigate("/signup");
  }

  return (
    <div class={"bg-white shadow-lg shadow-black rounded-lg cursor-pointer flex flex-col justify-between items-center p-10 mb-5 mr-4 opacity-70 hover:opacity-100"} onClick={onCardClick}>
      <div class={avatarStyle}><Avatar src='/broken-image.jpg' class="mb-5 text-green-500" /></div>
      <h1 class={"text-3xl" + h1Style}>{props.userType}</h1>
    </div>
  )
}

export default UserCard
 