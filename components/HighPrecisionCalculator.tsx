'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Big from 'big.js';
import ImageManipulator from './ImageManipulator';

const HighPrecisionCalculator: React.FC = () => {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [operation, setOperation] = useState<'multiply' | 'divide'>('multiply');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    try {
      Big.DP = 9999;  // Set decimal places to 9999
      Big.RM = 1;     // Set rounding mode to round down

      const num1 = new Big(input1);
      const num2 = new Big(input2);
      let calculatedResult: Big;

      if (operation === 'multiply') {
        calculatedResult = num1.times(num2);
      } else {
        if (num2.eq(0)) {
          throw new Error('Cannot divide by zero');
        }
        calculatedResult = num1.div(num2);
      }

      // Convert to string and keep all significant digits
      let resultString = calculatedResult.toString();

      // Remove trailing zeros after the decimal point, but keep one if it's a whole number
      resultString = resultString.replace(/\.?0+$/, "");
      if (resultString.endsWith('.')) {
        resultString += '0';
      }

      setResult(resultString);
    } catch (error) {
      setResult('Error: Invalid input');
    }
  };

  return (
    <div className="w-full max-w-[40%] mx-auto p-4 bg-gray-100 rounded-lg shadow">
      <div className="space-y-4">
        <div>
          <label htmlFor="frequency1" className="block text-sm font-medium text-gray-700 mb-1">Frequency 1</label>
          <Input
            id="frequency1"
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="Enter first frequency"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="frequency2" className="block text-sm font-medium text-gray-700 mb-1">Frequency 2</label>
          <Input
            id="frequency2"
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Enter second frequency"
            className="w-full"
          />
        </div>
        <div className="flex justify-between">
          <Button
            onClick={() => setOperation('multiply')}
            className={operation === 'multiply' ? 'bg-blue-600' : 'bg-gray-300'}
          >
            Coherent Multiplication
          </Button>
          <Button
            onClick={() => setOperation('divide')}
            className={operation === 'divide' ? 'bg-blue-600' : 'bg-gray-300'}
          >
            Interference by Division
          </Button>
        </div>
        <Button onClick={calculate} className="w-full">Calculate</Button>
      </div>
      {result && <ImageManipulator result={result} />}
    </div>
  );
};

export default HighPrecisionCalculator;

