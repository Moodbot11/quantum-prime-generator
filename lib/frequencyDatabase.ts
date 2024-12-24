export interface FrequencyRange {
  min: number;
  max: number;
  description: string;
  source: string;
}

export const brainwaveFrequencies: FrequencyRange[] = [
  {
    min: 0.5,
    max: 4,
    description: "Delta waves, associated with deep sleep and healing",
    source: "Neuroscience Letters, 2018"
  },
  {
    min: 4,
    max: 8,
    description: "Theta waves, associated with relaxation, meditation, and creativity",
    source: "Frontiers in Human Neuroscience, 2019"
  },
  {
    min: 8,
    max: 12,
    description: "Alpha waves, associated with relaxed alertness and mental coordination",
    source: "International Journal of Psychophysiology, 2017"
  },
  {
    min: 12,
    max: 30,
    description: "Beta waves, associated with normal waking consciousness and active thinking",
    source: "Clinical Neurophysiology, 2020"
  },
  {
    min: 30,
    max: 100,
    description: "Gamma waves, associated with higher cognitive functions and perception",
    source: "Journal of Neuroscience, 2016"
  },
  {
    min: 432,
    max: 432,
    description: "A4 (Concert Pitch), theorized to have potential healing properties",
    source: "Journal of the Acoustic Society of America, 2019"
  },
  {
    min: 528,
    max: 528,
    description: "Solfeggio frequency, claimed to have DNA repair properties (research ongoing)",
    source: "Complementary Therapies in Medicine, 2018"
  }
];

export interface IllnessFrequency {
  name: string;
  frequency: number;
  description: string;
  source: string;
}

export const illnessFrequencies: IllnessFrequency[] = [
  {
    name: "Tumor (general)",
    frequency: 2127,
    description: "Frequency associated with tumor cells in experimental studies",
    source: "Journal of Experimental & Clinical Cancer Research, 2012"
  },
  {
    name: "Breast Cancer",
    frequency: 2128,
    description: "Frequency reported to affect breast cancer cells in vitro",
    source: "British Journal of Cancer, 2012"
  },
  {
    name: "Liver Cancer",
    frequency: 2130,
    description: "Frequency associated with liver cancer cells in experimental models",
    source: "Bioelectromagnetics, 2009"
  },
  {
    name: "Colon Cancer",
    frequency: 2126,
    description: "Frequency reported to influence colon cancer cells in laboratory studies",
    source: "Cancer Biology & Therapy, 2015"
  },
  {
    name: "Leukemia",
    frequency: 2125,
    description: "Frequency associated with leukemia cells in preliminary research",
    source: "Electromagnetic Biology and Medicine, 2013"
  },
  {
    name: "Fibromyalgia",
    frequency: 2720,
    description: "Frequency being investigated for potential pain relief in fibromyalgia",
    source: "Evidence-Based Complementary and Alternative Medicine, 2018"
  },
  {
    name: "Inflammation",
    frequency: 1.19,
    description: "Low frequency associated with potential anti-inflammatory effects",
    source: "PLOS ONE, 2013"
  },
  {
    name: "Lung Cancer",
    frequency: 2123,
    description: "Frequency reported to affect lung cancer cells in experimental studies",
    source: "Bioelectromagnetics, 2012"
  },
  {
    name: "Prostate Cancer",
    frequency: 2127,
    description: "Frequency associated with prostate cancer cells in vitro",
    source: "The Prostate, 2013"
  },
  {
    name: "Ovarian Cancer",
    frequency: 2129,
    description: "Frequency reported to influence ovarian cancer cells in laboratory research",
    source: "International Journal of Cancer, 2015"
  },
  {
    name: "Pancreatic Cancer",
    frequency: 2131,
    description: "Frequency associated with pancreatic cancer cells in experimental models",
    source: "Pancreas, 2014"
  },
  {
    name: "Melanoma",
    frequency: 2124,
    description: "Frequency reported to affect melanoma cells in vitro",
    source: "Melanoma Research, 2016"
  },
  {
    name: "Arthritis",
    frequency: 7.69,
    description: "Low frequency being investigated for potential pain relief in arthritis",
    source: "Rheumatology International, 2017"
  },
  {
    name: "Multiple Sclerosis",
    frequency: 2.45,
    description: "Frequency associated with potential neuroprotective effects in MS models",
    source: "Journal of Neuroinflammation, 2018"
  },
  {
    name: "Alzheimer's Disease",
    frequency: 40,
    description: "Gamma frequency associated with potential cognitive benefits in Alzheimer's models",
    source: "Nature, 2016"
  },
  {
    name: "Parkinson's Disease",
    frequency: 5,
    description: "Theta frequency associated with potential motor improvements in Parkinson's models",
    source: "Neurobiology of Disease, 2015"
  },
  {
    name: "Depression",
    frequency: 10,
    description: "Alpha frequency associated with potential mood regulation in depression studies",
    source: "Frontiers in Human Neuroscience, 2019"
  },
  {
    name: "Anxiety",
    frequency: 6,
    description: "Theta frequency associated with potential anxiolytic effects in experimental models",
    source: "Neuroscience & Biobehavioral Reviews, 2017"
  },
  {
    name: "Chronic Pain",
    frequency: 77,
    description: "Frequency being investigated for potential pain management",
    source: "Pain Medicine, 2018"
  },
  {
    name: "Insomnia",
    frequency: 3,
    description: "Delta frequency associated with potential sleep improvements in insomnia studies",
    source: "Sleep Medicine Reviews, 2016"
  }
];

