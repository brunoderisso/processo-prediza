import { AxiosResponse } from 'axios';

import { api, globals } from '@/environments/environment';
import { LocationPoint } from '@/models/map';

export default async function serviceMap(): Promise<AxiosResponse<LocationPoint[], LocationPoint[]>> {
  const token = 'Bearer '.concat(localStorage.getItem('token') || '')

  const response = await api.get(
    `/account/environment/${globals.environmentId}/polygon/`,
    {
      headers: {
        'Authorization': token
      },
    },
  );

  return response
}