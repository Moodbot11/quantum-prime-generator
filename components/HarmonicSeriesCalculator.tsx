import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const HarmonicSeriesCalculator: React.FC = () => {
  const [start, setStart] = useState<string>('');
  const [step, setStep] = useState<string>('');
  const [count, setCount] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculateHarmonicSeries = () => {
    const startNum = parseFloat(start);
    const stepNum = parseFloat(step);
    const countNum = parseInt(count);

    if (isNaN(startNum) || isNaN(stepNum) || isNaN(countNum)) {
      setResult('Please enter valid numbers');
      return;
    }

    let series = [];
    for (let i = 0; i < countNum; i++) {
      series.push((startNum + i * stepNum).toFixed(2));
    }

    setResult(series.join(', '));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Harmonic Series Calculator</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="start">Start:</Label>
          <Input
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Enter start number"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="step">Step:</Label>
          <Input
            id="step"
            value={step}
            onChange={(e) => setStep(e.target.value)}
            placeholder="Enter step size"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="count">Count:</Label>
          <Input
            id="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="Enter number of terms"
            className="mt-1"
          />
        </div>
      </div>
      <Button onClick={calculateHarmonicSeries} className="mb-4">Calculate</Button>
      {result && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Harmonic Series:</h3>
          <div className="bg-gray-100 p-2 rounded overflow-x-auto">
            <pre className="font-mono text-sm">{result}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default HarmonicSeriesCalculator;

