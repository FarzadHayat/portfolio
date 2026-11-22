// Theme switching on the client.
// The server (src/middleware.ts) or the inline boot script in Layout.astro
// sets html[data-design] before first paint. This module handles the picker,
// the shuffle button, and each theme's optional script.ts.
import type { ThemeMeta } from "../themes/types";
import {
  THEME_COOKIE,
  THEME_QUEUE_COOKIE,
  nextThemeFromBag,
  parseThemeQueue,
  removeFromQueue,
  serializeThemeQueue,
} from "../themes/registry";

type ThemeModule = { mount?: () => void | (() => void) };

const loaders = import.meta.glob<ThemeModule>("../themes/*/script.ts");

const root = document.documentElement;
const themes: ThemeMeta[] = JSON.parse(
  document.getElementById("theme-data")?.textContent || "[]",
);
let cleanup: (() => void) | undefined;
let mountToken = 0;

function current(): string {
  return root.dataset.design || "";
}

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; samesite=lax`;
}

function readQueue(): string[] {
  const fromCookie = parseThemeQueue(readCookie(THEME_QUEUE_COOKIE));
  if (fromCookie.length) return fromCookie;
  // Migrate an older sessionStorage bag once, then keep it in the cookie.
  try {
    const raw = sessionStorage.getItem(THEME_QUEUE_COOKIE);
    const migrated = parseThemeQueue(raw);
    if (migrated.length) {
      writeCookie(THEME_QUEUE_COOKIE, serializeThemeQueue(migrated));
      sessionStorage.removeItem(THEME_QUEUE_COOKIE);
      return migrated;
    }
  } catch {
    // Ignore storage errors.
  }
  return [];
}

function writeQueue(ids: string[]) {
  writeCookie(THEME_QUEUE_COOKIE, serializeThemeQueue(ids));
}

function dropFromQueue(id: string) {
  writeQueue(removeFromQueue(readQueue(), id));
}

async function mountScript(id: string) {
  const token = ++mountToken;
  cleanup?.();
  cleanup = undefined;
  const load = loaders[`../themes/${id}/script.ts`];
  if (!load) return;
  const mod = await load();
  // Ignore a stale load if the theme changed while this one was loading.
  if (token !== mountToken || current() !== id) return;
  const result = mod.mount?.();
  if (typeof result === "function") cleanup = result;
}

function syncUi(theme: ThemeMeta) {
  document.querySelectorAll<HTMLElement>("[data-theme-name]").forEach((el) => {
    el.textContent = theme.name;
  });
  document
    .querySelectorAll<HTMLButtonElement>("[data-theme-option]")
    .forEach((btn) => {
      btn.setAttribute(
        "aria-pressed",
        String(btn.dataset.themeOption === theme.id),
      );
    });
}

function applyDom(theme: ThemeMeta) {
  root.dataset.design = theme.id;
  root.dataset.scheme = theme.scheme;

  const fonts = document.getElementById("theme-fonts") as HTMLLinkElement | null;
  if (theme.fonts) {
    if (fonts) {
      if (fonts.href !== theme.fonts) fonts.href = theme.fonts;
    } else {
      const link = document.createElement("link");
      link.id = "theme-fonts";
      link.rel = "stylesheet";
      link.href = theme.fonts;
      document.head.append(link);
    }
  } else {
    fonts?.remove();
  }

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme.preview.bg);
  syncUi(theme);
}

export function setTheme(id: string, { persist = true } = {}) {
  const theme = themes.find((t) => t.id === id);
  if (!theme || theme.id === current()) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !reduce) {
    document.startViewTransition(() => applyDom(theme));
  } else {
    applyDom(theme);
  }

  if (persist) {
    writeCookie(THEME_COOKIE, theme.id);
  }

  // Manual picks count as seen so shuffle/refresh do not revisit them early.
  dropFromQueue(theme.id);

  // Drop ?theme= so the URL no longer forces this theme.
  const url = new URL(location.href);
  if (url.searchParams.has("theme")) {
    url.searchParams.delete("theme");
    history.replaceState(history.state, "", url);
  }

  const status = document.querySelector("[data-theme-status]");
  if (status) status.textContent = `Theme changed to ${theme.name}`;

  void mountScript(theme.id);
}

export function shuffleTheme() {
  const { id, queue } = nextThemeFromBag(current(), readQueue());
  writeQueue(queue);
  setTheme(id);
}

function initPicker() {
  const dialog = document.getElementById("theme-picker") as HTMLDialogElement | null;

  document.addEventListener("click", (event) => {
    const target = event.target as Element | null;
    const option = target?.closest<HTMLButtonElement>("[data-theme-option]");
    if (option?.dataset.themeOption) {
      setTheme(option.dataset.themeOption);
      return;
    }
    if (target?.closest("[data-theme-shuffle]")) shuffleTheme();
  });

  if (!dialog) return;

  // Invoker commands fallback (command="show-modal").
  if (!("commandForElement" in HTMLButtonElement.prototype)) {
    document
      .querySelectorAll<HTMLButtonElement>('[commandfor="theme-picker"]')
      .forEach((btn) =>
        btn.addEventListener("click", () => {
          if (!dialog.open) dialog.showModal();
        }),
      );
  }

  // closedby="any" fallback: close on a press and release outside the dialog.
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    const outside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };
    let pressedOutside = false;
    dialog.addEventListener("pointerdown", (e) => {
      pressedOutside = outside(e);
    });
    dialog.addEventListener("pointerup", (e) => {
      if (pressedOutside && outside(e)) dialog.close();
    });
  }
}

const active = themes.find((t) => t.id === current());
if (active) {
  syncUi(active);
  void mountScript(active.id);
}
initPicker();
