"use client"

import { FC, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createChatRoom } from "@/app/actions/chatRoomActions"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChatRoom } from "@prisma/client"
import { useForm } from "react-hook-form"
import { IoIosAddCircle } from "react-icons/io"
import * as z from "zod"

import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button, buttonVariants } from "../ui/button"
import { Input } from "../ui/input"
import { toast } from "../ui/use-toast"
import SidebarItem from "./SidebarItem"

interface ChatSidebarProps {
  rooms: ChatRoom[]
}
const FormSchema = z.object({
  name: z.string().nonempty("Please enter a name for your chat room"),
})
const ChatSidebar: FC<ChatSidebarProps> = ({ rooms }) => {
  const [isPending, startTranstion] = useTransition()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTranstion(async () => {
      await createChatRoom(data.name)
        .then(() => {
          toast({
            title: "Room created",
            description: "Your chat room has been created",
          })
          router.refresh()
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          })
        })
    })
  }
  return (
    <div className=" relative h-full w-[16rem]  bg-neutral-950  py-2">
      <div className=" fixed   h-full  w-[16rem]  border-r border-neutral-200 px-4">
        <AlertDialog>
          <AlertDialogTrigger
            className={cn(
              buttonVariants({ variant: "default" }),
              "my-2 w-full"
            )}
          >
            <IoIosAddCircle className="mr-2 h-5 w-5" />
            Create Room
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create Chat Room</AlertDialogTitle>
              <AlertDialogDescription>
                Type a name for your chat room
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Chat room Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <AlertDialogFooter className="mt-2">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit">Create</AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </Form>
            </div>
          </AlertDialogContent>
        </AlertDialog>
        {rooms.map((room) => (
          <SidebarItem key={room.id} room={room} />
        ))}
      </div>
    </div>
  )
}

export default ChatSidebar
