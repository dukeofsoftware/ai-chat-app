'use client'

import { usePrompt } from '@/hooks/useResponse'
import { FC } from 'react'
import Image from 'next/image'
interface LastPromptProps {
    userImage?: string
}

const LastPrompt: FC<LastPromptProps> = ({
    userImage
}) => {
    const prompt = usePrompt()

    if (prompt.prompt === "") return null
    return <div className={`flex container `}>


        <div className='relative rounded-full h-12 w-12'>
            <Image
                src={userImage || ""}
                alt='ai'
                fill
                className='rounded-md mr-3'
            />
        </div>


        <div className='p-4 my-3 mr-2 bg-gray-700 rounded-md'>
            <p>{prompt.prompt}</p>
        </div>
    </div>

}

export default LastPrompt