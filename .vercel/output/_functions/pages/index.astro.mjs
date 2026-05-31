import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate, r as renderComponent, F as Fragment } from '../chunks/astro/server_DRANw9YG.mjs';
import { c as createLucideIcon, b as getIcon, g as getCollection, a as getEntry, r as renderEntry, R as Rocket, $ as $$Layout, B as Briefcase, G as GraduationCap, A as Award } from '../chunks/Layout_DKjpLSKR.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_KfQri5a7.mjs';
import { $ as $$SkillBadge } from '../chunks/SkillBadge_9ZkYErCI.mjs';
/* empty css                                 */
import { E as ExternalLink } from '../chunks/external-link_BixajSu6.mjs';
import { $ as $$ProjectCard } from '../chunks/ProjectCard_2-g6oMdh.mjs';
export { renderers } from '../renderers.mjs';

const ArrowRight = createLucideIcon("arrow-right", [["path", { "d": "M5 12h14" }], ["path", { "d": "m12 5 7 7-7 7" }]]);

const Plus = createLucideIcon("plus", [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]]);

const $$Astro$5 = createAstro("https://farzadhayat.dev");
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Hero;
  const { hero, showQuizCta } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero min-h-screen"> <div class="hero-content flex-col lg:flex-row-reverse max-w-7xl"> <div class="hover-3d"> <!-- content --> <figure class="max-w-100 w-48 lg:w-64 mask mask-squircle"> ${typeof hero.avatar === "string" ? renderTemplate`<img${addAttribute(hero.avatar, "src")}${addAttribute(hero.name, "alt")}>` : renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": hero.avatar, "alt": hero.name })}`} </figure> <!-- 8 empty divs needed for the 3D effect --> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div> <div class="max-w-2xl text-center lg:text-left"> <h1 class="text-4xl lg:text-5xl font-bold mb-4"> ${hero.name} </h1> <p class="text-xl text-base-content/80 mb-2"> ${hero.title} </p> ${hero.location && renderTemplate`<p class="text-base-content/60 mb-4">${hero.location}</p>`} <p class="text-lg leading-relaxed mb-6"> ${hero.description} </p> <div class="flex items-center gap-2 w-full"> <div class="flex gap-2 items-center flex-wrap justify-center lg:justify-start"> ${hero.socialLinks.map((link) => {
    const IconComponent = getIcon(link.icon);
    return renderTemplate`<div class="tooltip tooltip-top"${addAttribute(link.label, "data-tip")}> <a${addAttribute(link.url, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-circle btn-primary lg:btn-ghost"${addAttribute(link.label, "aria-label")}> ${renderComponent($$result, "IconComponent", IconComponent, { "class": "size-6" })} </a> </div>`;
  })} </div> ${showQuizCta && renderTemplate`<a href="/quiz" class="btn btn-outline btn-accent rounded-full ml-auto shrink-0">
Think you know me? →
</a>`} </div> </div> </div> </section>`;
}, "/home/farzad/portfolio/src/components/Hero.astro", void 0);

const $$Astro$4 = createAstro("https://farzadhayat.dev");
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$About;
  const { title, photo, Content, link } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section id="about" class="py-28 px-6"> <div class="max-w-4xl mx-auto"> <div class="card card-side bg-base-200 rounded-3xl shadow-soft"> ${photo && renderTemplate`<figure class="shrink-0 w-48"> ${typeof photo === "string" ? renderTemplate`<img${addAttribute(photo, "src")}${addAttribute(title, "alt")}>` : renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": photo, "alt": title })}`} </figure>`} <div class="card-body"> <h2 class="card-title text-2xl">${title}</h2> <article class="prose prose-sm max-w-none prose-a:text-primary prose-a:underline prose-a:hover:opacity-80"> ${renderComponent($$result, "Content", Content, {})} </article> ${link && renderTemplate`<div class="card-actions justify-end"> <div class="tooltip" data-tip="More about me"> <a${addAttribute(link, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-circle"> ${renderComponent($$result, "Plus", Plus, { "class": "size-5" })} </a> </div> </div>`} </div> </div> </div> </section>`;
}, "/home/farzad/portfolio/src/components/About.astro", void 0);

