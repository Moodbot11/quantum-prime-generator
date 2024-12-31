'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface MessageEncoderProps {
  onEncode: (message: string) => void;
  maxLength: number;
}

const MessageEncoder: React.FC<MessageEncoderProps> = ({ onEncode, maxLength }) => {
  const [input, setInput] = useState('');
  const [encodingMethod, setEncodingMethod] = useState('binary');
  const [encodedMessage, setEncodedMessage] = useState('');

  useEffect(() => {
    encodeMessage();
  }, [input, encodingMethod]);

  const encodeMessage = () => {
    let encoded = '';
    switch (encodingMethod) {
      case 'binary':
        encoded = input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        break;
      case 'numerical':
        encoded = input.split('').map(char => char.charCodeAt(0).toString(10).padStart(3, '0')).join(' ');
        break;
      case 'a1z26':
        encoded = input.toLowerCase().split('').map(char => {
          const code = char.charCodeAt(0) - 96;
          return code > 0 && code <= 26 ? code : char;
        }).join(' ');
        break;
      case 'telephone':
        const telephoneMap: {[key: string]: string} = {'abc': '2', 'def': '3', 'ghi': '4', 'jkl': '5', 'mno': '6', 'pqrs': '7', 'tuv': '8', 'wxyz': '9'};
        encoded = input.toLowerCase().split('').map(char => {
          for (let key in telephoneMap) {
            if (key.includes(char)) return telephoneMap[key];
          }
          return char;
        }).join('');
        break;
    }
    setEncodedMessage(encoded);
    onEncode(encoded);
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your message (max 9999 characters)"
          maxLength={maxLength}
          className="min-h-[100px]"
        />
        <p className="text-sm text-gray-500">
          {input.length} / {maxLength} characters
        </p>
        <Select onValueChange={setEncodingMethod} defaultValue={encodingMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Select encoding method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="binary">Binary</SelectItem>
            <SelectItem value="numerical">Numerical (ASCII)</SelectItem>
            <SelectItem value="a1z26">A1Z26 Cipher</SelectItem>
            <SelectItem value="telephone">Telephone Keypad</SelectItem>
          </SelectContent>
        </Select>
        {encodedMessage && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Encoded Message:</h3>
            <p className="font-mono text-sm break-all bg-gray-100 p-2 rounded">{encodedMessage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessageEncoder;

