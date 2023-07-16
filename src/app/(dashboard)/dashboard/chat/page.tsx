import { FC } from "react"

import { db } from "@/lib/db"

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h2 className="text-center text-2xl">You are not in a chat room</h2>
    </div>
  )
}

export default Page
