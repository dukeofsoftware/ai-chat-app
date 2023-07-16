import Image from "next/image"
import Link from "next/link"
import {
  currentUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs"
import { dark } from "@clerk/themes"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

const Navbar = async () => {
  const user = await currentUser()
  const navs = [
    {
      name: "Sign in",
      href: "/sign-in",
    },
  ]
  return (
    <header className="  sticky  top-0 z-50 w-full bg-sky-800 px-4 py-4  ">
      <div className=" container flex w-full items-center">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={40} height={40} />
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          {!user?.id &&
            navs.map((nav) => {
              return (
                <Link
                  href={nav.href}
                  key={nav.name}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    " font-medium text-neutral-100 "
                  )}
                >
                  {nav.name}
                </Link>
              )
            })}
          {!user?.id && (
            <Link
              href={"/sign-up"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Sign Up
            </Link>
          )}
          {user?.id && (
            <Link
              href={"/dashboard/chat"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Chat
            </Link>
          )}
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{
                baseTheme: dark,
              }}
            />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
