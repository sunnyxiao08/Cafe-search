import React from 'react';
import {
  Star,
  MapPin,
  Clock,
  Zap,
  Wifi,
  Sun,
  Palette,
  Coffee,
  Bookmark,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { CafeItem, UserVisitPlan } from '../types';
import { checkOpenStatusAt } from '../utils/timeUtils';
import { formatDistance } from '../utils/distanceUtils';

interface CafeCardProps {
  cafe: CafeItem;
  distanceKm: number;
  visitPlan: UserVisitPlan;
  isFavorite: boolean;
  onToggleFavorite: (cafeId: string) => void;
  onSelectCafe: (cafe: CafeItem) => void;
}

export const CafeCard: React.FC<CafeCardProps> = ({
  cafe,
  distanceKm,
  visitPlan,
  isFavorite,
  onToggleFavorite,
  onSelectCafe,
}) => {
  const [imgLoaded, setImgLoaded] = React.useState(true);

  // Calculate opening status for user's chosen visit plan
  const openStatus = checkOpenStatusAt(
    cafe.operatingHours,
    visitPlan.date,
    visitPlan.time,
    visitPlan.durationHours
  );

  return (
    <article
      onClick={() => onSelectCafe(cafe)}
      className="group bg-white rounded-2xl border border-stone-200/90 hover:border-amber-400/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Visual Media Header with Scrim */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
          {imgLoaded ? (
            <img
              src={cafe.image}
              alt={cafe.name}
              referrerPolicy="no-referrer"
              onError={() => setImgLoaded(false)}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-stone-200 to-amber-100 flex items-center justify-center text-stone-600">
              <Coffee className="w-10 h-10 text-stone-400" />
            </div>
          )}

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-stone-950/75 via-stone-950/25 to-transparent" />

          {/* Operating Status Indicator on Image top-left */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold backdrop-blur-md shadow-xs text-white">
            {openStatus.isOpen ? (
              <span className="flex items-center gap-1 text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{openStatus.statusLabel}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-rose-200 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{openStatus.statusLabel}</span>
              </span>
            )}
          </div>

          {/* Action buttons top-right: Direct Google Maps Link + Bookmark */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {/* Direct Google Maps Link button */}
            <a
              href={cafe.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="在真實 Google 地圖中開啟此咖啡廳"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-stone-900/80 hover:bg-amber-600 backdrop-blur-md rounded-full border border-stone-700/70 shadow-sm transition-all active:scale-95"
            >
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3 text-stone-300" />
            </a>

            {/* Favorite button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(cafe.id);
              }}
              aria-label={isFavorite ? '取消收藏' : '加入收藏'}
              className="w-7 h-7 rounded-full bg-stone-900/60 backdrop-blur-md hover:bg-stone-900/90 text-white flex items-center justify-center transition-transform active:scale-90"
            >
              <Bookmark
                className={`w-3.5 h-3.5 transition-colors ${
                  isFavorite ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                }`}
              />
            </button>
          </div>

          {/* Bottom Title & Location on Image */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-300 drop-shadow-sm mb-0.5">
              <span>{cafe.interiorStyle.name}</span>
              <span aria-hidden="true">·</span>
              <span>店內空間氛圍實景</span>
            </div>
            <h3 className="text-lg font-bold tracking-tight leading-snug drop-shadow-sm group-hover:text-amber-200 transition-colors">
              {cafe.name}
            </h3>
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs text-stone-200/90 mt-0.5">
              <span>{cafe.district}</span>
              <span aria-hidden="true">·</span>
              <span>{cafe.mrtStation.split(' ')[0]}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-amber-300">{formatDistance(distanceKm)}</span>
            </div>
          </div>
        </div>

        {/* Card Content Body: 6 Core Work Dimensions */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {/* Rating, Schedule & Time Status */}
          <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-2.5">
            <div className="flex items-center gap-1.5 font-medium text-stone-900">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold tabular-nums text-sm">{cafe.rating}</span>
              <span className="text-stone-400 text-[11px]">({cafe.reviewCount} 則 Google 評論)</span>
            </div>

            <div className="flex items-center gap-1 text-stone-500 text-xs">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span className="truncate">{openStatus.scheduleText}</span>
            </div>
          </div>

          {/* Dimension 1 & 2: Sockets & Wi-Fi (Prominent Work Indicators) */}
          <div className="grid grid-cols-2 gap-2.5 bg-stone-50/80 p-3 rounded-xl border border-stone-200/50">
            {/* Socket indicator */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>插座配備</span>
              </div>
              <div className="text-[12px] text-stone-600 truncate font-medium">
                {cafe.socketLevel === 'abundant' ? '幾乎每桌皆有 (充足)' : '多數席位配插座'}
              </div>
              <div className="text-[11px] text-stone-400 truncate">
                {cafe.outletTypes[0]}
              </div>
            </div>

            {/* Wi-Fi indicator */}
            <div className="space-y-0.5 border-l border-stone-200/60 pl-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                <Wifi className="w-3.5 h-3.5 text-amber-600" />
                <span>Wi-Fi 測速</span>
              </div>
              <div className="text-[12px] text-stone-900 font-bold tabular-nums">
                {cafe.wifiSpeedMbps} <span className="text-[11px] font-normal text-stone-500">Mbps 高速</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-medium truncate">
                延遲 {cafe.pingMs}ms · 視訊流暢
              </div>
            </div>
          </div>

          {/* Dimension 3, 4, 5, 6: Style, Lighting, Time Limit, Drink Price */}
          <div className="space-y-2 text-xs text-stone-600 divide-y divide-stone-100">
            {/* 裝潢風格 & 採光度 */}
            <div className="flex items-center justify-between pt-1 gap-2">
              <div className="flex items-center gap-1.5 truncate">
                <Palette className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span className="text-stone-400 shrink-0">裝潢風格</span>
                <span className="font-medium text-stone-800 truncate">{cafe.interiorStyle.name}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0 text-amber-900 font-medium">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>{cafe.lightingLabel.split(' ')[0]}</span>
              </div>
            </div>

            {/* 有無限時 & 一杯飲料價位 */}
            <div className="flex items-center justify-between pt-2 gap-2">
              <div className="flex items-center gap-1.5 truncate">
                <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span className="text-stone-400 shrink-0">時間限制</span>
                <span className="font-semibold text-stone-900 truncate">{cafe.timeLimit.label}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0 font-bold text-stone-900 tabular-nums">
                <Coffee className="w-3.5 h-3.5 text-amber-600" />
                <span>NT$ {cafe.drinkPricing.minPrice} 起</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Address with direct Google Map Link & Details trigger */}
      <div className="px-4 py-3 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between text-xs gap-2">
        <a
          href={cafe.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600 hover:text-amber-700 transition-colors truncate max-w-[170px] sm:max-w-[210px]"
          title="開啟 Google 地圖驗證真實地址"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="truncate">{cafe.address}</span>
        </a>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={cafe.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-2 py-1 text-[11px] font-semibold text-amber-800 hover:text-white hover:bg-amber-600 rounded-md border border-amber-300 transition-colors inline-flex items-center gap-1 shadow-2xs"
          >
            <span>地圖</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="inline-flex items-center gap-0.5 font-semibold text-stone-800 hover:text-stone-950 group-hover:translate-x-0.5 transition-transform text-xs">
            <span>詳情</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
