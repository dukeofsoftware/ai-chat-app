"use client"
import { FC, useEffect, useRef } from 'react';
import Image from 'next/image';
import useScrollBottom from 'react-scroll-bottom-hook'

interface MessageStreamProps {
  response?: string;
}

const MessageStream: FC<MessageStreamProps> = ({ response }) => {
  if (!response) return null;

  return (
    <div className={`flex flex-row-reverse mt-12 container w-full `}>
      <div className='relative rounded-full h-12 w-12'>
        <Image src={"/logo.png"} alt='ai' fill className='rounded-md mr-3' />
      </div>
      <div className='p-4 my-3 mr-2 bg-gray-700 rounded-md w-full'>
        {/* Render the response text here */}
        {response}
      </div>
    </div>
  );
};

export default MessageStream;