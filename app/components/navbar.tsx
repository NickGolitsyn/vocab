import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <>
    <div className="flex justify-between my-5">
      <Link href={"/"}>
        <h1 className="text-4xl font-bold">Vocab.</h1>
      </Link>
      <div className="flex items-center">
        <h1 className="mr-5">en</h1>
        <div className="rounded-full overflow-hidden w-fit">
          <Image 
            src="/pic.jpeg"
            width={50}
            height={50} 
            alt={""}
          />
        </div>
      </div>
    </div>
    <div className="flex flex-col">
      <Link href={"/word-of-the-day"}>WOD</Link>
      <Link href={"/Learn"}>Learn</Link>
    </div>
    </>
  )
}
