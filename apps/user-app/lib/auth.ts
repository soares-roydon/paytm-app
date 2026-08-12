import { prisma } from "@repo/db/prismaConfig";
import CredentialsProvider from "next-auth/providers/credentials";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@domain.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        // 1. Check if username exist in db
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
  
          if (!user) {
            return null;
          }
  
          // 2. Check if password is correct
          if (credentials?.password !== user.password) {
            return null;
          }
  
          return {id: user.id, email: user.email};
          
        } catch (e) {
          console.log(e)
          return null
        }
      },
    }),
  ],
  secret: "hklskghe", // process.env.NEXTAUTH_SECRET
  callbacks: {
    session: ({session, token, user}: any) => {
      if(session.user) {
        session.user.id = token.sub
      }

      return session
    }
  }
}