const $$Astro$3 = createAstro("https://farzadhayat.dev");
const $$Timeline = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Timeline;
  const {
    collection,
    variant,
    color = "primary",
    backgroundColor = "base-200",
    icon,
    sectionTitle,
    sectionSubtitle,
    expandedByDefault = false
  } = Astro2.props;
  const IconComponent = icon;
  const entries = await getCollection(collection);
  const aboutEntry = await getEntry("about", "index");
  const aboutLink = aboutEntry?.data?.link;
  const sortedEntries = entries.sort(
    (a, b) => b.data.startDate.getTime() - a.data.startDate.getTime()
  );
  function formatPeriod(startDate, endDate) {
    const options = {
      month: "short",
      year: "numeric"
    };
    const start = startDate.toLocaleDateString("en-US", options);
    const end = endDate ? endDate.toLocaleDateString("en-US", options) : "Present";
    return `${start} - ${end}`;
  }
  function calculateDuration(startDate, endDate) {
    if (!endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    if (years === 0) {
      return `(${months} mo${months !== 1 ? "s" : ""})`;
    } else if (months === 0) {
      return `(${years} yr${years !== 1 ? "s" : ""})`;
    } else {
      return `(${years} yr${years !== 1 ? "s" : ""} ${months} mo${months !== 1 ? "s" : ""})`;
    }
  }
  const bgClasses = {
    "base-100": "bg-base-100",
    "base-200": "bg-base-200",
    "base-300": "bg-base-300",
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent"
  };
  const bgClass = bgClasses[backgroundColor] || "bg-base-200";
  const textClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    neutral: "text-neutral",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-error"
  };
  const textColorClass = textClasses[color] || "text-primary";
  const entriesWithContent = await Promise.all(
    sortedEntries.map(async (entry) => {
      const { Content } = await renderEntry(entry);
      const duration = calculateDuration(entry.data.startDate, entry.data.endDate);
      return { entry, Content, duration };
    })
  );
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(collection, "id")}${addAttribute(`py-28 px-6 ${bgClass}`, "class")} data-astro-cid-zhxkjw2l> <div class="mx-auto max-w-4xl" data-astro-cid-zhxkjw2l> <div class="text-center mb-16" data-astro-cid-zhxkjw2l> <h2 class="text-4xl font-bold" data-astro-cid-zhxkjw2l>${sectionTitle}</h2> ${sectionSubtitle && renderTemplate`<p class="text-base-content/70 mt-2" data-astro-cid-zhxkjw2l>${sectionSubtitle}</p>`} </div> ${variant === "timeline" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-zhxkjw2l": true }, { "default": async ($$result2) => renderTemplate` <ul class="timeline timeline-vertical timeline-compact timeline-snap-icon" data-astro-cid-zhxkjw2l> ${entriesWithContent.map(({ entry, duration }, index) => renderTemplate`<li data-astro-cid-zhxkjw2l> ${index > 0 && renderTemplate`<hr class="bg-base-100" data-astro-cid-zhxkjw2l>`} <div class="timeline-middle" data-astro-cid-zhxkjw2l> ${renderComponent($$result2, "IconComponent", IconComponent, { "class": `size-5 ${textColorClass} mx-3 my-1`, "data-astro-cid-zhxkjw2l": true })} </div> <div${addAttribute(`${index % 2 === 0 ? "timeline-end timeline-even-item" : "timeline-end"} w-full lg:max-w-2xs pt-3 mb-10`, "class")} data-astro-cid-zhxkjw2l> <time${addAttribute(`font-mono text-sm text-base-content/70 block italic timeline-item-date`, "class")} data-astro-cid-zhxkjw2l> ${formatPeriod(entry.data.startDate, entry.data.endDate)} ${duration && renderTemplate`<span class="ml-1 text-base-content/50" data-astro-cid-zhxkjw2l> ${duration} </span>`} </time> <div class="card bg-base-100 rounded-3xl shadow-soft mt-2" data-astro-cid-zhxkjw2l> <div class="card-body" data-astro-cid-zhxkjw2l> <div class="flex items-center gap-4" data-astro-cid-zhxkjw2l> ${entry.data.logo ? renderTemplate`<div class="avatar" data-astro-cid-zhxkjw2l> <div class="w-12 mask mask-squircle" data-astro-cid-zhxkjw2l> ${renderComponent($$result2, "Image", $$Image, { "src": entry.data.logo, "alt": entry.data.title, "inferSize": true, "data-astro-cid-zhxkjw2l": true })} </div> </div>` : renderTemplate`<div class="avatar placeholder" data-astro-cid-zhxkjw2l> <div class="bg-neutral text-neutral-content w-12 mask mask-squircle flex items-center justify-center" data-astro-cid-zhxkjw2l> ${renderComponent($$result2, "IconComponent", IconComponent, { "class": "size-6", "data-astro-cid-zhxkjw2l": true })} </div> </div>`} <div class="flex-1" data-astro-cid-zhxkjw2l> <h3 class="card-title" data-astro-cid-zhxkjw2l>${entry.data.title}</h3> <p${addAttribute(`${textColorClass} font-semibold`, "class")} data-astro-cid-zhxkjw2l> ${entry.data.subtitle} </p> ${"location" in entry.data && entry.data.location && renderTemplate`<p class="text-sm text-base-content/60" data-astro-cid-zhxkjw2l> ${entry.data.location} </p>`} </div> </div> <div class="card-actions justify-end mt-2" data-astro-cid-zhxkjw2l> <button class="btn btn-ghost btn-sm rounded-full"${addAttribute(`document.getElementById('modal-${entry.id}').showModal()`, "onclick")} data-astro-cid-zhxkjw2l>
Read more
</button> </div> </div> </div> </div> ${index < entriesWithContent.length - 1 && renderTemplate`<hr class="bg-base-100" data-astro-cid-zhxkjw2l>`} </li>`)} </ul> ${entriesWithContent.map(({ entry, Content, duration }) => renderTemplate`<dialog${addAttribute(`modal-${entry.id}`, "id")} class="modal" data-astro-cid-zhxkjw2l> <div class="modal-box max-w-2xl rounded-3xl" data-astro-cid-zhxkjw2l>  <div class="flex items-center gap-4 mb-4" data-astro-cid-zhxkjw2l> ${entry.data.logo && renderTemplate`<div class="avatar" data-astro-cid-zhxkjw2l> <div class="w-16 mask mask-squircle" data-astro-cid-zhxkjw2l> ${renderComponent($$result2, "Image", $$Image, { "src": entry.data.logo, "alt": entry.data.title, "inferSize": true, "data-astro-cid-zhxkjw2l": true })} </div> </div>`} <div data-astro-cid-zhxkjw2l> <h3 class="font-bold text-xl" data-astro-cid-zhxkjw2l>${entry.data.title}</h3> <p${addAttribute(`${textColorClass} font-semibold`, "class")} data-astro-cid-zhxkjw2l> ${entry.data.subtitle} </p> ${"location" in entry.data && entry.data.location && renderTemplate`<p class="text-sm text-base-content/60" data-astro-cid-zhxkjw2l> ${entry.data.location} </p>`} <p class="text-sm text-base-content/70 font-mono italic mt-1" data-astro-cid-zhxkjw2l> ${formatPeriod(entry.data.startDate, entry.data.endDate)} ${duration && renderTemplate`<span class="ml-1 text-base-content/50" data-astro-cid-zhxkjw2l> ${duration} </span>`} </p> </div> </div>  ${"skills" in entry.data && entry.data.skills && entry.data.skills.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mb-4" data-astro-cid-zhxkjw2l> ${entry.data.skills.map((skill) => renderTemplate`${renderComponent($$result2, "SkillBadge", $$SkillBadge, { "skill": skill, "data-astro-cid-zhxkjw2l": true })}`)} </div>`}  <div class="prose prose-sm max-w-none text-base-content/80" data-astro-cid-zhxkjw2l> ${renderComponent($$result2, "Content", Content, { "data-astro-cid-zhxkjw2l": true })} </div>  <div class="modal-action" data-astro-cid-zhxkjw2l> ${entry.data.link && renderTemplate`<a${addAttribute(entry.data.link, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-ghost rounded-full gap-2" data-astro-cid-zhxkjw2l>
View Company
${renderComponent($$result2, "ExternalLink", ExternalLink, { "class": "size-4", "data-astro-cid-zhxkjw2l": true })} </a>`} <form method="dialog" data-astro-cid-zhxkjw2l> <button class="btn rounded-full px-6" data-astro-cid-zhxkjw2l>Close</button> </form> </div> </div> <form method="dialog" class="modal-backdrop" data-astro-cid-zhxkjw2l> <button data-astro-cid-zhxkjw2l>close</button> </form> </dialog>`)}` })}` : renderTemplate`<ul class="flex flex-col gap-4" data-astro-cid-zhxkjw2l> ${entriesWithContent.map(({ entry, Content, duration }) => renderTemplate`<li class="card bg-base-100 rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-300" data-astro-cid-zhxkjw2l> <details class="collapse collapse-arrow"${addAttribute(expandedByDefault, "open")} data-astro-cid-zhxkjw2l> <summary class="collapse-title" data-astro-cid-zhxkjw2l> <div class="flex items-center gap-4" data-astro-cid-zhxkjw2l> <div class="shrink-0" data-astro-cid-zhxkjw2l> ${entry.data.logo ? renderTemplate`<div class="avatar" data-astro-cid-zhxkjw2l> <div class="w-10 mask mask-squircle" data-astro-cid-zhxkjw2l> ${renderComponent($$result, "Image", $$Image, { "src": entry.data.logo, "alt": entry.data.title, "inferSize": true, "data-astro-cid-zhxkjw2l": true })} </div> </div>` : renderTemplate`<div class="avatar placeholder" data-astro-cid-zhxkjw2l> <div class="bg-neutral text-neutral-content w-10 mask mask-squircle flex items-center justify-center" data-astro-cid-zhxkjw2l> ${renderComponent($$result, "IconComponent", IconComponent, { "class": "size-5", "data-astro-cid-zhxkjw2l": true })} </div> </div>`} </div> <div class="flex-1 min-w-0" data-astro-cid-zhxkjw2l> <h3 class="font-bold text-lg leading-tight" data-astro-cid-zhxkjw2l>${entry.data.title}</h3> <p${addAttribute(`${textColorClass} font-semibold text-sm`, "class")} data-astro-cid-zhxkjw2l> ${entry.data.subtitle} </p> <p class="text-sm text-base-content/70 font-mono mt-0.5 md:hidden" data-astro-cid-zhxkjw2l> ${formatPeriod(entry.data.startDate, entry.data.endDate)} ${duration && renderTemplate`<span class="ml-1 text-base-content/50" data-astro-cid-zhxkjw2l> ${duration} </span>`} </p> </div> <div class="hidden md:block text-sm text-base-content/70 font-mono whitespace-nowrap shrink-0 mr-6" data-astro-cid-zhxkjw2l> ${formatPeriod(entry.data.startDate, entry.data.endDate)} ${duration && renderTemplate`<span class="ml-1 text-base-content/50" data-astro-cid-zhxkjw2l> ${duration} </span>`} </div> </div> </summary> <div class="collapse-content" data-astro-cid-zhxkjw2l> <div class="prose prose-sm max-w-none" data-astro-cid-zhxkjw2l> ${renderComponent($$result, "Content", Content, { "data-astro-cid-zhxkjw2l": true })} </div> ${entry.data.link && renderTemplate`<div class="flex justify-end mt-3" data-astro-cid-zhxkjw2l> <a${addAttribute(entry.data.link, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost btn-outline rounded-full gap-1" data-astro-cid-zhxkjw2l> ${collection === "work" ? "View Company" : collection === "education" ? "View Institution" : "View Credential"} ${renderComponent($$result, "ExternalLink", ExternalLink, { "class": "size-3", "data-astro-cid-zhxkjw2l": true })} </a> </div>`} </div> </details> </li>`)} </ul>`} ${collection === "work" && variant === "timeline" && aboutLink && renderTemplate`<div class="text-center mt-10" data-astro-cid-zhxkjw2l> <a${addAttribute(aboutLink, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-outline rounded-full px-8" data-astro-cid-zhxkjw2l>
More my Work Experience
</a> </div>`} </div> </section> `;
}, "/home/farzad/portfolio/src/components/Timeline.astro", void 0);

const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const projectEntries = await getCollection("projects");
  const featuredProjects = projectEntries.filter((project) => project.data.featured === true).sort((a, b) => b.data.startDate.getTime() - a.data.startDate.getTime()).slice(0, 3);
  return renderTemplate`${maybeRenderHead()}<section id="projects" class="py-28 px-6 bg-base-200"> <div class="max-w-6xl mx-auto"> <div class="text-center mb-16"> <h2 class="text-4xl font-bold mb-4">Check out my latest work</h2> <p class="text-lg text-base-content/70">
