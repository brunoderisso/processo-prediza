import axios from 'axios';

export const globals = {
  environmentId: 'bh4qa6u1ot6rvpvc3vu0',
  deviceId: '3b70e76c1bbe8fd6',
}

export const api = axios.create({
  baseURL: "https://api.prediza.io/api",
})
