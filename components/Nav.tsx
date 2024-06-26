"use client";

import Link from "next/link";
import GrowtopLogo from "@/assets/images/growtop-logo.svg";
import Image from "next/image";
import { signOut, useSession} from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className='flex-between w-full mb-5 py-3'>
      <Link href='/' className='flex gap-2 flex-center max-w-100'>
        <Image alt='logo' src={GrowtopLogo} className="h-7 w-40" /> 
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
