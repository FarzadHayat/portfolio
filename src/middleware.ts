import { defineMiddleware } from "astro:middleware";
import { THEME_COOKIE, getTheme, randomThemeId } from "./themes/registry";

// Pick the theme on the server so the first paint is already themed.
// - ?theme=<id> shows that theme (handy for sharing a look).
// - Otherwise the visitor's cookie wins.
// - A new visitor gets a random theme, kept for the browser session.
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

  let design: string;
  if (getTheme(fromQuery)) {
    design = fromQuery!;
  } else if (getTheme(fromCookie)) {
    design = fromCookie!;
  } else {
    design = randomThemeId();
  }

  if (design !== fromCookie) {
    // Session cookie: a new browser session gets a new random theme.
    context.cookies.set(THEME_COOKIE, design, { path: "/", sameSite: "lax" });
  }

  context.locals.design = design;
  return next();
});
