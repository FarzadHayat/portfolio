import { defineMiddleware } from "astro:middleware";
import {
  THEME_COOKIE,
  THEME_QUEUE_COOKIE,
  getTheme,
  nextThemeFromBag,
  parseThemeQueue,
  removeFromQueue,
  serializeThemeQueue,
} from "./themes/registry";

// Pick the theme on the server so the first paint is already themed.
// - ?theme=<id> shows that theme (handy for sharing a look).
// - If the visitor already has a theme this visit, keep it across pages.
// - Otherwise (first page of a visit) advance a shuffle bag to pick one.
export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  if (
    context.isPrerendered ||
    pathname.startsWith("/keystatic") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_")
  ) {
    return next();
  }

  const fromQuery = context.url.searchParams.get("theme");
  const fromCookie = context.cookies.get(THEME_COOKIE)?.value;
  let queue = parseThemeQueue(
    context.cookies.get(THEME_QUEUE_COOKIE)?.value,
  );

  let design: string;
  if (getTheme(fromQuery)) {
    design = fromQuery!;
    queue = removeFromQueue(queue, design);
  } else if (getTheme(fromCookie)) {
    design = fromCookie!;
  } else {
    const nextTheme = nextThemeFromBag(fromCookie, queue);
    design = nextTheme.id;
    queue = nextTheme.queue;
  }

  if (design !== fromCookie) {
    context.cookies.set(THEME_COOKIE, design, { path: "/", sameSite: "lax" });
    context.cookies.set(THEME_QUEUE_COOKIE, serializeThemeQueue(queue), {
      path: "/",
      sameSite: "lax",
    });
  }

  context.locals.design = design;
  return next();
});
