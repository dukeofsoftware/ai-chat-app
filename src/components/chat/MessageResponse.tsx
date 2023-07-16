"use client"

import { FC } from "react"
import Image from "next/image"

interface MessageResponseProps {
  message: {
    userImage?: string
    id: string
    content: string
    createdAt: string
    updatedAt: string
    userId: string
    chatRoomId: string
    role: string
  }
}

const MessageResponse: FC<MessageResponseProps> = ({
  message: { content, role, userImage },
}) => {
  return (
    <div
      className={`container  mt-12 flex w-full ${
        role === "user" ? "" : "flex-row-reverse"
      }`}
    >
      {role === "user" ? (
        <div className="relative my-auto mr-3 h-12 w-12">
          <Image
            src={userImage || ""}
            alt="user"
            fill
            className="rounded-full   "
          />
        </div>
      ) : (
        <div className="relative my-auto h-12 w-12 rounded-full">
          <Image src={"/logo.png"} alt="ai" fill className="rounded-full" />
        </div>
      )}
      <div className="my-3 mr-2 w-full rounded-md bg-gray-200 p-4 dark:bg-gray-700">
        <p className="w-full"> {content}</p>
      </div>
    </div>
  )
}

export default MessageResponse
