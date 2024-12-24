'use client'

import React from 'react'
import FrequencyAnalyzer from '@/components/FrequencyAnalyzer'
import FrequencySynthesizer from '@/components/FrequencySynthesizer'

export default function FrequencyToolsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Quantum Frequency Tools</h1>
        <FrequencyAnalyzer />
        <FrequencySynthesizer />
      </div>
    </div>
  )
}

