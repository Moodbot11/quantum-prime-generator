import React, { useMemo } from 'react';

interface Pattern {
  type: string;
  value: string;
}

interface PatternRecognizerProps {
  input: string;
}

const PatternRecognizer: React.FC<PatternRecognizerProps> = ({ input }) => {
  const recognizePatterns = useMemo(() => {
    const patterns: Pattern[] = [];

    if (!input) {
      return patterns;
    }

    // Limit input length for performance
    const limitedInput = input.slice(0, 1000);

    // Harmonic series (optimized)
    for (let step = 1; step <= 9; step++) {
      let sequence = '';
      let prevNum = -1;
      for (let i = 0; i < limitedInput.length - step; i += step) {
        const num = parseInt(limitedInput.slice(i, i + step));
        if (prevNum === -1 || num === prevNum + step) {
          sequence += num;
          prevNum = num;
        } else {
          break;
        }
      }
      if (sequence.length > step * 3) {
        patterns.push({ type: 'Harmonic Series', value: sequence });
      }
    }

    // Palindromes (optimized)
    for (let i = 0; i < limitedInput.length; i++) {
      for (let j = i + 2; j <= limitedInput.length; j++) {
        const substr = limitedInput.slice(i, j);
        if (substr === substr.split('').reverse().join('') && substr.length > 2) {
          patterns.push({ type: 'Palindrome', value: substr });
          break; // Only capture the longest palindrome starting at each position
        }
      }
    }

    // Special series (optimized)
    const specialPattern = /([01])\1*(?!\1)([01])\2*(?!\2)([01])\3*/g;
    const matches = limitedInput.match(specialPattern);
    if (matches) {
      matches.forEach(match => {
        if (match.length >= 5) {
          patterns.push({ type: 'Special Series', value: match });
        }
      });
    }

    return patterns;
  }, [input]);

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Recognized Patterns:</h3>
      {recognizePatterns.map((pattern, index) => (
        <div key={index} className="mb-2">
          <strong>{pattern.type}:</strong> {pattern.value}
        </div>
      ))}
    </div>
  );
};

export default PatternRecognizer;

