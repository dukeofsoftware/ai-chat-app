'use client'

import { FC } from 'react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'

interface ThemeTogglerProps { }

const ThemeToggler: FC<ThemeTogglerProps> = ({ }) => {
    const { theme, setTheme } = useTheme()



    return <Button size={"icon"} variant={"outline"} className='overflow-hidden' onClick={
        () => setTheme(theme === "dark" ? "light" : "dark")
    }>
        {theme === "dark" ? <BsFillMoonFill className='w-4 h-4 text-neutral-100' /> :
            <BsFillSunFill className='w-4 h-4 text-yellow-500' />}

    </Button>



}

export default ThemeToggler