'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react'

interface Message {
  role: 'user' | 'model';
  content: string;
}

const GoogleAIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setUserName(storedName)
    } else {
      const name = prompt("Please enter your name for our records:")
      if (name) {
        setUserName(name)
        localStorage.setItem('userName', name)
      }
    }

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.onresult = handleSpeechResult
    }
    synthRef.current = window.speechSynthesis
  }, [])

  const handleSpeechResult = (event: SpeechRecognitionEvent) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('')

    setInput(transcript)
  }

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
    setIsListening(!isListening)
  }

  const speakResponse = (text: string) => {
    if (synthRef.current) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onend = () => setIsSpeaking(false)
      synthRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.response) {
        throw new Error('No response from AI');
      }

      const assistantMessage: Message = { role: 'model', content: data.response };
      setMessages(prev => [...prev, assistantMessage])
      speakResponse(data.response)
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'model', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-blue-50">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="text-3xl font-bold">Medical AI Advisor</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px] mb-4 p-4 border rounded bg-white overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-gray-700 font-semibold">
              Welcome, {userName}! I'm Dr. AI, your personal Medical AI Advisor. I can provide detailed health information, suggest potential treatments, and offer personalized advice based on your frequency analysis. How can I assist you today?
            </div>
          )}
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
              <strong>{message.role === 'user' ? `${userName}: ` : 'Dr. AI: '}</strong>
              {message.content}
            </div>
          ))}
          {isLoading && <div className="text-gray-600 font-semibold">Analyzing and preparing your personalized medical advice...</div>}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms or ask for health advice..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
            Send
          </Button>
          <Button type="button" onClick={toggleListening} className={`${isListening ? 'bg-red-500' : 'bg-green-500'} text-white`}>
            {isListening ? <MicOff /> : <Mic />}
          </Button>
          <Button 
            type="button" 
            onClick={isSpeaking ? stopSpeaking : () => speakResponse(messages[messages.length - 1]?.content || '')} 
            className="bg-purple-600 text-white"
            disabled={messages.length === 0}
          >
            {isSpeaking ? <VolumeX /> : <Volume2 />}
          </Button>
        </form>
        <div className="mt-4 text-sm text-blue-600 font-semibold">
          Your health is our priority. Our AI provides advanced medical insights based on cutting-edge research and your personal frequency analysis.
        </div>
      </CardContent>
    </Card>
  )
}

export default GoogleAIChatbot
