import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null;

                const response = await fetch(`${process.env.API_URL}/api/v1/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    return {
                        id: data._id,      
                        name: data.name,
                        email: data.email,
                        role: data.role, 
                        token: data.token  
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
                token.accessToken = (user as any).token; 
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user._id = token.id as string;
                session.user.role = token.role as string;
                session.user.token = token.accessToken as string;
            }
            return session;
        }
    }
};