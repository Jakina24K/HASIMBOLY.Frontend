export type Productivity = "high" | "medium" | "low" | "difficult";

export interface RegionData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  climate: string;
  soil: string;
  rainfall: string;
  temperature: string;
  productivity: Productivity;
  fertility: number; // 0-100
  summary: string;
  crops: { name: string; suitability: number; season: string }[];
  fertilizers: string[];
  risks: string[];
  advice: string[];
}

export const productivityColor: Record<Productivity, string> = {
  high: "#3a8a3a",
  medium: "#e6c34a",
  low: "#e08a3c",
  difficult: "#c0392b",
};

export const productivityLabel: Record<Productivity, string> = {
  high: "High potential",
  medium: "Medium",
  low: "Low",
  difficult: "Difficult zone",
};

export const madagascarRegions: RegionData[] = [
  {
    id: "antananarivo",
    name: "Antananarivo",
    lat: -18.8792,
    lng: 47.5079,
    climate: "Highland temperate",
    soil: "Volcanic loam",
    rainfall: "1300 mm/yr",
    temperature: "13–25°C",
    productivity: "high",
    fertility: 86,
    summary:
      "Central highlands with rich volcanic soils, ideal for paddy rice and horticulture.",
    crops: [
      { name: "Rice (Vary)", suitability: 96, season: "Nov–Apr" },
      { name: "Potato", suitability: 88, season: "May–Sep" },
      { name: "Maize", suitability: 80, season: "Oct–Mar" },
    ],
    fertilizers: ["NPK 11-22-16", "Compost", "Urea (top dressing)"],
    risks: ["Hailstorms", "Frost (June–Aug)"],
    advice: [
      "Use raised paddies for water control",
      "Rotate rice with legumes to restore N",
      "Plant windbreaks against hail",
    ],
  },
  {
    id: "alaotra",
    name: "Alaotra-Mangoro",
    lat: -17.83,
    lng: 48.42,
    climate: "Subtropical humid",
    soil: "Alluvial",
    rainfall: "1500 mm/yr",
    temperature: "16–28°C",
    productivity: "high",
    fertility: 90,
    summary: "Madagascar's rice basket — Lake Alaotra plains support intensive paddy cultivation.",
    crops: [
      { name: "Rice", suitability: 98, season: "Nov–May" },
      { name: "Cassava", suitability: 82, season: "Year-round" },
      { name: "Beans", suitability: 75, season: "Apr–Aug" },
    ],
    fertilizers: ["NPK 16-16-16", "Organic manure"],
    risks: ["Flooding", "Soil erosion"],
    advice: ["Maintain drainage canals", "Adopt SRI rice intensification"],
  },
  {
    id: "atsinanana",
    name: "Atsinanana",
    lat: -18.15,
    lng: 49.4,
    climate: "Tropical wet",
    soil: "Lateritic",
    rainfall: "3200 mm/yr",
    temperature: "20–30°C",
    productivity: "medium",
    fertility: 65,
    summary: "Eastern coastal belt with high rainfall, suited to spices and tropical fruits.",
    crops: [
      { name: "Vanilla", suitability: 90, season: "Sep–Dec" },
      { name: "Lychee", suitability: 88, season: "Nov–Jan" },
      { name: "Cloves", suitability: 82, season: "Aug–Nov" },
    ],
    fertilizers: ["Lime (acidity correction)", "Compost", "NPK 12-12-17"],
    risks: ["Cyclones (Jan–Mar)", "Acidic soil leaching"],
    advice: ["Apply lime yearly", "Use shade trees for vanilla", "Reinforce trellises pre-cyclone"],
  },
  {
    id: "vakinankaratra",
    name: "Vakinankaratra",
    lat: -19.87,
    lng: 47.03,
    climate: "Highland cool",
    soil: "Volcanic",
    rainfall: "1400 mm/yr",
    temperature: "10–22°C",
    productivity: "high",
    fertility: 88,
    summary: "Cool-climate highlands producing temperate vegetables, dairy and seed potatoes.",
    crops: [
      { name: "Potato", suitability: 95, season: "Aug–Dec" },
      { name: "Wheat", suitability: 78, season: "May–Oct" },
      { name: "Carrot", suitability: 84, season: "Year-round" },
    ],
    fertilizers: ["NPK 15-15-15", "Manure"],
    risks: ["Frost", "Late blight outbreaks"],
    advice: ["Use certified seed potatoes", "Scout weekly for blight"],
  },
  {
    id: "sava",
    name: "Sava",
    lat: -14.27,
    lng: 50.17,
    climate: "Tropical humid",
    soil: "Lateritic clay",
    rainfall: "2000 mm/yr",
    temperature: "22–31°C",
    productivity: "medium",
    fertility: 70,
    summary: "World's leading vanilla region; also strong in coffee and coconut.",
    crops: [
      { name: "Vanilla", suitability: 97, season: "Sep–Dec" },
      { name: "Coffee", suitability: 84, season: "May–Aug" },
      { name: "Coconut", suitability: 80, season: "Year-round" },
    ],
    fertilizers: ["Compost", "Lime", "NPK 10-10-20"],
    risks: ["Cyclones", "Vanilla theft"],
    advice: ["Hand-pollinate vanilla early morning", "Diversify with cloves"],
  },
  {
    id: "menabe",
    name: "Menabe",
    lat: -20.28,
    lng: 44.32,
    climate: "Tropical dry",
    soil: "Sandy",
    rainfall: "750 mm/yr",
    temperature: "20–34°C",
    productivity: "low",
    fertility: 48,
    summary: "Dry western plains — drought-tolerant crops and pastoralism dominate.",
    crops: [
      { name: "Cassava", suitability: 86, season: "Nov–Jun" },
      { name: "Peanut", suitability: 78, season: "Nov–Mar" },
      { name: "Maize", suitability: 70, season: "Dec–Apr" },
    ],
    fertilizers: ["Manure", "DAP at planting"],
    risks: ["Drought", "Locust swarms"],
    advice: ["Mulch heavily to retain moisture", "Adopt early-maturing varieties"],
  },
  {
    id: "androy",
    name: "Androy",
    lat: -25.03,
    lng: 46.05,
    climate: "Semi-arid",
    soil: "Sandy-calcareous",
    rainfall: "400 mm/yr",
    temperature: "18–35°C",
    productivity: "difficult",
    fertility: 28,
    summary: "Arid south — chronic drought; resilient sorghum, millet and prickly pear.",
    crops: [
      { name: "Sorghum", suitability: 70, season: "Dec–Apr" },
      { name: "Cowpea", suitability: 66, season: "Nov–Feb" },
      { name: "Cassava", suitability: 60, season: "Year-round" },
    ],
    fertilizers: ["Compost", "Wood ash"],
    risks: ["Severe drought (kere)", "Wind erosion"],
    advice: ["Build water harvesting basins", "Plant agroforestry windbreaks"],
  },
  {
    id: "diana",
    name: "Diana",
    lat: -12.78,
    lng: 49.3,
    climate: "Tropical sub-humid",
    soil: "Volcanic-basaltic",
    rainfall: "1700 mm/yr",
    temperature: "22–32°C",
    productivity: "high",
    fertility: 82,
    summary: "Northern tip with fertile basaltic soils — sugar cane, ylang-ylang and cocoa.",
    crops: [
      { name: "Sugar cane", suitability: 92, season: "Apr–Nov" },
      { name: "Cocoa", suitability: 86, season: "Year-round" },
      { name: "Ylang-ylang", suitability: 80, season: "Year-round" },
    ],
    fertilizers: ["NPK 14-7-21", "Filter cake"],
    risks: ["Cyclones", "Pest pressure on cocoa"],
    advice: ["Inter-crop cocoa with banana shade", "Monitor capsid bugs"],
  },
  {
    id: "boeny",
    name: "Boeny",
    lat: -16.0,
    lng: 46.32,
    climate: "Tropical savanna",
    soil: "Alluvial-sandy",
    rainfall: "1100 mm/yr",
    temperature: "22–33°C",
    productivity: "medium",
    fertility: 68,
    summary: "Northwest savanna with seasonal rivers — rice, cotton and cattle ranching.",
    crops: [
      { name: "Rice (off-season)", suitability: 84, season: "May–Oct" },
      { name: "Cotton", suitability: 78, season: "Nov–Apr" },
      { name: "Mango", suitability: 82, season: "Sep–Dec" },
    ],
    fertilizers: ["NPK 17-17-17", "Urea"],
    risks: ["Bush fires", "Irregular rainfall"],
    advice: ["Use river-fed irrigation", "Establish firebreaks before dry season"],
  },
];
