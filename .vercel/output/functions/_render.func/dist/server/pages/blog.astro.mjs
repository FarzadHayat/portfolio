import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_DRANw9YG.mjs';
import { g as getCollection, $ as $$Layout } from '../chunks/Layout_DKjpLSKR.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_KfQri5a7.mjs';
import { $ as $$SkillBadge } from '../chunks/SkillBadge_9ZkYErCI.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const blogPosts = await getCollection("blog");
  const sortedPosts = blogPosts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog - Bloomfolio", "description": "Read my latest blog posts and articles" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-6xl mx-auto px-6 py-28"> <!-- Header --> <div class="text-center mb-16"> <h1 class="text-5xl font-bold mb-4">Blog</h1> <p class="text-xl text-base-content/70">
Thoughts, stories, and ideas about development, design, and technology.
</p> </div> <!-- Back to Home --> <div class="mb-8"> <a href="/" class="btn btn-ghost btn-sm rounded-full"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m15 18-6-6 6-6"></path> </svg>
Back to Home
</a> </div> <!-- Blog Posts Grid --> ${sortedPosts.length === 0 ? renderTemplate`<div class="text-center py-20"> <p class="text-2xl text-base-content/60">
No blog posts yet. Check back soon!
</p> </div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${sortedPosts.map((post) => renderTemplate`<article class="card bg-base-100 rounded-3xl shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"> <figure class="aspect-video"> ${renderComponent($$result2, "Image", $$Image, { "src": post.data.image, "alt": post.data.title, "class": "w-full h-full object-cover", "width": 600, "height": 400 })} </figure> <div class="card-body"> <time class="text-sm text-base-content/60"> ${formatDate(post.data.publishDate)} </time> <h2 class="card-title hover:text-primary transition-colors"> <a${addAttribute(`/blog/${post.id}`, "href")}>${post.data.title}</a> </h2> <p class="text-base-content/80">${post.data.description}</p> ${post.data.tags && post.data.tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mt-2"> ${post.data.tags.map((tag) => renderTemplate`${renderComponent($$result2, "SkillBadge", $$SkillBadge, { "skill": tag })}`)} </div>`} <div class="card-actions justify-end mt-4"> <a${addAttribute(`/blog/${post.id}`, "href")} class="btn btn-primary btn-sm rounded-full">
Read More
</a> </div> </div> </article>`)} </div>`} </main> ` })}`;
}, "/home/farzad/portfolio/src/pages/blog/index.astro", void 0);

const $$file = "/home/farzad/portfolio/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
