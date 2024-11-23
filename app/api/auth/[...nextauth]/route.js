// import NextAuth from "next-auth";
// import EmailProvider from "next-auth/providers/email";
// import { SQLiteAdapter } from "../../../../utils/sqliteAdapter";
// import { ServerClient } from "postmark";

// // Configuración del cliente de Postmark
// const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

// // Función personalizada para enviar el correo de verificación
// async function sendVerificationRequest({ identifier, url, provider }) {
//   const { from } = provider;

//   const urlWithCallback = `${url}&callbackUrl=${encodeURIComponent(
//     process.env.NEXTAUTH_URL || "http://localhost:3000"
//   )}`;  

//   try {
//     // Enviar correo con Postmark
//     await client.sendEmail({
//       From: from,
//       To: identifier,
//       Subject: "Inicia sesión en tu cuenta",
//       TextBody: `Hola,\n\nInicia sesión en tu cuenta de Growtop usando el siguiente enlace:\n\n${url}\n\nEste enlace es válido solo por unos minutos. Si no solicitaste este correo, ignóralo.\n\nGracias,\nEl equipo de Growtop`,
//       HtmlBody: `<p>Hola,</p>
//                  <p>Inicia sesión en tu cuenta de Growtop usando el siguiente enlace:</p>
//                  <p><a href="${url}">Iniciar sesión</a></p>
//                  <p>Este enlace es válido solo por unos minutos. Si no solicitaste este correo, ignóralo.</p>
//                  <p>Gracias,<br>El equipo de Growtop</p>`,
//     });
//     console.log(`Correo enviado correctamente a: ${identifier}`);
//   } catch (error) {
//     console.error(`Error al enviar correo a ${identifier}:`, error);
//     throw new Error("No se pudo enviar el correo de verificación.");
//   }
// }

// const authOptions = {
//   providers: [
//     EmailProvider({
//       from: process.env.EMAIL_FROM,
//       maxAge: 60 * 60, // 1 hora
//       sendVerificationRequest,
//     })    
//   ],
//   adapter: SQLiteAdapter(), // Adaptador SQLite para manejar los tokens
//   secret: process.env.NEXTAUTH_SECRET, // Asegúrate de que la variable de entorno esté configurada
//   callbacks: {
//     async session({ session, user }) {
//       // Incluye el ID del usuario en la sesión
//       if (user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//     async signIn({ user, account, email, credentials }) {
//       if (!email?.verificationRequest) {
//         console.log("Intento de inicio de sesión no válido.");
//         return false;
//       }
//       return true;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin", // Página personalizada de inicio de sesión
//     verifyRequest: "/auth/verify-request", // Página de verificación personalizada
//     error: "/auth/error", // Página de error
//   },
//   debug: true, // Habilita para ver logs detallados en desarrollo
// };

// export const GET = NextAuth(authOptions);
// export const POST = NextAuth(authOptions);

import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { SQLiteAdapter } from "../../../../utils/sqliteAdapter"; // Asegúrate de que esta ruta sea válida
import { ServerClient } from "postmark";

// Configuración de Postmark
const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

// Función personalizada para enviar el correo de verificación
async function sendVerificationRequest({ identifier, url, provider }) {
  const { from } = provider;

  try {
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
    console.log(`Correo enviado correctamente a: ${identifier}`);
  } catch (error) {
    console.error(`Error al enviar correo a ${identifier}:`, error);
    throw new Error("No se pudo enviar el correo de verificación.");
  }
}

// Opciones de autenticación
const authOptions = {
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  adapter: SQLiteAdapter(),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl; // Asegúrate de redirigir siempre al dominio base
    },
  },
  debug: true, // Habilita logs de debugging
};

// Exporta las rutas GET y POST para NextAuth
export const GET = async (req, res) => {
  return NextAuth(req, res, authOptions);
};

export const POST = async (req, res) => {
  return NextAuth(req, res, authOptions);
};