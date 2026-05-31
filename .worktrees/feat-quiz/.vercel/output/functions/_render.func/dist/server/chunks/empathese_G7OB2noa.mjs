import { w as createVNode, F as Fragment, ar as __astro_tag_component__ } from './astro/server_DRANw9YG.mjs';
import { $ as $$Image } from './_astro_assets_BJomHv_Y.mjs';
import { _ as __0_______assets_hackathons_uqcs_hackathon_2023_jpg__ } from './uqcs-hackathon-2023_B-8MKuMD.mjs';

const __1_______assets_projects_empathese_1_webp__ = new Proxy({"src":"/_astro/1.B3iRndED.webp","width":1908,"height":896,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/farzad/portfolio/.worktrees/feat-quiz/src/assets/projects/empathese/1.webp";
							}
							
							return target[name];
						}
					});

const __2_______assets_projects_empathese_2_webp__ = new Proxy({"src":"/_astro/2.DRWcJWSr.webp","width":1908,"height":896,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/farzad/portfolio/.worktrees/feat-quiz/src/assets/projects/empathese/2.webp";
							}
							
							return target[name];
						}
					});

const __3_______assets_projects_empathese_3_webp__ = new Proxy({"src":"/_astro/3.CTdskQep.webp","width":1908,"height":896,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/farzad/portfolio/.worktrees/feat-quiz/src/assets/projects/empathese/3.webp";
							}
							
							return target[name];
						}
					});

const __4_______assets_projects_empathese_4_webp__ = new Proxy({"src":"/_astro/4.DIUfT-xl.webp","width":1908,"height":896,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/farzad/portfolio/.worktrees/feat-quiz/src/assets/projects/empathese/4.webp";
							}
							
							return target[name];
						}
					});

const __5_______assets_projects_empathese_5_webp__ = new Proxy({"src":"/_astro/5.-PPPs5vT.webp","width":369,"height":794,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/farzad/portfolio/.worktrees/feat-quiz/src/assets/projects/empathese/5.webp";
							}
							
							return target[name];
						}
					});

const frontmatter = {
  "featured": false,
  "title": "Empathese",
  "description": "AI-powered conversation companion to help interpret loved ones' messages using GPT-4 and Whisper.",
  "image": "../../assets/projects/empathese.gif",
  "startDate": "2023-08-25T00:00:00.000Z",
  "endDate": "2023-08-27T00:00:00.000Z",
  "skills": ["Svelte", "Tailwind CSS", "SvelteKit", "OpenAI", "ChatGPT", "Whisper", "TypeScript", "daisyUI", "GPT-4"],
  "demoLink": "https://empathese.farzadhayat.dev/",
  "sourceLink": "https://github.com/FarzadHayat/empathese"
};
function getHeadings() {
  return [];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    "astro-image": "astro-image",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  }, _component0 = _components["astro-image"];
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Empathese is a conversation companion to help you interpret what your loved ones may be trying to say to you."
    }), "\n", createVNode(_components.p, {
      children: "There are two modes:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Helpful Mode:"
        }), " provides positive feedback and polite suggestions."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Brutal Mode:"
        }), " added later on as a skit to provide interesting responses and perhaps on what NOT to say."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "This project was developed in a team of two over the weekend of 25-27 Aug 2023 for UQCS Hackathon."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_component0, {
        alt: "Hackathon Photo",
        src: __0_______assets_hackathons_uqcs_hackathon_2023_jpg__
      })
    }), "\n", createVNode(_components.p, {
      children: "I was responsible for developing the server-side using SvelteKit and TypeScript, as well as prompt engineering the LLM.\nWhisper and GPT-4 APIs were used for voice dictation and conversation interpretation respectively."
    }), "\n", createVNode(_components.p, {
      children: "This was my first exposure to using the Svelte framework as well as using TypeScript calling APIs, and deploying to a live server. Overall it was an incredible learning experience and I look forward to further exploring modern web development."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_component0, {
        alt: "Screenshot 1",
        src: __1_______assets_projects_empathese_1_webp__
      }), "\n", createVNode(_component0, {
        alt: "Screenshot 2",
        src: __2_______assets_projects_empathese_2_webp__
      }), "\n", createVNode(_component0, {
        alt: "Screenshot 3",
        src: __3_______assets_projects_empathese_3_webp__
      }), "\n", createVNode(_component0, {
        alt: "Screenshot 4",
        src: __4_______assets_projects_empathese_4_webp__
      }), "\n", createVNode(_component0, {
        alt: "Screenshot 5",
        src: __5_______assets_projects_empathese_5_webp__
      })]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/projects/empathese.mdx";
const file = "/home/farzad/portfolio/.worktrees/feat-quiz/src/content/projects/empathese.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/farzad/portfolio/.worktrees/feat-quiz/src/content/projects/empathese.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
