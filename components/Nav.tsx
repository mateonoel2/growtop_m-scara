"use client";

import Link from "next/link";
import NextLogo from "@/assets/images/next-logo";
import { signOut, useSession} from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center max-w-40'>
         <div className="h-7 w-40"> 
            <NextLogo />
          </div>
      </Link>

      <div>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>

            <button type='button' onClick={(event: React.MouseEvent<HTMLButtonElement>) => signOut()} className='outline_btn'>
              Sign Out
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
