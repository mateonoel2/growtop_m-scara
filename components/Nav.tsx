"use client";

import Link from "next/link";
import NextLogo from "@/assets/images/next-logo";

const Nav = () => {
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
         <div className="h-7 w-60"> 
            <NextLogo />
          </div>
      </Link>

    </nav>
  );
};

export default Nav;
