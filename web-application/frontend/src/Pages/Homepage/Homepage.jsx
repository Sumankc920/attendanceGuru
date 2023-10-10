import React from 'react'
import UserCard from '../../Components/Searchbar/UserCard/UserCard'
import background from '../../assets/Images/background.png'


const Homepage = () => {
  return (
    <div class="h-screen w-screen flex justify-center items-center bg-fixed bg-cover bg-center bg-no-repeat" style={{backgroundImage : `url(${background})`}}>
        <div class="bg-discordBlack p-20 px-32 rounded-xl h-screen w-screen md:w-auto md:h-auto">
          <h1 class="text-3xl mb-10 text-white">Are You</h1>
          <div class="flex flex-col justify-between items-center md:flex-row">
            <UserCard userType="Student" />
            <h1 class='mr-4 text-2xl text-white'>OR</h1>
            <UserCard userType="Teacher" />
          </div>
        </div>
    </div>
  )
}

export default Homepage
