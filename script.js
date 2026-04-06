( () => {
    function I(t, n="320px") {
        let e = document.getElementById(t);
        return e instanceof HTMLDivElement ? (Object.assign(e.style, a),
        e) : null
    }
    var a = {}, h = [], w, E, D, O, y, q, b, v, H, S, U, N, R, P, K = ["#522", "#622", "#722", "#822", "#922", "#a22", "#b22", "#c22", "#d22", "#e22", "#f22", "#f44", "#f66", "#f88", "#faa", "#fcc"], k = [], W;
    function z(t, n={}) {
        let e = document.createElement("div");
        e.className = "panel",
        Object.assign(e.style, n);
        let l = document.createElement("canvas");
        return l.id = t,
        l.style.width = "100%",
        l.style.height = "100%",
        l.style.border = "1px solid var(--muted-border)",
        l.style.display = "block",
        e.append(l),
        e
    }
    function V(t) {
        let n = t.getBoundingClientRect()
          , e = window.devicePixelRatio || 1;
        t.width = n.width * e,
        t.height = n.height * e,
        t.getContext("2d").scale(e, e)
    }
    function M(t) {
        let n = document.getElementById(t);
        if (!(n instanceof HTMLCanvasElement))
            return null;
        let e = n.getBoundingClientRect()
          , l = e.width
          , i = e.height;
        n.getContext("2d").clearRect(0, 0, l, i)
    }
    function B(t, n, e={}, l=_) {
        let i = document.createElement("div");
        i.className = "panel",
        Object.assign(i.style, e);
        let o = 0;
        for (let c of t) {
            let s = document.createElement("button");
            s.id = c,
            s.disabled = !n[o],
            s.innerHTML = c,
            e.flexDirection == "row" && (s.style.flex = "1"),
            i.append(s),
            o += 1
        }
        return i.addEventListener("click", c => {
            l(c)
        }
        ),
        i
    }
    function r(t, n) {
        let e = document.getElementById(t);
        e.disabled = !n
    }
    function _(t) {
        let n = t.target.closest("button");
        if (n.innerHTML == "wipe-1" && (document.getElementById("params-1").value = "",
        document.getElementById("grid").value = "",
        r("read-1", !1),
        r("exec-1", !1),
        r("data-2", !1),
        r("read-2", !1),
        r("exec-2", !1),
        M("map-2"),
        r("data-3", !1),
        r("read-3", !1),
        r("exec-3", !1),
        M("map-3")),
        n.innerHTML == "data-1") {
            let e = "";
            e += `COLS 9
`,
            e += `ROWS 11
`,
            e += `UMIN 0.20
`,
            e += `UMAX 0.70
`,
            e += `UNUM 11
`,
            e += "SEPC ;",
            document.getElementById("params-1").value = e,
            r("read-1", !0)
        }
        if (n.innerHTML == "read-1") {
            let e = document.getElementById("params-1").value;
            q = f(e, "SEPC"),
            w = f(e, "ROWS", "int"),
            E = f(e, "COLS", "int"),
            D = f(e, "UMIN", "float"),
            O = f(e, "UMAX", "float"),
            y = f(e, "UNUM", "int"),
            r("exec-1", !0),
            r("data-2", !0),
            r("data-3", !0)
        }
        if (n.innerHTML == "exec-1") {
            let e = (O - D) / (y - 1);
            h = [],
            text = "";
            for (let l = 0; l < w; l++) {
                let i = [];
                for (let o = 0; o < E; o++) {
                    let c = Math.floor(Math.random() * y);
                    i.push(c);
                    let s = D + e * c;
                    text += s.toFixed(2).slice(1),
                    o < E - 1 && (text += ";")
                }
                l < w - 1 && (text += `
`),
                h.push(i)
            }
            document.getElementById("grid").value = text
        }
        if (n.innerHTML == "wipe-2" && (document.getElementById("params-2").value = "",
        M("map-2"),
        r("data-2", !1),
        r("read-2", !1),
        r("exec-2", !1)),
        n.innerHTML == "data-2") {
            let e = "";
            e += "CNUM " + y + `
`;
            for (let l = 0; l < y; l++)
                e += "CL" + A(l, 2) + " " + K[l],
                l < y - 1 && (e += `
`);
            document.getElementById("params-2").value = e,
            r("read-2", !0)
        }
        if (n.innerHTML == "read-2") {
            let e = document.getElementById("params-2").value;
            W = f(e, "CNUM"),
            k = [];
            for (let l = 0; l < W; l++) {
                let i = "CL" + A(l, 2)
                  , o = f(e, i);
                o != null && k.push(o)
            }
            r("exec-2", !0)
        }
        if (n.innerHTML == "exec-2" && X("map-2", h),
        n.innerHTML == "wipe-3" && (document.getElementById("params-3").value = "",
        M("map-3"),
        r("data-3", !1),
        r("read-3", !1),
        r("exec-3", !1)),
        n.innerHTML == "data-3") {
            let e = "";
            e += `XMIN 0
`,
            e += `YMIN 0
`,
            e += "XMAX " + E + `
`,
            e += "YMAX " + w,
            document.getElementById("params-3").value = e,
            r("read-3", !0)
        }
        if (n.innerHTML == "read-3") {
            let e = document.getElementById("params-3").value;
            b = f(e, "XMIN"),
            v = f(e, "YMIN"),
            H = f(e, "XMAX"),
            S = f(e, "YMAX"),
            r("exec-3", !0)
        }
        n.innerHTML == "exec-3" && (U = Math.floor(Math.random() * (H - b) + b),
        N = Math.floor(Math.random() * (S - v) + v),
        R = Math.floor(Math.random() * (H - b) + b),
        P = Math.floor(Math.random() * (S - v) + v),
        M("map-3"),
        X("map-3", h),
        F("map-3", h, [U, N], "#8f8"),
        F("map-3", h, [R, P], "#88f"))
    }
    function A(t, n) {
        return String(t).padStart(2, "0")
    }
    function f(t, n, e="string") {
        let l = t.split(`
`)
          , i = null;
        for (let o of l)
            if (o.indexOf(n) == 0)
                return i = o.split(" ")[1],
                e == "float" ? parseFloat(i) : e == "int" ? parseInt(i) : i
    }
    function X(t, n) {
        let e = document.getElementById(t);
        if (!(e instanceof HTMLCanvasElement))
            return null;
        let l = e.getBoundingClientRect()
          , i = l.width
          , o = l.height
          , c = n.length
          , s = n[0].length
          , x = i / s
          , g = o / c
          , d = e.getContext("2d");
        for (let p = 0; p < c; p++)
            for (let u = 0; u < s; u++) {
                let T = n[p][u];
                d.beginPath(),
                d.fillStyle = k[T],
                d.rect(u * x, p * g, x, g),
                d.fill(),
                d.beginPath(),
                d.lineWidth = "0.2",
                d.strokeStyle = "#888",
                d.rect(u * x, p * g, x, g),
                d.stroke()
            }
    }
    function F(t, n, e, l) {
        let i = document.getElementById(t);
        if (!(i instanceof HTMLCanvasElement))
            return null;
        let o = i.getBoundingClientRect()
          , c = o.width
          , s = o.height
          , x = n.length
          , g = n[0].length
          , d = c / g
          , p = s / x
          , u = i.getContext("2d")
          , T = e[0]
          , Y = e[1];
        u.beginPath(),
        u.fillStyle = l,
        u.rect(T * d, Y * p, d, p),
        u.fill()
    }
    function C(t, n={}) {
        let e = document.createElement("div");
        e.className = "panel",
        Object.assign(e.style, n);
        for (let l of t) {
            let i = document.createElement("textarea");
            i.id = l,
            i.placeholder = l,
            i.style.flex = "1",
            i.style.fontFamily = "monospace",
            i.style.fontSize = "9px",
            i.style.border = "1px solid var(--muted-border)",
            i.style.minWidth = "0",
            i.style.boxSizing = "border-box",
            i.style.resize = "none",
            i.style.overflow = "auto",
            i.style.whiteSpace = "nowrap",
            e.append(i)
        }
        return e
    }
    function L(t) {
        let n = t.querySelectorAll("canvas");
        for (let e of n)
            V(e)
    }
    function m(t, n, e) {
        let l = t.querySelectorAll(n)
          , i = Math.min(l.length, e.length);
        for (let o = 0; o < i; o++)
            l[o].style.flex = e[o]
    }
    function G() {
        let t = document.createElement("div");
        a = {
            border: "0px solid #f44",
            height: "100%",
            display: "flex",
            flexDirection: "row"
        },
        Object.assign(t.style, a),
        a = {
            display: "flex",
            flexDirection: "row",
            minWidth: "0"
        };
        let e = C(["params-1"], a);
        m(e, "textarea", [1]),
        a = {
            display: "flex",
            flexDirection: "column",
            height: "40%",
            minHeight: "0"
        };
        let o = B(["wipe-1", "data-1", "read-1", "exec-1"], [!0, !0, !1, !1], a);
        a = {
            display: "flex",
            flexDirection: "row",
            minWidth: "0"
        };
        let s = C(["grid"], a);
        return m(s, "textarea", [1]),
        t.append(e),
        t.append(o),
        t.append(s),
        m(t, "div.panel", [1.5, 1.3, 4]),
        t
    }
    function J() {
        let t = document.createElement("div");
        a = {
            border: "0px solid #f44",
            height: "100%",
            display: "flex",
            flexDirection: "row"
        },
        Object.assign(t.style, a),
        a = {
            display: "flex",
            flexDirection: "row",
            minWidth: "0"
        };
        let e = C(["params-2"], a);
        m(e, "textarea", [1]),
        a = {
            display: "flex",
            flexDirection: "column",
            height: "40%",
            minHeight: "0"
        };
        let o = B(["wipe-2", "data-2", "read-2", "exec-2"], [!0, !1, !1, !1], a);
        a = {
            display: "flex",
            flexDirection: "row",
            minWidth: "0"
        };
        let s = z("map-2", a);
        return m(s, "canvas", [1]),
        t.append(e),
        t.append(o),
        t.append(s),
        m(t, "div.panel", [1.5, 1.3, 4]),
        t
    }
    function Q() {
        let t = document.createElement("div");
        a = {
            border: "0px solid #f44",
            height: "100%",
            display: "flex",
            flexDirection: "row"
        },
        Object.assign(t.style, a),
        a = {
            display: "flex",
            flexDirection: "row",
            minWidth: "0"
        };
        let e = C(["params-3"], a);
        m(e, "textarea", [1]),
        a = {
            display: "flex",
            flexDirection: "column",
            height: "40%",
            minHeight: "0"
        };
        let o = B(["wipe-3", "data-3", "read-3", "exec-3"], [!0, !1, !1, !1], a);
        a = {
            display: "flex",
            flexDirection: "row",
            minWidth: "0"
        };
        let s = z("map-3", a);
        return m(s, "canvas", [1]),
        t.append(e),
        t.append(o),
        t.append(s),
        m(t, "div.panel", [1.5, 1.3, 4]),
        t
    }
    function Z() {
        let t = document.createElement("div");
        a = {
            border: "0px solid #f44",
            height: "100%",
            display: "flex",
            flexDirection: "column"
        },
        Object.assign(t.style, a),
        a = {
            display: "flex",
            flexDirection: "row"
        };
        let l = B(["wipe", "", "", "", "", ""], [!0], a);
        return t.append(l),
        t
    }
    function $(t) {
        a = {
            marginToo: "0.5em",
            width: "320px",
            height: "120px",
            display: "flex",
            flexDirection: "column",
            background: "var(--box-bg)",
            border: "0 solid var(--border)",
            display: "inline-block",
            marginRight: "0.3em"
        };
        let n = I(t, a)
          , e = G();
        n.append(e),
        L(e)
    }
    function ee(t) {
        a = {
            marginToo: "0.5em",
            width: "320px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            background: "var(--box-bg)",
            border: "0 solid var(--border)",
            display: "inline-block",
            marginRight: "0.3em"
        };
        let n = I(t, a)
          , e = J();
        n.append(e),
        L(e)
    }
    function te(t) {
        a = {
            marginToo: "0.5em",
            width: "320px",
            height: "180px",
            display: "flex",
            flexDirection: "column",
            background: "var(--box-bg)",
            border: "0 solid var(--border)",
            display: "inline-block",
            marginRight: "0.3em"
        };
        let n = I(t, a)
          , e = Q();
        n.append(e),
        L(e)
    }
    function ne(t) {
        a = {
            marginToo: "0.5em",
            width: "320px",
            height: "180px",
            display: "flex",
            flexDirection: "column",
            background: "var(--box-bg)",
            border: "0 solid var(--border)",
            display: "inline-block",
            marginRight: "0.3em"
        };
        let n = I(t, a)
          , e = Z();
        n.append(e),
        L(e)
    }
    window._26cb0 = {
        mount1: t => {
            $(t)
        }
        ,
        mount2: t => {
            ee(t)
        }
        ,
        mount3: t => {
            te(t)
        }
        ,
        mount4: t => {
            ne(t)
        }
    };
    console.log("[marker] 26cb0.js loaded");
}
)();
