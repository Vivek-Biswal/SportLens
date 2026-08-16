import { useState, useEffect } from 'react';
import { User } from '../types/auth';
export function useAuth() { const [user, setUser] = useState<User | null>(null); return { user, loading: false, logout: () => {} }; }
