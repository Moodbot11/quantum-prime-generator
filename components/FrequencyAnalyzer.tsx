'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AnalysisCategories from './AnalysisCategories'

interface CapturedFrequency {
  timestamp: string;
  frequencies: number[];
}

const FrequencyAnalyzer: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [frequencies, setFrequencies] = useState<number[]>([])
  const [capturedFrequencies, setCapturedFrequencies] = useState<CapturedFrequency[]>([])
  const [analysis, setAnalysis] = useState<string>('')
  const [medicalAnalysis, setMedicalAnalysis] = useState<string>('')
  const [error, setError] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyzerRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      audioContextRef.current = new AudioContext()
      analyzerRef.current = audioContextRef.current.createAnalyser()
      analyzerRef.current.fftSize = 2048
      
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream)
      sourceRef.current.connect(analyzerRef.current)
      
      setIsRecording(true)
      setCapturedFrequencies([])
      setAnalysis('')
      setMedicalAnalysis('')
      visualize()
    } catch (err) {
      setError('Error accessing microphone. Please ensure you have granted permission.')
      console.error('Error:', err)
    }
  }

  const stopRecording = () => {
    if (sourceRef.current) {
      sourceRef.current.disconnect()
    }
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setIsRecording(false)
    analyzeFrequencies()
  }

  const visualize = () => {
    if (!analyzerRef.current || !canvasRef.current || !audioContextRef.current) return

    const canvas = canvasRef.current
    const canvasCtx = canvas.getContext('2d')
    if (!canvasCtx) return

    const WIDTH = canvas.width
    const HEIGHT = canvas.height
    const bufferLength = analyzerRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw)

      analyzerRef.current!.getByteFrequencyData(dataArray)

      canvasCtx.fillStyle = 'rgb(200, 200, 200)'
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

      const barWidth = (WIDTH / bufferLength) * 2.5
      let barHeight
      let x = 0

      // Calculate dominant frequencies
      const dominantFreqs = new Set<number>()
      const sampleRate = audioContextRef.current!.sampleRate
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2
        
        if (dataArray[i] > 200) { // Only consider strong frequencies
          const frequency = i * sampleRate / analyzerRef.current!.fftSize
          if (frequency < 20000) { // Only include audible frequencies
            dominantFreqs.add(Math.round(frequency))
          }
        }

        canvasCtx.fillStyle = `rgb(50,50,${Math.min(255, barHeight + 100)})`
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }

      const uniqueFreqs = Array.from(dominantFreqs).slice(0, 5)
      setFrequencies(uniqueFreqs)
      if (uniqueFreqs.length > 0) {
        setCapturedFrequencies(prev => [
          ...prev,
          { timestamp: new Date().toLocaleTimeString(), frequencies: uniqueFreqs }
        ].slice(-10)) // Keep only the last 10 entries
      }
    }

    draw()
  }

  const analyzeFrequencies = async () => {
    const allFrequencies = capturedFrequencies.flatMap(cf => cf.frequencies);
    const frequencyCounts = allFrequencies.reduce((acc, freq) => {
      acc[freq] = (acc[freq] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const sortedFrequencies = Object.entries(frequencyCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([freq]) => parseInt(freq));

    console.log('Sending frequencies for analysis:', sortedFrequencies);

    try {
      const response = await fetch('/api/analyze-frequency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ frequencies: sortedFrequencies }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received analysis:', data);

      setAnalysis(data.analysis);
      setMedicalAnalysis(data.medicalAnalysis);
    } catch (error) {
      console.error('Error analyzing frequencies:', error);
      setError(`Failed to analyze frequencies. ${error instanceof Error ? error.message : 'Unknown error occurred.'}`);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Advanced Quantum Frequency Analyzer</CardTitle>
          <CardDescription>Analyze your personal frequency patterns for deep health insights.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={200} 
              className="w-full border border-gray-300 rounded"
            />
          </div>
          <div className="flex gap-4 mb-4">
            {!isRecording ? (
              <Button onClick={startRecording} className="bg-green-500 hover:bg-green-600">
                Start Recording
              </Button>
            ) : (
              <Button onClick={stopRecording} className="bg-red-500 hover:bg-red-600">
                Stop Recording
              </Button>
            )}
            <Button onClick={analyzeFrequencies} className="bg-blue-500 hover:bg-blue-600">
              Analyze Frequencies
            </Button>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Current Dominant Frequencies:</h3>
            <div className="grid grid-cols-5 gap-2">
              {frequencies.map((freq, i) => (
                <div key={i} className="bg-blue-100 p-2 rounded text-center">
                  {freq} Hz
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Captured Frequencies:</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Frequencies (Hz)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {capturedFrequencies.map((capture, index) => (
                  <TableRow key={index}>
                    <TableCell>{capture.timestamp}</TableCell>
                    <TableCell>{capture.frequencies.join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {analysis && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Frequency Analysis:</h3>
              <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{analysis}</pre>
            </div>
          )}
          {medicalAnalysis && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2 text-blue-600">Your Personalized Frequency Analysis:</h3>
              <pre className="whitespace-pre-wrap bg-blue-50 p-4 rounded border border-blue-200">{medicalAnalysis}</pre>
            </div>
          )}
        </CardContent>
      </Card>
      
      <AnalysisCategories />
      
      </div>
  )
}

export default FrequencyAnalyzer

