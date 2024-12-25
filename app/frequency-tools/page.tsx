'use client'

import React, { useState } from 'react'
import FrequencyAnalyzer from '@/components/FrequencyAnalyzer'
import GoogleAIChatbot from '@/components/GoogleAIChatbot'
import { Button } from "@/components/ui/button"

export default function FrequencyToolsPage() {
  const [showChatbot, setShowChatbot] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Quantum Frequency Tools</h1>
        <FrequencyAnalyzer />
        <Button 
          onClick={() => setShowChatbot(!showChatbot)} 
          className="w-full py-4 text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          {showChatbot ? 'Hide' : 'Consult'} Medical AI Advisor
        </Button>
        {showChatbot && (
          <div className="mt-8">
            <GoogleAIChatbot />
          </div>
        )}
      </div>
    </div>
  )
}

