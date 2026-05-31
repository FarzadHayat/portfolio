import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, a as renderTemplate } from './astro/server_DRANw9YG.mjs';
import { $ as $$Image } from './_astro_assets_BJomHv_Y.mjs';
import { $ as $$SkillBadge } from './SkillBadge_ChgewhMV.mjs';
import { E as ExternalLink } from './external-link_DGgOzHGo.mjs';
import { c as createLucideIcon } from './Layout_CpzJJPi5.mjs';

const Eye = createLucideIcon("eye", [["path", { "d": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }], ["circle", { "cx": "12", "cy": "12", "r": "3" }]]);

const $$Astro = createAstro("https://farzadhayat.dev");
const $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { project } = Astro2.props;
  function formatPeriod(startDate, endDate) {
    const options = {
      month: "short",
      year: "numeric"
    };
    const start = startDate.toLocaleDateString("en-US", options);
    const end = endDate ? endDate.toLocaleDateString("en-US", options) : "Present";
    return `${start} - ${end}`;
  }
  return renderTemplate`${maybeRenderHead()}<article class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"> <a class="hover:opacity-80 transition-opacity"${addAttribute(`/projects/${project.id}`, "href")}> <figure class="aspect-video"> ${renderComponent($$result, "Image", $$Image, { "src": project.data.image, "alt": project.data.title, "class": "w-full h-full object-cover", "width": 600, "height": 400 })} </figure> </a> <div class="card-body"> <h3 class="card-title hover:text-primary transition-colors"> <a${addAttribute(`/projects/${project.id}`, "href")}>${project.data.title}</a> </h3> <time class="text-sm text-base-content/60"> ${formatPeriod(project.data.startDate, project.data.endDate)} </time> <p class="text-base-content/80">${project.data.description}</p> <div class="flex flex-wrap gap-2 mt-2"> ${project.data.skills.map((skill) => renderTemplate`${renderComponent($$result, "SkillBadge", $$SkillBadge, { "skill": skill })}`)} </div> <div class="card-actions justify-end mt-4 gap-2"> ${project.data.demoLink && renderTemplate`<a${addAttribute(project.data.demoLink, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-soft gap-1"> ${renderComponent($$result, "ExternalLink", ExternalLink, { "class": "size-4" })}
Demo
</a>`} ${project.data.sourceLink && renderTemplate`<a${addAttribute(project.data.sourceLink, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-soft gap-1"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="currentColor"> <path d="M16,2.345c7.735,0,14,6.265,14,14-.002,6.015-3.839,11.359-9.537,13.282-.7,.14-.963-.298-.963-.665,0-.473,.018-1.978,.018-3.85,0-1.312-.437-2.152-.945-2.59,3.115-.35,6.388-1.54,6.388-6.912,0-1.54-.543-2.783-1.435-3.762,.14-.35,.63-1.785-.14-3.71,0,0-1.173-.385-3.85,1.435-1.12-.315-2.31-.472-3.5-.472s-2.38,.157-3.5,.472c-2.677-1.802-3.85-1.435-3.85-1.435-.77,1.925-.28,3.36-.14,3.71-.892,.98-1.435,2.24-1.435,3.762,0,5.355,3.255,6.563,6.37,6.913-.403,.35-.77,.963-.893,1.872-.805,.368-2.818,.963-4.077-1.155-.263-.42-1.05-1.452-2.152-1.435-1.173,.018-.472,.665,.017,.927,.595,.332,1.277,1.575,1.435,1.978,.28,.787,1.19,2.293,4.707,1.645,0,1.173,.018,2.275,.018,2.607,0,.368-.263,.787-.963,.665-5.719-1.904-9.576-7.255-9.573-13.283,0-7.735,6.265-14,14-14Z"></path> </svg>
Source
</a>`} <div class="tooltip" data-tip="View project details"> <a${addAttribute(`/projects/${project.id}`, "href")} class="btn btn-sm btn-primary"> ${renderComponent($$result, "Eye", Eye, { "class": "size-4" })} </a> </div> </div> </div> </article>`;
}, "/home/farzad/portfolio/.worktrees/feat-quiz/src/components/ProjectCard.astro", void 0);

export { $$ProjectCard as $ };
