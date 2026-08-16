export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export async function fetchClient(endpoint: string, options: RequestInit = {}) {
  // Try to get token from localStorage if in browser environment
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    const errObj: any = new Error(error.message || `API error: ${res.status}`);
    errObj.details = error.details;
    throw errObj;
  }
  
  // Some endpoints like /logout might return 204 or empty
  if (res.status === 204) return null;
  
  return res.json();
}