import { w as createVNode, F as Fragment, ar as __astro_tag_component__ } from './astro/server_DRANw9YG.mjs';
import { $ as $$YouTube } from './YouTube_DE1tyaA8.mjs';

const frontmatter = {
  "title": "Breakout",
  "description": "A third-person adventure game made for Android where you rescue hostages. Made with Unity3D and C#.",
  "image": "../../assets/projects/breakout.webp",
  "startDate": "2019-02-01T00:00:00.000Z",
  "endDate": "2019-11-30T00:00:00.000Z",
  "skills": ["Unity3D", "C#", "Magicavoxel", "Photoshop", "Android"]
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    br: "br",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode($$YouTube, {
      id: "8J8EgPmWjPE"
    }), "\n", createVNode(_components.p, {
      children: ["A third-person adventure game made for Android.", createVNode(_components.br, {}), "\nThe goal is to rescue the hostages and lead them to the exit.\nMade using Unity3D, C#, and Magicavoxel."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.a, {
        href: "https://1drv.ms/u/s!AhCA5BqltFh3gWRDUPaJh8Qy07rK?e=3igqUF",
        children: "APK Download"
      })
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

const url = "src/content/projects/breakout.mdx";
const file = "/home/farzad/portfolio/.worktrees/feat-quiz/src/content/projects/breakout.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/farzad/portfolio/.worktrees/feat-quiz/src/content/projects/breakout.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
