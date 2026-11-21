const monthYear: Intl.DateTimeFormatOptions = { month: "short", year: "numeric" };
const dayMonthYear: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };

/** "Feb 2026 - Present", or one date when start and end are the same month. */
export function formatPeriod(start: Date, end?: Date): string {
  const s = start.toLocaleDateString("en-US", monthYear);
  const e = end ? end.toLocaleDateString("en-US", monthYear) : "Present";
  if (end && s === e) return s;
  return `${s} - ${e}`;
}

/** "Jul 14, 2023 - Jul 16, 2023", or one date for a single day. */
export function formatDayRange(start: Date, end?: Date): string {
  const s = start.toLocaleDateString("en-US", dayMonthYear);
  if (!end || end.getTime() === start.getTime()) return s;
  return `${s} - ${end.toLocaleDateString("en-US", dayMonthYear)}`;
}

/** "1 yr 3 mos" for finished periods, null while ongoing. */
export function formatDuration(start: Date, end?: Date): string | null {
  if (!end) return null;
  const total =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const y = years ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const m = months ? `${months} mo${months > 1 ? "s" : ""}` : "";
  return [y, m].filter(Boolean).join(" ");
}
