import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options: AuthOptions = {
  providers: [
    GithubProvider({
      profile(profile, tokens) {
        console.log("Profile Github", profile);
        let userRole = "Github User";
        if (profile?.email === "mahmudula2000@gmail.com") {
          userRole = "Admin";
        }
        return {
          ...profile,
          id: profile?.id.toString(),
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      profile(profile, tokens) {
        console.log("Profile Google", profile);
        let userRole = "Google User";
        if (profile?.email === "mahmudula2000@gmail.com") {
          userRole = "Admin";
        }
        return {
          ...profile,
          id: profile?.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
  },
};
