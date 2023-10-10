import React from 'react'
import { Avatar } from '@mui/material';

const UserCard = (props) => {
  let avatarStyle = '';
  let h1Style = '';
  let avatarUrl = '';
  let bgStyle = '';
  avatarUrl = '../../../assets/Images/student-avatar.jpg';
  bgStyle = 'bg-student-avatar';
  h1Style = " text-blue-500"
  
  return (
    <div class={"bg-white shadow-lg shadow-black rounded-lg cursor-pointer flex flex-col justify-between items-center p-10 mb-5 mr-4 opacity-70 hover:opacity-100"} onClick={onCardClick}>
      <Avatar src='/broken-image.jpg' class="mb-5 text-green-500" />
      <h1 class={"text-3xl" + h1Style}>Admin</h1>
    </div>
  )
}

export default UserCard
 