import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
    providers: [
      GoogleProvider({
        // clientId: process.env.GOOGLE_ID,
        // clientSecret: process.env.GOOGLE_SECRET,
        clientId: "829366865983-n1c1aik5adgfde6eie3d5ki7l0ntsgmm.apps.googleusercontent.com",
        clientSecret: "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",
        
      }),
        
    ],
    callbacks: {
      
      async session({ token, session }) {
        if (token) {
          session.user.role = token.role;
        }
        return session;
      },
      async jwt({ token }) {
        const userInDb = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });
        token.role = userInDb?.role;
        return token;
      },
    },
    
    pages: {
      signIn: "/login",
      error:"/login"
    },
    
  };

export const getAuthSession = () => getServerSession(authOptions);
