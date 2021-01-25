import axios from 'axios';

const client = axios.create({
  baseURL: 'http://locahost:8000/api/v1',
  timeout: 1000,
  headers: {
    'x-api-key': 'ak_55174b5c-2bf9-4988-b7ce-40c82cafe7f7',
    'super-api-key': 'sak_e5990e63-759b-48e1-a2f9-0db416ae3703',
  },
});

export default client;
