"use client"

import { FC, useEffect, useRef } from "react"
import Image from "next/image"

interface MessageStreamProps {
  response?: string
}

const MessageStream: FC<MessageStreamProps> = ({ response }) => {
  if (!response) return null

  return (
    <div className={`container mt-12 flex w-full flex-row-reverse `}>
      <div className="relative h-12 w-12 rounded-full">
        <Image src={"/logo.png"} alt="ai" fill className="mr-3 rounded-md" />
      </div>
      <div className="my-3 mr-2 w-full rounded-md bg-gray-700 p-4">
        {/* Render the response text here */}
        {response}
      </div>
    </div>
  )
}

export default MessageStream
