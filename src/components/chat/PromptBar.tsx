'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FC, useEffect, useRef, useState, useTransition } from 'react'

import useServerSentEvents from '@/hooks/useServerSentEvents'
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { createMessage } from "@/app/actions/MessageAction"
import { usePathname, useRouter } from "next/navigation"
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
    history: z.any().nullable()
})
const PromptBar: FC<PromptBarProps> = ({ roomId, messages, setResponse, response }) => {
    const [isPending, startTransition] = useTransition()
    const [isLoading, setIsLoading] = useState(false)
    

    const responseRef = useRef<string | undefined>(response);
    const path = usePathname()
    useEffect(() => {
        responseRef.current = response;
    }, [response]);

    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const { openStream, closeStream } = useServerSentEvents<z.infer<typeof FormSchema>>({
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

                responseRef.current = (responseRef.current || '') + formattedText;
                // Call the setResponse function to trigger state update for the parent component
                setResponse(responseRef.current);







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
        <div className="fixed bottom-4 inset-x-0 mx-auto w-full max-w-3xl rounded-md">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full bg-gray-900 px-6  flex gap-2 py-4 rounded-md h-full items-center"
            >
                <input
                    {...form.register("prompt")}
                    className="w-full bg-transparent h-full text-neutral-100 outline-none"
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

