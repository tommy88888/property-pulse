import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { connectDB } from './config/db';
import User from './models/User';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ profile, user, account }) {
      await connectDB();

      if (!profile) throw new Error('No Profile Found!');
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists && account?.provider !== 'credentials') {
        // const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username: profile.name,
          image: profile.picture,
        });
      }
      return true;
    },
    async session({ token, session }) {
      const user = await User.findOne({ email: session.user.email });

      session.user.id = user._id.toString();
      if (session.user) {
        token.userId = user._id;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      // const { userId } = token;
      // if (!userId) return token;
      // const existingUser = await User.findOne(userId);

      // if (!existingUser) return token;

      // const existingAccount = await getAccountByUserId(
      //   existingUser.id
      // );

      // token.isOAuth = !!existingAccount;
      // token.name = existingUser.name;
      // token.email = existingUser.email;
      // token.role = existingUser.role;
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
});
