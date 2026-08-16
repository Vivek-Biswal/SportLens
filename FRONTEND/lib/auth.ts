import jwt from 'jsonwebtoken';
import { User } from './db';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'sih25073_default_dev_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export function generateToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string, email: string, role: string };
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  return verifyToken(token);
}
