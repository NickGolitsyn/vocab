'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();
  const date = new Date()
  const dateURL = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
  useEffect(() => {
    router.replace(`/wod/${dateURL}`)
  }, [])
  return (
    <div>
      <span>Redirect to today day:</span> 
      <Link href={`/wod/${dateURL}`}>Today</Link>  
    </div>
  )
}
