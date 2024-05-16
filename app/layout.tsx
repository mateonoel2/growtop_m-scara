import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Provider  from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plataforma Growtop",
  description: "by Growtop",
};

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => (
  <html lang='en'>
    <body>
      <Provider session={undefined}>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;