import { AxiosResponse } from 'axios';
import { useState } from 'react';

import { BodyAirHumidity, SerieAirHumidity } from '@/models/air-humidity';
import serviceAirHumidity from '@/services/air-humidity.service';
import { Card, Typography } from '@mui/material';

import FilterAirHumidity from './filter-air-humidity';
import GraphicAirHumidity from './graphic-air-humidity';

export default function AirHumidity() {
  const [date, setDate] = useState<Date | null>(null)
  const [period, setPeriod] = useState<number>(3)
  const [interval, setInterval] = useState<string>('5m')
  const [intervalTimeHumidity, setIntervalTimeHumidity] = useState<SerieAirHumidity[]>([])
  const [minMaxHumidity, setMinMaxHumidity] = useState<any>(null)

  let responseAirHumidity: AxiosResponse<BodyAirHumidity, BodyAirHumidity>

  function getDate(value: Date | null) {
    setDate(value)
  }

  function getPeriod(value: number) {
    setPeriod(value)
  }

  function getInterval(value: string) {
    setInterval(value)
  }

  async function requestAirHumidity() {
    if (date && !isNaN(date.getTime())) {
      responseAirHumidity = await serviceAirHumidity(date, period, interval)

      if (responseAirHumidity.data?.serie.length > 0) {
        setMinMaxHumidity({
          min: responseAirHumidity.data.min,
          max: responseAirHumidity.data.max,
        })
        setIntervalTimeHumidity(responseAirHumidity.data.serie.map(serie => {
          const dateFormat = new Date(serie.time)

          return {
            time: dateFormat.getDate() + "/" +
              (dateFormat.getMonth() + 1) + "/" +
              dateFormat.getFullYear() + " " +
              String(dateFormat.getHours()).padStart(2, '0') + ":" +
              String(dateFormat.getMinutes()).padStart(2, '0'),
            'humidade(%)': serie.value,
          }
        }))
      } else {
        setIntervalTimeHumidity([])
      }
    }
  }

  return (
    <div className='content-humidity'>
      <FilterAirHumidity
        requestAirHumidity={requestAirHumidity}
        date={date}
        getDate={getDate}
        period={period}
        getPeriod={getPeriod}
        interval={interval}
        getInterval={getInterval}
      />
      {intervalTimeHumidity.length > 0
        ? (
          <div className='result-humidity'>
            <Card className='prop-card' variant="outlined">
              <Typography variant="h6" component="div">
                Humidade do Ar
              </Typography>
              <Typography variant="body2">
                Mín.: { minMaxHumidity.min }
              </Typography>
              <Typography variant="body2">
                Máx.: { minMaxHumidity.max }
              </Typography>
            </Card>
            <GraphicAirHumidity intervalTimeHumidity={intervalTimeHumidity}/>
          </div>
        )
        : ( <div></div> )}
    </div>
  )
}