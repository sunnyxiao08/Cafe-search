import { OperatingHours, DayHours } from '../types';

export const DAYS_OF_WEEK_NAMES = [
  '週日',
  '週一',
  '週二',
  '週三',
  '週四',
  '週五',
  '週六',
];

/**
 * Returns today's date in YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns current rounded time in HH:mm
 */
export function getCurrentTimeString(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(Math.floor(now.getMinutes() / 15) * 15).padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Parses "HH:mm" into minutes from start of day
 */
export function parseTimeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export interface OpenStatusResult {
  isOpen: boolean;
  scheduleText: string;
  badgeType: 'open' | 'closed' | 'closing_soon' | 'will_close_during_visit';
  statusLabel: string;
  statusDetail: string;
  hoursToday: DayHours | undefined;
}

/**
 * Checks whether a cafe is open at a specific target date, target time, and duration
 */
export function checkOpenStatusAt(
  operatingHours: OperatingHours,
  dateStr: string,
  timeStr: string,
  durationHours: number = 2
): OpenStatusResult {
  // Determine day of week from dateStr (YYYY-MM-DD)
  // Ensure safe local time parsing
  const parts = dateStr.split('-').map(Number);
  const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
  const dayOfWeek = targetDate.getDay();
  const dayName = DAYS_OF_WEEK_NAMES[dayOfWeek];

  const todaySchedule = operatingHours[dayOfWeek];

  if (!todaySchedule || todaySchedule.isClosed) {
    return {
      isOpen: false,
      scheduleText: `${dayName} 固定公休`,
      badgeType: 'closed',
      statusLabel: '當日公休',
      statusDetail: `${dayName} 不營業，建議另擇日期`,
      hoursToday: todaySchedule,
    };
  }

  const openMinutes = parseTimeToMinutes(todaySchedule.open);
  const closeMinutes = parseTimeToMinutes(todaySchedule.close);
  const visitStartMinutes = parseTimeToMinutes(timeStr);
  const visitEndMinutes = visitStartMinutes + durationHours * 60;

  // Check if cafe operates past midnight
  const effectiveCloseMinutes =
    closeMinutes < openMinutes ? closeMinutes + 24 * 60 : closeMinutes;

  // Check if arrival is within operating hours
  const isArrivalOpen =
    visitStartMinutes >= openMinutes && visitStartMinutes < effectiveCloseMinutes;

  if (!isArrivalOpen) {
    if (visitStartMinutes < openMinutes) {
      return {
        isOpen: false,
        scheduleText: `${dayName} ${todaySchedule.open} - ${todaySchedule.close}`,
        badgeType: 'closed',
        statusLabel: '尚未營業',
        statusDetail: `預計於 ${todaySchedule.open} 開始營業`,
        hoursToday: todaySchedule,
      };
    } else {
      return {
        isOpen: false,
        scheduleText: `${dayName} ${todaySchedule.open} - ${todaySchedule.close}`,
        badgeType: 'closed',
        statusLabel: '已打烊',
        statusDetail: `該時段已超過當日營業時間 (${todaySchedule.close})`,
        hoursToday: todaySchedule,
      };
    }
  }

  // Arrival is open, check if duration will be cut short by closing
  const minutesRemaining = effectiveCloseMinutes - visitStartMinutes;
  if (visitEndMinutes > effectiveCloseMinutes) {
    const hoursLeft = Math.floor(minutesRemaining / 60);
    const minsLeft = minutesRemaining % 60;
    const timeLeftStr = hoursLeft > 0 ? `${hoursLeft} 小時 ${minsLeft} 分` : `${minsLeft} 分鐘`;
    return {
      isOpen: true,
      scheduleText: `${dayName} ${todaySchedule.open} - ${todaySchedule.close}`,
      badgeType: 'will_close_during_visit',
      statusLabel: `即將打烊 (剩 ${timeLeftStr})`,
      statusDetail: `營業至 ${todaySchedule.close}，停留時段將提早結束`,
      hoursToday: todaySchedule,
    };
  }

  return {
    isOpen: true,
    scheduleText: `${dayName} ${todaySchedule.open} - ${todaySchedule.close}`,
    badgeType: 'open',
    statusLabel: '營業中',
    statusDetail: `預計時段內完整營業至 ${todaySchedule.close}`,
    hoursToday: todaySchedule,
  };
}

/**
 * Formats a friendly schedule string for display
 */
export function formatFullSchedule(hours: OperatingHours): { dayName: string; hours: string; isClosed: boolean }[] {
  return [1, 2, 3, 4, 5, 6, 0].map((dayIndex) => {
    const day = hours[dayIndex];
    return {
      dayName: DAYS_OF_WEEK_NAMES[dayIndex],
      hours: day && !day.isClosed ? `${day.open} - ${day.close}` : '公休',
      isClosed: !day || !!day.isClosed,
    };
  });
}
