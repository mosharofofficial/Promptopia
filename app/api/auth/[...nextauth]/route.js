import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Your Email",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
        
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        return true;
      },
    }),
  ],
  //   async session({ session }) {},
  //   async signIn({ profile }) {
  //     try {
  //       await connectToDB();

  //       const userExists = await User.findOne({
  //         email: profile.email,
  //       });

  //       if (!userExists) {
  //         await User.create({
  //           email: profile.email,
  //           username: profile.name.replace(" ", "").toLowerCase(),
  //           image: profile.picture,
  //         });
  //       }

  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   },
});

export { handler as GET, handler as POST };
