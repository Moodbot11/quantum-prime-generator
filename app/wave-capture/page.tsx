import QuantumWaveFunctionCaptureTool from '../../components/QuantumWaveFunctionCaptureTool'

export default function WaveCapturePage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-cyan-400">Quantum Wave Function Capture Tool</h1>
        <QuantumWaveFunctionCaptureTool />
      </div>
    </div>
  )
}

