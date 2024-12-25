'use client'

import React, { useState } from 'react'
import QuantumWaveFunctionCaptureTool from '../../components/QuantumWaveFunctionCaptureTool'
import GoogleAIChatbot from '../../components/GoogleAIChatbot'
import { Button } from "@/components/ui/button"

export default function WaveCapturePage(): React.ReactElement {
  const [showChatbot, setShowChatbot] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-cyan-400">Quantum Wave Function Capture Tool</h1>
        <QuantumWaveFunctionCaptureTool />
        <Button 
          onClick={() => setShowChatbot(!showChatbot)} 
          className="mt-8 w-full py-4 text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
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

