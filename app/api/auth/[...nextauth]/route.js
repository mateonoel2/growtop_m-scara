import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from "@/utils/mongodb"
import EmailProvider from "next-auth/providers/email"
import { MyVerificationRequest } from '@/myVerificationRequest';

 const handler = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        EmailProvider({
            id: 'email',
            name: 'email',
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            sendVerificationRequest({identifier, url, provider,
            }) {
              MyVerificationRequest({identifier, url, provider})
            },
          }),
    ],
    callbacks: {
      async session({ session, user }) {
        session.user.id = user.id;
        session.user.email = user.email;
  
        return session;
      },
      async signIn({ user }) {
        const db = await clientPromise;
        const collection = db.db("test").collection('users');
        
        const allowedEmail = await collection.findOne({ email: user.email });
  
        if (!allowedEmail) {
          return Promise.reject(new Error('No cuentas con cuenta de growtop.'));
        }
  
        return Promise.resolve(true);
      },
    }
  })
  
  export { handler as GET, handler as POST }