import { w as createVNode, F as Fragment, ar as __astro_tag_component__ } from './astro/server_DRANw9YG.mjs';
import { $ as $$Image } from './_astro_assets_BJomHv_Y.mjs';
import { $ as $$YouTube } from './YouTube_DE1tyaA8.mjs';

const __0_______assets_projects_droid_invasion_1_webp__ = new Proxy({"src":"/_astro/1.a4G5yrC-.webp","width":1536,"height":864,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/farzad/portfolio/.worktrees/feat-quiz/src/assets/projects/droid-invasion/1.webp";
							}
							
							return target[name];
						}
					});

const __1_______assets_projects_droid_invasion_2_webp__ = new Proxy({"src":"/_astro/2.CM--erPK.webp","width":1536,"height":864,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/farzad/portfolio/.worktrees/feat-quiz/src/assets/projects/droid-invasion/2.webp";
							}
							
							return target[name];
						}
					});

const __2_______assets_projects_droid_invasion_3_webp__ = new Proxy({"src":"/_astro/3.C-5wjUu_.webp","width":1536,"height":864,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/farzad/portfolio/.worktrees/feat-quiz/src/assets/projects/droid-invasion/3.webp";
							}
							
							return target[name];
						}
					});

const __3_______assets_projects_droid_invasion_4_webp__ = new Proxy({"src":"/_astro/4.w3utgPGy.webp","width":1536,"height":864,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/farzad/portfolio/.worktrees/feat-quiz/src/assets/projects/droid-invasion/4.webp";
							}
							
							return target[name];
						}
					});

const __4_______assets_projects_droid_invasion_5_webp__ = new Proxy({"src":"/_astro/5.MW3h0m0k.webp","width":1536,"height":864,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/farzad/portfolio/.worktrees/feat-quiz/src/assets/projects/droid-invasion/5.webp";
							}
							
							return target[name];
						}
					});

const frontmatter = {
  "title": "Droid Invasion",
  "description": "A first-person shooter game for Windows where you survive against waves of enemy droids.",
  "image": "../../assets/projects/droid-invasion.webp",
  "startDate": "2018-02-01T00:00:00.000Z",
  "endDate": "2018-11-30T00:00:00.000Z",
  "skills": ["Unity3D", "C#", "Blender", "Photoshop", "Windows"]
};
function getHeadings() {
  return [];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    a: "a",
    "astro-image": "astro-image",
    p: "p",
    ...props.components
  }, _component0 = _components["astro-image"];
  return createVNode(Fragment, {
    children: [createVNode($$YouTube, {
      id: "YfwHRVawtzs"
    }), "\n", createVNode(_components.p, {
      children: "A first-person shooter game made for Windows.\nThe goal is to kill enemy droids and survive as long as possible.\nMade using Unity3D, C# and Blender."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "https://1drv.ms/u/s!AhCA5BqltFh3gXOXvPggLfkT9RuL?e=NiBhnZ",
        children: "Download for Windows"
      })
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_component0, {
        alt: "Screenshot 1",
        src: __0_______assets_projects_droid_invasion_1_webp__
      }), "\n", createVNode(_component0, {
        alt: "Screenshot 2",
        src: __1_______assets_projects_droid_invasion_2_webp__
      }), "\n", createVNode(_component0, {
        alt: "Screenshot 3",
        src: __2_______assets_projects_droid_invasion_3_webp__
      }), "\n", createVNode(_component0, {
        alt: "Screenshot 4",
        src: __3_______assets_projects_droid_invasion_4_webp__
      }), "\n", createVNode(_component0, {
        alt: "Screenshot 5",
        src: __4_______assets_projects_droid_invasion_5_webp__
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

const url = "src/content/projects/droid-invasion.mdx";
const file = "/home/farzad/portfolio/.worktrees/feat-quiz/src/content/projects/droid-invasion.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/farzad/portfolio/.worktrees/feat-quiz/src/content/projects/droid-invasion.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
