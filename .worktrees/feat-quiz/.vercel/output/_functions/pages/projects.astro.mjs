import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DRANw9YG.mjs';
import { g as getCollection, $ as $$Layout } from '../chunks/Layout_CpzJJPi5.mjs';
import { $ as $$ProjectCard } from '../chunks/ProjectCard_CHQ9j30M.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const projects = await getCollection("projects");
  const sortedProjects = projects.sort(
    (a, b) => b.data.startDate.getTime() - a.data.startDate.getTime()
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Projects - Bloomfolio", "description": "Explore my latest projects and work" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-6xl mx-auto px-4 py-20"> <!-- Header --> <div class="text-center mb-16"> <h1 class="text-5xl font-bold mb-4">Projects</h1> <p class="text-xl text-base-content/70">
A collection of projects I've worked on, showcasing my skills and
        experience.
</p> </div> <!-- Back to Home --> <div class="mb-8"> <a href="/" class="btn btn-ghost btn-sm"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m15 18-6-6 6-6"></path> </svg>
Back to Home
</a> </div> <!-- Projects Grid --> ${sortedProjects.length === 0 ? renderTemplate`<div class="text-center py-20"> <p class="text-2xl text-base-content/60">
No projects yet. Check back soon!
</p> </div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${sortedProjects.map((project) => renderTemplate`${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "project": project })}`)} </div>`} </main> ` })}`;
}, "/home/farzad/portfolio/.worktrees/feat-quiz/src/pages/projects/index.astro", void 0);

const $$file = "/home/farzad/portfolio/.worktrees/feat-quiz/src/pages/projects/index.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
