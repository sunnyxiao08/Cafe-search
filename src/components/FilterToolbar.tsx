import React from 'react';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sun,
  Zap,
  Wifi,
  Clock,
  Coffee,
  Palette,
  MapPin,
  Star,
  Layers,
  Map as MapIcon,
} from 'lucide-react';
import { FilterState, InteriorStyleCategory, SocketLevel } from '../types';

interface FilterToolbarProps {
  filters: FilterState;
  onChangeFilters: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  viewMode: 'grid' | 'map';
  onToggleViewMode: (mode: 'grid' | 'map') => void;
  activeFilterCount: number;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
  viewMode,
  onToggleViewMode,
  activeFilterCount,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs p-4 sm:p-5 space-y-4">
      {/* Top search & quick actions bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="搜尋咖啡廳名稱、捷運站 (如: 忠孝敦化、中山)、行政區..."
            value={filters.searchQuery}
            onChange={(e) => onChangeFilters({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-600 transition-colors placeholder:text-stone-400"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChangeFilters({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
            >
              清除
            </button>
          )}
        </div>

        {/* View Mode & Advanced Toggle */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          {/* Segmented View Mode button */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200/60">
            <button
              type="button"
              onClick={() => onToggleViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                viewMode === 'grid'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>卡片列表</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                viewMode === 'map'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>地圖對照</span>
            </button>
          </div>

          {/* Advanced toggle */}
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition-colors whitespace-nowrap ${
              isAdvancedOpen || activeFilterCount > 0
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
            <span>進階篩選</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              title="重設所有篩選"
              className="p-2 text-stone-500 hover:text-stone-800 rounded-xl hover:bg-stone-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Primary quick filters row: Distance, Rating, Sockets, Style, Sort */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        {/* Distance Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-stone-500 flex items-center gap-1 shrink-0">
            <MapPin className="w-3 h-3 text-stone-400" />
            距離半徑:
          </span>
          <select
            value={filters.maxDistanceKm}
            onChange={(e) => onChangeFilters({ maxDistanceKm: Number(e.target.value) })}
            className="text-xs bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 font-medium focus:outline-none focus:border-amber-600 cursor-pointer"
          >
            <option value={0}>不限距離</option>
            <option value={0.8}>800 公尺以內</option>
            <option value={1.5}>1.5 公里以內</option>
            <option value={3}>3 公里以內</option>
            <option value={5}>5 公里以內</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-stone-500 flex items-center gap-1 shrink-0">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            最低評分:
          </span>
          <select
            value={filters.minRating}
            onChange={(e) => onChangeFilters({ minRating: Number(e.target.value) })}
            className="text-xs bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 font-medium focus:outline-none focus:border-amber-600 cursor-pointer"
          >
            <option value={0}>不限評分</option>
            <option value={4.5}>4.5 ★ 以上 (極力推薦)</option>
            <option value={4.7}>4.7 ★ 以上 (頂級口碑)</option>
            <option value={4.8}>4.8 ★ 以上 (殿堂首選)</option>
          </select>
        </div>

        {/* Socket availability filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-stone-500 flex items-center gap-1 shrink-0">
            <Zap className="w-3 h-3 text-amber-600" />
            插座規格:
          </span>
          <select
            value={filters.socketFilter}
            onChange={(e) => onChangeFilters({ socketFilter: e.target.value as 'all' | SocketLevel })}
            className="text-xs bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 font-medium focus:outline-none focus:border-amber-600 cursor-pointer"
          >
            <option value="all">不限插座數量</option>
            <option value="abundant">幾乎每桌皆有 (100% 充足)</option>
            <option value="moderate">多數座位皆有</option>
          </select>
        </div>

        {/* Time limit filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-stone-500 flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3 text-stone-400" />
            限時規範:
          </span>
          <select
            value={filters.timeLimitFilter}
            onChange={(e) =>
              onChangeFilters({
                timeLimitFilter: e.target.value as 'all' | 'unlimited' | 'weekdays_unlimited',
              })
            }
            className="text-xs bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 font-medium focus:outline-none focus:border-amber-600 cursor-pointer"
          >
            <option value="all">不限規則</option>
            <option value="unlimited">平假日全天不限時</option>
            <option value="weekdays_unlimited">平日不限時</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-xs text-stone-500 shrink-0">排序方式:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onChangeFilters({ sortBy: e.target.value as FilterState['sortBy'] })}
            className="text-xs bg-stone-100 border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-900 font-semibold focus:outline-none focus:border-amber-600 cursor-pointer"
          >
            <option value="recommendation">工作指數最推薦</option>
            <option value="distance">距離最近優先</option>
            <option value="rating">Google 評分最高</option>
            <option value="wifi">Wi-Fi 網速最快</option>
            <option value="price">飲品最低價起</option>
          </select>
        </div>
      </div>

      {/* Advanced expandable section: Lighting, Style, Wi-Fi speed, Drink budget */}
      {isAdvancedOpen && (
        <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
          {/* Lighting requirement */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              採光度要求
            </label>
            <select
              value={filters.minLightingLevel}
              onChange={(e) => onChangeFilters({ minLightingLevel: Number(e.target.value) })}
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-amber-600"
            >
              <option value={0}>不限採光</option>
              <option value={5}>5★ 超大落地窗全自然光</option>
              <option value={4}>4★ 以上 充足自然側光/天井</option>
              <option value={3}>3★ 以上 溫暖沉浸暗調氛圍燈</option>
            </select>
          </div>

          {/* Interior Style */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-stone-600" />
              裝潢風格
            </label>
            <select
              value={filters.styleFilter}
              onChange={(e) =>
                onChangeFilters({
                  styleFilter: e.target.value as 'all' | InteriorStyleCategory,
                })
              }
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-amber-600"
            >
              <option value="all">所有風格</option>
              <option value="modern_minimal">現代日光極簡木質</option>
              <option value="industrial_oak">美式工業復古老木</option>
              <option value="botanical_green">溫室綠意植栽北歐</option>
              <option value="wabi_sabi">日系枯山水侘寂</option>
              <option value="vintage_cozy">赤峰老宅質樸文青</option>
            </select>
          </div>

          {/* Wi-Fi Speed Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-amber-600" />
              實測 Wi-Fi 網速
            </label>
            <select
              value={filters.wifiSpeedFilter}
              onChange={(e) => onChangeFilters({ wifiSpeedFilter: Number(e.target.value) })}
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-amber-600"
            >
              <option value={0}>不限網速</option>
              <option value={150}>150 Mbps 以上 (一般辦公)</option>
              <option value={200}>200 Mbps 以上 (高畫質視訊)</option>
              <option value={280}>280 Mbps 以上 (大檔秒傳/Sprint)</option>
            </select>
          </div>

          {/* Drink Budget Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-amber-700" />
              單杯飲品預算上限
            </label>
            <select
              value={filters.maxPrice}
              onChange={(e) => onChangeFilters({ maxPrice: Number(e.target.value) })}
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-amber-600"
            >
              <option value={0}>不限預算</option>
              <option value={120}>NT$ 120 以下 (平價高CP)</option>
              <option value={150}>NT$ 150 以下 (標準區間)</option>
              <option value={180}>NT$ 180 以下</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
