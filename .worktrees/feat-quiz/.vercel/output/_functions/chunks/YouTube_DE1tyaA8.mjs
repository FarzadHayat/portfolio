import { c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate, b as createAstro } from './astro/server_DRANw9YG.mjs';

const $$Astro = createAstro("https://farzadhayat.dev");
const $$YouTube = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$YouTube;
  const { id, url } = Astro2.props;
  let videoId = id;
  if (url && !videoId) {
    const urlPatterns = [
      /(?:youtube\.com\/watch\?v=)([^&]+)/,
      /(?:youtu\.be\/)([^?]+)/,
      /(?:youtube\.com\/embed\/)([^?]+)/
    ];
    for (const pattern of urlPatterns) {
      const match = url.match(pattern);
      if (match) {
        videoId = match[1];
        break;
      }
    }
  }
  if (!videoId) {
    throw new Error('YouTube component requires either an "id" or "url" prop');
  }
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return renderTemplate`${maybeRenderHead()}<div class="youtube-embed my-6 rounded-xl overflow-hidden aspect-video"> <iframe${addAttribute(embedUrl, "src")}${addAttribute(`YouTube video player - ${videoId}`, "title")} width="100%" height="100%" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" class="w-full h-full"></iframe> </div>`;
}, "/home/farzad/portfolio/.worktrees/feat-quiz/src/components/YouTube.astro", void 0);

export { $$YouTube as $ };
