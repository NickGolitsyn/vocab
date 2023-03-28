import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  const date = new Date()
  return (
    <>
    <div className="flex justify-between my-5">
      <div className="flex items-center">
        <Link href={"/"}>
          <h1 className="text-4xl font-bold">Vocab.</h1>
        </Link>
        <div className="ml-10">
          {/* <Link className="mx-5" href={`/wod?date=${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}>WOD</Link> */}
          <Link className="mx-5" href={`/wod/${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`}>WOD</Link>
          <Link className="mx-5" href={"/learn"}>Learn</Link>
        </div>
      </div>
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
    </>
  )
}
