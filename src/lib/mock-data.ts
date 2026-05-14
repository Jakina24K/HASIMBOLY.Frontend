// Centralized mock data — swap with real API/ML/ontology calls later.

export const diseases = [
  {
    id: "d1",
    name: "Tomato Late Blight",
    crop: "Tomato",
    severity: "High",
    confidence: 0.94,
    color: "destructive",
  },
  {
    id: "d2",
    name: "Cassava Mosaic Disease",
    crop: "Cassava",
    severity: "Medium",
    confidence: 0.87,
    color: "warning",
  },
  {
    id: "d3",
    name: "Rice Blast",
    crop: "Rice",
    severity: "High",
    confidence: 0.91,
    color: "destructive",
  },
  {
    id: "d4",
    name: "Maize Leaf Rust",
    crop: "Maize",
    severity: "Low",
    confidence: 0.78,
    color: "warning",
  },
  {
    id: "d5",
    name: "Coffee Leaf Rust",
    crop: "Coffee",
    severity: "Medium",
    confidence: 0.83,
    color: "warning",
  },
];

export const recentDiagnoses = [
  {
    id: "r1",
    crop: "Voatabia",
    disease: "Late Blight",
    date: "2026-04-28",
    confidence: 94,
    region: "Analamanga",
  },
  {
    id: "r2",
    crop: "Vary",
    disease: "Healthy",
    date: "2026-04-27",
    confidence: 99,
    region: "Alaotra-Mangoro",
  },
  {
    id: "r3",
    crop: "Mangahazo",
    disease: "Mosaic Virus",
    date: "2026-04-26",
    confidence: 87,
    region: "Atsinanana",
  },
  {
    id: "r4",
    crop: "Katsaka",
    disease: "Leaf Rust",
    date: "2026-04-25",
    confidence: 78,
    region: "Vakinankaratra",
  },
  {
    id: "r5",
    crop: "Kafe",
    disease: "Healthy",
    date: "2026-04-24",
    confidence: 96,
    region: "Sava",
  },
];

export const regions = [
  {
    id: "analamanga",
    name: "Analamanga",
    climate: "Highland temperate",
    soil: "Volcanic loam",
    crops: ["Rice", "Potato", "Maize"],
  },
  {
    id: "alaotra",
    name: "Alaotra-Mangoro",
    climate: "Subtropical humid",
    soil: "Alluvial",
    crops: ["Rice", "Cassava"],
  },
  {
    id: "atsinanana",
    name: "Atsinanana",
    climate: "Tropical wet",
    soil: "Lateritic",
    crops: ["Vanilla", "Lychee", "Cloves"],
  },
  {
    id: "vakinankaratra",
    name: "Vakinankaratra",
    climate: "Highland cool",
    soil: "Volcanic",
    crops: ["Potato", "Wheat", "Carrot"],
  },
  {
    id: "sava",
    name: "Sava",
    climate: "Tropical humid",
    soil: "Lateritic clay",
    crops: ["Vanilla", "Coffee", "Coconut"],
  },
  {
    id: "menabe",
    name: "Menabe",
    climate: "Tropical dry",
    soil: "Sandy",
    crops: ["Maize", "Peanut", "Cassava"],
  },
];

export const cropRecommendations = [
  {
    name: "Vary",
    score: 96,
    yield: "5.2 t/ha",
    season: "Nov–Apr",
    note: "Optimal for highland paddies with reliable rainfall.",
  },
  {
    name: "Mangahazo",
    score: 89,
    yield: "12 t/ha",
    season: "Year-round",
    note: "Drought-tolerant, suitable for poor soils.",
  },
  {
    name: "Katsaka",
    score: 82,
    yield: "3.8 t/ha",
    season: "Oct–Mar",
    note: "Pair with legume rotation to maintain N levels.",
  },
  {
    name: "Vomanga",
    score: 76,
    yield: "8 t/ha",
    season: "Aug–Jan",
    note: "Strong food-security crop, low input.",
  },
];

export const ontologyConcepts = [
  { id: "c1", subject: "Rice", predicate: "thrivesIn", object: "Volcanic loam", strength: 0.92 },
  { id: "c2", subject: "Rice", predicate: "requires", object: "Standing water", strength: 0.98 },
  { id: "c3", subject: "Cassava", predicate: "tolerates", object: "Drought", strength: 0.88 },
  {
    id: "c4",
    subject: "Vanilla",
    predicate: "needsClimate",
    object: "Tropical humid",
    strength: 0.95,
  },
  { id: "c5", subject: "Maize", predicate: "respondsTo", object: "NPK 12-24-12", strength: 0.81 },
  { id: "c6", subject: "Coffee", predicate: "prefersAltitude", object: "800–1500m", strength: 0.9 },
  {
    id: "c7",
    subject: "Lateritic soil",
    predicate: "needsAmendment",
    object: "Lime",
    strength: 0.74,
  },
];

export const alerts = [
  {
    id: "a1",
    level: "high",
    title: "Late blight risk surge",
    region: "Vakinankaratra",
    time: "2h ago",
  },
  { id: "a2", level: "medium", title: "Dry spell forecast", region: "Menabe", time: "6h ago" },
  {
    id: "a3",
    level: "info",
    title: "Optimal sowing window",
    region: "Alaotra-Mangoro",
    time: "1d ago",
  },
];

export const usageStats = [
  { day: "Mon", diagnoses: 12, recommendations: 8 },
  { day: "Tue", diagnoses: 18, recommendations: 11 },
  { day: "Wed", diagnoses: 15, recommendations: 14 },
  { day: "Thu", diagnoses: 22, recommendations: 9 },
  { day: "Fri", diagnoses: 28, recommendations: 17 },
  { day: "Sat", diagnoses: 19, recommendations: 12 },
  { day: "Sun", diagnoses: 14, recommendations: 7 },
];

export const treatments: Record<string, { treatment: string[]; prevention: string[] }> = {
  "Tomato Late Blight": {
    treatment: [
      "Remove and destroy infected leaves immediately",
      "Apply copper-based fungicide every 7–10 days",
      "Improve airflow by pruning lower foliage",
    ],
    prevention: [
      "Use resistant cultivars (e.g. Mountain Magic)",
      "Avoid overhead watering — drip irrigation preferred",
      "Rotate crops on a 3-year cycle",
    ],
  },
};
