import React from 'react'
import LineChartComp from '../../../Components/Searchbar/LineChart/LineChart'
import SubjectPie from '../../../Components/Searchbar/SubjectPie/SubjectPie'



const Dashboard = () => {
    

    return (
        <div class='w-full px-4 mt-4'>
            <h1 class='text-center text-discordBlue text-xl mb-2'>Dashboard</h1>
            {/* <LineChartComp /> */}

            {/* container containing subject name and completion */}
            <div class='md:flex md:flex-wrap md:space-x-10 md:gap-3'>
                <SubjectPie percentage={80} subjectName="Maths" />
                <SubjectPie percentage={50} subjectName="Science" />
                <SubjectPie percentage={70} subjectName="Social" />
                <SubjectPie percentage={85} subjectName="English" />
                <SubjectPie percentage={75} subjectName="Nepali" />
            </div>

        </div>
    )
}

export default Dashboard
