'use client'

import React, { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FrequencyBroadcaster: React.FC = () => {
  const [frequency, setFrequency] = useState<number>(440)
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)

  const startBroadcast = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }

    oscillatorRef.current = audioContextRef.current.createOscillator()
    oscillatorRef.current.type = 'sine'
    oscillatorRef.current.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    oscillatorRef.current.connect(audioContextRef.current.destination)
    oscillatorRef.current.start()

    setIsBroadcasting(true)
  }

  const stopBroadcast = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      oscillatorRef.current.disconnect()
    }
    setIsBroadcasting(false)
  }

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrequency = parseFloat(e.target.value)
    setFrequency(newFrequency)
    if (isBroadcasting && oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(newFrequency, audioContextRef.current.currentTime)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quantum Frequency Broadcaster</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="frequency">Frequency (Hz)</Label>
            <Input
              id="frequency"
              type="number"
              value={frequency}
              onChange={handleFrequencyChange}
              min={20}
              max={20000}
            />
          </div>
          <Button onClick={isBroadcasting ? stopBroadcast : startBroadcast}>
            {isBroadcasting ? 'Stop Broadcasting' : 'Start Broadcasting'}
          </Button>
          <p className="text-sm text-gray-500">
            Broadcasting status: {isBroadcasting ? 'Active' : 'Inactive'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default FrequencyBroadcaster

