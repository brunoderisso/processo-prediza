import { AxiosResponse } from 'axios';

import { api, globals } from '@/environments/environment';
import { BodyAirHumidity } from '@/models/air-humidity';

export default async function serviceAirHumidity(
  start: Date,
  period: number,
  interval: string
): Promise<AxiosResponse<BodyAirHumidity, BodyAirHumidity>> {
  const params = {
    device: globals.deviceId,
    environment: globals.environmentId,
    start: start.getTime(),
    end: new Date(start).setHours(start.getHours() + period),
    group: `time(${interval})`,
    function: 'mean',
    fill: 'none',
  }

  const token = 'Bearer '.concat(localStorage.getItem('token') || '')

  const response = await api.get(
    '/data/timeserie/AirHumidity',
    {
      headers: {
        'Authorization': token
      },
      params,
    },
  );

  return response
}