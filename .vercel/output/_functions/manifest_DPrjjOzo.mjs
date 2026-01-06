import "piccolore";
import { k as decodeKey } from "./chunks/astro/server_CZjIeNvH.mjs";
import "clsx";
import { N as NOOP_MIDDLEWARE_FN } from "./chunks/astro-designed-error-pages_ZmIT0fNe.mjs";
import "es-module-lexer";

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [
          key,
          value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F"),
        ];
      }
      return [key, value];
    }),
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content
    .normalize()
    .replace(/\?/g, "%3F")
    .replace(/#/g, "%23")
    .replace(/%5B/g, "[")
    .replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment
    .map((part) => getParameter(part, params))
    .join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path =
      segments.map((segment) => getSegment(segment, sanitizedParams)).join("") +
      trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(
      rawRouteData.segments,
      rawRouteData._meta.trailingSlash,
    ),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute
      ? deserializeRouteData(rawRouteData.redirectRoute)
      : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin,
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData),
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key,
  };
}

const manifest = deserializeManifest({
  hrefRoot: "file:///Users/johnjeong/Dev/johnjeong/",
  cacheDir: "file:///Users/johnjeong/Dev/johnjeong/node_modules/.astro/",
  outDir: "file:///Users/johnjeong/Dev/johnjeong/dist/",
  srcDir: "file:///Users/johnjeong/Dev/johnjeong/src/",
  publicDir: "file:///Users/johnjeong/Dev/johnjeong/public/",
  buildClientDir: "file:///Users/johnjeong/Dev/johnjeong/dist/client/",
  buildServerDir: "file:///Users/johnjeong/Dev/johnjeong/dist/server/",
  adapterName: "@astrojs/vercel",
  routes: [
    {
      file: "",
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        type: "page",
        component: "_server-islands.astro",
        params: ["name"],
        segments: [
          [{ content: "_server-islands", dynamic: false, spread: false }],
          [{ content: "name", dynamic: true, spread: false }],
        ],
        pattern: "^\\/_server-islands\\/([^/]+?)\\/?$",
        prerender: false,
        isIndex: false,
        fallbackRoutes: [],
        route: "/_server-islands/[name]",
        origin: "internal",
        _meta: { trailingSlash: "ignore" },
      },
    },
    {
      file: "essays/index.html",
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        route: "/essays",
        isIndex: true,
        type: "page",
        pattern: "^\\/essays\\/?$",
        segments: [[{ content: "essays", dynamic: false, spread: false }]],
        params: [],
        component: "src/pages/essays/index.astro",
        pathname: "/essays",
        prerender: true,
        fallbackRoutes: [],
        distURL: [],
        origin: "project",
        _meta: { trailingSlash: "ignore" },
      },
    },
    {
      file: "inspirations/index.html",
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        route: "/inspirations",
        isIndex: true,
        type: "page",
        pattern: "^\\/inspirations\\/?$",
        segments: [
          [{ content: "inspirations", dynamic: false, spread: false }],
        ],
        params: [],
        component: "src/pages/inspirations/index.astro",
        pathname: "/inspirations",
        prerender: true,
        fallbackRoutes: [],
        distURL: [],
        origin: "project",
        _meta: { trailingSlash: "ignore" },
      },
    },
    {
      file: "journals/index.html",
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        route: "/journals",
        isIndex: true,
        type: "page",
        pattern: "^\\/journals\\/?$",
        segments: [[{ content: "journals", dynamic: false, spread: false }]],
        params: [],
        component: "src/pages/journals/index.astro",
        pathname: "/journals",
        prerender: true,
        fallbackRoutes: [],
        distURL: [],
        origin: "project",
        _meta: { trailingSlash: "ignore" },
      },
    },
    {
      file: "lessons/index.html",
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        route: "/lessons",
        isIndex: true,
        type: "page",
        pattern: "^\\/lessons\\/?$",
        segments: [[{ content: "lessons", dynamic: false, spread: false }]],
        params: [],
        component: "src/pages/lessons/index.astro",
        pathname: "/lessons",
        prerender: true,
        fallbackRoutes: [],
        distURL: [],
        origin: "project",
        _meta: { trailingSlash: "ignore" },
      },
    },
    {
      file: "questions/index.html",
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        route: "/questions",
        isIndex: true,
        type: "page",
        pattern: "^\\/questions\\/?$",
        segments: [[{ content: "questions", dynamic: false, spread: false }]],
        params: [],
        component: "src/pages/questions/index.astro",
        pathname: "/questions",
        prerender: true,
        fallbackRoutes: [],
        distURL: [],
        origin: "project",
        _meta: { trailingSlash: "ignore" },
      },
    },
    {
      file: "index.html",
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        route: "/",
        isIndex: true,
        type: "page",
        pattern: "^\\/$",
        segments: [],
        params: [],
        component: "src/pages/index.astro",
        pathname: "/",
        prerender: true,
        fallbackRoutes: [],
        distURL: [],
        origin: "project",
        _meta: { trailingSlash: "ignore" },
      },
    },
    {
      file: "",
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        type: "endpoint",
        isIndex: false,
        route: "/_image",
        pattern: "^\\/_image\\/?$",
        segments: [[{ content: "_image", dynamic: false, spread: false }]],
        params: [],
        component: "node_modules/astro/dist/assets/endpoint/generic.js",
        pathname: "/_image",
        prerender: false,
        fallbackRoutes: [],
        origin: "internal",
        _meta: { trailingSlash: "ignore" },
      },
    },
    {
      file: "",
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        route: "/api/subscribe",
        isIndex: false,
        type: "endpoint",
        pattern: "^\\/api\\/subscribe\\/?$",
        segments: [
          [{ content: "api", dynamic: false, spread: false }],
          [{ content: "subscribe", dynamic: false, spread: false }],
        ],
        params: [],
        component: "src/pages/api/subscribe.ts",
        pathname: "/api/subscribe",
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: "project",
        _meta: { trailingSlash: "ignore" },
      },
    },
    {
      file: "",
      links: [],
      scripts: [],
      styles: [],
      routeData: {
        route: "/api/unsubscribe",
        isIndex: false,
        type: "endpoint",
        pattern: "^\\/api\\/unsubscribe\\/?$",
        segments: [
          [{ content: "api", dynamic: false, spread: false }],
          [{ content: "unsubscribe", dynamic: false, spread: false }],
        ],
        params: [],
        component: "src/pages/api/unsubscribe.ts",
        pathname: "/api/unsubscribe",
        prerender: false,
        fallbackRoutes: [],
        distURL: [],
        origin: "project",
        _meta: { trailingSlash: "ignore" },
      },
    },
  ],
  base: "/",
  trailingSlash: "ignore",
  compressHTML: true,
  componentMetadata: [
    ["\u0000astro:content", { propagation: "in-tree", containsHead: false }],
    [
      "/Users/johnjeong/Dev/johnjeong/src/pages/essays/[id].astro",
      { propagation: "in-tree", containsHead: true },
    ],
    [
      "\u0000@astro-page:src/pages/essays/[id]@_@astro",
      { propagation: "in-tree", containsHead: false },
    ],
    [
      "\u0000@astrojs-ssr-virtual-entry",
      { propagation: "in-tree", containsHead: false },
    ],
    [
      "/Users/johnjeong/Dev/johnjeong/src/pages/essays/[lang].astro",
      { propagation: "in-tree", containsHead: true },
    ],
    [
      "\u0000@astro-page:src/pages/essays/[lang]@_@astro",
      { propagation: "in-tree", containsHead: false },
    ],
    [
      "/Users/johnjeong/Dev/johnjeong/src/pages/inspirations/[id].astro",
      { propagation: "in-tree", containsHead: true },
    ],
    [
      "\u0000@astro-page:src/pages/inspirations/[id]@_@astro",
      { propagation: "in-tree", containsHead: false },
    ],
    [
      "/Users/johnjeong/Dev/johnjeong/src/pages/inspirations/index.astro",
      { propagation: "in-tree", containsHead: true },
    ],
    [
      "\u0000@astro-page:src/pages/inspirations/index@_@astro",
      { propagation: "in-tree", containsHead: false },
    ],
    [
      "/Users/johnjeong/Dev/johnjeong/src/pages/journals/[id].astro",
      { propagation: "in-tree", containsHead: true },
    ],
    [
      "\u0000@astro-page:src/pages/journals/[id]@_@astro",
      { propagation: "in-tree", containsHead: false },
    ],
    [
      "/Users/johnjeong/Dev/johnjeong/src/pages/journals/index.astro",
      { propagation: "in-tree", containsHead: true },
    ],
    [
      "\u0000@astro-page:src/pages/journals/index@_@astro",
      { propagation: "in-tree", containsHead: false },
    ],
    [
      "/Users/johnjeong/Dev/johnjeong/src/pages/lessons/[id].astro",
      { propagation: "in-tree", containsHead: true },
    ],
    [
      "\u0000@astro-page:src/pages/lessons/[id]@_@astro",
      { propagation: "in-tree", containsHead: false },
    ],
    [
      "/Users/johnjeong/Dev/johnjeong/src/pages/lessons/index.astro",
      { propagation: "in-tree", containsHead: true },
    ],
    [
      "\u0000@astro-page:src/pages/lessons/index@_@astro",
      { propagation: "in-tree", containsHead: false },
    ],
    [
      "/Users/johnjeong/Dev/johnjeong/src/pages/pages/[slug].astro",
      { propagation: "in-tree", containsHead: true },
    ],
    [
      "\u0000@astro-page:src/pages/pages/[slug]@_@astro",
      { propagation: "in-tree", containsHead: false },
    ],
    [
      "/Users/johnjeong/Dev/johnjeong/src/pages/index.astro",
      { propagation: "none", containsHead: true },
    ],
    [
      "/Users/johnjeong/Dev/johnjeong/src/pages/questions/index.astro",
      { propagation: "none", containsHead: true },
    ],
  ],
  renderers: [],
  clientDirectives: [
    [
      "idle",
      '(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value=="object"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};"requestIdleCallback"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event("astro:idle"));})();',
    ],
    [
      "load",
      '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();',
    ],
    [
      "media",
      '(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener("change",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event("astro:media"));})();',
    ],
    [
      "only",
      '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();',
    ],
    [
      "visible",
      '(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event("astro:visible"));})();',
    ],
  ],
  entryModules: {
    "\u0000noop-middleware": "_noop-middleware.mjs",
    "\u0000virtual:astro:actions/noop-entrypoint": "noop-entrypoint.mjs",
    "\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":
      "pages/_image.astro.mjs",
    "\u0000@astro-page:src/pages/api/subscribe@_@ts":
      "pages/api/subscribe.astro.mjs",
    "\u0000@astro-page:src/pages/api/unsubscribe@_@ts":
      "pages/api/unsubscribe.astro.mjs",
    "\u0000@astro-page:src/pages/essays/[id]@_@astro":
      "pages/essays/_id_.astro.mjs",
    "\u0000@astro-page:src/pages/essays/[lang]@_@astro":
      "pages/essays/_lang_.astro.mjs",
    "\u0000@astro-page:src/pages/essays/index@_@astro":
      "pages/essays.astro.mjs",
    "\u0000@astro-page:src/pages/inspirations/[id]@_@astro":
      "pages/inspirations/_id_.astro.mjs",
    "\u0000@astro-page:src/pages/inspirations/index@_@astro":
      "pages/inspirations.astro.mjs",
    "\u0000@astro-page:src/pages/journals/[id]@_@astro":
      "pages/journals/_id_.astro.mjs",
    "\u0000@astro-page:src/pages/journals/index@_@astro":
      "pages/journals.astro.mjs",
    "\u0000@astro-page:src/pages/lessons/[id]@_@astro":
      "pages/lessons/_id_.astro.mjs",
    "\u0000@astro-page:src/pages/lessons/index@_@astro":
      "pages/lessons.astro.mjs",
    "\u0000@astro-page:src/pages/pages/[slug]@_@astro":
      "pages/pages/_slug_.astro.mjs",
    "\u0000@astro-page:src/pages/questions/index@_@astro":
      "pages/questions.astro.mjs",
    "\u0000@astro-page:src/pages/index@_@astro": "pages/index.astro.mjs",
    "\u0000@astrojs-ssr-virtual-entry": "entry.mjs",
    "\u0000@astro-renderers": "renderers.mjs",
    "\u0000@astrojs-ssr-adapter": "_@astrojs-ssr-adapter.mjs",
    "\u0000@astrojs-manifest": "manifest_DPrjjOzo.mjs",
    "/Users/johnjeong/Dev/johnjeong/node_modules/astro/dist/assets/services/noop.js":
      "chunks/noop_DucOS0ys.mjs",
    "/Users/johnjeong/Dev/johnjeong/.astro/content-assets.mjs":
      "chunks/content-assets_BnDBkURy.mjs",
    "/Users/johnjeong/Dev/johnjeong/.astro/content-modules.mjs":
      "chunks/content-modules_Dz-S_Wwv.mjs",
    "\u0000astro:data-layer-content":
      "chunks/_astro_data-layer-content_DGj0vDjO.mjs",
    "/Users/johnjeong/Dev/johnjeong/src/layouts/Base.astro?astro&type=script&index=0&lang.ts":
      "_astro/Base.astro_astro_type_script_index_0_lang.B7Tnt6m8.js",
    "/Users/johnjeong/Dev/johnjeong/src/components/Header.astro?astro&type=script&index=0&lang.ts":
      "_astro/Header.astro_astro_type_script_index_0_lang.IM5_6VzQ.js",
    "/Users/johnjeong/Dev/johnjeong/src/components/Footer.astro?astro&type=script&index=0&lang.ts":
      "_astro/Footer.astro_astro_type_script_index_0_lang.B8R7KpU_.js",
    "astro:scripts/before-hydration.js": "",
  },
  inlinedScripts: [
    [
      "/Users/johnjeong/Dev/johnjeong/src/layouts/Base.astro?astro&type=script&index=0&lang.ts",
      'document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector(".scroll-blur-bottom");if(!t)return;const e=()=>{const o=window.scrollY,n=document.documentElement.scrollHeight,l=window.innerHeight,c=n-l;t.classList.toggle("visible",o<c-10)};window.addEventListener("scroll",e),window.addEventListener("resize",e),e()});',
    ],
    [
      "/Users/johnjeong/Dev/johnjeong/src/components/Header.astro?astro&type=script&index=0&lang.ts",
      'document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".subtitle"),c=e?.querySelector(".subtitle-text"),s=e?.querySelector(".see-more");e&&c&&s&&(c.scrollHeight>c.clientHeight&&e.classList.add("needs-truncation"),s.addEventListener("click",()=>{e.classList.contains("expanded")?(e.classList.remove("expanded"),s.textContent="see more"):(e.classList.add("expanded"),s.textContent="see less")}));const o=document.querySelector(".nav-container"),t=document.querySelector(".main-nav");if(o&&t){const n=()=>{const l=t.scrollLeft,r=t.scrollWidth-t.clientWidth;o.classList.toggle("scroll-left",l>2),o.classList.toggle("scroll-right",l<r-2)};t.addEventListener("scroll",n),window.addEventListener("resize",n),n()}});',
    ],
    [
      "/Users/johnjeong/Dev/johnjeong/src/components/Footer.astro?astro&type=script&index=0&lang.ts",
      'const s=document.getElementById("newsletter-form"),t=s?.querySelector("button");s?.addEventListener("submit",async a=>{a.preventDefault();const e=new FormData(s),o=e.get("email"),n={essays:e.get("essays")==="on",journals:e.get("journals")==="on",inspirations:e.get("inspirations")==="on",lessons:e.get("lessons")==="on"};t.innerHTML=\'<svg class="spinner" viewBox="0 0 16 16" fill="currentColor"><rect x="7" y="1" width="2" height="4" rx="1" opacity=".14"/><rect x="7" y="1" width="2" height="4" rx="1" opacity=".29" transform="rotate(45 8 8)"/><rect x="7" y="1" width="2" height="4" rx="1" opacity=".43" transform="rotate(90 8 8)"/><rect x="7" y="1" width="2" height="4" rx="1" opacity=".57" transform="rotate(135 8 8)"/><rect x="7" y="1" width="2" height="4" rx="1" opacity=".71" transform="rotate(180 8 8)"/><rect x="7" y="1" width="2" height="4" rx="1" opacity=".86" transform="rotate(225 8 8)"/><rect x="7" y="1" width="2" height="4" rx="1" opacity="1" transform="rotate(270 8 8)"/><rect x="7" y="1" width="2" height="4" rx="1" opacity="1" transform="rotate(315 8 8)"/></svg>Subscribing\',t.disabled=!0,t.className="btn loading";try{const r=await fetch("/api/subscribe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:o,preferences:n})});if(r.ok)t.textContent="Subscribed!",t.className="btn success",s.reset(),setTimeout(()=>{t.textContent="Subscribe",t.className="btn",t.disabled=!1},2e3);else{const i=await r.json();t.textContent=i.error||"Failed",t.className="btn error",setTimeout(()=>{t.textContent="Subscribe",t.className="btn",t.disabled=!1},2e3)}}catch{t.textContent="Failed",t.className="btn error",setTimeout(()=>{t.textContent="Subscribe",t.className="btn",t.disabled=!1},2e3)}});',
    ],
  ],
  assets: [
    "/_astro/image_1767332910143_0.BE5eCmco.png",
    "/favicon.svg",
    "/essays/index.html",
    "/inspirations/index.html",
    "/journals/index.html",
    "/lessons/index.html",
    "/questions/index.html",
    "/index.html",
  ],
  buildFormat: "directory",
  checkOrigin: true,
  allowedDomains: [],
  serverIslandNameMap: [],
  key: "qrVKf9gwUT1y31FMFfZhKHze+jb7O6lnPiojvYslayM=",
});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
