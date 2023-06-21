'use client'
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { signOut } from 'firebase/auth';
import Link from "next/link";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext()
  const date = new Date()
  const router = useRouter();
  const dateURL = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`

  const handleLogout = () => {
    setIsOpen(!isOpen);
    signOut(auth)
      .then(() => {

      })
      .catch((error) => {
        console.log(error);
      })
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="block sticky z-10 sm:hidden"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute bg-fff/50 backdrop-blur top-0 left-0 w-screen h-screen">
          <div className="flex flex-col justify-around h-full">
            <div className="flex flex-col items-center">
              <Link onClick={() => toggleMenu()} className="my-3" href={`/wod/${dateURL}`}>WOD</Link>
              <Link onClick={() => toggleMenu()} className="my-3" href={"/learn"}>Learn</Link>
            </div>
            <div className="flex flex-col items-center">
              {user?.displayName && <h1 className="my-3">{user?.displayName}</h1>}
              {!user?.displayName && <h1 className="my-3">{user?.email}</h1>}
              {/* <div className="rounded-full overflow-hidden w-fit">
                <Image 
                  src="/pic.jpeg"
                  width={40}
                  height={40} 
                  alt={""}
                />
              </div> */}
              {user ? 
                <button className="py-3 px-4 rounded-md bg-customGrey hover:opacity-90 transition text-customWhite" onClick={() => (handleLogout())}>Log Out</button> : 
                (
                  <div className="flex flex-col">
                    <Link onClick={() => toggleMenu()} className="py-3 px-4 my-3 rounded-md bg-fff hover:opacity-90 transition" href={"/signin"}>Sign In</Link>
                    <Link onClick={() => toggleMenu()} className="py-3 px-4 my-3 rounded-md bg-customGrey hover:opacity-90 transition text-customWhite" href={"/signup"}>Sign Up</Link>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
