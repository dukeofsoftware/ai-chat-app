"use client"
import { FC, useEffect, useState } from 'react';
import LastPrompt from '@/app/(dashboard)/dashboard/chat/[roomId]/LastPrompt';
import MessageStream from '@/app/(dashboard)/dashboard/chat/[roomId]/MessageStream';
import PromptBar from './PromptBar';
import useScrollBottom from 'react-scroll-bottom-hook';
import { usePathname, useRouter } from 'next/navigation';

interface ChatSystemProps {
    userImage?: string;
    roomId: string;
    messages: {
        content: string;
        role: string;
    }[];
}

const ChatSystem: FC<ChatSystemProps> = ({ userImage, roomId, messages }) => {
    const [response, setResponse] = useState<string | undefined>();
    const [isBottom, scrollRef] = useScrollBottom()
 
    useEffect(() => {

        if (!isBottom) {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        }

    }, [response]);
    return (
        <div className='h-full flex flex-col' ref={scrollRef}>
         
                    <LastPrompt userImage={userImage} />
                    <MessageStream response={response} />
                    <PromptBar roomId={roomId} messages={messages} setResponse={setResponse} response={response} />
              
        </div>
    );
};

export default ChatSystem;