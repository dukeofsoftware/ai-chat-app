import { redirect } from "next/navigation"
import { type NextRequest } from "next/server"
import { currentUser } from "@clerk/nextjs"
import { Configuration, OpenAIApi } from "openai-edge"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const handler = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      roomId: string
    }
  }
) => {
  try {
    const { searchParams } = new URL(req.url)
    let prompt = searchParams.get("prompt")
    const history = searchParams.get("history")
    const user = await currentUser()
    if (!user || !user.id) redirect("/sign-in")
    const { roomId } = params
    if (!roomId) throw new Error("No room ID provided")
    if (!prompt) throw new Error("No prompt provided")
    if (prompt.includes("-")) {
      prompt = prompt.replace(/-/g, " ")
    }

    if (history) {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...JSON.parse(history),
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
        temperature: 0,
        stream: true,
      })
      return new Response(completion.body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "text/event-stream;charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "X-Accel-Buffering": "no",
        },
      })
    } else {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
        temperature: 0,
        stream: true,
      })
      return new Response(completion.body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "text/event-stream;charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "X-Accel-Buffering": "no",
        },
      })
    }
  } catch (error: any) {
    console.error("CHAT/ROOMID ERROR : ", error)

    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    })
  }
}

export const config = {
  runtime: "edge",
}

export { handler as GET, handler as POST }
