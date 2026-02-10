import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { users, roles, rolesUsers } from "@/db/schema";
import { eq, or, ilike } from "drizzle-orm";

async function getUser(identifier: string) {
  try {
    // Try to find user by email first, then by firstName (username)
    const user = await db.query.users.findFirst({
      where: or(
        eq(users.email, identifier),
        ilike(users.firstName, identifier),
      ),
      with: {
        rolesUsers: {
          with: {
            role: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        identifier: { label: "Email or Username" },
        password: { label: "Password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            identifier: z.string().min(1, "Email or username is required"),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { identifier, password } = parsedCredentials.data;
          
          const user = await getUser(identifier);
          if (!user) return null;
          if (!user.isActive) return null;
          
          const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
          if (passwordsMatch) {
            const roleName = user.rolesUsers[0]?.role.name || 'customer';
            
            return {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              image: user.avatarUrl,
              role: roleName,
            };
          }
        }
        
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
