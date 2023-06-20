'use client'
import { AuthContextProvider } from '@/context/AuthContext'
import Navbar from './components/navbar'
import './globals.css'
import { Volkhov } from 'next/font/google'
import { Tinos } from 'next/font/google'

const volkhov = Volkhov({
  weight: ["400", "700"],
  variable: "--font-volkhov",
  subsets: ['latin']
})

const tinos = Tinos({
  weight: ["400", "700"],
  variable: "--font-tinos",
  subsets: ['latin']
})

// export const metadata = {
//   title: 'Vocab.',
//   description: 'Word of the day / Vocabulary Builder Website',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${tinos.className, volkhov.className} mx-32`}>
        <AuthContextProvider>
        <Navbar />
        <div className='mx-32'>
          {children}
        </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}
