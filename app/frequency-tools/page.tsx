import FrequencyAnalyzer from '@/components/FrequencyAnalyzer'
import FrequencySynthesizer from '@/components/FrequencySynthesizer'
import MedicalFrequencyAnalyzer from '@/components/MedicalFrequencyAnalyzer'

export default function FrequencyToolsPage() {
return (
  <div className="container mx-auto py-10">
    <h1 className="text-3xl font-bold mb-6">Frequency Tools</h1>
    
    <div className="grid grid-cols-1 gap-8">
      <MedicalFrequencyAnalyzer />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FrequencyAnalyzer />
        <FrequencySynthesizer />
      </div>
    </div>
  </div>
)
}

