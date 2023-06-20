'use client'
import { useState } from "react"
import { useRef } from "react"
import { useAuth } from '../../context/AuthContext'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
  
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
  
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.log(emailRef.current.value, passwordRef.current.value);
      console.log(error);
      setError('Failed to create an account');
    }
  
    setLoading(false);
  }

  return (
    <div>
      <div>
        <h2>Sign Up</h2>
        {currentUser && currentUser.email}
        {error && <h1>{error}</h1>}
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" id="email" name="email" ref={emailRef} required autoComplete="username" />
          <label>Password:</label>
          <input type="password" id="password" name="password" ref={passwordRef} required autoComplete="new-password" />
          <label>Confirm password:</label>
          <input type="password" id="passwordConfirm" name="passwordConfirm" ref={passwordConfirmRef} required autoComplete="new-password" />
          <button disabled={loading} type="submit">Submit</button>
        </form>
      </div>
      <div>Already have an account? Log In</div>
    </div>
  )
}
