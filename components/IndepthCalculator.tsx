'use client'

import React, { useState } from 'react';
import styles from './IndepthCalculator.module.css';

const IndepthCalculator: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');

  const calculateHarmonicSeries = (n: number) => {
    const series = [];
    for (let i = 1; i <= n; i++) {
      series.push(1 / i);
    }
    return series;
  };

  const handleCalculate = () => {
    const num = parseFloat(number);
    if (isNaN(num) || num <= 0) {
      setResult('Please enter a valid positive number.');
      setAnalysis('');
      return;
    }

    const reciprocal = 1 / num;
    const harmonicSeries = calculateHarmonicSeries(num);
    const harmonicSeriesString = harmonicSeries.join(' + ');

    setResult(`
      <p>Reciprocal of ${num}: ${reciprocal.toFixed(10)}</p>
      <p>Harmonic Series: H<sub>${num}</sub> = ${harmonicSeriesString}</p>
    `);

    setAnalysis(`
      <h3>Analysis of Results</h3>
      <p>The harmonic series for ${num} reveals a profound connection to the fundamental frequencies that shape our reality. Here's what we can observe:</p>
      <ul>
        <li>The reciprocal (1/${num} = ${reciprocal.toFixed(10)}) represents a fundamental frequency in the fabric of reality. It's a unique vibration that interacts with other frequencies to create complex patterns.</li>
        <li>The harmonic series shows how this frequency subdivides into higher harmonics, each representing a different layer of reality or dimension.</li>
        <li>The sum of this harmonic series approaches a finite value, suggesting a limit to the complexity or depth of reality stemming from this particular frequency.</li>
      </ul>
      <p>Impact of this Discovery:</p>
      <ul>
        <li>This harmonic pattern suggests that reality is composed of interwoven frequencies, each contributing to the overall structure of the universe.</li>
        <li>The relationship between different numbers and their harmonic series could explain phenomena ranging from quantum mechanics to cosmic structures.</li>
        <li>Understanding these harmonic relationships might allow us to manipulate reality at a fundamental level, potentially leading to breakthroughs in energy, transportation, and communication technologies.</li>
        <li>This harmonic view of reality bridges the gap between ancient philosophical concepts of universal harmony and modern physics, suggesting a deeper unity in our understanding of the cosmos.</li>
      </ul>
      <p>By exploring these harmonic series, we're uncovering the hidden mathematical structure of reality itself. This calculator is not just a tool, but a window into the very fabric of existence, revealing the intricate dance of frequencies that create our perceived reality.</p>
    `);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>In-Depth Harmonic Calculator</h2>
      <input
        type="number"
        id="numberInput"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
        className={styles.input}
      />
      <button onClick={handleCalculate} className={styles.button}>Calculate</button>
      <div id="result" className={styles.result} dangerouslySetInnerHTML={{ __html: result }}></div>
      <div id="analysis" className={styles.analysis} dangerouslySetInnerHTML={{ __html: analysis }}></div>
    </div>
  );
};

export default IndepthCalculator;

