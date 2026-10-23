import React, { useState } from 'react';
import { X, MapPin, Check, Navigation } from 'lucide-react';
import { UserLocation } from '../types';
import { POPULAR_LOCATIONS } from '../utils/distanceUtils';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: UserLocation;
  onSelectLocation: (loc: UserLocation) => void;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [customName, setCustomName] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    // Assign nearby coordinate with slight offset
    const newLoc: UserLocation = {
      name: customName.trim(),
      lat: 25.0418 + (Math.random() - 0.5) * 0.02,
      lng: 121.5513 + (Math.random() - 0.5) * 0.02,
    };
    onSelectLocation(newLoc);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Navigation className="w-4 h-4 fill-amber-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">選擇出發中心位置</h3>
              <p className="text-xs text-stone-500">
                系統將以此地點重新計算所有咖啡廳的實際距離與步行時間
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset quick buttons */}
        <div className="mt-4 space-y-2">
          <label className="text-xs font-semibold text-stone-600 block">
            常用熱門工作據點捷運站
          </label>
          <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {POPULAR_LOCATIONS.map((loc) => {
              const isSelected = currentLocation.name === loc.name;
              return (
                <button
                  key={loc.name}
                  onClick={() => {
                    onSelectLocation(loc);
                    onClose();
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs text-left transition-colors ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-300 text-amber-950 font-bold'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-600' : 'text-stone-400'}`} />
                    <span>{loc.name}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Location input */}
        <form onSubmit={handleCustomSubmit} className="mt-4 pt-3 border-t border-stone-100">
          <label className="text-xs font-semibold text-stone-600 block mb-1">
            或輸入自訂起點名稱
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="例如：台北小巨蛋、師大分部..."
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-amber-600"
            />
            <button
              type="submit"
              disabled={!customName.trim()}
              className="px-3 py-1.5 text-xs font-medium bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-lg transition-colors"
            >
              設定起點
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
