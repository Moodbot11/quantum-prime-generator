'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import MessageEncoder from '@/components/MessageEncoder'
import AudioBroadcaster from '@/components/AudioBroadcaster'
import EncodedWaveCodeCalculator from '@/components/EncodedWaveCodeCalculator'

export default function BroadcastRealityCreationPage() {
  const [encodedMessage, setEncodedMessage] = useState('')
  const [waveCodeOutput, setWaveCodeOutput] = useState('')
  const [manualWaveCode, setManualWaveCode] = useState('')

  const handleEncodedMessage = (message: string) => {
    setEncodedMessage(message)
  }

  const handleWaveCodeOutput = (output: string) => {
    setWaveCodeOutput(output)
    setManualWaveCode(output) // Update manual input with calculated output
  }

  const handleManualWaveCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setManualWaveCode(e.target.value)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Broadcast Reality Creation</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Message Encoder</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-gray-600">
            This is where you will type in your dreams, goals, or desires. Be sure to be as explicit and detailed as possible. If you leave any detail out, you may not reach your goal. Your final message must be no longer than 9999 characters.
          </p>
          <MessageEncoder onEncode={handleEncodedMessage} maxLength={9999} />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Encoded Wave Code Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <EncodedWaveCodeCalculator onCalculate={handleWaveCodeOutput} encodedMessage={encodedMessage} />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Manual Wave Code Input</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-gray-600">
            You can manually edit the wave code here or paste a previously generated code.
          </p>
          <Textarea
            value={manualWaveCode}
            onChange={handleManualWaveCodeChange}
            placeholder="Enter or edit wave code here"
            className="font-mono text-xs w-full h-[200px] resize-none mb-4"
          />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Broadcast Wave Code</CardTitle>
        </CardHeader>
        <CardContent>
          <AudioBroadcaster encodedMessage={manualWaveCode} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reality Creation Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Use the Message Encoder to encode your intentions or desires.</li>
            <li>Use the Encoded Wave Code Calculator to generate a quantum wave code. You can use it with or without your encoded message.</li>
            <li>To include your encoded message, click the "Calculate with Encoded Message" button.</li>
            <li>You can manually edit or paste a wave code in the Manual Wave Code Input section.</li>
            <li>Use the Audio Broadcaster to transmit your wave code frequency.</li>
            <li>Focus your thoughts on your desired outcome while the frequency plays.</li>
            <li>Repeat the process regularly to reinforce your reality creation.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

