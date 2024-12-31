'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const MessageEncoder: React.FC<{ onEncode: (message: string) => void }> = ({ onEncode }) => {
  const [input, setInput] = useState('');
  const [encodingMethod, setEncodingMethod] = useState('binary');
  const [encodedMessage, setEncodedMessage] = useState('');

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
        encoded = input.toLowerCase().split('').map(char => char.charCodeAt(0) - 96).join(' ');
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
    <div className="space-y-4">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your message"
      />
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
      <Button onClick={encodeMessage}>Encode Message</Button>
      {encodedMessage && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Encoded Message:</h3>
          <p className="font-mono break-all">{encodedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default MessageEncoder;

