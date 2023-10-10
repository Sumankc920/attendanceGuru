import { Avatar } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';

const ProfileCard = (props) => {
  return (
    <div class='absolute w-60 bg-gray-400 top-14 right-5 z-10 p-5 rounded-lg'>
      {/* Cross button */}
      <ClearIcon class='absolute w-7 right-3 top-2 text-discordBlue cursor-pointer' onClick={() => props.profileClicked(false)} />
      <div class='flex items-center flex-col mt-5'>
        <h4 class='text-md font-bold text-black my-4'>{props.email}</h4>
        <Avatar src="../../assets/Images/userprofile.jpg" class='w-24 my-2 text-black' />
        <h1 class='text-xl font-bold my-2 text-black'>Hi, User</h1>
        <button class='text-white bg-discordBlue border-discordBlue rounded-full px-8 py-2 hover:bg-white hover:text-discordBlue mt-2 cursor-pointer' onClick={
            () => {
                props.onSettingClicked();
            }
        }>Settings</button>
      </div>
    </div>
  )
}

export default ProfileCard
