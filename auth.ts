
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
};

// fetch a user from the database by their email address
async function getUser(email: string): Promise<DBUser | null> {
  try {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    return (result.rows[0] as DBUser) || null;
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
    // These two callbacks ensure the artisan's database ID is stored in
    // their session token and accessible as session.user.id
    //
    // Why do we need this?
    // By default, NextAuth only puts name, email, and image in the session.
    // We need the ID so that on the profile page we can check:
    // "Is the logged-in person the owner of THIS profile?"

    jwt({ token, user }) {
      // When the user first logs in, 'user' is available — store their ID
      if (user) token.id = user.id;
      return token;
    },

    session({ session, token }) {
      // On every request, put the ID from the token into the session object
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },
});