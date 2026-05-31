import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Cr2Ksgt9.mjs';
import { manifest } from './manifest_BU6HrG7U.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/500.astro.mjs');
const _page3 = () => import('./pages/api/keystatic/_---params_.astro.mjs');
const _page4 = () => import('./pages/blog.astro.mjs');
const _page5 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page6 = () => import('./pages/keystatic/_---params_.astro.mjs');
const _page7 = () => import('./pages/projects.astro.mjs');
const _page8 = () => import('./pages/projects/_---slug_.astro.mjs');
const _page9 = () => import('./pages/quiz.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.18.1_@vercel+functions@2.2.13_idb-keyval@6.2.2_jiti@2.6.1_lightningcss@1.32.0_r_64cb88ffbda8b1d4acdbcbafec463f40/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/500.astro", _page2],
    ["node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.50_react-dom@19.2.4_react@19.2.4__react@19.2_2045e7775e68d92a83feeb549bccdbf2/node_modules/@keystatic/astro/internal/keystatic-api.js", _page3],
    ["src/pages/blog/index.astro", _page4],
    ["src/pages/blog/[...slug].astro", _page5],
    ["node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.50_react-dom@19.2.4_react@19.2.4__react@19.2_2045e7775e68d92a83feeb549bccdbf2/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", _page6],
    ["src/pages/projects/index.astro", _page7],
    ["src/pages/projects/[...slug].astro", _page8],
    ["src/pages/quiz.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "60443b97-09ea-447d-9b7e-3dfdab7f980a",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
