import React, {useEffect} from 'react'
import Teachers from './Teachers/Teachers'
import Students from './Students/Students'
import './SubjectInfoCard.css'

import Bars from 'react-loading-icons/dist/esm/components/bars';


const SubjectInfoCard = (props) => {
  // const [isButtonLoading, setIsButtonLoading] = useState(false);
  useEffect(() => {
    console.log("Subject details is ", props.subjectDetails);
  })
  // props
  // subject full name
  // assigned teacher name
  // assigned teacher email
  // enrolled students roll
  // enrolled student email
  // enrolled student name
  if(!props.subjectDetails) return <Bars class='w-5 h-5' style={{width : '20px', height:'20px'}} />
  else return (
    <div class='hide-scrollbar absolute h-full overflow-scroll scroll'>
        <h1 class='bg-white text-center text-xl pt-2 mt-4 dark:bg-gray-200'>{props.subjectDetails.subject.name}</h1>

        <h1 class='bg-white text-center text-xl pt-2 mt-2 underline dark:bg-gray-200'>Teacher Assigned</h1>
        <Teachers name={props.subjectDetails.teacher_name} email={props.subjectDetails.teacher_email} />

        <h1 class='bg-white text-center text-xl pt-2 mt-4 underline dark:bg-gray-200'>Students Enrolled</h1>
        <Students students={props.subjectDetails.student} />
    </div>
  )
}

export default SubjectInfoCard
