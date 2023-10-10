import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SubjectPie = (props) => {
  return (
    <>
      <div class={''+props.widthHeight}>
            <CircularProgressbar value={props.percentage} text={`${props.percentage}%`} styles={buildStyles({
                textColor : '#5765f2',
                pathColor : '#5765f2',
                textSize : '16px'
            })}  />
        </div>
        <h1 class='text-md text-discordBlue md:text-xl text-center'>{props.subjectName}</h1>
    </>
  )
}

export default SubjectPie
