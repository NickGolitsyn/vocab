'use client'
import { AuthContextProvider } from '@/context/AuthContext'
import './globals.css'
import { Volkhov } from 'next/font/google'
import { Tinos } from 'next/font/google'
import Navbar from './components/navbar'

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
      <body className={`${tinos.className, volkhov.className} mx-3 sm:mx-10 md:mx-20 lg:mx-32`}>
        <AuthContextProvider>
        <Navbar />
        <div className='mx-3 sm:mx-10 md:mx-20 lg:mx-32'>
          {children}
        </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}
