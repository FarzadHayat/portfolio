import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute, F as Fragment, e as renderSlot } from '../../chunks/astro/server_DRANw9YG.mjs';
import { $ as $$Layout, a as getEntry, r as renderEntry } from '../../chunks/Layout_DKjpLSKR.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_KfQri5a7.mjs';
import { $ as $$SkillBadge } from '../../chunks/SkillBadge_9ZkYErCI.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://farzadhayat.dev");
const $$BlogLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogLayout;
  const { title, description, publishDate, updatedDate, image, tags } = Astro2.props;
  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }
  const content = await Astro2.slots.render("default");
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="max-w-4xl mx-auto px-4 py-20"> <!-- Back button --> <div class="mb-8"> <a href="/blog" class="btn btn-ghost btn-sm rounded-full"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m15 18-6-6 6-6"></path> </svg>
Back to Blog
</a> </div> <!-- Featured Image --> ${image && renderTemplate`<figure class="mb-8 rounded-3xl overflow-hidden"> ${renderComponent($$result2, "Image", $$Image, { "src": image, "alt": title, "class": "w-full aspect-video object-cover", "width": 1200, "height": 630 })} </figure>`} <!-- Post Header --> <header class="mb-8"> <h1 class="text-5xl font-bold mb-4">${title}</h1> <p class="text-xl text-base-content/70 mb-4">${description}</p> <div class="flex flex-wrap items-center gap-4 text-sm text-base-content/60"> <time${addAttribute(publishDate.toISOString(), "datetime")}> ${formatDate(publishDate)} </time> <span>•</span> <span>${readingTime} min read</span> ${updatedDate && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <span>•</span> <span>Updated: ${formatDate(updatedDate)}</span> ` })}`} </div> ${tags && tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mt-4"> ${tags.map((tag) => renderTemplate`${renderComponent($$result2, "SkillBadge", $$SkillBadge, { "skill": tag })}`)} </div>`} </header> <!-- Divider --> <div class="divider"></div> <!-- Post Content --> <div class="prose prose-lg max-w-none"> ${renderSlot($$result2, $$slots["default"])} </div> <!-- Divider --> <div class="divider mt-12"></div> <!-- Back to blog link --> <div class="text-center mt-8"> <a href="/blog" class="btn btn-primary rounded-full px-8">
View All Posts
</a> </div> </article> ` })}`;
}, "/home/farzad/portfolio/src/layouts/BlogLayout.astro", void 0);

const $$Astro = createAstro("https://farzadhayat.dev");
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  const entry = await getEntry("blog", slug);
  if (!entry) {
    return new Response(null, {
      status: 404,
      statusText: "Not found"
    });
  }
  const { Content } = await renderEntry(entry);
  return renderTemplate`${renderComponent($$result, "BlogLayout", $$BlogLayout, { "title": entry.data.title, "description": entry.data.description, "publishDate": entry.data.publishDate, "updatedDate": entry.data.updatedDate, "image": entry.data.image, "tags": entry.data.tags }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/home/farzad/portfolio/src/pages/blog/[...slug].astro", void 0);

const $$file = "/home/farzad/portfolio/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
