import { create } from "zustand"

type ResponseState = {
  response: string

  setResponse: (response: string) => void
}
type PromptState = {
  prompt: string
  setPrompt: (prompt: string) => void
}
export const useResponse = create<ResponseState>()((set) => ({
  response: "",
  setResponse: (response) => set({ response }),
}))
export const usePrompt = create<PromptState>()((set) => ({
  prompt: "",
  setPrompt: (prompt) => set({ prompt }),
}))
