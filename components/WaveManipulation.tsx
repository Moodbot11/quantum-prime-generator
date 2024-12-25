'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const WaveManipulation: React.FC = () => {
  const [frequency, setFrequency] = useState<number>(440)
  const [amplitude, setAmplitude] = useState<number>(0.5)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null)
  const [gainNode, setGainNode] = useState<GainNode | null>(null)

  const startWave = () => {
    const context = new AudioContext()
    const osc = context.createOscillator()
    const gain = context.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(frequency, context.currentTime)
    gain.gain.setValueAtTime(amplitude, context.currentTime)

    osc.connect(gain)
    gain.connect(context.destination)

    osc.start()
    setIsPlaying(true)
    setAudioContext(context)
    setOscillator(osc)
    setGainNode(gain)
  }

  const stopWave = () => {
    if (oscillator) {
      oscillator.stop()
      setIsPlaying(false)
    }
  }

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrequency = parseFloat(e.target.value)
    setFrequency(newFrequency)
    if (oscillator) {
      oscillator.frequency.setValueAtTime(newFrequency, audioContext!.currentTime)
    }
  }

  const handleAmplitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmplitude = parseFloat(e.target.value)
    setAmplitude(newAmplitude)
    if (gainNode) {
      gainNode.gain.setValueAtTime(newAmplitude, audioContext!.currentTime)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Wave Manipulation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="frequency">Frequency (Hz)</Label>
            <Input
              id="frequency"
              type="range"
              min="20"
              max="20000"
              value={frequency}
              onChange={handleFrequencyChange}
            />
            <span>{frequency.toFixed(2)} Hz</span>
          </div>
          <div>
            <Label htmlFor="amplitude">Amplitude</Label>
            <Input
              id="amplitude"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={amplitude}
              onChange={handleAmplitudeChange}
            />
            <span>{amplitude.toFixed(2)}</span>
          </div>
          <Button onClick={isPlaying ? stopWave : startWave}>
            {isPlaying ? 'Stop Wave' : 'Start Wave'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default WaveManipulation

