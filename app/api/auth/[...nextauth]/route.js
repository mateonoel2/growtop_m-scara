import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { getUserByEmail } from "@/utils/sqlite"; // Importa el método específico de SQLite

export const authOptions = {
    providers: [
        EmailProvider({
            async authorize(credentials) {
                // Llama al método `getUserByEmail` para buscar el cliente por correo
                const cliente = await getUserByEmail(credentials.email);
                if (cliente) {
                    return cliente; // Retorna el cliente si existe en la base de datos
                }
                return null; // Retorna null si el cliente no existe
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            // Adjunta la información del cliente a la sesión
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        }
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    }
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);