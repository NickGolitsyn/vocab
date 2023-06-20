'use client'
import React, {useState} from "react";
import signUp from "@/config/auth/signup";
import { useRouter } from 'next/navigation'

function Page() {
  const [displayName, setDisplayName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()
  const [error, setError] = React.useState('')

  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleForm = async (event) => {
    setError('')
    event.preventDefault()

    const { result, error } = await signUp(displayName, email, password);
    console.log(error);

    if (error) {
      console.log(error);
      let formattedError = error.code?.replace('auth/', '').replace(/-/g, ' ')
      let finalError = formattedError?.charAt(0).toUpperCase() + formattedError?.slice(1)
      setError(finalError)
      console.log(error);
      return error
    }

    return router.push("/")
  }
  return (
  <div className="wrapper min-h-screen flex items-center justify-center flex-col">
    {error && <h1>{error}</h1>}
    <div className="form-wrapper bg-fff p-8 rounded-md border border-customGrey max-w-md">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleForm} className="form">
        <label htmlFor="username" className="mb-4 block">
          <p className="text-lg mb-1">Username</p>
          <input
            onChange={(e) => setDisplayName(e.target.value)}
            type="text"
            name="username"
            id="username"
            placeholder="username"
            className="w-full px-4 py-3 rounded-md border border-customGrey focus:outline-none"
          />
        </label>
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
        <label htmlFor="password" className="mb-4 block w-96">
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
        <button type="submit" className="bg-customGrey w-full text-customWhite py-3 px-4 rounded-md hover:bg-opacity-80">
          Sign Up
        </button>
      </form>
    </div>
  </div>
  );
}

export default Page;