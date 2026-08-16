import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findByEmail } from '@/lib/db';
import { generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 });
    }

    const user = findByEmail(email);
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
    }

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
      message: 'Login successful.',
      user: safeUser,
      token
    }, { status: 200 });

  } catch (error) {
    console.error('[Auth Login Error]', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
