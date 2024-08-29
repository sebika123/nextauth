

import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import ZohoProvider from 'next-auth/providers/zoho';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'select_account', 
        },
      },
    }),
    ZohoProvider({
      clientId: process.env.ZOHO_CLIENT_ID,
      clientSecret: process.env.ZOHO_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB(); // Ensure MongoDB connection is established
          const user = await User.findOne({ email });

          if (!user) {
            return null; // Return null if user is not found
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null; // Return null if password does not match
          }

          return user; // Return user if credentials are valid
        } catch (error) {
          console.error('Error during authorization:', error);
          return null; // Return null in case of error
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        console.log('Access Token:', account.access_token);
        console.log('Refresh Token:', account.refresh_token);
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        console.log('acess',token.accessToken );
        console.log('refresh token',token.refreshToken );
      }
      return token;
    },
    async session({ session, token }) {

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
