import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { CustomAdapter } from "../../../../lib/custom-adapter";
import { ServerClient } from 'postmark';

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

async function sendVerificationRequest({ identifier, url, provider }) {
  const { from } = provider;
  await client.sendEmail({
    From: from,
    To: identifier,
    Subject: 'Inicia sesión en tu cuenta',
    TextBody: `Hola,\n\nInicia sesión en tu cuenta de Growtop usando el siguiente enlace:\n\n${url}\n\nSi no solicitaste este correo, ignóralo.\n\nGracias,\nEl equipo de Growtop`,
    HtmlBody: `<p>Hola,</p><p>Inicia sesión en tu cuenta de Growtop usando el siguiente enlace:</p><p><a href="${url}">Iniciar sesión</a></p><p>Si no solicitaste este correo, ignóralo.</p><p>Gracias,<br>El equipo de Growtop</p>`,
  });
}

// Configuración de NextAuth
const authOptions = {
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  adapter: CustomAdapter(), // Usamos el adaptador personalizado aquí
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  debug: true,
};

// Exporta los métodos HTTP requeridos por Next.js
export async function POST(req, res) {
  return await NextAuth(req, res, authOptions);
}

export async function GET(req, res) {
  return await NextAuth(req, res, authOptions);
}