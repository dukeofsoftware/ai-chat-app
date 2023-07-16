import { FC } from "react"
import { currentUser } from "@clerk/nextjs"
import { format } from "date-fns"

import { db } from "@/lib/db"
import ChatSystem from "@/components/chat/ChatSystem"
import MessageResponse from "@/components/chat/MessageResponse"

interface pageProps {
  params: {
    roomId: string
  }
}
export const revalidate = 0
export const cache = "no-store"

const Page: FC<pageProps> = async ({ params }) => {
  const user = await currentUser()

  const { roomId } = params
  const recentMessages = await db.message.findMany({
    where: {
      chatRoomId: roomId,
      userId: user?.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  })
  const currentRoom = await db.chatRoom.findUnique({
    where: {
      id: roomId,
    },
  })
  if (!currentRoom) {
    return (
      <div className=" mb-32 mt-16 flex min-h-screen w-[90%]  flex-col  items-center justify-center">
        <h1 className="text-2xl font-semibold">Room not found</h1>
      </div>
    )
  }
  const formattedMessages = recentMessages.map((message) => ({
    ...message,
    userImage: user?.imageUrl,
    createdAt: format(new Date(message.createdAt), "h:mm a"),
    updatedAt: format(new Date(message.updatedAt), "h:mm a"),
  }))
  const formattedHistory = recentMessages.map((message) => {
    return {
      content: message.content,
      role: message.role === "user" ? "user" : "assistant",
    }
  })

  return (
    <div className=" mb-32 mt-16 flex  min-h-screen  w-[90%] flex-col">
      {formattedMessages.map((message) => (
        <MessageResponse key={message.id} message={message} />
      ))}
      <ChatSystem
        roomId={roomId}
        messages={formattedHistory}
        userImage={user?.imageUrl}
      />
    </div>
  )
}

export default Page
