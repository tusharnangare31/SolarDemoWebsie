import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session');

    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in and visiting /admin/login, redirect to /admin
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session');
    if (sessionCookie && sessionCookie.value) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Demo Read-Only Protection: Simulate mutations safely without modifying live data
  // Set NEXT_PUBLIC_DEMO_MODE=false in environment to enable real writes when handed over to shop owner
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';
  if (isDemoMode && pathname.startsWith('/api/')) {
    const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
    const isAuthRoute = pathname.startsWith('/api/auth/');
    const isPublicLeadSubmit = pathname === '/api/leads' && method === 'POST';

    // Allow login/logout and public quote inquiry submissions
    if (isMutation && !isAuthRoute && !isPublicLeadSubmit) {
      return NextResponse.json(
        {
          success: true,
          demo: true,
          message: 'Demo Mode Activated: Changes simulated in preview mode!',
        },
        { status: 200 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
