import React from 'react'
import {AreaChart, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { month: 'April', days: 20 },
  { month: 'May', days: 24 },
  { month: 'June', days: 23 },
  { month: 'July', days: 19 },
  { month: 'August', days: 16 },
  { month: 'September', days: 8 },
];

const LineChartComp = () => {
  return (
    <div class='flex justify-center'>
      <div style={{width : '80%', height : '350px'}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="days" stroke="#5765f2" />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
    
    
  )
}

export default LineChartComp

