'use client'

import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FrequencySynthesizer: React.FC = () => {
  const [inputText, setInputText] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.1)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.connect(audioContextRef.current.destination)
    }
  }

  const playFrequency = () => {
    initAudio()
    if (!audioContextRef.current) return

    // Convert input text to frequency values
    const frequencies = inputText.split('').map(char => {
      // Convert each character to its ASCII value and scale to audible frequency
      return (char.charCodeAt(0) % 88) * 10 + 220 // Range: 220Hz - 1100Hz
    })

    setIsPlaying(true)
    
    // Create and configure oscillator
    oscillatorRef.current = audioContextRef.current.createOscillator()
    oscillatorRef.current.type = 'sine'
    
    // Set initial frequency
    if (frequencies.length > 0) {
      oscillatorRef.current.frequency.setValueAtTime(
        frequencies[0],
        audioContextRef.current.currentTime
      )
    }

    // Schedule frequency changes
    let time = audioContextRef.current.currentTime
    frequencies.forEach((freq, index) => {
      if (index > 0) {
        oscillatorRef.current!.frequency.setValueAtTime(freq, time)
        time += 0.1 // Change frequency every 100ms
      }
    })

    // Set volume
    gainNodeRef.current!.gain.setValueAtTime(volume, audioContextRef.current.currentTime)
    
    // Connect and start
    oscillatorRef.current.connect(gainNodeRef.current!)
    oscillatorRef.current.start()
    oscillatorRef.current.stop(time + 0.1) // Stop after all frequencies have played

    oscillatorRef.current.onended = () => {
      setIsPlaying(false)
    }
  }

  const stopPlaying = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      oscillatorRef.current.disconnect()
      oscillatorRef.current = null
    }
    setIsPlaying(false)
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Quantum Frequency Synthesizer</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="frequency-input">Enter numerical data (up to 9999 digits):</Label>
          <Input
            id="frequency-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="mt-1"
            placeholder="Enter numbers to synthesize..."
            maxLength={9999}
          />
        </div>
        <div>
          <Label htmlFor="volume">Volume:</Label>
          <Input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="mt-1"
          />
        </div>
        <div className="flex gap-4">
          {!isPlaying ? (
            <Button onClick={playFrequency} className="bg-green-500 hover:bg-green-600">
              Play Frequency
            </Button>
          ) : (
            <Button onClick={stopPlaying} className="bg-red-500 hover:bg-red-600">
              Stop
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default FrequencySynthesizer