I've worked on a variety of projects, from simple websites to complex
        web applications. Here are a few of my favorites.
</p> </div> ${featuredProjects.length === 0 ? renderTemplate`<div class="text-center py-12"> <p class="text-lg text-base-content/60">
No featured projects yet. Check out all projects below.
</p> </div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${featuredProjects.map((project) => renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { "project": project })}`)} </div>`} <div class="text-center mt-10"> <a href="/projects" class="btn btn-primary btn-outline rounded-full px-8">
View All Projects
</a> </div> </div> </section>`;
}, "/home/farzad/portfolio/src/components/Projects.astro", void 0);

const $$Astro$2 = createAstro("https://farzadhayat.dev");
const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const { post } = Astro2.props;
  function formatDate(date) {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric"
    };
    return date.toLocaleDateString("en-US", options);
  }
  return renderTemplate`${maybeRenderHead()}<div class="card image-full rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"> <figure class="aspect-video"> ${renderComponent($$result, "Image", $$Image, { "src": post.data.image, "alt": post.data.title })} </figure> <div class="card-body rounded-b-3xl justify-end bg-linear-to-t from-black/70 to-transparent"> <h3 class="card-title text-base-100-content hover:text-primary-content transition-colors"> <a${addAttribute(`/blog/${post.id}`, "href")}>${post.data.title}</a> </h3> <time class="text-sm text-base-100-content/80"> ${formatDate(post.data.publishDate)} </time> <p class="text-base-100-content/90 line-clamp-2">${post.data.description}</p> </div> </div>`;
}, "/home/farzad/portfolio/src/components/BlogCard.astro", void 0);

