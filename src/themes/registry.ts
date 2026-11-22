import type { ThemeMeta } from "./types";

const modules = import.meta.glob<{ default: ThemeMeta }>("./*/meta.ts", {
  eager: true,
});

export const themes: ThemeMeta[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.order - b.order);

export const themeIds = themes.map((t) => t.id);

export function getTheme(id: string | undefined | null): ThemeMeta | undefined {
  return themes.find((t) => t.id === id);
}

/** Cookie that stores the visitor's current theme. */
export const THEME_COOKIE = "design";

/** Cookie that stores the remaining shuffle-bag theme ids (JSON array). */
export const THEME_QUEUE_COOKIE = "design-queue";

function shuffleIds(ids: string[]): string[] {
  const next = [...ids];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function parseThemeQueue(raw: string | undefined | null): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const valid = new Set(themeIds);
    return parsed.filter(
      (id): id is string => typeof id === "string" && valid.has(id),
    );
  } catch {
    return [];
  }
}

export function serializeThemeQueue(queue: string[]): string {
  return JSON.stringify(queue);
}

/** A theme never comes back until at least this many others have been shown. */
const MIN_GAP = 6;

/**
 * Keep the queue at one full cycle or more. Each new cycle is shuffled, with
 * themes seen in the last MIN_GAP picks moved to its back half, so a repeat
 * never lands near the seam between two cycles.
 */
function fillQueue(queue: string[], recent: string[]): string[] {
  const next = [...queue];
  while (next.length < themeIds.length) {
    const tail = [...recent, ...next].slice(-MIN_GAP);
    const fresh = shuffleIds(themeIds);
    next.push(
      ...fresh.filter((id) => !tail.includes(id)),
      ...fresh.filter((id) => tail.includes(id)),
    );
  }
  return next;
}

/** Remove the first occurrence of `id` (a manual pick counts as seen). */
export function removeFromQueue(queue: string[], id: string): string[] {
  const i = queue.indexOf(id);
  return i < 0 ? queue : [...queue.slice(0, i), ...queue.slice(i + 1)];
}

/**
 * Next theme from a no-repeat queue. Every theme shows once per cycle and
 * repeats stay at least MIN_GAP picks apart, even across cycles.
 */
export function nextThemeFromBag(
  previous: string | undefined | null,
  queue: string[],
): { id: string; queue: string[] } {
  const prev = previous && themeIds.includes(previous) ? previous : undefined;
  const recent = prev ? [prev] : [];
  const next = fillQueue(
    queue.filter((id) => themeIds.includes(id)),
    recent,
  );
  const i = Math.max(
    0,
    next.findIndex((id) => id !== prev),
  );
  const [id] = next.splice(i, 1);
  return { id: id ?? themeIds[0] ?? "swiss", queue: fillQueue(next, [id]) };
}
