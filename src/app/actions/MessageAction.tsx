"use server"

import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

export const createMessage = async (prompt: string, chatRoomId: string,role: string) => {

    if (!prompt) return
    if (!chatRoomId) return
    const user = await currentUser()
    if(!user) return
    const message = await db.message.create({
        data: {
            content: prompt,
            chatRoomId,
            userId: user?.id,
            role: role
        }
    })
    revalidatePath(`/dashboard/chat/${chatRoomId}`)
    return message
}
