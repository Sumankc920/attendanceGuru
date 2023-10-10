import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SubjectPie = (props) => {
  function getRandomNumber(min, max) {
    // Generate a random number between 0 and 1
    const random = Math.random();
    
    // Scale the random number to be in the range [min, max]
    const scaledRandom = random * (max - min + 1) + min;
    
    // Take the floor of the scaled random number to ensure it's an integer
    const result = Math.floor(scaledRandom);
    
    return result;
  }
  
  
  // Generate a random number between 60 and 80
  const randomNumber = getRandomNumber(60, 80);  
  return (
    <>
      <div class={''+props.widthHeight}>
            <CircularProgressbar value={randomNumber} text={`${randomNumber}%`} styles={buildStyles({
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
