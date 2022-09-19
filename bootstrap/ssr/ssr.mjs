import { createServer } from "http";
import * as runtimeDom from "@vue/runtime-dom";
import { registerRuntimeCompiler, initCustomFormatter, warn, ref, computed, defineComponent, h, Fragment, onMounted, watch, onUnmounted, provide, inject, watchEffect, Teleport, reactive, unref, nextTick, cloneVNode, openBlock, createBlock, createElementBlock, resolveDynamicComponent, KeepAlive, withCtx, normalizeStyle, createVNode, renderList, createCommentVNode, onBeforeUnmount, renderSlot, withModifiers, createElementVNode, resolveComponent, createSSRApp } from "@vue/runtime-dom";
import { compile } from "@vue/compiler-dom";
import { isString, NOOP, extend, generateCodeFrame } from "@vue/shared";
import { renderToString } from "@vue/server-renderer";
import zn from "axios";
function initDev() {
  {
    initCustomFormatter();
  }
}
if (process.env.NODE_ENV !== "production") {
  initDev();
}
const compileCache = /* @__PURE__ */ Object.create(null);
function compileToFunction(template, options) {
  if (!isString(template)) {
    if (template.nodeType) {
      template = template.innerHTML;
    } else {
      process.env.NODE_ENV !== "production" && warn(`invalid template option: `, template);
      return NOOP;
    }
  }
  const key = template;
  const cached = compileCache[key];
  if (cached) {
    return cached;
  }
  if (template[0] === "#") {
    const el2 = document.querySelector(template);
    if (process.env.NODE_ENV !== "production" && !el2) {
      warn(`Template element not found or is empty: ${template}`);
    }
    template = el2 ? el2.innerHTML : ``;
  }
  const opts = extend({
    hoistStatic: true,
    onError: process.env.NODE_ENV !== "production" ? onError : void 0,
    onWarn: process.env.NODE_ENV !== "production" ? (e) => onError(e, true) : NOOP
  }, options);
  if (!opts.isCustomElement && typeof customElements !== "undefined") {
    opts.isCustomElement = (tag) => !!customElements.get(tag);
  }
  const { code } = compile(template, opts);
  function onError(err, asWarning = false) {
    const message = asWarning ? err.message : `Template compilation error: ${err.message}`;
    const codeFrame = err.loc && generateCodeFrame(template, err.loc.start.offset, err.loc.end.offset);
    warn(codeFrame ? `${message}
${codeFrame}` : message);
  }
  const render = new Function("Vue", code)(runtimeDom);
  render._rc = true;
  return compileCache[key] = render;
}
registerRuntimeCompiler(compileToFunction);
function $o(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== false; )
    ;
  return e;
}
function Eo(e) {
  return function(t, r, n) {
    for (var i = -1, o = Object(t), a = n(t), s = a.length; s--; ) {
      var l = a[e ? s : ++i];
      if (r(o[l], l, o) === false)
        break;
    }
    return t;
  };
}
var xo = Eo();
const _o = xo;
function To(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var Ao = typeof global == "object" && global && global.Object === Object && global;
const Kn = Ao;
var Po = typeof self == "object" && self && self.Object === Object && self, Co = Kn || Po || Function("return this")();
const ne = Co;
var Io = ne.Symbol;
const ye = Io;
var Xn = Object.prototype, Do = Xn.hasOwnProperty, jo = Xn.toString, Je = ye ? ye.toStringTag : void 0;
function Bo(e) {
  var t = Do.call(e, Je), r = e[Je];
  try {
    e[Je] = void 0;
    var n = true;
  } catch {
  }
  var i = jo.call(e);
  return n && (t ? e[Je] = r : delete e[Je]), i;
}
var Fo = Object.prototype, Ro = Fo.toString;
function Lo(e) {
  return Ro.call(e);
}
var qo = "[object Null]", Mo = "[object Undefined]", an = ye ? ye.toStringTag : void 0;
function $e(e) {
  return e == null ? e === void 0 ? Mo : qo : an && an in Object(e) ? Bo(e) : Lo(e);
}
function be(e) {
  return e != null && typeof e == "object";
}
var ko = "[object Arguments]";
function sn(e) {
  return be(e) && $e(e) == ko;
}
var Qn = Object.prototype, No = Qn.hasOwnProperty, Ho = Qn.propertyIsEnumerable, Vo = sn(function() {
  return arguments;
}()) ? sn : function(e) {
  return be(e) && No.call(e, "callee") && !Ho.call(e, "callee");
};
const Yn = Vo;
var Uo = Array.isArray;
const k = Uo;
function Wo() {
  return false;
}
var Jn = typeof exports == "object" && exports && !exports.nodeType && exports, ln = Jn && typeof module == "object" && module && !module.nodeType && module, zo = ln && ln.exports === Jn, un = zo ? ne.Buffer : void 0, Go = un ? un.isBuffer : void 0, Ko = Go || Wo;
const ar = Ko;
var Xo = 9007199254740991, Qo = /^(?:0|[1-9]\d*)$/;
function _r(e, t) {
  var r = typeof e;
  return t = t == null ? Xo : t, !!t && (r == "number" || r != "symbol" && Qo.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Yo = 9007199254740991;
function Tr(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Yo;
}
var Jo = "[object Arguments]", Zo = "[object Array]", ea = "[object Boolean]", ta = "[object Date]", ra = "[object Error]", na = "[object Function]", ia = "[object Map]", oa = "[object Number]", aa = "[object Object]", sa = "[object RegExp]", la = "[object Set]", ua = "[object String]", ca = "[object WeakMap]", fa = "[object ArrayBuffer]", da = "[object DataView]", pa = "[object Float32Array]", ha = "[object Float64Array]", va = "[object Int8Array]", ma = "[object Int16Array]", ga = "[object Int32Array]", ya = "[object Uint8Array]", ba = "[object Uint8ClampedArray]", wa = "[object Uint16Array]", Oa = "[object Uint32Array]", I = {};
I[pa] = I[ha] = I[va] = I[ma] = I[ga] = I[ya] = I[ba] = I[wa] = I[Oa] = true;
I[Jo] = I[Zo] = I[fa] = I[ea] = I[da] = I[ta] = I[ra] = I[na] = I[ia] = I[oa] = I[aa] = I[sa] = I[la] = I[ua] = I[ca] = false;
function Sa(e) {
  return be(e) && Tr(e.length) && !!I[$e(e)];
}
function $a(e) {
  return function(t) {
    return e(t);
  };
}
var Zn = typeof exports == "object" && exports && !exports.nodeType && exports, tt = Zn && typeof module == "object" && module && !module.nodeType && module, Ea = tt && tt.exports === Zn, Yt = Ea && Kn.process, xa = function() {
  try {
    var e = tt && tt.require && tt.require("util").types;
    return e || Yt && Yt.binding && Yt.binding("util");
  } catch {
  }
}();
const cn = xa;
var fn = cn && cn.isTypedArray, _a = fn ? $a(fn) : Sa;
const ei = _a;
var Ta = Object.prototype, Aa = Ta.hasOwnProperty;
function Pa(e, t) {
  var r = k(e), n = !r && Yn(e), i = !r && !n && ar(e), o = !r && !n && !i && ei(e), a = r || n || i || o, s = a ? To(e.length, String) : [], l = s.length;
  for (var u in e)
    (t || Aa.call(e, u)) && !(a && (u == "length" || i && (u == "offset" || u == "parent") || o && (u == "buffer" || u == "byteLength" || u == "byteOffset") || _r(u, l))) && s.push(u);
  return s;
}
var Ca = Object.prototype;
function Ia(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Ca;
  return e === r;
}
function Da(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var ja = Da(Object.keys, Object);
const Ba = ja;
var Fa = Object.prototype, Ra = Fa.hasOwnProperty;
function La(e) {
  if (!Ia(e))
    return Ba(e);
  var t = [];
  for (var r in Object(e))
    Ra.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function ee(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var qa = "[object AsyncFunction]", Ma = "[object Function]", ka = "[object GeneratorFunction]", Na = "[object Proxy]";
function ti(e) {
  if (!ee(e))
    return false;
  var t = $e(e);
  return t == Ma || t == ka || t == qa || t == Na;
}
function jt(e) {
  return e != null && Tr(e.length) && !ti(e);
}
function Bt(e) {
  return jt(e) ? Pa(e) : La(e);
}
function Ar(e, t) {
  return e && _o(e, t, Bt);
}
function Ha(e, t) {
  return function(r, n) {
    if (r == null)
      return r;
    if (!jt(r))
      return e(r, n);
    for (var i = r.length, o = t ? i : -1, a = Object(r); (t ? o-- : ++o < i) && n(a[o], o, a) !== false; )
      ;
    return r;
  };
}
var Va = Ha(Ar);
const Pr = Va;
function ri(e) {
  return e;
}
function ni(e) {
  return typeof e == "function" ? e : ri;
}
function Ua(e, t) {
  var r = k(e) ? $o : Pr;
  return r(e, ni(t));
}
var Wa = Array.prototype, za = Wa.reverse;
function Ga(e) {
  return e == null ? e : za.call(e);
}
const sr = ref(1), we = typeof window > "u";
function Ka(e, t) {
  we || window.addEventListener("popstate", Xa.bind(this)), Dr(t), Ft(t.head), jr(e);
  const r = we ? "" : location.href, n = Cr(
    r,
    t.head,
    e,
    {},
    sr.value
  );
  ii(n);
}
function Xa(e) {
  !e.state || (H.value = e.state, ie.value = 0, Ft(H.value.head), jr(H.value.html, H.value.rememberedState.scrollY));
}
function Cr(e, t, r, n, i) {
  const o = {
    url: e,
    head: t,
    html: r,
    rememberedState: n,
    pageVisitId: i
  };
  return H.value = o, o;
}
function Qa(e) {
  we || window.history.pushState(e, "", e.url);
}
function Ya(e) {
  const t = Cr(
    e,
    JSON.parse(JSON.stringify(H.value.head)),
    H.value.html,
    { ...H.value.rememberedState },
    H.value.pageVisitId
  );
  we || window.history.replaceState(t, "", t.url);
}
function ii(e) {
  we || window.history.replaceState(e, "", e.url);
}
const H = ref({}), dn = ref(0);
function Ja(e, t) {
  dn.value++;
  const r = e.request.responseURL;
  e.data.splade.modal && ie.value++, Dr(e.data.splade), Ft(e.data.splade.head);
  const n = r === H.value.url;
  if (n && (t = true), e.data.splade.modal)
    return us(e.data.html, e.data.splade.modal);
  if (e.data.splade.preventRefresh && n)
    return;
  ie.value = 0;
  let i = e.data.html;
  t ? i += `<!-- ${dn.value} -->` : sr.value++, jr(i, 0);
  const o = Cr(
    r,
    e.data.splade.head,
    i,
    H.value.rememberedState ? { ...H.value.rememberedState } : {},
    sr.value
  );
  t ? ii(o) : Qa(o);
}
const ie = ref(0);
function Za() {
  ie.value--, Ft(ts(ie.value));
}
const oi = ref({}), ai = ref({}), si = (e) => ai.value[e], es = (e) => Object.keys(si.value[e]).length > 0, li = ref({}), ts = (e) => li.value[e], ui = ref({}), rs = (e) => ui.value[e], He = ref([]), ns = computed(() => Ga(He.value));
function is(e) {
  He.value.push(e);
}
function os(e) {
  He.value[e].dismissed = true, He.value[e].html = null;
}
const Ir = ref(null);
function as(e, t, r, n) {
  let i, o;
  const a = new Promise((s, l) => {
    i = s, o = l;
  });
  return Ir.value = {
    title: e,
    text: t,
    confirmButton: r,
    cancelButton: n,
    resolvePromise: i,
    rejectPromise: o
  }, a;
}
function ss() {
  Ir.value = null;
}
function Dr(e) {
  oi.value = e.shared ? e.shared : {}, ui.value[ie.value] = e.flash ? e.flash : {}, li.value[ie.value] = e.head ? e.head : {}, Ua(e.toasts ? e.toasts : [], (t) => {
    He.value.push(t);
  }), ai.value[ie.value] = e.errors ? e.errors : {};
}
function ls(e) {
  mi.value(e);
}
function Ft(e) {
  pi.value(e);
}
function jr(e, t) {
  hi.value(e, t);
}
function us(e, t) {
  vi.value(e, t);
}
const ci = ref({});
function fi(e, t, r) {
  ci.value[e] = t, r && cs(e, t);
}
function cs(e, t) {
  let r = JSON.parse(localStorage.getItem("splade") || "{}") || {};
  r[e] = t, localStorage.setItem("splade", JSON.stringify(r));
}
function fs(e, t) {
  return t ? (JSON.parse(localStorage.getItem("splade") || "{}") || {})[e] : ci.value[e];
}
function Ot(e, t) {
  we || document.dispatchEvent(new CustomEvent(`splade:${e}`, { detail: t }));
}
function ft(e, t, r, n, i) {
  we || fi("scrollY", window.scrollY), Ot("request", { url: e, method: t, data: r, headers: n, replace: i });
  const o = zn({
    method: t,
    url: e,
    data: r,
    headers: {
      "X-Splade": true,
      "X-Requested-With": "XMLHttpRequest",
      Accept: "text/html, application/xhtml+xml",
      ...n
    },
    onUploadProgress: (a) => {
      r instanceof FormData && (a.percentage = Math.round(a.loaded / a.total * 100), Ot("request-progress", { url: e, method: t, data: r, headers: n, replace: i, progress: a }));
    }
  });
  return o.then((a) => {
    Ja(a, i), Ot("request-response", { url: e, method: t, data: r, headers: n, replace: i, response: a });
  }).catch((a) => {
    Ot("request-error", { url: e, method: t, data: r, headers: n, replace: i, error: a });
    const s = a.response.data.splade;
    s && Dr(s), a.response.status != 422 && ls(
      a.response.data.html ? a.response.data.html : a.response.data
    );
  }), o;
}
function di(e) {
  return ft(e, "GET", {}, {}, true);
}
function ds(e) {
  return ft(e, "GET", {}, {}, false);
}
function ps(e) {
  return ft(e, "GET", {}, { "X-Splade-Modal": "modal" }, false);
}
function hs(e) {
  return ft(e, "GET", {}, { "X-Splade-Modal": "slideover" }, false);
}
function vs() {
  return di(H.value.url);
}
const pi = ref(() => {
}), hi = ref(() => {
}), vi = ref(() => {
}), mi = ref(() => {
}), m = {
  init: Ka,
  replace: di,
  visit: ds,
  modal: ps,
  slideover: hs,
  refresh: vs,
  request: ft,
  replaceUrlOfCurrentPage: Ya,
  setOnHead(e) {
    pi.value = e;
  },
  setOnHtml(e) {
    hi.value = e;
  },
  setOnModal(e) {
    vi.value = e;
  },
  setOnServerError(e) {
    mi.value = e;
  },
  hasValidationErrors: es,
  validationErrors: si,
  sharedData: oi,
  flashData: rs,
  toasts: He,
  toastsReversed: ns,
  confirmModal: Ir,
  confirm: as,
  clearConfirmModal: ss,
  pushToast: is,
  dismissToast: os,
  restore: fs,
  remember: fi,
  popStack: Za,
  currentStack: ie,
  pageVisitId: computed(() => H.value.pageVisitId),
  isSsr: we
};
function Ne(e, t) {
  return e && Ar(e, ni(t));
}
var ms = "[object String]";
function Jt(e) {
  return typeof e == "string" || !k(e) && be(e) && $e(e) == ms;
}
const rt = {
  __name: "Render",
  props: {
    html: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(e) {
    const t = e, r = ref(null);
    function n() {
      r.value = h({
        template: t.html
      });
    }
    return watch(() => t.html, n, { immediate: true }), (i, o) => (openBlock(), createBlock(unref(r)));
  }
}, gs = {
  __name: "ServerError",
  props: {
    html: {
      type: String,
      required: true
    }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const r = e;
    function n() {
      document.body.style.overflow = "visible", document.removeEventListener("keydown", a), t("close");
    }
    const i = ref(null);
    function o() {
      const s = document.createElement("html");
      s.innerHTML = r.html, s.querySelectorAll("a").forEach((u) => u.setAttribute("target", "_top")), document.body.style.overflow = "hidden";
      const l = i.value;
      if (!l.contentWindow)
        throw new Error("iframe not yet ready.");
      l.contentWindow.document.open(), l.contentWindow.document.write(s.outerHTML), l.contentWindow.document.close(), document.addEventListener("keydown", a);
    }
    function a(s) {
      s.keyCode === 27 && n();
    }
    return onMounted(() => o()), (s, l) => (openBlock(), createElementBlock("div", {
      style: { position: "fixed", top: "0px", right: "0px", bottom: "0px", left: "0px", "z-index": "200000", "box-sizing": "border-box", height: "100vh", width: "100vw", "background-color": "rgb(0 0 0 / 0.75)", padding: "2rem" },
      onClick: n
    }, [
      createElementVNode("iframe", {
        ref_key: "iframeElement",
        ref: i,
        class: "bg-white w-full h-full"
      }, null, 512)
    ]));
  }
}, ys = {
  __name: "SpladeApp",
  props: {
    el: {
      type: [String, Object],
      required: false,
      default: ""
    },
    components: {
      type: String,
      required: false,
      default: (e) => {
        if (!m.isSsr) {
          const t = Jt(e.el) ? document.getElementById(e.el) : e.el;
          return JSON.parse(t.dataset.components) || "";
        }
      }
    },
    initialHtml: {
      type: String,
      required: false,
      default: (e) => {
        if (!m.isSsr) {
          const t = Jt(e.el) ? document.getElementById(e.el) : e.el;
          return JSON.parse(t.dataset.html) || "";
        }
      }
    },
    initialSpladeData: {
      type: Object,
      required: false,
      default: (e) => {
        if (!m.isSsr) {
          const t = Jt(e.el) ? document.getElementById(e.el) : e.el;
          return JSON.parse(t.dataset.splade) || {};
        }
      }
    }
  },
  setup(e) {
    const t = e;
    provide("stack", 0);
    const r = ref(), n = ref([]), i = ref(null), o = computed(() => m.currentStack.value < 1 ? [] : {
      filter: "blur(4px)",
      "transition-property": "filter",
      "transition-duration": "150ms",
      "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)"
    });
    function a() {
      i.value = null;
    }
    function s(f) {
      n[f] = null, m.popStack();
    }
    const l = inject("$spladeOptions") || {};
    function u(f, p) {
      let d = document.querySelector(`meta[${f}="${p}"]`);
      return d || (d = document.createElement("meta"), d[f] = p, document.getElementsByTagName("head")[0].appendChild(d), d);
    }
    function c(f) {
      const p = f.name ? u("name", f.name) : u("property", f.property);
      Ne(f, (d, v) => {
        p[v] = d;
      });
    }
    return m.setOnHead((f) => {
      m.isSsr || (document.title = f.title, f.meta.forEach((p) => {
        c(p);
      }));
    }), m.setOnHtml((f, p) => {
      n.value = [], r.value = f, nextTick(() => {
        m.isSsr || window.scrollTo(0, p), l.transform_anchors && [...document.querySelectorAll("a")].forEach((d) => {
          d.href == "" || d.href.charAt(0) == "#" || d.__vnode.dynamicProps === null && (d.hasAttribute("download") || (d.onclick = function(v) {
            v.preventDefault(), m.visit(d.href);
          }));
        });
      });
    }), m.setOnModal(function(f, p) {
      n.value[m.currentStack.value] = { html: f, type: p };
    }), m.setOnServerError(function(f) {
      i.value = f;
    }), m.init(t.initialHtml, t.initialSpladeData), (f, p) => (openBlock(), createElementBlock("div", null, [
      (openBlock(), createBlock(resolveDynamicComponent(unref(m).isSsr ? "div" : KeepAlive), {
        max: unref(l).max_keep_alive
      }, {
        default: withCtx(() => [
          (openBlock(), createBlock(rt, {
            key: `visit.${unref(m).pageVisitId.value}`,
            style: normalizeStyle(unref(o)),
            html: r.value
          }, null, 8, ["style", "html"]))
        ]),
        _: 1
      }, 8, ["max"])),
      createVNode(rt, { html: e.components }, null, 8, ["html"]),
      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(m).currentStack.value, (d) => (openBlock(), createBlock(rt, {
        key: `modal.${d}`,
        type: n.value[d].type,
        html: n.value[d].html,
        stack: d,
        "on-top-of-stack": unref(m).currentStack.value === d,
        onClose: (v) => s(d)
      }, null, 8, ["type", "html", "stack", "on-top-of-stack", "onClose"]))), 128)),
      i.value ? (openBlock(), createBlock(gs, {
        key: 0,
        html: i.value,
        onClose: a
      }, null, 8, ["html"])) : createCommentVNode("", true)
    ]));
  }
};
function qd(e) {
  return () => h(ys, e);
}
var bs = Object.prototype, ws = bs.hasOwnProperty;
function Os(e, t) {
  return e != null && ws.call(e, t);
}
var Ss = "[object Symbol]";
function Rt(e) {
  return typeof e == "symbol" || be(e) && $e(e) == Ss;
}
var $s = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Es = /^\w*$/;
function Br(e, t) {
  if (k(e))
    return false;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Rt(e) ? true : Es.test(e) || !$s.test(e) || t != null && e in Object(t);
}
var xs = ne["__core-js_shared__"];
const Zt = xs;
var pn = function() {
  var e = /[^.]+$/.exec(Zt && Zt.keys && Zt.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function _s(e) {
  return !!pn && pn in e;
}
var Ts = Function.prototype, As = Ts.toString;
function Fe(e) {
  if (e != null) {
    try {
      return As.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Ps = /[\\^$.*+?()[\]{}|]/g, Cs = /^\[object .+?Constructor\]$/, Is = Function.prototype, Ds = Object.prototype, js = Is.toString, Bs = Ds.hasOwnProperty, Fs = RegExp(
  "^" + js.call(Bs).replace(Ps, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Rs(e) {
  if (!ee(e) || _s(e))
    return false;
  var t = ti(e) ? Fs : Cs;
  return t.test(Fe(e));
}
function Ls(e, t) {
  return e == null ? void 0 : e[t];
}
function Re(e, t) {
  var r = Ls(e, t);
  return Rs(r) ? r : void 0;
}
var qs = Re(Object, "create");
const at = qs;
function Ms() {
  this.__data__ = at ? at(null) : {}, this.size = 0;
}
function ks(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Ns = "__lodash_hash_undefined__", Hs = Object.prototype, Vs = Hs.hasOwnProperty;
function Us(e) {
  var t = this.__data__;
  if (at) {
    var r = t[e];
    return r === Ns ? void 0 : r;
  }
  return Vs.call(t, e) ? t[e] : void 0;
}
var Ws = Object.prototype, zs = Ws.hasOwnProperty;
function Gs(e) {
  var t = this.__data__;
  return at ? t[e] !== void 0 : zs.call(t, e);
}
var Ks = "__lodash_hash_undefined__";
function Xs(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = at && t === void 0 ? Ks : t, this;
}
function De(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
De.prototype.clear = Ms;
De.prototype.delete = ks;
De.prototype.get = Us;
De.prototype.has = Gs;
De.prototype.set = Xs;
function Qs() {
  this.__data__ = [], this.size = 0;
}
function Fr(e, t) {
  return e === t || e !== e && t !== t;
}
function Lt(e, t) {
  for (var r = e.length; r--; )
    if (Fr(e[r][0], t))
      return r;
  return -1;
}
var Ys = Array.prototype, Js = Ys.splice;
function Zs(e) {
  var t = this.__data__, r = Lt(t, e);
  if (r < 0)
    return false;
  var n = t.length - 1;
  return r == n ? t.pop() : Js.call(t, r, 1), --this.size, true;
}
function el(e) {
  var t = this.__data__, r = Lt(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function tl(e) {
  return Lt(this.__data__, e) > -1;
}
function rl(e, t) {
  var r = this.__data__, n = Lt(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function ce(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
ce.prototype.clear = Qs;
ce.prototype.delete = Zs;
ce.prototype.get = el;
ce.prototype.has = tl;
ce.prototype.set = rl;
var nl = Re(ne, "Map");
const st = nl;
function il() {
  this.size = 0, this.__data__ = {
    hash: new De(),
    map: new (st || ce)(),
    string: new De()
  };
}
function ol(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function qt(e, t) {
  var r = e.__data__;
  return ol(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function al(e) {
  var t = qt(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function sl(e) {
  return qt(this, e).get(e);
}
function ll(e) {
  return qt(this, e).has(e);
}
function ul(e, t) {
  var r = qt(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function fe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
fe.prototype.clear = il;
fe.prototype.delete = al;
fe.prototype.get = sl;
fe.prototype.has = ll;
fe.prototype.set = ul;
var cl = "Expected a function";
function Rr(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(cl);
  var r = function() {
    var n = arguments, i = t ? t.apply(this, n) : n[0], o = r.cache;
    if (o.has(i))
      return o.get(i);
    var a = e.apply(this, n);
    return r.cache = o.set(i, a) || o, a;
  };
  return r.cache = new (Rr.Cache || fe)(), r;
}
Rr.Cache = fe;
var fl = 500;
function dl(e) {
  var t = Rr(e, function(n) {
    return r.size === fl && r.clear(), n;
  }), r = t.cache;
  return t;
}
var pl = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, hl = /\\(\\)?/g, vl = dl(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(pl, function(r, n, i, o) {
    t.push(i ? o.replace(hl, "$1") : n || r);
  }), t;
});
const ml = vl;
function gi(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
    i[r] = t(e[r], r, e);
  return i;
}
var gl = 1 / 0, hn = ye ? ye.prototype : void 0, vn = hn ? hn.toString : void 0;
function Mt(e) {
  if (typeof e == "string")
    return e;
  if (k(e))
    return gi(e, Mt) + "";
  if (Rt(e))
    return vn ? vn.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -gl ? "-0" : t;
}
function Lr(e) {
  return e == null ? "" : Mt(e);
}
function qr(e, t) {
  return k(e) ? e : Br(e, t) ? [e] : ml(Lr(e));
}
var yl = 1 / 0;
function dt(e) {
  if (typeof e == "string" || Rt(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -yl ? "-0" : t;
}
function yi(e, t, r) {
  t = qr(t, e);
  for (var n = -1, i = t.length, o = false; ++n < i; ) {
    var a = dt(t[n]);
    if (!(o = e != null && r(e, a)))
      break;
    e = e[a];
  }
  return o || ++n != i ? o : (i = e == null ? 0 : e.length, !!i && Tr(i) && _r(a, i) && (k(e) || Yn(e)));
}
function G(e, t) {
  return e != null && yi(e, t, Os);
}
function K(e, t, ...r) {
  if (e in t) {
    let i = t[e];
    return typeof i == "function" ? i(...r) : i;
  }
  let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((i) => `"${i}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(n, K), n;
}
var Pt = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Pt || {}), me = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(me || {});
function U({ visible: e = true, features: t = 0, ourProps: r, theirProps: n, ...i }) {
  var o;
  let a = bl(n, r), s = Object.assign(i, { props: a });
  if (e || t & 2 && a.static)
    return er(s);
  if (t & 1) {
    let l = (o = a.unmount) == null || o ? 0 : 1;
    return K(l, { [0]() {
      return null;
    }, [1]() {
      return er({ ...i, props: { ...a, hidden: true, style: { display: "none" } } });
    } });
  }
  return er(s);
}
function er({ props: e, attrs: t, slots: r, slot: n, name: i }) {
  var o;
  let { as: a, ...s } = wi(e, ["unmount", "static"]), l = (o = r.default) == null ? void 0 : o.call(r, n), u = {};
  if (n) {
    let c = false, f = [];
    for (let [p, d] of Object.entries(n))
      typeof d == "boolean" && (c = true), d === true && f.push(p);
    c && (u["data-headlessui-state"] = f.join(" "));
  }
  if (a === "template") {
    if (l = bi(l), Object.keys(s).length > 0 || Object.keys(t).length > 0) {
      let [c, ...f] = l != null ? l : [];
      if (!wl(c) || f.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${i} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(s).concat(Object.keys(t)).sort((p, d) => p.localeCompare(d)).map((p) => `  - ${p}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((p) => `  - ${p}`).join(`
`)].join(`
`));
      return cloneVNode(c, Object.assign({}, s, u));
    }
    return Array.isArray(l) && l.length === 1 ? l[0] : l;
  }
  return h(a, Object.assign({}, s, u), l);
}
function bi(e) {
  return e.flatMap((t) => t.type === Fragment ? bi(t.children) : [t]);
}
function bl(...e) {
  if (e.length === 0)
    return {};
  if (e.length === 1)
    return e[0];
  let t = {}, r = {};
  for (let n of e)
    for (let i in n)
      i.startsWith("on") && typeof n[i] == "function" ? (r[i] != null || (r[i] = []), r[i].push(n[i])) : t[i] = n[i];
  if (t.disabled || t["aria-disabled"])
    return Object.assign(t, Object.fromEntries(Object.keys(r).map((n) => [n, void 0])));
  for (let n in r)
    Object.assign(t, { [n](i, ...o) {
      let a = r[n];
      for (let s of a) {
        if (i instanceof Event && i.defaultPrevented)
          return;
        s(i, ...o);
      }
    } });
  return t;
}
function wi(e, t = []) {
  let r = Object.assign({}, e);
  for (let n of t)
    n in r && delete r[n];
  return r;
}
function wl(e) {
  return e == null ? false : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
let Ol = 0;
function Sl() {
  return ++Ol;
}
function Le() {
  return Sl();
}
var Oi = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Oi || {});
function ue(e) {
  var t;
  return e == null || e.value == null ? null : (t = e.value.$el) != null ? t : e.value;
}
let Si = Symbol("Context");
var je = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(je || {});
function $l() {
  return Mr() !== null;
}
function Mr() {
  return inject(Si, null);
}
function El(e) {
  provide(Si, e);
}
const kt = typeof window > "u" || typeof document > "u";
function Ge(e) {
  if (kt)
    return null;
  if (e instanceof Node)
    return e.ownerDocument;
  if (e != null && e.hasOwnProperty("value")) {
    let t = ue(e);
    if (t)
      return t.ownerDocument;
  }
  return document;
}
let lr = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var lt = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(lt || {}), $i = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))($i || {}), xl = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(xl || {});
function _l(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(lr));
}
var Ei = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Ei || {});
function Tl(e, t = 0) {
  var r;
  return e === ((r = Ge(e)) == null ? void 0 : r.body) ? false : K(t, { [0]() {
    return e.matches(lr);
  }, [1]() {
    let n = e;
    for (; n !== null; ) {
      if (n.matches(lr))
        return true;
      n = n.parentElement;
    }
    return false;
  } });
}
function nt(e) {
  e == null || e.focus({ preventScroll: true });
}
let Al = ["textarea", "input"].join(",");
function Pl(e) {
  var t, r;
  return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Al)) != null ? r : false;
}
function Cl(e, t = (r) => r) {
  return e.slice().sort((r, n) => {
    let i = t(r), o = t(n);
    if (i === null || o === null)
      return 0;
    let a = i.compareDocumentPosition(o);
    return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function ur(e, t, r = true, n = null) {
  var i;
  let o = (i = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e == null ? void 0 : e.ownerDocument) != null ? i : document, a = Array.isArray(e) ? r ? Cl(e) : e : _l(e);
  n = n != null ? n : o.activeElement;
  let s = (() => {
    if (t & 5)
      return 1;
    if (t & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), l = (() => {
    if (t & 1)
      return 0;
    if (t & 2)
      return Math.max(0, a.indexOf(n)) - 1;
    if (t & 4)
      return Math.max(0, a.indexOf(n)) + 1;
    if (t & 8)
      return a.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), u = t & 32 ? { preventScroll: true } : {}, c = 0, f = a.length, p;
  do {
    if (c >= f || c + f <= 0)
      return 0;
    let d = l + c;
    if (t & 16)
      d = (d + f) % f;
    else {
      if (d < 0)
        return 3;
      if (d >= f)
        return 1;
    }
    p = a[d], p == null || p.focus(u), c += s;
  } while (p !== o.activeElement);
  return t & 6 && Pl(p) && p.select(), p.hasAttribute("tabindex") || p.setAttribute("tabindex", "0"), 2;
}
function tr(e, t, r) {
  kt || watchEffect((n) => {
    document.addEventListener(e, t, r), n(() => document.removeEventListener(e, t, r));
  });
}
function Il(e, t, r = computed(() => true)) {
  function n(o, a) {
    if (!r.value || o.defaultPrevented)
      return;
    let s = a(o);
    if (s === null || !s.ownerDocument.documentElement.contains(s))
      return;
    let l = function u(c) {
      return typeof c == "function" ? u(c()) : Array.isArray(c) || c instanceof Set ? c : [c];
    }(e);
    for (let u of l) {
      if (u === null)
        continue;
      let c = u instanceof HTMLElement ? u : ue(u);
      if (c != null && c.contains(s))
        return;
    }
    return !Tl(s, Ei.Loose) && s.tabIndex !== -1 && o.preventDefault(), t(o, s);
  }
  let i = ref(null);
  tr("mousedown", (o) => {
    r.value && (i.value = o.target);
  }, true), tr("click", (o) => {
    !i.value || (n(o, () => i.value), i.value = null);
  }, true), tr("blur", (o) => n(o, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), true);
}
var Ct = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(Ct || {});
let cr = defineComponent({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(e, { slots: t, attrs: r }) {
  return () => {
    let { features: n, ...i } = e, o = { "aria-hidden": (n & 2) === 2 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(n & 4) === 4 && (n & 2) !== 2 && { display: "none" } } };
    return U({ ourProps: o, theirProps: i, slot: {}, attrs: r, slots: t, name: "Hidden" });
  };
} });
function Dl(e, t, r) {
  kt || watchEffect((n) => {
    window.addEventListener(e, t, r), n(() => window.removeEventListener(e, t, r));
  });
}
var fr = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(fr || {});
function jl() {
  let e = ref(0);
  return Dl("keydown", (t) => {
    t.key === "Tab" && (e.value = t.shiftKey ? 1 : 0);
  }), e;
}
function xi(e, t, r, n) {
  kt || watchEffect((i) => {
    e = e != null ? e : window, e.addEventListener(t, r, n), i(() => e.removeEventListener(t, r, n));
  });
}
function Bl(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
var _i = ((e) => (e[e.None = 1] = "None", e[e.InitialFocus = 2] = "InitialFocus", e[e.TabLock = 4] = "TabLock", e[e.FocusLock = 8] = "FocusLock", e[e.RestoreFocus = 16] = "RestoreFocus", e[e.All = 30] = "All", e))(_i || {});
let Ze = Object.assign(defineComponent({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null }, features: { type: Number, default: 30 }, containers: { type: Object, default: ref(/* @__PURE__ */ new Set()) } }, inheritAttrs: false, setup(e, { attrs: t, slots: r, expose: n }) {
  let i = ref(null);
  n({ el: i, $el: i });
  let o = computed(() => Ge(i));
  Fl({ ownerDocument: o }, computed(() => Boolean(e.features & 16)));
  let a = Rl({ ownerDocument: o, container: i, initialFocus: computed(() => e.initialFocus) }, computed(() => Boolean(e.features & 2)));
  Ll({ ownerDocument: o, container: i, containers: e.containers, previousActiveElement: a }, computed(() => Boolean(e.features & 8)));
  let s = jl();
  function l() {
    let u = ue(i);
    !u || K(s.value, { [fr.Forwards]: () => ur(u, lt.First), [fr.Backwards]: () => ur(u, lt.Last) });
  }
  return () => {
    let u = {}, c = { ref: i }, { features: f, initialFocus: p, containers: d, ...v } = e;
    return h(Fragment, [Boolean(f & 4) && h(cr, { as: "button", type: "button", onFocus: l, features: Ct.Focusable }), U({ ourProps: c, theirProps: { ...t, ...v }, slot: u, attrs: t, slots: r, name: "FocusTrap" }), Boolean(f & 4) && h(cr, { as: "button", type: "button", onFocus: l, features: Ct.Focusable })]);
  };
} }), { features: _i });
function Fl({ ownerDocument: e }, t) {
  let r = ref(null);
  function n() {
    var o;
    r.value || (r.value = (o = e.value) == null ? void 0 : o.activeElement);
  }
  function i() {
    !r.value || (nt(r.value), r.value = null);
  }
  onMounted(() => {
    watch(t, (o, a) => {
      o !== a && (o ? n() : i());
    }, { immediate: true });
  }), onUnmounted(i);
}
function Rl({ ownerDocument: e, container: t, initialFocus: r }, n) {
  let i = ref(null), o = ref(false);
  return onMounted(() => o.value = true), onUnmounted(() => o.value = false), onMounted(() => {
    watch([t, r, n], (a, s) => {
      if (a.every((u, c) => (s == null ? void 0 : s[c]) === u) || !n.value)
        return;
      let l = ue(t);
      !l || Bl(() => {
        var u, c;
        if (!o.value)
          return;
        let f = ue(r), p = (u = e.value) == null ? void 0 : u.activeElement;
        if (f) {
          if (f === p) {
            i.value = p;
            return;
          }
        } else if (l.contains(p)) {
          i.value = p;
          return;
        }
        f ? nt(f) : ur(l, lt.First | lt.NoScroll) === $i.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), i.value = (c = e.value) == null ? void 0 : c.activeElement;
      });
    }, { immediate: true, flush: "post" });
  }), i;
}
function Ll({ ownerDocument: e, container: t, containers: r, previousActiveElement: n }, i) {
  var o;
  xi((o = e.value) == null ? void 0 : o.defaultView, "focus", (a) => {
    if (!i.value)
      return;
    let s = new Set(r == null ? void 0 : r.value);
    s.add(t);
    let l = n.value;
    if (!l)
      return;
    let u = a.target;
    u && u instanceof HTMLElement ? ql(s, u) ? (n.value = u, nt(u)) : (a.preventDefault(), a.stopPropagation(), nt(l)) : nt(n.value);
  }, true);
}
function ql(e, t) {
  var r;
  for (let n of e)
    if ((r = n.value) != null && r.contains(t))
      return true;
  return false;
}
let mn = "body > *", Me = /* @__PURE__ */ new Set(), he = /* @__PURE__ */ new Map();
function gn(e) {
  e.setAttribute("aria-hidden", "true"), e.inert = true;
}
function yn(e) {
  let t = he.get(e);
  !t || (t["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", t["aria-hidden"]), e.inert = t.inert);
}
function Ml(e, t = ref(true)) {
  watchEffect((r) => {
    if (!t.value || !e.value)
      return;
    let n = e.value, i = Ge(n);
    if (i) {
      Me.add(n);
      for (let o of he.keys())
        o.contains(n) && (yn(o), he.delete(o));
      i.querySelectorAll(mn).forEach((o) => {
        if (o instanceof HTMLElement) {
          for (let a of Me)
            if (o.contains(a))
              return;
          Me.size === 1 && (he.set(o, { "aria-hidden": o.getAttribute("aria-hidden"), inert: o.inert }), gn(o));
        }
      }), r(() => {
        if (Me.delete(n), Me.size > 0)
          i.querySelectorAll(mn).forEach((o) => {
            if (o instanceof HTMLElement && !he.has(o)) {
              for (let a of Me)
                if (o.contains(a))
                  return;
              he.set(o, { "aria-hidden": o.getAttribute("aria-hidden"), inert: o.inert }), gn(o);
            }
          });
        else
          for (let o of he.keys())
            yn(o), he.delete(o);
      });
    }
  });
}
let Ti = Symbol("ForcePortalRootContext");
function kl() {
  return inject(Ti, false);
}
let dr = defineComponent({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: false } }, setup(e, { slots: t, attrs: r }) {
  return provide(Ti, e.force), () => {
    let { force: n, ...i } = e;
    return U({ theirProps: i, ourProps: {}, slot: {}, slots: t, attrs: r, name: "ForcePortalRoot" });
  };
} });
function Nl(e) {
  let t = Ge(e);
  if (!t) {
    if (e === null)
      return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`);
  }
  let r = t.getElementById("headlessui-portal-root");
  if (r)
    return r;
  let n = t.createElement("div");
  return n.setAttribute("id", "headlessui-portal-root"), t.body.appendChild(n);
}
let Ai = defineComponent({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(e, { slots: t, attrs: r }) {
  let n = ref(null), i = computed(() => Ge(n)), o = kl(), a = inject(Pi, null), s = ref(o === true || a == null ? Nl(n.value) : a.resolveTarget());
  return watchEffect(() => {
    o || a != null && (s.value = a.resolveTarget());
  }), onUnmounted(() => {
    var l, u;
    let c = (l = i.value) == null ? void 0 : l.getElementById("headlessui-portal-root");
    !c || s.value === c && s.value.children.length <= 0 && ((u = s.value.parentElement) == null || u.removeChild(s.value));
  }), () => {
    if (s.value === null)
      return null;
    let l = { ref: n, "data-headlessui-portal": "" };
    return h(Teleport, { to: s.value }, U({ ourProps: l, theirProps: e, slot: {}, attrs: r, slots: t, name: "Portal" }));
  };
} }), Pi = Symbol("PortalGroupContext"), Hl = defineComponent({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(e, { attrs: t, slots: r }) {
  let n = reactive({ resolveTarget() {
    return e.target;
  } });
  return provide(Pi, n), () => {
    let { target: i, ...o } = e;
    return U({ theirProps: o, ourProps: {}, slot: {}, attrs: t, slots: r, name: "PortalGroup" });
  };
} }), Ci = Symbol("StackContext");
var pr = ((e) => (e[e.Add = 0] = "Add", e[e.Remove = 1] = "Remove", e))(pr || {});
function Vl() {
  return inject(Ci, () => {
  });
}
function Ul({ type: e, enabled: t, element: r, onUpdate: n }) {
  let i = Vl();
  function o(...a) {
    n == null || n(...a), i(...a);
  }
  onMounted(() => {
    watch(t, (a, s) => {
      a ? o(0, e, r) : s === true && o(1, e, r);
    }, { immediate: true, flush: "sync" });
  }), onUnmounted(() => {
    t.value && o(1, e, r);
  }), provide(Ci, o);
}
let Ii = Symbol("DescriptionContext");
function Wl() {
  let e = inject(Ii, null);
  if (e === null)
    throw new Error("Missing parent");
  return e;
}
function zl({ slot: e = ref({}), name: t = "Description", props: r = {} } = {}) {
  let n = ref([]);
  function i(o) {
    return n.value.push(o), () => {
      let a = n.value.indexOf(o);
      a !== -1 && n.value.splice(a, 1);
    };
  }
  return provide(Ii, { register: i, slot: e, name: t, props: r }), computed(() => n.value.length > 0 ? n.value.join(" ") : void 0);
}
defineComponent({ name: "Description", props: { as: { type: [Object, String], default: "p" } }, setup(e, { attrs: t, slots: r }) {
  let n = Wl(), i = `headlessui-description-${Le()}`;
  return onMounted(() => onUnmounted(n.register(i))), () => {
    let { name: o = "Description", slot: a = ref({}), props: s = {} } = n, l = e, u = { ...Object.entries(s).reduce((c, [f, p]) => Object.assign(c, { [f]: unref(p) }), {}), id: i };
    return U({ ourProps: u, theirProps: l, slot: a.value, attrs: t, slots: r, name: o });
  };
} });
function kr() {
  let e = [], t = [], r = { enqueue(n) {
    t.push(n);
  }, addEventListener(n, i, o, a) {
    return n.addEventListener(i, o, a), r.add(() => n.removeEventListener(i, o, a));
  }, requestAnimationFrame(...n) {
    let i = requestAnimationFrame(...n);
    r.add(() => cancelAnimationFrame(i));
  }, nextFrame(...n) {
    r.requestAnimationFrame(() => {
      r.requestAnimationFrame(...n);
    });
  }, setTimeout(...n) {
    let i = setTimeout(...n);
    r.add(() => clearTimeout(i));
  }, add(n) {
    e.push(n);
  }, dispose() {
    for (let n of e.splice(0))
      n();
  }, async workQueue() {
    for (let n of t.splice(0))
      await n();
  } };
  return r;
}
function Gl() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
var Kl = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Kl || {});
let hr = Symbol("DialogContext");
function pt(e) {
  let t = inject(hr, null);
  if (t === null) {
    let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, pt), r;
  }
  return t;
}
let St = "DC8F892D-2EBD-447C-A4C8-A03058436FF4", Di = defineComponent({ name: "Dialog", inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, open: { type: [Boolean, String], default: St }, initialFocus: { type: Object, default: null } }, emits: { close: (e) => true }, setup(e, { emit: t, attrs: r, slots: n, expose: i }) {
  var o;
  let a = ref(false);
  onMounted(() => {
    a.value = true;
  });
  let s = ref(0), l = Mr(), u = computed(() => e.open === St && l !== null ? K(l.value, { [je.Open]: true, [je.Closed]: false }) : e.open), c = ref(/* @__PURE__ */ new Set()), f = ref(null), p = ref(null), d = computed(() => Ge(f));
  if (i({ el: f, $el: f }), !(e.open !== St || l !== null))
    throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
  if (typeof u.value != "boolean")
    throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${u.value === St ? void 0 : e.open}`);
  let v = computed(() => a.value && u.value ? 0 : 1), b = computed(() => v.value === 0), w = computed(() => s.value > 1), T = inject(hr, null) !== null, A = computed(() => w.value ? "parent" : "leaf");
  Ml(f, computed(() => w.value ? b.value : false)), Ul({ type: "Dialog", enabled: computed(() => v.value === 0), element: f, onUpdate: (g, O, x) => {
    if (O === "Dialog")
      return K(g, { [pr.Add]() {
        c.value.add(x), s.value += 1;
      }, [pr.Remove]() {
        c.value.delete(x), s.value -= 1;
      } });
  } });
  let P = zl({ name: "DialogDescription", slot: computed(() => ({ open: u.value })) }), E = `headlessui-dialog-${Le()}`, S = ref(null), h$1 = { titleId: S, panelRef: ref(null), dialogState: v, setTitleId(g) {
    S.value !== g && (S.value = g);
  }, close() {
    t("close", false);
  } };
  return provide(hr, h$1), Il(() => {
    var g, O, x;
    return [...Array.from((O = (g = d.value) == null ? void 0 : g.querySelectorAll("body > *, [data-headlessui-portal]")) != null ? O : []).filter((_) => !(!(_ instanceof HTMLElement) || _.contains(ue(p)) || h$1.panelRef.value && _.contains(h$1.panelRef.value))), (x = h$1.panelRef.value) != null ? x : f.value];
  }, (g, O) => {
    h$1.close(), nextTick(() => O == null ? void 0 : O.focus());
  }, computed(() => v.value === 0 && !w.value)), xi((o = d.value) == null ? void 0 : o.defaultView, "keydown", (g) => {
    g.defaultPrevented || g.key === Oi.Escape && v.value === 0 && (w.value || (g.preventDefault(), g.stopPropagation(), h$1.close()));
  }), watchEffect((g) => {
    var O;
    if (v.value !== 0 || T)
      return;
    let x = d.value;
    if (!x)
      return;
    let _ = kr();
    function $(B, N, R) {
      let L = B.style.getPropertyValue(N);
      return Object.assign(B.style, { [N]: R }), _.add(() => {
        Object.assign(B.style, { [N]: L });
      });
    }
    let C = x == null ? void 0 : x.documentElement, j = ((O = x.defaultView) != null ? O : window).innerWidth - C.clientWidth;
    if ($(C, "overflow", "hidden"), j > 0) {
      let B = C.clientWidth - C.offsetWidth, N = j - B;
      $(C, "paddingRight", `${N}px`);
    }
    if (Gl()) {
      let B = window.pageYOffset;
      $(C, "position", "fixed"), $(C, "marginTop", `-${B}px`), $(C, "width", "100%"), _.add(() => window.scrollTo(0, B));
    }
    g(_.dispose);
  }), watchEffect((g) => {
    if (v.value !== 0)
      return;
    let O = ue(f);
    if (!O)
      return;
    let x = new IntersectionObserver((_) => {
      for (let $ of _)
        $.boundingClientRect.x === 0 && $.boundingClientRect.y === 0 && $.boundingClientRect.width === 0 && $.boundingClientRect.height === 0 && h$1.close();
    });
    x.observe(O), g(() => x.disconnect());
  }), () => {
    let g = { ...r, ref: f, id: E, role: "dialog", "aria-modal": v.value === 0 ? true : void 0, "aria-labelledby": S.value, "aria-describedby": P.value }, { open: O, initialFocus: x, ..._ } = e, $ = { open: v.value === 0 };
    return h(dr, { force: true }, () => [h(Ai, () => h(Hl, { target: f.value }, () => h(dr, { force: false }, () => h(Ze, { initialFocus: x, containers: c, features: b.value ? K(A.value, { parent: Ze.features.RestoreFocus, leaf: Ze.features.All & ~Ze.features.FocusLock }) : Ze.features.None }, () => U({ ourProps: g, theirProps: _, slot: $, attrs: r, slots: n, visible: v.value === 0, features: Pt.RenderStrategy | Pt.Static, name: "Dialog" }))))), h(cr, { features: Ct.Hidden, ref: p })]);
  };
} });
defineComponent({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" } }, setup(e, { attrs: t, slots: r }) {
  let n = pt("DialogOverlay"), i = `headlessui-dialog-overlay-${Le()}`;
  function o(a) {
    a.target === a.currentTarget && (a.preventDefault(), a.stopPropagation(), n.close());
  }
  return () => U({ ourProps: { id: i, "aria-hidden": true, onClick: o }, theirProps: e, slot: { open: n.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogOverlay" });
} });
defineComponent({ name: "DialogBackdrop", props: { as: { type: [Object, String], default: "div" } }, inheritAttrs: false, setup(e, { attrs: t, slots: r, expose: n }) {
  let i = pt("DialogBackdrop"), o = `headlessui-dialog-backdrop-${Le()}`, a = ref(null);
  return n({ el: a, $el: a }), onMounted(() => {
    if (i.panelRef.value === null)
      throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.");
  }), () => {
    let s = e, l = { id: o, ref: a, "aria-hidden": true };
    return h(dr, { force: true }, () => h(Ai, () => U({ ourProps: l, theirProps: { ...t, ...s }, slot: { open: i.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogBackdrop" })));
  };
} });
let ji = defineComponent({ name: "DialogPanel", props: { as: { type: [Object, String], default: "div" } }, setup(e, { attrs: t, slots: r, expose: n }) {
  let i = pt("DialogPanel"), o = `headlessui-dialog-panel-${Le()}`;
  n({ el: i.panelRef, $el: i.panelRef });
  function a(s) {
    s.stopPropagation();
  }
  return () => {
    let s = { id: o, ref: i.panelRef, onClick: a };
    return U({ ourProps: s, theirProps: e, slot: { open: i.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogPanel" });
  };
} });
defineComponent({ name: "DialogTitle", props: { as: { type: [Object, String], default: "h2" } }, setup(e, { attrs: t, slots: r }) {
  let n = pt("DialogTitle"), i = `headlessui-dialog-title-${Le()}`;
  return onMounted(() => {
    n.setTitleId(i), onUnmounted(() => n.setTitleId(null));
  }), () => U({ ourProps: { id: i }, theirProps: e, slot: { open: n.dialogState.value === 0 }, attrs: t, slots: r, name: "DialogTitle" });
} });
function Xl(e) {
  let t = { called: false };
  return (...r) => {
    if (!t.called)
      return t.called = true, e(...r);
  };
}
function rr(e, ...t) {
  e && t.length > 0 && e.classList.add(...t);
}
function $t(e, ...t) {
  e && t.length > 0 && e.classList.remove(...t);
}
var vr = ((e) => (e.Finished = "finished", e.Cancelled = "cancelled", e))(vr || {});
function Ql(e, t) {
  let r = kr();
  if (!e)
    return r.dispose;
  let { transitionDuration: n, transitionDelay: i } = getComputedStyle(e), [o, a] = [n, i].map((s) => {
    let [l = 0] = s.split(",").filter(Boolean).map((u) => u.includes("ms") ? parseFloat(u) : parseFloat(u) * 1e3).sort((u, c) => c - u);
    return l;
  });
  return o !== 0 ? r.setTimeout(() => t("finished"), o + a) : t("finished"), r.add(() => t("cancelled")), r.dispose;
}
function bn(e, t, r, n, i, o) {
  let a = kr(), s = o !== void 0 ? Xl(o) : () => {
  };
  return $t(e, ...i), rr(e, ...t, ...r), a.nextFrame(() => {
    $t(e, ...r), rr(e, ...n), a.add(Ql(e, (l) => ($t(e, ...n, ...t), rr(e, ...i), s(l))));
  }), a.add(() => $t(e, ...t, ...r, ...n, ...i)), a.add(() => s("cancelled")), a.dispose;
}
function Ae(e = "") {
  return e.split(" ").filter((t) => t.trim().length > 1);
}
let Nr = Symbol("TransitionContext");
var Yl = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Yl || {});
function Jl() {
  return inject(Nr, null) !== null;
}
function Zl() {
  let e = inject(Nr, null);
  if (e === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
function eu() {
  let e = inject(Hr, null);
  if (e === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
let Hr = Symbol("NestingContext");
function Nt(e) {
  return "children" in e ? Nt(e.children) : e.value.filter(({ state: t }) => t === "visible").length > 0;
}
function Bi(e) {
  let t = ref([]), r = ref(false);
  onMounted(() => r.value = true), onUnmounted(() => r.value = false);
  function n(o, a = me.Hidden) {
    let s = t.value.findIndex(({ id: l }) => l === o);
    s !== -1 && (K(a, { [me.Unmount]() {
      t.value.splice(s, 1);
    }, [me.Hidden]() {
      t.value[s].state = "hidden";
    } }), !Nt(t) && r.value && (e == null || e()));
  }
  function i(o) {
    let a = t.value.find(({ id: s }) => s === o);
    return a ? a.state !== "visible" && (a.state = "visible") : t.value.push({ id: o, state: "visible" }), () => n(o, me.Unmount);
  }
  return { children: t, register: i, unregister: n };
}
let Fi = Pt.RenderStrategy, Ke = defineComponent({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e, { emit: t, attrs: r, slots: n, expose: i }) {
  if (!Jl() && $l())
    return () => h(Xe, { ...e, onBeforeEnter: () => t("beforeEnter"), onAfterEnter: () => t("afterEnter"), onBeforeLeave: () => t("beforeLeave"), onAfterLeave: () => t("afterLeave") }, n);
  let o = ref(null), a = ref("visible"), s = computed(() => e.unmount ? me.Unmount : me.Hidden);
  i({ el: o, $el: o });
  let { show: l, appear: u } = Zl(), { register: c, unregister: f } = eu(), p = { value: true }, d = Le(), v = { value: false }, b = Bi(() => {
    v.value || (a.value = "hidden", f(d), t("afterLeave"));
  });
  onMounted(() => {
    let O = c(d);
    onUnmounted(O);
  }), watchEffect(() => {
    if (s.value === me.Hidden && !!d) {
      if (l && a.value !== "visible") {
        a.value = "visible";
        return;
      }
      K(a.value, { hidden: () => f(d), visible: () => c(d) });
    }
  });
  let w = Ae(e.enter), T = Ae(e.enterFrom), A = Ae(e.enterTo), P = Ae(e.entered), E = Ae(e.leave), S = Ae(e.leaveFrom), h$1 = Ae(e.leaveTo);
  onMounted(() => {
    watchEffect(() => {
      if (a.value === "visible") {
        let O = ue(o);
        if (O instanceof Comment && O.data === "")
          throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function g(O) {
    let x = p.value && !u.value, _ = ue(o);
    !_ || !(_ instanceof HTMLElement) || x || (v.value = true, l.value && t("beforeEnter"), l.value || t("beforeLeave"), O(l.value ? bn(_, w, T, A, P, ($) => {
      v.value = false, $ === vr.Finished && t("afterEnter");
    }) : bn(_, E, S, h$1, P, ($) => {
      v.value = false, $ === vr.Finished && (Nt(b) || (a.value = "hidden", f(d), t("afterLeave")));
    })));
  }
  return onMounted(() => {
    watch([l], (O, x, _) => {
      g(_), p.value = false;
    }, { immediate: true });
  }), provide(Hr, b), El(computed(() => K(a.value, { visible: je.Open, hidden: je.Closed }))), () => {
    let { appear: O, show: x, enter: _, enterFrom: $, enterTo: C, entered: j, leave: B, leaveFrom: N, leaveTo: R, ...L } = e;
    return U({ theirProps: L, ourProps: { ref: o }, slot: {}, slots: n, attrs: r, features: Fi, visible: a.value === "visible", name: "TransitionChild" });
  };
} }), tu = Ke, Xe = defineComponent({ inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e, { emit: t, attrs: r, slots: n }) {
  let i = Mr(), o = computed(() => e.show === null && i !== null ? K(i.value, { [je.Open]: true, [je.Closed]: false }) : e.show);
  watchEffect(() => {
    if (![true, false].includes(o.value))
      throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let a = ref(o.value ? "visible" : "hidden"), s = Bi(() => {
    a.value = "hidden";
  }), l = ref(true), u = { show: o, appear: computed(() => e.appear || !l.value) };
  return onMounted(() => {
    watchEffect(() => {
      l.value = false, o.value ? a.value = "visible" : Nt(s) || (a.value = "hidden");
    });
  }), provide(Hr, s), provide(Nr, u), () => {
    let c = wi(e, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), f = { unmount: e.unmount };
    return U({ ourProps: { ...f, as: "template" }, theirProps: {}, slot: {}, slots: { ...n, default: () => [h(tu, { onBeforeEnter: () => t("beforeEnter"), onAfterEnter: () => t("afterEnter"), onBeforeLeave: () => t("beforeLeave"), onAfterLeave: () => t("afterLeave"), ...r, ...f, ...c }, n.default)] }, attrs: {}, features: Fi, visible: a.value === "visible", name: "Transition" });
  };
} });
const ru = {
  props: {
    defaultTitle: {
      type: String,
      required: false,
      default: ""
    },
    defaultText: {
      type: String,
      required: false,
      default: ""
    },
    defaultConfirmButton: {
      type: String,
      required: false,
      default: ""
    },
    defaultCancelButton: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    hasConfirmModal: () => !!m.confirmModal.value,
    title: function() {
      var e;
      return (e = m.confirmModal.value) != null && e.title ? m.confirmModal.value.title : this.defaultTitle;
    },
    text: function() {
      var e;
      return (e = m.confirmModal.value) != null && e.text ? m.confirmModal.value.text : this.defaultText;
    },
    confirmButton: function() {
      var e;
      return (e = m.confirmModal.value) != null && e.confirmButton ? m.confirmModal.value.confirmButton : this.defaultConfirmButton;
    },
    cancelButton: function() {
      var e;
      return (e = m.confirmModal.value) != null && e.cancelButton ? m.confirmModal.value.cancelButton : this.defaultCancelButton;
    }
  },
  watch: {
    hasConfirmModal(e) {
      e && (this.isOpen = true);
    }
  },
  methods: {
    cancel() {
      m.confirmModal.value.rejectPromise(), this.setIsOpen(false);
    },
    confirm() {
      m.confirmModal.value.resolvePromise(), this.setIsOpen(false);
    },
    setIsOpen(e) {
      this.isOpen = e;
    },
    emitClose() {
      m.clearConfirmModal();
    }
  },
  render() {
    return this.$slots.default({
      title: this.title,
      text: this.text,
      confirmButton: this.confirmButton,
      cancelButton: this.cancelButton,
      isOpen: this.isOpen,
      setIsOpen: this.setIsOpen,
      cancel: this.cancel,
      confirm: this.confirm,
      emitClose: this.emitClose,
      Dialog: Di,
      DialogPanel: ji,
      TransitionRoot: Xe,
      TransitionChild: Ke
    });
  }
};
function Ri(e, t) {
  t = qr(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[dt(t[r++])];
  return r && r == n ? e : void 0;
}
function Vr(e, t, r) {
  var n = e == null ? void 0 : Ri(e, t);
  return n === void 0 ? r : n;
}
var nu = function() {
  try {
    var e = Re(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const wn = nu;
function Li(e, t, r) {
  t == "__proto__" && wn ? wn(e, t, {
    configurable: true,
    enumerable: true,
    value: r,
    writable: true
  }) : e[t] = r;
}
var iu = Object.prototype, ou = iu.hasOwnProperty;
function au(e, t, r) {
  var n = e[t];
  (!(ou.call(e, t) && Fr(n, r)) || r === void 0 && !(t in e)) && Li(e, t, r);
}
function su(e, t, r, n) {
  if (!ee(e))
    return e;
  t = qr(t, e);
  for (var i = -1, o = t.length, a = o - 1, s = e; s != null && ++i < o; ) {
    var l = dt(t[i]), u = r;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (i != a) {
      var c = s[l];
      u = n ? n(c, l, s) : void 0, u === void 0 && (u = ee(c) ? c : _r(t[i + 1]) ? [] : {});
    }
    au(s, l, u), s = s[l];
  }
  return e;
}
function qi(e, t, r) {
  return e == null ? e : su(e, t, r);
}
const lu = {
  props: {
    default: {
      type: Object,
      default: () => ({}),
      required: false
    },
    remember: {
      type: String,
      default: null,
      required: false
    },
    localStorage: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      values: {}
    };
  },
  mounted() {
    if (this.remember) {
      let e = m.restore(this.remember, this.localStorage);
      e || (e = {}), this.values = Object.assign({}, { ...this.default, ...e });
    } else
      this.values = Object.assign({}, { ...this.default });
  },
  updated() {
    this.remember && m.remember(this.remember, { ...this.values }, this.localStorage);
  },
  render() {
    const e = this;
    return this.$slots.default(
      new Proxy(this.values, {
        ownKeys() {
          return Object.keys(e.values);
        },
        get(t, r) {
          return Vr(e.values, r);
        },
        set(t, r, n) {
          qi(e.values, r, n);
        }
      })
    );
  }
}, uu = {
  props: {
    url: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: false,
      default: "GET"
    },
    acceptHeader: {
      type: String,
      required: false,
      default: "application/json"
    },
    poll: {
      type: Number,
      required: false,
      default: null
    },
    default: {
      type: Object,
      required: false,
      default: () => ({})
    },
    request: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      response: Object.assign({}, { ...this.default }),
      processing: false
    };
  },
  mounted() {
    this.$nextTick(this.performRequest);
  },
  methods: {
    performRequest() {
      this.processing = true;
      const e = {
        url: this.url,
        method: this.method,
        headers: {
          Accept: this.acceptHeader
        }
      };
      Object.keys(this.request).length > 0 && (e.data = this.request), zn(e).then((t) => {
        this.response = t.data, this.processing = false;
      }).catch(() => {
        this.processing = false;
      }), this.poll && setTimeout(() => {
        this.performRequest();
      }, this.poll);
    }
  },
  render() {
    return this.$slots.default({
      processing: this.processing,
      response: this.response,
      reload: this.performRequest
    });
  }
}, Mi = {
  __name: "OnClickOutside",
  props: {
    do: {
      type: Function,
      required: true
    },
    opened: {
      type: Boolean,
      required: true
    },
    closeOnEscape: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(e) {
    const t = e, r = ref(null), n = ref(null), i = ref(null);
    return onMounted(() => {
      r.value = (o) => {
        o.target === n.value || n.value.contains(o.target) || t.do();
      }, document.addEventListener("click", r.value), document.addEventListener("touchstart", r.value), t.closeOnEscape && (i.value = (o) => {
        t.opened && o.key === "Escape" && t.do();
      }, document.addEventListener("keydown", i.value));
    }), onBeforeUnmount(() => {
      document.removeEventListener("click", r.value), document.removeEventListener("touchstart", r.value), t.closeOnEscape && document.removeEventListener("keydown", i.value);
    }), (o, a) => (openBlock(), createElementBlock("div", {
      ref_key: "root",
      ref: n
    }, [
      renderSlot(o.$slots, "default")
    ], 512));
  }
};
function z(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Be(e) {
  var t = z(e).Element;
  return e instanceof t || e instanceof Element;
}
function W(e) {
  var t = z(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Ur(e) {
  if (typeof ShadowRoot > "u")
    return false;
  var t = z(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
var Ie = Math.max, It = Math.min, Ve = Math.round;
function mr() {
  var e = navigator.userAgentData;
  return e != null && e.brands ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ki() {
  return !/^((?!chrome|android).)*safari/i.test(mr());
}
function Ue(e, t, r) {
  t === void 0 && (t = false), r === void 0 && (r = false);
  var n = e.getBoundingClientRect(), i = 1, o = 1;
  t && W(e) && (i = e.offsetWidth > 0 && Ve(n.width) / e.offsetWidth || 1, o = e.offsetHeight > 0 && Ve(n.height) / e.offsetHeight || 1);
  var a = Be(e) ? z(e) : window, s = a.visualViewport, l = !ki() && r, u = (n.left + (l && s ? s.offsetLeft : 0)) / i, c = (n.top + (l && s ? s.offsetTop : 0)) / o, f = n.width / i, p = n.height / o;
  return {
    width: f,
    height: p,
    top: c,
    right: u + f,
    bottom: c + p,
    left: u,
    x: u,
    y: c
  };
}
function Wr(e) {
  var t = z(e), r = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function cu(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function fu(e) {
  return e === z(e) || !W(e) ? Wr(e) : cu(e);
}
function te(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Ee(e) {
  return ((Be(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function zr(e) {
  return Ue(Ee(e)).left + Wr(e).scrollLeft;
}
function Y(e) {
  return z(e).getComputedStyle(e);
}
function Gr(e) {
  var t = Y(e), r = t.overflow, n = t.overflowX, i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + i + n);
}
function du(e) {
  var t = e.getBoundingClientRect(), r = Ve(t.width) / e.offsetWidth || 1, n = Ve(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function pu(e, t, r) {
  r === void 0 && (r = false);
  var n = W(t), i = W(t) && du(t), o = Ee(t), a = Ue(e, i, r), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((te(t) !== "body" || Gr(o)) && (s = fu(t)), W(t) ? (l = Ue(t, true), l.x += t.clientLeft, l.y += t.clientTop) : o && (l.x = zr(o))), {
    x: a.left + s.scrollLeft - l.x,
    y: a.top + s.scrollTop - l.y,
    width: a.width,
    height: a.height
  };
}
function Ni(e) {
  var t = Ue(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
function Ht(e) {
  return te(e) === "html" ? e : e.assignedSlot || e.parentNode || (Ur(e) ? e.host : null) || Ee(e);
}
function Hi(e) {
  return ["html", "body", "#document"].indexOf(te(e)) >= 0 ? e.ownerDocument.body : W(e) && Gr(e) ? e : Hi(Ht(e));
}
function it(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = Hi(e), i = n === ((r = e.ownerDocument) == null ? void 0 : r.body), o = z(n), a = i ? [o].concat(o.visualViewport || [], Gr(n) ? n : []) : n, s = t.concat(a);
  return i ? s : s.concat(it(Ht(a)));
}
function hu(e) {
  return ["table", "td", "th"].indexOf(te(e)) >= 0;
}
function On(e) {
  return !W(e) || Y(e).position === "fixed" ? null : e.offsetParent;
}
function vu(e) {
  var t = /firefox/i.test(mr()), r = /Trident/i.test(mr());
  if (r && W(e)) {
    var n = Y(e);
    if (n.position === "fixed")
      return null;
  }
  var i = Ht(e);
  for (Ur(i) && (i = i.host); W(i) && ["html", "body"].indexOf(te(i)) < 0; ) {
    var o = Y(i);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || t && o.willChange === "filter" || t && o.filter && o.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function Vt(e) {
  for (var t = z(e), r = On(e); r && hu(r) && Y(r).position === "static"; )
    r = On(r);
  return r && (te(r) === "html" || te(r) === "body" && Y(r).position === "static") ? t : r || vu(e) || t;
}
var X = "top", re = "bottom", Oe = "right", oe = "left", Ut = "auto", Wt = [X, re, Oe, oe], We = "start", ut = "end", mu = "clippingParents", Vi = "viewport", et = "popper", gu = "reference", Sn = /* @__PURE__ */ Wt.reduce(function(e, t) {
  return e.concat([t + "-" + We, t + "-" + ut]);
}, []), yu = /* @__PURE__ */ [].concat(Wt, [Ut]).reduce(function(e, t) {
  return e.concat([t, t + "-" + We, t + "-" + ut]);
}, []), bu = "beforeRead", wu = "read", Ou = "afterRead", Su = "beforeMain", $u = "main", Eu = "afterMain", xu = "beforeWrite", _u = "write", Tu = "afterWrite", gr = [bu, wu, Ou, Su, $u, Eu, xu, _u, Tu];
function Au(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), n = [];
  e.forEach(function(o) {
    t.set(o.name, o);
  });
  function i(o) {
    r.add(o.name);
    var a = [].concat(o.requires || [], o.requiresIfExists || []);
    a.forEach(function(s) {
      if (!r.has(s)) {
        var l = t.get(s);
        l && i(l);
      }
    }), n.push(o);
  }
  return e.forEach(function(o) {
    r.has(o.name) || i(o);
  }), n;
}
function Pu(e) {
  var t = Au(e);
  return gr.reduce(function(r, n) {
    return r.concat(t.filter(function(i) {
      return i.phase === n;
    }));
  }, []);
}
function Cu(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function pe(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  return [].concat(r).reduce(function(i, o) {
    return i.replace(/%s/, o);
  }, e);
}
var Pe = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s', Iu = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available', $n = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function Du(e) {
  e.forEach(function(t) {
    [].concat(Object.keys(t), $n).filter(function(r, n, i) {
      return i.indexOf(r) === n;
    }).forEach(function(r) {
      switch (r) {
        case "name":
          typeof t.name != "string" && console.error(pe(Pe, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'));
          break;
        case "enabled":
          typeof t.enabled != "boolean" && console.error(pe(Pe, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'));
          break;
        case "phase":
          gr.indexOf(t.phase) < 0 && console.error(pe(Pe, t.name, '"phase"', "either " + gr.join(", "), '"' + String(t.phase) + '"'));
          break;
        case "fn":
          typeof t.fn != "function" && console.error(pe(Pe, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
          break;
        case "effect":
          t.effect != null && typeof t.effect != "function" && console.error(pe(Pe, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
          break;
        case "requires":
          t.requires != null && !Array.isArray(t.requires) && console.error(pe(Pe, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(t.requiresIfExists) || console.error(pe(Pe, t.name, '"requiresIfExists"', '"array"', '"' + String(t.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + t.name + '" modifier, valid properties are ' + $n.map(function(n) {
            return '"' + n + '"';
          }).join(", ") + '; but "' + r + '" was provided.');
      }
      t.requires && t.requires.forEach(function(n) {
        e.find(function(i) {
          return i.name === n;
        }) == null && console.error(pe(Iu, String(t.name), n, n));
      });
    });
  });
}
function ju(e, t) {
  var r = /* @__PURE__ */ new Set();
  return e.filter(function(n) {
    var i = t(n);
    if (!r.has(i))
      return r.add(i), true;
  });
}
function ae(e) {
  return e.split("-")[0];
}
function Bu(e) {
  var t = e.reduce(function(r, n) {
    var i = r[n.name];
    return r[n.name] = i ? Object.assign({}, i, n, {
      options: Object.assign({}, i.options, n.options),
      data: Object.assign({}, i.data, n.data)
    }) : n, r;
  }, {});
  return Object.keys(t).map(function(r) {
    return t[r];
  });
}
function Fu(e, t) {
  var r = z(e), n = Ee(e), i = r.visualViewport, o = n.clientWidth, a = n.clientHeight, s = 0, l = 0;
  if (i) {
    o = i.width, a = i.height;
    var u = ki();
    (u || !u && t === "fixed") && (s = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: o,
    height: a,
    x: s + zr(e),
    y: l
  };
}
function Ru(e) {
  var t, r = Ee(e), n = Wr(e), i = (t = e.ownerDocument) == null ? void 0 : t.body, o = Ie(r.scrollWidth, r.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), a = Ie(r.scrollHeight, r.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), s = -n.scrollLeft + zr(e), l = -n.scrollTop;
  return Y(i || r).direction === "rtl" && (s += Ie(r.clientWidth, i ? i.clientWidth : 0) - o), {
    width: o,
    height: a,
    x: s,
    y: l
  };
}
function Lu(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return true;
  if (r && Ur(r)) {
    var n = t;
    do {
      if (n && e.isSameNode(n))
        return true;
      n = n.parentNode || n.host;
    } while (n);
  }
  return false;
}
function yr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function qu(e, t) {
  var r = Ue(e, false, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function En(e, t, r) {
  return t === Vi ? yr(Fu(e, r)) : Be(t) ? qu(t, r) : yr(Ru(Ee(e)));
}
function Mu(e) {
  var t = it(Ht(e)), r = ["absolute", "fixed"].indexOf(Y(e).position) >= 0, n = r && W(e) ? Vt(e) : e;
  return Be(n) ? t.filter(function(i) {
    return Be(i) && Lu(i, n) && te(i) !== "body";
  }) : [];
}
function ku(e, t, r, n) {
  var i = t === "clippingParents" ? Mu(e) : [].concat(t), o = [].concat(i, [r]), a = o[0], s = o.reduce(function(l, u) {
    var c = En(e, u, n);
    return l.top = Ie(c.top, l.top), l.right = It(c.right, l.right), l.bottom = It(c.bottom, l.bottom), l.left = Ie(c.left, l.left), l;
  }, En(e, a, n));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function ze(e) {
  return e.split("-")[1];
}
function Ui(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Wi(e) {
  var t = e.reference, r = e.element, n = e.placement, i = n ? ae(n) : null, o = n ? ze(n) : null, a = t.x + t.width / 2 - r.width / 2, s = t.y + t.height / 2 - r.height / 2, l;
  switch (i) {
    case X:
      l = {
        x: a,
        y: t.y - r.height
      };
      break;
    case re:
      l = {
        x: a,
        y: t.y + t.height
      };
      break;
    case Oe:
      l = {
        x: t.x + t.width,
        y: s
      };
      break;
    case oe:
      l = {
        x: t.x - r.width,
        y: s
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var u = i ? Ui(i) : null;
  if (u != null) {
    var c = u === "y" ? "height" : "width";
    switch (o) {
      case We:
        l[u] = l[u] - (t[c] / 2 - r[c] / 2);
        break;
      case ut:
        l[u] = l[u] + (t[c] / 2 - r[c] / 2);
        break;
    }
  }
  return l;
}
function zi() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Nu(e) {
  return Object.assign({}, zi(), e);
}
function Hu(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
function Kr(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, i = n === void 0 ? e.placement : n, o = r.strategy, a = o === void 0 ? e.strategy : o, s = r.boundary, l = s === void 0 ? mu : s, u = r.rootBoundary, c = u === void 0 ? Vi : u, f = r.elementContext, p = f === void 0 ? et : f, d = r.altBoundary, v = d === void 0 ? false : d, b = r.padding, w = b === void 0 ? 0 : b, T = Nu(typeof w != "number" ? w : Hu(w, Wt)), A = p === et ? gu : et, P = e.rects.popper, E = e.elements[v ? A : p], S = ku(Be(E) ? E : E.contextElement || Ee(e.elements.popper), l, c, a), h2 = Ue(e.elements.reference), g = Wi({
    reference: h2,
    element: P,
    strategy: "absolute",
    placement: i
  }), O = yr(Object.assign({}, P, g)), x = p === et ? O : h2, _ = {
    top: S.top - x.top + T.top,
    bottom: x.bottom - S.bottom + T.bottom,
    left: S.left - x.left + T.left,
    right: x.right - S.right + T.right
  }, $ = e.modifiersData.offset;
  if (p === et && $) {
    var C = $[i];
    Object.keys(_).forEach(function(j) {
      var B = [Oe, re].indexOf(j) >= 0 ? 1 : -1, N = [X, re].indexOf(j) >= 0 ? "y" : "x";
      _[j] += C[N] * B;
    });
  }
  return _;
}
var xn = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.", Vu = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.", _n = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Tn() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Uu(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, n = r === void 0 ? [] : r, i = t.defaultOptions, o = i === void 0 ? _n : i;
  return function(s, l, u) {
    u === void 0 && (u = o);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, _n, o),
      modifiersData: {},
      elements: {
        reference: s,
        popper: l
      },
      attributes: {},
      styles: {}
    }, f = [], p = false, d = {
      state: c,
      setOptions: function(T) {
        var A = typeof T == "function" ? T(c.options) : T;
        b(), c.options = Object.assign({}, o, c.options, A), c.scrollParents = {
          reference: Be(s) ? it(s) : s.contextElement ? it(s.contextElement) : [],
          popper: it(l)
        };
        var P = Pu(Bu([].concat(n, c.options.modifiers)));
        if (c.orderedModifiers = P.filter(function($) {
          return $.enabled;
        }), process.env.NODE_ENV !== "production") {
          var E = ju([].concat(P, c.options.modifiers), function($) {
            var C = $.name;
            return C;
          });
          if (Du(E), ae(c.options.placement) === Ut) {
            var S = c.orderedModifiers.find(function($) {
              var C = $.name;
              return C === "flip";
            });
            S || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var h2 = Y(l), g = h2.marginTop, O = h2.marginRight, x = h2.marginBottom, _ = h2.marginLeft;
          [g, O, x, _].some(function($) {
            return parseFloat($);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return v(), d.update();
      },
      forceUpdate: function() {
        if (!p) {
          var T = c.elements, A = T.reference, P = T.popper;
          if (!Tn(A, P)) {
            process.env.NODE_ENV !== "production" && console.error(xn);
            return;
          }
          c.rects = {
            reference: pu(A, Vt(P), c.options.strategy === "fixed"),
            popper: Ni(P)
          }, c.reset = false, c.placement = c.options.placement, c.orderedModifiers.forEach(function($) {
            return c.modifiersData[$.name] = Object.assign({}, $.data);
          });
          for (var E = 0, S = 0; S < c.orderedModifiers.length; S++) {
            if (process.env.NODE_ENV !== "production" && (E += 1, E > 100)) {
              console.error(Vu);
              break;
            }
            if (c.reset === true) {
              c.reset = false, S = -1;
              continue;
            }
            var h2 = c.orderedModifiers[S], g = h2.fn, O = h2.options, x = O === void 0 ? {} : O, _ = h2.name;
            typeof g == "function" && (c = g({
              state: c,
              options: x,
              name: _,
              instance: d
            }) || c);
          }
        }
      },
      update: Cu(function() {
        return new Promise(function(w) {
          d.forceUpdate(), w(c);
        });
      }),
      destroy: function() {
        b(), p = true;
      }
    };
    if (!Tn(s, l))
      return process.env.NODE_ENV !== "production" && console.error(xn), d;
    d.setOptions(u).then(function(w) {
      !p && u.onFirstUpdate && u.onFirstUpdate(w);
    });
    function v() {
      c.orderedModifiers.forEach(function(w) {
        var T = w.name, A = w.options, P = A === void 0 ? {} : A, E = w.effect;
        if (typeof E == "function") {
          var S = E({
            state: c,
            name: T,
            instance: d,
            options: P
          }), h2 = function() {
          };
          f.push(S || h2);
        }
      });
    }
    function b() {
      f.forEach(function(w) {
        return w();
      }), f = [];
    }
    return d;
  };
}
var Et = {
  passive: true
};
function Wu(e) {
  var t = e.state, r = e.instance, n = e.options, i = n.scroll, o = i === void 0 ? true : i, a = n.resize, s = a === void 0 ? true : a, l = z(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return o && u.forEach(function(c) {
    c.addEventListener("scroll", r.update, Et);
  }), s && l.addEventListener("resize", r.update, Et), function() {
    o && u.forEach(function(c) {
      c.removeEventListener("scroll", r.update, Et);
    }), s && l.removeEventListener("resize", r.update, Et);
  };
}
const zu = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function() {
  },
  effect: Wu,
  data: {}
};
function Gu(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = Wi({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Ku = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: Gu,
  data: {}
};
var Xu = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Qu(e) {
  var t = e.x, r = e.y, n = window, i = n.devicePixelRatio || 1;
  return {
    x: Ve(t * i) / i || 0,
    y: Ve(r * i) / i || 0
  };
}
function An(e) {
  var t, r = e.popper, n = e.popperRect, i = e.placement, o = e.variation, a = e.offsets, s = e.position, l = e.gpuAcceleration, u = e.adaptive, c = e.roundOffsets, f = e.isFixed, p = a.x, d = p === void 0 ? 0 : p, v = a.y, b = v === void 0 ? 0 : v, w = typeof c == "function" ? c({
    x: d,
    y: b
  }) : {
    x: d,
    y: b
  };
  d = w.x, b = w.y;
  var T = a.hasOwnProperty("x"), A = a.hasOwnProperty("y"), P = oe, E = X, S = window;
  if (u) {
    var h2 = Vt(r), g = "clientHeight", O = "clientWidth";
    if (h2 === z(r) && (h2 = Ee(r), Y(h2).position !== "static" && s === "absolute" && (g = "scrollHeight", O = "scrollWidth")), h2 = h2, i === X || (i === oe || i === Oe) && o === ut) {
      E = re;
      var x = f && h2 === S && S.visualViewport ? S.visualViewport.height : h2[g];
      b -= x - n.height, b *= l ? 1 : -1;
    }
    if (i === oe || (i === X || i === re) && o === ut) {
      P = Oe;
      var _ = f && h2 === S && S.visualViewport ? S.visualViewport.width : h2[O];
      d -= _ - n.width, d *= l ? 1 : -1;
    }
  }
  var $ = Object.assign({
    position: s
  }, u && Xu), C = c === true ? Qu({
    x: d,
    y: b
  }) : {
    x: d,
    y: b
  };
  if (d = C.x, b = C.y, l) {
    var j;
    return Object.assign({}, $, (j = {}, j[E] = A ? "0" : "", j[P] = T ? "0" : "", j.transform = (S.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + b + "px)" : "translate3d(" + d + "px, " + b + "px, 0)", j));
  }
  return Object.assign({}, $, (t = {}, t[E] = A ? b + "px" : "", t[P] = T ? d + "px" : "", t.transform = "", t));
}
function Yu(e) {
  var t = e.state, r = e.options, n = r.gpuAcceleration, i = n === void 0 ? true : n, o = r.adaptive, a = o === void 0 ? true : o, s = r.roundOffsets, l = s === void 0 ? true : s;
  if (process.env.NODE_ENV !== "production") {
    var u = Y(t.elements.popper).transitionProperty || "";
    a && ["transform", "top", "right", "bottom", "left"].some(function(f) {
      return u.indexOf(f) >= 0;
    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
  }
  var c = {
    placement: ae(t.placement),
    variation: ze(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: i,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, An(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, An(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: false,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Ju = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: Yu,
  data: {}
};
function Zu(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, i = t.attributes[r] || {}, o = t.elements[r];
    !W(o) || !te(o) || (Object.assign(o.style, n), Object.keys(i).forEach(function(a) {
      var s = i[a];
      s === false ? o.removeAttribute(a) : o.setAttribute(a, s === true ? "" : s);
    }));
  });
}
function ec(e) {
  var t = e.state, r = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow), function() {
    Object.keys(t.elements).forEach(function(n) {
      var i = t.elements[n], o = t.attributes[n] || {}, a = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : r[n]), s = a.reduce(function(l, u) {
        return l[u] = "", l;
      }, {});
      !W(i) || !te(i) || (Object.assign(i.style, s), Object.keys(o).forEach(function(l) {
        i.removeAttribute(l);
      }));
    });
  };
}
const tc = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: Zu,
  effect: ec,
  requires: ["computeStyles"]
};
var rc = [zu, Ku, Ju, tc], nc = /* @__PURE__ */ Uu({
  defaultModifiers: rc
});
function ic(e) {
  return e === "x" ? "y" : "x";
}
function Tt(e, t, r) {
  return Ie(e, It(t, r));
}
function oc(e, t, r) {
  var n = Tt(e, t, r);
  return n > r ? r : n;
}
function ac(e) {
  var t = e.state, r = e.options, n = e.name, i = r.mainAxis, o = i === void 0 ? true : i, a = r.altAxis, s = a === void 0 ? false : a, l = r.boundary, u = r.rootBoundary, c = r.altBoundary, f = r.padding, p = r.tether, d = p === void 0 ? true : p, v = r.tetherOffset, b = v === void 0 ? 0 : v, w = Kr(t, {
    boundary: l,
    rootBoundary: u,
    padding: f,
    altBoundary: c
  }), T = ae(t.placement), A = ze(t.placement), P = !A, E = Ui(T), S = ic(E), h2 = t.modifiersData.popperOffsets, g = t.rects.reference, O = t.rects.popper, x = typeof b == "function" ? b(Object.assign({}, t.rects, {
    placement: t.placement
  })) : b, _ = typeof x == "number" ? {
    mainAxis: x,
    altAxis: x
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, x), $ = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, C = {
    x: 0,
    y: 0
  };
  if (!!h2) {
    if (o) {
      var j, B = E === "y" ? X : oe, N = E === "y" ? re : Oe, R = E === "y" ? "height" : "width", L = h2[E], mt = L + w[B], xe = L - w[N], gt = d ? -O[R] / 2 : 0, Gt = A === We ? g[R] : O[R], Qe = A === We ? -O[R] : -g[R], yt = t.elements.arrow, qe = d && yt ? Ni(yt) : {
        width: 0,
        height: 0
      }, de = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : zi(), Ye = de[B], bt = de[N], _e = Tt(0, g[R], qe[R]), Kt = P ? g[R] / 2 - gt - _e - Ye - _.mainAxis : Gt - _e - Ye - _.mainAxis, io = P ? -g[R] / 2 + gt + _e + bt + _.mainAxis : Qe + _e + bt + _.mainAxis, Xt = t.elements.arrow && Vt(t.elements.arrow), oo = Xt ? E === "y" ? Xt.clientTop || 0 : Xt.clientLeft || 0 : 0, Qr = (j = $ == null ? void 0 : $[E]) != null ? j : 0, ao = L + Kt - Qr - oo, so = L + io - Qr, Yr = Tt(d ? It(mt, ao) : mt, L, d ? Ie(xe, so) : xe);
      h2[E] = Yr, C[E] = Yr - L;
    }
    if (s) {
      var Jr, lo = E === "x" ? X : oe, uo = E === "x" ? re : Oe, Te = h2[S], wt = S === "y" ? "height" : "width", Zr = Te + w[lo], en = Te - w[uo], Qt = [X, oe].indexOf(T) !== -1, tn = (Jr = $ == null ? void 0 : $[S]) != null ? Jr : 0, rn = Qt ? Zr : Te - g[wt] - O[wt] - tn + _.altAxis, nn = Qt ? Te + g[wt] + O[wt] - tn - _.altAxis : en, on = d && Qt ? oc(rn, Te, nn) : Tt(d ? rn : Zr, Te, d ? nn : en);
      h2[S] = on, C[S] = on - Te;
    }
    t.modifiersData[n] = C;
  }
}
const sc = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: ac,
  requiresIfExists: ["offset"]
};
var lc = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function At(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return lc[t];
  });
}
var uc = {
  start: "end",
  end: "start"
};
function Pn(e) {
  return e.replace(/start|end/g, function(t) {
    return uc[t];
  });
}
function cc(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, i = r.boundary, o = r.rootBoundary, a = r.padding, s = r.flipVariations, l = r.allowedAutoPlacements, u = l === void 0 ? yu : l, c = ze(n), f = c ? s ? Sn : Sn.filter(function(v) {
    return ze(v) === c;
  }) : Wt, p = f.filter(function(v) {
    return u.indexOf(v) >= 0;
  });
  p.length === 0 && (p = f, process.env.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var d = p.reduce(function(v, b) {
    return v[b] = Kr(e, {
      placement: b,
      boundary: i,
      rootBoundary: o,
      padding: a
    })[ae(b)], v;
  }, {});
  return Object.keys(d).sort(function(v, b) {
    return d[v] - d[b];
  });
}
function fc(e) {
  if (ae(e) === Ut)
    return [];
  var t = At(e);
  return [Pn(e), t, Pn(t)];
}
function dc(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var i = r.mainAxis, o = i === void 0 ? true : i, a = r.altAxis, s = a === void 0 ? true : a, l = r.fallbackPlacements, u = r.padding, c = r.boundary, f = r.rootBoundary, p = r.altBoundary, d = r.flipVariations, v = d === void 0 ? true : d, b = r.allowedAutoPlacements, w = t.options.placement, T = ae(w), A = T === w, P = l || (A || !v ? [At(w)] : fc(w)), E = [w].concat(P).reduce(function(qe, de) {
      return qe.concat(ae(de) === Ut ? cc(t, {
        placement: de,
        boundary: c,
        rootBoundary: f,
        padding: u,
        flipVariations: v,
        allowedAutoPlacements: b
      }) : de);
    }, []), S = t.rects.reference, h2 = t.rects.popper, g = /* @__PURE__ */ new Map(), O = true, x = E[0], _ = 0; _ < E.length; _++) {
      var $ = E[_], C = ae($), j = ze($) === We, B = [X, re].indexOf(C) >= 0, N = B ? "width" : "height", R = Kr(t, {
        placement: $,
        boundary: c,
        rootBoundary: f,
        altBoundary: p,
        padding: u
      }), L = B ? j ? Oe : oe : j ? re : X;
      S[N] > h2[N] && (L = At(L));
      var mt = At(L), xe = [];
      if (o && xe.push(R[C] <= 0), s && xe.push(R[L] <= 0, R[mt] <= 0), xe.every(function(qe) {
        return qe;
      })) {
        x = $, O = false;
        break;
      }
      g.set($, xe);
    }
    if (O)
      for (var gt = v ? 3 : 1, Gt = function(de) {
        var Ye = E.find(function(bt) {
          var _e = g.get(bt);
          if (_e)
            return _e.slice(0, de).every(function(Kt) {
              return Kt;
            });
        });
        if (Ye)
          return x = Ye, "break";
      }, Qe = gt; Qe > 0; Qe--) {
        var yt = Gt(Qe);
        if (yt === "break")
          break;
      }
    t.placement !== x && (t.modifiersData[n]._skip = true, t.placement = x, t.reset = true);
  }
}
const pc = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: dc,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
}, ht = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, i] of t)
    r[n] = i;
  return r;
}, hc = {
  components: {
    OnClickOutside: Mi
  },
  props: {
    placement: {
      type: String,
      default: "bottom-start",
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      opened: false,
      popper: null
    };
  },
  watch: {
    opened() {
      this.popper.update();
    }
  },
  mounted() {
    this.popper = nc(this.$refs.button, this.$refs.tooltip.children[0], {
      placement: this.placement,
      modifiers: [pc, sc]
    });
  },
  methods: {
    toggle() {
      this.opened = !this.opened;
    },
    hide() {
      this.opened = false;
    }
  }
}, vc = { ref: "button" }, mc = { ref: "tooltip" };
function gc(e, t, r, n, i, o) {
  const a = resolveComponent("OnClickOutside");
  return openBlock(), createBlock(a, {
    class: "relative",
    do: o.hide,
    opened: i.opened
  }, {
    default: withCtx(() => [
      createElementVNode("div", vc, [
        renderSlot(e.$slots, "button", {
          toggle: o.toggle,
          disabled: r.disabled
        })
      ], 512),
      createElementVNode("div", mc, [
        renderSlot(e.$slots, "default", {
          hide: o.hide,
          opened: i.opened
        })
      ], 512)
    ]),
    _: 3
  }, 8, ["do", "opened"]);
}
const yc = /* @__PURE__ */ ht(hc, [["render", gc]]);
function Gi(e) {
  return e && e.length ? e[0] : void 0;
}
const bc = {
  inject: ["stack"],
  computed: {
    values() {
      return m.validationErrors(this.stack);
    }
  },
  render() {
    const e = this;
    return this.$slots.default({
      has(t) {
        return G(e.values, t);
      },
      first(t) {
        return Gi(e.values[t] || []);
      },
      all: { ...this.values },
      ...this.values
    });
  }
}, wc = {
  props: {
    private: {
      type: Boolean,
      required: false,
      default: false
    },
    channel: {
      type: String,
      required: true
    },
    listeners: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      subscribed: false,
      subscription: null,
      subscriptions: [],
      events: []
    };
  },
  beforeUnmount() {
    this.subscription && (window.Echo.leave(this.subscription.subscription.name), this.subscription = null, this.subscriptions = []);
  },
  mounted() {
    this.subscription = this.private ? window.Echo.private(this.channel) : window.Echo.channel(this.channel), this.subscription.on("pusher:subscription_succeeded", () => {
      this.subscribed = true;
    }), this.listeners.forEach((e) => {
      const t = this.subscription.listen(e, (r) => {
        const n = "splade.redirect", i = "splade.refresh", o = "splade.toast";
        let a = null, s = false, l = [];
        Ne(r, (u) => {
          !ee(u) || (n in u && (a = u[n]), i in u && (s = u[i]), o in u && l.push(u));
        }), a ? m.visit(a) : s ? m.refresh() : this.events.push({ name: e, data: r }), l.length > 0 && l.forEach((u) => {
          m.pushToast(u);
        }), this.$root.$emit(`event.${e}`, r);
      });
      this.subscriptions.push(t);
    });
  },
  render() {
    return this.$slots.default({
      subscribed: this.subscribed,
      events: this.events
    });
  }
}, Oc = {
  props: {
    form: {
      type: Object,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      filenames: []
    };
  },
  methods: {
    handleFileInput(e) {
      const t = Object.values(e.target.files);
      this.form.$put(this.field, this.multiple ? t : t[0]), this.filenames = [], t.forEach((r) => {
        this.filenames.push(r.name);
      });
    }
  }
}, Sc = { ref: "file" };
function $c(e, t, r, n, i, o) {
  return openBlock(), createElementBlock("div", Sc, [
    renderSlot(e.$slots, "default", {
      handleFileInput: o.handleFileInput,
      filenames: i.filenames
    })
  ], 512);
}
const Ec = /* @__PURE__ */ ht(Oc, [["render", $c]]), xc = {
  inject: ["stack"],
  computed: {
    values() {
      return m.flashData(this.stack);
    }
  },
  render() {
    const e = this;
    return this.$slots.default({
      has(t) {
        return G(e.values, t);
      },
      ...this.values
    });
  }
};
function Ki(e, t, r) {
  e = e || {}, t = t || new FormData(), r = r || null;
  for (const n in e)
    Object.prototype.hasOwnProperty.call(e, n) && Qi(t, Xi(r, n), e[n]);
  return t;
}
function Xi(e, t) {
  return e ? e + "[" + t + "]" : t;
}
function Qi(e, t, r) {
  if (Array.isArray(r))
    return Array.from(r.keys()).forEach((n) => Qi(e, Xi(t, n.toString()), r[n]));
  if (r instanceof Date)
    return e.append(t, r.toISOString());
  if (r instanceof File)
    return e.append(t, r, r.name);
  if (r instanceof Blob)
    return e.append(t, r);
  if (typeof r == "boolean")
    return e.append(t, r ? "1" : "0");
  if (typeof r == "string")
    return e.append(t, r);
  if (typeof r == "number")
    return e.append(t, `${r}`);
  if (r == null)
    return e.append(t, "");
  Ki(r, e, t);
}
var _c = "[object Boolean]";
function Yi(e) {
  return e === true || e === false || be(e) && $e(e) == _c;
}
function Tc() {
  this.__data__ = new ce(), this.size = 0;
}
function Ac(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function Pc(e) {
  return this.__data__.get(e);
}
function Cc(e) {
  return this.__data__.has(e);
}
var Ic = 200;
function Dc(e, t) {
  var r = this.__data__;
  if (r instanceof ce) {
    var n = r.__data__;
    if (!st || n.length < Ic - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new fe(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function se(e) {
  var t = this.__data__ = new ce(e);
  this.size = t.size;
}
se.prototype.clear = Tc;
se.prototype.delete = Ac;
se.prototype.get = Pc;
se.prototype.has = Cc;
se.prototype.set = Dc;
var jc = "__lodash_hash_undefined__";
function Bc(e) {
  return this.__data__.set(e, jc), this;
}
function Fc(e) {
  return this.__data__.has(e);
}
function Dt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new fe(); ++t < r; )
    this.add(e[t]);
}
Dt.prototype.add = Dt.prototype.push = Bc;
Dt.prototype.has = Fc;
function Rc(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return true;
  return false;
}
function Lc(e, t) {
  return e.has(t);
}
var qc = 1, Mc = 2;
function Ji(e, t, r, n, i, o) {
  var a = r & qc, s = e.length, l = t.length;
  if (s != l && !(a && l > s))
    return false;
  var u = o.get(e), c = o.get(t);
  if (u && c)
    return u == t && c == e;
  var f = -1, p = true, d = r & Mc ? new Dt() : void 0;
  for (o.set(e, t), o.set(t, e); ++f < s; ) {
    var v = e[f], b = t[f];
    if (n)
      var w = a ? n(b, v, f, t, e, o) : n(v, b, f, e, t, o);
    if (w !== void 0) {
      if (w)
        continue;
      p = false;
      break;
    }
    if (d) {
      if (!Rc(t, function(T, A) {
        if (!Lc(d, A) && (v === T || i(v, T, r, n, o)))
          return d.push(A);
      })) {
        p = false;
        break;
      }
    } else if (!(v === b || i(v, b, r, n, o))) {
      p = false;
      break;
    }
  }
  return o.delete(e), o.delete(t), p;
}
var kc = ne.Uint8Array;
const Cn = kc;
function Nc(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, i) {
    r[++t] = [i, n];
  }), r;
}
function Hc(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var Vc = 1, Uc = 2, Wc = "[object Boolean]", zc = "[object Date]", Gc = "[object Error]", Kc = "[object Map]", Xc = "[object Number]", Qc = "[object RegExp]", Yc = "[object Set]", Jc = "[object String]", Zc = "[object Symbol]", ef = "[object ArrayBuffer]", tf = "[object DataView]", In = ye ? ye.prototype : void 0, nr = In ? In.valueOf : void 0;
function rf(e, t, r, n, i, o, a) {
  switch (r) {
    case tf:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return false;
      e = e.buffer, t = t.buffer;
    case ef:
      return !(e.byteLength != t.byteLength || !o(new Cn(e), new Cn(t)));
    case Wc:
    case zc:
    case Xc:
      return Fr(+e, +t);
    case Gc:
      return e.name == t.name && e.message == t.message;
    case Qc:
    case Jc:
      return e == t + "";
    case Kc:
      var s = Nc;
    case Yc:
      var l = n & Vc;
      if (s || (s = Hc), e.size != t.size && !l)
        return false;
      var u = a.get(e);
      if (u)
        return u == t;
      n |= Uc, a.set(e, t);
      var c = Ji(s(e), s(t), n, i, o, a);
      return a.delete(e), c;
    case Zc:
      if (nr)
        return nr.call(e) == nr.call(t);
  }
  return false;
}
function nf(e, t) {
  for (var r = -1, n = t.length, i = e.length; ++r < n; )
    e[i + r] = t[r];
  return e;
}
function of(e, t, r) {
  var n = t(e);
  return k(e) ? n : nf(n, r(e));
}
function Zi(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
    var a = e[r];
    t(a, r, e) && (o[i++] = a);
  }
  return o;
}
function af() {
  return [];
}
var sf = Object.prototype, lf = sf.propertyIsEnumerable, Dn = Object.getOwnPropertySymbols, uf = Dn ? function(e) {
  return e == null ? [] : (e = Object(e), Zi(Dn(e), function(t) {
    return lf.call(e, t);
  }));
} : af;
const cf = uf;
function jn(e) {
  return of(e, Bt, cf);
}
var ff = 1, df = Object.prototype, pf = df.hasOwnProperty;
function hf(e, t, r, n, i, o) {
  var a = r & ff, s = jn(e), l = s.length, u = jn(t), c = u.length;
  if (l != c && !a)
    return false;
  for (var f = l; f--; ) {
    var p = s[f];
    if (!(a ? p in t : pf.call(t, p)))
      return false;
  }
  var d = o.get(e), v = o.get(t);
  if (d && v)
    return d == t && v == e;
  var b = true;
  o.set(e, t), o.set(t, e);
  for (var w = a; ++f < l; ) {
    p = s[f];
    var T = e[p], A = t[p];
    if (n)
      var P = a ? n(A, T, p, t, e, o) : n(T, A, p, e, t, o);
    if (!(P === void 0 ? T === A || i(T, A, r, n, o) : P)) {
      b = false;
      break;
    }
    w || (w = p == "constructor");
  }
  if (b && !w) {
    var E = e.constructor, S = t.constructor;
    E != S && "constructor" in e && "constructor" in t && !(typeof E == "function" && E instanceof E && typeof S == "function" && S instanceof S) && (b = false);
  }
  return o.delete(e), o.delete(t), b;
}
var vf = Re(ne, "DataView");
const br = vf;
var mf = Re(ne, "Promise");
const wr = mf;
var gf = Re(ne, "Set");
const Or = gf;
var yf = Re(ne, "WeakMap");
const Sr = yf;
var Bn = "[object Map]", bf = "[object Object]", Fn = "[object Promise]", Rn = "[object Set]", Ln = "[object WeakMap]", qn = "[object DataView]", wf = Fe(br), Of = Fe(st), Sf = Fe(wr), $f = Fe(Or), Ef = Fe(Sr), Ce = $e;
(br && Ce(new br(new ArrayBuffer(1))) != qn || st && Ce(new st()) != Bn || wr && Ce(wr.resolve()) != Fn || Or && Ce(new Or()) != Rn || Sr && Ce(new Sr()) != Ln) && (Ce = function(e) {
  var t = $e(e), r = t == bf ? e.constructor : void 0, n = r ? Fe(r) : "";
  if (n)
    switch (n) {
      case wf:
        return qn;
      case Of:
        return Bn;
      case Sf:
        return Fn;
      case $f:
        return Rn;
      case Ef:
        return Ln;
    }
  return t;
});
const Mn = Ce;
var xf = 1, kn = "[object Arguments]", Nn = "[object Array]", xt = "[object Object]", _f = Object.prototype, Hn = _f.hasOwnProperty;
function Tf(e, t, r, n, i, o) {
  var a = k(e), s = k(t), l = a ? Nn : Mn(e), u = s ? Nn : Mn(t);
  l = l == kn ? xt : l, u = u == kn ? xt : u;
  var c = l == xt, f = u == xt, p = l == u;
  if (p && ar(e)) {
    if (!ar(t))
      return false;
    a = true, c = false;
  }
  if (p && !c)
    return o || (o = new se()), a || ei(e) ? Ji(e, t, r, n, i, o) : rf(e, t, l, r, n, i, o);
  if (!(r & xf)) {
    var d = c && Hn.call(e, "__wrapped__"), v = f && Hn.call(t, "__wrapped__");
    if (d || v) {
      var b = d ? e.value() : e, w = v ? t.value() : t;
      return o || (o = new se()), i(b, w, r, n, o);
    }
  }
  return p ? (o || (o = new se()), hf(e, t, r, n, i, o)) : false;
}
function zt(e, t, r, n, i) {
  return e === t ? true : e == null || t == null || !be(e) && !be(t) ? e !== e && t !== t : Tf(e, t, r, n, zt, i);
}
var Af = 1, Pf = 2;
function Cf(e, t, r, n) {
  var i = r.length, o = i, a = !n;
  if (e == null)
    return !o;
  for (e = Object(e); i--; ) {
    var s = r[i];
    if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e))
      return false;
  }
  for (; ++i < o; ) {
    s = r[i];
    var l = s[0], u = e[l], c = s[1];
    if (a && s[2]) {
      if (u === void 0 && !(l in e))
        return false;
    } else {
      var f = new se();
      if (n)
        var p = n(u, c, l, e, t, f);
      if (!(p === void 0 ? zt(c, u, Af | Pf, n, f) : p))
        return false;
    }
  }
  return true;
}
function eo(e) {
  return e === e && !ee(e);
}
function If(e) {
  for (var t = Bt(e), r = t.length; r--; ) {
    var n = t[r], i = e[n];
    t[r] = [n, i, eo(i)];
  }
  return t;
}
function to(e, t) {
  return function(r) {
    return r == null ? false : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function Df(e) {
  var t = If(e);
  return t.length == 1 && t[0][2] ? to(t[0][0], t[0][1]) : function(r) {
    return r === e || Cf(r, e, t);
  };
}
function jf(e, t) {
  return e != null && t in Object(e);
}
function Bf(e, t) {
  return e != null && yi(e, t, jf);
}
var Ff = 1, Rf = 2;
function Lf(e, t) {
  return Br(e) && eo(t) ? to(dt(e), t) : function(r) {
    var n = Vr(r, e);
    return n === void 0 && n === t ? Bf(r, e) : zt(t, n, Ff | Rf);
  };
}
function qf(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function Mf(e) {
  return function(t) {
    return Ri(t, e);
  };
}
function kf(e) {
  return Br(e) ? qf(dt(e)) : Mf(e);
}
function vt(e) {
  return typeof e == "function" ? e : e == null ? ri : typeof e == "object" ? k(e) ? Lf(e[0], e[1]) : Df(e) : kf(e);
}
function ro(e, t) {
  var r = {};
  return t = vt(t), Ar(e, function(n, i, o) {
    Li(r, i, t(n, i, o));
  }), r;
}
const Nf = {
  inject: ["stack"],
  props: {
    spladeId: {
      type: String,
      required: true,
      default: ""
    },
    action: {
      type: String,
      required: false,
      default() {
        return m.isSsr ? "" : location.href;
      }
    },
    method: {
      type: String,
      required: false,
      default: "POST"
    },
    default: {
      type: Object,
      required: false,
      default: () => ({})
    },
    confirm: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    confirmText: {
      type: String,
      required: false,
      default: ""
    },
    confirmButton: {
      type: String,
      required: false,
      default: ""
    },
    cancelButton: {
      type: String,
      required: false,
      default: ""
    },
    stay: {
      type: Boolean,
      require: false,
      default: false
    },
    restoreOnSuccess: {
      type: Boolean,
      required: false,
      default: true
    },
    resetOnSuccess: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ["success", "error"],
  data() {
    return {
      missingAttributes: [],
      values: Object.assign({}, { ...this.default }),
      processing: false,
      wasSuccessful: false,
      recentlySuccessful: false,
      recentlySuccessfulTimeoutId: null
    };
  },
  computed: {
    $all() {
      return this.values;
    },
    rawErrors() {
      return m.validationErrors(this.stack);
    },
    errors() {
      return ro(this.rawErrors, (e) => e.join(`
`));
    }
  },
  mounted() {
    let e = document.querySelector(`form[data-splade-id="${this.spladeId}"]`);
    e || (e = document), this.missingAttributes.forEach((t) => {
      let r = "";
      const n = e.querySelector(`[name="${t}"]`);
      n ? r = n.type === "checkbox" ? false : "" : e.querySelector(`[name="${t}[]"]`) ? r = [] : (e.querySelector(`[name^="${t}."]`) || e.querySelector(`[name^="${t}["]`)) && (r = {}), this.$put(t, r);
    }), this.missingAttributes = [];
  },
  methods: {
    hasError(e) {
      return e in this.errors;
    },
    reset() {
      this.values = {};
    },
    restore() {
      this.values = Object.assign({}, { ...this.default });
    },
    $put(e, t) {
      return qi(this.values, e, t);
    },
    submit(e) {
      if (e) {
        const t = e.submitter;
        t && t.name && this.$put(t.name, t.value);
      }
      if (!this.confirm)
        return this.request();
      m.confirm(
        Yi(this.confirm) ? "" : this.confirm,
        this.confirmText,
        this.confirmButton,
        this.cancelButton
      ).then(() => {
        this.request();
      }).catch(() => {
      });
    },
    async request() {
      await this.$nextTick(), this.processing = true, this.wasSuccessful = false, this.recentlySuccessful = false, clearTimeout(this.recentlySuccessfulTimeoutId);
      const e = this.values instanceof FormData ? this.values : Ki(this.values), t = { Accept: "application/json" };
      this.stay && (t["X-Splade-Prevent-Refresh"] = true), m.request(this.action, this.method.toUpperCase(), e, t).then((r) => {
        this.$emit("success", r), this.restoreOnSuccess && this.restore(), this.resetOnSuccess && this.reset(), this.processing = false, this.wasSuccessful = true, this.recentlySuccessful = true, this.recentlySuccessfulTimeoutId = setTimeout(() => this.recentlySuccessful = false, 2e3);
      }).catch((r) => {
        this.processing = false, this.$emit("error", r);
      });
    }
  },
  render() {
    const e = this;
    return this.$slots.default(
      new Proxy(
        {},
        {
          ownKeys() {
            return Object.keys(e.values);
          },
          get(t, r) {
            return [
              "$all",
              "$attrs",
              "$put",
              "errors",
              "restore",
              "reset",
              "hasError",
              "processing",
              "rawErrors",
              "submit",
              "wasSuccessful",
              "recentlySuccessful"
            ].includes(r) ? e[r] : (G(e.values, r) || (e.missingAttributes.push(r), e.$put(r, "")), Vr(e.values, r));
          },
          set(t, r, n) {
            return e.$put(r, n);
          }
        }
      )
    );
  }
}, Hf = {
  props: {
    flatpickr: {
      type: [Boolean, Object],
      required: false,
      default: false
    },
    jsFlatpickrOptions: {
      type: Object,
      required: false,
      default: () => ({})
    },
    modelValue: {
      type: [String, Number],
      required: false
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      disabled: false,
      element: null,
      flatpickrInstance: null,
      observer: null
    };
  },
  watch: {
    modelValue(e) {
      this.flatpickrInstance && this.flatpickrInstance.setDate(e);
    }
  },
  mounted() {
    this.element = this.$refs.input.querySelector("input"), this.flatpickr && this.initFlatpickr(this.element), this.disabled = this.element.disabled;
    const e = this;
    this.observer = new MutationObserver(function(t) {
      t.forEach(function(r) {
        r.attributeName === "disabled" && (e.disabled = r.target.disabled);
      });
    }), this.observer.observe(this.element, { attributes: true });
  },
  beforeUnmount() {
    this.observer.disconnect(), this.flatpickrInstance && this.flatpickrInstance.destroy();
  },
  methods: {
    initFlatpickr(e) {
      import("flatpickr").then((t) => {
        this.flatpickrInstance = t.default(
          e,
          Object.assign({}, this.flatpickr, this.jsFlatpickrOptions, {
            onChange: (r, n) => {
              n != this.modelValue && this.$emit("update:modelValue", n);
            }
          })
        ), this.modelValue && this.flatpickrInstance.setDate(this.modelValue);
      });
    }
  }
}, Vf = { ref: "input" };
function Uf(e, t, r, n, i, o) {
  return openBlock(), createElementBlock("div", Vf, [
    renderSlot(e.$slots, "default", { disabled: i.disabled })
  ], 512);
}
const Wf = /* @__PURE__ */ ht(Hf, [["render", Uf]]), zf = ["href", "onClick"], Gf = {
  __name: "Link",
  props: {
    href: {
      type: String,
      required: true
    },
    confirm: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    confirmText: {
      type: String,
      required: false,
      default: ""
    },
    confirmButton: {
      type: String,
      required: false,
      default: ""
    },
    cancelButton: {
      type: String,
      required: false,
      default: ""
    },
    modal: {
      type: Boolean,
      required: false,
      default: false
    },
    slideover: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(e) {
    const t = e;
    function r() {
      if (!t.confirm)
        return n();
      m.confirm(
        Yi(t.confirm) ? "" : t.confirm,
        t.confirmText,
        t.confirmButton,
        t.cancelButton
      ).then(() => {
        n();
      }).catch(() => {
      });
    }
    function n() {
      if (t.modal)
        return m.modal(t.href);
      if (t.slideover)
        return m.slideover(t.href);
      m.visit(t.href);
    }
    return (i, o) => (openBlock(), createElementBlock("a", {
      href: e.href,
      onClick: withModifiers(r, ["prevent"])
    }, [
      renderSlot(i.$slots, "default")
    ], 8, zf));
  }
}, Kf = {
  provide() {
    return {
      stack: this.stack
    };
  },
  props: {
    closeButton: {
      type: Boolean,
      required: false,
      default: true
    },
    type: {
      type: String,
      required: true
    },
    stack: {
      type: Number,
      required: true
    },
    onTopOfStack: {
      type: Boolean,
      required: false,
      default: false
    },
    maxWidth: {
      type: String,
      required: false,
      default: (e) => e.type === "modal" ? "2xl" : "md"
    }
  },
  emits: ["close"],
  data() {
    return {
      isOpen: false
    };
  },
  mounted() {
    this.setIsOpen(true);
  },
  methods: {
    emitClose() {
      this.$emit("close");
    },
    close() {
      this.setIsOpen(false);
    },
    setIsOpen(e) {
      this.isOpen = e;
    }
  },
  render() {
    return this.$slots.default({
      type: this.type,
      isOpen: this.isOpen,
      setIsOpen: this.setIsOpen,
      close: this.close,
      stack: this.stack,
      onTopOfStack: this.onTopOfStack,
      maxWidth: this.maxWidth,
      emitClose: this.emitClose,
      closeButton: this.closeButton,
      Dialog: Di,
      DialogPanel: ji,
      TransitionRoot: Xe,
      TransitionChild: Ke
    });
  }
};
function Xf(e) {
  return function(t, r, n) {
    var i = Object(t);
    if (!jt(t)) {
      var o = vt(r);
      t = Bt(t), r = function(s) {
        return o(i[s], s, i);
      };
    }
    var a = e(t, r, n);
    return a > -1 ? i[o ? t[a] : a] : void 0;
  };
}
function Qf(e, t, r, n) {
  for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
    if (t(e[o], o, e))
      return o;
  return -1;
}
var Yf = /\s/;
function Jf(e) {
  for (var t = e.length; t-- && Yf.test(e.charAt(t)); )
    ;
  return t;
}
var Zf = /^\s+/;
function ed(e) {
  return e && e.slice(0, Jf(e) + 1).replace(Zf, "");
}
var Vn = 0 / 0, td = /^[-+]0x[0-9a-f]+$/i, rd = /^0b[01]+$/i, nd = /^0o[0-7]+$/i, id = parseInt;
function $r(e) {
  if (typeof e == "number")
    return e;
  if (Rt(e))
    return Vn;
  if (ee(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = ee(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = ed(e);
  var r = rd.test(e);
  return r || nd.test(e) ? id(e.slice(2), r ? 2 : 8) : td.test(e) ? Vn : +e;
}
var Un = 1 / 0, od = 17976931348623157e292;
function ad(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = $r(e), e === Un || e === -Un) {
    var t = e < 0 ? -1 : 1;
    return t * od;
  }
  return e === e ? e : 0;
}
function Xr(e) {
  var t = ad(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var sd = Math.max;
function ld(e, t, r) {
  var n = e == null ? 0 : e.length;
  if (!n)
    return -1;
  var i = r == null ? 0 : Xr(r);
  return i < 0 && (i = sd(n + i, 0)), Qf(e, vt(t), i);
}
var ud = Xf(ld);
const cd = ud, fd = {
  props: {
    choices: {
      type: [Boolean, Object],
      required: false,
      default: false
    },
    jsChoicesOptions: {
      type: Object,
      required: false,
      default: () => ({})
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    modelValue: {
      type: [String, Number, Array],
      required: false
    },
    placeholder: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      choicesInstance: null,
      element: null,
      placeholderText: null
    };
  },
  computed: {
    hasSelection() {
      return this.multiple ? Array.isArray(this.model) ? this.model.length > 0 : false : !(this.model === null || this.model === "");
    }
  },
  watch: {
    modelValue(e, t) {
      if (this.choicesInstance) {
        if (JSON.stringify(e) == JSON.stringify(t))
          return;
        this.setValueOnChoices(e);
      }
    }
  },
  mounted() {
    this.element = this.$refs.select.querySelector("select"), this.choices && this.initChoices(this.element);
  },
  beforeUnmount() {
    this.choices && this.choicesInstance && this.choicesInstance.destroy();
  },
  methods: {
    setValueOnChoices(e) {
      Array.isArray(e) && this.choicesInstance.removeActiveItems(), e === null && (e = ""), this.choicesInstance.setChoiceByValue(e), this.updateHasSelectionAttribute(), this.handlePlaceholderVisibility();
    },
    getItemOfCurrentModel() {
      const e = this.modelValue;
      return cd(this.choicesInstance._store.choices, (t) => t.value == e);
    },
    handlePlaceholderVisibility() {
      if (!this.multiple)
        return;
      const e = this.choicesInstance.containerInner.element.querySelector(
        "input.choices__input"
      );
      this.placeholderText = e.placeholder ? e.placeholder : this.placeholderText;
      const t = this.choicesInstance.getValue().length;
      e.placeholder = t ? "" : this.placeholderText ? this.placeholderText : "", e.style.minWidth = "0", e.style.width = t ? "1px" : "auto", e.style.paddingTop = t ? "0px" : "1px", e.style.paddingBottom = t ? "0px" : "1px";
    },
    initChoices(e) {
      const t = Array.from(
        e.querySelectorAll("option:not([placeholder])")
      ).length, r = this;
      import("choices.js").then((n) => {
        const i = Object.assign({}, this.choices, this.jsChoicesOptions);
        r.choicesInstance = new n.default(e, i), this.choicesInstance.containerInner.element.setAttribute(
          "data-select-name",
          e.name
        ), this.handlePlaceholderVisibility(), this.updateHasSelectionAttribute(), e.addEventListener("change", function() {
          if (r.$emit("update:modelValue", r.choicesInstance.getValue(true)), !r.multiple || t < 1)
            return;
          r.choicesInstance.getValue().length >= t && r.choicesInstance.hideDropdown();
        }), e.addEventListener("showDropdown", function() {
          if (r.multiple || !r.modelValue)
            return;
          const o = r.getItemOfCurrentModel(), a = r.choicesInstance.dropdown.element.querySelector(
            `.choices__item[data-id="${o.id}"]`
          );
          r.choicesInstance.choiceList.scrollToChildElement(a, 1), r.choicesInstance._highlightChoice(a);
        }), this.setValueOnChoices(this.modelValue);
      });
    },
    updateHasSelectionAttribute() {
      this.choicesInstance.containerInner.element.setAttribute(
        "data-has-selection",
        this.hasSelection
      );
    }
  }
}, dd = { ref: "select" };
function pd(e, t, r, n, i, o) {
  return openBlock(), createElementBlock("div", dd, [
    renderSlot(e.$slots, "default")
  ], 512);
}
const hd = /* @__PURE__ */ ht(fd, [["render", pd]]), vd = {
  inject: ["stack"],
  render() {
    const e = m.validationErrors(this.stack), t = m.flashData(this.stack), r = m.sharedData.value, n = ro(e, (i) => i.join(`
`));
    return this.$slots.default({
      flash: t,
      errors: n,
      rawErrors: e,
      shared: r,
      hasError(i) {
        return i in e;
      },
      hasFlash(i) {
        return G(t, i);
      },
      hasShared(i) {
        return G(r, i);
      },
      hasErrors: Object.keys(e).length > 0
    });
  }
};
var md = function() {
  return ne.Date.now();
};
const ir = md;
var gd = "Expected a function", yd = Math.max, bd = Math.min;
function wd(e, t, r) {
  var n, i, o, a, s, l, u = 0, c = false, f = false, p = true;
  if (typeof e != "function")
    throw new TypeError(gd);
  t = $r(t) || 0, ee(r) && (c = !!r.leading, f = "maxWait" in r, o = f ? yd($r(r.maxWait) || 0, t) : o, p = "trailing" in r ? !!r.trailing : p);
  function d(h2) {
    var g = n, O = i;
    return n = i = void 0, u = h2, a = e.apply(O, g), a;
  }
  function v(h2) {
    return u = h2, s = setTimeout(T, t), c ? d(h2) : a;
  }
  function b(h2) {
    var g = h2 - l, O = h2 - u, x = t - g;
    return f ? bd(x, o - O) : x;
  }
  function w(h2) {
    var g = h2 - l, O = h2 - u;
    return l === void 0 || g >= t || g < 0 || f && O >= o;
  }
  function T() {
    var h2 = ir();
    if (w(h2))
      return A(h2);
    s = setTimeout(T, b(h2));
  }
  function A(h2) {
    return s = void 0, p && n ? d(h2) : (n = i = void 0, a);
  }
  function P() {
    s !== void 0 && clearTimeout(s), u = 0, n = l = i = s = void 0;
  }
  function E() {
    return s === void 0 ? a : A(ir());
  }
  function S() {
    var h2 = ir(), g = w(h2);
    if (n = arguments, i = this, l = h2, g) {
      if (s === void 0)
        return v(l);
      if (f)
        return clearTimeout(s), s = setTimeout(T, t), d(l);
    }
    return s === void 0 && (s = setTimeout(T, t)), a;
  }
  return S.cancel = P, S.flush = E, S;
}
function no(e, t, r) {
  return e === e && (r !== void 0 && (e = e <= r ? e : r), t !== void 0 && (e = e >= t ? e : t)), e;
}
function Od(e, t, r) {
  e = Lr(e), t = Mt(t);
  var n = e.length;
  r = r === void 0 ? n : no(Xr(r), 0, n);
  var i = r;
  return r -= t.length, r >= 0 && e.slice(r, i) == t;
}
function Sd(e, t) {
  var r = [];
  return Pr(e, function(n, i, o) {
    t(n, i, o) && r.push(n);
  }), r;
}
function $d(e, t) {
  var r = k(e) ? Zi : Sd;
  return r(e, vt(t));
}
function Wn(e, t) {
  return zt(e, t);
}
function Ed(e, t) {
  var r = -1, n = jt(e) ? Array(e.length) : [];
  return Pr(e, function(i, o, a) {
    n[++r] = t(i, o, a);
  }), n;
}
function xd(e, t) {
  var r = k(e) ? gi : Ed;
  return r(e, vt(t));
}
function _t(e, t, r) {
  return e = Lr(e), r = r == null ? 0 : no(Xr(r), 0, e.length), t = Mt(t), e.slice(r, r + t.length) == t;
}
const _d = {
  props: {
    striped: {
      type: Boolean,
      required: false,
      default: false
    },
    columns: {
      type: Object,
      required: true
    },
    defaultVisibleToggleableColumns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      visibleColumns: [],
      forcedVisibleSearchInputs: []
    };
  },
  computed: {
    columnsAreToggled() {
      return !Wn(this.visibleColumns, this.defaultVisibleToggleableColumns);
    },
    hasForcedVisibleSearchInputs() {
      return this.forcedVisibleSearchInputs.length > 0;
    }
  },
  mounted() {
    const e = this.getCurrentQuery(), t = e.columns || [];
    Ne(e, (r, n) => {
      if (_t(n, "filter[") && !r) {
        const i = n.split("["), o = i[1].substring(0, i[1].length - 1);
        this.forcedVisibleSearchInputs = [...this.forcedVisibleSearchInputs, o];
      }
    }), t.length === 0 ? this.visibleColumns = this.defaultVisibleToggleableColumns : this.visibleColumns = t;
  },
  methods: {
    reset() {
      this.forcedVisibleSearchInputs = [], this.visibleColumns = this.defaultVisibleToggleableColumns;
      let e = this.getCurrentQuery();
      e.columns = [], e.page = null, e.perPage = null, e.sort = null, Ne(e, (t, r) => {
        _t(r, "filter[") && (e[r] = null);
      }), this.visitWithQueryObject(e, null, true);
    },
    columnIsVisible(e) {
      return this.visibleColumns.includes(e);
    },
    toggleColumn(e) {
      const t = !this.columnIsVisible(e), r = $d(this.columns, (i) => i.can_be_hidden ? i.key === e ? t : this.visibleColumns.includes(i.key) : true);
      let n = xd(r, (i) => i.key).sort();
      Wn(n, this.defaultVisibleToggleableColumns) && (n = []), this.visibleColumns = n.length === 0 ? this.defaultVisibleToggleableColumns : n, this.updateQuery("columns", n, null, false);
    },
    disableSearchInput(e) {
      this.forcedVisibleSearchInputs = this.forcedVisibleSearchInputs.filter((t) => t != e), this.updateQuery(`filter[${e}]`, null);
    },
    showSearchInput(e) {
      this.forcedVisibleSearchInputs = [...this.forcedVisibleSearchInputs, e], nextTick(() => {
        document.querySelector(`[name="searchInput-${e}"]`).focus();
      });
    },
    isForcedVisible(e) {
      return this.forcedVisibleSearchInputs.includes(e);
    },
    debounceUpdateQuery: wd(function(e, t, r) {
      this.updateQuery(e, t, r);
    }, 350),
    getCurrentQuery() {
      const e = window.location.search;
      if (!e)
        return {};
      let t = {};
      return e.substring(1).split("&").forEach((r) => {
        const n = decodeURIComponent(r).split("=");
        let i = n[0];
        if (!Od(i, "]")) {
          t[i] = n[1];
          return;
        }
        const o = i.split("["), a = o[1].substring(0, o[1].length - 1);
        parseInt(a) == a ? (i = o[0], k(t[i]) || (t[i] = []), t[i].push(n[1])) : t[i] = n[1];
      }), t;
    },
    updateQuery(e, t, r, n) {
      typeof n > "u" && (n = true);
      let i = this.getCurrentQuery();
      i[e] = t, (_t(e, "perPage") || _t(e, "filter[")) && delete i.page, this.visitWithQueryObject(i, r, n);
    },
    visitWithQueryObject(e, t, r) {
      typeof r > "u" && (r = true);
      let n = {};
      Ne(e, (a, s) => {
        if (!k(a)) {
          n[s] = a;
          return;
        }
        a.length !== 0 && a.forEach((l, u) => {
          n[`${s}[${u}]`] = l;
        });
      });
      let i = "";
      Ne(n, (a, s) => {
        a === null || a === [] || (i && (i += "&"), i += `${s}=${a}`);
      }), i && (i = "?" + i);
      const o = window.location.pathname + i;
      if (!r)
        return m.replaceUrlOfCurrentPage(o);
      m.replace(o).then(() => {
        typeof t < "u" && t && nextTick(() => {
          document.querySelector(`[name="${t.name}"]`).focus();
        });
      });
    }
  },
  render() {
    return this.$slots.default({
      columnIsVisible: this.columnIsVisible,
      columnsAreToggled: this.columnsAreToggled,
      debounceUpdateQuery: this.debounceUpdateQuery,
      disableSearchInput: this.disableSearchInput,
      hasForcedVisibleSearchInputs: this.hasForcedVisibleSearchInputs,
      isForcedVisible: this.isForcedVisible,
      reset: this.reset,
      showSearchInput: this.showSearchInput,
      striped: this.striped,
      toggleColumn: this.toggleColumn,
      updateQuery: this.updateQuery,
      visit: m.visit
    });
  }
}, Td = {
  props: {
    autosize: {
      type: Boolean,
      required: false,
      default: false
    },
    modelValue: {
      type: [String, Number],
      required: false
    }
  },
  data() {
    return {
      autosizeInstance: null,
      element: null
    };
  },
  watch: {
    modelValue() {
      !this.autosize || !this.autosizeInstance || import("autosize").then((e) => {
        nextTick(() => e.default.update(this.element));
      });
    }
  },
  mounted() {
    this.element = this.$refs.textarea.querySelector("textarea"), this.autosize && import("autosize").then((e) => {
      this.autosizeInstance = e.default(this.element);
    });
  },
  beforeUnmount() {
    this.autosize && this.autosizeInstance && import("autosize").then((e) => {
      e.default.destroy(this.element);
    });
  }
}, Ad = { ref: "textarea" };
function Pd(e, t, r, n, i, o) {
  return openBlock(), createElementBlock("div", Ad, [
    renderSlot(e.$slots, "default")
  ], 512);
}
const Cd = /* @__PURE__ */ ht(Td, [["render", Pd]]), Id = {
  props: {
    toastKey: {
      type: Number,
      required: true
    },
    autoDismiss: {
      type: Number,
      required: false,
      default: 0
    }
  },
  emits: ["dismiss"],
  data() {
    return {
      show: true
    };
  },
  mounted() {
    this.autoDismiss && setTimeout(() => {
      this.setShow(false);
    }, this.autoDismiss * 1e3);
  },
  methods: {
    setShow(e) {
      this.show = e;
    },
    emitDismiss() {
      this.$emit("dismiss");
    }
  },
  render() {
    return this.$slots.default({
      key: this.toastKey,
      show: this.show,
      setShow: this.setShow,
      emitDismiss: this.emitDismiss,
      TransitionRoot: Xe,
      TransitionChild: Ke
    });
  }
}, Dd = [
  "left-top",
  "center-top",
  "right-top",
  "left-center",
  "center-center",
  "right-center",
  "left-bottom",
  "center-bottom",
  "right-bottom"
], jd = {
  computed: {
    toasts: function() {
      return m.toastsReversed.value;
    },
    hasBackdrop: function() {
      return m.toasts.value.filter((e) => !e.dismissed && e.backdrop && e.html).length > 0;
    }
  },
  methods: {
    dismissToast(e) {
      m.dismissToast(e);
    }
  },
  render() {
    return this.$slots.default({
      positions: Dd,
      toasts: this.toasts,
      dismissToast: this.dismissToast,
      hasBackdrop: this.hasBackdrop,
      Render: rt,
      TransitionRoot: Xe,
      TransitionChild: Ke
    });
  }
}, Bd = {
  props: {
    default: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      toggles: { ...this.default }
    };
  },
  methods: {
    toggled(e) {
      var t;
      return (t = this.toggles[e]) != null ? t : false;
    },
    toggle(e) {
      this.setToggle(e, !this.toggled(e));
    },
    setToggle(e, t) {
      this.toggles[e] = t;
    }
  },
  render() {
    const e = this;
    return this.$slots.default(
      new Proxy(
        {},
        {
          ownKeys() {
            return Object.keys(e.toggles);
          },
          get(t, r) {
            const n = Object.keys(e.toggles);
            if (n.length === 1 && Gi(n) === "default") {
              if (r === "toggled")
                return e.toggled("default");
              if (r === "setToggle")
                return (i) => {
                  e.setToggle("default", i);
                };
              if (r === "toggle")
                return () => {
                  e.toggle("default");
                };
            }
            return r === "setToggle" ? (i, o) => {
              e.setToggle(i, o);
            } : r === "toggle" ? (i) => {
              e.toggle(i);
            } : e.toggled(r);
          }
        }
      )
    );
  }
}, Fd = {
  render() {
    return this.$slots.default({
      TransitionRoot: Xe,
      TransitionChild: Ke
    });
  }
}, Er = {
  injectCSS(e) {
    const t = document.createElement("style");
    t.type = "text/css", t.textContent = `
    #nprogress {
      pointer-events: none;
    }
    #nprogress .bar {
      background: ${e};
      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
    }
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${e}, 0 0 5px ${e};
      opacity: 1.0;
      -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
              transform: rotate(3deg) translate(0px, -4px);
    }
    #nprogress .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px;
    }
    #nprogress .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;
      border: solid 2px transparent;
      border-top-color: ${e};
      border-left-color: ${e};
      border-radius: 50%;
      -webkit-animation: nprogress-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite;
    }
    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }
    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }
    @-webkit-keyframes nprogress-spinner {
      0%   { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `, document.head.appendChild(t);
  },
  timeout: null,
  start(e, t, r) {
    Er.timeout = setTimeout(() => r.start(), t);
  },
  progress(e, t) {
    t.isStarted() && e.detail.progress.percentage && t.set(Math.max(t.status, e.detail.progress.percentage / 100 * 0.9));
  },
  stop(e, t) {
    clearTimeout(Er.timeout), t.done(), t.remove();
  },
  init(e) {
    const t = this;
    import("nprogress").then((r) => {
      document.addEventListener("splade:request", (n) => t.start(n, e.delay, r.default)), document.addEventListener("splade:request-progress", (n) => t.progress(n, r.default)), document.addEventListener("splade:request-response", (n) => t.stop(n, r.default)), document.addEventListener("splade:request-error", (n) => t.stop(n, r.default)), r.default.configure({ showSpinner: e.spinner }), e.css && this.injectCSS(e.color);
    });
  }
}, kd = {
  install: (e, t) => {
    t = t || {}, t.max_keep_alive = G(t, "max_keep_alive") ? t.max_keep_alive : 10, t.prefix = G(t, "prefix") ? t.prefix : "Splade", t.transform_anchors = G(t, "transform_anchors") ? t.transform_anchors : false, t.link_component = G(t, "link_component") ? t.link_component : "Link", t.progress_bar = G(t, "progress_bar") ? t.progress_bar : false;
    const r = t.prefix;
    if (e.component(`${r}Confirm`, ru).component(`${r}Data`, lu).component(`${r}Defer`, uu).component(`${r}Dropdown`, yc).component(`${r}Errors`, bc).component(`${r}Event`, wc).component(`${r}File`, Ec).component(`${r}Flash`, xc).component(`${r}Form`, Nf).component(`${r}Input`, Wf).component(`${r}Modal`, Kf).component(`${r}OnClickOutside`, Mi).component(`${r}Render`, rt).component(`${r}Select`, hd).component(`${r}State`, vd).component(`${r}Table`, _d).component(`${r}Textarea`, Cd).component(`${r}Toast`, Id).component(`${r}Toasts`, jd).component(`${r}Toggle`, Bd).component(`${r}Transition`, Fd).component(t.link_component, Gf), Object.defineProperty(e.config.globalProperties, "$splade", { get: () => m }), Object.defineProperty(e.config.globalProperties, "$spladeOptions", { get: () => Object.assign({}, { ...t }) }), e.provide("$splade", e.config.globalProperties.$splade), e.provide("$spladeOptions", e.config.globalProperties.$spladeOptions), t.progress_bar) {
      const n = {
        delay: 250,
        color: "#4B5563",
        css: true,
        spinner: false
      };
      ee(t.progress_bar) || (t.progress_bar = {}), ["delay", "color", "css", "spinner"].forEach((i) => {
        G(t.progress_bar, i) || (t.progress_bar[i] = n[i]);
      }), Er.init(t.progress_bar);
    }
  }
};
function Nd(e, t, r) {
  const n = {};
  process.argv.slice(2).forEach((o) => {
    const a = o.replace(/^-+/, "").split("=");
    n[a[0]] = a.length === 2 ? a[1] : true;
  });
  const i = n.port || 9e3;
  e(async (o, a) => {
    if (o.method == "POST") {
      let s = "";
      o.on("data", (l) => s += l), o.on("end", async () => {
        const l = JSON.parse(s), u = r({
          components: l.components,
          initialHtml: l.html,
          initialSpladeData: l.splade
        }), c = await t(u);
        a.writeHead(200, { "Content-Type": "application/json", Server: "Splade SSR" }), a.write(JSON.stringify({ body: c })), a.end();
      });
    }
  }).listen(i, () => console.log(`Splade SSR server started on port ${i}.`));
}
Nd(createServer, renderToString, (props) => {
  return createSSRApp({
    render: qd(props)
  }).use(kd);
});