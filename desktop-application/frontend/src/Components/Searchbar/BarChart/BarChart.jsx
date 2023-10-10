import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Subject 1',
    attendees : 30,
  },
  {
    name: 'Subject 2',
    attendees : 26,
  },
  {
    name: 'Subject 3',
    attendees : 35,
  },
  {
    name: 'Subject 4',
    attendees : 38,
  },
  {
    name: 'Subject 5',
    attendees : 12,
  },
  {
    name: 'Subject 6',
    attendees : 8,
  },
  {
    name: 'Subject 7',
    attendees : 30,
  },
];

const BarChartComp = () => {
    return (
            <div class='flex justify-center'>
            <div style={{width : '80%', height : '350px'}}>
            <ResponsiveContainer width="100%" height="100%">
                    <BarChart
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
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attendees" fill="#5765f2" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            </div>
    );
}

export default BarChartComp