'use client'

import { FC } from 'react'
import Image from 'next/image'
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
    },

}

const MessageResponse: FC<MessageResponseProps> = ({
    message: {
        content,
        role,
        userImage
    },
    
}) => {
    return <div className={`flex  mt-12 container w-full ${role === "user" ? "" : "flex-row-reverse"}`}>
        {
            role === 'user' ?
                <div className='relative h-12 w-12 my-auto mr-3'>
                    <Image
                        src={userImage || ""}
                        alt='user'
                        fill
                        className='rounded-full   '
                    />
                </div> :
                <div className='relative rounded-full my-auto h-12 w-12'>
                    <Image
                        src={"/logo.png"}
                        alt='ai'
                        fill
                        className='rounded-full'
                    />
                </div>

        }
        <div className='p-4 my-3 mr-2 dark:bg-gray-700 bg-gray-200 rounded-md w-full'>
            <p className='w-full'> {content}</p>
        </div>
    </div>

}

export default MessageResponse