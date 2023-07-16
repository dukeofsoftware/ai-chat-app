import { db } from '@/lib/db'
import { FC } from 'react'

interface pageProps { }

const Page: FC<pageProps> = ({ }) => {


  return <div className='h-full w-full flex items-center justify-center'>

    <h2 className='text-2xl text-center'>
      You are not in a chat room
    </h2>

  </div>
}

export default Page