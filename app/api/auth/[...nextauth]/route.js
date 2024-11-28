import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/utils/mongodb";
import EmailProvider from "next-auth/providers/email";

// Configuración de NextAuth
const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER, // smtp.postmarkapp.com
        port: 25, // O prueba con 25
        auth: {
          user: process.env.EMAIL_FROM, // app@growtop.pe
          pass: process.env.POSTMARK_API_KEY, // POSTMARK_API_TEST o tu API Key real
        },
      },      
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    async signIn({ user }) {
      const db = await clientPromise;
      const collection = db.db("growtopdb").collection("assessments"); // Cambiado de "users" a "assessments"
  
      const allowedEmail = await collection.findOne({ correo: user.email }); // Cambiado "email" a "correo"
      if (!allowedEmail) {
        throw new Error("No cuentas con cuenta de Growtop.");
      }
      return true;
    },
  },  
  debug: true, // Habilita logs para depuración
};

// Exporta métodos específicos
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);