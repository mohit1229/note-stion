"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, X, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNotesStore } from "@/lib/store"
import { cn } from "@/lib/utils"

interface AIChatProps {
  noteId: string
}

export default function AIChat({ noteId }: AIChatProps) {
  const { getChatHistory, addChatMessage } = useNotesStore()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatHistory = getChatHistory(noteId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [chatHistory, isOpen])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || isLoading) return

    // Add user message
    addChatMessage(noteId, { role: "user", content: message })
    setMessage("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Add AI response
      addChatMessage(noteId, {
        role: "assistant",
        content:
          "This is a simulated AI response. In a real application, this would come from an API call to an AI service like OpenAI's GPT or a similar model. I can help you with your notes, answer questions, or provide suggestions based on your content.",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      {/* AI Chat Button */}
      <Button className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={20} /> : <Bot size={20} />}
      </Button>

      {/* Chat Interface */}
      <div
        className={cn(
          "fixed bottom-0 right-0 w-full md:w-96 transition-all duration-300 ease-in-out bg-white dark:bg-zinc-900 border-t md:border-l border-zinc-200 dark:border-zinc-800 shadow-lg",
          isOpen ? "h-96" : "h-0",
        )}
      >
        {isOpen && (
          <div className="flex flex-col h-full">
            <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center">
              <MessageSquare size={18} className="mr-2 text-blue-500" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 ? (
                <div className="text-center text-zinc-500 dark:text-zinc-400 mt-8">
                  <Bot size={40} className="mx-auto mb-2 text-zinc-400 dark:text-zinc-500" />
                  <p>Ask me anything about your note!</p>
                </div>
              ) : (
                chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === "user"
                          ? "bg-stone-900 text-white"
                          : "bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-zinc-100 dark:bg-zinc-800">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-900 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-800 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-800 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-200 dark:border-zinc-900 flex">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 mr-2"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send size={16} />
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}
