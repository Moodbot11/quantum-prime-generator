'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const QuantumConstants = () => {
  const [selectedConstant, setSelectedConstant] = useState("1x");

  const constants = [
    {
      name: "Pilot Wave (1x)",
      value: "1".repeat(81),
      explanation: "The base constant with 81 ones. Represents the fundamental frequency in quantum mechanics."
    },
    {
      name: "Double Pilot Wave (2x)",
      value: "1".repeat(162),
      explanation: "Contains 162 ones (2 * 81). Increases the size of the carrier wave constant."
    },
    {
      name: "Triple Pilot Wave (3x)",
      value: "1".repeat(243),
      explanation: "Contains 243 ones (3 * 81). Further increases the carrier wave constant size."
    },
    {
      name: "Quadruple Pilot Wave (4x)",
      value: "1".repeat(324),
      explanation: "Contains 324 ones (4 * 81). Continues the pattern of increasing carrier wave constant size."
    },
    {
      name: "Quintuple Pilot Wave (5x)",
      value: "1".repeat(405),
      explanation: "Contains 405 ones (5 * 81). The carrier wave constant size continues to grow."
    },
    {
      name: "Sextuple Pilot Wave (6x)",
      value: "1".repeat(486),
      explanation: "Contains 486 ones (6 * 81). The pattern of growth in carrier wave constant size continues."
    },
    {
      name: "Septuple Pilot Wave (7x)",
      value: "1".repeat(567),
      explanation: "Contains 567 ones (7 * 81). Demonstrates the ongoing expansion of the carrier wave constant."
    },
    {
      name: "Octuple Pilot Wave (8x)",
      value: "1".repeat(648),
      explanation: "Contains 648 ones (8 * 81). The carrier wave constant size reaches its penultimate stage in this series."
    },
    {
      name: "Nonuple Pilot Wave (9x)",
      value: "1".repeat(729),
      explanation: "Contains 729 ones (9 * 81). The final and largest constant in this series, maximizing the carrier wave constant size."
    }
  ];

  const selectedConstantData = constants.find(c => c.name.includes(`(${selectedConstant})`)) || constants[0];

  return (
    <Card className="w-full max-w-4xl mx-auto mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Quantum Constants</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">These constants are fundamental to our understanding of quantum mechanics and the fabric of reality. Each constant is a variation of the Pilot Wave, with an increasing number of ones. This progression affects the size of the carrier wave constants and changes the numbers in the columns from 1's to 2's, then 3's, and so on, revealing an intriguing pattern in quantum mechanics.</p>
        
        <Select onValueChange={setSelectedConstant} defaultValue={selectedConstant}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select constant" />
          </SelectTrigger>
          <SelectContent>
            {constants.map((constant, index) => (
              <SelectItem key={index} value={`${index + 1}x`}>{constant.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">{selectedConstantData.name}</h3>
          <p className="font-mono text-sm mb-2 break-all">{selectedConstantData.value}</p>
          <p className="text-sm text-gray-600">{selectedConstantData.explanation}</p>
          <p className="text-sm text-gray-600 mt-2">This constant is divided by 999999998000000001.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumConstants;

