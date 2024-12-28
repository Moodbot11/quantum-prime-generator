'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from 'ai/react'

export default function GoogleAIChatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  })

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <h2 className="text-2xl font-bold mb-4">Google AI Chatbot (Gemini)</h2>
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap mb-4">
          {m.role === 'user' ? 'Human: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex items-center mt-4">
        <Input
          value={input}
          placeholder="Ask me anything..."
          onChange={handleInputChange}
          className="flex-grow mr-2"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}

