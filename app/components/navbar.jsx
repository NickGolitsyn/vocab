import { useAuthContext } from "@/context/AuthContext"
import Image from "next/image"
import Link from "next/link"
import { auth } from "@/config/firebase";
import { signOut } from 'firebase/auth';
import { useEffect, useState } from "react";
import HamburgerMenu from './hamburgerMenu'

export default function Navbar() { 
  const { user } = useAuthContext()
  const date = new Date()
  const dateURL = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
  const handleLogout = () => {
    signOut(auth)
      .then(() => {

      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <div className="flex items-center justify-between">
    <div className="flex justify-between my-5 w-full">
      <div className="flex items-center">
        <Link href={"/"}>
          <h1 className="text-4xl font-bold">Vocab.</h1>
        </Link>
        <div className="ml-10 hidden sm:block">
          {/* <Link className="mx-5" href={`/wod?date=${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}>WOD</Link> */}
          <Link className="mx-5" href={`/wod/${dateURL}`}>WOD</Link>
          <Link className="mx-5" href={"/learn"}>Learn</Link>
        </div>
      </div>
      <div className="items-center hidden sm:flex">
        {/* <h1 className="mr-5">en</h1> */}
        {user?.displayName && <Link className="mr-5" href={"/profile"}>{user?.displayName}</Link>}
        {!user?.displayName && <Link className="mr-5" href={"/profile"}>{user?.email}</Link>}
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
            <div>
              <Link className="py-3 px-4 rounded-md bg-fff hover:opacity-90 transition" href={"/signin"}>Sign In</Link>
              <Link className="py-3 px-4 rounded-md bg-customGrey hover:opacity-90 transition text-customWhite ml-4" href={"/signup"}>Sign Up</Link>
              {user?.email == 'golitsynnick@gmail.com' ? <Link className="py-3 px-4 rounded-md bg-customGrey hover:opacity-90 transition text-customWhite ml-4" href={"/admin"}>Admin</Link> : ''}
            </div>
          )
        }
      </div>
      {/* <div className="flex justify-between my-5"> */}
        {/* <div className="flex items-center"> */}
        {/* </div> */}
      {/* </div> */}
    </div>
    <HamburgerMenu />
    </div>
  )
}
