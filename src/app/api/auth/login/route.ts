import { NextResponse } from 'next/server';
import { checkAdminCredentials, createAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!checkAdminCredentials(email, password)) {
      return NextResponse.json(
        { error: 'Invalid admin email or password' },
        { status: 401 }
      );
    }

    const token = createAdminToken(email);
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: { email, role: 'admin' },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
