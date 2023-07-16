"use client"
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from '@clerk/themes';

export default function Page() {
  const { theme } = useTheme()

  return <div className="flex items-center justify-center h-[95vh]  ">
    <SignIn
      afterSignInUrl={'/dashboard'}
      afterSignUpUrl={'/dashboard'}
      appearance={{
        baseTheme: theme === "dark" || "system" ? dark : undefined,

      }}

    />
  </div>;
}