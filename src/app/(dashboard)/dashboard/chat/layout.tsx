import { FC } from "react"
import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import ChatSidebar from "@/components/chat/ChatSidebar"

interface layoutProps {
  children: React.ReactNode
}

const layout: FC<layoutProps> = async ({ children }) => {
  const user = await currentUser()

  const rooms = await db.chatRoom.findMany({
    where: {
      userId: user?.id,
    },
  })

  return (
    <div className="relative flex w-full">
      <ChatSidebar rooms={rooms} />
      <div className="grow">{children}</div>
    </div>
  )
}

export default layout
