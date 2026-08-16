import { fetchClient } from './client';

export const athletesApi = {
  createProfile: (data: any) => fetchClient('/athletes', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getDirectory: () => fetchClient('/athletes', {
    method: 'GET'
  }),
  getProfile: (id: string) => fetchClient(`/athletes/${id}`, {
    method: 'GET'
  }),
  getResults: (id: string) => fetchClient(`/athletes/${id}/results`, {
    method: 'GET'
  }),
  getPerformanceProfile: (id: string) => fetchClient(`/athletes/${id}/profile`, {
    method: 'GET'
  }),
  getHistory: (id: string) => fetchClient(`/athletes/${id}/history`, {
    method: 'GET'
  })
};
