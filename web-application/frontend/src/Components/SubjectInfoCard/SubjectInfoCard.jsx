import React from 'react'
import Students from './Students/Students'
import Calendar from '../../Components/Searchbar/Calendar/Calendar'


import './SubjectInfoCard.css'

const SubjectInfoCard = (props) => {
  return (
    <div class='hide-scrollbar absolute h-screen overflow-scroll pb-48'>
        <div class='flex justify-center my-4'><Calendar date={props.date} /></div>
        <h1 class='bg-white text-center text-xl pt-2 mt-4 border-2 border-discordBlue dark:bg-gray-200'>{props.subjectName}</h1>

        <h1 class='bg-white text-center text-xl pt-2 underline border-x-2 border-t-2 border-discordBlue mt-4 dark:bg-gray-200'>Present Students</h1>
        <Students present={props.present}  />

        <h1 class='bg-white text-center text-xl pt-2 underline border-x-2 border-t-2 border-discordBlue mt-4 dark:bg-gray-200'>Absent Students</h1>
        <Students absent={true} />
    </div>
  )
}

export default SubjectInfoCard
