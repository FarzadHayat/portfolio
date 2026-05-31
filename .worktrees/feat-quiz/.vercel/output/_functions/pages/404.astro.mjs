import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DRANw9YG.mjs';
import { c as createLucideIcon, $ as $$Layout, H as House } from '../chunks/Layout_CpzJJPi5.mjs';
export { renderers } from '../renderers.mjs';

const FolderOpen = createLucideIcon("folder-open", [["path", { "d": "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" }]]);

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 - Page Not Found | Bloomfolio", "description": "The page you're looking for doesn't exist." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center px-4 py-20"> <div class="text-center max-w-2xl mx-auto"> <!-- Large 404 Number --> <h1 class="text-9xl font-bold text-primary mb-4 animate-pulse">404</h1> <!-- Error Title --> <h2 class="text-4xl font-bold mb-4">🥀 Page Not Found</h2> <!-- Error Description --> <p class="text-xl mb-8 text-base-content/70">
Oops! The page you're looking for doesn't exist or has been moved. Let's
        get you back on track.
</p> <!-- Divider --> <div class="divider"></div> <!-- Action Buttons --> <div class="flex gap-4 justify-center flex-wrap mt-8"> <a href="/" class="btn btn-primary gap-2"> ${renderComponent($$result2, "House", House, { "class": "size-5" })}
Go Home
</a> <a href="/#projects" class="btn btn-outline gap-2"> ${renderComponent($$result2, "FolderOpen", FolderOpen, { "class": "size-5" })}
View Projects
</a> </div> <!-- Helpful Links --> <div class="flex justify-center gap-2 mt-12"> <p class="text-sm text-base-content/60 mb-4">
You might be looking for:
</p> <div class="flex gap-3 justify-center flex-wrap text-sm"> <a href="/blog" class="link link-hover">Blog</a> <span class="text-base-content/30">•</span> <a href="/#about" class="link link-hover">About</a> <span class="text-base-content/30">•</span> <a href="/blog/guides/bloomfolio-complete-guide" class="link link-hover">Documentation</a> </div> </div> </div> </div> ` })}`;
}, "/home/farzad/portfolio/.worktrees/feat-quiz/src/pages/404.astro", void 0);

const $$file = "/home/farzad/portfolio/.worktrees/feat-quiz/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
