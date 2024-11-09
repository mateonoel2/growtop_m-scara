import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../../utils/prisma.js';

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id;
            session.user.email = user.email;
            return session;
        },
        async signIn({ user }) {
            const cliente = await prisma.clientes.findUnique({
                where: { correo: user.email },
            });
            return cliente !== null;
        },
    },
});

export { handler as GET, handler as POST };