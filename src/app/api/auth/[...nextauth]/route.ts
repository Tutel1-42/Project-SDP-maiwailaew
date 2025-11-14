import NextAuth from "next-auth"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { dbConnect } from "@/db/dbConnect"
import User from "@/db/models/User"
import bcrypt from "bcryptjs" 

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@test.com" },
                password: { label: "Password", type: "password" }
            },
            
            async authorize(credentials, req) {
                if (!credentials) return null;
                await dbConnect();

                const user = await User.findOne({ email: credentials.email }).select('+password');

                if (!user) {
                    return null;
                }

                // compare password
                const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

                if (isPasswordMatch) {
                    // Passwords match
                    return { 
                        id: user._id.toString(),
                        email: user.email, 
                        name: user.name,
                        role: user.role
                    };
                } else {
                    return null;
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user._id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };