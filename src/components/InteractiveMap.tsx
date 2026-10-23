import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Coffee,
  Zap,
  Wifi,
  Sun,
  Star,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import { CafeItem, UserLocation, UserVisitPlan } from '../types';
import { calculateDistanceKm, formatDistance } from '../utils/distanceUtils';
import { checkOpenStatusAt } from '../utils/timeUtils';

interface InteractiveMapProps {
  cafes: CafeItem[];
  userLocation: UserLocation;
  selectedCafeId: string | null;
  onSelectCafe: (cafe: CafeItem) => void;
  visitPlan: UserVisitPlan;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  cafes,
  userLocation,
  selectedCafeId,
  onSelectCafe,
  visitPlan,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredCafe, setHoveredCafe] = useState<CafeItem | null>(null);

  // Map coordinate bounds relative to userLocation
  // 1 degree latitude ~= 111 km, 1 degree longitude ~= 100 km at 25N
  // Center is (userLocation.lng, userLocation.lat)
  const mapWidth = 900;
  const mapHeight = 520;
  const centerX = mapWidth / 2;
  const centerY = mapHeight / 2;

  // Scale: pixels per km
  // At zoom 1: 1 km = 65 pixels
  const pixelsPerKm = 70 * zoomLevel;

  const getCoordinates = (lat: number, lng: number) => {
    // 1 deg lat = 111 km, 1 deg lng = 100 km
    const dyKm = (lat - userLocation.lat) * 111;
    const dxKm = (lng - userLocation.lng) * 100;

    // In SVG, y is inverted (north is up = -y)
    const x = centerX + dxKm * pixelsPerKm;
    const y = centerY - dyKm * pixelsPerKm;
    return { x, y, dxKm, dyKm };
  };

  return (
    <div className="relative w-full bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden shadow-lg select-none">
      {/* Top Map Bar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-stone-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-800 text-xs text-white">
        <Navigation className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span>出發中心：</span>
        <span className="font-semibold text-amber-300">{userLocation.name}</span>
      </div>

      {/* Map Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 bg-stone-950/80 backdrop-blur-md p-1 rounded-xl border border-stone-800">
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.2))}
          className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
          title="放大地圖"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.65))}
          className="p-1.5 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
          title="縮小地圖"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          className="w-full h-[400px] sm:h-[480px] bg-stone-950"
        >
          <defs>
            <radialGradient id="userRadarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#292524"
                strokeWidth="0.8"
                strokeDasharray="2,2"
              />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width={mapWidth} height={mapHeight} fill="url(#mapGrid)" />

          {/* Distance Radius Rings around User */}
          {[0.5, 1.0, 2.0, 3.5].map((radiusKm) => {
            const rPx = radiusKm * pixelsPerKm;
            return (
              <g key={radiusKm}>
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={rPx}
                  fill="none"
                  stroke="#44403c"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  opacity="0.6"
                />
                <text
                  x={centerX + rPx + 4}
                  y={centerY - 4}
                  fill="#78716c"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {radiusKm < 1 ? `${radiusKm * 1000}m` : `${radiusKm}km`}
                </text>
              </g>
            );
          })}

          {/* User Location Radar Pulse & Center Marker */}
          <circle cx={centerX} cy={centerY} r={32} fill="url(#userRadarGlow)" />
          <circle cx={centerX} cy={centerY} r={8} fill="#f59e0b" className="animate-pulse" />
          <circle cx={centerX} cy={centerY} r={4} fill="#ffffff" />
          <text
            x={centerX}
            y={centerY + 20}
            textAnchor="middle"
            fill="#d6d3d1"
            fontSize="11"
            fontWeight="600"
          >
            目前起點
          </text>

          {/* Cafe Pins */}
          {cafes.map((cafe) => {
            const { x, y } = getCoordinates(cafe.lat, cafe.lng);
            const openStatus = checkOpenStatusAt(
              cafe.operatingHours,
              visitPlan.date,
              visitPlan.time,
              visitPlan.durationHours
            );
            const isSelected = selectedCafeId === cafe.id;
            const dist = calculateDistanceKm(
              userLocation.lat,
              userLocation.lng,
              cafe.lat,
              cafe.lng
            );

            // Don't render if outside canvas bounds with margin
            if (x < -20 || x > mapWidth + 20 || y < -20 || y > mapHeight + 20) {
              return null;
            }

            return (
              <g
                key={cafe.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => onSelectCafe(cafe)}
                onMouseEnter={() => setHoveredCafe(cafe)}
                onMouseLeave={() => setHoveredCafe(null)}
              >
                {/* Connection line back to user if selected */}
                {isSelected && (
                  <line
                    x1={0}
                    y1={0}
                    x2={centerX - x}
                    y2={centerY - y}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                    opacity="0.7"
                  />
                )}

                {/* Pin Shadow */}
                <ellipse cx={0} cy={12} rx={8} ry={3} fill="#000000" opacity="0.4" />

                {/* Pin Circle */}
                <circle
                  cx={0}
                  cy={0}
                  r={isSelected ? 16 : 13}
                  fill={openStatus.isOpen ? '#059669' : '#dc2626'}
                  stroke={isSelected ? '#fde68a' : '#ffffff'}
                  strokeWidth={isSelected ? 3 : 2}
                  className="filter drop-shadow-md transition-all hover:scale-125"
                />

                {/* Coffee Icon inside pin */}
                <Coffee
                  x={-6}
                  y={-6}
                  width={12}
                  height={12}
                  color="#ffffff"
                  strokeWidth={2.5}
                />

                {/* Cafe Label Pill */}
                <g transform="translate(0, -22)">
                  <rect
                    x={-45}
                    y={-10}
                    width={90}
                    height={16}
                    rx={8}
                    fill="#1c1917"
                    stroke={isSelected ? '#f59e0b' : '#44403c'}
                    strokeWidth={isSelected ? 1.5 : 1}
                    opacity="0.95"
                  />
                  <text
                    x={0}
                    y={2}
                    textAnchor="middle"
                    fill={isSelected ? '#fef08a' : '#f5f5f4'}
                    fontSize="9"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                  >
                    {cafe.name.length > 7 ? `${cafe.name.slice(0, 6)}...` : cafe.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Hover Card on Bottom */}
      {hoveredCafe && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-stone-900/95 backdrop-blur-md border border-stone-700/80 rounded-xl p-3.5 text-white shadow-xl animate-in fade-in duration-150">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-xs text-amber-400 font-medium">
                {hoveredCafe.district} · {formatDistance(calculateDistanceKm(userLocation.lat, userLocation.lng, hoveredCafe.lat, hoveredCafe.lng))}
              </div>
              <h4 className="text-sm font-bold text-white leading-tight">{hoveredCafe.name}</h4>
            </div>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{hoveredCafe.rating}</span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-stone-800 grid grid-cols-2 gap-2 text-xs text-stone-300">
            <div className="flex items-center gap-1 text-[11px]">
              <Zap className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="truncate">
                {hoveredCafe.socketLevel === 'abundant' ? '幾乎每桌有插座' : '多數席有插座'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px]">
              <Wifi className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="truncate">{hoveredCafe.wifiSpeedMbps} Mbps 高速</span>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-xs pt-1">
            <span className="text-stone-400 text-[11px]">
              飲品 NT$ {hoveredCafe.drinkPricing.minPrice} 起 · {hoveredCafe.timeLimit.label.split('/')[0]}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={hoveredCafe.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white hover:text-amber-400 bg-stone-800 hover:bg-stone-700 px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1 border border-stone-700"
              >
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>Google Map</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <button
                onClick={() => onSelectCafe(hoveredCafe)}
                className="text-amber-400 hover:text-amber-300 font-semibold text-[11px] inline-flex items-center gap-0.5"
              >
                查看詳情
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="p-3 bg-stone-950 border-t border-stone-800 text-[11px] text-stone-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>所選時段營業中</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>該時段休息 / 公休</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>目前出發點</span>
          </div>
        </div>
        <div>點擊地圖上的咖啡廳地標，可直接查看該店完整評測資訊</div>
      </div>
    </div>
  );
};
