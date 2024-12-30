'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Big from 'big.js';

Big.DP = 9999;
Big.RM = 1; // 1 is for round down

const formatResult = (value: string): string => {
  // Insert line breaks every 80 characters
  return value.replace(/(.{80})/g, "$1\n");
};

const WaveCodeCalculator: React.FC = () => {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [result, setResult] = useState<string>('');

const calculatePresetOne = () => {
  try {
    const numerator = new Big('111111111111111111111111111111111111111111111111111111111111111111111111111111111');
    const denominator = new Big('999999998000000001');
    const calculatedResult = numerator.div(denominator);
    setResult(calculatedResult.toString());
  } catch (err) {
    setResult('Error: ' + (err instanceof Error ? err.message : String(err)));
  }
};

  const calculate = () => {
    try {
      const num1 = new Big(input1.replace(/\s/g, ''));
      const num2 = new Big(input2.replace(/\s/g, ''));

      if (num2.eq(0)) {
        throw new Error('Cannot divide by zero');
      }
      const calculatedResult = num1.div(num2);
      setResult(calculatedResult.toString());
    } catch (err) {
      setResult('Error: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-[#517c2c]">
        <CardTitle className="text-white">Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <textarea
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="Enter numerator (up to 9999 digits)"
              className="w-full p-2 border rounded font-mono text-xs"
              rows={20}
            />
          </div>
          <div>
            <textarea
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder="Enter denominator (up to 9999 digits)"
              className="w-full p-2 border rounded font-mono text-xs"
              rows={20}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <Button onClick={calculate}>
            Calculate Division
          </Button>
          <Button onClick={calculatePresetOne} variant="secondary">
            Pilot Wave Constants
          </Button>
        </div>
        <Textarea
          value={formatResult(result)}
          readOnly
          className="font-mono text-xs w-full h-[600px] resize-none"
          style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
        />
      </CardContent>
    </Card>
  );
};

export default WaveCodeCalculator;

