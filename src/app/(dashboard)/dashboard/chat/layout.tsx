import ChatSidebar from '@/components/chat/ChatSidebar'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import { FC } from 'react'

interface layoutProps {
    children: React.ReactNode
}

const layout: FC<layoutProps> = async ({
    children
}) => {
    const user = await currentUser();

    const rooms = await db.chatRoom.findMany({
        where: {
            userId: user?.id
        }
    })


    return <div className='flex w-full relative'>

        <ChatSidebar rooms={rooms} />
        <div className='grow'>
            {children}
        </div>

    </div>
}

export default layout