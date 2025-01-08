'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface FrequencyData {
  condition: string;
  frequency: number;
  palindrome: string;
  healingFrequency: number;
  description: string;
}

const medicalFrequencies: FrequencyData[] = [
  {
    condition: "DNA Repair",
    frequency: 528,
    palindrome: "528825",
    healingFrequency: 432,
    description: "Known as the 'Miracle' frequency. Associated with DNA repair and cellular regeneration."
  },
  {
    condition: "Tissue Regeneration",
    frequency: 432,
    palindrome: "432234",
    healingFrequency: 528,
    description: "Natural healing frequency that promotes tissue regeneration and harmonious cell growth."
  },
  {
    condition: "Immune System",
    frequency: 727,
    palindrome: "727727",
    healingFrequency: 787,
    description: "Strengthens immune system response and helps fight infections."
  },
  {
    condition: "Pain Relief",
    frequency: 174,
    palindrome: "174471",
    healingFrequency: 396,
    description: "Natural anesthetic frequency, helps reduce pain and inflammation."
  },
  {
    condition: "Cellular Health",
    frequency: 396,
    palindrome: "396693",
    healingFrequency: 639,
    description: "Supports cellular health and helps remove toxins from cells."
  },
  {
    condition: "Nerve Regeneration",
    frequency: 639,
    palindrome: "639936",
    healingFrequency: 528,
    description: "Promotes nerve healing and regeneration."
  },
  {
    condition: "Bone Growth",
    frequency: 787,
    palindrome: "787787",
    healingFrequency: 174,
    description: "Stimulates bone growth and repair, particularly useful for dental applications."
  }
]

const MedicalFrequencyAnalyzer: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null)
  const [gainNode, setGainNode] = useState<GainNode | null>(null)

  const playFrequency = (frequency: number) => {
    if (isPlaying) {
      stopFrequency();
    }

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = frequency;
    osc.type = 'sine';
    gain.gain.value = volume;

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    setAudioContext(ctx);
    setOscillator(osc);
    setGainNode(gain);
    setIsPlaying(true);
  }

  const stopFrequency = () => {
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
    }
    if (audioContext) {
      audioContext.close();
    }
    setIsPlaying(false);
    setOscillator(null);
    setAudioContext(null);
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0];
    setVolume(vol);
    if (gainNode) {
      gainNode.gain.value = vol;
    }
  }

  const selectedFrequencyData = medicalFrequencies.find(f => f.condition === selectedCondition);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Medical Frequency Analyzer</CardTitle>
        <CardDescription>
          Analyze and apply healing frequencies based on palindromic patterns in DNA and cellular structures
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={setSelectedCondition} value={selectedCondition}>
          <SelectTrigger>
            <SelectValue placeholder="Select condition to analyze" />
          </SelectTrigger>
          <SelectContent>
            {medicalFrequencies.map((freq) => (
              <SelectItem key={freq.condition} value={freq.condition}>
                {freq.condition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedFrequencyData && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Primary Frequency</h3>
                <p className="text-2xl font-bold">{selectedFrequencyData.frequency} Hz</p>
                <Button 
                  onClick={() => playFrequency(selectedFrequencyData.frequency)}
                  disabled={isPlaying}
                >
                  Play Primary Frequency
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Healing Frequency</h3>
                <p className="text-2xl font-bold">{selectedFrequencyData.healingFrequency} Hz</p>
                <Button 
                  onClick={() => playFrequency(selectedFrequencyData.healingFrequency)}
                  disabled={isPlaying}
                >
                  Play Healing Frequency
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Associated Palindrome</h3>
              <p className="text-xl font-mono">{selectedFrequencyData.palindrome}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p>{selectedFrequencyData.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Volume: {Math.round(volume * 100)}%</h3>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[volume]}
                onValueChange={handleVolumeChange}
              />
            </div>

            {isPlaying && (
              <Button onClick={stopFrequency} variant="destructive">
                Stop Frequency
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MedicalFrequencyAnalyzer

