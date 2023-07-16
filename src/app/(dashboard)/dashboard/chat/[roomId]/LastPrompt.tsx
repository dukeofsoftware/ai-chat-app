"use client"

import { FC } from "react"
import Image from "next/image"
import { usePrompt } from "@/hooks/useResponse"

interface LastPromptProps {
  userImage?: string
}

const LastPrompt: FC<LastPromptProps> = ({ userImage }) => {
  const prompt = usePrompt()

  if (prompt.prompt === "") return null
  return (
    <div className={`container flex `}>
      <div className="relative h-12 w-12 rounded-full">
        <Image
          src={userImage || ""}
          alt="ai"
          fill
          className="mr-3 rounded-md"
        />
      </div>

      <div className="my-3 mr-2 rounded-md bg-gray-700 p-4">
        <p>{prompt.prompt}</p>
      </div>
    </div>
  )
}

export default LastPrompt
