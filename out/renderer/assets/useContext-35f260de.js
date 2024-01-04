import { r as reactExports, c as reactDomExports, d as RootContext } from "./index-861f41a7.js";
var f$1 = r(), n = (e) => c$3(e, f$1), m$1 = r();
n.write = (e) => c$3(e, m$1);
var d$2 = r();
n.onStart = (e) => c$3(e, d$2);
var h$3 = r();
n.onFrame = (e) => c$3(e, h$3);
var p$1 = r();
n.onFinish = (e) => c$3(e, p$1);
var i = [];
n.setTimeout = (e, t) => {
  let a = n.now() + t, o = () => {
    let F2 = i.findIndex((z2) => z2.cancel == o);
    ~F2 && i.splice(F2, 1), u$2 -= ~F2 ? 1 : 0;
  }, s = { time: a, handler: e, cancel: o };
  return i.splice(w(a), 0, s), u$2 += 1, v$2(), s;
};
var w = (e) => ~(~i.findIndex((t) => t.time > e) || ~i.length);
n.cancel = (e) => {
  d$2.delete(e), h$3.delete(e), p$1.delete(e), f$1.delete(e), m$1.delete(e);
};
n.sync = (e) => {
  T = true, n.batchedUpdates(e), T = false;
};
n.throttle = (e) => {
  let t;
  function a() {
    try {
      e(...t);
    } finally {
      t = null;
    }
  }
  function o(...s) {
    t = s, n.onStart(a);
  }
  return o.handler = e, o.cancel = () => {
    d$2.delete(a), t = null;
  }, o;
};
var y$3 = typeof window < "u" ? window.requestAnimationFrame : () => {
};
n.use = (e) => y$3 = e;
n.now = typeof performance < "u" ? () => performance.now() : Date.now;
n.batchedUpdates = (e) => e();
n.catch = console.error;
n.frameLoop = "always";
n.advance = () => {
  n.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : x$2();
};
var l$2 = -1, u$2 = 0, T = false;
function c$3(e, t) {
  T ? (t.delete(e), e(0)) : (t.add(e), v$2());
}
function v$2() {
  l$2 < 0 && (l$2 = 0, n.frameLoop !== "demand" && y$3(b$2));
}
function R() {
  l$2 = -1;
}
function b$2() {
  ~l$2 && (y$3(b$2), n.batchedUpdates(x$2));
}
function x$2() {
  let e = l$2;
  l$2 = n.now();
  let t = w(l$2);
  if (t && (Q$2(i.splice(0, t), (a) => a.handler()), u$2 -= t), !u$2) {
    R();
    return;
  }
  d$2.flush(), f$1.flush(e ? Math.min(64, l$2 - e) : 16.667), h$3.flush(), m$1.flush(), p$1.flush();
}
function r() {
  let e = /* @__PURE__ */ new Set(), t = e;
  return { add(a) {
    u$2 += t == e && !e.has(a) ? 1 : 0, e.add(a);
  }, delete(a) {
    return u$2 -= t == e && e.has(a) ? 1 : 0, e.delete(a);
  }, flush(a) {
    t.size && (e = /* @__PURE__ */ new Set(), u$2 -= t.size, Q$2(t, (o) => o(a) && e.add(o)), u$2 += e.size, t = e);
  } };
}
function Q$2(e, t) {
  e.forEach((a) => {
    try {
      t(a);
    } catch (o) {
      n.catch(o);
    }
  });
}
var ze$1 = Object.defineProperty;
var Le$2 = (e, t) => {
  for (var r2 in t)
    ze$1(e, r2, { get: t[r2], enumerable: true });
};
var p = {};
Le$2(p, { assign: () => U, colors: () => c$2, createStringInterpolator: () => k$2, skipAnimation: () => ee, to: () => J$1, willAdvance: () => S });
function Y() {
}
var mt$1 = (e, t, r2) => Object.defineProperty(e, t, { value: r2, writable: true, configurable: true }), l$1 = { arr: Array.isArray, obj: (e) => !!e && e.constructor.name === "Object", fun: (e) => typeof e == "function", str: (e) => typeof e == "string", num: (e) => typeof e == "number", und: (e) => e === void 0 };
function bt$1(e, t) {
  if (l$1.arr(e)) {
    if (!l$1.arr(t) || e.length !== t.length)
      return false;
    for (let r2 = 0; r2 < e.length; r2++)
      if (e[r2] !== t[r2])
        return false;
    return true;
  }
  return e === t;
}
var Ve = (e, t) => e.forEach(t);
function xt(e, t, r2) {
  if (l$1.arr(e)) {
    for (let n2 = 0; n2 < e.length; n2++)
      t.call(r2, e[n2], `${n2}`);
    return;
  }
  for (let n2 in e)
    e.hasOwnProperty(n2) && t.call(r2, e[n2], n2);
}
var ht$1 = (e) => l$1.und(e) ? [] : l$1.arr(e) ? e : [e];
function Pe$1(e, t) {
  if (e.size) {
    let r2 = Array.from(e);
    e.clear(), Ve(r2, t);
  }
}
var yt$1 = (e, ...t) => Pe$1(e, (r2) => r2(...t)), h$2 = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
var k$2, J$1, c$2 = null, ee = false, S = Y, U = (e) => {
  e.to && (J$1 = e.to), e.now && (n.now = e.now), e.colors !== void 0 && (c$2 = e.colors), e.skipAnimation != null && (ee = e.skipAnimation), e.createStringInterpolator && (k$2 = e.createStringInterpolator), e.requestAnimationFrame && n.use(e.requestAnimationFrame), e.batchedUpdates && (n.batchedUpdates = e.batchedUpdates), e.willAdvance && (S = e.willAdvance), e.frameLoop && (n.frameLoop = e.frameLoop);
};
var E$1 = /* @__PURE__ */ new Set(), u$1 = [], H$1 = [], A = 0, qe$1 = { get idle() {
  return !E$1.size && !u$1.length;
}, start(e) {
  A > e.priority ? (E$1.add(e), n.onStart($e)) : (te$1(e), n(B));
}, advance: B, sort(e) {
  if (A)
    n.onFrame(() => qe$1.sort(e));
  else {
    let t = u$1.indexOf(e);
    ~t && (u$1.splice(t, 1), re(e));
  }
}, clear() {
  u$1 = [], E$1.clear();
} };
function $e() {
  E$1.forEach(te$1), E$1.clear(), n(B);
}
function te$1(e) {
  u$1.includes(e) || re(e);
}
function re(e) {
  u$1.splice(Ge$1(u$1, (t) => t.priority > e.priority), 0, e);
}
function B(e) {
  let t = H$1;
  for (let r2 = 0; r2 < u$1.length; r2++) {
    let n2 = u$1[r2];
    A = n2.priority, n2.idle || (S(n2), n2.advance(e), n2.idle || t.push(n2));
  }
  return A = 0, H$1 = u$1, H$1.length = 0, u$1 = t, u$1.length > 0;
}
function Ge$1(e, t) {
  let r2 = e.findIndex(t);
  return r2 < 0 ? e.length : r2;
}
var ne$2 = (e, t, r2) => Math.min(Math.max(r2, e), t);
var It = { transparent: 0, aliceblue: 4042850303, antiquewhite: 4209760255, aqua: 16777215, aquamarine: 2147472639, azure: 4043309055, beige: 4126530815, bisque: 4293182719, black: 255, blanchedalmond: 4293643775, blue: 65535, blueviolet: 2318131967, brown: 2771004159, burlywood: 3736635391, burntsienna: 3934150143, cadetblue: 1604231423, chartreuse: 2147418367, chocolate: 3530104575, coral: 4286533887, cornflowerblue: 1687547391, cornsilk: 4294499583, crimson: 3692313855, cyan: 16777215, darkblue: 35839, darkcyan: 9145343, darkgoldenrod: 3095792639, darkgray: 2846468607, darkgreen: 6553855, darkgrey: 2846468607, darkkhaki: 3182914559, darkmagenta: 2332068863, darkolivegreen: 1433087999, darkorange: 4287365375, darkorchid: 2570243327, darkred: 2332033279, darksalmon: 3918953215, darkseagreen: 2411499519, darkslateblue: 1211993087, darkslategray: 793726975, darkslategrey: 793726975, darkturquoise: 13554175, darkviolet: 2483082239, deeppink: 4279538687, deepskyblue: 12582911, dimgray: 1768516095, dimgrey: 1768516095, dodgerblue: 512819199, firebrick: 2988581631, floralwhite: 4294635775, forestgreen: 579543807, fuchsia: 4278255615, gainsboro: 3705462015, ghostwhite: 4177068031, gold: 4292280575, goldenrod: 3668254975, gray: 2155905279, green: 8388863, greenyellow: 2919182335, grey: 2155905279, honeydew: 4043305215, hotpink: 4285117695, indianred: 3445382399, indigo: 1258324735, ivory: 4294963455, khaki: 4041641215, lavender: 3873897215, lavenderblush: 4293981695, lawngreen: 2096890111, lemonchiffon: 4294626815, lightblue: 2916673279, lightcoral: 4034953471, lightcyan: 3774873599, lightgoldenrodyellow: 4210742015, lightgray: 3553874943, lightgreen: 2431553791, lightgrey: 3553874943, lightpink: 4290167295, lightsalmon: 4288707327, lightseagreen: 548580095, lightskyblue: 2278488831, lightslategray: 2005441023, lightslategrey: 2005441023, lightsteelblue: 2965692159, lightyellow: 4294959359, lime: 16711935, limegreen: 852308735, linen: 4210091775, magenta: 4278255615, maroon: 2147483903, mediumaquamarine: 1724754687, mediumblue: 52735, mediumorchid: 3126187007, mediumpurple: 2473647103, mediumseagreen: 1018393087, mediumslateblue: 2070474495, mediumspringgreen: 16423679, mediumturquoise: 1221709055, mediumvioletred: 3340076543, midnightblue: 421097727, mintcream: 4127193855, mistyrose: 4293190143, moccasin: 4293178879, navajowhite: 4292783615, navy: 33023, oldlace: 4260751103, olive: 2155872511, olivedrab: 1804477439, orange: 4289003775, orangered: 4282712319, orchid: 3664828159, palegoldenrod: 4008225535, palegreen: 2566625535, paleturquoise: 2951671551, palevioletred: 3681588223, papayawhip: 4293907967, peachpuff: 4292524543, peru: 3448061951, pink: 4290825215, plum: 3718307327, powderblue: 2967529215, purple: 2147516671, rebeccapurple: 1714657791, red: 4278190335, rosybrown: 3163525119, royalblue: 1097458175, saddlebrown: 2336560127, salmon: 4202722047, sandybrown: 4104413439, seagreen: 780883967, seashell: 4294307583, sienna: 2689740287, silver: 3233857791, skyblue: 2278484991, slateblue: 1784335871, slategray: 1887473919, slategrey: 1887473919, snow: 4294638335, springgreen: 16744447, steelblue: 1182971135, tan: 3535047935, teal: 8421631, thistle: 3636451583, tomato: 4284696575, turquoise: 1088475391, violet: 4001558271, wheat: 4125012991, white: 4294967295, whitesmoke: 4126537215, yellow: 4294902015, yellowgreen: 2597139199 };
var d$1 = "[-+]?\\d*\\.?\\d+", M = d$1 + "%";
function C$1(...e) {
  return "\\(\\s*(" + e.join(")\\s*,\\s*(") + ")\\s*\\)";
}
var oe$1 = new RegExp("rgb" + C$1(d$1, d$1, d$1)), fe$1 = new RegExp("rgba" + C$1(d$1, d$1, d$1, d$1)), ae$1 = new RegExp("hsl" + C$1(d$1, M, M)), ie = new RegExp("hsla" + C$1(d$1, M, M, d$1)), se$1 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, ue$1 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, le$1 = /^#([0-9a-fA-F]{6})$/, ce = /^#([0-9a-fA-F]{8})$/;
function be$1(e) {
  let t;
  return typeof e == "number" ? e >>> 0 === e && e >= 0 && e <= 4294967295 ? e : null : (t = le$1.exec(e)) ? parseInt(t[1] + "ff", 16) >>> 0 : c$2 && c$2[e] !== void 0 ? c$2[e] : (t = oe$1.exec(e)) ? (y$2(t[1]) << 24 | y$2(t[2]) << 16 | y$2(t[3]) << 8 | 255) >>> 0 : (t = fe$1.exec(e)) ? (y$2(t[1]) << 24 | y$2(t[2]) << 16 | y$2(t[3]) << 8 | me$1(t[4])) >>> 0 : (t = se$1.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + "ff", 16) >>> 0 : (t = ce.exec(e)) ? parseInt(t[1], 16) >>> 0 : (t = ue$1.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4], 16) >>> 0 : (t = ae$1.exec(e)) ? (de$1(pe(t[1]), z$1(t[2]), z$1(t[3])) | 255) >>> 0 : (t = ie.exec(e)) ? (de$1(pe(t[1]), z$1(t[2]), z$1(t[3])) | me$1(t[4])) >>> 0 : null;
}
function j$1(e, t, r2) {
  return r2 < 0 && (r2 += 1), r2 > 1 && (r2 -= 1), r2 < 1 / 6 ? e + (t - e) * 6 * r2 : r2 < 1 / 2 ? t : r2 < 2 / 3 ? e + (t - e) * (2 / 3 - r2) * 6 : e;
}
function de$1(e, t, r2) {
  let n2 = r2 < 0.5 ? r2 * (1 + t) : r2 + t - r2 * t, f2 = 2 * r2 - n2, o = j$1(f2, n2, e + 1 / 3), i2 = j$1(f2, n2, e), s = j$1(f2, n2, e - 1 / 3);
  return Math.round(o * 255) << 24 | Math.round(i2 * 255) << 16 | Math.round(s * 255) << 8;
}
function y$2(e) {
  let t = parseInt(e, 10);
  return t < 0 ? 0 : t > 255 ? 255 : t;
}
function pe(e) {
  return (parseFloat(e) % 360 + 360) % 360 / 360;
}
function me$1(e) {
  let t = parseFloat(e);
  return t < 0 ? 0 : t > 1 ? 255 : Math.round(t * 255);
}
function z$1(e) {
  let t = parseFloat(e);
  return t < 0 ? 0 : t > 100 ? 1 : t / 100;
}
function D$1(e) {
  let t = be$1(e);
  if (t === null)
    return e;
  t = t || 0;
  let r2 = (t & 4278190080) >>> 24, n2 = (t & 16711680) >>> 16, f2 = (t & 65280) >>> 8, o = (t & 255) / 255;
  return `rgba(${r2}, ${n2}, ${f2}, ${o})`;
}
var W$1 = (e, t, r2) => {
  if (l$1.fun(e))
    return e;
  if (l$1.arr(e))
    return W$1({ range: e, output: t, extrapolate: r2 });
  if (l$1.str(e.output[0]))
    return k$2(e);
  let n2 = e, f2 = n2.output, o = n2.range || [0, 1], i2 = n2.extrapolateLeft || n2.extrapolate || "extend", s = n2.extrapolateRight || n2.extrapolate || "extend", x2 = n2.easing || ((a) => a);
  return (a) => {
    let F2 = He$1(a, o);
    return Ue$1(a, o[F2], o[F2 + 1], f2[F2], f2[F2 + 1], x2, i2, s, n2.map);
  };
};
function Ue$1(e, t, r2, n2, f2, o, i2, s, x2) {
  let a = x2 ? x2(e) : e;
  if (a < t) {
    if (i2 === "identity")
      return a;
    i2 === "clamp" && (a = t);
  }
  if (a > r2) {
    if (s === "identity")
      return a;
    s === "clamp" && (a = r2);
  }
  return n2 === f2 ? n2 : t === r2 ? e <= t ? n2 : f2 : (t === -1 / 0 ? a = -a : r2 === 1 / 0 ? a = a - t : a = (a - t) / (r2 - t), a = o(a), n2 === -1 / 0 ? a = -a : f2 === 1 / 0 ? a = a + n2 : a = a * (f2 - n2) + n2, a);
}
function He$1(e, t) {
  for (var r2 = 1; r2 < t.length - 1 && !(t[r2] >= e); ++r2)
    ;
  return r2 - 1;
}
var Be = (e, t = "end") => (r2) => {
  r2 = t === "end" ? Math.min(r2, 0.999) : Math.max(r2, 1e-3);
  let n2 = r2 * e, f2 = t === "end" ? Math.floor(n2) : Math.ceil(n2);
  return ne$2(0, 1, f2 / e);
}, P = 1.70158, L$1 = P * 1.525, xe$1 = P + 1, he$1 = 2 * Math.PI / 3, ye$1 = 2 * Math.PI / 4.5, V$1 = (e) => e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375, Lt$1 = { linear: (e) => e, easeInQuad: (e) => e * e, easeOutQuad: (e) => 1 - (1 - e) * (1 - e), easeInOutQuad: (e) => e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2, easeInCubic: (e) => e * e * e, easeOutCubic: (e) => 1 - Math.pow(1 - e, 3), easeInOutCubic: (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2, easeInQuart: (e) => e * e * e * e, easeOutQuart: (e) => 1 - Math.pow(1 - e, 4), easeInOutQuart: (e) => e < 0.5 ? 8 * e * e * e * e : 1 - Math.pow(-2 * e + 2, 4) / 2, easeInQuint: (e) => e * e * e * e * e, easeOutQuint: (e) => 1 - Math.pow(1 - e, 5), easeInOutQuint: (e) => e < 0.5 ? 16 * e * e * e * e * e : 1 - Math.pow(-2 * e + 2, 5) / 2, easeInSine: (e) => 1 - Math.cos(e * Math.PI / 2), easeOutSine: (e) => Math.sin(e * Math.PI / 2), easeInOutSine: (e) => -(Math.cos(Math.PI * e) - 1) / 2, easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * e - 10), easeOutExpo: (e) => e === 1 ? 1 : 1 - Math.pow(2, -10 * e), easeInOutExpo: (e) => e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? Math.pow(2, 20 * e - 10) / 2 : (2 - Math.pow(2, -20 * e + 10)) / 2, easeInCirc: (e) => 1 - Math.sqrt(1 - Math.pow(e, 2)), easeOutCirc: (e) => Math.sqrt(1 - Math.pow(e - 1, 2)), easeInOutCirc: (e) => e < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * e, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * e + 2, 2)) + 1) / 2, easeInBack: (e) => xe$1 * e * e * e - P * e * e, easeOutBack: (e) => 1 + xe$1 * Math.pow(e - 1, 3) + P * Math.pow(e - 1, 2), easeInOutBack: (e) => e < 0.5 ? Math.pow(2 * e, 2) * ((L$1 + 1) * 2 * e - L$1) / 2 : (Math.pow(2 * e - 2, 2) * ((L$1 + 1) * (e * 2 - 2) + L$1) + 2) / 2, easeInElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : -Math.pow(2, 10 * e - 10) * Math.sin((e * 10 - 10.75) * he$1), easeOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : Math.pow(2, -10 * e) * Math.sin((e * 10 - 0.75) * he$1) + 1, easeInOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? -(Math.pow(2, 20 * e - 10) * Math.sin((20 * e - 11.125) * ye$1)) / 2 : Math.pow(2, -20 * e + 10) * Math.sin((20 * e - 11.125) * ye$1) / 2 + 1, easeInBounce: (e) => 1 - V$1(1 - e), easeOutBounce: V$1, easeInOutBounce: (e) => e < 0.5 ? (1 - V$1(1 - 2 * e)) / 2 : (1 + V$1(2 * e - 1)) / 2, steps: Be };
var g$1 = Symbol.for("FluidValue.get"), m = Symbol.for("FluidValue.observers");
var Pt = (e) => !!(e && e[g$1]), ve = (e) => e && e[g$1] ? e[g$1]() : e, qt = (e) => e[m] || null;
function je(e, t) {
  e.eventObserved ? e.eventObserved(t) : e(t);
}
function $t(e, t) {
  let r2 = e[m];
  r2 && r2.forEach((n2) => {
    je(n2, t);
  });
}
var ge = class {
  [g$1];
  [m];
  constructor(t) {
    if (!t && !(t = this.get))
      throw Error("Unknown getter");
    De$1(this, t);
  }
}, De$1 = (e, t) => Ee$1(e, g$1, t);
function Gt$1(e, t) {
  if (e[g$1]) {
    let r2 = e[m];
    r2 || Ee$1(e, m, r2 = /* @__PURE__ */ new Set()), r2.has(t) || (r2.add(t), e.observerAdded && e.observerAdded(r2.size, t));
  }
  return t;
}
function Qt(e, t) {
  let r2 = e[m];
  if (r2 && r2.has(t)) {
    let n2 = r2.size - 1;
    n2 ? r2.delete(t) : e[m] = null, e.observerRemoved && e.observerRemoved(n2, t);
  }
}
var Ee$1 = (e, t, r2) => Object.defineProperty(e, t, { value: r2, writable: true, configurable: true });
var O = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, Oe = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, K = new RegExp(`(${O.source})(%|[a-z]+)`, "i"), we$1 = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, b$1 = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
var N = (e) => {
  let [t, r2] = We(e);
  if (!t || h$2())
    return e;
  let n2 = window.getComputedStyle(document.documentElement).getPropertyValue(t);
  if (n2)
    return n2.trim();
  if (r2 && r2.startsWith("--")) {
    let f2 = window.getComputedStyle(document.documentElement).getPropertyValue(r2);
    return f2 || e;
  } else {
    if (r2 && b$1.test(r2))
      return N(r2);
    if (r2)
      return r2;
  }
  return e;
}, We = (e) => {
  let t = b$1.exec(e);
  if (!t)
    return [,];
  let [, r2, n2] = t;
  return [r2, n2];
};
var _$1, Ke$1 = (e, t, r2, n2, f2) => `rgba(${Math.round(t)}, ${Math.round(r2)}, ${Math.round(n2)}, ${f2})`, Xt = (e) => {
  _$1 || (_$1 = c$2 ? new RegExp(`(${Object.keys(c$2).join("|")})(?!\\w)`, "g") : /^\b$/);
  let t = e.output.map((o) => ve(o).replace(b$1, N).replace(Oe, D$1).replace(_$1, D$1)), r2 = t.map((o) => o.match(O).map(Number)), f2 = r2[0].map((o, i2) => r2.map((s) => {
    if (!(i2 in s))
      throw Error('The arity of each "output" value must be equal');
    return s[i2];
  })).map((o) => W$1({ ...e, output: o }));
  return (o) => {
    let i2 = !K.test(t[0]) && t.find((x2) => K.test(x2))?.replace(O, ""), s = 0;
    return t[0].replace(O, () => `${f2[s++](o)}${i2 || ""}`).replace(we$1, Ke$1);
  };
};
var Z = "react-spring: ", Te = (e) => {
  let t = e, r2 = false;
  if (typeof t != "function")
    throw new TypeError(`${Z}once requires a function parameter`);
  return (...n2) => {
    r2 || (t(...n2), r2 = true);
  };
}, Ne$1 = Te(console.warn);
function Jt() {
  Ne$1(`${Z}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
var _e$1 = Te(console.warn);
function er$1() {
  _e$1(`${Z}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function or(e) {
  return l$1.str(e) && (e[0] == "#" || /\d/.test(e) || !h$2() && b$1.test(e) || e in (c$2 || {}));
}
var Q$1 = h$2() ? reactExports.useEffect : reactExports.useLayoutEffect;
var Ce$1 = () => {
  let e = reactExports.useRef(false);
  return Q$1(() => (e.current = true, () => {
    e.current = false;
  }), []), e;
};
function Mr() {
  let e = reactExports.useState()[1], t = Ce$1();
  return () => {
    t.current && e(Math.random());
  };
}
function Lr(e, t) {
  let [r2] = reactExports.useState(() => ({ inputs: t, result: e() })), n2 = reactExports.useRef(), f2 = n2.current, o = f2;
  return o ? t && o.inputs && it$2(t, o.inputs) || (o = { inputs: t, result: e() }) : o = r2, reactExports.useEffect(() => {
    n2.current = o, f2 == r2 && (r2.inputs = r2.result = void 0);
  }, [o]), o.result;
}
function it$2(e, t) {
  if (e.length !== t.length)
    return false;
  for (let r2 = 0; r2 < e.length; r2++)
    if (e[r2] !== t[r2])
      return false;
  return true;
}
var $r = (e) => reactExports.useEffect(e, ut), ut = [];
function Ur(e) {
  let t = reactExports.useRef();
  return reactExports.useEffect(() => {
    t.current = e;
  }), t.current;
}
var h$1 = Symbol.for("Animated:node"), v$1 = (e) => !!e && e[h$1] === e, k$1 = (e) => e && e[h$1], D = (e, t) => mt$1(e, h$1, t), F$1 = (e) => e && e[h$1] && e[h$1].getPayload(), c$1 = class c {
  payload;
  constructor() {
    D(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
};
var l = class extends c$1 {
  constructor(r2) {
    super();
    this._value = r2;
    l$1.num(this._value) && (this.lastPosition = this._value);
  }
  done = true;
  elapsedTime;
  lastPosition;
  lastVelocity;
  v0;
  durationProgress = 0;
  static create(r2) {
    return new l(r2);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(r2, n2) {
    return l$1.num(r2) && (this.lastPosition = r2, n2 && (r2 = Math.round(r2 / n2) * n2, this.done && (this.lastPosition = r2))), this._value === r2 ? false : (this._value = r2, true);
  }
  reset() {
    let { done: r2 } = this;
    this.done = false, l$1.num(this._value) && (this.elapsedTime = 0, this.durationProgress = 0, this.lastPosition = this._value, r2 && (this.lastVelocity = null), this.v0 = null);
  }
};
var d = class extends l {
  _string = null;
  _toString;
  constructor(t) {
    super(0), this._toString = W$1({ output: [t, t] });
  }
  static create(t) {
    return new d(t);
  }
  getValue() {
    let t = this._string;
    return t ?? (this._string = this._toString(this._value));
  }
  setValue(t) {
    if (l$1.str(t)) {
      if (t == this._string)
        return false;
      this._string = t, this._value = 1;
    } else if (super.setValue(t))
      this._string = null;
    else
      return false;
    return true;
  }
  reset(t) {
    t && (this._toString = W$1({ output: [this.getValue(), t] })), this._value = 0, super.reset();
  }
};
var f = { dependencies: null };
var u = class extends c$1 {
  constructor(r2) {
    super();
    this.source = r2;
    this.setValue(r2);
  }
  getValue(r2) {
    let n2 = {};
    return xt(this.source, (a, i2) => {
      v$1(a) ? n2[i2] = a.getValue(r2) : Pt(a) ? n2[i2] = ve(a) : r2 || (n2[i2] = a);
    }), n2;
  }
  setValue(r2) {
    this.source = r2, this.payload = this._makePayload(r2);
  }
  reset() {
    this.payload && Ve(this.payload, (r2) => r2.reset());
  }
  _makePayload(r2) {
    if (r2) {
      let n2 = /* @__PURE__ */ new Set();
      return xt(r2, this._addToPayload, n2), Array.from(n2);
    }
  }
  _addToPayload(r2) {
    f.dependencies && Pt(r2) && f.dependencies.add(r2);
    let n2 = F$1(r2);
    n2 && Ve(n2, (a) => this.add(a));
  }
};
var y$1 = class y extends u {
  constructor(t) {
    super(t);
  }
  static create(t) {
    return new y$1(t);
  }
  getValue() {
    return this.source.map((t) => t.getValue());
  }
  setValue(t) {
    let r2 = this.getPayload();
    return t.length == r2.length ? r2.map((n2, a) => n2.setValue(t[a])).some(Boolean) : (super.setValue(t.map(z)), true);
  }
};
function z(e) {
  return (or(e) ? d : l).create(e);
}
function Le$1(e) {
  let t = k$1(e);
  return t ? t.constructor : l$1.arr(e) ? y$1 : or(e) ? d : l;
}
var x$1 = (e, t) => {
  let r2 = !l$1.fun(e) || e.prototype && e.prototype.isReactComponent;
  return reactExports.forwardRef((n$1, a) => {
    let i2 = reactExports.useRef(null), o = r2 && reactExports.useCallback((s) => {
      i2.current = ae(a, s);
    }, [a]), [m2, T2] = ne$1(n$1, t), W2 = Mr(), P2 = () => {
      let s = i2.current;
      if (r2 && !s)
        return;
      (s ? t.applyAnimatedValues(s, m2.getValue(true)) : false) === false && W2();
    }, _2 = new b(P2, T2), p2 = reactExports.useRef();
    Q$1(() => (p2.current = _2, Ve(T2, (s) => Gt$1(s, _2)), () => {
      p2.current && (Ve(p2.current.deps, (s) => Qt(s, p2.current)), n.cancel(p2.current.update));
    })), reactExports.useEffect(P2, []), $r(() => () => {
      let s = p2.current;
      Ve(s.deps, (S2) => Qt(S2, s));
    });
    let $2 = t.getComponentProps(m2.getValue());
    return reactExports.createElement(e, { ...$2, ref: o });
  });
}, b = class {
  constructor(t, r2) {
    this.update = t;
    this.deps = r2;
  }
  eventObserved(t) {
    t.type == "change" && n.write(this.update);
  }
};
function ne$1(e, t) {
  let r2 = /* @__PURE__ */ new Set();
  return f.dependencies = r2, e.style && (e = { ...e, style: t.createAnimatedStyle(e.style) }), e = new u(e), f.dependencies = null, [e, r2];
}
function ae(e, t) {
  return e && (l$1.fun(e) ? e(t) : e.current = t), t;
}
var j = Symbol.for("AnimatedComponent"), Ke = (e, { applyAnimatedValues: t = () => false, createAnimatedStyle: r2 = (a) => new u(a), getComponentProps: n2 = (a) => a } = {}) => {
  let a = { applyAnimatedValues: t, createAnimatedStyle: r2, getComponentProps: n2 }, i2 = (o) => {
    let m2 = I$2(o) || "Anonymous";
    return l$1.str(o) ? o = i2[o] || (i2[o] = x$1(o, a)) : o = o[j] || (o[j] = x$1(o, a)), o.displayName = `Animated(${m2})`, o;
  };
  return xt(e, (o, m2) => {
    l$1.arr(e) && (m2 = I$2(o)), i2[m2] = i2(o);
  }), { animated: i2 };
}, I$2 = (e) => l$1.str(e) ? e : e && l$1.str(e.displayName) ? e.displayName : l$1.fun(e) && e.name || null;
function I$1(t, ...e) {
  return l$1.fun(t) ? t(...e) : t;
}
var te = (t, e) => t === true || !!(e && t && (l$1.fun(t) ? t(e) : ht$1(t).includes(e))), et = (t, e) => l$1.obj(t) ? e && t[e] : t;
var ke = (t, e) => t.default === true ? t[e] : t.default ? t.default[e] : void 0, nn = (t) => t, ne = (t, e = nn) => {
  let n2 = rn;
  t.default && t.default !== true && (t = t.default, n2 = Object.keys(t));
  let r2 = {};
  for (let o of n2) {
    let s = e(t[o], o);
    l$1.und(s) || (r2[o] = s);
  }
  return r2;
}, rn = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], on = { config: 1, from: 1, to: 1, ref: 1, loop: 1, reset: 1, pause: 1, cancel: 1, reverse: 1, immediate: 1, default: 1, delay: 1, onProps: 1, onStart: 1, onChange: 1, onPause: 1, onResume: 1, onRest: 1, onResolve: 1, items: 1, trail: 1, sort: 1, expires: 1, initial: 1, enter: 1, update: 1, leave: 1, children: 1, onDestroyed: 1, keys: 1, callId: 1, parentId: 1 };
function sn(t) {
  let e = {}, n2 = 0;
  if (xt(t, (r2, o) => {
    on[o] || (e[o] = r2, n2++);
  }), n2)
    return e;
}
function de(t) {
  let e = sn(t);
  if (e) {
    let n2 = { to: e };
    return xt(t, (r2, o) => o in e || (n2[o] = r2)), n2;
  }
  return { ...t };
}
function me(t) {
  return t = ve(t), l$1.arr(t) ? t.map(me) : or(t) ? p.createStringInterpolator({ range: [0, 1], output: [t, t] })(1) : t;
}
function Ue(t) {
  for (let e in t)
    return true;
  return false;
}
function Ee(t) {
  return l$1.fun(t) || l$1.arr(t) && l$1.obj(t[0]);
}
function xe(t, e) {
  t.ref?.delete(t), e?.delete(t);
}
function he(t, e) {
  e && t.ref !== e && (t.ref?.delete(t), e.add(t), t.ref = e);
}
var mt = { default: { tension: 170, friction: 26 }, gentle: { tension: 120, friction: 14 }, wobbly: { tension: 180, friction: 12 }, stiff: { tension: 210, friction: 20 }, slow: { tension: 280, friction: 60 }, molasses: { tension: 280, friction: 120 } };
var tt = { ...mt.default, mass: 1, damping: 1, easing: Lt$1.linear, clamp: false }, we = class {
  tension;
  friction;
  frequency;
  damping;
  mass;
  velocity = 0;
  restVelocity;
  precision;
  progress;
  duration;
  easing;
  clamp;
  bounce;
  decay;
  round;
  constructor() {
    Object.assign(this, tt);
  }
};
function gt(t, e, n2) {
  n2 && (n2 = { ...n2 }, ht(n2, e), e = { ...n2, ...e }), ht(t, e), Object.assign(t, e);
  for (let i2 in tt)
    t[i2] == null && (t[i2] = tt[i2]);
  let { frequency: r2, damping: o } = t, { mass: s } = t;
  return l$1.und(r2) || (r2 < 0.01 && (r2 = 0.01), o < 0 && (o = 0), t.tension = Math.pow(2 * Math.PI / r2, 2) * s, t.friction = 4 * Math.PI * o * s / r2), t;
}
function ht(t, e) {
  if (!l$1.und(e.decay))
    t.duration = void 0;
  else {
    let n2 = !l$1.und(e.tension) || !l$1.und(e.friction);
    (n2 || !l$1.und(e.frequency) || !l$1.und(e.damping) || !l$1.und(e.mass)) && (t.duration = void 0, t.decay = void 0), n2 && (t.frequency = void 0);
  }
}
var yt = [], Le = class {
  changed = false;
  values = yt;
  toValues = null;
  fromValues = yt;
  to;
  from;
  config = new we();
  immediate = false;
};
function Me(t, { key: e, props: n$1, defaultProps: r2, state: o, actions: s }) {
  return new Promise((i2, a) => {
    let u2, p$12, f2 = te(n$1.cancel ?? r2?.cancel, e);
    if (f2)
      b2();
    else {
      l$1.und(n$1.pause) || (o.paused = te(n$1.pause, e));
      let c3 = r2?.pause;
      c3 !== true && (c3 = o.paused || te(c3, e)), u2 = I$1(n$1.delay || 0, e), c3 ? (o.resumeQueue.add(m2), s.pause()) : (s.resume(), m2());
    }
    function d2() {
      o.resumeQueue.add(m2), o.timeouts.delete(p$12), p$12.cancel(), u2 = p$12.time - n.now();
    }
    function m2() {
      u2 > 0 && !p.skipAnimation ? (o.delayed = true, p$12 = n.setTimeout(b2, u2), o.pauseQueue.add(d2), o.timeouts.add(p$12)) : b2();
    }
    function b2() {
      o.delayed && (o.delayed = false), o.pauseQueue.delete(d2), o.timeouts.delete(p$12), t <= (o.cancelId || 0) && (f2 = true);
      try {
        s.start({ ...n$1, callId: t, cancel: f2 }, i2);
      } catch (c3) {
        a(c3);
      }
    }
  });
}
var be = (t, e) => e.length == 1 ? e[0] : e.some((n2) => n2.cancelled) ? q$1(t.get()) : e.every((n2) => n2.noop) ? nt(t.get()) : E(t.get(), e.every((n2) => n2.finished)), nt = (t) => ({ value: t, noop: true, finished: true, cancelled: false }), E = (t, e, n2 = false) => ({ value: t, finished: e, cancelled: n2 }), q$1 = (t) => ({ value: t, cancelled: true, finished: false });
function De(t, e, n$1, r2) {
  let { callId: o, parentId: s, onRest: i2 } = e, { asyncTo: a, promise: u2 } = n$1;
  return !s && t === a && !e.reset ? u2 : n$1.promise = (async () => {
    n$1.asyncId = o, n$1.asyncTo = t;
    let p$12 = ne(e, (l2, h2) => h2 === "onRest" ? void 0 : l2), f2, d2, m2 = new Promise((l2, h2) => (f2 = l2, d2 = h2)), b2 = (l2) => {
      let h2 = o <= (n$1.cancelId || 0) && q$1(r2) || o !== n$1.asyncId && E(r2, false);
      if (h2)
        throw l2.result = h2, d2(l2), l2;
    }, c3 = (l2, h2) => {
      let g2 = new Ae(), x2 = new Ne();
      return (async () => {
        if (p.skipAnimation)
          throw oe(n$1), x2.result = E(r2, false), d2(x2), x2;
        b2(g2);
        let S2 = l$1.obj(l2) ? { ...l2 } : { ...h2, to: l2 };
        S2.parentId = o, xt(p$12, (V2, _2) => {
          l$1.und(S2[_2]) && (S2[_2] = V2);
        });
        let A2 = await r2.start(S2);
        return b2(g2), n$1.paused && await new Promise((V2) => {
          n$1.resumeQueue.add(V2);
        }), A2;
      })();
    }, P2;
    if (p.skipAnimation)
      return oe(n$1), E(r2, false);
    try {
      let l2;
      l$1.arr(t) ? l2 = (async (h2) => {
        for (let g2 of h2)
          await c3(g2);
      })(t) : l2 = Promise.resolve(t(c3, r2.stop.bind(r2))), await Promise.all([l2.then(f2), m2]), P2 = E(r2.get(), true, false);
    } catch (l2) {
      if (l2 instanceof Ae)
        P2 = l2.result;
      else if (l2 instanceof Ne)
        P2 = l2.result;
      else
        throw l2;
    } finally {
      o == n$1.asyncId && (n$1.asyncId = s, n$1.asyncTo = s ? a : void 0, n$1.promise = s ? u2 : void 0);
    }
    return l$1.fun(i2) && n.batchedUpdates(() => {
      i2(P2, r2, r2.item);
    }), P2;
  })();
}
function oe(t, e) {
  Pe$1(t.timeouts, (n2) => n2.cancel()), t.pauseQueue.clear(), t.resumeQueue.clear(), t.asyncId = t.asyncTo = t.promise = void 0, e && (t.cancelId = e);
}
var Ae = class extends Error {
  result;
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise.");
  }
}, Ne = class extends Error {
  result;
  constructor() {
    super("SkipAnimationSignal");
  }
};
var Re = (t) => t instanceof X, Sn = 1, X = class extends ge {
  id = Sn++;
  _priority = 0;
  get priority() {
    return this._priority;
  }
  set priority(e) {
    this._priority != e && (this._priority = e, this._onPriorityChange(e));
  }
  get() {
    let e = k$1(this);
    return e && e.getValue();
  }
  to(...e) {
    return p.to(this, e);
  }
  interpolate(...e) {
    return Jt(), p.to(this, e);
  }
  toJSON() {
    return this.get();
  }
  observerAdded(e) {
    e == 1 && this._attach();
  }
  observerRemoved(e) {
    e == 0 && this._detach();
  }
  _attach() {
  }
  _detach() {
  }
  _onChange(e, n2 = false) {
    $t(this, { type: "change", parent: this, value: e, idle: n2 });
  }
  _onPriorityChange(e) {
    this.idle || qe$1.sort(this), $t(this, { type: "priority", parent: this, priority: e });
  }
};
var se = Symbol.for("SpringPhase"), bt = 1, rt = 2, ot = 4, qe = (t) => (t[se] & bt) > 0, Q = (t) => (t[se] & rt) > 0, ye = (t) => (t[se] & ot) > 0, st = (t, e) => e ? t[se] |= rt | bt : t[se] &= ~rt, it$1 = (t, e) => e ? t[se] |= ot : t[se] &= ~ot;
var ue = class extends X {
  key;
  animation = new Le();
  queue;
  defaultProps = {};
  _state = { paused: false, delayed: false, pauseQueue: /* @__PURE__ */ new Set(), resumeQueue: /* @__PURE__ */ new Set(), timeouts: /* @__PURE__ */ new Set() };
  _pendingCalls = /* @__PURE__ */ new Set();
  _lastCallId = 0;
  _lastToId = 0;
  _memoizedDuration = 0;
  constructor(e, n2) {
    if (super(), !l$1.und(e) || !l$1.und(n2)) {
      let r2 = l$1.obj(e) ? { ...e } : { ...n2, from: e };
      l$1.und(r2.default) && (r2.default = true), this.start(r2);
    }
  }
  get idle() {
    return !(Q(this) || this._state.asyncTo) || ye(this);
  }
  get goal() {
    return ve(this.animation.to);
  }
  get velocity() {
    let e = k$1(this);
    return e instanceof l ? e.lastVelocity || 0 : e.getPayload().map((n2) => n2.lastVelocity || 0);
  }
  get hasAnimated() {
    return qe(this);
  }
  get isAnimating() {
    return Q(this);
  }
  get isPaused() {
    return ye(this);
  }
  get isDelayed() {
    return this._state.delayed;
  }
  advance(e) {
    let n2 = true, r2 = false, o = this.animation, { toValues: s } = o, { config: i2 } = o, a = F$1(o.to);
    !a && Pt(o.to) && (s = ht$1(ve(o.to))), o.values.forEach((f2, d$12) => {
      if (f2.done)
        return;
      let m2 = f2.constructor == d ? 1 : a ? a[d$12].lastPosition : s[d$12], b2 = o.immediate, c3 = m2;
      if (!b2) {
        if (c3 = f2.lastPosition, i2.tension <= 0) {
          f2.done = true;
          return;
        }
        let P2 = f2.elapsedTime += e, l2 = o.fromValues[d$12], h2 = f2.v0 != null ? f2.v0 : f2.v0 = l$1.arr(i2.velocity) ? i2.velocity[d$12] : i2.velocity, g2, x2 = i2.precision || (l2 == m2 ? 5e-3 : Math.min(1, Math.abs(m2 - l2) * 1e-3));
        if (l$1.und(i2.duration))
          if (i2.decay) {
            let S2 = i2.decay === true ? 0.998 : i2.decay, A2 = Math.exp(-(1 - S2) * P2);
            c3 = l2 + h2 / (1 - S2) * (1 - A2), b2 = Math.abs(f2.lastPosition - c3) <= x2, g2 = h2 * A2;
          } else {
            g2 = f2.lastVelocity == null ? h2 : f2.lastVelocity;
            let S2 = i2.restVelocity || x2 / 10, A2 = i2.clamp ? 0 : i2.bounce, V2 = !l$1.und(A2), _2 = l2 == m2 ? f2.v0 > 0 : l2 < m2, v2, w2 = false, C2 = 1, $2 = Math.ceil(e / C2);
            for (let L2 = 0; L2 < $2 && (v2 = Math.abs(g2) > S2, !(!v2 && (b2 = Math.abs(m2 - c3) <= x2, b2))); ++L2) {
              V2 && (w2 = c3 == m2 || c3 > m2 == _2, w2 && (g2 = -g2 * A2, c3 = m2));
              let N2 = -i2.tension * 1e-6 * (c3 - m2), y3 = -i2.friction * 1e-3 * g2, T2 = (N2 + y3) / i2.mass;
              g2 = g2 + T2 * C2, c3 = c3 + g2 * C2;
            }
          }
        else {
          let S2 = 1;
          i2.duration > 0 && (this._memoizedDuration !== i2.duration && (this._memoizedDuration = i2.duration, f2.durationProgress > 0 && (f2.elapsedTime = i2.duration * f2.durationProgress, P2 = f2.elapsedTime += e)), S2 = (i2.progress || 0) + P2 / this._memoizedDuration, S2 = S2 > 1 ? 1 : S2 < 0 ? 0 : S2, f2.durationProgress = S2), c3 = l2 + i2.easing(S2) * (m2 - l2), g2 = (c3 - f2.lastPosition) / e, b2 = S2 == 1;
        }
        f2.lastVelocity = g2, Number.isNaN(c3) && (console.warn("Got NaN while animating:", this), b2 = true);
      }
      a && !a[d$12].done && (b2 = false), b2 ? f2.done = true : n2 = false, f2.setValue(c3, i2.round) && (r2 = true);
    });
    let u2 = k$1(this), p2 = u2.getValue();
    if (n2) {
      let f2 = ve(o.to);
      (p2 !== f2 || r2) && !i2.decay ? (u2.setValue(f2), this._onChange(f2)) : r2 && i2.decay && this._onChange(p2), this._stop();
    } else
      r2 && this._onChange(p2);
  }
  set(e) {
    return n.batchedUpdates(() => {
      this._stop(), this._focus(e), this._set(e);
    }), this;
  }
  pause() {
    this._update({ pause: true });
  }
  resume() {
    this._update({ pause: false });
  }
  finish() {
    if (Q(this)) {
      let { to: e, config: n$1 } = this.animation;
      n.batchedUpdates(() => {
        this._onStart(), n$1.decay || this._set(e, false), this._stop();
      });
    }
    return this;
  }
  update(e) {
    return (this.queue || (this.queue = [])).push(e), this;
  }
  start(e, n2) {
    let r2;
    return l$1.und(e) ? (r2 = this.queue || [], this.queue = []) : r2 = [l$1.obj(e) ? e : { ...n2, to: e }], Promise.all(r2.map((o) => this._update(o))).then((o) => be(this, o));
  }
  stop(e) {
    let { to: n$1 } = this.animation;
    return this._focus(this.get()), oe(this._state, e && this._lastCallId), n.batchedUpdates(() => this._stop(n$1, e)), this;
  }
  reset() {
    this._update({ reset: true });
  }
  eventObserved(e) {
    e.type == "change" ? this._start() : e.type == "priority" && (this.priority = e.priority + 1);
  }
  _prepareNode(e) {
    let n2 = this.key || "", { to: r2, from: o } = e;
    r2 = l$1.obj(r2) ? r2[n2] : r2, (r2 == null || Ee(r2)) && (r2 = void 0), o = l$1.obj(o) ? o[n2] : o, o == null && (o = void 0);
    let s = { to: r2, from: o };
    return qe(this) || (e.reverse && ([r2, o] = [o, r2]), o = ve(o), l$1.und(o) ? k$1(this) || this._set(r2) : this._set(o)), s;
  }
  _update({ ...e }, n2) {
    let { key: r2, defaultProps: o } = this;
    e.default && Object.assign(o, ne(e, (a, u2) => /^on/.test(u2) ? et(a, r2) : a)), _t(this, e, "onProps"), Ie(this, "onProps", e, this);
    let s = this._prepareNode(e);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    let i2 = this._state;
    return Me(++this._lastCallId, { key: r2, props: e, defaultProps: o, state: i2, actions: { pause: () => {
      ye(this) || (it$1(this, true), yt$1(i2.pauseQueue), Ie(this, "onPause", E(this, Ce(this, this.animation.to)), this));
    }, resume: () => {
      ye(this) && (it$1(this, false), Q(this) && this._resume(), yt$1(i2.resumeQueue), Ie(this, "onResume", E(this, Ce(this, this.animation.to)), this));
    }, start: this._merge.bind(this, s) } }).then((a) => {
      if (e.loop && a.finished && !(n2 && a.noop)) {
        let u2 = at(e);
        if (u2)
          return this._update(u2, true);
      }
      return a;
    });
  }
  _merge(e, n$1, r2) {
    if (n$1.cancel)
      return this.stop(true), r2(q$1(this));
    let o = !l$1.und(e.to), s = !l$1.und(e.from);
    if (o || s)
      if (n$1.callId > this._lastToId)
        this._lastToId = n$1.callId;
      else
        return r2(q$1(this));
    let { key: i2, defaultProps: a, animation: u2 } = this, { to: p2, from: f2 } = u2, { to: d$12 = p2, from: m2 = f2 } = e;
    s && !o && (!n$1.default || l$1.und(d$12)) && (d$12 = m2), n$1.reverse && ([d$12, m2] = [m2, d$12]);
    let b2 = !bt$1(m2, f2);
    b2 && (u2.from = m2), m2 = ve(m2);
    let c3 = !bt$1(d$12, p2);
    c3 && this._focus(d$12);
    let P2 = Ee(n$1.to), { config: l2 } = u2, { decay: h2, velocity: g2 } = l2;
    (o || s) && (l2.velocity = 0), n$1.config && !P2 && gt(l2, I$1(n$1.config, i2), n$1.config !== a.config ? I$1(a.config, i2) : void 0);
    let x2 = k$1(this);
    if (!x2 || l$1.und(d$12))
      return r2(E(this, true));
    let S2 = l$1.und(n$1.reset) ? s && !n$1.default : !l$1.und(m2) && te(n$1.reset, i2), A2 = S2 ? m2 : this.get(), V2 = me(d$12), _2 = l$1.num(V2) || l$1.arr(V2) || or(V2), v2 = !P2 && (!_2 || te(a.immediate || n$1.immediate, i2));
    if (c3) {
      let L2 = Le$1(d$12);
      if (L2 !== x2.constructor)
        if (v2)
          x2 = this._set(V2);
        else
          throw Error(`Cannot animate between ${x2.constructor.name} and ${L2.name}, as the "to" prop suggests`);
    }
    let w2 = x2.constructor, C2 = Pt(d$12), $2 = false;
    if (!C2) {
      let L2 = S2 || !qe(this) && b2;
      (c3 || L2) && ($2 = bt$1(me(A2), V2), C2 = !$2), (!bt$1(u2.immediate, v2) && !v2 || !bt$1(l2.decay, h2) || !bt$1(l2.velocity, g2)) && (C2 = true);
    }
    if ($2 && Q(this) && (u2.changed && !S2 ? C2 = true : C2 || this._stop(p2)), !P2 && ((C2 || Pt(p2)) && (u2.values = x2.getPayload(), u2.toValues = Pt(d$12) ? null : w2 == d ? [1] : ht$1(V2)), u2.immediate != v2 && (u2.immediate = v2, !v2 && !S2 && this._set(p2)), C2)) {
      let { onRest: L2 } = u2;
      Ve(_n, (y3) => _t(this, n$1, y3));
      let N2 = E(this, Ce(this, p2));
      yt$1(this._pendingCalls, N2), this._pendingCalls.add(r2), u2.changed && n.batchedUpdates(() => {
        u2.changed = !S2, L2?.(N2, this), S2 ? I$1(a.onRest, N2) : u2.onStart?.(N2, this);
      });
    }
    S2 && this._set(A2), P2 ? r2(De(n$1.to, n$1, this._state, this)) : C2 ? this._start() : Q(this) && !c3 ? this._pendingCalls.add(r2) : r2(nt(A2));
  }
  _focus(e) {
    let n2 = this.animation;
    e !== n2.to && (qt(this) && this._detach(), n2.to = e, qt(this) && this._attach());
  }
  _attach() {
    let e = 0, { to: n2 } = this.animation;
    Pt(n2) && (Gt$1(n2, this), Re(n2) && (e = n2.priority + 1)), this.priority = e;
  }
  _detach() {
    let { to: e } = this.animation;
    Pt(e) && Qt(e, this);
  }
  _set(e, n$1 = true) {
    let r2 = ve(e);
    if (!l$1.und(r2)) {
      let o = k$1(this);
      if (!o || !bt$1(r2, o.getValue())) {
        let s = Le$1(r2);
        !o || o.constructor != s ? D(this, s.create(r2)) : o.setValue(r2), o && n.batchedUpdates(() => {
          this._onChange(r2, n$1);
        });
      }
    }
    return k$1(this);
  }
  _onStart() {
    let e = this.animation;
    e.changed || (e.changed = true, Ie(this, "onStart", E(this, Ce(this, e.to)), this));
  }
  _onChange(e, n2) {
    n2 || (this._onStart(), I$1(this.animation.onChange, e, this)), I$1(this.defaultProps.onChange, e, this), super._onChange(e, n2);
  }
  _start() {
    let e = this.animation;
    k$1(this).reset(ve(e.to)), e.immediate || (e.fromValues = e.values.map((n2) => n2.lastPosition)), Q(this) || (st(this, true), ye(this) || this._resume());
  }
  _resume() {
    p.skipAnimation ? this.finish() : qe$1.start(this);
  }
  _stop(e, n2) {
    if (Q(this)) {
      st(this, false);
      let r2 = this.animation;
      Ve(r2.values, (s) => {
        s.done = true;
      }), r2.toValues && (r2.onChange = r2.onPause = r2.onResume = void 0), $t(this, { type: "idle", parent: this });
      let o = n2 ? q$1(this.get()) : E(this.get(), Ce(this, e ?? r2.to));
      yt$1(this._pendingCalls, o), r2.changed && (r2.changed = false, Ie(this, "onRest", o, this));
    }
  }
};
function Ce(t, e) {
  let n2 = me(e), r2 = me(t.get());
  return bt$1(r2, n2);
}
function at(t, e = t.loop, n2 = t.to) {
  let r2 = I$1(e);
  if (r2) {
    let o = r2 !== true && de(r2), s = (o || t).reverse, i2 = !o || o.reset;
    return Pe({ ...t, loop: e, default: false, pause: void 0, to: !s || Ee(n2) ? n2 : void 0, from: i2 ? t.from : void 0, reset: i2, ...o });
  }
}
function Pe(t) {
  let { to: e, from: n2 } = t = de(t), r2 = /* @__PURE__ */ new Set();
  return l$1.obj(e) && Vt(e, r2), l$1.obj(n2) && Vt(n2, r2), t.keys = r2.size ? Array.from(r2) : null, t;
}
function Ot(t) {
  let e = Pe(t);
  return l$1.und(e.default) && (e.default = ne(e)), e;
}
function Vt(t, e) {
  xt(t, (n2, r2) => n2 != null && e.add(r2));
}
var _n = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function _t(t, e, n2) {
  t.animation[n2] = e[n2] !== ke(e, n2) ? et(e[n2], t.key) : void 0;
}
function Ie(t, e, ...n2) {
  t.animation[e]?.(...n2), t.defaultProps[e]?.(...n2);
}
var Fn = ["onStart", "onChange", "onRest"], kn = 1, le = class {
  id = kn++;
  springs = {};
  queue = [];
  ref;
  _flush;
  _initialProps;
  _lastAsyncId = 0;
  _active = /* @__PURE__ */ new Set();
  _changed = /* @__PURE__ */ new Set();
  _started = false;
  _item;
  _state = { paused: false, pauseQueue: /* @__PURE__ */ new Set(), resumeQueue: /* @__PURE__ */ new Set(), timeouts: /* @__PURE__ */ new Set() };
  _events = { onStart: /* @__PURE__ */ new Map(), onChange: /* @__PURE__ */ new Map(), onRest: /* @__PURE__ */ new Map() };
  constructor(e, n2) {
    this._onFrame = this._onFrame.bind(this), n2 && (this._flush = n2), e && this.start({ default: true, ...e });
  }
  get idle() {
    return !this._state.asyncTo && Object.values(this.springs).every((e) => e.idle && !e.isDelayed && !e.isPaused);
  }
  get item() {
    return this._item;
  }
  set item(e) {
    this._item = e;
  }
  get() {
    let e = {};
    return this.each((n2, r2) => e[r2] = n2.get()), e;
  }
  set(e) {
    for (let n2 in e) {
      let r2 = e[n2];
      l$1.und(r2) || this.springs[n2].set(r2);
    }
  }
  update(e) {
    return e && this.queue.push(Pe(e)), this;
  }
  start(e) {
    let { queue: n2 } = this;
    return e ? n2 = ht$1(e).map(Pe) : this.queue = [], this._flush ? this._flush(this, n2) : (jt(this, n2), ze(this, n2));
  }
  stop(e, n2) {
    if (e !== !!e && (n2 = e), n2) {
      let r2 = this.springs;
      Ve(ht$1(n2), (o) => r2[o].stop(!!e));
    } else
      oe(this._state, this._lastAsyncId), this.each((r2) => r2.stop(!!e));
    return this;
  }
  pause(e) {
    if (l$1.und(e))
      this.start({ pause: true });
    else {
      let n2 = this.springs;
      Ve(ht$1(e), (r2) => n2[r2].pause());
    }
    return this;
  }
  resume(e) {
    if (l$1.und(e))
      this.start({ pause: false });
    else {
      let n2 = this.springs;
      Ve(ht$1(e), (r2) => n2[r2].resume());
    }
    return this;
  }
  each(e) {
    xt(this.springs, e);
  }
  _onFrame() {
    let { onStart: e, onChange: n2, onRest: r2 } = this._events, o = this._active.size > 0, s = this._changed.size > 0;
    (o && !this._started || s && !this._started) && (this._started = true, Pe$1(e, ([u2, p2]) => {
      p2.value = this.get(), u2(p2, this, this._item);
    }));
    let i2 = !o && this._started, a = s || i2 && r2.size ? this.get() : null;
    s && n2.size && Pe$1(n2, ([u2, p2]) => {
      p2.value = a, u2(p2, this, this._item);
    }), i2 && (this._started = false, Pe$1(r2, ([u2, p2]) => {
      p2.value = a, u2(p2, this, this._item);
    }));
  }
  eventObserved(e) {
    if (e.type == "change")
      this._changed.add(e.parent), e.idle || this._active.add(e.parent);
    else if (e.type == "idle")
      this._active.delete(e.parent);
    else
      return;
    n.onFrame(this._onFrame);
  }
};
function ze(t, e) {
  return Promise.all(e.map((n2) => wt(t, n2))).then((n2) => be(t, n2));
}
async function wt(t, e, n$1) {
  let { keys: r2, to: o, from: s, loop: i2, onRest: a, onResolve: u2 } = e, p2 = l$1.obj(e.default) && e.default;
  i2 && (e.loop = false), o === false && (e.to = null), s === false && (e.from = null);
  let f2 = l$1.arr(o) || l$1.fun(o) ? o : void 0;
  f2 ? (e.to = void 0, e.onRest = void 0, p2 && (p2.onRest = void 0)) : Ve(Fn, (P2) => {
    let l2 = e[P2];
    if (l$1.fun(l2)) {
      let h2 = t._events[P2];
      e[P2] = ({ finished: g2, cancelled: x2 }) => {
        let S2 = h2.get(l2);
        S2 ? (g2 || (S2.finished = false), x2 && (S2.cancelled = true)) : h2.set(l2, { value: null, finished: g2 || false, cancelled: x2 || false });
      }, p2 && (p2[P2] = e[P2]);
    }
  });
  let d2 = t._state;
  e.pause === !d2.paused ? (d2.paused = e.pause, yt$1(e.pause ? d2.pauseQueue : d2.resumeQueue)) : d2.paused && (e.pause = true);
  let m2 = (r2 || Object.keys(t.springs)).map((P2) => t.springs[P2].start(e)), b2 = e.cancel === true || ke(e, "cancel") === true;
  (f2 || b2 && d2.asyncId) && m2.push(Me(++t._lastAsyncId, { props: e, state: d2, actions: { pause: Y, resume: Y, start(P2, l2) {
    b2 ? (oe(d2, t._lastAsyncId), l2(q$1(t))) : (P2.onRest = a, l2(De(f2, P2, d2, t)));
  } } })), d2.paused && await new Promise((P2) => {
    d2.resumeQueue.add(P2);
  });
  let c3 = be(t, await Promise.all(m2));
  if (i2 && c3.finished && !(n$1 && c3.noop)) {
    let P2 = at(e, i2, o);
    if (P2)
      return jt(t, [P2]), wt(t, P2, true);
  }
  return u2 && n.batchedUpdates(() => u2(c3, t, t.item)), c3;
}
function _e(t, e) {
  let n2 = { ...t.springs };
  return e && Ve(ht$1(e), (r2) => {
    l$1.und(r2.keys) && (r2 = Pe(r2)), l$1.obj(r2.to) || (r2 = { ...r2, to: void 0 }), Mt(n2, r2, (o) => Lt(o));
  }), pt(t, n2), n2;
}
function pt(t, e) {
  xt(e, (n2, r2) => {
    t.springs[r2] || (t.springs[r2] = n2, Gt$1(n2, t));
  });
}
function Lt(t, e) {
  let n2 = new ue();
  return n2.key = t, e && Gt$1(n2, e), n2;
}
function Mt(t, e, n2) {
  e.keys && Ve(e.keys, (r2) => {
    (t[r2] || (t[r2] = n2(r2)))._prepareNode(e);
  });
}
function jt(t, e) {
  Ve(e, (n2) => {
    Mt(t.springs, n2, (r2) => Lt(r2, t));
  });
}
var H = ({ children: t, ...e }) => {
  let n2 = reactExports.useContext(Ge), r2 = e.pause || !!n2.pause, o = e.immediate || !!n2.immediate;
  e = Lr(() => ({ pause: r2, immediate: o }), [r2, o]);
  let { Provider: s } = Ge;
  return reactExports.createElement(s, { value: e }, t);
}, Ge = wn(H, {});
H.Provider = Ge.Provider;
H.Consumer = Ge.Consumer;
function wn(t, e) {
  return Object.assign(t, reactExports.createContext(e)), t.Provider._context = t, t.Consumer._context = t, t;
}
var fe = () => {
  let t = [], e = function(r2) {
    er$1();
    let o = [];
    return Ve(t, (s, i2) => {
      if (l$1.und(r2))
        o.push(s.start());
      else {
        let a = n2(r2, s, i2);
        a && o.push(s.start(a));
      }
    }), o;
  };
  e.current = t, e.add = function(r2) {
    t.includes(r2) || t.push(r2);
  }, e.delete = function(r2) {
    let o = t.indexOf(r2);
    ~o && t.splice(o, 1);
  }, e.pause = function() {
    return Ve(t, (r2) => r2.pause(...arguments)), this;
  }, e.resume = function() {
    return Ve(t, (r2) => r2.resume(...arguments)), this;
  }, e.set = function(r2) {
    Ve(t, (o, s) => {
      let i2 = l$1.fun(r2) ? r2(s, o) : r2;
      i2 && o.set(i2);
    });
  }, e.start = function(r2) {
    let o = [];
    return Ve(t, (s, i2) => {
      if (l$1.und(r2))
        o.push(s.start());
      else {
        let a = this._getProps(r2, s, i2);
        a && o.push(s.start(a));
      }
    }), o;
  }, e.stop = function() {
    return Ve(t, (r2) => r2.stop(...arguments)), this;
  }, e.update = function(r2) {
    return Ve(t, (o, s) => o.update(this._getProps(r2, o, s))), this;
  };
  let n2 = function(r2, o, s) {
    return l$1.fun(r2) ? r2(s, o) : r2;
  };
  return e._getProps = n2, e;
};
function He(t, e, n2) {
  let r2 = l$1.fun(e) && e;
  r2 && !n2 && (n2 = []);
  let o = reactExports.useMemo(() => r2 || arguments.length == 3 ? fe() : void 0, []), s = reactExports.useRef(0), i2 = Mr(), a = reactExports.useMemo(() => ({ ctrls: [], queue: [], flush(h2, g2) {
    let x2 = _e(h2, g2);
    return s.current > 0 && !a.queue.length && !Object.keys(x2).some((A2) => !h2.springs[A2]) ? ze(h2, g2) : new Promise((A2) => {
      pt(h2, x2), a.queue.push(() => {
        A2(ze(h2, g2));
      }), i2();
    });
  } }), []), u2 = reactExports.useRef([...a.ctrls]), p2 = [], f2 = Ur(t) || 0;
  reactExports.useMemo(() => {
    Ve(u2.current.slice(t, f2), (h2) => {
      xe(h2, o), h2.stop(true);
    }), u2.current.length = t, d2(f2, t);
  }, [t]), reactExports.useMemo(() => {
    d2(0, Math.min(f2, t));
  }, n2);
  function d2(h2, g2) {
    for (let x2 = h2; x2 < g2; x2++) {
      let S2 = u2.current[x2] || (u2.current[x2] = new le(null, a.flush)), A2 = r2 ? r2(x2, S2) : e[x2];
      A2 && (p2[x2] = Ot(A2));
    }
  }
  let m2 = u2.current.map((h2, g2) => _e(h2, p2[g2])), b2 = reactExports.useContext(H), c3 = Ur(b2), P2 = b2 !== c3 && Ue(b2);
  Q$1(() => {
    s.current++, a.ctrls = u2.current;
    let { queue: h2 } = a;
    h2.length && (a.queue = [], Ve(h2, (g2) => g2())), Ve(u2.current, (g2, x2) => {
      o?.add(g2), P2 && g2.start({ default: b2 });
      let S2 = p2[x2];
      S2 && (he(g2, S2.ref), g2.ref ? g2.queue.push(S2) : g2.start(S2));
    });
  }), $r(() => () => {
    Ve(a.ctrls, (h2) => h2.stop(true));
  });
  let l2 = m2.map((h2) => ({ ...h2 }));
  return o ? [l2, o] : l2;
}
function J(t, e) {
  let n2 = l$1.fun(t), [[r2], o] = He(1, n2 ? t : [t], n2 ? e || [] : e);
  return n2 || arguments.length == 2 ? [r2, o] : r2;
}
function Gt(t, e, n2) {
  let r2 = l$1.fun(e) && e, { reset: o, sort: s, trail: i2 = 0, expires: a = true, exitBeforeEnter: u2 = false, onDestroyed: p2, ref: f2, config: d2 } = r2 ? r2() : e, m2 = reactExports.useMemo(() => r2 || arguments.length == 3 ? fe() : void 0, []), b2 = ht$1(t), c3 = [], P2 = reactExports.useRef(null), l2 = o ? null : P2.current;
  Q$1(() => {
    P2.current = c3;
  }), $r(() => (Ve(c3, (y3) => {
    m2?.add(y3.ctrl), y3.ctrl.ref = m2;
  }), () => {
    Ve(P2.current, (y3) => {
      y3.expired && clearTimeout(y3.expirationId), xe(y3.ctrl, m2), y3.ctrl.stop(true);
    });
  }));
  let h2 = tr(b2, r2 ? r2() : e, l2), g2 = o && P2.current || [];
  Q$1(() => Ve(g2, ({ ctrl: y3, item: T2, key: F2 }) => {
    xe(y3, m2), I$1(p2, T2, F2);
  }));
  let x2 = [];
  if (l2 && Ve(l2, (y3, T2) => {
    y3.expired ? (clearTimeout(y3.expirationId), g2.push(y3)) : (T2 = x2[T2] = h2.indexOf(y3.key), ~T2 && (c3[T2] = y3));
  }), Ve(b2, (y3, T2) => {
    c3[T2] || (c3[T2] = { key: h2[T2], item: y3, phase: "mount", ctrl: new le() }, c3[T2].ctrl.item = y3);
  }), x2.length) {
    let y3 = -1, { leave: T2 } = r2 ? r2() : e;
    Ve(x2, (F2, k2) => {
      let O2 = l2[k2];
      ~F2 ? (y3 = c3.indexOf(O2), c3[y3] = { ...O2, item: b2[F2] }) : T2 && c3.splice(++y3, 0, O2);
    });
  }
  l$1.fun(s) && c3.sort((y3, T2) => s(y3.item, T2.item));
  let S2 = -i2, A2 = Mr(), V2 = ne(e), _2 = /* @__PURE__ */ new Map(), v2 = reactExports.useRef(/* @__PURE__ */ new Map()), w2 = reactExports.useRef(false);
  Ve(c3, (y3, T2) => {
    let F2 = y3.key, k2 = y3.phase, O2 = r2 ? r2() : e, U2, D2, Jt2 = I$1(O2.delay || 0, F2);
    if (k2 == "mount")
      U2 = O2.enter, D2 = "enter";
    else {
      let M2 = h2.indexOf(F2) < 0;
      if (k2 != "leave")
        if (M2)
          U2 = O2.leave, D2 = "leave";
        else if (U2 = O2.update)
          D2 = "update";
        else
          return;
      else if (!M2)
        U2 = O2.enter, D2 = "enter";
      else
        return;
    }
    if (U2 = I$1(U2, y3.item, T2), U2 = l$1.obj(U2) ? de(U2) : { to: U2 }, !U2.config) {
      let M2 = d2 || V2.config;
      U2.config = I$1(M2, y3.item, T2, D2);
    }
    S2 += i2;
    let Z2 = { ...V2, delay: Jt2 + S2, ref: f2, immediate: O2.immediate, reset: false, ...U2 };
    if (D2 == "enter" && l$1.und(Z2.from)) {
      let M2 = r2 ? r2() : e, Te2 = l$1.und(M2.initial) || l2 ? M2.from : M2.initial;
      Z2.from = I$1(Te2, y3.item, T2);
    }
    let { onResolve: Wt } = Z2;
    Z2.onResolve = (M2) => {
      I$1(Wt, M2);
      let Te2 = P2.current, B2 = Te2.find((Fe) => Fe.key === F2);
      if (B2 && !(M2.cancelled && B2.phase != "update") && B2.ctrl.idle) {
        let Fe = Te2.every((ee2) => ee2.ctrl.idle);
        if (B2.phase == "leave") {
          let ee2 = I$1(a, B2.item);
          if (ee2 !== false) {
            let Ze = ee2 === true ? 0 : ee2;
            if (B2.expired = true, !Fe && Ze > 0) {
              Ze <= 2147483647 && (B2.expirationId = setTimeout(A2, Ze));
              return;
            }
          }
        }
        Fe && Te2.some((ee2) => ee2.expired) && (v2.current.delete(B2), u2 && (w2.current = true), A2());
      }
    };
    let ft = _e(y3.ctrl, Z2);
    D2 === "leave" && u2 ? v2.current.set(y3, { phase: D2, springs: ft, payload: Z2 }) : _2.set(y3, { phase: D2, springs: ft, payload: Z2 });
  });
  let C2 = reactExports.useContext(H), $2 = Ur(C2), L2 = C2 !== $2 && Ue(C2);
  Q$1(() => {
    L2 && Ve(c3, (y3) => {
      y3.ctrl.start({ default: C2 });
    });
  }, [C2]), Ve(_2, (y3, T2) => {
    if (v2.current.size) {
      let F2 = c3.findIndex((k2) => k2.key === T2.key);
      c3.splice(F2, 1);
    }
  }), Q$1(() => {
    Ve(v2.current.size ? v2.current : _2, ({ phase: y3, payload: T2 }, F2) => {
      let { ctrl: k2 } = F2;
      F2.phase = y3, m2?.add(k2), L2 && y3 == "enter" && k2.start({ default: C2 }), T2 && (he(k2, T2.ref), (k2.ref || m2) && !w2.current ? k2.update(T2) : (k2.start(T2), w2.current && (w2.current = false)));
    });
  }, o ? void 0 : n2);
  let N2 = (y3) => reactExports.createElement(reactExports.Fragment, null, c3.map((T2, F2) => {
    let { springs: k2 } = _2.get(T2) || T2.ctrl, O2 = y3({ ...k2 }, T2.item, T2, F2);
    return O2 && O2.type ? reactExports.createElement(O2.type, { ...O2.props, key: l$1.str(T2.key) || l$1.num(T2.key) ? T2.key : T2.ctrl.id, ref: O2.ref }) : O2;
  }));
  return m2 ? [N2, m2] : N2;
}
var er = 1;
function tr(t, { key: e, keys: n2 = e }, r2) {
  if (n2 === null) {
    let o = /* @__PURE__ */ new Set();
    return t.map((s) => {
      let i2 = r2 && r2.find((a) => a.item === s && a.phase !== "leave" && !o.has(a));
      return i2 ? (o.add(i2), i2.key) : er++;
    });
  }
  return l$1.und(n2) ? t : l$1.fun(n2) ? t.map(n2) : ht$1(n2);
}
var W = class extends X {
  constructor(n2, r2) {
    super();
    this.source = n2;
    this.calc = W$1(...r2);
    let o = this._get(), s = Le$1(o);
    D(this, s.create(o));
  }
  key;
  idle = true;
  calc;
  _active = /* @__PURE__ */ new Set();
  advance(n2) {
    let r2 = this._get(), o = this.get();
    bt$1(r2, o) || (k$1(this).setValue(r2), this._onChange(r2, this.idle)), !this.idle && Yt(this._active) && ct(this);
  }
  _get() {
    let n2 = l$1.arr(this.source) ? this.source.map(ve) : ht$1(ve(this.source));
    return this.calc(...n2);
  }
  _start() {
    this.idle && !Yt(this._active) && (this.idle = false, Ve(F$1(this), (n2) => {
      n2.done = false;
    }), p.skipAnimation ? (n.batchedUpdates(() => this.advance()), ct(this)) : qe$1.start(this));
  }
  _attach() {
    let n2 = 1;
    Ve(ht$1(this.source), (r2) => {
      Pt(r2) && Gt$1(r2, this), Re(r2) && (r2.idle || this._active.add(r2), n2 = Math.max(n2, r2.priority + 1));
    }), this.priority = n2, this._start();
  }
  _detach() {
    Ve(ht$1(this.source), (n2) => {
      Pt(n2) && Qt(n2, this);
    }), this._active.clear(), ct(this);
  }
  eventObserved(n2) {
    n2.type == "change" ? n2.idle ? this.advance() : (this._active.add(n2.parent), this._start()) : n2.type == "idle" ? this._active.delete(n2.parent) : n2.type == "priority" && (this.priority = ht$1(this.source).reduce((r2, o) => Math.max(r2, (Re(o) ? o.priority : 0) + 1), 0));
  }
};
function vr(t) {
  return t.idle !== false;
}
function Yt(t) {
  return !t.size || Array.from(t).every(vr);
}
function ct(t) {
  t.idle || (t.idle = true, Ve(F$1(t), (e) => {
    e.done = true;
  }), $t(t, { type: "idle", parent: t }));
}
p.assign({ createStringInterpolator: Xt, to: (t, e) => new W(t, e) });
var k = /^--/;
function I(t, e) {
  return e == null || typeof e == "boolean" || e === "" ? "" : typeof e == "number" && e !== 0 && !k.test(t) && !(c2.hasOwnProperty(t) && c2[t]) ? e + "px" : ("" + e).trim();
}
var v = {};
function V(t, e) {
  if (!t.nodeType || !t.setAttribute)
    return false;
  let r2 = t.nodeName === "filter" || t.parentNode && t.parentNode.nodeName === "filter", { style: i2, children: s, scrollTop: u2, scrollLeft: l2, viewBox: a, ...n2 } = e, d2 = Object.values(n2), m2 = Object.keys(n2).map((o) => r2 || t.hasAttribute(o) ? o : v[o] || (v[o] = o.replace(/([A-Z])/g, (p2) => "-" + p2.toLowerCase())));
  s !== void 0 && (t.textContent = s);
  for (let o in i2)
    if (i2.hasOwnProperty(o)) {
      let p2 = I(o, i2[o]);
      k.test(o) ? t.style.setProperty(o, p2) : t.style[o] = p2;
    }
  m2.forEach((o, p2) => {
    t.setAttribute(o, d2[p2]);
  }), u2 !== void 0 && (t.scrollTop = u2), l2 !== void 0 && (t.scrollLeft = l2), a !== void 0 && t.setAttribute("viewBox", a);
}
var c2 = { animationIterationCount: true, borderImageOutset: true, borderImageSlice: true, borderImageWidth: true, boxFlex: true, boxFlexGroup: true, boxOrdinalGroup: true, columnCount: true, columns: true, flex: true, flexGrow: true, flexPositive: true, flexShrink: true, flexNegative: true, flexOrder: true, gridRow: true, gridRowEnd: true, gridRowSpan: true, gridRowStart: true, gridColumn: true, gridColumnEnd: true, gridColumnSpan: true, gridColumnStart: true, fontWeight: true, lineClamp: true, lineHeight: true, opacity: true, order: true, orphans: true, tabSize: true, widows: true, zIndex: true, zoom: true, fillOpacity: true, floodOpacity: true, stopOpacity: true, strokeDasharray: true, strokeDashoffset: true, strokeMiterlimit: true, strokeOpacity: true, strokeWidth: true }, F = (t, e) => t + e.charAt(0).toUpperCase() + e.substring(1), L = ["Webkit", "Ms", "Moz", "O"];
c2 = Object.keys(c2).reduce((t, e) => (L.forEach((r2) => t[F(r2, e)] = t[e]), t), c2);
var _ = /^(matrix|translate|scale|rotate|skew)/, $ = /^(translate)/, G = /^(rotate|skew)/, y2 = (t, e) => l$1.num(t) && t !== 0 ? t + e : t, h = (t, e) => l$1.arr(t) ? t.every((r2) => h(r2, e)) : l$1.num(t) ? t === e : parseFloat(t) === e, g = class extends u {
  constructor({ x: e, y: r2, z: i2, ...s }) {
    let u2 = [], l2 = [];
    (e || r2 || i2) && (u2.push([e || 0, r2 || 0, i2 || 0]), l2.push((a) => [`translate3d(${a.map((n2) => y2(n2, "px")).join(",")})`, h(a, 0)])), xt(s, (a, n2) => {
      if (n2 === "transform")
        u2.push([a || ""]), l2.push((d2) => [d2, d2 === ""]);
      else if (_.test(n2)) {
        if (delete s[n2], l$1.und(a))
          return;
        let d2 = $.test(n2) ? "px" : G.test(n2) ? "deg" : "";
        u2.push(ht$1(a)), l2.push(n2 === "rotate3d" ? ([m2, o, p2, O2]) => [`rotate3d(${m2},${o},${p2},${y2(O2, d2)})`, h(O2, 0)] : (m2) => [`${n2}(${m2.map((o) => y2(o, d2)).join(",")})`, h(m2, n2.startsWith("scale") ? 1 : 0)]);
      }
    }), u2.length && (s.transform = new x(u2, l2)), super(s);
  }
}, x = class extends ge {
  constructor(r2, i2) {
    super();
    this.inputs = r2;
    this.transforms = i2;
  }
  _value = null;
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let r2 = "", i2 = true;
    return Ve(this.inputs, (s, u2) => {
      let l2 = ve(s[0]), [a, n2] = this.transforms[u2](l$1.arr(l2) ? l2 : s.map(ve));
      r2 += " " + a, i2 = i2 && n2;
    }), i2 ? "none" : r2;
  }
  observerAdded(r2) {
    r2 == 1 && Ve(this.inputs, (i2) => Ve(i2, (s) => Pt(s) && Gt$1(s, this)));
  }
  observerRemoved(r2) {
    r2 == 0 && Ve(this.inputs, (i2) => Ve(i2, (s) => Pt(s) && Qt(s, this)));
  }
  eventObserved(r2) {
    r2.type == "change" && (this._value = null), $t(this, r2);
  }
};
var C = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"];
p.assign({ batchedUpdates: reactDomExports.unstable_batchedUpdates, createStringInterpolator: Xt, colors: It });
var q = Ke(C, { applyAnimatedValues: V, createAnimatedStyle: (t) => new g(t), getComponentProps: ({ scrollTop: t, scrollLeft: e, ...r2 }) => r2 }), it = q.animated;
function UserContext() {
  return reactExports.useContext(RootContext);
}
export {
  Gt as G,
  J,
  UserContext as U,
  it as i
};
