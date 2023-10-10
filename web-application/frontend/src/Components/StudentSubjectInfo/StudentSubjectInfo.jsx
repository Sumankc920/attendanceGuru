import React from 'react'
import Students from './Students/Students'
import Teachers from './Teachers/Teachers/'
import Bars from 'react-loading-icons/dist/esm/components/bars';
import Calendar from '../../Components/Searchbar/Calendar/Calendar'

import './StudentSubjectInfo.css'

const StudentSubjectInfo = (props) => {
  if(!props.data) return <Bars class='w-5 h-5' style={{width : '20px', height:'20px'}} />
  if(props.data)return (
    <div class='hide-scrollbar absolute h-screen overflow-scroll pb-48'>
        <div class='flex justify-center my-4'><Calendar /></div>
        <h1 class='bg-white text-center text-xl py-2 mt-4 border-2 border-discordBlue dark:bg-gray-200'>{props.data[0]}</h1>

        <h1 class='bg-white text-center text-xl pt-2 underline border-x-2 border-t-2 border-discordBlue mt-4 dark:bg-gray-200'>Teacher Assigned</h1>
        <Teachers teacherEmail={props.data[2]} teacherName={props.data[1]} />

        <h1 class='bg-white text-center text-xl pt-2 underline border-x-2 border-t-2 border-discordBlue mt-4 dark:bg-gray-200'>My Attendance</h1>
        <Students studentEmail={props.studentEmail} attendance={props.data[4]} roll={props.data[3]} />
    </div>
  )
}

export default StudentSubjectInfo
