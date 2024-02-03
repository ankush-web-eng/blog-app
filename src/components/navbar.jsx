"use client"
import { ModeToggle } from "./ui/theme-toggle"
import Image from "next/image"

export default function Navbar(){
    return (
        <nav className="flex items-center justify-between max-h-full flex-row">
        <Image
          src="/Ankush_1mb.jpg"
          alt=""
          height={15}
          width={25}
          className="rounded-full ml-4"
        />
        <ul className="space-x-6 flex-row flex py-2 mr-8 cursor-pointer items-center font-serif">
          <li>
            <ModeToggle />
          </li>
          <li className="flex flex-row">About</li>
        </ul>
      </nav>
    )
}