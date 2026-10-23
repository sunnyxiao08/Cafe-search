import React from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { UserVisitPlan } from '../types';
import { DAYS_OF_WEEK_NAMES, getTodayDateString } from '../utils/timeUtils';

interface VisitPlannerBarProps {
  visitPlan: UserVisitPlan;
  onChangeVisitPlan: (newPlan: Partial<UserVisitPlan>) => void;
  openCount: number;
  totalCount: number;
}

export const VisitPlannerBar: React.FC<VisitPlannerBarProps> = ({
  visitPlan,
  onChangeVisitPlan,
  openCount,
  totalCount,
}) => {
  const todayStr = getTodayDateString();

  // Helper to format date with day of week
  const getFormattedDateDisplay = (dateStr: string) => {
    const parts = dateStr.split('-').map(Number);
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    const dayName = DAYS_OF_WEEK_NAMES[d.getDay()];
    const isToday = dateStr === todayStr;
    return `${parts[1]}月${parts[2]}日 (${dayName})${isToday ? ' · 今天' : ''}`;
  };

  const setQuickTime = (time: string) => {
    onChangeVisitPlan({ time });
  };

  const setQuickDate = (type: 'today' | 'tomorrow') => {
    const d = new Date();
    if (type === 'tomorrow') {
      d.setDate(d.getDate() + 1);
    }
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    onChangeVisitPlan({ date: `${year}-${month}-${day}` });
  };

  return (
    <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 border border-stone-800 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Section Header & Core Purpose */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400" />
            <h2 className="text-base font-semibold tracking-tight text-white">
              營業時段精準媒合
            </h2>
            <span className="text-xs text-amber-300/90 font-medium bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
              確保造訪時營業中
            </span>
          </div>
          <p className="text-xs text-stone-400">
            設定預計前往咖啡廳的日期與時間，系統將精確計算每家店的當日排程，為你排除公休與提早打烊的店家。
          </p>
        </div>

        {/* Right: Open Status Pill summary */}
        <div className="flex items-center gap-3 self-start lg:self-auto bg-stone-950/70 px-4 py-2 rounded-xl border border-stone-800/90">
          <div className="text-right">
            <div className="text-xs text-stone-400">符合時段店家</div>
            <div className="text-base font-bold text-amber-400 tabular-nums">
              {openCount}{' '}
              <span className="text-xs font-normal text-stone-400">/ {totalCount} 間營業中</span>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer select-none pl-3 border-l border-stone-800">
            <input
              type="checkbox"
              checked={visitPlan.onlyOpen}
              onChange={(e) => onChangeVisitPlan({ onlyOpen: e.target.checked })}
              className="w-4 h-4 rounded border-stone-700 text-amber-500 focus:ring-amber-500/20 bg-stone-800"
            />
            <span className="text-xs font-medium text-stone-200">只顯示營業中</span>
          </label>
        </div>
      </div>

      {/* Input controls row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 mt-4 pt-4 border-t border-stone-800/80">
        {/* Date Selector */}
        <div className="lg:col-span-4 bg-stone-800/80 rounded-xl p-3 border border-stone-700/60">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-stone-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              造訪日期
            </span>
            <div className="flex items-center gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => setQuickDate('today')}
                className="px-1.5 py-0.5 rounded hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              >
                今天
              </button>
              <span className="text-stone-600">·</span>
              <button
                type="button"
                onClick={() => setQuickDate('tomorrow')}
                className="px-1.5 py-0.5 rounded hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              >
                明天
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={visitPlan.date}
              onChange={(e) => onChangeVisitPlan({ date: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="text-[11px] text-stone-400 mt-1 truncate">
            {getFormattedDateDisplay(visitPlan.date)}
          </div>
        </div>

        {/* Arrival Time Selector */}
        <div className="lg:col-span-4 bg-stone-800/80 rounded-xl p-3 border border-stone-700/60">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-stone-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              預計抵達時間
            </span>
            <div className="flex items-center gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => setQuickTime('10:00')}
                className="px-1.5 py-0.5 rounded hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              >
                上午 10:00
              </button>
              <span className="text-stone-600">·</span>
              <button
                type="button"
                onClick={() => setQuickTime('14:30')}
                className="px-1.5 py-0.5 rounded hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              >
                下午 14:30
              </button>
              <span className="text-stone-600">·</span>
              <button
                type="button"
                onClick={() => setQuickTime('19:00')}
                className="px-1.5 py-0.5 rounded hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              >
                夜間 19:00
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={visitPlan.time}
              onChange={(e) => onChangeVisitPlan({ time: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="text-[11px] text-stone-400 mt-1">
            從 {visitPlan.time} 起算工作時段
          </div>
        </div>

        {/* Stay Duration Selector */}
        <div className="lg:col-span-4 bg-stone-800/80 rounded-xl p-3 border border-stone-700/60">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
            <span className="flex items-center gap-1.5 font-medium text-stone-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              預計停留時數
            </span>
            <span className="text-[11px] text-stone-400">
              預計工作至{' '}
              {(() => {
                const [h, m] = visitPlan.time.split(':').map(Number);
                const endH = (h + visitPlan.durationHours) % 24;
                return `${String(endH).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
              })()}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[2, 3, 4, 6].map((hours) => (
              <button
                key={hours}
                type="button"
                onClick={() => onChangeVisitPlan({ durationHours: hours })}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  visitPlan.durationHours === hours
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-700 border border-stone-700/70'
                }`}
              >
                {hours} 小時
              </button>
            ))}
          </div>
          <div className="text-[11px] text-stone-400 mt-1 truncate">
            系統將檢查是否會在停留期間遇上打烊或休館
          </div>
        </div>
      </div>
    </div>
  );
};
