import { fetchClient } from './client';

export const authApi = {
  login: (data: any) => fetchClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  register: (data: any) => fetchClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  me: () => fetchClient('/auth/me', {
    method: 'GET'
  }),
  logout: () => fetchClient('/auth/logout', {
    method: 'POST'
  })
};
