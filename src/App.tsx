import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  Coffee,
  MapPin,
  Clock,
  Zap,
  Wifi,
  Sun,
  Palette,
  SlidersHorizontal,
  Bookmark,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { CAFES_DATA } from './data/cafes';
import { CafeItem, FilterState, UserLocation, UserVisitPlan } from './types';
import { Header } from './components/Header';
import { VisitPlannerBar } from './components/VisitPlannerBar';
import { FilterToolbar } from './components/FilterToolbar';
import { CafeCard } from './components/CafeCard';
import { CafeDetailModal } from './components/CafeDetailModal';
import { InteractiveMap } from './components/InteractiveMap';
import { LocationSelectorModal } from './components/LocationSelectorModal';
import { POPULAR_LOCATIONS, calculateDistanceKm } from './utils/distanceUtils';
import {
  checkOpenStatusAt,
  getCurrentTimeString,
  getTodayDateString,
} from './utils/timeUtils';

const INITIAL_VISIT_PLAN: UserVisitPlan = {
  date: getTodayDateString(),
  time: getCurrentTimeString(),
  durationHours: 3,
  onlyOpen: true, // Default to true so user gets cafes that are actually open!
};

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  maxDistanceKm: 0, // 0 = unlimited
  minRating: 0,
  minLightingLevel: 0,
  socketFilter: 'all',
  wifiSpeedFilter: 0,
  timeLimitFilter: 'all',
  styleFilter: 'all',
  maxPrice: 0,
  sortBy: 'recommendation',
};

