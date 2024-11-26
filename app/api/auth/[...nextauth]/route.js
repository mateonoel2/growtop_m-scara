import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { TypeORMAdapter } from "@next-auth/typeorm-legacy-adapter";
import { ServerClient } from "postmark";

// Configuración de Postmark
const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

// Función personalizada para enviar el correo de verificación
async function sendVerificationRequest({ identifier, url, provider }) {
  const { from } = provider;

  await client.sendEmail({
    From: from,
    To: identifier,
    Subject: "Inicia sesión en tu cuenta",
    TextBody: `Hola,\n\nInicia sesión en tu cuenta de Growtop usando el siguiente enlace:\n\n${url}\n\nSi no solicitaste este correo, ignóralo.\n\nGracias,\nEl equipo de Growtop`,
    HtmlBody: `<p>Hola,</p>
               <p>Inicia sesión en tu cuenta de Growtop usando el siguiente enlace:</p>
               <p><a href="${url}">Iniciar sesión</a></p>
               <p>Si no solicitaste este correo, ignóralo.</p>
               <p>Gracias,<br>El equipo de Growtop</p>`,
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
  adapter: TypeORMAdapter({
    type: "mysql",
    host: "localhost",
    port: 3309, // Cambia si usas un puerto diferente
    username: "root", // Cambia según tu configuración
    password: "", // Contraseña de la base de datos
    database: "growtop_db", // Nombre de tu base de datos
    synchronize: true, // Cambia a false en producción
  }),
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

// Exporta la configuración para las rutas GET y POST
export default async function handler(req, res) {
  return NextAuth(req, res, authOptions);
}