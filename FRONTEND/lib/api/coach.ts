import { fetchClient } from './client';

export const coachApi = {
  getDashboard: () => fetchClient('/coach/dashboard', {
    method: 'GET'
  }),
  getAthletesDirectory: (params?: Record<string, string>) => {
    const query = new URLSearchParams(params || {}).toString();
    return fetchClient(`/coach/athletes${query ? `?${query}` : ''}`, {
      method: 'GET'
    });
  },
  getAthleteProfile: (id: string) => fetchClient(`/coach/athletes/${id}`, {
    method: 'GET'
  }),
  getShortlist: (params?: Record<string, string>) => {
    const query = new URLSearchParams(params || {}).toString();
    return fetchClient(`/coach/shortlist${query ? `?${query}` : ''}`, {
      method: 'GET'
    });
  },
  addAthleteToShortlist: (data: { athleteId: string }) => fetchClient('/coach/shortlist', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  removeAthleteFromShortlist: (id: string) => fetchClient(`/coach/shortlist/${id}`, {
    method: 'DELETE'
  })
};
