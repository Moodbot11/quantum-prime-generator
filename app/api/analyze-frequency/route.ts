import { NextResponse } from 'next/server';
import { brainwaveFrequencies, illnessFrequencies } from '@/lib/frequencyDatabase';

export async function POST(req: Request) {
  console.log('API route hit: /api/analyze-frequency');
  try {
    const { frequencies } = await req.json();
    console.log('Frequencies to analyze:', frequencies);

    const analysis = analyzeFrequencies(frequencies);
    const medicalAnalysis = performMedicalAnalysis(frequencies);

    console.log('Analysis completed');
    return NextResponse.json({ analysis, medicalAnalysis });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

function analyzeFrequencies(frequencies: number[]): string {
  let analysis = 'Based on the captured frequencies:\n\n';
  
  frequencies.forEach(freq => {
    const matchingRanges = brainwaveFrequencies.filter(
      range => freq >= range.min && freq <= range.max
    );

    analysis += `Frequency ${freq} Hz:\n`;
    if (matchingRanges.length > 0) {
      matchingRanges.forEach(range => {
        analysis += `- ${range.description}\n  Source: ${range.source}\n`;
      });
    } else {
      analysis += getGeneralFrequencyDescription(freq);
    }
    analysis += '\n';
  });

  return analysis;
}

function performMedicalAnalysis(frequencies: number[]): string {
  let medicalAnalysis = 'Frequency Correlation Analysis:\n\n';
  let matchFound = false;

  frequencies.forEach(freq => {
    const matchingIllnesses = illnessFrequencies.filter(
      illness => Math.abs(illness.frequency - freq) <= 5
    );

    medicalAnalysis += `Frequency ${freq} Hz:\n`;
    if (matchingIllnesses.length > 0) {
      matchFound = true;
      matchingIllnesses.forEach(illness => {
        medicalAnalysis += `- ${illness.name} (${illness.frequency} Hz)\n  ${illness.description}\n  Source: ${illness.source}\n`;
      });
    } else {
      medicalAnalysis += getPositiveFrequencyEffect(freq);
    }
    medicalAnalysis += '\n';
  });

  if (!matchFound) {
    medicalAnalysis += 'While no specific correlations were found with known frequency-illness associations, remember that all frequencies can have various effects on the body and mind.\n';
  }

  medicalAnalysis += '\nIMPORTANT DISCLAIMER: This analysis is based on experimental research and theoretical correlations. It should NOT be considered a medical diagnosis. The effects of specific frequencies on health are still being studied and are not conclusively proven. Always consult with a qualified healthcare professional for proper medical advice, diagnosis, and treatment.';

  return medicalAnalysis;
}

function getGeneralFrequencyDescription(freq: number): string {
  if (freq < 20) {
    return `This low frequency is associated with deep relaxation and meditative states. It may promote calmness and introspection.\n`;
  } else if (freq < 100) {
    return `This frequency falls within the range of brain waves associated with various cognitive states, from relaxed alertness to focused concentration.\n`;
  } else if (freq < 1000) {
    return `This frequency is in the audible range and may have subtle effects on mood and physiology. Some studies suggest potential benefits for relaxation or focus.\n`;
  } else {
    return `This higher frequency is beyond the typical brainwave ranges but may still interact with the body's electromagnetic field in subtle ways.\n`;
  }
}

function getPositiveFrequencyEffect(freq: number): string {
  const effects = [
    "May promote a sense of balance and harmony.",
    "Could potentially enhance mental clarity and focus.",
    "Might contribute to a feeling of well-being and relaxation.",
    "Some researchers suggest it may support the body's natural healing processes.",
    "May help in achieving a meditative state or deeper relaxation.",
    "Could potentially aid in stress reduction and promoting calmness.",
    "Might enhance creativity and problem-solving abilities.",
    "Some studies indicate it may improve sleep quality when used before bedtime.",
    "Could potentially boost energy levels and motivation.",
    "May contribute to an overall sense of vitality and wellness."
  ];
  return `- ${effects[Math.floor(Math.random() * effects.length)]}\n  Note: These effects are based on general frequency research and individual experiences may vary.\n`;
}

