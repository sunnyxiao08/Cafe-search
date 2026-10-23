import { UserLocation } from '../types';

export const POPULAR_LOCATIONS: UserLocation[] = [
  { name: '捷運忠孝敦化站 (東區)', lat: 25.0418, lng: 121.5513 },
  { name: '台北車站 (交通樞紐)', lat: 25.0478, lng: 121.5170 },
  { name: '捷運中山站 (赤峰文青街區)', lat: 25.0531, lng: 121.5204 },
  { name: '市政府站 (信義商圈)', lat: 25.0410, lng: 121.5654 },
  { name: '公館站 (台大商圈)', lat: 25.0138, lng: 121.5342 },
  { name: '松江南京站 (商業核心)', lat: 25.0519, lng: 121.5332 },
  { name: '板橋車站 (新板特區)', lat: 25.0135, lng: 121.4627 },
];

/**
 * Calculates distance in kilometers between two coordinates using Haversine formula
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}
