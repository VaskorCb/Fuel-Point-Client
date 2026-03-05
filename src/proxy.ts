import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authRoutes = ['/sign-in', '/sign-up', '/forgot-password', '/2fa', '/set-password'];
const alwaysAccessible = ['/logged-out', '/globe-demo', '/landing-preview', '/how-it-works'];

async function tryRefreshToken(refreshToken: string): Promise<string[] | null> {
  try {
    const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (refreshResponse.ok) {
      return refreshResponse.headers.getSetCookie();
    }
  } catch {
    // Refresh failed
  }
  return null;
}

function appendCookies(response: NextResponse, cookies: string[]) {
  cookies.forEach((cookie) => {
    response.headers.append('Set-Cookie', cookie);
  });
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // Always accessible routes (landing page + others)
  if (pathname === '/' || pathname === '' || alwaysAccessible.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Auth routes: redirect back if already authenticated
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    const callbackUrl = request.nextUrl.searchParams.get('callbackUrl') || '/dashboard';

    if (accessToken) {
      return NextResponse.redirect(new URL(callbackUrl, request.url));
    }

    if (refreshToken) {
      const cookies = await tryRefreshToken(refreshToken);
      if (cookies) {
        return appendCookies(NextResponse.redirect(new URL(callbackUrl, request.url)), cookies);
      }
    }

    // /2fa requires email query param (navigated from /forgot-password)
    if (pathname.startsWith('/2fa')) {
      const email = request.nextUrl.searchParams.get('email');
      if (!email) {
        return NextResponse.redirect(new URL('/forgot-password', request.url));
      }
    }

    // /set-password requires email + token query params (navigated from /2fa)
    if (pathname.startsWith('/set-password')) {
      const email = request.nextUrl.searchParams.get('email');
      const token = request.nextUrl.searchParams.get('token');
      if (!email || !token) {
        return NextResponse.redirect(new URL('/forgot-password', request.url));
      }
    }

    return NextResponse.next();
  }

  // --- Protected routes below ---

  if (accessToken) {
    return NextResponse.next();
  }

  if (refreshToken) {
    const cookies = await tryRefreshToken(refreshToken);
    if (cookies) {
      return appendCookies(NextResponse.next(), cookies);
    }
  }

  // Both tokens missing or refresh failed → redirect to sign-in
  const signInUrl = new URL('/sign-in', request.url);
  signInUrl.searchParams.set('callbackUrl', pathname);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets/).*)'],
};
