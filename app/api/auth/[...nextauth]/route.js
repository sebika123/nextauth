import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
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
          prompt:"consent",
          // GitHub does not have `prompt` parameter, but this ensures a fresh login prompt
          // allow_signup: 'false', // This will force GitHub to show the login screen every time
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'select_account', // Ensure Google shows account selection
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
  // callbacks: {
  //   async signIn({ user }) {
  //     // Optional: Add custom logic for sign-in
  //     return true; // Return true to allow sign-in
  //   },
  //   async redirect({ url, baseUrl }) {
  //     // Redirect to a specific URL after sign-in
  //     return url.startsWith(baseUrl) ? url : baseUrl;
  //   },
  //   async session({ session, token }) {
  //     // Optional: Add custom logic for session management
  //     return session; // Return the session object
  //   },
  // },


  // callbacks: {
  //   async signIn({ user }) {
  //     let isAllowedToSignIn = true
  //     const allowedUser = [
  //       'Sebika123',
  //     ];
  //     console.log(user);
  //     if (allowedUser.includes(String(user.id))) {
  //       isAllowedToSignIn = true
  //     }
  //     else {
  //       isAllowedToSignIn = false

  //     }
  //     return isAllowedToSignIn
  //   }
  // },
  secret: process.env.NEXTAUTH_SECRET, // Secret for encryption
  pages: {
    signIn: '/', // Custom sign-in page route
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