const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const blogEntries = await getCollection("blog");
  const sortedPosts = blogEntries.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
  const latestPosts = sortedPosts.slice(0, 3);
  return renderTemplate`${maybeRenderHead()}<section id="blog" class="py-28 px-6 bg-base-300"> <div class="max-w-6xl mx-auto"> <div class="text-center mb-16"> <h2 class="text-4xl font-bold mb-4">Latest Blog Posts</h2> <p class="text-lg text-base-content/70">
Thoughts, insights, and tutorials on web development, design, and
        technology.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${latestPosts.map((post) => renderTemplate`${renderComponent($$result, "BlogCard", $$BlogCard, { "post": post })}`)} </div> <div class="text-center mt-12"> <a href="/blog" class="btn btn-primary rounded-full px-8 gap-2">
View All Posts
${renderComponent($$result, "ArrowRight", ArrowRight, { "class": "size-4" })} </a> </div> </div> </section>`;
}, "/home/farzad/portfolio/src/components/Blog.astro", void 0);

const $$Hackathons = createComponent(async ($$result, $$props, $$slots) => {
  const hackathonEntries = await getCollection("hackathons");
  const sortedHackathons = hackathonEntries.sort(
    (a, b) => b.data.startDate.getTime() - a.data.startDate.getTime()
  );
  function formatPeriod(startDate, endDate) {
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric"
    };
    const start = startDate.toLocaleDateString("en-US", options);
    if (endDate && endDate.getTime() !== startDate.getTime()) {
      const end = endDate.toLocaleDateString("en-US", options);
      return `${start} - ${end}`;
    }
    return start;
  }
  return renderTemplate`${maybeRenderHead()}<section id="hackathons" class="py-28 px-6"> <div class="max-w-4xl mx-auto"> <div class="text-center mb-16"> <h2 class="text-4xl font-bold mb-4">I like building things</h2> <p class="text-lg text-base-content/70">
During my time in university, I attended multiple hackathons. People
        from around the country would come together and build incredible things
        in 2-3 days. It was eye-opening to see the endless possibilities brought
        to life by a group of motivated and passionate individuals.
</p> </div> <div class="space-y-6"> ${sortedHackathons.map((hackathon) => renderTemplate`<div class="card bg-base-100 rounded-3xl shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"> <div class="flex flex-col sm:flex-row"> ${hackathon.data.logo ? renderTemplate`<figure class="rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none overflow-hidden sm:w-56 sm:max-h-64 shrink-0"> ${renderComponent($$result, "Image", $$Image, { "src": hackathon.data.logo, "alt": hackathon.data.title, "class": "w-full h-48 object-cover sm:h-auto sm:object-contain", "inferSize": true })} </figure>` : renderTemplate`<div class="flex sm:flex-col justify-center items-center p-6 sm:w-32 shrink-0"> <div class="bg-neutral text-neutral-content w-16 h-16 rounded-2xl flex items-center justify-center"> ${renderComponent($$result, "Rocket", Rocket, { "class": "size-8" })} </div> </div>`} <div class="card-body"> <time class="text-sm text-base-content/60"> ${formatPeriod(hackathon.data.startDate, hackathon.data.endDate)} </time> <h3 class="card-title mt-1">${hackathon.data.title}</h3> <p class="text-sm text-primary font-semibold"> ${hackathon.data.location} </p> <p class="text-base-content/80 mt-3"> ${hackathon.data.description} </p> ${hackathon.data.sourceLink && renderTemplate`<div class="card-actions mt-4"> <a${addAttribute(hackathon.data.sourceLink, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline btn-primary rounded-full">
View Project
</a> </div>`} </div> </div> </div>`)} </div> </div> </section>`;
}, "/home/farzad/portfolio/src/components/Hackathons.astro", void 0);

