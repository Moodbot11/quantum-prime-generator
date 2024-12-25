'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type ConversionType = 'binary' | 'hex' | 'base64' | 'morse'

const CodeConverter: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [conversionType, setConversionType] = useState<ConversionType>('binary')

  const convertText = () => {
    switch (conversionType) {
      case 'binary':
        setOutput(textToBinary(input))
        break
      case 'hex':
        setOutput(textToHex(input))
        break
      case 'base64':
        setOutput(btoa(input))
        break
      case 'morse':
        setOutput(textToMorse(input))
        break
    }
  }

  const textToBinary = (text: string) => {
    return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
  }

  const textToHex = (text: string) => {
    return text.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join(' ')
  }

  const textToMorse = (text: string) => {
    const morseCode: { [key: string]: string } = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
      '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
      '8': '---..', '9': '----.'
    }
    return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quantum Code Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter text to convert..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
          />
          <div className="flex items-center space-x-2">
            <Select onValueChange={(value) => setConversionType(value as ConversionType)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select conversion type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="binary">Binary</SelectItem>
                <SelectItem value="hex">Hexadecimal</SelectItem>
                <SelectItem value="base64">Base64</SelectItem>
                <SelectItem value="morse">Morse Code</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={convertText}>Convert</Button>
          </div>
          <Textarea
            placeholder="Converted output..."
            value={output}
            readOnly
            rows={5}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default CodeConverter

