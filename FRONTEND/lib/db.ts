import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'ATHLETE' | 'COACH';
  createdAt: string;
}

const DB_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DB_DIR, 'users.json');

// Ensure DB directory and file exist
function initDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([]));
  }
}

function readUsers(): User[] {
  initDb();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeUsers(users: User[]) {
  initDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
}

export const VALID_ROLES = ['ATHLETE', 'COACH'];

export function findByEmail(email: string): User | undefined {
  const users = readUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function findById(id: string): User | undefined {
  const users = readUsers();
  return users.find(u => u.id === id);
}

export function createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
  const users = readUsers();
  const newUser: User = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    ...userData,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  writeUsers(users);
  return newUser;
}

export function toSafeObject(user: User) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
