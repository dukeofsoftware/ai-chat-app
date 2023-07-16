"use server"

import { currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache"
export const getChatRooms = async (userId: string) => {
  try {
    const rooms = await db.chatRoom.findMany({
      where: {
        userId: userId,
      },
    })
    return rooms
  } catch (error: any) {
    throw new Error(error)
  }
}

export const createChatRoom = async (name: string) => {
  const user = await currentUser()
  try {
    const room = await db.chatRoom.create({
      data: {
        name: name,
        userId: user!.id,
      },
    })
    return room
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteChatRoom = async (id: string) => {
  try {
    const room = await db.chatRoom.delete({
      where: {
        id: id,
      },
    })

    revalidatePath('/dashboard/chat')
    redirect('/dashboard/chat')


  } catch (error: any) {
    throw new Error(error)
  }
}
