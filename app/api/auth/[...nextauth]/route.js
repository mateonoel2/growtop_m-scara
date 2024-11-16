import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { SQLiteAdapter } from "../../../../utils/sqliteAdapter";
import { ServerClient } from "postmark";

// Configuración dinámica del cliente de Postmark
const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

// Configurar la función de envío de correos con Postmark
async function sendVerificationRequest({ identifier, url, provider }) {
  const { from } = provider;
  try {
    await client.sendEmail({
      From: from,
      To: identifier,
      Subject: "Inicia sesión en tu cuenta",
      TextBody: `Inicia sesión en tu cuenta de Growtop usando el siguiente enlace:\n\n${url}\n\nEste enlace es válido solo por unos minutos.`,
    });
    console.log(`Correo enviado a ${identifier}`);
  } catch (error) {
    console.error(`Error al enviar correo a ${identifier}:`, error);
    throw new Error("No se pudo enviar el correo de verificación.");
  }
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
