export type Productivity = "avo" | "antonony" | "ambany" | "sarotra";

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
  avo: "#3a8a3a",
  antonony: "#e6c34a",
  ambany: "#e08a3c",
  sarotra: "#c0392b",
};

export const productivityLabel: Record<Productivity, string> = {
  avo: "Mety tsara",
  antonony: "Antonony",
  ambany: "Ambany",
  sarotra: "Faritra sarotra",
};

export const madagascarRegions: RegionData[] = [
  {
    id: "antananarivo",
    name: "Antananarivo",
    lat: -18.8792,
    lng: 47.5079,
    climate: "Toetrandro mangatsiatsiaka an-tampon-tany",
    soil: "Tany volkano malemy",
    rainfall: "1300 mm/taona",
    temperature: "13–25°C",
    productivity: "avo",
    fertility: 86,
    summary: "Faritra afovoany misy tany volkano lonaka, tsara ho an’ny vary sy fambolena legioma.",
    crops: [
      { name: "Vary", suitability: 96, season: "Nov–Apr" },
      { name: "Ovy", suitability: 88, season: "May–Sep" },
      { name: "Katsaka", suitability: 80, season: "Oct–Mar" },
    ],
    fertilizers: ["NPK 11-22-16", "Compost", "Urea"],
    risks: ["Havandra", "Fanala (Jona–Aog)"],
    advice: [
      "Ampiasao tanimbary avo kely hifehezana rano",
      "Ataovy mifandimby ny vary sy legioma manatsara azota",
      "Mamboly hazo fiarovana amin’ny rivotra",
    ],
  },
  {
    id: "alaotra",
    name: "Alaotra-Mangoro",
    lat: -17.83,
    lng: 48.42,
    climate: "Toetrandro mando subtropikaly",
    soil: "Tany avy amin’ny renirano",
    rainfall: "1500 mm/taona",
    temperature: "16–28°C",
    productivity: "avo",
    fertility: 90,
    summary: "Faritra lehibe famokarana vary eto Madagasikara.",
    crops: [
      { name: "Vary", suitability: 98, season: "Nov–May" },
      { name: "Mangahazo", suitability: 82, season: "Mandavan-taona" },
      { name: "Tsaramaso", suitability: 75, season: "Apr–Aug" },
    ],
    fertilizers: ["NPK 16-16-16", "Zezi-pahitra"],
    risks: ["Tondra-drano", "Fihotsahan’ny tany"],
    advice: ["Tazomy ny lakandrano", "Ampiasao teknika SRI"],
  },
  {
    id: "atsinanana",
    name: "Atsinanana",
    lat: -18.15,
    lng: 49.4,
    climate: "Toetrandro tropikaly mando",
    soil: "Tany lateritika",
    rainfall: "3200 mm/taona",
    temperature: "20–30°C",
    productivity: "antonony",
    fertility: 65,
    summary: "Faritra atsinanana be orana, mety amin’ny lavanila sy voankazo tropikaly.",
    crops: [
      { name: "Lavanila", suitability: 90, season: "Sep–Dec" },
      { name: "Letchi", suitability: 88, season: "Nov–Jan" },
      { name: "Jirofo", suitability: 82, season: "Aug–Nov" },
    ],
    fertilizers: ["Chaux", "Compost", "NPK 12-12-17"],
    risks: ["Rivo-doza", "Fahanteran’ny tany"],
    advice: ["Asio chaux isan-taona", "Mamboly hazo alokaloka ho an’ny lavanila"],
  },
  {
    id: "vakinankaratra",
    name: "Vakinankaratra",
    lat: -19.87,
    lng: 47.03,
    climate: "Toetrandro mangatsiaka an-tampon-tany",
    soil: "Tany volkano",
    rainfall: "1400 mm/taona",
    temperature: "10–22°C",
    productivity: "avo",
    fertility: 88,
    summary: "Faritra malaza amin’ny ovy, legioma ary ronono.",
    crops: [
      { name: "Ovy", suitability: 95, season: "Aug–Dec" },
      { name: "Varimbazaha", suitability: 78, season: "May–Oct" },
      { name: "Karoty", suitability: 84, season: "Mandavan-taona" },
    ],
    fertilizers: ["NPK 15-15-15", "Zezi-pahitra"],
    risks: ["Fanala", "Aretin’ovy"],
    advice: ["Mampiasà voa tsara kalitao", "Jereo matetika ny aretina"],
  },
  {
    id: "sava",
    name: "Sava",
    lat: -14.27,
    lng: 50.17,
    climate: "Toetrandro tropikaly mando",
    soil: "Tany tanimanga lateritika",
    rainfall: "2000 mm/taona",
    temperature: "22–31°C",
    productivity: "antonony",
    fertility: 70,
    summary: "Faritra voalohany amin’ny lavanila eran-tany.",
    crops: [
      { name: "Lavanila", suitability: 97, season: "Sep–Dec" },
      { name: "Kafe", suitability: 84, season: "May–Aug" },
      { name: "Voanio", suitability: 80, season: "Mandavan-taona" },
    ],
    fertilizers: ["Compost", "Chaux", "NPK 10-10-20"],
    risks: ["Rivo-doza", "Halatra lavanila"],
    advice: ["Ataovy maraina ny fandotoana tanana", "Ampifangaro amin’ny jirofo"],
  },
  {
    id: "menabe",
    name: "Menabe",
    lat: -20.28,
    lng: 44.32,
    climate: "Toetrandro tropikaly maina",
    soil: "Tany fasika",
    rainfall: "750 mm/taona",
    temperature: "20–34°C",
    productivity: "ambany",
    fertility: 48,
    summary: "Faritra andrefana maina, tsara amin’ny voly mahazaka haintany.",
    crops: [
      { name: "Mangahazo", suitability: 86, season: "Nov–Jun" },
      { name: "Voanjo", suitability: 78, season: "Nov–Mar" },
      { name: "Katsaka", suitability: 70, season: "Dec–Apr" },
    ],
    fertilizers: ["Zezi-pahitra", "DAP"],
    risks: ["Haintany", "Valala"],
    advice: ["Saromy bozaka ny tany", "Ampiasao voa haingana mitombo"],
  },
  {
    id: "androy",
    name: "Androy",
    lat: -25.03,
    lng: 46.05,
    climate: "Toetrandro somary maina",
    soil: "Tany fasika misy vatosokay",
    rainfall: "400 mm/taona",
    temperature: "18–35°C",
    productivity: "sarotra",
    fertility: 28,
    summary: "Faritra atsimo maina be, mahazaka tsara ny sorgho sy mangahazo.",
    crops: [
      { name: "Sorgho", suitability: 70, season: "Dec–Apr" },
      { name: "Cowpea", suitability: 66, season: "Nov–Feb" },
      { name: "Mangahazo", suitability: 60, season: "Mandavan-taona" },
    ],
    fertilizers: ["Compost", "Lavenona hazo"],
    risks: ["Haintany mafy", "Fihavian’ny fasika"],
    advice: ["Manangona rano", "Mamboly hazo fiarovana"],
  },
  {
    id: "diana",
    name: "Diana",
    lat: -12.78,
    lng: 49.3,
    climate: "Toetrandro tropikaly mando antonony",
    soil: "Tany volkano basaltika",
    rainfall: "1700 mm/taona",
    temperature: "22–32°C",
    productivity: "avo",
    fertility: 82,
    summary: "Faritra avaratra lonaka, tsara amin’ny fary sy kakao.",
    crops: [
      { name: "Fary", suitability: 92, season: "Apr–Nov" },
      { name: "Kakao", suitability: 86, season: "Mandavan-taona" },
      { name: "Ylang-ylang", suitability: 80, season: "Mandavan-taona" },
    ],
    fertilizers: ["NPK 14-7-21", "Filter cake"],
    risks: ["Rivo-doza", "Bibikely manimba kakao"],
    advice: ["Ampifangaro amin’ny akondro ny kakao", "Jereo bibikely matetika"],
  },
  {
    id: "boeny",
    name: "Boeny",
    lat: -16.0,
    lng: 46.32,
    climate: "Toetrandro savana tropikaly",
    soil: "Tany fasika avy amin’ny renirano",
    rainfall: "1100 mm/taona",
    temperature: "22–33°C",
    productivity: "antonony",
    fertility: 68,
    summary: "Faritra avaratra andrefana, mety amin’ny vary sy landihazo.",
    crops: [
      { name: "Vary", suitability: 84, season: "May–Oct" },
      { name: "Landihazo", suitability: 78, season: "Nov–Apr" },
      { name: "Manga", suitability: 82, season: "Sep–Dec" },
    ],
    fertilizers: ["NPK 17-17-17", "Urea"],
    risks: ["Doro tanety", "Orana tsy ara-potoana"],
    advice: ["Ampiasao fanondrahana avy amin’ny renirano", "Manaova aro afo"],
  },
];
