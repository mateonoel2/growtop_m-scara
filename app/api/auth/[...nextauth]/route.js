import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { SQLiteAdapter } from "../../../../utils/sqliteAdapter";
import { ServerClient } from 'postmark'; // Importa ServerClient de postmark directamente

// Configurar el cliente de Postmark
const client = new ServerClient("POSTMARK_API_TEST"); // Utiliza directamente ServerClient

// Configurar la función de envío de correos con Postmark
async function sendVerificationRequest({ identifier, url, provider }) {
  const { from } = provider;
  await client.sendEmail({
    From: from,
    To: identifier,
    Subject: "Inicia sesión en tu cuenta",
    TextBody: `Inicia sesión en tu cuenta de Growtop usando el siguiente enlace:\n\n${url}\n\nEste enlace es válido solo por unos minutos.`,
  });
}

const authOptions = {
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  adapter: SQLiteAdapter(),
  secret: process.env.NEXTAUTH_SECRET,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);