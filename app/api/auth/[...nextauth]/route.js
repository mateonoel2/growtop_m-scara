import NextAuth from 'next-auth';
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/utils/prisma";

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
          try {
              const [rows] = await pool.query("SELECT * FROM clientes WHERE correo = ?", [user.email]);
      
              if (!rows || rows.length === 0) {
                  return Promise.reject(new Error('No cuentas con cuenta de growtop.'));
              }
              return Promise.resolve(true);
          } catch (error) {
              console.error("Error en la verificación de correo:", error);
              return Promise.reject(new Error('Error al conectarse a la base de datos.'));
          }
      }      
    },
});

export { handler as GET, handler as POST };

// import NextAuth from 'next-auth';
// import EmailProvider from "next-auth/providers/email";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/utils/prisma"; // Importa Prisma correctamente

// const handler = NextAuth({
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         EmailProvider({
//             id: 'email',
//             name: 'email',
//             server: process.env.EMAIL_SERVER,
//             from: process.env.EMAIL_FROM,
//             sendVerificationRequest({ identifier, url, provider }) {
//                 MyVerificationRequest({ identifier, url, provider });
//             },
//         }),
//     ],
//     callbacks: {
//         async session({ session, user }) {
//           if (user) {
//               session.user.id = user.id;
//               session.user.email = user.email;
//           }
//           return session;
//         },
    //     async signIn({ user }) {
    //       try {
    //           const [rows] = await pool.query("SELECT * FROM clientes WHERE correo = ?", [user.email]);
      
    //           if (!rows || rows.length === 0) {
    //               return Promise.reject(new Error('No cuentas con cuenta de growtop.'));
    //           }
    //           return Promise.resolve(true);
    //       } catch (error) {
    //           console.error("Error en la verificación de correo:", error);
    //           return Promise.reject(new Error('Error al conectarse a la base de datos.'));
    //       }
    //   }      
    // }
// });

// export { handler as GET, handler as POST };