// middleware.ts
// Place this file in the ROOT of your project (same level as package.json)
//
// Middleware in Next.js runs BEFORE a page is loaded.
// It intercepts every request and can decide: allow, redirect, or block.
//
// Our middleware uses the rules from auth.config.ts to protect pages.
// If an artisan tries to visit /artisans/[id] without being logged in,
// this file redirects them to /signin automatically.

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Next.js 16 requires the middleware to be exported as a function
export default function middleware(request: any) {
  return NextAuth(authConfig).auth(request);
}

export const config = {
    // The matcher tells Next.js which URLs to run the middleware on.
    //
    // This pattern means: "run on EVERYTHING except..."
    //   - /api/...           (API routes have their own logic)
    //   - /_next/static/...  (CSS, JS files that Next.js serves itself)
    //   - /_next/image/...   (optimized images)
    //   - Anything ending in .png (image files)
    //
    // In plain terms: run the security check on all pages, skip static assets.
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};