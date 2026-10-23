import React from 'react';
import { Coffee, MapPin, Bookmark } from 'lucide-react';
import { UserLocation } from '../types';

interface HeaderProps {
  currentLocation: UserLocation;
  onOpenLocationModal: () => void;
  favoritesCount: number;
  onToggleFavoritesOnly: () => void;
  showFavoritesOnly: boolean;
  onSelectNavTab: (tab: 'all' | 'sunlit' | 'unlimited' | 'fast_wifi') => void;
  activeNavTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onOpenLocationModal,
  favoritesCount,
  onToggleFavoritesOnly,
  showFavoritesOnly,
  onSelectNavTab,
  activeNavTab,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-amber-600/90 text-stone-900 flex items-center justify-center shadow-inner">
              <Coffee className="w-5 h-5 text-stone-950 stroke-[2.2]" />
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectNavTab('all');
              }}
              className="text-lg font-bold tracking-tight text-white hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              CafeDesk <span className="font-normal text-stone-400 text-sm hidden sm:inline">工作咖啡廳指南</span>
            </a>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
            <button
              onClick={() => {
                onSelectNavTab('all');
              }}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeNavTab === 'all' && !showFavoritesOnly
                  ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5'
                  : ''
              }`}
            >
              全部推薦
            </button>
            <button
              onClick={() => onSelectNavTab('sunlit')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeNavTab === 'sunlit'
                  ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5'
                  : ''
              }`}
            >
              大採光落地窗
            </button>
            <button
              onClick={() => onSelectNavTab('unlimited')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeNavTab === 'unlimited'
                  ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5'
                  : ''
              }`}
            >
              全天不限時
            </button>
            <button
              onClick={() => onSelectNavTab('fast_wifi')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeNavTab === 'fast_wifi'
                  ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5'
                  : ''
              }`}
            >
              高速光纖 Wi-Fi
            </button>
            <button
              onClick={onToggleFavoritesOnly}
              className={`flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                showFavoritesOnly
                  ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5'
                  : ''
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>已收藏 ({favoritesCount})</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenLocationModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-200 bg-stone-800 hover:bg-stone-700 active:bg-stone-600 rounded-lg border border-stone-700 transition-colors whitespace-nowrap shrink-0 shadow-sm"
              title="切換定位以重新計算各咖啡廳距離"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="max-w-[130px] truncate sm:max-w-none">{currentLocation.name}</span>
              <span className="text-stone-400 text-[11px] hidden sm:inline">(切換)</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