const $$Astro$1 = createAstro("https://farzadhayat.dev");
const $$Spotify = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Spotify;
  const { url } = Astro2.props;
  let embedUrl = url;
  if (url.includes("open.spotify.com") && !url.includes("/embed/")) {
    embedUrl = url.replace("open.spotify.com/", "open.spotify.com/embed/");
  }
  return renderTemplate`${maybeRenderHead()}<div class="spotify-embed my-6 rounded-xl overflow-hidden"> <iframe${addAttribute(embedUrl, "src")} title="Spotify embed" width="100%" height="352" allowtransparency="true" allow="encrypted-media" loading="lazy" class="rounded-xl"></iframe> </div>`;
}, "/home/farzad/portfolio/src/components/Spotify.astro", void 0);

const $$Astro = createAstro("https://farzadhayat.dev");
const $$SpotifySection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SpotifySection;
  const { url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section id="spotify" class="py-28 px-6"> <div class="max-w-4xl mx-auto"> <div class="text-center mb-16"> <h2 class="text-4xl font-bold mb-4">My Favorite Playlist</h2> </div> ${renderComponent($$result, "Spotify", $$Spotify, { "url": url })} </div> </section>`;
}, "/home/farzad/portfolio/src/components/SpotifySection.astro", void 0);

const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const contactEntry = await getEntry("contact", "index");
  const contact = contactEntry.data;
  const { Content } = await renderEntry(contactEntry);
  const SectionIcon = getIcon(contact.icon);
  const FooterIcon = getIcon(contact.footerIcon);
  return renderTemplate`${maybeRenderHead()}<footer class="footer footer-horizontal footer-center bg-base-200 py-16"> <aside> ${renderComponent($$result, "SectionIcon", SectionIcon, { "class": "inline-block size-20" })} <p class="max-w-xl m-auto text-lg"> ${renderComponent($$result, "Content", Content, {})} <a${addAttribute(contact.linkUrl, "href")} target="_blank" rel="noopener noreferrer" class="link link-hover text-primary"> ${contact.linkText} </a>
and I'll respond whenever I can.
</p> <p class="flex items-center space-x-1 text-base-content/60"> <span>Copyright © ${(/* @__PURE__ */ new Date()).getFullYear()} - ${contact.footerText}</span> <a class="link link-hover inline-flex justify-center items-center"${addAttribute(contact.footerLinkUrl, "href")} target="_blank" rel="noopener noreferrer"> ${renderComponent($$result, "FooterIcon", FooterIcon, { "class": "size-3 inline-block mr-1" })} ${contact.footerLinkText} </a> </p> </aside> </footer>`;
}, "/home/farzad/portfolio/src/components/Contact.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const heroEntry = await getEntry("hero", "index");
  const aboutEntry = await getEntry("about", "index");
  const { Content: AboutContent } = await renderEntry(aboutEntry);
  const generalEntry = await getEntry("general", "index");
  const general = generalEntry.data;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${heroEntry.data.name} - Portfolio`, "description": heroEntry.data.description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <!-- Hero Section (Always visible) --> ${renderComponent($$result2, "Hero", $$Hero, { "hero": heroEntry.data, "showQuizCta": general.showQuizCta })} <!-- About Section --> ${general.showAboutSection && renderTemplate`${renderComponent($$result2, "About", $$About, { "title": aboutEntry.data.title, "photo": aboutEntry.data.photo, "Content": AboutContent, "link": aboutEntry.data.link })}`} <!-- Projects Section --> ${general.showProjectsSection && renderTemplate`${renderComponent($$result2, "Projects", $$Projects, {})}`} <!-- Blog Section --> ${general.showBlogSection && renderTemplate`${renderComponent($$result2, "Blog", $$Blog, {})}`} <!-- Work Experience Section --> ${general.showWorkSection && renderTemplate`${renderComponent($$result2, "Timeline", $$Timeline, { "collection": "work", "variant": "timeline", "color": "primary", "icon": Briefcase, "sectionTitle": "Work Experience" })}`} <!-- Education Section --> ${general.showEducationSection && renderTemplate`${renderComponent($$result2, "Timeline", $$Timeline, { "collection": "education", "variant": "list", "color": "secondary", "backgroundColor": "base-300", "icon": GraduationCap, "sectionTitle": "Education", "expandedByDefault": true })}`} <!-- Certifications Section --> ${general.showCertificationsSection && renderTemplate`${renderComponent($$result2, "Timeline", $$Timeline, { "collection": "certifications", "variant": "list", "color": "accent", "backgroundColor": "base-200", "icon": Award, "sectionTitle": "Certifications", "expandedByDefault": true })}`} <!-- Hackathons Section --> ${general.showHackathonsSection && renderTemplate`${renderComponent($$result2, "Hackathons", $$Hackathons, {})}`} <!-- Spotify Section --> ${general.showSpotifySection && renderTemplate`${renderComponent($$result2, "SpotifySection", $$SpotifySection, { "url": general.spotifyPlaylistUrl })}`} <!-- Contact Section --> ${general.showContactSection && renderTemplate`${renderComponent($$result2, "Contact", $$Contact, {})}`} </main> ` })}`;
}, "/home/farzad/portfolio/src/pages/index.astro", void 0);

const $$file = "/home/farzad/portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
