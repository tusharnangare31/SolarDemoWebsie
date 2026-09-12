import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'admin_session';

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@suntechsolar.in';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export function checkAdminCredentials(email: string, pass: string): boolean {
  return email.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() && pass === DEFAULT_ADMIN_PASSWORD;
}

export function createAdminToken(email: string): string {
  const payload = {
    email,
    role: 'admin',
    iat: Date.now(),
  };
  // Base64 encoded JSON token for simple session
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function verifyAdminToken(token: string): boolean {
  try {
    const json = Buffer.from(token, 'base64').toString('utf-8');
    const payload = JSON.parse(json);
    return payload && payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  if (!session || !session.value) return false;
  return verifyAdminToken(session.value);
}
