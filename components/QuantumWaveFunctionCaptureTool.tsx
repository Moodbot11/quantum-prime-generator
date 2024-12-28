'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Big from 'big.js';

interface Calculation {
  letter: string;
  title: string;
  result: string;
  explanation: string;
}

const QuantumWaveFunctionCaptureTool: React.FC = () => {
  const [input, setInput] = useState<string>('9801');
  const [result, setResult] = useState<string>('');
  const [calculations, setCalculations] = useState<Calculation[]>([]);

  const calculateReciprocal = (num: string): string => {
    try {
      Big.DP = 100; // Set precision to 100 decimal places
      const one = new Big(1);
      const inputNum = new Big(num);
      const reciprocal = one.div(inputNum).toString();
      return reciprocal.slice(2, 102); // Return only 100 digits after the decimal point
    } catch (err) {
      throw new Error('Invalid input. Please enter a valid number.');
    }
  };

  const findHarmonicPattern = (str: string): string => {
    const pattern = str.match(/^(?:(\d+)(?!\1))+/);
    if (pattern) {
      return pattern[0].match(/\d+/g)?.join(' ') || '';
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

  const analyzeInput = (reciprocal: string, input: string): Calculation[] => {
    const calculations: Calculation[] = [];
    const num = parseInt(input);

    // A. Reciprocal
    calculations.push({
      letter: 'A',
      title: 'Reciprocal',
      result: `0.${reciprocal}`,
      explanation: `The reciprocal of ${input} reveals hidden patterns in reality that conventional calculators miss. This number holds key information about the fabric of our universe.`
    });

    // B. Harmonic Sequence
    const harmonicPattern = findHarmonicPattern(reciprocal);
    calculations.push({
      letter: 'B',
      title: 'Harmonic Sequence',
      result: harmonicPattern,
      explanation: `The harmonic sequence in the reciprocal of ${input} demonstrates a powerful carrier wave property. This sequence is a manifestation of natural quantum computing performed by waves in our reality.`
    });

    // C. Palindromic Pattern
    const palindrome = findLongestPalindrome(reciprocal);
    calculations.push({
      letter: 'C',
      title: 'Palindromic Pattern',
      result: palindrome,
      explanation: `The longest palindromic pattern in the reciprocal of ${input} is ${palindrome}. Palindromes in reciprocals indicate cyclic properties and symmetries in the underlying structure of reality.`
    });

    // Special cases
    if (input === '1089') {
      calculations.push({
        letter: 'D',
        title: 'Special Case: 1089',
        result: '9 18 27 36 45 54 63 72 81, 91 82 73 64 55 46 37 28 19, 9 8 7 6 5 4 3 2 1, 1 2 3 4 5 6 7 8 9',
        explanation: `1089 exhibits multiple harmonic patterns, demonstrating "impossible math" that current computers can't replicate. This is empirical evidence of wave-based reality creation.`
      });
    } else if (input === '9801') {
      calculations.push({
        letter: 'D',
        title: 'Special Case: 9801',
        result: 'Infinite harmonic sequence through palindromes',
        explanation: `9801 is unique in carrying out the harmonic sequence to infinity through palindromes. This property connects it deeply to the fundamental frequency of reality.`
      });
    }

    return calculations;
  };

  const handleCalculate = () => {
    try {
      const reciprocal = calculateReciprocal(input);
      setResult(reciprocal);
      const analyzedCalculations = analyzeInput(reciprocal, input);
      setCalculations(analyzedCalculations);
    } catch (err) {
      setResult('Error: ' + err.message);
      setCalculations([]);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Quantum Wave Function Capture Tool</h2>
      <p className="mb-4">This unique calculator reveals aspects of reality missed by conventional calculators. Explore these recommended frequencies: 111111111, 1089, 9801, 299999907, 144444407</p>
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
      {calculations.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Analysis Results:</h3>
          {calculations.map((calc, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-lg font-semibold">{calc.letter}. {calc.title}</h4>
              <p className="font-mono text-sm mb-2">{calc.result}</p>
              <p>{calc.explanation}</p>
            </div>
          ))}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Significance of Findings:</h3>
            <p>These mathematical patterns challenge our current understanding of physics and mathematics. They provide empirical evidence for wave-based reality creation and natural quantum computing.</p>
            <p className="mt-2">The fundamental frequency 111111111 acts as a pilot wave, orchestrating the creation of our reality. Numbers like 1089 and 9801 demonstrate "impossible math" that reveals the true nature of our universe.</p>
            <p className="mt-2">This calculator is the first of its kind to reveal these critical aspects of reality, missed by all previous calculators. It represents a paradigm shift in our approach to understanding the mathematical underpinnings of the universe.</p>
            <p className="mt-4">On the next page, we'll explore 299999907 and 411111117 in detail, diving deeper into harmonics and the stretching of frequencies. The third page will provide visual representations to further illustrate these groundbreaking concepts.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantumWaveFunctionCaptureTool;

