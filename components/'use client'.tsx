'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Big from 'big.js';

const formatResult = (value: Big): string => {
  let strValue = value.toString();
  if (strValue.includes('e')) {
    const [mantissa, exponent] = strValue.split('e');
    const exp = parseInt(exponent);
    if (exp > 0) {
      strValue = mantissa.replace('.', '') + '0'.repeat(exp - (mantissa.length - 2));
    } else {
      strValue = '0.' + '0'.repeat(-exp - 1) + mantissa.replace('.', '');
    }
  }
  // Insert line breaks every 80 characters
  return strValue.slice(0, 9999).replace(/(.{80})/g, "$1\n");
};

const WaveCodeCalculator: React.FC = () => {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculatePresetOne = () => {
    try {
      Big.DP = 9999; // Set precision to 9999 digits
      const numerator = new Big('111111111111111111111111111111111111111111111111111111111111111111111111111111111');
      const denominator = new Big('999999998000000001');
      const calculatedResult = numerator.div(denominator);
      setResult(formatResult(calculatedResult));
    } catch (err) {
      setResult('Error: Invalid calculation');
    }
  };

  const calculate = () => {
    try {
      Big.DP = 9999;  // Set precision to 9999 digits
      const num1 = new Big(input1);
      const num2 = new Big(input2);

      if (num2.eq(0)) {
        throw new Error('Cannot divide by zero');
      }
      const calculatedResult = num1.div(num2);
      setResult(formatResult(calculatedResult));
    } catch (err) {
      setResult('Error: ' + err.message);
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
            <input
              type="text"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="Enter numerator"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <input
              type="text"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder="Enter denominator"
              className="w-full p-2 border rounded"
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
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="font-mono text-xs w-full h-[600px] resize-none"
          style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
          readOnly={false}
        />
      </CardContent>
    </Card>
  );
};

export default WaveCodeCalculator;

