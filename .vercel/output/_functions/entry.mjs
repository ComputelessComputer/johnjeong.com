import { renderers } from "./renderers.mjs";
import {
  c as createExports,
  s as serverEntrypointModule,
} from "./chunks/_@astrojs-ssr-adapter_BoH7bMhh.mjs";
import { manifest } from "./manifest_DPrjjOzo.mjs";

const serverIslandMap = new Map();

const _page0 = () => import("./pages/_image.astro.mjs");
const _page1 = () => import("./pages/api/subscribe.astro.mjs");
const _page2 = () => import("./pages/api/unsubscribe.astro.mjs");
const _page3 = () => import("./pages/essays/_id_.astro.mjs");
const _page4 = () => import("./pages/essays/_lang_.astro.mjs");
const _page5 = () => import("./pages/essays.astro.mjs");
const _page6 = () => import("./pages/inspirations/_id_.astro.mjs");
const _page7 = () => import("./pages/inspirations.astro.mjs");
const _page8 = () => import("./pages/journals/_id_.astro.mjs");
const _page9 = () => import("./pages/journals.astro.mjs");
const _page10 = () => import("./pages/lessons/_id_.astro.mjs");
const _page11 = () => import("./pages/lessons.astro.mjs");
const _page12 = () => import("./pages/pages/_slug_.astro.mjs");
const _page13 = () => import("./pages/questions.astro.mjs");
const _page14 = () => import("./pages/index.astro.mjs");
const pageMap = new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/api/subscribe.ts", _page1],
  ["src/pages/api/unsubscribe.ts", _page2],
  ["src/pages/essays/[id].astro", _page3],
  ["src/pages/essays/[lang].astro", _page4],
  ["src/pages/essays/index.astro", _page5],
  ["src/pages/inspirations/[id].astro", _page6],
  ["src/pages/inspirations/index.astro", _page7],
  ["src/pages/journals/[id].astro", _page8],
  ["src/pages/journals/index.astro", _page9],
  ["src/pages/lessons/[id].astro", _page10],
  ["src/pages/lessons/index.astro", _page11],
  ["src/pages/pages/[slug].astro", _page12],
  ["src/pages/questions/index.astro", _page13],
  ["src/pages/index.astro", _page14],
]);

const _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  actions: () => import("./noop-entrypoint.mjs"),
  middleware: () => import("./_noop-middleware.mjs"),
});
const _args = {
  middlewareSecret: "fcde0a43-3233-49dd-aab5-69fbc1271680",
  skewProtection: false,
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = "start";
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start));

export { __astrojsSsrVirtualEntry as default, pageMap };
