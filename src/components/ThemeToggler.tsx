"use client"

import { FC } from "react"
import { useTheme } from "next-themes"
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs"

import { Button } from "./ui/button"

interface ThemeTogglerProps {}

const ThemeToggler: FC<ThemeTogglerProps> = ({}) => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      size={"icon"}
      variant={"outline"}
      className="overflow-hidden"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <BsFillMoonFill className="h-4 w-4 text-neutral-100" />
      ) : (
        <BsFillSunFill className="h-4 w-4 text-yellow-500" />
      )}
    </Button>
  )
}

export default ThemeToggler
