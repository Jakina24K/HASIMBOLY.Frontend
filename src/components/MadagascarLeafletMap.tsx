import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  madagascarRegions,
  productivityColor,
  productivityLabel,
  type RegionData,
} from "@/lib/madagascar-regions";

type Layer = "productivity" | "rainfall" | "soil" | "climate" | "crops";

const tileForLayer: Record<Layer, { url: string; attribution: string }> = {
  productivity: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: "&copy; OpenStreetMap &copy; CARTO",
  },
  rainfall: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap",
  },
  soil: {
    url: "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
    attribution: "&copy; OpenStreetMap &copy; CARTO",
  },
  climate: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenTopoMap",
  },
  crops: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "&copy; Esri",
  },
};

function rainfallColor(mm: string) {
  const v = parseInt(mm);
  if (v > 2000) return "#1e6091";
  if (v > 1300) return "#2a9d8f";
  if (v > 900) return "#e9c46a";
  return "#e76f51";
}

function FlyTo({ region }: { region: RegionData | null }) {
  const map = useMap();
  useEffect(() => {
    if (region) map.flyTo([region.lat, region.lng], 7, { duration: 0.8 });
  }, [region, map]);
  return null;
}

function ResetControl({ onReset }: { onReset: () => void }) {
  const map = useMap();
  return (
    <button
      type="button"
      onClick={() => {
        map.flyTo([-18.8, 46.8], 6, { duration: 0.8 });
        onReset();
      }}
      className="absolute top-3 right-3 z-[400] rounded-md bg-card border border-border px-3 py-1.5 text-xs font-medium shadow hover:bg-accent"
    >
      Reset map
    </button>
  );
}

export function MadagascarLeafletMap({
  selected,
  onSelect,
  layer,
  highlightId,
}: {
  selected: RegionData | null;
  onSelect: (r: RegionData) => void;
  layer: Layer;
  highlightId?: string | null;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="h-full w-full bg-muted animate-pulse rounded-xl" />;
  }

  const tile = tileForLayer[layer];

  return (
    <MapContainer
      center={[-18.8, 46.8]}
      zoom={6}
      minZoom={5}
      maxZoom={10}
      scrollWheelZoom
      className="h-full w-full rounded-xl"
      style={{ background: "oklch(0.96 0.01 145)" }}
    >
      <TileLayer url={tile.url} attribution={tile.attribution} />
      <FlyTo region={selected} />
      <ResetControl onReset={() => onSelect(madagascarRegions[0])} />

      {madagascarRegions.map((r) => {
        const isActive = selected?.id === r.id || highlightId === r.id;
        const fill =
          layer === "rainfall"
            ? rainfallColor(r.rainfall)
            : productivityColor[r.productivity];
        return (
          <CircleMarker
            key={r.id}
            center={[r.lat, r.lng]}
            radius={isActive ? 18 : 13}
            pathOptions={{
              color: isActive ? "#111" : fill,
              weight: isActive ? 3 : 1.5,
              fillColor: fill,
              fillOpacity: isActive ? 0.9 : 0.7,
            }}
            eventHandlers={{
              click: () => onSelect(r),
              mouseover: (e) => e.target.setStyle({ weight: 3, fillOpacity: 0.95 }),
              mouseout: (e) =>
                e.target.setStyle({
                  weight: isActive ? 3 : 1.5,
                  fillOpacity: isActive ? 0.9 : 0.7,
                }),
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1}>
              <div className="text-xs">
                <div className="font-semibold text-sm">{r.name}</div>
                <div className="opacity-80">{r.climate} · {r.soil}</div>
                <div className="opacity-80">Rain {r.rainfall} · {r.temperature}</div>
                <div className="mt-1 font-medium" style={{ color: fill }}>
                  {productivityLabel[r.productivity]}
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

export default MadagascarLeafletMap;
