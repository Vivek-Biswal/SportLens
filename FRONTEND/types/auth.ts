export interface User { id: string; name: string; email: string; role: 'ATHLETE' | 'COACH'; }
export interface AuthResponse { user: User; token: string; }
