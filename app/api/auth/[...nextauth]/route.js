import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { SQLiteAdapter } from "../../../../utils/sqliteAdapter";

const authOptions = {
  providers: [
    EmailProvider({
      // Configura las opciones del proveedor de correo electrónico, como:
      server: process.env.EMAIL_SERVER, // Configura esto en tu archivo .env
      from: process.env.EMAIL_FROM, // Configura esto en tu archivo .env
    })
  ],
  adapter: SQLiteAdapter({
    // Aquí puedes pasar la configuración específica del adaptador si es necesaria
    // como la conexión a tu archivo SQLite o cualquier opción adicional
    database: "./scripts/database.sqlite" // Ruta a tu archivo SQLite
  }),
  // Otras opciones de NextAuth si es necesario
  secret: process.env.NEXTAUTH_SECRET, // Configura tu clave secreta en el archivo .env
};

export async function GET(req, res) {
  const handler = await NextAuth(authOptions);
  return handler(req, res);
}

export async function POST(req, res) {
  const handler = await NextAuth(authOptions);
  return handler(req, res);
}