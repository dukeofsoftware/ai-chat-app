"use client"

import { FC, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { deleteChatRoom } from "@/app/actions/chatRoomActions"
import { ChatRoom } from "@prisma/client"
import { BsFillChatFill } from "react-icons/bs"
import { CiCircleRemove } from "react-icons/ci"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "../ui/button"
import { toast } from "../ui/use-toast"

interface SidebarItemProps {
  room: ChatRoom
}

const SidebarItem: FC<SidebarItemProps> = ({ room }) => {
  const router = useRouter()
  const [isPending, startTranstion] = useTransition()
  const deleteRoom = async () => {
    startTranstion(async () => {
      try {
        await deleteChatRoom(room.id)
        toast({
          title: "Room deleted",
          description: "Your chat room has been deleted",
        })
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      }
    })
    router.refresh()
    router.push("/dashboard/chat")
  }

  return (
    <Link
      href={`/dashboard/chat/${room.id}`}
      className={cn(
        buttonVariants({ variant: "secondary" }),
        "group  mb-2 flex w-full items-center border-neutral-800 py-3 dark:border-neutral-200"
      )}
    >
      <BsFillChatFill className="mr-2 h-4 w-4 text-neutral-800 dark:text-neutral-200" />
      {room.name}
      <button className="ml-auto" onClick={deleteRoom}>
        <CiCircleRemove className=" hidden h-5 w-5 text-red-500 group-hover:block" />
      </button>
    </Link>
  )
}

export default SidebarItem
