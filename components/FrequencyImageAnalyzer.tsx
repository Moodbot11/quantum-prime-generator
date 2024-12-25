'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FrequencyImageAnalyzer: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  useEffect(() => {
    if (imageUrl) {
      analyzeImage(imageUrl)
    }
  }, [imageUrl])

  useEffect(() => {
    if (audioUrl) {
      analyzeAudio(audioUrl)
    }
  }, [audioUrl])

  const analyzeImage = (url: string) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const frequencies = analyzeImageFrequencies(imageData)
      setAnalysis(frequencies)
    }
    img.src = url
  }

  const analyzeImageFrequencies = (imageData: ImageData): string => {
    const data = imageData.data
    let redFreq = 0, greenFreq = 0, blueFreq = 0
    let totalPixels = data.length / 4

    for (let i = 0; i < data.length; i += 4) {
      redFreq += data[i]
      greenFreq += data[i + 1]
      blueFreq += data[i + 2]
    }

    redFreq /= totalPixels
    greenFreq /= totalPixels
    blueFreq /= totalPixels

    const isHologramFrequency = (redFreq > 200 && greenFreq > 200 && blueFreq < 50)

    return `
      Red Frequency: ${redFreq.toFixed(2)} Hz
      Green Frequency: ${greenFreq.toFixed(2)} Hz
      Blue Frequency: ${blueFreq.toFixed(2)} Hz
      Potential Hologram Frequency: ${isHologramFrequency ? 'Yes' : 'No'}
    `
  }

  const analyzeAudio = (url: string) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }

    const audioContext = audioContextRef.current
    analyserRef.current = audioContext.createAnalyser()
    analyserRef.current.fftSize = 2048

    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        const source = audioContext.createBufferSource()
        source.buffer = audioBuffer
        source.connect(analyserRef.current!)
        analyserRef.current!.connect(audioContext.destination)
        source.start(0)

        const analyzeFrequencies = () => {
          const dataArray = new Uint8Array(analyserRef.current!.frequencyBinCount)
          analyserRef.current!.getByteFrequencyData(dataArray)

          const dominantFrequency = getDominantFrequency(dataArray, audioContext.sampleRate)
          setAnalysis(`Dominant Frequency: ${dominantFrequency.toFixed(2)} Hz`)
        }

        setInterval(analyzeFrequencies, 100)
      })
  }

  const getDominantFrequency = (dataArray: Uint8Array, sampleRate: number): number => {
    let maxValue = 0;
    let maxIndex = 0;
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i] > maxValue) {
        maxValue = dataArray[i];
        maxIndex = i;
      }
    }
    return maxIndex * sampleRate / (2 * dataArray.length);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAudioUrl(url)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quantum Frequency Image & Wave Analyzer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="image-upload">Upload Image</Label>
            <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <div>
            <Label htmlFor="audio-upload">Upload Audio</Label>
            <Input id="audio-upload" type="file" accept="audio/*" onChange={handleAudioUpload} />
          </div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {analysis && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Analysis Results:</h3>
              <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{analysis}</pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default FrequencyImageAnalyzer

