import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    
    pages: {
        signIn: '/signin',
    },

    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            const isProtectedPage =
                nextUrl.pathname.startsWith('/dashboard');
                
                const isOnRegister = nextUrl.pathname === '/register';
                const isOnSignIn = nextUrl.pathname === '/signin';
            if (isProtectedPage) {
                if (isLoggedIn) return true;
                return false;
            }

            if (isOnSignIn && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            if (isOnRegister && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }


            return true;
        },
        
        async signIn({ user, account, profile }) {
            return true;
        },
        
        async redirect({ url, baseUrl }) {
            // If the url is relative, prepend the base url
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // If the url is on the same domain, allow it
            else if (new URL(url).origin === baseUrl) return url;
            // Default to home page
            return baseUrl;
        },
    },

    providers: [],
} satisfies NextAuthConfig;