import React, {useState} from 'react'

const Classrooms = (props) => {
    let items = props.subjects.map((sub) => {
        return (
            <div key={sub} class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20 cursor-pointer'  onClick={() => {
                props.subjectClick(true);
                props.onSubjectClick(sub);
            }}>
                <div class='flex justify-center items-center w-32 h-32'>
                <h1 class='text-5xl text-discordBlue'>{sub}</h1>
                </div>
            </div>
        )
    })
    return (
        <>
            {/* <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20 cursor-pointer'  onClick={() => props.subjectClick(true)}>
                <div class='flex justify-center items-center w-32 h-32'>
                <h1 class='text-5xl text-discordBlue'>PPL</h1>
                </div>
            </div>
            <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20 cursor-pointer'>
                <div class='flex justify-center items-center w-32 h-32'>
                <h1 class='text-5xl text-discordBlue'>CN</h1>
                </div>
            </div>
            <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20 cursor-pointer'>
                <div class='flex justify-center items-center w-32 h-32'>
                <h1 class='text-5xl text-discordBlue'>EE</h1>
                </div>
            </div>
            <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20 cursor-pointer'>
                <div class='flex justify-center items-center w-32 h-32'>
                <h1 class='text-5xl text-discordBlue'>OOSD</h1>
                </div>
            </div>
            <div class='flex flex-col space-y-2 border-1 border-white shadow-discordBlue shadow-lg hover:shadow-md hover:shadow-discordBlue p-10 mb-20 cursor-pointer'>
                <div class='flex justify-center items-center w-32 h-32'>
                <h1 class='text-5xl text-discordBlue'>MMS</h1>
                </div>
            </div> */}
            {(props.subjects)?items:null}
        </>
        )
}

export default Classrooms
