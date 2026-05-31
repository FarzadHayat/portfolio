import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment, d as addAttribute, e as renderSlot } from '../../chunks/astro/server_DRANw9YG.mjs';
import { $ as $$Layout, a as getEntry, r as renderEntry } from '../../chunks/Layout_DKjpLSKR.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_KfQri5a7.mjs';
import { $ as $$SkillBadge } from '../../chunks/SkillBadge_9ZkYErCI.mjs';
import { E as ExternalLink } from '../../chunks/external-link_BixajSu6.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://farzadhayat.dev");
const $$ProjectLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProjectLayout;
  const {
    title,
    description,
    startDate,
    endDate,
    image,
    skills,
    demoLink,
    sourceLink,
    downloadLink
  } = Astro2.props;
  function formatPeriod(startDate2, endDate2) {
    const options = {
      month: "short",
      year: "numeric"
    };
    const start = startDate2.toLocaleDateString("en-US", options);
    const end = endDate2 ? endDate2.toLocaleDateString("en-US", options) : "Present";
    return `${start} - ${end}`;
  }
  function calculateDuration(startDate2, endDate2) {
    const end = endDate2 || /* @__PURE__ */ new Date();
    const months = (end.getFullYear() - startDate2.getFullYear()) * 12 + (end.getMonth() - startDate2.getMonth());
    if (months < 1) return "Less than a month";
    if (months === 1) return "1 month";
    if (months < 12) return `${months} months`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return years === 1 ? "1 year" : `${years} years`;
    return `${years} year${years > 1 ? "s" : ""}, ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="max-w-4xl mx-auto px-4 py-20"> <!-- Back button --> <div class="mb-8"> <a href="/projects" class="btn btn-ghost btn-sm rounded-full"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m15 18-6-6 6-6"></path> </svg>
Back to Projects
</a> </div> <!-- Featured Image --> <!-- TODO: Future Enhancement - Support multiple images/project gallery --> ${image && renderTemplate`<figure class="mb-8 rounded-3xl overflow-hidden"> ${renderComponent($$result2, "Image", $$Image, { "src": image, "alt": title, "class": "w-full aspect-video object-cover", "width": 1200, "height": 630 })} </figure>`} <!-- Project Header --> <header class="mb-8"> <h1 class="text-5xl font-bold mb-4">${title}</h1> <p class="text-xl text-base-content/70 mb-6">${description}</p> <div class="flex flex-wrap items-center gap-4 text-sm text-base-content/60 mb-6"> <span class="font-semibold">${formatPeriod(startDate, endDate)}</span> <span>•</span> <span>${calculateDuration(startDate, endDate)}</span> ${!endDate && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <span>•</span> <span class="badge badge-success badge-sm">Ongoing</span> ` })}`} </div> <!-- Prominent Action Buttons --> ${(demoLink || sourceLink || downloadLink) && renderTemplate`<div class="flex flex-wrap gap-3 mb-6"> ${demoLink && renderTemplate`<a${addAttribute(demoLink, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-primary rounded-full gap-2"> ${renderComponent($$result2, "ExternalLink", ExternalLink, { "class": "size-5" })}
Live Demo
</a>`} ${sourceLink && renderTemplate`<a${addAttribute(sourceLink, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-soft rounded-full gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="currentColor"> <path d="M16,2.345c7.735,0,14,6.265,14,14-.002,6.015-3.839,11.359-9.537,13.282-.7,.14-.963-.298-.963-.665,0-.473,.018-1.978,.018-3.85,0-1.312-.437-2.152-.945-2.59,3.115-.35,6.388-1.54,6.388-6.912,0-1.54-.543-2.783-1.435-3.762,.14-.35,.63-1.785-.14-3.71,0,0-1.173-.385-3.85,1.435-1.12-.315-2.31-.472-3.5-.472s-2.38,.157-3.5,.472c-2.677-1.802-3.85-1.435-3.85-1.435-.77,1.925-.28,3.36-.14,3.71-.892,.98-1.435,2.24-1.435,3.762,0,5.355,3.255,6.563,6.37,6.913-.403,.35-.77,.963-.893,1.872-.805,.368-2.818,.963-4.077-1.155-.263-.42-1.05-1.452-2.152-1.435-1.173,.018-.472,.665,.017,.927,.595,.332,1.277,1.575,1.435,1.978,.28,.787,1.19,2.293,4.707,1.645,0,1.173,.018,2.275,.018,2.607,0,.368-.263,.787-.963,.665-5.719-1.904-9.576-7.255-9.573-13.283,0-7.735,6.265-14,14-14Z"></path> </svg>
View Source
</a>`} ${downloadLink && renderTemplate`<a${addAttribute(downloadLink, "href")} class="btn btn-soft rounded-full gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <polyline points="7 10 12 15 17 10"></polyline> <line x1="12" y1="15" x2="12" y2="3"></line> </svg>
Download
</a>`} </div>`} </header> <!-- Tech Stack Showcase --> ${skills && skills.length > 0 && renderTemplate`<div class="card bg-base-200 rounded-3xl shadow-soft mb-8"> <div class="card-body"> <h2 class="card-title text-lg mb-3">Tech Stack</h2> <div class="flex flex-wrap gap-2"> ${skills.map((skill) => renderTemplate`${renderComponent($$result2, "SkillBadge", $$SkillBadge, { "skill": skill })}`)} </div> </div> </div>`} <!-- Divider --> <div class="divider"></div> <!-- Project Content --> <div class="prose prose-lg max-w-none"> ${renderSlot($$result2, $$slots["default"])} </div> <!-- Divider --> <div class="divider mt-12"></div> <!-- Back to projects link --> <div class="text-center mt-8"> <a href="/projects" class="btn btn-primary rounded-full px-8"> View All Projects </a> </div> </article> ` })}`;
}, "/home/farzad/portfolio/src/layouts/ProjectLayout.astro", void 0);

const $$Astro = createAstro("https://farzadhayat.dev");
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  const entry = await getEntry("projects", slug);
  if (!entry) {
    return new Response(null, {
      status: 404,
      statusText: "Not found"
    });
  }
  const { Content } = await renderEntry(entry);
  return renderTemplate`${renderComponent($$result, "ProjectLayout", $$ProjectLayout, { "title": entry.data.title, "description": entry.data.description, "startDate": entry.data.startDate, "endDate": entry.data.endDate, "image": entry.data.image, "skills": entry.data.skills, "demoLink": entry.data.demoLink, "sourceLink": entry.data.sourceLink, "downloadLink": entry.data.downloadLink }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/home/farzad/portfolio/src/pages/projects/[...slug].astro", void 0);

const $$file = "/home/farzad/portfolio/src/pages/projects/[...slug].astro";
const $$url = "/projects/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
