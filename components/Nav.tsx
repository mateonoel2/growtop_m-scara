"use client";

import Link from "next/link";
import NextLogo from "@/assets/images/next-logo";
import { signOut, useSession} from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className='flex-between w-full mb-5 py-3'>
      <Link href='/' className='flex gap-2 flex-center max-w-100'>
         <div className="h-7 w-40"> 
            <NextLogo />
          </div>
          <p className='logo_text hover:text-green-400'>Assessment de Competencias</p>
      </Link>
      

      <div>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>

            <button type='button' onClick={(event: React.MouseEvent<HTMLButtonElement>) => signOut()} className='outline_btn hover:text-green-400'>
              Cerrar Sesión
            </button>

          </div>
        ) : (
          <>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
