import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findByEmail, createUser, VALID_ROLES } from '@/lib/db';
import { generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';

const BCRYPT_SALT_ROUNDS = 12;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
    }

    const normalizedRole = role.toUpperCase();
    if (!VALID_ROLES.includes(normalizedRole)) {
      return NextResponse.json({ success: false, message: `Role must be one of: ${VALID_ROLES.join(', ')}.` }, { status: 400 });
    }

    const existing = findByEmail(email);
    if (existing) {
      return NextResponse.json({ success: false, message: 'An account with this email already exists.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    
    const user = createUser({
      name,
      email,
      passwordHash,
      role: normalizedRole as 'ATHLETE' | 'COACH'
    });

    const token = generateToken(user);
    const { passwordHash: _, ...safeUser } = user;

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return NextResponse.json({
      success: true,
      message: 'User registered successfully.',
      user: safeUser,
      token
    }, { status: 201 });

  } catch (error) {
    console.error('[Auth Register Error]', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