export default function App() {
  // Current user location (origin for distance calculations)
  const [currentLocation, setCurrentLocation] = useState<UserLocation>(
    POPULAR_LOCATIONS[0] // 忠孝敦化
  );
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Visit Plan (Date, Time, Duration, onlyOpen)
  const [visitPlan, setVisitPlan] = useState<UserVisitPlan>(INITIAL_VISIT_PLAN);

  // Filter & Search states
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [activeNavTab, setActiveNavTab] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Selected Cafe for Modal
  const [selectedCafe, setSelectedCafe] = useState<CafeItem | null>(null);

  // Favorites stored in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cafedesk_favorites');
      return saved ? JSON.parse(saved) : ['cafe-congrats', 'cafe-weiyang'];
    } catch {
      return ['cafe-congrats', 'cafe-weiyang'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cafedesk_favorites', JSON.stringify(favorites));
    } catch {
      // Ignore write errors
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Nav Tab handler
  const handleSelectNavTab = (tab: 'all' | 'sunlit' | 'unlimited' | 'fast_wifi') => {
    setActiveNavTab(tab);
    setShowFavoritesOnly(false);
    if (tab === 'all') {
      setFilters(INITIAL_FILTERS);
    } else if (tab === 'sunlit') {
      setFilters((prev) => ({ ...prev, minLightingLevel: 5 }));
    } else if (tab === 'unlimited') {
      setFilters((prev) => ({ ...prev, timeLimitFilter: 'unlimited' }));
    } else if (tab === 'fast_wifi') {
      setFilters((prev) => ({ ...prev, wifiSpeedFilter: 250 }));
    }
  };

  // Pre-calculate distance and open status for every cafe
  const cafesWithMetrics = useMemo(() => {
    return CAFES_DATA.map((cafe) => {
      const distanceKm = calculateDistanceKm(
        currentLocation.lat,
        currentLocation.lng,
        cafe.lat,
        cafe.lng
      );
      const openStatus = checkOpenStatusAt(
        cafe.operatingHours,
        visitPlan.date,
        visitPlan.time,
        visitPlan.durationHours
      );
      return {
        ...cafe,
        distanceKm,
        openStatus,
      };
    });
  }, [currentLocation, visitPlan]);

  // Count open cafes in total
  const openCount = useMemo(() => {
    return cafesWithMetrics.filter((c) => c.openStatus.isOpen).length;
  }, [cafesWithMetrics]);

  // Filtered & Sorted cafes
  const filteredCafes = useMemo(() => {
    let result = cafesWithMetrics.filter((cafe) => {
      // 1. Favorites only toggle
      if (showFavoritesOnly && !favorites.includes(cafe.id)) {
        return false;
      }

      // 2. Open only requirement
      if (visitPlan.onlyOpen && !cafe.openStatus.isOpen) {
        return false;
      }

      // 3. Distance filter
      if (filters.maxDistanceKm > 0 && cafe.distanceKm > filters.maxDistanceKm) {
        return false;
      }

      // 4. Rating filter
      if (filters.minRating > 0 && cafe.rating < filters.minRating) {
        return false;
      }

      // 5. Lighting filter
      if (filters.minLightingLevel > 0 && cafe.lightingLevel < filters.minLightingLevel) {
        return false;
      }

      // 6. Socket filter
      if (filters.socketFilter !== 'all') {
        if (filters.socketFilter === 'abundant' && cafe.socketLevel !== 'abundant') {
          return false;
        }
        if (filters.socketFilter === 'moderate' && cafe.socketLevel === 'limited') {
          return false;
        }
      }

      // 7. Wi-Fi filter
      if (filters.wifiSpeedFilter > 0 && cafe.wifiSpeedMbps < filters.wifiSpeedFilter) {
        return false;
      }

      // 8. Time limit filter
      if (filters.timeLimitFilter === 'unlimited' && cafe.timeLimit.type !== 'unlimited') {
        return false;
      }
      if (
        filters.timeLimitFilter === 'weekdays_unlimited' &&
        cafe.timeLimit.type !== 'unlimited' &&
        cafe.timeLimit.type !== 'weekdays_unlimited'
      ) {
        return false;
      }

      // 9. Style filter
      if (filters.styleFilter !== 'all' && cafe.interiorStyle.category !== filters.styleFilter) {
        return false;
      }

      // 10. Max drink price filter
      if (filters.maxPrice > 0 && cafe.drinkPricing.minPrice > filters.maxPrice) {
        return false;
      }

      // 11. Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = cafe.name.toLowerCase().includes(q);
        const matchesDistrict = cafe.district.toLowerCase().includes(q);
        const matchesMrt = cafe.mrtStation.toLowerCase().includes(q);
        const matchesStyle = cafe.interiorStyle.name.toLowerCase().includes(q);
        const matchesTagline = cafe.tagline.toLowerCase().includes(q);
        if (!matchesName && !matchesDistrict && !matchesMrt && !matchesStyle && !matchesTagline) {
          return false;
        }
      }

      return true;
    });

    // Sort order
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'distance':
          return a.distanceKm - b.distanceKm;
        case 'rating':
          return b.rating - a.rating;
        case 'wifi':
          return b.wifiSpeedMbps - a.wifiSpeedMbps;
        case 'price':
          return a.drinkPricing.minPrice - b.drinkPricing.minPrice;
        case 'recommendation':
        default: {
          // Weighted work score
          const aOpenBonus = a.openStatus.isOpen ? 20 : 0;
          const bOpenBonus = b.openStatus.isOpen ? 20 : 0;
          const aSocket = a.socketLevel === 'abundant' ? 15 : 8;
          const bSocket = b.socketLevel === 'abundant' ? 15 : 8;
          const aTime = a.timeLimit.type === 'unlimited' ? 15 : 8;
          const bTime = b.timeLimit.type === 'unlimited' ? 15 : 8;
          const aScore = a.rating * 10 + a.wifiSpeedMbps * 0.05 + aSocket + aTime + aOpenBonus - a.distanceKm * 2;
          const bScore = b.rating * 10 + b.wifiSpeedMbps * 0.05 + bSocket + bTime + bOpenBonus - b.distanceKm * 2;
          return bScore - aScore;
        }
      }
    });

    return result;
  }, [cafesWithMetrics, filters, visitPlan.onlyOpen, showFavoritesOnly, favorites]);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.maxDistanceKm > 0) count++;
    if (filters.minRating > 0) count++;
    if (filters.minLightingLevel > 0) count++;
    if (filters.socketFilter !== 'all') count++;
    if (filters.wifiSpeedFilter > 0) count++;
    if (filters.timeLimitFilter !== 'all') count++;
    if (filters.styleFilter !== 'all') count++;
    if (filters.maxPrice > 0) count++;
    return count;
  }, [filters]);

  const resetAllFilters = () => {
    setFilters(INITIAL_FILTERS);
    setShowFavoritesOnly(false);
    setActiveNavTab('all');
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans">
      {/* Top Header strictly follows the 3-zone contract */}
      <Header
        currentLocation={currentLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        favoritesCount={favorites.length}
        onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        showFavoritesOnly={showFavoritesOnly}
        onSelectNavTab={handleSelectNavTab}
        activeNavTab={activeNavTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Editorial Subtitle & Context */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            適合筆電與專注工作的工作咖啡廳
          </h1>
          <p className="text-sm text-stone-500 max-w-3xl">
            提供插座覆蓋率、實測 Wi-Fi 網速、自然採光度、裝潢風格、限時規範與飲品低消。設定造訪時段，精準確認店家是否開門營業。
          </p>
        </div>

        {/* 1. Date & Time Visit Planner (Ensuring Cafe is Open) */}
        <VisitPlannerBar
          visitPlan={visitPlan}
          onChangeVisitPlan={(patch) => setVisitPlan((prev) => ({ ...prev, ...patch }))}
          openCount={openCount}
          totalCount={CAFES_DATA.length}
        />

        {/* 2. Filter & Sort Toolbar */}
        <FilterToolbar
          filters={filters}
          onChangeFilters={(patch) => setFilters((prev) => ({ ...prev, ...patch }))}
          onResetFilters={resetAllFilters}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
          activeFilterCount={activeFilterCount}
        />

        {/* Active Filters Summary line */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 px-1">
          <div className="flex items-center gap-2">
            <span>找到</span>
            <span className="font-bold text-stone-900 tabular-nums text-sm">
              {filteredCafes.length}
            </span>
            <span>間符合條件的咖啡廳</span>
            {showFavoritesOnly && (
              <span className="text-amber-700 font-semibold">(已開啟僅顯示收藏)</span>
            )}
            {visitPlan.onlyOpen && (
              <span className="text-emerald-700 font-medium">· 僅顯示 {visitPlan.date} {visitPlan.time} 營業中</span>
            )}
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={resetAllFilters}
              className="text-amber-800 hover:text-amber-950 font-medium underline underline-offset-2"
            >
              清除所有進階篩選條件
            </button>
          )}
        </div>

        {/* 3. Map View or Cards Grid View */}
        {viewMode === 'map' ? (
          <div className="space-y-6">
            <InteractiveMap
              cafes={filteredCafes}
              userLocation={currentLocation}
              selectedCafeId={selectedCafe?.id || null}
              onSelectCafe={(c) => setSelectedCafe(c)}
              visitPlan={visitPlan}
            />

            {/* Accompanying cards below map */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCafes.map((cafe) => (
                <CafeCard
                  key={cafe.id}
                  cafe={cafe}
                  distanceKm={cafe.distanceKm}
                  visitPlan={visitPlan}
                  isFavorite={favorites.includes(cafe.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelectCafe={setSelectedCafe}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            {filteredCafes.length === 0 ? (
              /* Empty state */
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
                  <Coffee className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-stone-900">
                    目前沒有完全符合條件的咖啡廳
                  </h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    建議嘗試放寬距離限制、取消「只顯示營業中」、或調整插座與網速要求以探索更多優質店家。
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  {visitPlan.onlyOpen && (
                    <button
                      onClick={() => setVisitPlan((prev) => ({ ...prev, onlyOpen: false }))}
                      className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                    >
                      包含暫時休息店家
                    </button>
                  )}
                  <button
                    onClick={resetAllFilters}
                    className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-xs"
                  >
                    重設所有篩選
                  </button>
                </div>
              </div>
            ) : (
              /* Standard 3-column cards grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCafes.map((cafe) => (
                  <CafeCard
                    key={cafe.id}
                    cafe={cafe}
                    distanceKm={cafe.distanceKm}
                    visitPlan={visitPlan}
                    isFavorite={favorites.includes(cafe.id)}
                    onToggleFavorite={toggleFavorite}
                    onSelectCafe={setSelectedCafe}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-stone-900 text-stone-400 border-t border-stone-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="font-bold text-white">CafeDesk</span>
            <span>·</span>
            <span>工作咖啡廳指南</span>
          </div>
          <div className="text-stone-400">
            所有店家營業時間、Wi-Fi 實測數據、插座位置及飲品價格皆經過定期實地採訪校對。
          </div>
        </div>
      </footer>

      {/* Detailed Cafe Modal */}
      <CafeDetailModal
        cafe={selectedCafe}
        onClose={() => setSelectedCafe(null)}
        visitPlan={visitPlan}
        distanceKm={
          selectedCafe
            ? calculateDistanceKm(
                currentLocation.lat,
                currentLocation.lng,
                selectedCafe.lat,
                selectedCafe.lng
              )
            : 0
        }
        isFavorite={selectedCafe ? favorites.includes(selectedCafe.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Location Origin Picker Modal */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={(loc) => setCurrentLocation(loc)}
      />
    </div>
  );
}
