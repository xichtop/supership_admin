import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartCustom = (props) => {

    const data = props.data;
    return (
        <div className="chart__body__item__chart">
            <ResponsiveContainer width="95%" height="80%">
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
                    <XAxis dataKey="OrderDate" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="COD" stroke="#FF8042" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Fee" stroke="#112d4e" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineChartCustom;