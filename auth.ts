
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

// User type definition
type DBUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
};

// fetch a user from the database by their email address
async function getUser(email: string): Promise<DBUser | null> {
  try {
    // Artisans (users) ──────────────
    const artisanResult = await sql`SELECT *, 'artisan' as role FROM users WHERE email = ${email}`;
    if (artisanResult.rows.length > 0) {
      return artisanResult.rows[0] as DBUser;
    }

    // Customers
    const customerResult = await sql`SELECT *, 'customer' as role FROM customers WHERE email = ${email}`;
    if (customerResult.rows.length > 0) {
      return customerResult.rows[0] as DBUser;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch user from database:', error);
    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      async authorize(credentials) {
        // Check if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Find the user in the database
        const user = await getUser(email);
        if (!user) {
          return null; // No account with that email
        }

        // Check the password
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          return null; // Password is wrong
        }

        // All good!
        // Return the user object. NextAuth will create a session for them.
        return user;
      },
    }),
    // -----------------------------------------------------------------------
    // FUTURE PROVIDERS: To add Google or Facebook login later, add them here:
    //
    // import Google from 'next-auth/providers/google';
    // Google(),
    //
    // import Facebook from 'next-auth/providers/facebook';
    // Facebook(),
    // -----------------------------------------------------------------------
  ],

  callbacks: {
    
    jwt({ token, user }) {
      // Add the user's ID to the token
      if (user) {
        token.id = user.id;
        token.role = (user as DBUser).role;
      }
      return token;
    },

    session({ session, token }) {
      // Add the user's ID to the session object
      if (token.id) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role; 
      }
      return session;
    },
  },
});