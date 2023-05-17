import {
    CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

import { SerieAirHumidity } from '@/models/air-humidity';

interface GraphicAirHumidityProps {
  intervalTimeHumidity: SerieAirHumidity[]
}

export default function GraphicAirHumidity(props: GraphicAirHumidityProps) {
  return (
    <div className='graphic-humidity'>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart

          data={props.intervalTimeHumidity}
          margin={{
            top: 40,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="humidade(%)" stroke="#8884d8" activeDot={{ r: 8 }}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}