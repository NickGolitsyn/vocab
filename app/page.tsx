import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div className='flex text-2xl justify-around mx-44 my-10'>
        <h2 className='font-bold'>English</h2>
        <h2>Serbian</h2>
        <h2>Russian</h2>
      </div>
      <div className='flex text-2xl justify-between mx-44 my-10'>
        <h2>&lt;</h2>
        <h2>Tue</h2>
        <h2>Wed</h2>
        <h2 className='font-bold'>Today</h2>
      </div>
    </main>
  )
}
