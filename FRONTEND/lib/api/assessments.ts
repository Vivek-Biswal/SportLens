import { fetchClient } from './client';

export const assessmentsApi = {
  createAssessment: (data: any) => fetchClient('/assessments', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getAssessments: () => fetchClient('/assessments', {
    method: 'GET'
  }),
  getAssessmentById: (id: string) => fetchClient(`/assessments/${id}`, {
    method: 'GET'
  }),
  addAttempt: (id: string, data: any) => fetchClient(`/assessments/${id}/attempt`, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateConditions: (id: string, data: any) => fetchClient(`/assessments/${id}/conditions`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  getConditions: (id: string) => fetchClient(`/assessments/${id}/conditions`, {
    method: 'GET'
  })
};
