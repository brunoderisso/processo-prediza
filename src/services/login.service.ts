import { api } from '@/environments/environment';
import BodyLogin from '@/models/login';

export default async function serviceLogin(body: BodyLogin) {
  const response = await api.post('/login', {
    username: body.username,
    password: body.password,
  });

  return response.data.token
}