"use client"
import { ChatRoom } from '@prisma/client'
import { FC, useTransition } from 'react'
import { BsFillChatFill } from 'react-icons/bs'
import { CiCircleRemove } from 'react-icons/ci'
import { Button, buttonVariants } from '../ui/button'
import { deleteChatRoom } from '@/app/actions/chatRoomActions'
import { toast } from '../ui/use-toast'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
interface SidebarItemProps {
    room: ChatRoom
}

const SidebarItem: FC<SidebarItemProps> = ({
    room
}) => {
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
        router.push('/dashboard/chat')

    }

    return <Link href={`/dashboard/chat/${room.id}`} className={cn(buttonVariants({ variant: "secondary" }), 'w-full  border-neutral-800 dark:border-neutral-200 py-3 flex items-center group mb-2')}>
        <BsFillChatFill className='w-4 h-4 mr-2 text-neutral-800 dark:text-neutral-200' />
        {room.name}
        <button className='ml-auto' onClick={deleteRoom}>
            <CiCircleRemove className=' hidden group-hover:block w-5 h-5 text-red-500' />
        </button>
    </Link>
}

export default SidebarItem