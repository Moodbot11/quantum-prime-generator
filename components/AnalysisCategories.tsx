import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Brainwave Patterns",
    subcategories: ["Delta", "Theta", "Alpha", "Beta", "Gamma"]
  },
  {
    name: "Cancer Types",
    subcategories: ["Breast", "Lung", "Colon", "Prostate", "Ovarian", "Pancreatic", "Liver", "Leukemia", "Melanoma"]
  },
  {
    name: "Neurological Conditions",
    subcategories: ["Alzheimer's", "Parkinson's", "Multiple Sclerosis", "Epilepsy", "Migraine"]
  },
  {
    name: "Mental Health",
    subcategories: ["Depression", "Anxiety", "PTSD", "Bipolar Disorder", "Schizophrenia"]
  },
  {
    name: "Chronic Conditions",
    subcategories: ["Fibromyalgia", "Chronic Fatigue Syndrome", "Arthritis", "Chronic Pain"]
  },
  {
    name: "Cardiovascular Health",
    subcategories: ["Heart Rate Variability", "Blood Pressure", "Circulation"]
  },
  {
    name: "Respiratory System",
    subcategories: ["Asthma", "COPD", "Sleep Apnea"]
  },
  {
    name: "Digestive Health",
    subcategories: ["IBS", "Crohn's Disease", "Ulcerative Colitis"]
  },
  {
    name: "Endocrine System",
    subcategories: ["Thyroid Function", "Adrenal Function", "Diabetes"]
  },
  {
    name: "Immune System",
    subcategories: ["Autoimmune Disorders", "Inflammation", "Allergies"]
  },
  {
    name: "Sleep Patterns",
    subcategories: ["Insomnia", "Sleep Quality", "Circadian Rhythm"]
  },
  {
    name: "Stress and Relaxation",
    subcategories: ["Cortisol Levels", "Meditation States", "Relaxation Response"]
  },
  {
    name: "Cognitive Functions",
    subcategories: ["Memory", "Focus", "Creativity", "Problem-solving"]
  },
  {
    name: "Energy and Vitality",
    subcategories: ["Cellular Energy Production", "Fatigue Levels", "Overall Vitality"]
  },
  {
    name: "Emotional States",
    subcategories: ["Mood Regulation", "Emotional Balance", "Positive Emotions"]
  },
  {
    name: "Physical Performance",
    subcategories: ["Muscle Function", "Endurance", "Recovery"]
  },
  {
    name: "Cellular Health",
    subcategories: ["DNA Repair", "Cell Regeneration", "Oxidative Stress"]
  },
  {
    name: "Biofield and Energy Medicine",
    subcategories: ["Chakra Alignment", "Meridian Flow", "Aura Integrity"]
  },
  {
    name: "Environmental Interactions",
    subcategories: ["EMF Sensitivity", "Geopathic Stress", "Environmental Toxins"]
  },
  {
    name: "Spiritual and Consciousness States",
    subcategories: ["Transcendental Experiences", "Altered States of Consciousness", "Spiritual Well-being"]
  }
]

const AnalysisCategories: React.FC = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Analysis Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Your frequencies are analyzed against the following categories and subcategories:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <h3 className="font-bold mb-2">{category.name}</h3>
              <ul className="list-disc list-inside">
                {category.subcategories.map((subcat, subIndex) => (
                  <li key={subIndex} className="text-sm">{subcat}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default AnalysisCategories

