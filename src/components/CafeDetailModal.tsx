import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  Clock,
  Zap,
  Wifi,
  Sun,
  Palette,
  Coffee,
  Bookmark,
  ExternalLink,
  Copy,
  Check,
  Armchair,
  Volume2,
  CalendarCheck,
  ShieldAlert,
  Camera,
} from 'lucide-react';
import { CafeItem, UserVisitPlan } from '../types';
import { checkOpenStatusAt, formatFullSchedule } from '../utils/timeUtils';
import { formatDistance } from '../utils/distanceUtils';

interface CafeDetailModalProps {
  cafe: CafeItem | null;
  onClose: () => void;
  visitPlan: UserVisitPlan;
  distanceKm: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const CafeDetailModal: React.FC<CafeDetailModalProps> = ({
  cafe,
  onClose,
  visitPlan,
  distanceKm,
  isFavorite,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false);

  if (!cafe) return null;

  const openStatus = checkOpenStatusAt(
    cafe.operatingHours,
    visitPlan.date,
    visitPlan.time,
    visitPlan.durationHours
  );

  const fullSchedule = formatFullSchedule(cafe.operatingHours);

  const copyAddress = () => {
    navigator.clipboard.writeText(cafe.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mapsUrl = cafe.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${cafe.name} ${cafe.address}`)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Media */}
        <div className="relative aspect-16/9 sm:aspect-21/9 w-full bg-stone-900 overflow-hidden shrink-0">
          <img
            src={cafe.image}
            alt={cafe.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

          {/* Close & Favorite buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(cafe.id)}
              className="p-2.5 rounded-full bg-stone-900/70 hover:bg-stone-900 backdrop-blur-md text-white transition-all active:scale-95 shadow-sm"
              aria-label={isFavorite ? '取消收藏' : '加入收藏'}
            >
              <Bookmark
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-amber-400 text-amber-400' : 'text-white'
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-stone-900/70 hover:bg-stone-900 backdrop-blur-md text-white transition-all active:scale-95 shadow-sm"
              aria-label="關閉"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Kicker */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1">
              <span>{cafe.district}</span>
              <span>·</span>
              <span>{cafe.mrtStation}</span>
              <span>·</span>
              <span>距離目前位置 {formatDistance(distanceKm)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{cafe.name}</h2>
            <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-xl">{cafe.tagline}</p>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Target Visit Time Evaluation Box */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              openStatus.isOpen
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl ${
                  openStatus.isOpen ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}
              >
                {openStatus.isOpen ? (
                  <CalendarCheck className="w-5 h-5" />
                ) : (
                  <ShieldAlert className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                  預定前往時段評估 · {visitPlan.date} {visitPlan.time} (預計 {visitPlan.durationHours} 小時)
                </div>
                <div className="text-sm font-bold mt-0.5">{openStatus.statusLabel}：{openStatus.statusDetail}</div>
              </div>
            </div>

            <div className="text-xs font-medium text-stone-600 bg-white/80 px-3 py-1.5 rounded-lg border border-stone-200/60 shrink-0">
              當日營業時間: {openStatus.scheduleText}
            </div>
          </div>

          {/* The 4 Core User Inquiry Dimensions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. 裝潢風格 (Interior Style) */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                <Palette className="w-4 h-4 text-amber-600" />
                <span>裝潢風格與氛圍</span>
              </div>
              <div className="text-sm font-bold text-stone-900">{cafe.interiorStyle.name}</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {cafe.interiorStyle.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cafe.interiorStyle.atmosphereTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-white border border-stone-200 text-stone-700 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. 採光度 (Natural Lighting) */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>採光度與光線品質</span>
                </div>
                <div className="flex items-center text-amber-600 text-xs font-bold">
                  {'★'.repeat(cafe.lightingLevel)}
                  <span className="text-stone-400 font-normal ml-1">({cafe.lightingLevel}/5)</span>
                </div>
              </div>
              <div className="text-sm font-bold text-stone-900">{cafe.lightingLabel}</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {cafe.lightingDescription}
              </p>
            </div>

            {/* 3. 插座與 Wi-Fi 訊號 (Sockets & Wi-Fi) */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>插座配備細節</span>
              </div>
              <div className="text-sm font-bold text-stone-900">
                {cafe.socketLevel === 'abundant' ? '⚡ 幾乎每桌皆有獨立插座' : '⚡ 多數工作席配插座'}
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {cafe.socketDescription}
              </p>
              <div className="text-[11px] text-stone-500 flex flex-wrap gap-2 pt-1 font-medium">
                {cafe.outletTypes.map((t) => (
                  <span key={t} className="bg-amber-100/60 text-amber-900 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Wi-Fi 訊號與網速 */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                  <Wifi className="w-4 h-4 text-amber-600" />
                  <span>Wi-Fi 實測速度</span>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {cafe.wifiSpeedMbps} Mbps 高速
                </span>
              </div>
              <div className="text-sm font-bold text-stone-900">
                延遲 Ping: {cafe.pingMs} ms · 雙頻極速
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {cafe.wifiDescription}
              </p>
            </div>

            {/* 5. 有無限時 (Time Limit Policy) */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                <Clock className="w-4 h-4 text-stone-600" />
                <span>有無限時政策</span>
              </div>
              <div className="text-sm font-bold text-stone-900">{cafe.timeLimit.label}</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {cafe.timeLimit.description}
              </p>
            </div>

            {/* 6. 一杯飲料價位 (Drink Pricing) */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                  <Coffee className="w-4 h-4 text-amber-700" />
                  <span>一杯飲料價位與低消</span>
                </div>
                <span className="text-xs font-bold text-stone-900 tabular-nums">
                  平均 NT$ {cafe.drinkPricing.averagePrice}
                </span>
              </div>
              <div className="text-xs text-stone-500 font-medium">{cafe.drinkPricing.minConsumption}</div>
              <div className="space-y-1.5 pt-1">
                {cafe.drinkPricing.sampleMenu.slice(0, 3).map((item) => (
                  <div key={item.name} className="flex justify-between text-xs">
                    <span className="text-stone-700">{item.name}</span>
                    <span className="font-semibold text-stone-900 tabular-nums">NT$ {item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Productivity & Comfort Environment details */}
          <div className="p-4 rounded-2xl bg-stone-100/70 border border-stone-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                <Volume2 className="w-3.5 h-3.5 text-stone-600" />
                <span>音量環境</span>
              </div>
              <p className="text-stone-600">{cafe.noiseDescription}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                <Armchair className="w-3.5 h-3.5 text-stone-600" />
                <span>桌面與座椅人體工學</span>
              </div>
              <p className="text-stone-600">{cafe.seatDescription}</p>
            </div>
          </div>

          {/* Real Google Maps Photos & Atmosphere verification banner */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-amber-700" />
                <span>店內空間氛圍實景 · 查看真實顧客照片庫</span>
              </div>
              <p className="text-stone-600 text-[11px]">
                在 Google 地圖中瀏覽真實工作桌椅排列、採光窗景、插座細節與 360° 顧客實景拍攝。
              </p>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-900 bg-white hover:bg-amber-100 rounded-xl border border-amber-300 shadow-2xs transition-colors shrink-0"
            >
              <span>瀏覽真實照片庫 ({cafe.reviewCount}+ 則評論)</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
            </a>
          </div>

          {/* Full Week Schedule Drawer */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              一週營業時間表
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
              {fullSchedule.map((item) => (
                <div
                  key={item.dayName}
                  className={`p-2 rounded-xl text-center border text-xs ${
                    item.isClosed
                      ? 'bg-stone-100 text-stone-400 border-stone-200'
                      : 'bg-white text-stone-800 border-stone-200 shadow-2xs'
                  }`}
                >
                  <div className="font-semibold">{item.dayName}</div>
                  <div className="text-[11px] mt-0.5 tabular-nums text-stone-600">{item.hours}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Address & Actions */}
          <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-xs text-stone-600 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-medium text-stone-900">{cafe.address}</span>
              <button
                type="button"
                onClick={copyAddress}
                className="text-stone-500 hover:text-stone-800 ml-1 inline-flex items-center gap-1"
                title="複製地址"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-xl transition-colors shadow-xs"
            >
              <span>在 Google 地圖中開啟驗證與導航</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
