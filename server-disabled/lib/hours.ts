export const HOURS = {
  2: [[690, 870], [960, 1140]],
  3: [[690, 870], [960, 1140]],
  4: [[690, 870], [960, 1140]],
  5: [[690, 870], [960, 1140]]
} as Record<number, number[][]>;

const chicagoParts = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
  }).formatToParts(date);
  const value = (type: string) => parts.find((part) => part.type === type)?.value || '';
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { day: dayMap[value('weekday')], minutes: Number(value('hour')) * 60 + Number(value('minute')) };
};

export const getOpenStatus = (date = new Date()) => {
  const { day, minutes } = chicagoParts(date);
  const windows = HOURS[day] || [];
  const active = windows.find(([open, close]) => minutes >= open && minutes < close - 10);
  const closingSoon = windows.find(([open, close]) => minutes >= open && minutes < close);
  if (active) return { open: true, label: 'Open for pickup', minimumMinutes: 15 };
  if (closingSoon) return { open: false, label: 'Ordering closed for this service', minimumMinutes: 15 };
  return { open: false, label: 'Closed now', minimumMinutes: 15 };
};

export const isValidScheduledPickup = (value: unknown) => {
  if (typeof value !== 'string') return false;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!match) return false;
  const [, year, month, date, hour, minute] = match;
  const day = new Date(Date.UTC(Number(year), Number(month) - 1, Number(date), 12)).getUTCDay();
  const minutes = Number(hour) * 60 + Number(minute);
  const currentWallTime = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
  }).format(new Date()).replace(' ', 'T');
  return value > currentWallTime && (HOURS[day] || []).some(([open, close]) => minutes >= open && minutes < close - 10);
};
