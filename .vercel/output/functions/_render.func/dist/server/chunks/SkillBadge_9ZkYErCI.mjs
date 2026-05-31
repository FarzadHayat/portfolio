import { b as createAstro, c as createComponent, m as maybeRenderHead, a as renderTemplate } from './astro/server_DRANw9YG.mjs';

const $$Astro = createAstro("https://farzadhayat.dev");
const $$SkillBadge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SkillBadge;
  const { skill } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<span class="badge badge-soft badge-accent rounded-full">${skill}</span>`;
}, "/home/farzad/portfolio/src/components/SkillBadge.astro", void 0);

export { $$SkillBadge as $ };
