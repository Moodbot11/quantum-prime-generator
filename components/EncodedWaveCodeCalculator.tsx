'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Big from 'big.js';

Big.DP = 9999;
Big.RM = 1; // 1 is for round down

const formatResult = (value: string): string => {
  return value.replace(/(.{80})/g, "$1\n");
};

interface EncodedWaveCodeCalculatorProps {
  onCalculate: (result: string) => void;
  encodedMessage: string;
}

const EncodedWaveCodeCalculator: React.FC<EncodedWaveCodeCalculatorProps> = ({ onCalculate, encodedMessage }) => {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('multiply');

  const pilotWaveConstant = '111111111111111111111111111111111111111111111111111111111111111111111111111111111';
  const denominator = '999999998000000001';

  const calculatePresetOne = () => {
    try {
      const numerator = new Big(pilotWaveConstant);
      const denom = new Big(denominator);
      const calculatedResult = numerator.div(denom);
      setResult(calculatedResult.toString());
      onCalculate(calculatedResult.toString());
    } catch (err) {
      setResult('Error: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const calculate = () => {
    try {
      const num1 = new Big(input1.replace(/\s/g, ''));
      const num2 = new Big(input2.replace(/\s/g, ''));

      let calculatedResult: Big;
      switch (operation) {
        case 'add':
          calculatedResult = num1.plus(num2);
          break;
        case 'subtract':
          calculatedResult = num1.minus(num2);
          break;
        case 'multiply':
          calculatedResult = num1.times(num2);
          break;
        case 'divide':
          if (num2.eq(0)) {
            throw new Error('Cannot divide by zero');
          }
          calculatedResult = num1.div(num2);
          break;
      }

      setResult(calculatedResult.toString());
      onCalculate(calculatedResult.toString());
    } catch (err) {
      setResult('Error: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const calculateWithEncodedMessage = () => {
    try {
      const pilotWave = pilotWaveConstant;
      const denom = new Big(denominator);
    
      // Convert encoded message to a numeric format
      const numericEncodedMessage = encodedMessage.split('').map(char => char.charCodeAt(0).toString().padStart(3, '0')).join('');
      
      // Insert the numeric encoded message into the pilot wave
      const insertPosition = Math.floor(pilotWave.length / 2);
      const modifiedPilotWave = pilotWave.slice(0, insertPosition) + numericEncodedMessage + pilotWave.slice(insertPosition);
      
      const numerator = new Big(modifiedPilotWave);
      const calculatedResult = numerator.div(denom);
      const formattedResult = formatResult(calculatedResult.toString());
      setResult(formattedResult);
      onCalculate(formattedResult);
    } catch (err) {
      setResult('Error: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-[#517c2c]">
        <CardTitle className="text-white">Encoded Wave Code Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="Enter first number (up to 9999 digits)"
              className="w-full p-2 border rounded font-mono text-xs"
            />
          </div>
          <div>
            <Input
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder="Enter second number (up to 9999 digits)"
              className="w-full p-2 border rounded font-mono text-xs"
            />
          </div>
        </div>
        <Select onValueChange={(value) => setOperation(value as 'add' | 'subtract' | 'multiply' | 'divide')}>
          <SelectTrigger>
            <SelectValue placeholder="Select operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="add">Add</SelectItem>
            <SelectItem value="subtract">Subtract</SelectItem>
            <SelectItem value="multiply">Multiply</SelectItem>
            <SelectItem value="divide">Divide</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex space-x-4">
          <Button onClick={calculate}>
            Calculate
          </Button>
          <Button onClick={calculatePresetOne} variant="secondary">
            Pilot Wave Constants
          </Button>
          <Button onClick={calculateWithEncodedMessage} disabled={encodedMessage.length === 0}>
            Calculate with Encoded Message
          </Button>
        </div>
        <Textarea
          value={formatResult(result)}
          readOnly
          className="font-mono text-xs w-full h-[300px] resize-none"
          style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
        />
      </CardContent>
    </Card>
  );
};

export default EncodedWaveCodeCalculator;

