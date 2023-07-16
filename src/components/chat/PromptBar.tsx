"use client"

import { FC, useEffect, useRef, useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { createMessage } from "@/app/actions/MessageAction"
import useServerSentEvents from "@/hooks/useServerSentEvents"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "../ui/button"

interface PromptBarProps {
  roomId: string
  messages: {
    role: string
    content: string
  }[]
  setResponse: (response: string) => void
  response?: string
}

const FormSchema = z.object({
  prompt: z.string().nonempty("Please enter a prompt"),
  history: z.any().nullable(),
})
const PromptBar: FC<PromptBarProps> = ({
  roomId,
  messages,
  setResponse,
  response,
}) => {
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false)

  const responseRef = useRef<string | undefined>(response)
  const path = usePathname()
  useEffect(() => {
    responseRef.current = response
  }, [response])

  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { openStream, closeStream } = useServerSentEvents<
    z.infer<typeof FormSchema>
  >({
    baseUrl: `/api/openai/chat/${roomId}`,
    config: {
      withCredentials: false,
    },
    onData: (data) => {
      try {
        const formattedData = JSON.parse(data)
        if (formattedData.choices[0].finish_reason === "stop") {
          return
        }
        const formattedText = formattedData.choices[0].delta.content
        if (formattedText === "") return

        responseRef.current = (responseRef.current || "") + formattedText
        // Call the setResponse function to trigger state update for the parent component
        setResponse(responseRef.current)
      } catch (e) {
        console.error(`Failed to parse data`, e)
      }
    },
    onOpen: () => {
      console.log(`Stream opened`)
      setIsLoading(true)
    },
    onClose: async () => {
      startTransition(async () => {
        if (!responseRef.current) return
        const message = createMessage(responseRef.current, roomId, "assistant")
        if (!message) return
        responseRef.current = undefined
        setResponse("")
        router.refresh()
      })
      router.refresh()

      setIsLoading(false)
    },
    onError: (error) => {
      console.error(`Stream error`, error)
      setIsLoading(false)
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      createMessage(data.prompt, roomId, "user")
      router.refresh()
    })
    const evtSource = openStream({
      query: {
        prompt: data.prompt.split(" ").join("-"),
        history: JSON.stringify(messages),
      },
    })
    evtSource.onerror = (error) => {
      console.error(`EventSource failed:`, error)
      closeStream(evtSource)
      setIsLoading(false)
    }

    form.reset()
  }

  return (
    <div className="fixed inset-x-0 bottom-4 mx-auto w-full max-w-3xl rounded-md">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full  items-center gap-2 rounded-md bg-gray-900 px-6 py-4"
      >
        <input
          {...form.register("prompt")}
          className="h-full w-full bg-transparent text-neutral-100 outline-none"
          placeholder="Enter a prompt"
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  )
}
export default PromptBar
