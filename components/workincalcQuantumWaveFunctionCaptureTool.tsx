'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Big from 'big.js';

const QuantumWaveFunctionCaptureTool: React.FC = () => {
  const [input, setInput] = useState<string>('9801');
  const [result, setResult] = useState<string>('');
  const [patterns, setPatterns] = useState<string[]>([]);

  const calculateReciprocal = (num: string): string => {
    try {
      Big.DP = 1000; // Increase precision to 1000 decimal places
      const one = new Big(1);
      const inputNum = new Big(num);
      const reciprocal = one.div(inputNum).toString();
      return reciprocal.slice(2); // Remove "0." at the start
    } catch (err) {
      throw new Error('Invalid input. Please enter a valid number.');
    }
  };

  const findPatterns = (reciprocal: string, input: string) => {
    const patterns = [];
    
    // Check for repeating sequences
    const repeatingSequence = findRepeatingSequence(reciprocal);
    if (repeatingSequence) {
      patterns.push(`Repeating sequence: ${repeatingSequence}`);
    }
    
    // Check for palindromic patterns
    const palindrome = findLongestPalindrome(reciprocal);
    if (palindrome.length > 1) {
      patterns.push(`Longest palindromic pattern: ${palindrome}`);
    }
    
    // Check for harmonic series patterns
    const harmonicPattern = findHarmonicPattern(reciprocal);
    if (harmonicPattern) {
      patterns.push(`Harmonic series pattern: ${harmonicPattern}`);
    }
    
    // Check for interesting mathematical properties of the input
    const inputProperties = findInputProperties(input);
    patterns.push(...inputProperties);
    
    return patterns;
  };

  const findRepeatingSequence = (str: string): string => {
    for (let i = 1; i <= str.length / 2; i++) {
      const sequence = str.slice(0, i);
      if (str.slice(i, i + sequence.length) === sequence) {
        return sequence;
      }
    }
    return '';
  };

  const findLongestPalindrome = (str: string): string => {
    let longest = '';
    for (let i = 0; i < str.length; i++) {
      for (let j = i + 1; j <= str.length; j++) {
        const substr = str.slice(i, j);
        if (substr === substr.split('').reverse().join('') && substr.length > longest.length) {
          longest = substr;
        }
      }
    }
    return longest;
  };

  const findHarmonicPattern = (str: string): string => {
    const pattern = str.match(/^(?:(\d+)(?!\1))+/);
    return pattern ? pattern[0] : '';
  };

  const findInputProperties = (input: string): string[] => {
    const properties = [];
    const num = parseInt(input);
    
    if (Number.isInteger(Math.sqrt(num))) {
      properties.push(`${input} is a perfect square (${Math.sqrt(num)}^2)`);
    }
    
    if (num % 9 === 0 || num % 11 === 0) {
      properties.push(`${input} is divisible by 9 or 11, which often leads to interesting reciprocal patterns`);
    }
    
    const factors = [];
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) factors.push(num / i);
      }
    }
    if (factors.length > 0) {
      properties.push(`Factors of ${input}: ${factors.sort((a, b) => a - b).join(', ')}`);
    }
    
    return properties;
  };

  const handleCalculate = () => {
    try {
      const reciprocal = calculateReciprocal(input);
      setResult(reciprocal);
      const foundPatterns = findPatterns(reciprocal, input);
      setPatterns(foundPatterns);
    } catch (err) {
      setResult('Error: ' + err.message);
      setPatterns([]);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Quantum Wave Function Capture Tool</h2>
      <div className="mb-4">
        <Label htmlFor="input">Enter a number:</Label>
        <Input
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter any number"
          className="mt-1"
        />
      </div>
      <Button onClick={handleCalculate} className="mb-4">Analyze</Button>
      {result && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Reciprocal:</h3>
          <div className="bg-gray-100 p-2 rounded overflow-x-auto">
            <pre className="font-mono text-sm">0.{result}</pre>
          </div>
        </div>
      )}
      {patterns.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Patterns and Properties:</h3>
          <ul className="list-disc list-inside">
            {patterns.map((pattern, index) => (
              <li key={index} className="mb-1">{pattern}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuantumWaveFunctionCaptureTool;

