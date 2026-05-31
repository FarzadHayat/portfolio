import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DRANw9YG.mjs';
import { c as createLucideIcon, $ as $$Layout, H as House } from '../chunks/Layout_CpzJJPi5.mjs';
export { renderers } from '../renderers.mjs';

const ArrowLeft = createLucideIcon("arrow-left", [["path", { "d": "m12 19-7-7 7-7" }], ["path", { "d": "M19 12H5" }]]);

const $$Astro = createAstro("https://farzadhayat.dev");
const $$500 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$500;
  const { error } = Astro2.props;
  const displayMessage = "An unexpected error occurred while processing your request.";
  if (error instanceof Error) {
    console.error("500 Server Error:", {
      message: error.message,
      stack: error.stack,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "500 - Server Error | Bloomfolio", "description": "An error occurred while processing your request." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center px-4 py-20"> <div class="text-center max-w-2xl mx-auto"> <!-- Large 500 Number --> <h1 class="text-9xl font-bold text-error mb-4 animate-pulse">500</h1> <!-- Error Title --> <h2 class="text-4xl font-bold mb-4">Server Error</h2> <!-- Error Description --> <p class="text-xl mb-8 text-base-content/70"> ${displayMessage} <br>
Please try again later or contact support if the problem persists.
</p> <!-- Divider --> <div class="divider"></div> <!-- Action Buttons --> <div class="flex gap-4 justify-center flex-wrap mt-8"> <a href="/" class="btn btn-primary gap-2"> ${renderComponent($$result2, "House", House, { "class": "size-5" })}
Go Home
</a> <button onclick="history.back()" class="btn btn-outline gap-2"> ${renderComponent($$result2, "ArrowLeft", ArrowLeft, { "class": "size-5" })}
Go Back
</button> </div> <!-- Note about SSR --> <div class="mt-12 p-4 bg-base-200 rounded-lg"> <p class="text-sm text-base-content/60"> <strong>Note:</strong> This error page is only active when using Server-Side
          Rendering (SSR). Currently, Bloomfolio is configured for static generation.
</p> </div> <!-- Helpful Links --> <div class="mt-8"> <p class="text-sm text-base-content/60 mb-4">Need help?</p> <div class="flex gap-3 justify-center flex-wrap text-sm"> <a href="/#contact" class="link link-hover">Contact</a> <span class="text-base-content/30">•</span> <a href="/blog/guides/bloomfolio-complete-guide" class="link link-hover">Documentation</a> <span class="text-base-content/30">•</span> <a href="https://github.com/lauroguedes/bloomfolio/issues" target="_blank" rel="noopener noreferrer" class="link link-hover">Report Issue</a> </div> </div> </div> </div> ` })}`;
}, "/home/farzad/portfolio/.worktrees/feat-quiz/src/pages/500.astro", void 0);

const $$file = "/home/farzad/portfolio/.worktrees/feat-quiz/src/pages/500.astro";
const $$url = "/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$500,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
