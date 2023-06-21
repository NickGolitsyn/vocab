'use client'
import React from "react";
import signIn from "@/config/auth/signin";
import { useRouter } from 'next/navigation'
import Link from "next/link";

function Page() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const router = useRouter()

  const handleForm = async (event) => {
    event.preventDefault()

    const { result, error } = await signIn(email, password);

    if (error) {
      let formattedError = error.code.replace('auth/', '').replace(/-/g, ' ')
      let finalError = formattedError.charAt(0).toUpperCase() + formattedError.slice(1)
      setError(finalError)
      return error
    }

    return router.push("/")
  }
  return (
    <div className="wrapper min-h-screen flex items-center justify-center flex-col">
      {error && (
        <div className="bg-redError p-3 rounded-md mb-4">
          <h1 className="text-customWhite">{error}</h1>
        </div>
      )}
      <div className="form-wrapper bg-fff p-8 rounded-md border border-customGrey max-w-sm md:max-w-md">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email" className="mb-4 block">
            <p className="text-lg mb-1">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="w-full px-4 py-3 rounded-md border border-customGrey focus:outline-none"
            />
          </label>
          <label htmlFor="password" className="mb-4 block">
            <p className="text-lg mb-1">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="w-full px-4 py-3 rounded-md border border-customGrey focus:outline-none"
            />
          </label>
          {/* <Link className="mb-4 block underline" href={"/forgotpassword"}>Forgot password?</Link> */}
          <span className="mr-1 inline-block">
            Don't have an account?
          </span>
          <Link className="mb-4 inline-block underline" href={"/signup"}>Sign up</Link>
          <button type="submit" className="bg-customGrey w-full text-customWhite py-3 px-4 rounded-md hover:bg-opacity-80">
            Sign In
          </button>
        </form>
      </div>
    </div>  
  );
}

export default Page;