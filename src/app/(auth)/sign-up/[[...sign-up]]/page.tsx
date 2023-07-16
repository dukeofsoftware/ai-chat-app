"use client"
import { SignUp } from "@clerk/nextjs"
import { dark } from '@clerk/themes';
import { useTheme } from "next-themes";
export default function Page() {
  const { theme } = useTheme()

  return <div className="flex items-center justify-center h-[95vh]  ">
    <SignUp
      afterSignInUrl={'/dashboard'}
      afterSignUpUrl={'/dashboard'}
      appearance={{
        baseTheme: theme === "dark" || "system" ? dark : undefined,

      }}

    />
  </div>;
}