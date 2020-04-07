// abc2svg - ABC to SVG translator
// @source: https://chiselapp.com/user/moinejf/repository/abc2svg
// Copyright (C) 2014-2019 Jean-Francois Moine - LGPL3+
// commit [856aa77e09]
if ("undefined" == typeof abc2svg)
    var abc2svg = {};
abc2svg.C = {
    BLEN: 1536,
    BAR: 0,
    CLEF: 1,
    CUSTOS: 2,
    GRACE: 4,
    KEY: 5,
    METER: 6,
    MREST: 7,
    NOTE: 8,
    PART: 9,
    REST: 10,
    SPACE: 11,
    STAVES: 12,
    STBRK: 13,
    TEMPO: 14,
    BLOCK: 16,
    REMARK: 17,
    FULL: 0,
    EMPTY: 1,
    OVAL: 2,
    OVALBARS: 3,
    SQUARE: 4,
    SL_ABOVE: 1,
    SL_BELOW: 2,
    SL_AUTO: 3,
    SL_HIDDEN: 4,
    SL_DOTTED: 8
};
abc2svg.Abc = function(w) {
    function A(a, c) {
        if (!a)
            return a;
        var b = new a.constructor, d;
        for (d in a)
            a.hasOwnProperty(d) && (b[d] = c && "object" == typeof a[d] ? A(a[d], c - 1) : a[d]);
        return b
    }
    function xa(a, c, b, d) {
        var e, f, g;
        if (w.errbld) {
            switch (a) {
            case 0:
                a = "warn";
                break;
            case 1:
                a = "error";
                break;
            default:
                a = "fatal"
            }
            w.errbld(a, c, b, d)
        } else {
            if (void 0 != d && 0 <= d) {
                for (e = g = 0; ; ) {
                    f = l.file.indexOf("\n", e);
                    if (0 > f || f > d)
                        break;
                    g++;
                    e = f + 1
                }
                e = d - e
            }
            d = "";
            b && (d = b,
            g && (d += ":" + (g + 1) + ":" + (e + 1)),
            d += " ");
            switch (a) {
            case 0:
                d += "Warning: ";
                break;
            case 1:
                d += "Error: ";
                break;
            default:
                d += "Internal bug: "
            }
            w.errmsg(d + c, g, e)
        }
    }
    function K(a, c, b, d, e, f, g) {
        var m;
        w.textrans && (m = w.textrans[b]) && (b = m);
        3 < arguments.length && (b = b.replace(/\$./g, function(a) {
            switch (a) {
            case "$1":
                return d;
            case "$2":
                return e;
            case "$3":
                return f;
            default:
                return g
            }
        }));
        c && c.fname ? xa(a, b, c.fname, c.istart) : xa(a, b)
    }
    function ea() {
        this.index = 0;
        ea.prototype["char"] = function() {
            return this.buffer[this.index]
        }
        ;
        ea.prototype.next_char = function() {
            return this.buffer[++this.index]
        }
        ;
        ea.prototype.get_int = function() {
            for (var a = 0, c = this.buffer[this.index]; "0" <= c && "9" >= c; )
                a = 10 * a + Number(c),
                c = this.next_char();
            return a
        }
    }
    function t(a, c, b, d, e, f) {
        K(a, {
            fname: l.fname,
            istart: l.istart + l.line.index
        }, c, b, d, e, f)
    }
    function ya(a) {
        /eval *\(|Function|setTimeout|setInterval/.test(a) ? t(1, "Unsecure code") : eval('"use strict"\n' + a)
    }
    function U(a, c, b, d) {
        a = u[a];
        var e = b / Ba * 256 | 0;
        b = (b + d) / Ba * 256 | 0;
        0 > e && (e = 0);
        256 <= b && (b = 255,
        e > b && (e = b));
        if (c)
            for (c = a.top[e++]; e <= b; )
                c < a.top[e] && (c = a.top[e]),
                e++;
        else
            for (c = a.bot[e++]; e <= b; )
                c > a.bot[e] && (c = a.bot[e]),
                e++;
        return c
    }
    function R(a, c, b, d, e) {
        a = u[a];
        var f = b / Ba * 256 | 0;
        b = (b + d) / Ba * 256 | 0;
        0 > f && (f = 0);
        256 <= b && (b = 255,
        f > b && (f = b));
        if (c)
            for (; f <= b; )
                a.top[f] < e && (a.top[f] = e),
                f++;
        else
            for (; f <= b; )
                a.bot[f] > e && (a.bot[f] = e),
                f++
    }
    function La(a, c) {
        switch (c) {
        case h.SL_ABOVE:
            return !0;
        case h.SL_BELOW:
            return !1
        }
        return a.multi && 0 != a.multi ? 0 < a.multi : a.p_v.have_ly ? a.pos.voc != h.SL_ABOVE : !1
    }
    function Vc(a) {
        if (!a.ldst) {
            var c, b, d, e, f, g = a.s;
            e = a.start;
            c = e.s;
            b = c.x + 3;
            e = e.ix;
            0 < e && (f = qa[e - 1]);
            a.st = g.st;
            a.lden = !1;
            a.has_val = !0;
            if (e = La(g, g.pos.dyn))
                a.up = !0;
            f && f.s == c && (a.up && !f.up || !a.up && f.up) && (d = f.dd,
            pd[d.func] && (f = f.x + f.val + 4,
            f > b && (b = f)));
            a.defl.noen ? (c = a.x - b,
            20 > c && (b = a.x - 20 - 3,
            c = 20)) : (f = g.x,
            (g = qa[a.ix + 1]) && g.s == c && (a.up && !g.up || !a.up && g.up) && (d = g.dd,
            pd[d.func] && (f -= 5)),
            c = f - b - 4,
            20 > c && (b -= .5 * (20 - c),
            c = 20));
            a.val = c;
            a.x = b;
            a.y = U(a.st, e, b, c);
            e || (b = a.dd,
            a.y -= b.h)
        }
    }
    function Wc(a) {
        if (!a.ldst) {
            var c, b, d, e, f = a.dd, g = a.s, m = g.st, q = a.start.s, n = q.x;
            a.prev && (n = a.prev.x + 10,
            b = a.prev.y);
            a.st = m;
            if (4 != f.func)
                switch (f.glyph) {
                case "8va":
                case "15ma":
                    c = 1;
                    break;
                default:
                    c = 0 <= g.multi
                }
            a.defl.noen ? (d = a.x - n,
            20 > d && (n = a.x - 20 - 3,
            d = 20)) : (d = g.x - n - 6,
            g.type == h.NOTE && (d -= 6),
            20 > d && (n -= .5 * (20 - d),
            d = 20));
            f = a.dd;
            b || (b = U(m, c, n, d));
            c ? (e = u[q.st].topbar + 2,
            b < e && (b = e)) : (b -= f.h,
            e = u[q.st].botbar - 2,
            b > e && (b = e));
            a.lden = !1;
            a.has_val = !0;
            a.val = d;
            a.x = n;
            a.y = b;
            c && (b += f.h);
            R(m, c, n, d, b);
            c ? q.ymx = g.ymx = b : q.ymn = g.ymn = b
        }
    }
    function Fe(a) {
        if (!a.ldst)
            if (a.start)
                Wc(a);
            else {
                var c, b, d = a.s, e = a.dd, f = d.x, g = e.wl + e.wr, m = u[d.st].topbar + 2, q = u[d.st].botbar - 2;
                d.nhd && (f += d.notes[0 <= d.stem ? 0 : d.nhd].shhd);
                c = -1;
                if (4 == e.func)
                    c = 0;
                else if (d.pos)
                    switch (d.pos.orn) {
                    case h.SL_ABOVE:
                        c = 1;
                        break;
                    case h.SL_BELOW:
                        c = 0
                    }
                switch (e.glyph) {
                case "accent":
                case "roll":
                    !c || 0 > c && (0 > d.multi || !d.multi && 0 < d.stem) ? (c = U(d.st, !1, d.x - e.wl, g) - 2,
                    c > q && (c = q),
                    c -= e.h,
                    R(d.st, !1, d.x, 0, c),
                    b = !0,
                    d.ymn = c) : (c = U(d.st, !0, d.x - e.wl, g) + 2,
                    c < m && (c = m),
                    R(d.st, !0, d.x - e.wl, g, c + e.h),
                    d.ymx = c + e.h);
                    break;
                case "brth":
                case "lphr":
                case "mphr":
                case "sphr":
                    c = m + 1;
                    "brth" == e.glyph && c < d.ymx && (c = d.ymx);
                    for (d = d.ts_next; d && !d.seqst; d = d.ts_next)
                        ;
                    f += .45 * ((d ? d.x : Ba) - f);
                    break;
                default:
                    0 == e.name.indexOf("invert") && (b = !0),
                    "invertedfermata" != e.name && (0 < c || 0 > c && 0 <= d.multi) ? (c = U(d.st, !0, d.x - e.wl, g) + 2,
                    c < m && (c = m),
                    R(d.st, !0, d.x - e.wl, g, c + e.h),
                    d.ymx = c + e.h) : (c = U(d.st, !1, d.x - e.wl, g) - 2,
                    c > q && (c = q),
                    c -= e.h,
                    R(d.st, !1, d.x - e.wl, g, c),
                    "fermata" == e.name && (b = !0),
                    d.ymn = c)
                }
                b && (c += e.h,
                a.inv = !0);
                a.x = f;
                a.y = c
            }
    }
    function qd(a) {
        var c, b, d;
        if (d = rd[a])
            if (c = d.match(/(\d+)\s+(.+?)\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)/)) {
                var e = Number(c[1])
                  , f = parseFloat(c[3])
                  , g = parseFloat(c[4])
                  , m = parseFloat(c[5]);
                if (isNaN(e))
                    K(1, null, "%%deco: bad C function value '$1'", c[1]);
                else if ((0 > e || 10 < e) && (32 > e || 41 < e))
                    K(1, null, "%%deco: bad C function index '$1'", e);
                else if (5 == e && (e = 3),
                7 == e && (e = 6),
                0 > f || 0 > g || 0 > m)
                    K(1, null, "%%deco: cannot have a negative value '$1'", d);
                else if (50 < f || 80 < g || 80 < m)
                    K(1, null, "%%deco: abnormal h/wl/wr value '$1'", d);
                else {
                    b = vc[a];
                    b || (b = {
                        name: a
                    },
                    vc[a] = b);
                    b.func = 0 == b.name.indexOf("head-") ? 9 : e;
                    b.glyph = c[2];
                    b.h = f;
                    b.wl = g;
                    b.wr = m;
                    if (a = d.replace(c[0], "").trim())
                        '"' == a[0] && (a = a.slice(1, -1)),
                        b.str = a;
                    6 == b.func && void 0 == b.str && (b.str = b.name);
                    d = b.name.slice(-1);
                    if ("(" == d || ")" == d && 0 > b.name.indexOf("("))
                        if (b.str = null,
                        c = b.name.slice(0, -1) + ("(" == d ? ")" : "("),
                        a = vc[c])
                            "(" == d ? (b.dd_en = a,
                            a.dd_st = b) : (b.dd_st = a,
                            a.dd_en = b);
                        else if (a = qd(c),
                        !a)
                            return;
                    return b
                }
            } else
                K(1, null, "Invalid decoration '$1'", a);
        else
            r.decoerr && K(1, null, "Unknown decoration '$1'", a)
    }
    function Xc(a, c, b) {
        var d, e, f, g, m = a.length;
        for (d = 0; d < m; d++) {
            e = a[d];
            f = vc[e];
            if (!f && (f = qd(e),
            !f))
                continue;
            switch (f.func) {
            case 0:
                if (c.type == h.BAR && "dot" == f.name) {
                    c.bar_dotted = !0;
                    break
                }
            case 1:
            case 2:
                if (!c.notes) {
                    K(1, c, O.must_note_rest, f.name);
                    continue
                }
                break;
            case 8:
                if (c.type != h.NOTE) {
                    K(1, c, O.must_note, f.name);
                    continue
                }
                g = c.notes[c.nhd];
                g.a_dcn || (g.a_dcn = []);
                g.a_dcn.push(f.name);
                continue;
            case 9:
                if (!c.notes) {
                    K(1, c, O.must_note_rest, f.name);
                    continue
                }
                for (e = 0; e <= c.nhd; e++)
                    g = c.notes[e],
                    g.a_dcn || (g.a_dcn = []),
                    g.a_dcn.push(f.name);
                continue;
            case 10:
                if (c.notes)
                    for (e = 0; e <= c.nhd; e++)
                        c.notes[e].color = f.name;
                else
                    c.color = f.name;
                continue;
            case 32:
                c.invis = !0;
                continue;
            case 33:
                if (c.type != h.BAR) {
                    K(1, c, "!beamon! must be on a bar");
                    continue
                }
                c.beam_on = !0;
                continue;
            case 34:
                if (c.type != h.NOTE || !b || b.type != h.NOTE || c.dur != b.dur) {
                    K(1, c, "!$1! must be on the last of a couple of notes", f.name);
                    continue
                }
                c.trem2 = !0;
                c.beam_end = !0;
                c.beam_st = !1;
                b.beam_st = !0;
                b.beam_end = !1;
                c.ntrem = b.ntrem = Number(f.name[4]);
                for (e = 0; e <= c.nhd; e++)
                    c.notes[e].dur *= 2;
                for (e = 0; e <= b.nhd; e++)
                    b.notes[e].dur *= 2;
                continue;
            case 35:
                if (c.type != h.NOTE) {
                    K(1, c, "!xstem! must be on a note");
                    continue
                }
                c.xstem = !0;
                continue;
            case 36:
                if (c.type != h.NOTE) {
                    K(1, c, O.must_note, f.name);
                    continue
                }
                "1" == f.name[6] ? c.beam_br1 = !0 : c.beam_br2 = !0;
                continue;
            case 37:
                c.rbstop = 1;
                continue;
            case 38:
                if (c.type != h.NOTE) {
                    K(1, c, O.must_note, f.name);
                    continue
                }
                c.trem1 = !0;
                c.ntrem = f.name.length;
                continue;
            case 39:
                if (c.type != h.NOTE) {
                    K(1, c, O.must_note, f.name);
                    continue
                }
                c.feathered_beam = "a" == f.name[5] ? 1 : -1;
                continue;
            case 40:
                c.stemless = !0;
                continue;
            case 41:
                c.rbstop = 2;
                continue
            }
            c.a_dd || (c.a_dd = []);
            c.a_dd.push(f)
        }
    }
    function pe(a) {
        var c, b, d = 0, e = a.a_dd, f = e.length;
        for (b = 0; b < f; b++)
            switch (c = e[b],
            c.func) {
            case 1:
                7 > d && (d = 7);
                break;
            case 2:
                14 > d && (d = 14);
                break;
            case 3:
                switch (c.glyph) {
                case "brth":
                case "lphr":
                case "mphr":
                case "sphr":
                    20 > a.wr && (a.wr = 20)
                }
            }
        0 != d && a.prev && a.prev.type == h.BAR && (d -= 3);
        return d
    }
    function Jg() {
        function a(a) {
            var b, c = a.x - a.wl, d = qa.length;
            for (a = 0; a < d; a++)
                b = qa[a],
                b.ix = a,
                b.s.x = b.x = c,
                b.defl.nost = !0
        }
        function c(a) {
            var b;
            if (a.a_dd) {
                var c, d, e = a.a_dd.length;
                for (c = 0; c < e; c++) {
                    b = a.a_dd[c];
                    switch (b.func) {
                    default:
                        d = 0;
                        break;
                    case 3:
                    case 4:
                        d = a.pos.orn;
                        break;
                    case 6:
                        d = a.pos.vol;
                        break;
                    case 7:
                        d = a.pos.dyn
                    }
                    if (d != h.SL_HIDDEN && (d = {
                        s: a,
                        dd: b,
                        st: a.st,
                        ix: qa.length,
                        defl: {},
                        x: a.x,
                        y: a.y
                    },
                    qa.push(d),
                    b.dd_en ? d.ldst = !0 : b.dd_st && (d.lden = !0,
                    d.defl.nost = !0),
                    Kg[b.func]))
                        cf[b.func](d)
                }
            }
            if (a.notes)
                for (b = 0; b < a.notes.length; b++)
                    if (a.notes[b].a_dcn) {
                        var n;
                        d = a;
                        for (var B = b, p = d.notes[B], v = p.a_dcn.length, e = 0; e < v; e++) {
                            n = p.a_dcn[e];
                            c = vc[n];
                            if (!c && (c = qd(n),
                            !c))
                                continue;
                            switch (c.func) {
                            case 0:
                            case 1:
                            case 3:
                            case 4:
                            case 8:
                                break;
                            default:
                                K(1, null, "Cannot have !$1! on a head", c.name);
                                continue;
                            case 9:
                                p.invis = !0;
                                break;
                            case 10:
                                p.color = c.name;
                                continue;
                            case 32:
                                p.invis = !0;
                                continue;
                            case 40:
                                d.stemless = !0;
                                continue
                            }
                            n = {
                                s: d,
                                dd: c,
                                st: d.st,
                                m: B,
                                ix: 0,
                                defl: {},
                                x: d.x,
                                y: 3 * (p.pit - 18)
                            };
                            qa.push(n);
                            c.dd_en ? n.ldst = !0 : c.dd_st && (n.lden = !0,
                            n.defl.nost = !0)
                        }
                    }
        }
        var b, d;
        for (b = W; b; b = b.ts_next) {
            switch (b.type) {
            case h.CLEF:
            case h.KEY:
            case h.METER:
                continue
            }
            break
        }
        for (0 != qa.length && a(b); b; b = b.ts_next) {
            switch (b.type) {
            case h.BAR:
            case h.MREST:
            case h.NOTE:
            case h.REST:
            case h.SPACE:
                break;
            case h.GRACE:
                for (d = b.extra; d; d = d.next)
                    c(d);
            default:
                continue
            }
            c(b)
        }
        (function() {
            var a, b, c, d, h, n, B, p, v = qa.length;
            for (a = 0; a < v; a++)
                if (c = qa[a],
                c.ldst) {
                    h = c.dd;
                    n = h.dd_en;
                    p = c.s;
                    B = p.v;
                    for (b = a + 1; b < v && (d = qa[b],
                    d.start || d.dd != n || d.s.v != B); b++)
                        ;
                    if (b == v)
                        for (B = p.st,
                        b = a + 1; b < v && (d = qa[b],
                        d.start || d.dd != n || d.s.st != B); b++)
                            ;
                    b == v && (d = {
                        s: c.s,
                        st: c.st,
                        dd: n,
                        ix: qa.length - 1,
                        x: Ba - 6,
                        y: c.s.y,
                        lden: !0,
                        defl: {
                            noen: !0
                        }
                    },
                    d.x < p.x + 10 && (d.x = p.x + 10),
                    void 0 != c.m && (d.m = c.m),
                    qa.push(d));
                    d.start = c;
                    d.defl.nost = c.defl.nost;
                    "trill(" == h.name && 0 < a && "trill" == qa[a - 1].dd.name && (d.prev = qa[a - 1])
                }
            for (a = 0; a < v; a++)
                d = qa[a],
                d.lden && !d.start && (p = d.s,
                c = {
                    s: rf(p),
                    st: d.st,
                    dd: d.dd.dd_st,
                    ix: qa.length - 1,
                    y: p.y,
                    ldst: !0
                },
                c.x = c.s.x,
                void 0 != d.m && (c.m = d.m),
                qa.push(c),
                d.start = c)
        }
        )()
    }
    function sf(a, c, b, d, e) {
        var f = Ge(a, d);
        a = f[0];
        var g = f[1]
          , f = f[2];
        X('<g transform="translate(X,Y) scale(F)">\n', c + 4, b + 4, e);
        switch (a) {
        case h.OVAL:
            c = "HD";
            break;
        case h.EMPTY:
            c = "Hd";
            break;
        default:
            c = "hd"
        }
        ca(-jc, ia, c);
        c = 4;
        if (g) {
            b = 9;
            0 < f && (b += 4);
            switch (a) {
            case h.SQUARE:
                b += 3;
                break;
            case h.OVALBARS:
            case h.OVAL:
                b += 2;
                break;
            case h.EMPTY:
                b += 1
            }
            c = b * g;
            for (b -= jc; 0 <= --g; )
                ca(b, ia, "dot"),
                b += 3.5
        }
        d < h.BLEN && (0 >= f ? Yc(-jc, ia, 21) : (Yc(-jc, ia, 21, !1, f),
        6 > c && (c = 6)));
        z += "</g>\n";
        return (c + 15) * e
    }
    function tf(a) {
        var c = 0;
        a.tempo_wh1 && (c = a.tempo_wh1[0]);
        a.tempo_wh0 && (c += a.tempo_wh0[0]);
        a.tempo_wh2 && (c += a.tempo_wh2[0]);
        return c
    }
    function uf(a, c, b) {
        var d, e, f = .7 * E.curfont.size / 12;
        ra("tempo");
        E.curfont.box && (E.curfont.box = !1,
        e = c);
        a.tempo_str1 && (na(c, b, a.tempo_str1, null, null, a.tempo_wh1),
        c += a.tempo_wh1[0] + 3);
        if (a.tempo_notes) {
            for (d = 0; d < a.tempo_notes.length; d++)
                c += sf(a, c, b, a.tempo_notes[d], f);
            na(c, b, a.tempo_str0, null, null, a.tempo_wh0);
            c += a.tempo_wh0[0];
            c = a.tempo ? c + 5 : c + sf(a, c, b, a.new_beat, f)
        }
        a.tempo_str2 && na(c, b, a.tempo_str2, null, null, a.tempo_wh2);
        e && (E.curfont.box = !0,
        a.tempo_str2 && (c += a.tempo_wh2[0] + 3),
        d = E.curfont.size + 4,
        z += '<rect class="stroke" x="',
        qb(e - 2, '" y="', b + d - 1),
        z += '" width="' + (c - e + 2).toFixed(1) + '" height="' + d.toFixed(1) + '"/>\n');
        a.del = !0
    }
    function Lg(a, c, b, d) {
        function e(a) {
            return 6 * Math.round((a + 12) / 6) - 12 - a
        }
        var f = a ? 3.5 : 5;
        a = a ? 1.8 : 3.2;
        if (0 < c) {
            c = d - (b - 1) * f - a;
            if (26 < c)
                return 0;
            b = d
        } else {
            b = d + (b - 1) * f + a;
            if (-2 > b)
                return 0;
            c = d
        }
        d = e(b - .25);
        c = e(c + .25);
        return d * d > c * c ? c : d
    }
    function vf(a) {
        var c, b, d = A(a);
        d.invis = !0;
        delete d.extra;
        delete d.text;
        delete d.a_gch;
        delete d.a_ly;
        delete d.a_dd;
        d.notes = A(a.notes);
        for (c = 0; c <= d.nhd; c++)
            b = d.notes[c] = A(a.notes[c]),
            delete b.a_dcn;
        return d
    }
    function wf(a) {
        function c(a, b, c, d, e, f) {
            var g = e.s1
              , m = g.nflags;
            g.ntrem && (m -= g.ntrem);
            g.trem2 && f > m && (g.dur >= h.BLEN / 2 ? (a = g.x + 6,
            b = e.s2.x - 6) : g.dur < h.BLEN / 4 && (a += 5,
            b -= 6));
            c = e.a * a + e.b - c;
            b = (b - a) / C.scale;
            e = e.a * b * C.scale;
            Xd(a, c, !0);
            z += "l" + b.toFixed(1) + " " + (-e).toFixed(1) + "v" + d.toFixed(1) + "l" + (-b).toFixed(1) + " " + e.toFixed(1) + 'z"/>\n'
        }
        var b, d, e, f, g, m, q, n, B, p, v, k, r = a.s1, l = a.s2;
        rb(r, "beam");
        r.grace ? (g = 3.5,
        m = 3.2,
        f = .29,
        q = 1.8) : (g = 5,
        m = 8,
        f = .34,
        q = 3.2);
        e = r.stem;
        r.stem != l.stem && r.nflags < l.nflags && (e = l.stem);
        0 > e && (q = -q);
        c(r.xs - f, l.xs + f, 0, q, a, 1);
        n = 0;
        for (b = r; b.type == h.NOTE && b.stem != e && (b.ys = a.a * b.xs + a.b - u[b.st].y + g * (b.nflags - 1) * b.stem - q),
        b != l; b = b.next)
            ;
        r.feathered_beam && (n = g / (l.xs - r.xs),
        0 < r.feathered_beam ? (n = -n,
        g = n * r.xs) : g = n * l.xs,
        n *= e);
        f = 0;
        for (d = 2; d <= a.nflags; d++)
            for (f += g,
            0 != n && (a.a += n),
            b = r; ; b = b.next) {
                if (!(b.type != h.NOTE || b.nflags < d))
                    if (b.trem1 && d > b.nflags - b.ntrem)
                        k = b.dur >= h.BLEN / 2 ? b.x : b.xs,
                        c(k - 5, k + 5, (f + 2.5) * e, q, a, d);
                    else {
                        for (p = b; b != l; ) {
                            B = b.next;
                            if (B.type == h.NOTE || B.type == h.REST)
                                if (B.trem1) {
                                    if (B.nflags - B.ntrem < d)
                                        break
                                } else if (B.nflags < d)
                                    break;
                            if (B.beam_br1 || B.beam_br2 && 2 < d)
                                break;
                            b = B
                        }
                        for (v = b; v.type != h.NOTE; )
                            v = v.prev;
                        k = p.xs;
                        if (p == v)
                            if (p == r)
                                k += m;
                            else if (p == l)
                                k -= m;
                            else if (p.beam_br1 || p.beam_br2 && 2 < d)
                                k += m;
                            else {
                                for (B = p.next; B.type != h.NOTE; )
                                    B = B.next;
                                if (B.beam_br1 || B.beam_br2 && 2 < d)
                                    k -= m;
                                else {
                                    for (p = p.prev; p.type != h.NOTE; )
                                        p = p.prev;
                                    k = p.nflags < B.nflags || p.nflags == B.nflags && p.dots < B.dots ? k + m : k - m
                                }
                            }
                        c(k, v.xs, f * e, q, a, d)
                    }
                if (b == l)
                    break
            }
        r.tmp ? lb(r) : l.tmp && lb(l);
        yb(r, "beam")
    }
    function xf(a) {
        function c(a, b, c) {
            for (var d, e; !F.st_print[b]; ) {
                if (F.staves[b].flags & c)
                    return;
                b++
            }
            for (d = e = b; ; ) {
                F.st_print[d] && (e = d);
                if (F.staves[d].flags & c)
                    break;
                d++
            }
            b = u[b].y + u[b].topbar * u[b].staffscale;
            e = u[e].y + u[e].botbar * u[e].staffscale;
            c & 514 ? (a += jc - 6,
            c = ia - e,
            b = (b - e) / 24,
            z += '<text transform="translate(' + a.toFixed(1) + "," + c.toFixed(1) + ") scale(2.5," + b.toFixed(2) + ')">' + Yd.brace.c + "</text>\n") : (a += jc - 5,
            c = ia - b - 3,
            b = b - e + 2,
            z += '<path d="m' + a.toFixed(1) + " " + c.toFixed(1) + "\n\tc10.5 1 12 -4.5 12 -3.5c0 1 -3.5 5.5 -8.5 5.5\n\tv" + b.toFixed(1) + '\n\tc5 0 8.5 4.5 8.5 5.5c0 1 -1.5 -4.5 -12 -3.5"/>\n')
        }
        var b, d, e = F.nstaff, f = 0;
        for (b = 0; ; b++) {
            F.staves[b].flags & 5 && f++;
            if (F.st_print[b])
                break;
            F.staves[b].flags & 10 && f--;
            if (b == e)
                break
        }
        for (d = e; d > b && !F.st_print[d]; d--)
            ;
        if (b != d || 0 != f)
            for (d = u[d].y + u[d].botbar * u[d].staffscale,
            b = u[b].y + u[b].topbar * u[b].staffscale - d,
            Xd(a, d),
            z += "v" + (-b).toFixed(1) + '"/>\n',
            b = 0; b <= e; b++)
                F.staves[b].flags & 1 && c(a, b, 2),
                F.staves[b].flags & 4 && c(a, b, 8),
                F.staves[b].flags & 256 && c(a - 6, b, 512),
                F.staves[b].flags & 1024 && c(a - 6, b, 2048)
    }
    function Zd(a, c, b, d, e) {
        if (d)
            if (d == e)
                b = -1 == b ? -2 : 2;
            else if (2 * d != e) {
                ca(a, c, "acc" + b + "_" + d + "_" + e);
                return
            }
        ca(a, c, "acc" + b)
    }
    function Mg(a) {
        switch (a) {
        case "[":
        case "[]":
            return "";
        case "|:":
        case "|::":
        case "|:::":
            return "[" + a;
        case ":|":
        case "::|":
        case ":::|":
            return a + "]";
        case "::":
            return r.dblrepbar
        }
        return a
    }
    function sd(a, c) {
        var b, d, e, f, g, m = Array(a.nhd + 1);
        if (a.dots) {
            for (g = 0; g <= a.nhd; g++)
                d = 3 * (a.notes[g].pit - 18),
                0 == d % 6 && (d = a.dot_low ? d - 3 : d + 3),
                m[g] = d;
            for (g = 0; g < a.nhd; g++)
                if (!(m[g + 1] > m[g])) {
                    for (d = g; 0 < d && !(m[d] > m[d - 1] + 6); )
                        d--;
                    if (3 * (a.notes[d].pit - 18) - m[d] < m[g + 1] - 3 * (a.notes[g + 1].pit - 18))
                        for (; d <= g; )
                            m[d++] -= 6;
                    else
                        m[g + 1] = m[g] + 6
                }
        }
        e = a.notes[0 > a.stem ? a.nhd : 0];
        b = g = a.x + e.shhd * C.scale;
        d = u[a.st].y;
        if (a.grace)
            f = "ghl";
        else
            switch (f = "hl",
            a.head) {
            case h.OVALBARS:
            case h.OVAL:
                b = g - .3;
                f = "hl1";
                break;
            case h.SQUARE:
                b = g - 2,
                f = "hl1"
            }
        ba.draw_hl(b, a, f);
        e = u[a.st].y + 3 * (e.pit - 18);
        a.stemless ? a.xstem && (b = a.ts_prev,
        f = (0 < b.stem ? b.y : b.ys) - a.y,
        f += u[b.st].y - d,
        Yc(g, e, f)) : (f = a.ys - a.y,
        b = a.nflags,
        a.ntrem && (b -= a.ntrem),
        !c || 0 >= b ? (0 < a.nflags && (f = 0 <= a.stem ? f - 1 : f + 1),
        Yc(g, e, f, a.grace)) : Yc(g, e, f, a.grace, b, r.straightflags));
        if (c && a.trem1) {
            e = a.ntrem || 0;
            f = 3 * (a.notes[0 < a.stem ? a.nhd : 0].pit - 18);
            a.head == h.FULL || a.head == h.EMPTY ? (g += (a.grace ? kc : 3.5) * a.stem,
            f = 0 < a.stem ? f + (6 + 5.4 * e) : f - 11.4) : f = 0 < a.stem ? f + (5 + 5.4 * e) : f - 10.4;
            f /= a.p_v.scale;
            for (X('<path d="mX Y\n\t', g - 4.5, d + f); ; ) {
                z += "l9 -3v3l-9 3z";
                if (0 >= --e)
                    break;
                z += "m0 5.4"
            }
            z += '"/>\n'
        }
        g = a.x;
        for (d = 0; d <= a.nhd; d++) {
            var q = void 0, n, B, p = void 0, v;
            f = g;
            e = a;
            n = d;
            var k = m;
            b = !1;
            var l = e.notes[n]
              , t = u[e.st].y
              , y = 3 * (l.pit - 18);
            B = l.shhd * C.scale;
            var x = f + B
              , He = y + t
              , qe = Ge(e, l.dur);
            v = qe[0];
            var w = qe[1]
              , qe = qe[2];
            0 == y % 6 && B != (0 < e.stem ? e.notes[0].shhd : e.notes[e.nhd].shhd) && (B = 0,
            30 <= y ? (B = y,
            B % 6 && (B -= 3)) : -6 >= y && (B = y,
            B % 6 && (B += 3)),
            B && ca(x, B + t, "hl"));
            if (!l.invis)
                if (e.grace)
                    p = "ghd",
                    x -= 4.5 * C.scale;
                else if (l.map && l.map[0])
                    v = e.head,
                    (p = l.map[0][v]) || (p = l.map[0][l.map[0].length - 1]),
                    v = p.indexOf("/"),
                    0 <= v && (p = 0 <= e.stem ? p.slice(0, v) : p.slice(v + 1));
                else if (e.type == h.CUSTOS)
                    p = "custos";
                else
                    switch (v) {
                    case h.OVAL:
                        p = "HD";
                        break;
                    case h.OVALBARS:
                        if (e.head != h.SQUARE) {
                            p = "HDD";
                            break
                        }
                    case h.SQUARE:
                        -4 < qe ? p = "breve" : (p = "longa",
                        q = 0 < e.stem);
                        Sb || !e.next || e.next.type != h.BAR || e.next.next || (w = 0);
                        break;
                    case h.EMPTY:
                        p = "Hd";
                        break;
                    default:
                        p = "hd"
                    }
            void 0 != l.color ? b = Tb(l.color) : l.map && l.map[2] && (b = Tb(l.map[2]));
            p && (q && ($d(x, He, 0, 1, -1),
            x = He = 0),
            ba.psxygl(x, He, p) || ca(x, He, p),
            q && ae());
            if (w)
                for (q = f + (7.7 + e.xmx) * C.scale,
                void 0 == k[n] && (k[n] = 3 * (e.notes[n].pit - 18),
                0 == (e.notes[n].pit & 1) && (k[n] += 3)),
                n = k[n] + t; 0 <= --w; )
                    ca(q, n, "dot"),
                    q += 3.5;
            l.acc && (f -= l.shac * C.scale,
            e.grace ? ($d(f, y + t, 0, .75),
            Zd(0, 0, l.acc, l.micro_n, l.micro_d),
            ae()) : Zd(f, y + t, l.acc, l.micro_n, l.micro_d));
            0 != b && Tb(b)
        }
    }
    function yf(a) {
        var c = a;
        for (a = a.next; a; a = a.next) {
            if (a.rbstop)
                return a;
            c = a
        }
        return c
    }
    function rf(a) {
        for (; a.prev; )
            if (a = a.prev,
            a.rbstart)
                return a;
        for (a = a.p_v.sym; a.type != h.CLEF; )
            a = a.ts_prev;
        a.next && a.next.type == h.KEY && (a = a.next);
        return a.next && a.next.type == h.METER ? a.next : a
    }
    function zf(a, c, b, d, e, f, g) {
        var m, h, n = .3;
        h = d - c;
        0 > h && (h = -h);
        m = b - a;
        40 < m && .7 > h / m && (n = .3 + .002 * (m - 40),
        .7 < n && (n = .7));
        var B = .5 * (a + b);
        m = .5 * (c + d);
        var p, v;
        p = a + .45 * (B + n * (a - B) - a);
        v = c + .45 * (m + n * (c - m) + f - c);
        B = b + .45 * (B + n * (b - B) - b);
        n = d + .45 * (m + n * (d - m) + f - d);
        m = .03 * (b - a);
        h = 2 * e;
        f = .2 + .001 * (b - a);
        .6 < f && (f = .6);
        f *= e;
        z = g ? z + '<path class="stroke" stroke-dasharray="5,5" d="M' : z + '<path d="M';
        qb(a, " ", c);
        z += "c" + ((p - a) / C.scale).toFixed(1) + " " + ((c - v) / 1).toFixed(1) + " " + ((B - a) / C.scale).toFixed(1) + " " + ((c - n) / 1).toFixed(1) + " " + ((b - a) / C.scale).toFixed(1) + " " + ((c - d) / 1).toFixed(1);
        g || (z += "\n\tv" + (-f).toFixed(1) + "c" + ((B - m - b) / C.scale).toFixed(1) + " " + ((d + f - n - h) / 1).toFixed(1) + " " + ((p + m - b) / C.scale).toFixed(1) + " " + ((d + f - v - h) / 1).toFixed(1) + " " + ((a - b) / C.scale).toFixed(1) + " " + ((d + f - c) / 1).toFixed(1));
        z += '"/>\n'
    }
    function Ie(a, c, b, d, e) {
        for (var f = a, g, m, q, n, B, p, v, k, l; f.v != c.v; )
            f = f.ts_next;
        switch (e & 7) {
        case h.SL_ABOVE:
            l = 1;
            break;
        case h.SL_BELOW:
            l = -1;
            break;
        default:
            a: {
                for (l = f; ; ) {
                    if (l.multi) {
                        l = l.multi;
                        break a
                    }
                    if (l == c)
                        break;
                    l = l.next
                }
                l = 0
            }
            if (!l)
                a: {
                    var t;
                    if (f.grace && 0 < f.stem)
                        l = -1;
                    else {
                        for (l = f; ; l = l.next) {
                            if (l.type == h.NOTE) {
                                if (!l.stemless) {
                                    if (0 > l.stem) {
                                        l = 1;
                                        break a
                                    }
                                    t = !0
                                }
                                22 > l.notes[0].pit && (q = !0)
                            }
                            if (l == c)
                                break
                        }
                        l = t || q ? -1 : 1
                    }
                }
        }
        n = 1;
        t = f.st;
        q = !1;
        Ub(f.st);
        if (f != c)
            for (g = f.next; ; ) {
                if (g.type == h.NOTE || g.type == h.REST)
                    n++,
                    g.st != t && (q = !0,
                    g.st < t && (t = g.st));
                if (g == c)
                    break;
                g = g.next
            }
        q && K(2, f, "*** multi-staves slurs not treated yet");
        q = a.x;
        a.notes && a.notes[0].shhd && (q += a.notes[0].shhd);
        if (a != c)
            a = c.x,
            c.notes && (a += c.notes[0].shhd);
        else {
            for (g = c.ts_next; g && g.type != h.STAVES; g = g.ts_next)
                ;
            a = g ? g.x : Ba
        }
        0 <= b ? b = 3 * (f.notes[b].pit - 18) + 5 * l : (b = 0 < l ? f.ymx + 2 : f.ymn - 2,
        f.type == h.NOTE && (0 < l ? 0 < f.stem && (q += 5,
        f.beam_end && -1 <= f.nflags && !f.in_tuplet && (0 < f.nflags ? (q += 2,
        b = f.ys - 3) : b = f.ys - 6)) : 0 > f.stem && (--q,
        c.grace ? b = f.y - 8 : f.beam_end && -1 <= f.nflags && (!f.in_tuplet || f.ys < b + 3) && (0 < f.nflags ? (q += 2,
        b = f.ys + 3) : b = f.ys + 6))));
        0 <= d ? d = 3 * (c.notes[d].pit - 18) + 5 * l : (d = 0 < l ? c.ymx + 2 : c.ymn - 2,
        c.type == h.NOTE && (0 < l ? 0 < c.stem && (a += 1,
        c.beam_st && -1 <= c.nflags && !c.in_tuplet && (d = c.ys - 6)) : 0 > c.stem && (a -= 5,
        c.beam_st && -1 <= c.nflags && !c.in_tuplet && (d = c.ys + 6))));
        f.type != h.NOTE && (b = d + 1.2 * l,
        q = f.x + .5 * f.wr,
        q > a - 12 && (q = a - 12));
        c.type != h.NOTE && (d = f.type == h.NOTE ? b + 1.2 * l : b,
        f != c && (a = c.x - .3 * c.wl));
        3 <= n && (f.next.type != h.BAR && f.next.x < q + 48 && (0 < l ? (v = f.next.ymx - 2,
        b < v && (b = v)) : (v = f.next.ymn + 2,
        b > v && (b = v))),
        c.prev && c.prev.type != h.BAR && c.prev.x > a - 48 && (0 < l ? (v = c.prev.ymx - 2,
        d < v && (d = v)) : (v = c.prev.ymn + 2,
        d > v && (d = v))));
        p = (d - b) / (a - q);
        if (.5 < p || -.5 > p)
            p = .5 < p ? .5 : -.5,
            0 < p * l ? b = d - p * (a - q) : d = b + p * (a - q);
        v = d - b;
        8 < v ? v = 8 : -8 > v && (v = -8);
        g = v;
        0 > g && (g = -g);
        k = .5 * g;
        g = .3 * v;
        0 < v * l ? (a -= k,
        d -= g) : (q += k,
        b += g);
        f.grace && (q = f.x - .5 * kc);
        c.grace && (a = c.x + 1.5 * kc);
        k = 0;
        p = (d - b) / (a - q);
        if (f != c && f.v == c.v) {
            B = b - p * q;
            for (g = f.next; g != c; g = g.next)
                if (g.st == t)
                    switch (g.type) {
                    case h.NOTE:
                    case h.REST:
                        0 < l ? (v = 3 * (g.notes[g.nhd].pit - 18) + 6,
                        v < g.ymx && (v = g.ymx),
                        v -= p * g.x + B,
                        v > k && (k = v)) : (v = 3 * (g.notes[0].pit - 18) - 6,
                        v > g.ymn && (v = g.ymn),
                        v -= p * g.x + B,
                        v < k && (k = v));
                        break;
                    case h.GRACE:
                        for (m = g.extra; m; m = m.next)
                            0 < l ? (v = 3 * (m.notes[m.nhd].pit - 18) + 6,
                            v < m.ymx && (v = m.ymx),
                            v -= p * m.x + B,
                            v > k && (k = v)) : (v = 3 * (m.notes[0].pit - 18) - 6,
                            v > m.ymn && (v = m.ymn),
                            v -= p * m.x + B,
                            v < k && (k = v))
                    }
            b += .45 * k;
            d += .45 * k;
            k *= .65
        }
        n = 3 < n ? (.08 * (a - q) + 12) * l : (.03 * (a - q) + 8) * l;
        0 < l ? (n < 3 * k && (n = 3 * k),
        40 < n && (n = 40)) : (n > 3 * k && (n = 3 * k),
        -40 > n && (n = -40));
        v = d - b;
        0 > v && (v = -v);
        0 < l ? n < .8 * v && (n = .8 * v) : n > -.8 * v && (n = -.8 * v);
        n *= r.slurheight;
        zf(q, b, a, d, l, n, e & h.SL_DOTTED);
        p = (d - b) / (a - q);
        B = b - p * q + .4 * n;
        if (f.v == c.v)
            for (g = f; g != c; g = g.next)
                g.st == t && (v = p * g.x + B,
                g.ymx < v ? g.ymx = v : g.ymn > v && (g.ymn = v),
                g.next == c ? (k = a,
                c.sl1 && (k -= 5)) : k = g.next.x,
                g != f && (q = g.x),
                k -= q,
                R(t, 0 < l, q, k, v));
        return (0 < l ? h.SL_ABOVE : h.SL_BELOW) | e & h.SL_DOTTED
    }
    function ef(a, c) {
        for (var b, d, e, f, g, m, q, n = a; ; ) {
            if (!n || n == c) {
                if (!e || !(n = e.next) || n == c)
                    break;
                e = null
            }
            if (n.type == h.GRACE)
                e = n,
                n = n.extra;
            else if (n.type != h.NOTE && n.type != h.REST && n.type != h.SPACE || !n.slur_start && !n.sl1)
                n = n.next;
            else {
                d = null;
                b = n.next;
                for (g = !1; ; )
                    if (b)
                        if (b.type == h.GRACE)
                            f = b,
                            b = b.extra;
                        else {
                            if (b.type == h.BAR && (":" == b.bar_type[0] || "|]" == b.bar_type || "[|" == b.bar_type || b.text && "1" != b.text[0])) {
                                d = b;
                                break
                            }
                            if (b.type == h.NOTE || b.type == h.REST || b.type == h.SPACE) {
                                if (b.slur_end || b.sl2) {
                                    d = b;
                                    break
                                }
                                if (b.slur_start || b.sl1) {
                                    if (f) {
                                        for (d = b; d.next; d = d.next)
                                            ;
                                        if (d.next = f.next)
                                            f.next.prev = d;
                                        d = null
                                    }
                                    ef(b, c);
                                    f && f.next && (f.next.prev.next = null,
                                    f.next.prev = f)
                                }
                                if (b == c)
                                    break
                            }
                            b = b.next
                        }
                    else if (f)
                        b = f.next,
                        f = null;
                    else {
                        if (!e || g)
                            break;
                        b = e.next;
                        g = !0
                    }
                if (!b)
                    d = yf(n);
                else if (!d) {
                    n = b;
                    if (n == c)
                        break;
                    continue
                }
                if (e) {
                    for (b = n; b.next; b = b.next)
                        ;
                    if (b.next = e.next)
                        e.next.prev = b;
                    e.slur_start = h.SL_AUTO
                }
                f && (f.prev.next = f.extra,
                f.extra.prev = f.prev,
                f.slur_start = h.SL_AUTO);
                if (n.slur_start)
                    m = n.slur_start & 15,
                    n.slur_start >>= 4,
                    b = -1;
                else {
                    for (b = 0; b <= n.nhd && !n.notes[b].sl1; b++)
                        ;
                    m = n.notes[b].sl1 & 15;
                    n.notes[b].sl1 >>= 4;
                    n.sl1--
                }
                g = -1;
                q = 0;
                if (d.type != h.NOTE && d.type != h.REST && d.type != h.SPACE || !d.slur_end && !d.sl2)
                    d.type == h.BAR && (":" == d.bar_type[0] || "|]" == d.bar_type || "[|" == d.bar_type || d.text && "1" != d.text[0]) || (q = 1);
                else if (d.slur_end)
                    d.slur_end--;
                else {
                    for (g = 0; g <= d.nhd && !d.notes[g].sl2; g++)
                        ;
                    d.notes[g].sl2--;
                    d.sl2--
                }
                m = Ie(n, d, b, g, m);
                q && (d.p_v.slur_start || (d.p_v.slur_start = 0),
                d.p_v.slur_start <<= 4,
                d.p_v.slur_start += m);
                e && e.next && (e.next.prev.next = null,
                e.next.prev = e);
                f && (f.prev.next = f,
                f = f.extra.prev = null);
                if (!n.slur_start && !n.sl1) {
                    if (n == c)
                        break;
                    n = n.next
                }
            }
        }
    }
    function ff(a, c) {
        var b, d, e, f, g, m, q, n, B, p, k, l, r, t;
        f = a.st;
        Ub(a.st);
        for (b = a; b; b = b.next)
            if (b.type != h.NOTE && b.type != h.REST) {
                if (b.type == h.GRACE)
                    for (e = b.extra; e; e = e.next)
                        if (e.slur_start || e.sl1)
                            g = !0
            } else {
                if (b.slur_start || b.slur_end || b.sl1 || b.sl2)
                    g = !0;
                b.st < f && (f = b.st);
                if (0 == c) {
                    if (b.tp1 && ff(b, 1),
                    b.te0)
                        break
                } else if (b.te1)
                    break
            }
        if (b) {
            if (g) {
                ef(a, b);
                if (a.slur_start || a.sl1)
                    return;
                for (d = a.next; d != b; d = d.next)
                    if (d.slur_start || d.slur_end || d.sl1 || d.sl2)
                        return;
                if (b.slur_end || b.sl2)
                    return
            }
            0 == c ? (r = a.tp0,
            a.tp0 = 0,
            t = a.tq0) : (r = a.tp1,
            a.tp1 = 0,
            t = a.tq1);
            if (1 != a.tf[0]) {
                (e = a.tf[3]) || (e = 0 < a.stem ? h.SL_ABOVE : h.SL_BELOW);
                if (a == b)
                    g = !0;
                else if (1 == a.tf[1])
                    g = !0,
                    Ie(a, b, -1, -1, e);
                else if (2 == a.tf[0] || a.type != h.NOTE || b.type != h.NOTE)
                    g = !1;
                else {
                    g = !0;
                    for (d = a; ; d = d.next) {
                        if (d.type != h.NOTE && d.type != h.REST) {
                            if (d.type == h.GRACE || d.type == h.SPACE)
                                continue;
                            g = !1;
                            break
                        }
                        if (d == b)
                            break;
                        if (d.beam_end) {
                            g = !1;
                            break
                        }
                    }
                    if (g && !a.beam_st && !a.beam_br1 && !a.beam_br2)
                        for (d = a.prev; d; d = d.prev)
                            if (d.type == h.NOTE || d.type == h.REST) {
                                d.nflags >= a.nflags && (g = !1);
                                break
                            }
                    if (g && !b.beam_end)
                        for (d = b.next; d; d = d.next)
                            if (d.type == h.NOTE || d.type == h.REST) {
                                !d.beam_br1 && !d.beam_br2 && d.nflags >= b.nflags && (g = !1);
                                break
                            }
                }
                if (g) {
                    if (1 != a.tf[2]) {
                        B = (b.x + a.x) / 2;
                        k = a == b ? 0 : (b.ys - a.ys) / (b.x - a.x);
                        g = a.ys - k * a.x;
                        l = k * B + g;
                        e == h.SL_ABOVE ? (p = U(f, 1, B - 4, 8),
                        p > l && (g += p - l),
                        g += 2) : (p = U(f, 0, B - 4, 8),
                        p < l && (g += p - l),
                        g -= 10);
                        for (d = a; !(d.x >= B); d = d.next)
                            ;
                        0 < a.stem * b.stem && (B = 0 < a.stem ? B + 1.5 : B - 1.5);
                        p = k * B + g;
                        0 == a.tf[2] ? Af(B, p, r) : Af(B, p, r + ":" + t);
                        e == h.SL_ABOVE ? (p += 10,
                        d.ymx < p && (d.ymx = p),
                        R(f, !0, B - 3, 6, p)) : (d.ymn > p && (d.ymn = p),
                        R(f, !1, B - 3, 6, p))
                    }
                } else {
                    0 != a.tf[1] && K(2, a, "'what' value of %%tuplets not yet coded");
                    (e = a.tf[3]) || (e = 0 <= a.multi ? h.SL_ABOVE : h.SL_BELOW);
                    if (e == h.SL_ABOVE) {
                        a.st == b.st ? g = n = u[f].topbar + 4 : (g = a.ymx,
                        n = b.ymx);
                        m = a.x - 4;
                        if (a.st == f) {
                            for (d = a; !d.dur; d = d.next)
                                ;
                            p = U(f, 1, d.x - 4, 8);
                            p > g && (g = p);
                            0 < a.stem && (m += 3)
                        }
                        if (b.st == f) {
                            for (d = b; !d.dur; d = d.prev)
                                ;
                            p = U(f, 1, d.x - 4, 8);
                            p > n && (n = p)
                        }
                        b.dur > b.prev.dur ? q = b.next ? b.next.x - b.next.wl - 5 : Ba - 6 : (q = b.x + 4,
                        B = 0 <= b.stem ? 0 : b.nhd,
                        0 < b.notes[B].shhd && (q += b.notes[B].shhd),
                        b.st == f && 0 < b.stem && (q += 3.5));
                        B = .5 * (m + q);
                        p = .5 * (g + n);
                        k = (n - g) / (q - m);
                        g = 3 * (b.notes[b.nhd].pit - a.notes[a.nhd].pit) / (q - m);
                        0 < g ? 0 > k ? k = 0 : k > g && (k = g) : 0 < k ? k = 0 : k < g && (k = g);
                        k * k < .1 * .1 && (k = 0);
                        n = 0;
                        for (d = a; d.dur && d.st == f && (l = p + (d.x - B) * k,
                        g = U(f, 1, d.x - 4, 8) + 2,
                        g - l > n && (n = g - l)),
                        d != b; d = d.next)
                            ;
                        p += n;
                        g = p + k * (m - B);
                        n = p + k * (q - B);
                        p += 8;
                        for (d = a; ; d = d.next)
                            if (d.st == f) {
                                l = p + (d.x - B) * k;
                                d.ymx < l && (d.ymx = l);
                                if (d == b)
                                    break;
                                R(f, !0, d.x, d.next.x - d.x, l)
                            } else if (d == b)
                                break
                    } else {
                        m = a.x - 7;
                        b.dur > b.prev.dur ? q = b.next ? b.next.x - b.next.wl - 8 : Ba - 6 : (q = b.x + 2,
                        0 < b.notes[b.nhd].shhd && (q += b.notes[b.nhd].shhd));
                        0 <= a.stem && (m += 2,
                        q += 2);
                        if (a.st == f) {
                            for (d = a; !d.dur; d = d.next)
                                ;
                            g = U(f, 0, d.x - 4, 8)
                        } else
                            g = 0;
                        if (b.st == f) {
                            for (d = b; !d.dur; d = d.prev)
                                ;
                            n = U(f, 0, d.x - 4, 8)
                        } else
                            n = 0;
                        B = .5 * (m + q);
                        p = .5 * (g + n);
                        k = (n - g) / (q - m);
                        g = 3 * (b.notes[0].pit - a.notes[0].pit) / (q - m);
                        0 < g ? 0 > k ? k = 0 : k > g && (k = g) : 0 < k ? k = 0 : k < g && (k = g);
                        k * k < .1 * .1 && (k = 0);
                        n = 0;
                        for (d = a; d.dur && d.st == f && (l = p + (d.x - B) * k,
                        g = U(f, 0, d.x - 4, 8),
                        g - l < n && (n = g - l)),
                        d != b; d = d.next)
                            ;
                        p += n - 10;
                        g = p + k * (m - B);
                        n = p + k * (q - B);
                        p -= 2;
                        for (d = a; ; d = d.next) {
                            if (d.st == f) {
                                if (d == b)
                                    break;
                                l = p + (d.x - B) * k;
                                d.ymn > l && (d.ymn = l);
                                R(f, !1, d.x, d.next.x - d.x, l)
                            }
                            if (d == b)
                                break
                        }
                    }
                    1 == a.tf[2] ? (f = n - g,
                    e = e == h.SL_ABOVE ? -3 : 3,
                    B = (q - m) / C.scale,
                    z += '<path class="stroke" d="m',
                    qb(m, " ", g + 4 + e),
                    z += "v" + e.toFixed(1) + "l" + B.toFixed(1) + " " + (-f).toFixed(1) + "v" + (-e).toFixed() + '"/>\n') : (b = m,
                    d = g,
                    m = q - m,
                    q = n - g,
                    p = e == h.SL_ABOVE,
                    r = 0 == a.tf[2] ? r.toString() : r + ":" + t,
                    t = 10 * r.length,
                    k = p ? -3 : 3,
                    X('<text style="font:italic 12px serif"\n\tx="X" y="Y" text-anchor="middle">A</text>\n', b + m / 2, d + q / 2, r),
                    m /= C.scale,
                    p || (d += 6),
                    z += '<path class="stroke" d="m',
                    qb(b, " ", d),
                    z += "v" + k.toFixed(1) + "m" + m.toFixed(1) + " " + (-q).toFixed(1) + "v" + (-k).toFixed(1) + '"/>\n<path class="stroke" stroke-dasharray="' + ((m - t) / 2).toFixed(1) + " " + t.toFixed(1) + '" d="m',
                    qb(b, " ", d - k),
                    z += "l" + m.toFixed(1) + " " + (-q).toFixed(1) + '"/>\n',
                    l = .5 * (g + n),
                    e == h.SL_ABOVE ? R(f, !0, B - 3, 6, l + 9) : R(f, !1, B - 3, 6, l))
                }
            }
        } else
            K(1, a, "No end of tuplet in this music line"),
            0 == c ? a.tp0 = 0 : a.tp1 = 0
    }
    function td(a, c, b, d, e) {
        var f, g, m, q, n, k, p, l, r;
        for (f = 0; f < b.length; f++) {
            m = b[f];
            n = a.notes[m].pit;
            q = d[f];
            k = 2 != e ? c.notes[q].pit : n;
            g = (a.notes[m].ti1 & 7) == h.SL_ABOVE ? 1 : -1;
            l = a.x;
            r = a.notes[m].shhd;
            0 < g ? m < a.nhd && n + 1 == a.notes[m + 1].pit && a.notes[m + 1].shhd > r && (r = a.notes[m + 1].shhd) : 0 < m && n == a.notes[m - 1].pit + 1 && a.notes[m - 1].shhd > r && (r = a.notes[m - 1].shhd);
            l += .6 * r;
            p = c.x;
            2 != e && (r = c.notes[q].shhd,
            0 < g ? q < c.nhd && k + 1 == c.notes[q + 1].pit && c.notes[q + 1].shhd < r && (r = c.notes[q + 1].shhd) : 0 < q && k == c.notes[q - 1].pit + 1 && c.notes[q - 1].shhd < r && (r = c.notes[q - 1].shhd),
            p += .6 * r);
            q = a.st;
            switch (e) {
            case 0:
                n == k || n & 1 || (n = k);
                break;
            case 3:
                g = -g;
            case 1:
                l = a.x;
                l > p - 20 && (l = p - 20);
                n = k;
                q = c.st;
                break;
            default:
                if (a != c)
                    p -= c.wl,
                    c.type == h.BAR && (p += 5);
                else {
                    k = a.time + a.dur;
                    for (p = a.ts_next; p && !(p.time > k); p = p.ts_next)
                        ;
                    p = p ? p.x : Ba
                }
                p < l + 16 && (p = l + 16)
            }
            20 < p - l ? (l += 3.5,
            p -= 3.5) : (l += 1.5,
            p -= 1.5);
            n = 3 * (n - 18);
            k = (.04 * (p - l) + 10) * g;
            zf(l, u[q].y + n, p, u[q].y + n, g, k, a.notes[m].ti1 & h.SL_DOTTED)
        }
    }
    function Ic(a, c, b) {
        var d, e, f, g, m, q = [], n = [], k = [], p = a.nhd, l = a.time + a.dur;
        if (2 == b) {
            for (d = 0; d <= p; d++)
                a.notes[d].ti1 && k.push(d);
            td(a, c || a, k, k, b)
        } else {
            for (d = 0; d <= p; d++)
                if (a.notes[d].ti1) {
                    e = -1;
                    g = a.notes[d].opit || a.notes[d].pit;
                    for (f = c.nhd; 0 <= f; f--) {
                        m = c.notes[f].opit || c.notes[f].pit;
                        switch (m - g) {
                        case 1:
                        case -1:
                            a.notes[d].acc != c.notes[f].acc && (e = f);
                        default:
                            continue;
                        case 0:
                            e = f
                        }
                        break
                    }
                    0 <= e ? (q.push(d),
                    n.push(e)) : k.push(d)
                }
            td(a, c, q, n, b);
            if (k.length) {
                for (c = a.ts_next; c && c.time < l; )
                    c = c.ts_next;
                for (; c && c.time == l; ) {
                    if (c.type == h.NOTE && c.st == a.st) {
                        q.length = 0;
                        n.length = 0;
                        for (d = k.length; 0 <= --d; )
                            for (e = k[d],
                            g = a.notes[e].opit || a.notes[e].pit,
                            f = c.nhd; 0 <= f; f--)
                                if (m = c.notes[f].opit || c.notes[f].pit,
                                m == g) {
                                    q.push(e);
                                    n.push(f);
                                    k[d] = k.pop();
                                    break
                                }
                        if (0 < q.length && (td(a, c, q, n, 1 == b ? 1 : 0),
                        0 == k.length))
                            return
                    }
                    c = c.ts_next
                }
                0 != k.length && K(1, a, "Bad tie")
            }
        }
    }
    function Ng(a) {
        var c, b, d;
        b = a.time + a.dur;
        d = a.st;
        for (c = a.ts_next; c; c = c.ts_next)
            if (c.st == d)
                if (c.time == b) {
                    if (c.type == h.NOTE)
                        return c
                } else if (c.time > b)
                    return a
    }
    function Og(a) {
        function c(a, b, c) {
            if (a.type == h.GRACE)
                for (a = a.extra; a; a = a.next)
                    a.ti1 && Ic(a, b, c);
            else
                Ic(a, b, c)
        }
        var b, d, e, f, g, m;
        for (b = a.sym; b; b = b.next) {
            switch (b.type) {
            case h.CLEF:
            case h.KEY:
            case h.METER:
                continue
            }
            break
        }
        m = a.s_rtie;
        for (d = b; d && !d.dur && d.type != h.GRACE; d = d.next)
            d.type == h.BAR && d.text && ("1" == d.text[0] ? m = a.s_tie : a.s_tie = m);
        if (d) {
            a.s_tie && (a.s_tie.x = b.x + b.wr,
            b = a.s_tie,
            a.s_tie = null,
            b.st = d.st,
            b.ts_next = d.ts_next,
            b.time = d.time - b.dur,
            Ic(b, d, 1));
            for (; ; ) {
                for (b = d; b && !b.ti1; b = b.next)
                    if (m && b.type == h.BAR && b.text)
                        if ("1" == b.text[0])
                            m = null;
                        else if ("|" != b.bar_type) {
                            for (d = b.next; d && d.type != h.NOTE; d = d.next)
                                ;
                            if (!d) {
                                b = null;
                                break
                            }
                            e = A(m);
                            e.x = b.x;
                            e.next = d;
                            e.st = d.st;
                            e.time = d.time - e.dur;
                            Ic(e, d, 1)
                        }
                if (!b)
                    break;
                g = b.time + b.dur;
                for (d = b.next; d && !d.dur; d = d.next)
                    if (d.type == h.BAR && d.text) {
                        if ("1" != d.text[0])
                            break;
                        m = b
                    }
                if (d) {
                    if (d.type != h.NOTE && d.type != h.BAR) {
                        K(1, b, "Bad tie");
                        continue
                    }
                    if (d.time != g) {
                        e = Ng(b);
                        if (e == b) {
                            K(1, b, "Bad tie");
                            continue
                        }
                        d = e
                    }
                } else {
                    for (d = b.ts_next; d; d = d.ts_next)
                        if (d.st == b.st && !(d.time < g)) {
                            if (d.time > g) {
                                d = null;
                                break
                            }
                            if (d.dur)
                                break
                        }
                    if (!d) {
                        c(b, null, 2);
                        a.s_tie = b;
                        break
                    }
                }
                for (e = b.ts_next; e; e = e.ts_next)
                    if (e.st == b.st) {
                        if (e.time > g)
                            break;
                        e.type == h.CLEF && (f = !0)
                    }
                f || b.st != d.st ? (f = !1,
                g = .4 * (d.x - b.x),
                e = d.x,
                d.x -= g,
                d.x > b.x + 32 && (d.x = b.x + 32),
                c(b, d, 2),
                d.x = e,
                e = b.x,
                b.x += g,
                b.x < d.x - 24 && (b.x = d.x - 24),
                Ic(b, d, 3),
                b.x = e) : c(b, d, d.type == h.NOTE ? 0 : 2)
            }
            a.s_rtie = m
        }
    }
    function Pg(a) {
        var c, b, d, e, f, g = [];
        for (d = F.nstaff; 0 <= d && !F.st_print[d]; d--)
            ;
        if (!(0 > d)) {
            for (b = 0; b < x.length; b++)
                if (c = x[b],
                c.sym && (d = F.voices[b].st,
                F.st_print[d])) {
                    if (c.new_name) {
                        e = 2;
                        break
                    }
                    c.snm && (e = 1)
                }
            if (e) {
                for (b = 0; b < x.length; b++)
                    if (c = x[b],
                    c.sym && (d = F.voices[b].st,
                    F.st_print[d] && (c.new_name && delete c.new_name,
                    c = 2 == e ? c.nm : c.snm))) {
                        if (F.staves[d].flags & 512)
                            for (; !(F.staves[d].flags & 256); )
                                d--;
                        else if (F.staves[d].flags & 2)
                            for (; !(F.staves[d].flags & 1); )
                                d--;
                        g[d] = g[d] ? g[d] + ("\\n" + c) : c
                    }
                if (0 != g.length)
                    for (ra("voice"),
                    a = .5 * -a,
                    d = 0; d < g.length; d++)
                        if (g[d]) {
                            e = g[d].split("\\n");
                            f = u[d].y + .5 * u[d].topbar * u[d].staffscale + 9 * (e.length - 1) - .3 * E.curfont.size;
                            b = d;
                            if (F.staves[d].flags & 256)
                                for (; !(F.staves[b].flags & 512); )
                                    b++;
                            else if (F.staves[d].flags & 1)
                                for (; !(F.staves[b].flags & 2); )
                                    b++;
                            b != d && (f -= .5 * (u[d].y - u[b].y));
                            for (b = 0; b < e.length; b++)
                                c = e[b],
                                na(a, f, c, "c"),
                                f -= 18
                        }
            }
        }
    }
    function Qg() {
        var a, c, b, d, e, f, g, m, q;
        for (c = 0; c < x.length; c++)
            q = x[c],
            1 != q.scale && (q.scale_str = 'transform="scale(' + q.scale.toFixed(2) + ')"');
        for (c = 0; c <= S && !E.st_print[c]; c++)
            ;
        d = 0;
        if (c > S)
            c--,
            q = u[c];
        else
            for (q = u[c],
            a = 0; 256 > a; a++)
                m = q.top[a],
                d < m && (d = m);
        a = d;
        m = c;
        var n, k, p = 0, l = 0, D = u[m].topbar + 8, t = 0, df = 1, y = -100;
        for (g = W; g; g = g.ts_next)
            g.type != h.TEMPO || g.del || (e || (e = g),
            n = tf(g),
            0 == g.time && 40 < g.x && (g.x = 40),
            k = U(m, !0, g.x - 16, n),
            k > D && (D = k),
            y >= g.x - 16 && !(t & df >> 1) && (t |= df),
            df <<= 1,
            y = g.x - 16 + n);
        if (e)
            for (eb(-1),
            ra("tempo"),
            l = E.curfont.size + 8,
            k = 2 - l,
            f = k - l,
            0 != t && (l *= 2),
            d < D + l && (p = D + l - d),
            g = e; g; g = g.ts_next)
                if (g.type == h.TEMPO && !g.del) {
                    if (w.anno_start || w.anno_stop)
                        g.wl = 16,
                        g.wr = 30,
                        g.ymn = t & 1 ? f : k,
                        g.ymx = g.ymn + 14,
                        rb(g);
                    uf(g, g.x - 16, t & 1 ? f : k);
                    yb(g);
                    t >>= 1
                }
        D = u[m].topbar + 6;
        for (g = W; g; g = g.ts_next)
            g.type == h.PART && (b || (b = g,
            ra("parts"),
            f = E.curfont.size + 2),
            n = Pa(g.text)[0],
            k = U(m, !0, g.x - 10, n + 3),
            D < k && (D = k));
        if (b)
            for (eb(-1),
            E.curfont.box && (f += 2),
            d < D + f + l && (p = D + f + l - d),
            g = b; g; g = g.ts_next)
                if (g.type == h.PART) {
                    g.x -= 10;
                    if (w.anno_start || w.anno_stop)
                        n = Pa(g.text)[0],
                        g.wl = 0,
                        g.wr = n,
                        g.ymn = -l - f,
                        g.ymx = g.ymn + f,
                        rb(g);
                    na(g.x, 2 - l - f, g.text);
                    yb(g)
                }
        d = a + p;
        if (!E.st_print[c])
            return d;
        d *= q.staffscale;
        e = .5 * r.staffsep + q.topbar * q.staffscale;
        d < e && (d = e);
        d < q.ann_top && (d = q.ann_top);
        q.y = -d;
        b = c;
        f = F.staves[b];
        for (c++; c <= S; c++)
            if (q = u[c],
            E.st_print[c]) {
                e = f.sep || r.sysstaffsep;
                g = f.maxsep || r.maxsysstaffsep;
                f = 0;
                if (q.staffscale == u[b].staffscale) {
                    for (a = 0; 256 > a; a++)
                        m = q.top[a] - u[b].bot[a],
                        f < m && (f = m);
                    f *= q.staffscale
                } else
                    for (a = 0; 256 > a; a++)
                        m = q.top[a] * q.staffscale - u[b].bot[a] * u[b].staffscale,
                        f < m && (f = m);
                e += q.topbar * q.staffscale;
                f < e && (f = e);
                g += q.topbar * q.staffscale;
                f > g && (f = g);
                d += f;
                q.y = -d;
                b = c;
                f = F.staves[b]
            }
        for (a = e = 0; 256 > a; a++)
            m = u[b].bot[a],
            e > m && (e = m);
        e > q.ann_bot && (e = q.ann_bot);
        e *= u[b].staffscale;
        for (c = 0; c <= S; c++)
            q = u[c],
            f = q.y,
            1 != q.staffscale && (q.scale_str = 'transform="translate(0,' + (ia - f).toFixed(1) + ") scale(" + q.staffscale.toFixed(2) + ')"');
        if (0 == e) {
            for (c = S; 0 <= c && !E.st_print[c]; c--)
                ;
            if (0 > c)
                return d
        }
        f = -e;
        e = .5 * r.staffsep;
        f < e && (f = e);
        g = .5 * r.maxstaffsep;
        f > g && (f = g);
        return d + f
    }
    function Rg(a) {
        function c() {
            var a, b, c, d = 0;
            for (a = 0; a <= F.nstaff; a++)
                0 > k[a] ? p[a] = l[a] = 0 : (b = u[a].staffscale,
                c = u[a].topbar * b,
                b *= u[a].botbar,
                0 == d && (d = u[a].y + c),
                p[a] = u[a].y + b,
                l[a] = d - p[a],
                d = F.staves[a].flags & 64 ? 0 : p[a])
        }
        function b(a, b, c) {
            var d, e, f, g, m = 0, h = "", q = F.staves[a].stafflines, n = q.length;
            if (/[\[|]/.test(q))
                if (c -= b,
                eb(a),
                d = c / C.scale,
                Jc && Jc.st_l == q && Jc.st_ws == (d | 0))
                    ca(b, u[a].y, "stdef" + r.fullsvg);
                else {
                    for (e = 0; e < n; e++,
                    m -= 6)
                        if ("." != q[e]) {
                            for (f = 0; e < n; e++,
                            m -= 6,
                            f -= 6) {
                                switch (q[e]) {
                                case ".":
                                case "-":
                                    continue;
                                case g:
                                    h += "m-" + d.toFixed(1) + " " + f + "h" + d.toFixed(1);
                                    f = 0;
                                    continue
                                }
                                void 0 != g && (h += '"/>\n');
                                g = q[e];
                                h += '<path class="' + ("[" == g ? "slthW" : "slW") + '" d="m0 ' + m + "h" + d.toFixed(1);
                                f = 0
                            }
                            h += '"/>'
                        }
                    m = u[a].y;
                    !Jc && c > ud() - 10 ? (Jc = {
                        st_l: q,
                        st_ws: d | 0
                    },
                    e = "stdef" + r.fullsvg,
                    0 > h.indexOf("<path", 1) ? Hb[e] = h.replace("path", 'path id="' + e + '"') : Hb[e] = '<g id="' + e + '">\n' + h + "\n</g>",
                    ca(b, m, e)) : X('<g transform="translate(X, Y)">\n' + h + "\n</g>\n", b, m)
                }
        }
        function d(a, b, c) {
            var d, e, f = a.bar_type, g = a.st, m = u[g], q = a.x;
            0 != g && a.ts_prev && a.ts_prev.type != h.BAR && (c = m.topbar * m.staffscale);
            a.ymx = a.ymn + c;
            eb(-1);
            rb(a);
            e = m.y + 12;
            "|||||" != m.stafflines && (e += (m.topbar + m.botbar) / 2 - 12);
            if (a.bar_mrep)
                if (eb(g),
                1 == a.bar_mrep) {
                    for (d = a.prev; d.type != h.REST; d = d.prev)
                        ;
                    y.push([d.x, e, g, "mrep"])
                } else
                    y.push([q, e, g, "mrep2"]),
                    a.v == F.top_voice && A.push([q, e + m.topbar - 9, g, a.bar_mrep.toString()]);
            "||:" == f && (f = "[|:");
            for (d = f.length; 0 <= --d; ) {
                switch (f[d]) {
                case "|":
                    a.bar_dotted ? t.push(new Float32Array([q, b, c, m.staffscale])) : D.push(new Float32Array([q, b, c]));
                    break;
                default:
                    q -= 3;
                    w.push(new Float32Array([q + 1.5, b, c]));
                    break;
                case ":":
                    q -= 2,
                    y.push([q + 1, e - 12, g, "rdots"])
                }
                q -= 3
            }
            eb(-1);
            yb(a)
        }
        var e, f, g, m, q, n, k = [], p = [], l = [], D = [], t = [], w = [], y = [], A = [];
        Pg(a);
        for (e = 0; e <= S; e++)
            k[e] = F.st_print[e] ? 0 : -1;
        c();
        xf(0);
        for (a = W; a; a = a.ts_next) {
            if (n && a.time != n) {
                for (e = n = 0; e <= S; e++)
                    F.st_print[e] || (k[e] = -1);
                c()
            }
            switch (a.type) {
            case h.STAVES:
                q = a.ts_prev.type == h.BAR ? a.ts_prev.x : 0;
                if (!q) {
                    for (e = a.ts_next; e && e.time == a.time; e = e.ts_next) {
                        switch (e.type) {
                        case h.BAR:
                        case h.CLEF:
                        case h.KEY:
                        case h.METER:
                            q = e.x;
                            continue
                        }
                        break
                    }
                    e || (q = Ba)
                }
                m = a.sy;
                for (e = 0; e <= S; e++)
                    f = k[e],
                    0 > f ? m.st_print[e] && (k[e] = q ? q : a.x - a.wl - 2) : m.st_print[e] && m.staves[e].stafflines == F.staves[e].stafflines || (q ? (g = q,
                    n = a.time) : (g = a.x - a.wl - 2,
                    k[e] = -1),
                    b(e, f, g),
                    m.st_print[e] && (k[e] = g));
                F = m;
                c();
                continue;
            case h.BAR:
                if (a.second || a.invis || !a.bar_type)
                    break;
                e = a.st;
                d(a, p[e], l[e]);
                break;
            case h.STBRK:
                if (0 == F.voices[a.v].range && 14 < a.xmx) {
                    for (q = g = 0; q < x.length; q++)
                        0 < F.voices[q].range && g++;
                    for (e = a.ts_next; e && e.type == h.STBRK; e = e.ts_next)
                        g--;
                    0 == g && xf(a.x)
                }
                if (e = a.prev) {
                    g = e.x;
                    e.type != h.BAR && (g += e.wr);
                    e = a.st;
                    f = k[e];
                    if (0 <= f) {
                        if (f >= g)
                            continue;
                        b(e, f, g)
                    }
                    k[e] = a.x
                }
            }
        }
        for (e = 0; e <= S; e++)
            if (!n || F.st_print[e])
                f = k[e],
                0 > f || f >= Ba || b(e, f, Ba);
        (function() {
            var a, b, c, d, e = D.length;
            eb(-1);
            if (e) {
                z += '<path class="bW" d="';
                for (a = 0; a < e; a++)
                    b = D[a],
                    X("MX Yv-F", b[0], b[1], b[2]);
                z += '"/>\n'
            }
            if (e = t.length)
                for (a = 0; a < e; a++)
                    b = t[a],
                    c = (5 * b[3]).toFixed(1),
                    X('<path class="bW" stroke-dasharray="' + c + "," + c + '" d="MX Yv-F"/>\n', b[0], b[1], b[2]);
            if (e = w.length) {
                z += '<path class="bthW" d="';
                for (a = 0; a < e; a++)
                    b = w[a],
                    X("MX Yv-F", b[0], b[1], b[2]);
                z += '"/>\n'
            }
            if (e = y.length)
                for (a = 0; a < e; a++)
                    b = y[a],
                    eb(b[2]),
                    ca(b[0], b[1], b[3]);
            if (e = A.length) {
                ra("annotation");
                E.curfont.box && (E.curfont.box = !1,
                d = !0);
                for (a = 0; a < e; a++)
                    b = A[a],
                    eb(b[2]),
                    na(b[0], b[1], b[3], "c");
                d && (E.curfont.box = !0)
            }
        }
        )();
        eb(-1)
    }
    function Ib(a) {
        return !a || !/^(0|n|f)/i.test(a)
    }
    function Je(a, c) {
        var b, d, e;
        if ("-" == a[a.length - 2]) {
            b = a[a.length - 1];
            if ("1" > b || "9" < b)
                return;
            a = "u" + b + "font"
        }
        (b = r[a]) || (b = {
            name: "sans-serif",
            size: 12
        });
        b = Object.create(b);
        b.fid = b.used = void 0;
        r[a] = b;
        if (d = c.match(/\s+(no)?box(\s|$)/))
            b.box = d[1] ? !1 : !0,
            c = c.replace(d[0], d[2]);
        if (d = c.match(/\s+class=(.*?)(\s|$)/))
            b["class"] = d[1],
            c = c.replace(d[0], d[2]);
        if (d = c.match(/\s+wadj=(.*?)(\s|$)/)) {
            if ("undefined" == typeof document)
                switch (d[1]) {
                case "none":
                    b.wadj = "";
                    break;
                case "space":
                    b.wadj = "spacing";
                    break;
                case "glyph":
                    b.wadj = "spacingAndGlyphs";
                    break;
                default:
                    t(1, O.bad_val, "%%" + a)
                }
            c = c.replace(d[0], d[2])
        }
        (d = lc(c)) ? (e = d[0],
        "*" != e && (e = e.replace("Times-Roman", "serif"),
        e = e.replace("Times", "serif"),
        e = e.replace("Helvetica", "sans-serif"),
        e = e.replace("Courier", "monospace"),
        b.name = e,
        b.swfac = 0),
        1 < d.length && (d = d[d.length - 1],
        "*" != d && (d = Number(d),
        isNaN(d) ? t(1, O.bad_val, "%%" + a) : (b.size = d,
        b.swfac = 0)))) : t(1, O.bad_val, "%%" + a)
    }
    function Va(a) {
        var c = parseFloat(a);
        switch (a.slice(-2)) {
        case "CM":
        case "cm":
            c *= 37.8;
            break;
        case "IN":
        case "in":
            c *= 96;
            break;
        case "PT":
        case "pt":
            c *= .75
        }
        return c
    }
    function Bf(a, c) {
        a = a.slice(0, 3);
        "ste" == a && (a = "stm");
        Jb("pos", a + " " + c)
    }
    function Jb(a, c) {
        k ? ba.set_vp([a + "=", c]) : (a = [a + "=", c],
        P.V || (P.V = {}),
        P.V["*"] ? Array.prototype.push.apply(P.V["*"], a) : P.V["*"] = a)
    }
    function fb() {
        ga.chg && (ga.chg = !1,
        ga.lm = r.leftmargin - r.printmargin,
        0 > ga.lm && (ga.lm = 0),
        ga.rm = r.rightmargin - r.printmargin,
        0 > ga.rm && (ga.rm = 0),
        ga.width = r.pagewidth - 2 * r.printmargin,
        100 > ga.width - ga.lm - ga.rm && (K(0, void 0, "Bad staff width"),
        ga.width = ga.lm + ga.rm + 150),
        jc = ga.lm / r.scale)
    }
    function Kc(a) {
        var c = a.name
          , b = ""
          , d = c.match(/-?[bB]old/);
        d && (b += "bold ",
        c = c.replace(d[0], ""));
        if (d = c.match(/-?[iI]talic/))
            b += "italic ",
            c = c.replace(d[0], "");
        if (d = c.match(/-?[oO]blique/))
            b += "oblique ",
            c = c.replace(d[0], "");
        return "font:" + b + a.size.toFixed(1) + "px " + c
    }
    function be(a) {
        return a["class"] ? "f" + a.fid + r.fullsvg + " " + a["class"] : "f" + a.fid + r.fullsvg
    }
    function Kb(a) {
        if (!a.used) {
            a.used = !0;
            if (void 0 == a.fid && (a.fid = Zc.length,
            Zc.push(a),
            !a.swfac)) {
                var c = Cf[a.name];
                c || (c = 1.1);
                a.swfac = a.size * c
            }
            wc += "\n.f" + a.fid + r.fullsvg + " {" + Kc(a) + "}"
        }
    }
    function mc(a) {
        a += "font";
        var c = r[a];
        c || (t(1, "Unknown font $1", "$" + a[1]),
        c = E.curfont);
        Kb(c);
        return c
    }
    function Vb(a) {
        var c, b, d = "", e;
        for (c = 0; ; ) {
            e = a.indexOf("\\", c);
            if (0 > e)
                break;
            d += a.slice(c, e);
            c = a[++e];
            if (!c)
                return d + "\\";
            switch (c) {
            case "0":
            case "2":
                if ("0" != a[e + 1])
                    break;
                if (b = Sg[a[e + 2]]) {
                    d += b;
                    c = e + 3;
                    continue
                }
                break;
            case "u":
                c = Number("0x" + a.slice(e + 1, e + 5));
                if (isNaN(c) || 32 > c) {
                    d += a[++e] + "\u0306";
                    c = e + 1;
                    continue
                }
                d += String.fromCharCode(c);
                c = e + 5;
                continue;
            case "t":
                d += " ";
                c = e + 1;
                continue;
            default:
                if (b = Tg[a.slice(e, e + 2)]) {
                    d += b;
                    c = e + 2;
                    continue
                }
                switch (c) {
                case "`":
                    d += a[++e] + "\u0300";
                    c = e + 1;
                    continue;
                case "'":
                    d += a[++e] + "\u0301";
                    c = e + 1;
                    continue;
                case "^":
                    d += a[++e] + "\u0302";
                    c = e + 1;
                    continue;
                case "~":
                    d += a[++e] + "\u0303";
                    c = e + 1;
                    continue;
                case "=":
                    d += a[++e] + "\u0304";
                    c = e + 1;
                    continue;
                case "_":
                    d += a[++e] + "\u0305";
                    c = e + 1;
                    continue;
                case ".":
                    d += a[++e] + "\u0307";
                    c = e + 1;
                    continue;
                case '"':
                    d += a[++e] + "\u0308";
                    c = e + 1;
                    continue;
                case "o":
                    d += a[++e] + "\u030a";
                    c = e + 1;
                    continue;
                case "H":
                    d += a[++e] + "\u030b";
                    c = e + 1;
                    continue;
                case "v":
                    d += a[++e] + "\u030c";
                    c = e + 1;
                    continue;
                case "c":
                    d += a[++e] + "\u0327";
                    c = e + 1;
                    continue;
                case ";":
                    d += a[++e] + "\u0328";
                    c = e + 1;
                    continue
                }
            }
            d += "\\" + c;
            c = e + 1
        }
        return d + a.slice(c)
    }
    function Ug(a) {
        var c, b;
        w.read_file ? 2 < nc ? t(1, "Too many include levels") : (c = w.read_file(a)) ? (nc++,
        b = A(l),
        $c(a, c),
        b.state = l.state,
        l = b,
        nc--) : t(1, "Cannot read file '$1'", a) : t(1, "No read_file support")
    }
    function $c(a, c, b, d) {
        function e() {
            var a, e = c.indexOf("K:", b);
            if (0 > e)
                return !1;
            e = c.indexOf("\n", e);
            if (l.select.test(c.slice(l.bol, e)))
                return !0;
            a = /\n\w*\n/;
            a.lastIndex = e;
            n = a.exec(c) ? a.lastIndex : d;
            return !1
        }
        function f(a, b) {
            if (!a)
                return a;
            0 <= a.indexOf("%") && (a = a.replace(/([^\\])%.*/, "$1").replace(/\\%/g, "%"));
            a = a.replace(/\s+$/, "");
            return b && 0 <= a.indexOf("\\") ? Vb(a) : a
        }
        function g() {
            Df();
            P.W && Vg(P.W);
            var a, b, c, d, e, f, g = r.infoname.split("\n"), m = g.length;
            for (a = 0; a < m; a++)
                if (c = g[a][0],
                !(0 > r.writefields.indexOf(c)) && (c = P[c])) {
                    d || (d = !0,
                    ra("history"),
                    ja(r.textspace),
                    e = E.curfont.size * r.lineskipfac);
                    f = g[a].slice(2);
                    '"' == f[0] && (f = f.slice(1, -1));
                    ja(e);
                    b = Pa(f);
                    na(0, 0, f, null, null, b);
                    f = b[0];
                    c = c.split("\n");
                    na(f, 0, c[0]);
                    for (b = 1; b < c.length; b++)
                        ja(e),
                        na(f, 0, c[b]);
                    ja(.3 * e);
                    zb();
                    Kb(E.curfont)
                }
            Lc();
            l.state = 0;
            r = Ya.cfmt;
            P = Ya.info;
            Wa = Ya.char_tb;
            za = Ya.glovar;
            Ab = Ya.maps;
            Lb = Ya.mac;
            vd = Ya.maci;
            l.tune_v_opts = null;
            l.scores = null;
            Ef();
            ga.chg = !0;
            fb()
        }
        function m(a, b) {
            var d, e;
            if ("end" != a) {
                b ? (l.tune_v_opts || (l.tune_v_opts = {}),
                d = l.tune_v_opts) : (l.voice_opts || (l.voice_opts = {}),
                d = l.voice_opts);
                for (d[a] = []; ; ) {
                    e = ++n;
                    if ("%" != c[e])
                        break;
                    n = c.indexOf("\n", n);
                    if (c[e + 1] == v) {
                        e += 2;
                        u = 0 > n ? c.slice(e) : c.slice(e, n);
                        x = u.match(/\S+/);
                        switch (x[0]) {
                        default:
                            d[a].push(f(u, !0));
                            continue;
                        case "score":
                        case "staves":
                        case "tune":
                        case "voice":
                            e -= 2
                        }
                        break
                    }
                }
                n = l.eol = e - 1
            }
        }
        function h() {
            var a, d, e, f, g = c.indexOf("K:", b), g = c.indexOf("\n", g);
            f = c.slice(l.bol, g);
            for (g in l.tune_opts)
                if (l.tune_opts.hasOwnProperty(g) && (new RegExp(g)).test(f)) {
                    a = l.tune_opts[g];
                    for (d = 0; d < a.t_opts.length; d++)
                        switch (e = a.t_opts[d],
                        e.match(/\S+/)[0]) {
                        case "score":
                        case "staves":
                            l.scores || (l.scores = []);
                            l.scores.push(e);
                            break;
                        default:
                            ba.do_pscom(e)
                        }
                    if (a = a.v_opts)
                        for (d in a)
                            a.hasOwnProperty(d) && (l.tune_v_opts || (l.tune_v_opts = {}),
                            l.tune_v_opts[d] = l.tune_v_opts[d] ? l.tune_v_opts[d].concat(a[d]) : a[d])
                }
        }
        var n, k, p, v, D, u, x, y, w, z = "\n";
        abc2svg.modules && (abc2svg.modules.hooks.length || abc2svg.modules.g_hooks.length) && Wg();
        l.file = c;
        l.fname = a;
        void 0 == b && (b = 0);
        d || (d = c.length);
        for (; b < d; b = l.eol + 1) {
            n = c.indexOf("\n", b);
            if (0 > n || n > d)
                n = d;
            for (l.eol = n; ; ) {
                n--;
                switch (c[n]) {
                case " ":
                case "\t":
                    continue
                }
                break
            }
            n++;
            if (n == b)
                1 == l.state ? (l.istart = b,
                t(1, "Empty line in tune header - ignored")) : 2 <= l.state && (g(),
                l.select && (n = c.indexOf("\nX:", l.eol),
                0 > n && (n = d),
                l.eol = n));
            else {
                l.istart = l.bol = b;
                l.iend = n;
                l.line.index = 0;
                p = c[b];
                v = c[b + 1];
                if ("%" == p) {
                    if (0 > l.prefix.indexOf(v))
                        continue;
                    "a" == c[b + 2] && "b" == c[b + 3] && "c" == c[b + 4] && " " == c[b + 5] ? (b += 6,
                    p = c[b],
                    v = c[b + 1]) : w = !0
                } else
                    "I" == p && ":" == v && (w = !0);
                if (w) {
                    if (w = !1,
                    b += 2,
                    u = c.slice(b, n),
                    (x = u.match(/([^\s]+)\s*(.*)/)) && "%" != x[1][0]) {
                        switch (x[1]) {
                        case "abcm2ps":
                        case "ss-pref":
                            l.prefix = x[2];
                            continue;
                        case "abc-include":
                            Ug(f(x[2]));
                            continue
                        }
                        if ("begin" == x[1].slice(0, 5))
                            y = x[1].substr(5),
                            k = "\n" + p + v + "end" + y,
                            a = c.indexOf(k, n),
                            0 > a ? (t(1, "No $1 after %%$2", k.slice(1), x[1]),
                            l.eol = d) : (ba.do_begin_end(y, f(x[2]), c.slice(n + 1, a).replace(new RegExp("^" + p + v,"gm"), "")),
                            l.eol = c.indexOf("\n", a + 6),
                            0 > l.eol && (l.eol = d));
                        else {
                            switch (x[1]) {
                            case "select":
                                if (0 != l.state) {
                                    t(1, O.not_in_tune, "%%select");
                                    continue
                                }
                                a = f(u.slice(7));
                                '"' == a[0] && (a = a.slice(1, -1));
                                if (!a) {
                                    delete l.select;
                                    continue
                                }
                                a = a.replace(/\(/g, "\\(");
                                a = a.replace(/\)/g, "\\)");
                                l.select = new RegExp(a,"m");
                                continue;
                            case "tune":
                                if (0 != l.state) {
                                    t(1, O.not_in_tune, "%%tune");
                                    continue
                                }
                                a = f(x[2]);
                                if (!a) {
                                    l.tune_opts = {};
                                    continue
                                }
                                if ("end" == a)
                                    continue;
                                l.tune_opts || (l.tune_opts = {});
                                for (l.tune_opts[a] = a = {
                                    t_opts: []
                                }; ; ) {
                                    b = ++n;
                                    if ("%" != c[b])
                                        break;
                                    n = c.indexOf("\n", n);
                                    if (c[b + 1] == v) {
                                        b += 2;
                                        u = 0 > n ? c.slice(b) : c.slice(b, n);
                                        x = u.match(/([^\s]+)\s*(.*)/);
                                        switch (x[1]) {
                                        case "tune":
                                            break;
                                        case "voice":
                                            m(f(x[2], !0), !0);
                                            continue;
                                        default:
                                            a.t_opts.push(f(u, !0));
                                            continue
                                        }
                                        break
                                    }
                                }
                                l.tune_v_opts && (a.v_opts = l.tune_v_opts,
                                l.tune_v_opts = null);
                                l.eol = b - 1;
                                continue;
                            case "voice":
                                if (0 != l.state) {
                                    t(1, O.not_in_tune, "%%voice");
                                    continue
                                }
                                a = f(x[2]);
                                if (!a) {
                                    l.voice_opts = null;
                                    continue
                                }
                                m(a);
                                continue
                            }
                            ba.do_pscom(f(u, !0))
                        }
                    }
                } else if (":" == v && /[A-Za-z+]/.test(p)) {
                    for (b += 2; ; ) {
                        switch (c[b]) {
                        case " ":
                        case "\t":
                            b++;
                            continue
                        }
                        break
                    }
                    u = f(c.slice(b, n), !0);
                    if ("+" == p) {
                        if (!D) {
                            t(1, "+: without previous info field");
                            continue
                        }
                        z = " ";
                        p = D
                    }
                    switch (p) {
                    case "X":
                        if (0 != l.state) {
                            t(1, O.ignored, p);
                            continue
                        }
                        if (l.select && !e()) {
                            n = c.indexOf("\nX:", l.eol);
                            0 > n && (n = d);
                            l.eol = n;
                            continue
                        }
                        Ya.cfmt = A(r);
                        r.pos = A(r.pos);
                        Ya.info = A(P, 1);
                        Ya.char_tb = A(Wa);
                        Ya.glovar = A(za);
                        Ya.maps = A(Ab, 1);
                        Ya.mac = A(Lb);
                        Ya.maci = new Int8Array(vd);
                        P.X = u;
                        l.state = 1;
                        l.tune_opts && h();
                        continue;
                    case "T":
                        switch (l.state) {
                        case 0:
                            continue;
                        case 1:
                            P.T = void 0 == P.T ? u : P.T + ("\n" + u);
                            continue
                        }
                        a = Bb("title");
                        a.text = u;
                        continue;
                    case "K":
                        switch (l.state) {
                        case 0:
                            continue;
                        case 1:
                            P.K = u
                        }
                        ad(p, u);
                        continue;
                    case "W":
                        if (0 == l.state || 0 > r.writefields.indexOf(p))
                            break;
                        P.W = void 0 == P.W ? u : P.W + (z + u);
                        break;
                    case "m":
                        if (2 <= l.state) {
                            t(1, O.ignored, p);
                            continue
                        }
                        if ((!r.sound || "play" != r.sound) && 0 > r.writefields.indexOf(p))
                            break;
                        x = u.match(/(.*?)[= ]+(.*)/);
                        if (!x || !x[2]) {
                            t(1, O.bad_val, "m:");
                            continue
                        }
                        Lb[x[1]] = x[2];
                        vd[x[1].charCodeAt(0)] = 1;
                        break;
                    case "s":
                        if (3 != l.state || 0 > r.writefields.indexOf(p))
                            break;
                        Xg(u, " " == z);
                        break;
                    case "w":
                        if (3 != l.state || 0 > r.writefields.indexOf(p))
                            break;
                        Yg(u, " " == z);
                        if ("\\" == u.slice(-1)) {
                            z = " ";
                            D = p;
                            continue
                        }
                        break;
                    case "|":
                        if (2 > l.state)
                            continue;
                        l.line.buffer = f(c.slice(b, n), !0);
                        Ff();
                        continue;
                    default:
                        if (0 <= "ABCDFGHNOSZ".indexOf(p)) {
                            if (2 <= l.state) {
                                t(1, O.ignored, p);
                                continue
                            }
                            P[p] = P[p] ? P[p] + (z + u) : u
                        } else {
                            ad(p, u);
                            continue
                        }
                    }
                    z = "\n";
                    D = p
                } else
                    D = void 0,
                    2 > l.state || (l.line.buffer = f(c.slice(b, n), !0),
                    Ff())
            }
        }
        nc || (2 <= l.state && g(),
        l.state = 0)
    }
    function Gf(a) {
        var c, b, d, e, f, g = a.stem;
        e = a.nhd;
        if (0 != e) {
            f = .78 * Hf[a.head];
            a.grace && (f *= .5);
            0 <= g ? (c = 1,
            b = e + 1,
            e = a.notes[0].pit) : (f = -f,
            c = e - 1,
            b = -1,
            e = a.notes[e].pit);
            for (var m = !1, q = 0; c != b; c += g) {
                d = a.notes[c].pit - e;
                e = a.notes[c].pit;
                if (0 == d) {
                    if (m) {
                        d = a.notes[c].shhd = a.notes[c - g].shhd + f;
                        q < d && (q = d);
                        continue
                    }
                    if (c + g != b && e + g == a.notes[c + g].pit) {
                        a.notes[c].shhd = -f;
                        q < -f && (q = -f);
                        continue
                    }
                }
                0 > d && (d = -d);
                if (3 < d || 2 <= d && a.head != h.SQUARE)
                    m = !1;
                else if (m = !m)
                    a.notes[c].shhd = f,
                    q < f && (q = f)
            }
            a.xmx = q
        }
    }
    function If(a, c) {
        var b, d, e, f, g, m, h = a.length;
        for (b = h - 1; 0 <= --b; )
            if ((e = a[b].shhd) && !(0 < e))
                for (e = c - e,
                g = a[b].pit,
                d = h; 0 <= --d; )
                    if (a[d].acc) {
                        f = a[d].pit;
                        if (f < g - 3)
                            break;
                        !(f > g + 3) && a[d].shac < e && (a[d].shac = e)
                    }
        for (b = h; 0 <= --b; )
            if (m = a[b].acc) {
                e = a[b].shac;
                e || (e = a[b].shhd,
                e = 0 > e ? c - e : c);
                g = a[b].pit;
                for (d = h; --d > b; )
                    a[d].acc && (f = a[d].pit,
                    !(f >= g + 4 && (f > g + 4 || 0 > m || 0 > a[d].acc)) && e > a[d].shac - 6 && (f = a[d].shac + 7,
                    f > e && (e = f)));
                a[b].shac = e
            }
    }
    function Mb(a, c) {
        c ? (a.ts_next = c,
        a.ts_prev = c.ts_prev,
        a.ts_prev && (a.ts_prev.ts_next = a),
        c.ts_prev = a) : a.ts_next = a.ts_prev = null
    }
    function lb(a) {
        a.next && (a.next.prev = a.prev);
        a.prev ? a.prev.next = a.next : a.p_v.sym = a.next;
        a.ts_next && (a.seqst && (a.ts_next.seqst ? (a.ts_next.shrink += a.shrink,
        a.ts_next.space += a.space) : (a.ts_next.seqst = !0,
        a.ts_next.shrink = a.shrink,
        a.ts_next.space = a.space)),
        a.ts_next.ts_prev = a.ts_prev);
        a.ts_prev && (a.ts_prev.ts_next = a.ts_next);
        W == a && (W = a.ts_next);
        Sb == a && (Sb = a.ts_next)
    }
    function Jf(a, c, b) {
        var d = a.p_v
          , e = a.st;
        a.type == h.BAR && a.prev && a.prev.type == h.BAR && ":" != a.prev.bar_type[0] && (a = a.prev);
        d.last_sym = a.prev;
        d.last_sym || (d.sym = null);
        d.time = a.time;
        d = Mc(d, h.CLEF);
        d.next = a;
        a.prev = d;
        d.clef_type = c;
        d.clef_line = b;
        d.st = e;
        d.clef_small = !0;
        delete d.second;
        d.notes = [];
        d.notes[0] = {
            pit: a.notes[0].pit
        };
        for (d.nhd = 0; !a.seqst; )
            a = a.ts_prev;
        Mb(d, a);
        d.ts_prev.type != h.CLEF && (d.seqst = !0);
        return d
    }
    function Kf(a, c, b) {
        var d, e, f = 0;
        for (e = 0; e < a.a_gch.length; e++)
            switch (d = a.a_gch[e],
            d.type) {
            case "<":
                d = d.wh[0] + c;
                d > b && (b = d);
                break;
            case ">":
                d = d.wh[0] + a.wr,
                d > f && (f = d)
            }
        a.wr < f && (a.wr = f);
        return b
    }
    function Lf(a) {
        var c, b, d, e, f, g;
        switch (a.type) {
        case h.NOTE:
        case h.REST:
            a.wr = e = Zg[a.head];
            0 < a.xmx && (a.wr += a.xmx + 4);
            for (c = a.prev; c && 0 == gb[c.type]; c = c.prev)
                ;
            if (c)
                switch (c.type) {
                case h.BAR:
                case h.CLEF:
                case h.KEY:
                case h.METER:
                    e += 3
                }
            for (b = 0; b <= a.nhd; b++)
                d = a.notes[b].shhd,
                0 > d && e < -d + 5 && (e = -d + 5),
                a.notes[b].acc && (d = a.notes[b].shac + (a.notes[b].micro ? 5.5 : 3.5),
                e < d && (e = d));
            if (c)
                switch (c.type) {
                case h.BAR:
                case h.CLEF:
                case h.KEY:
                case h.METER:
                    e -= 3
                }
            a.a_dd && (e += pe(a));
            a.beam_st && a.beam_end && 0 < a.stem && 0 < a.nflags && a.wr < a.xmx + 9 && (a.wr = a.xmx + 9);
            if (a.dots) {
                if (void 0 == a.wl)
                    switch (a.head) {
                    case h.SQUARE:
                    case h.OVALBARS:
                        a.xmx += 3;
                        break;
                    case h.OVAL:
                        a.xmx += 1
                    }
                a.wr < a.xmx + 8 && (a.wr = a.xmx + 8);
                2 <= a.dots && (a.wr += 3.5 * (a.dots - 1))
            }
            a.trem2 && a.beam_end && 20 > e && (e = 20);
            d = e;
            if (c)
                switch (c.type) {
                case h.NOTE:
                    0 < c.stem && 0 > a.stem && 7 > d && (d = 7);
                    (27 < a.y && 27 < c.y || -3 > a.y && -3 > c.y) && 6 > d && (d = 6);
                    c.ti1 && 14 > d && (d = 14);
                    break;
                case h.CLEF:
                    if (c.second || c.clef_small)
                        break;
                    d += 8;
                    break;
                case h.KEY:
                    d += 4
                }
            a.a_gch && (d = Kf(a, e, d));
            a.a_ly && (d = Mf(a, d));
            a.wl = c && c.type == h.GRACE ? e - 4.5 : d;
            return;
        case h.SPACE:
            d = a.width / 2;
            a.wr = d;
            a.a_gch && (d = Kf(a, d, d));
            a.a_dd && (d += pe(a));
            a.wl = d;
            return;
        case h.BAR:
            if (a.norepbra)
                break;
            d = a.bar_type;
            switch (d) {
            case "|":
                e = 5;
                break;
            default:
                for (e = 2 + 2.8 * d.length,
                c = 0; c < d.length; c++)
                    switch (d[c]) {
                    case "[":
                    case "]":
                        e += 3;
                        break;
                    case ":":
                        e += 2
                    }
            }
            a.wl = e;
            a.wr = a.next && a.next.type != h.METER ? 7 : 5;
            for (c = a.prev; c; c = c.prev)
                if (0 != gb[c.type]) {
                    c.type == h.GRACE && (a.wl -= 8);
                    break
                }
            a.a_dd && (a.wl += pe(a));
            a.text && 4 > a.text.length && a.next && a.next.a_gch && (ra("repeat"),
            a.wr += Pa(a.text)[0] + 2);
            return;
        case h.CLEF:
            if (a.invis) {
                a.wl = a.wr = 1;
                return
            }
            a.wl = a.clef_small ? 9 : 12;
            a.wr = a.clef_small ? 7 : 12;
            return;
        case h.KEY:
            a.wl = 3;
            g = 4;
            if (a.k_a_acc) {
                if (e = f = a.k_a_acc.length)
                    b = a.k_a_acc[0].acc;
                for (c = 1; c < f; c++)
                    d = a.k_a_acc[c],
                    d.pit > a.k_a_acc[c - 1].pit + 6 || d.pit < a.k_a_acc[c - 1].pit - 6 ? e-- : d.acc != b && (g += 3),
                    b = d.acc
            } else
                e = a.k_sf,
                f = a.k_old_sf && (r.cancelkey || 0 == e) ? a.k_old_sf : 0,
                0 <= e * f ? (0 > e && (e = -e),
                0 > f && (f = -f),
                f > e && (e = f)) : (e -= f,
                0 > e && (e = -e),
                g += 3);
            a.wr = 5.5 * e + g;
            return;
        case h.METER:
            d = 0;
            a.x_meter = [];
            for (c = 0; c < a.a_meter.length; c++)
                switch (f = a.a_meter[c],
                f.top[0]) {
                case "C":
                case "c":
                case "o":
                    a.x_meter[c] = d + 6;
                    d += 12;
                    break;
                case ".":
                case "|":
                    a.x_meter[c] = a.x_meter[c - 1];
                    break;
                default:
                    e = 0;
                    f = !f.bot || f.top.length > f.bot.length ? f.top : f.bot;
                    for (b = 0; b < f.length; b++)
                        switch (f[b]) {
                        case "(":
                            d += 4;
                        case ")":
                        case "1":
                            e += 4;
                            break;
                        default:
                            e += 12
                        }
                    a.x_meter[c] = d + e / 2;
                    d += e
                }
            a.wl = 0;
            a.wr = d + 6;
            return;
        case h.MREST:
            a.wl = 6;
            a.wr = 66;
            return;
        case h.GRACE:
            var m;
            f = r.gracespace[0];
            c = r.gracespace[1];
            b = r.gracespace[2];
            e = a.extra;
            a.prev && a.prev.type == h.BAR && (f -= 3);
            for (e.beam_st = !0; ; e = e.next) {
                Gf(e);
                If(e.notes, 7);
                m = 0;
                for (g = e.nhd; 0 <= g; g--)
                    e.notes[g].shac > m && (m = e.notes[g].shac);
                f += m;
                e.x = f;
                0 >= e.nflags && (e.beam_st = !0,
                e.beam_end = !0);
                g = e.next;
                if (!g) {
                    e.beam_end = !0;
                    break
                }
                0 >= g.nflags && (e.beam_end = !0);
                e.beam_end && (g.beam_st = !0,
                f += c / 4);
                0 >= e.nflags && (f += c / 4);
                e.y > g.y + 8 && (f -= 1.5);
                f += c
            }
            (g = a.next) && g.type == h.NOTE && (e.y >= 3 * (g.notes[g.nhd].pit - 18) ? --b : e.beam_st && e.y < 3 * (g.notes[g.nhd].pit - 18) - 4 && (b += 2));
            a.wl = f + b;
            a.wr = 0;
            a.a_ly && Mf(a, d);
            return;
        case h.STBRK:
            a.wl = a.xmx;
            a.next && a.next.type == h.CLEF ? (a.wr = 2,
            delete a.next.clef_small) : a.wr = 8;
            return;
        case h.CUSTOS:
            a.wl = a.wr = 4;
            return;
        case h.TEMPO:
            ra("tempo");
            a.tempo_str1 && (a.tempo_wh1 = Pa(a.tempo_str1));
            a.tempo_notes && (a.tempo_str0 = "= ",
            a.tempo_ca && (a.tempo_str0 += a.tempo_ca),
            a.tempo && (a.tempo_str0 += a.tempo),
            a.tempo_wh0 = Pa(a.tempo_str0));
            a.tempo_str2 && (a.tempo_wh2 = Pa(a.tempo_str2));
            break;
        case h.BLOCK:
        case h.PART:
        case h.REMARK:
        case h.STAVES:
            break;
        default:
            K(2, a, "set_width - Cannot set width for symbol $1", a.type)
        }
        a.wl = a.wr = 0
    }
    function Nf(a, c) {
        var b, d, e;
        wd >= h.BLEN / 2 ? c = wd >= h.BLEN ? c / 4 : c / 2 : !a.next && c >= h.BLEN && (c /= 2);
        b = c >= h.BLEN / 4 ? c < h.BLEN / 2 ? 5 : c < h.BLEN ? 6 : c < 2 * h.BLEN ? 7 : c < 4 * h.BLEN ? 8 : 9 : c >= h.BLEN / 8 ? 4 : c >= h.BLEN / 16 ? 3 : c >= h.BLEN / 32 ? 2 : c >= h.BLEN / 64 ? 1 : 0;
        d = c - (h.BLEN / 16 / 8 << b);
        e = mb[b];
        0 != d && (0 > d ? e = mb[0] * c / (h.BLEN / 16 / 8) : (9 <= b && (b = 8),
        e += (mb[b + 1] - mb[b]) * d / c));
        return e
    }
    function Nc(a) {
        var c, b, d = a.ts_prev.time;
        c = a.time - d;
        if (0 == c) {
            switch (a.type) {
            case h.MREST:
                return a.wl
            }
            return 0
        }
        if (a.ts_prev.type == h.MREST)
            return 71;
        for (b = Nf(a, c); !a.dur; ) {
            switch (a.type) {
            case h.BAR:
                return .9 * b - 7;
            case h.CLEF:
                return b - a.wl - a.wr;
            case h.BLOCK:
            case h.PART:
            case h.REMARK:
            case h.STAVES:
            case h.TEMPO:
                a = a.ts_next;
                if (!a)
                    return b;
                continue
            }
            break
        }
        if (a.dur && c <= h.BLEN / 4)
            for (c = a; c; ) {
                if (!c.beam_st) {
                    b *= .9;
                    break
                }
                c = c.ts_next;
                if (!c || c.seqst)
                    break
            }
        if (a.type == h.NOTE && -1 <= a.nflags && 0 < a.stem) {
            var e = !0;
            for (c = a.ts_prev; c && c.time == d; c = c.ts_prev)
                if (c.type == h.NOTE && (-1 > c.nflags || 0 < c.stem)) {
                    e = !1;
                    break
                }
            if (e) {
                for (c = a.ts_next; c && c.time == a.time; c = c.ts_next)
                    if (c.type == h.NOTE && (-1 > c.nflags || 0 > c.stem)) {
                        e = !1;
                        break
                    }
                e && (b *= .9)
            }
        }
        return b
    }
    function Of(a) {
        var c = {
            type: h.BAR,
            bar_type: "|",
            fname: a.fname,
            istart: a.istart,
            iend: a.iend,
            v: a.v,
            p_v: a.p_v,
            st: a.st,
            dur: 0,
            seqst: !0,
            invis: !0,
            time: a.time + a.dur,
            nhd: 0,
            notes: [{
                pit: a.notes[0].pit
            }],
            wl: 0,
            wr: 0,
            prev: a,
            ts_prev: a,
            shrink: a.wr + 3
        };
        return a.next = a.ts_next = c
    }
    function xd(a) {
        a.type = h.REST;
        delete a.in_tuplet;
        delete a.sl1;
        delete a.sl2;
        delete a.a_dd;
        delete a.a_gch;
        a.slur_start = a.slur_end = 0
    }
    function $g(a) {
        var c, b, d, e, f, g = a.repeat_n, m = a.repeat_k, q = a.st, n = a.v;
        a.repeat_n = 0;
        if (0 > g) {
            d = g = -g;
            for (b = a.prev; b; b = b.prev)
                if (!b.dur) {
                    if (b.type == h.BAR) {
                        K(1, b, "Bar in repeat sequence");
                        return
                    }
                } else if (0 >= --d)
                    break;
            if (b) {
                f = a.time - b.time;
                d = m * g;
                for (c = a; c; c = c.next)
                    if (!c.dur) {
                        if (c.type == h.BAR) {
                            K(1, c, "Bar in repeat sequence");
                            return
                        }
                    } else if (0 >= --d)
                        break;
                if (c && c.next) {
                    for (c = a.prev; c != b; c = c.prev)
                        if (c.type == h.NOTE) {
                            c.beam_end = !0;
                            break
                        }
                    for (e = m; 0 <= --e; ) {
                        d = g;
                        a.dur && d--;
                        for (c = a.ts_next; 0 < d; )
                            c.st == q && (lb(c),
                            c.v == n && c.dur && d--),
                            c = c.ts_next;
                        xd(a);
                        a.dur = a.notes[0].dur = f;
                        a.rep_nb = -1;
                        a.beam_st = !0;
                        ba.set_width(a);
                        a.seqst && (a.space = Nc(a));
                        a.head = h.SQUARE;
                        for (a = c; a && (a.st != q || a.v != n || !a.dur); a = a.ts_next)
                            ;
                    }
                } else
                    K(1, a, O.not_enough_n)
            } else
                K(1, a, O.not_enough_n)
        } else {
            d = g;
            for (c = a.prev.prev; c && (c.type != h.BAR && c.time != W.time || !(0 >= --d)); c = c.prev)
                ;
            if (c) {
                f = a.time - c.time;
                d = 1 == g ? m : g;
                for (c = a; c && !(c.type == h.BAR && 0 >= --d); c = c.next)
                    ;
                if (c) {
                    d = m;
                    if (2 == g && 1 < d) {
                        c = c.next;
                        if (!c) {
                            K(1, a, O.not_enough_m);
                            return
                        }
                        c.repeat_n = g;
                        c.repeat_k = --d
                    }
                    f /= g;
                    if (2 == g) {
                        b = a;
                        for (c = a.ts_next; ; c = c.ts_next)
                            if (c.st == q) {
                                if (c.v == n && c.type == h.BAR)
                                    break;
                                lb(c)
                            }
                        xd(b);
                        b.dur = b.notes[0].dur = f;
                        b.invis = !0;
                        b.seqst && (b.space = Nc(b));
                        c.bar_mrep = 2;
                        c.seqst && (c.space = Nc(c));
                        b = c.next;
                        for (c = b.ts_next; ; c = c.ts_next)
                            if (c.st == q) {
                                if (c.v == n && c.type == h.BAR)
                                    break;
                                lb(c)
                            }
                        xd(b);
                        b.dur = b.notes[0].dur = f;
                        b.invis = !0;
                        ba.set_width(b);
                        b.seqst && (b.space = Nc(b));
                        c.seqst && (c.space = Nc(c))
                    } else
                        for (b = a,
                        e = m; 0 <= --e; ) {
                            for (c = b.ts_next; ; c = c.ts_next)
                                if (c.st == q) {
                                    if (c.v == n && c.type == h.BAR)
                                        break;
                                    lb(c)
                                }
                            xd(b);
                            b.dur = b.notes[0].dur = f;
                            b.beam_st = !0;
                            b.seqst && (b.space = Nc(b));
                            c.seqst && (c.space = Nc(c));
                            if (1 == m) {
                                b.rep_nb = 1;
                                break
                            }
                            b.rep_nb = m - e + 1;
                            b = c.next
                        }
                } else
                    K(1, a, O.not_enough_m)
            } else
                K(1, a, O.not_enough_m)
        }
    }
    function gf(a, c) {
        function b(a) {
            if (r.custos && 1 == x.length)
                a: {
                    for (var b, c, d = a; d.type != h.NOTE; )
                        if (d = d.next,
                        !d)
                            break a;
                    b = a.p_v;
                    b.last_sym = a.prev;
                    b.time = a.time;
                    b = Mc(b, h.CUSTOS);
                    b.next = a;
                    a.prev = b;
                    Mb(b, a);
                    b.seqst = !0;
                    b.shrink = a.shrink;
                    12 > b.shrink && (b.shrink = 12);
                    b.space = d.space;
                    b.wl = 0;
                    b.wr = 4;
                    b.nhd = d.nhd;
                    b.notes = [];
                    for (c = 0; c < a.notes.length; c++)
                        b.notes[c] = {
                            pit: d.notes[c].pit,
                            shhd: 0,
                            dur: h.BLEN / 4
                        };
                    b.stemless = !0
                }
            a.nl = !0
        }
        function d(a) {
            if (!a.next)
                return b(a),
                a;
            for (a = a.ts_next; a; a = a.ts_next)
                if (a.seqst) {
                    b(a);
                    break
                }
            return a
        }
        for (var e, f; a; ) {
            if (!a.ts_next)
                return;
            if (a.ts_next.seqst)
                break;
            a = a.ts_next
        }
        if (r.keywarn || r.timewarn)
            for (e = a.ts_next; e; e = e.ts_next) {
                switch (e.type) {
                case h.BAR:
                case h.CLEF:
                    continue;
                case h.KEY:
                    if (!r.keywarn)
                        continue;
                case h.METER:
                    if (e.type == h.METER && !r.timewarn)
                        continue;
                    f = e.ts_prev;
                    if (f == a) {
                        a = e;
                        continue
                    }
                    lb(e);
                    Mb(e, a.ts_next);
                    for (a = e; ; )
                        if (e = e.ts_prev,
                        e.v == a.v) {
                            a.next = e.next;
                            a.prev = e;
                            a.next.prev = a;
                            e.next = a;
                            break
                        }
                    a.type != a.ts_prev.type ? a.seqst || (a.seqst = !0,
                    a.shrink = a.wl + a.prev.wr,
                    a.space = a.ts_next.space,
                    a.ts_next.space = 0) : delete a.seqst;
                    e = f;
                    continue
                }
                if (gb[e.type])
                    break
            }
        if (c)
            return d(a);
        switch (a.type) {
        case h.CLEF:
        case h.BAR:
        case h.STAVES:
            break;
        case h.GRACE:
            if (a = a.next,
            !a)
                return a;
        default:
            return d(a)
        }
        for (; a && (!a.seqst || a.type == h.CLEF); a = a.ts_prev)
            ;
        for (e = 0; ; a = a.ts_next) {
            if (!a)
                return a;
            if (a.seqst) {
                if (0 > e)
                    break;
                switch (a.type) {
                case h.STAVES:
                    if (a.ts_prev && a.ts_prev.type == h.BAR)
                        break;
                    for (; a.ts_next && (0 == gb[a.ts_next.type] || a.ts_next.type == h.CLEF); )
                        a = a.ts_next;
                    if (!a.ts_next || a.ts_next.type != h.BAR)
                        continue;
                    a = a.ts_next;
                case h.BAR:
                    if (e)
                        break;
                    e = 1;
                    continue;
                case h.STBRK:
                    a.stbrk_forced ? e = -1 : lb(a);
                    continue;
                case h.CLEF:
                    if (e)
                        break;
                    continue;
                default:
                    if (!e || a.prev && a.prev.type == h.GRACE)
                        continue
                }
                break
            }
        }
        b(a);
        return a
    }
    function Pf() {
        var a = x[0];
        ba.set_width(a.clef);
        ba.set_width(a.key);
        ba.set_width(a.meter);
        return [a.clef.wl + a.clef.wr + a.key.wl + a.key.wr, a.meter.wl + a.meter.wr]
    }
    function Qf(a, c) {
        var b, d, e = 0, f = 1 - r.maxshrink;
        do {
            a.seqst && (b = a.shrink,
            e = (d = a.space) < b ? e + b : e + (b * r.maxshrink + d * f),
            a.x = e);
            if (a == c)
                break;
            a = a.ts_next
        } while (a);return e
    }
    function yd(a) {
        switch (a.type) {
        case h.CLEF:
            if (a.second || a.invis) {
                a.ymx = a.ymn = 12;
                break
            }
            a.y = 6 * (a.clef_line - 1);
            switch (a.clef_type) {
            default:
                a.ymx = a.y + 28;
                a.ymn = a.y - 14;
                break;
            case "c":
                a.ymx = a.y + 13;
                a.ymn = a.y - 11;
                break;
            case "b":
                a.ymx = a.y + 7,
                a.ymn = a.y - 12
            }
            a.clef_small && (a.ymx -= 2,
            a.ymn += 2);
            26 > a.ymx && (a.ymx = 26);
            -1 < a.ymn && (a.ymn = -1);
            a.clef_octave && (0 < a.clef_octave ? a.ymx += 12 : a.ymn -= 12);
            break;
        case h.KEY:
            a.ymx = 2 < a.k_sf ? 34 : 0 < a.k_sf ? 30 : 26;
            a.ymn = -2;
            break;
        default:
            a.ymx = 24,
            a.ymn = 0
        }
    }
    function ah() {
        function a(a, b, c) {
            var d = ["15mb(", "8vb(", null, "8va(", "15ma("]
              , e = ["15mb)", "8vb)", null, "8va)", "15ma)"];
            Xc([(c ? d : e)[2 + b]], a)
        }
        var c, b, d, e = S + 1, f = new Int16Array(Array(2 * e)), g = new Int8Array(Array(e));
        for (b = 0; b <= S; b++)
            f[b] = 0,
            g[b] = 0;
        for (c = W; c; c = c.ts_next) {
            b = c.st;
            if (void 0 != c.ottava)
                for (; c.ottava.length; )
                    c.ottava[0] ? 0 == g[b]++ && (a(c, c.ottava[0], !0),
                    f[b] = 7 * -c.ottava[0]) : 0 == --g[b] && (a(c, -f[b] / 7),
                    f[b] = 0),
                    c.ottava.shift();
            switch (c.type) {
            case h.REST:
                if (1 == x.length)
                    break;
            case h.NOTE:
                if (b = f[b],
                0 != b && !c.p_v.key.k_drum)
                    for (e = c.nhd; 0 <= e; e--)
                        d = c.notes[e],
                        d.opit = d.pit,
                        d.pit += b
            }
        }
    }
    function hf(a, c, b) {
        var d, e, f, g;
        f = 12;
        e = 20;
        for (d = c; d && (d.type != h.STAVES || d == c); d = d.ts_next)
            if (d.st == a)
                if (d.type != h.NOTE) {
                    if (d.type == h.CLEF) {
                        if ("a" != d.clef_type)
                            break;
                        lb(d)
                    }
                } else
                    d.notes[0].pit < e ? e = d.notes[0].pit : d.notes[d.nhd].pit > f && (f = d.notes[d.nhd].pit);
        if (19 <= e || 13 <= e && "b" != b)
            return "t";
        if (13 >= f || 19 >= f && "t" != b)
            return "b";
        "a" == b && (b = 16 <= (f + e) / 2 ? "t" : "b");
        f = b;
        var m = d
          , q = null;
        for (d = c; d != m && (d.type != h.STAVES || d == c); d = d.ts_next)
            if (d.st == a && d.type == h.NOTE) {
                g = d.time;
                if ("t" == f) {
                    if (12 < d.notes[0].pit || 20 < d.notes[d.nhd].pit) {
                        20 < d.notes[0].pit && (q = d);
                        continue
                    }
                    if ((e = d.ts_prev) && e.time == g && e.st == a && e.type == h.NOTE && 19 <= e.notes[0].pit)
                        continue;
                    if ((e = d.ts_next) && e.st == a && e.time == g && e.type == h.NOTE && 19 <= e.notes[0].pit)
                        continue
                } else {
                    if (12 > d.notes[0].pit || 20 > d.notes[d.nhd].pit) {
                        12 > d.notes[d.nhd].pit && (q = d);
                        continue
                    }
                    if ((e = d.ts_prev) && e.time == g && e.st == a && e.type == h.NOTE && 13 >= e.notes[0].pit)
                        continue;
                    if ((e = d.ts_next) && e.st == a && e.time == g && e.type == h.NOTE && 13 >= e.notes[0].pit)
                        continue
                }
                if (q) {
                    g = d;
                    for (e = d.ts_prev; e != q; e = e.ts_prev)
                        if (e.st == a) {
                            if (e.type == h.BAR && e.v == d.v) {
                                g = ":" != e.bar_type[0] ? e : e.next;
                                break
                            }
                            e.type == h.NOTE && e.beam_st && !e.p_v.second && (g = e)
                        }
                    g.time == q.time ? q = d : (q = d,
                    f = "t" == f ? "b" : "t",
                    e = Jf(g, f, "t" == f ? 2 : 4),
                    e.clef_auto = !0)
                } else
                    f = b = "t" == f ? "b" : "t",
                    q = d
            }
        return b
    }
    function Rf(a, c, b) {
        var d = {
            type: a,
            fname: b.fname,
            v: c.v,
            p_v: c,
            st: c.st,
            time: b.time,
            next: c.last_sym.next
        };
        d.next && (d.next.prev = d);
        c.last_sym.next = d;
        d.prev = c.last_sym;
        c.last_sym = d;
        Mb(d, b);
        d.ts_prev.type != a && (d.seqst = !0);
        b.type == a && d.v != b.v && (delete b.seqst,
        b.shrink = 0);
        return d
    }
    function bh() {
        var a, c, b, d, e, f = x.length;
        for (e = 0; e < f; e++)
            if (!(0 > F.voices[e].range)) {
                a = x[e];
                a.second = F.voices[e].second;
                a.last_sym = a.sym;
                for (b = F.voices[e].st; b < S && !F.st_print[b]; )
                    b++;
                a.st = b
            }
        for (d = W; d && d.type == h.CLEF; )
            e = d.v,
            0 <= F.voices[e].range && !F.voices[e].second && (delete d.clef_small,
            a = d.p_v,
            a.last_sym = a.sym = d),
            d = d.ts_next;
        for (e = 0; e < f; e++)
            a = x[e],
            a.sym && a.sym.type == h.CLEF || 0 > F.voices[e].range || F.voices[e].second && !a.bar_start || (b = F.voices[e].st,
            u[b] && u[b].clef && (c = A(u[b].clef),
            c.v = e,
            c.p_v = a,
            c.st = b,
            c.time = W.time,
            c.prev = null,
            c.next = a.sym,
            c.next && (c.next.prev = c),
            a.sym = c,
            a.last_sym = c,
            c.ts_next = d,
            c.ts_prev = d ? d.ts_prev : null,
            c.ts_prev ? (c.ts_prev.ts_next = c,
            delete c.seqst) : (W = c,
            c.seqst = !0),
            d && (d.ts_prev = c,
            d.type == h.CLEF && delete d.seqst),
            delete c.clef_small,
            c.second = F.voices[e].second,
            F.st_print[b] || (c.invis = !0)));
        for (e = 0; e < f; e++)
            if (!(0 > F.voices[e].range || F.voices[e].second) && F.st_print[F.voices[e].st])
                if (a = x[e],
                d && d.v == e && d.type == h.KEY)
                    a.last_sym = d,
                    d.k_old_sf = d.k_sf,
                    d = d.ts_next;
                else if (b = a.key,
                b.k_sf || b.k_a_acc)
                    c = Rf(h.KEY, a, d),
                    c.k_sf = b.k_sf,
                    c.k_mode = b.k_mode,
                    c.k_old_sf = b.k_sf,
                    c.k_none = b.k_none,
                    c.k_a_acc = b.k_a_acc,
                    c.istart = b.istart,
                    c.iend = b.iend,
                    b.k_bagpipe && (c.k_bagpipe = b.k_bagpipe,
                    "p" == c.k_bagpipe && (c.k_old_sf = 3));
        if (ce & 1) {
            for (e = 0; e < f; e++)
                a = x[e],
                b = a.meter,
                0 > F.voices[e].range || F.voices[e].second || !F.st_print[F.voices[e].st] || 0 == b.a_meter.length || (d && d.v == e && d.type == h.METER ? (a.last_sym = d,
                d = d.ts_next) : (c = Rf(h.METER, a, d),
                c.istart = b.istart,
                c.iend = b.iend,
                c.wmeasure = b.wmeasure,
                c.a_meter = b.a_meter));
            ce &= -2
        }
        for (e = 0; e < f; e++)
            a = x[e],
            b = a.bar_start,
            a.bar_start = null,
            d && d.v == e && d.type == h.BAR ? (a.last_sym = d,
            d = d.ts_next) : !b || 0 > F.voices[e].range || !F.st_print[F.voices[e].st] || (b.next = a.last_sym.next,
            b.next && (b.next.prev = b),
            a.last_sym.next = b,
            b.prev = a.last_sym,
            a.last_sym = b,
            Mb(b, d),
            b.time = W.time,
            b.ts_prev.type != b.type && (b.seqst = !0),
            d && d.type == b.type && b.v != d.v && delete d.seqst);
        ba.set_pitch(d);
        for (c = W; ; ) {
            b = c;
            e = 0;
            do
                ba.set_width(c),
                a = c.wl,
                c.prev && (a += c.prev.wr),
                a > e && (e = a),
                c = c.ts_next;
            while (c != d && !c.seqst);b.shrink = e;
            b.space = 0;
            if (c == d)
                break
        }
        if (c) {
            a = 0;
            do
                ba.set_width(c),
                a < c.wl && (a = c.wl),
                c = c.ts_next;
            while (c && !c.seqst);d.shrink = b.wr + a
        }
    }
    function jf(a) {
        var c, b, d, e, f, g = x.length, m = 0;
        for (c = 0; c < g; c++)
            if (b = x[c],
            !(0 > F.voices[c].range) && (d = (a || b.new_name) && b.nm ? b.nm : b.snm))
                for (f || (ra("voice"),
                f = E.curfont),
                b = 0; ; ) {
                    e = d.indexOf("\\n", b);
                    b = 0 > e ? Pa(d.slice(b)) : Pa(d.slice(b, e));
                    b = b[0];
                    b > m && (m = b);
                    if (0 > e)
                        break;
                    b = e + 1
                }
        f && (m += 4 * bd(" ") * E.curfont.swfac);
        b = .5;
        for (c = 0; c <= F.nstaff; c++) {
            if (F.staves[c].flags & 1280) {
                b = 12;
                break
            }
            F.staves[c].flags & 5 && (b = 6)
        }
        m += b;
        a && (m += r.indent);
        return m
    }
    function ch(a, c) {
        var b, d, e, f, g, m, q, n, k;
        if (a.shiftunison && 3 <= a.shiftunison || (e = a.dur) >= h.BLEN || (f = c.dur) >= h.BLEN || a.stemless && c.stemless || a.dots != c.dots && (a.shiftunison && a.shiftunison & 1 || 0 != a.dots * c.dots) || 0 < a.stem * c.stem)
            return !1;
        b = d = 0;
        if (a.notes[0].pit > c.notes[0].pit) {
            if (0 > a.stem)
                return !1;
            for (; c.notes[d].pit != a.notes[0].pit; )
                if (++d > c.nhd)
                    return !1
        } else if (a.notes[0].pit < c.notes[0].pit) {
            if (0 > c.stem)
                return !1;
            for (; c.notes[0].pit != a.notes[b].pit; )
                if (++b > a.nhd)
                    return !1
        }
        if (c.notes[d].acc != a.notes[b].acc)
            return !1;
        g = b;
        q = d;
        n = a.notes[b].shhd;
        k = c.notes[d].shhd;
        do {
            b++;
            d++;
            if (b > a.nhd)
                break;
            if (d > c.nhd)
                break;
            if (c.notes[d].acc != a.notes[b].acc)
                return !1;
            n < a.notes[b].shhd && (n = a.notes[b].shhd);
            k < c.notes[d].shhd && (k = c.notes[d].shhd)
        } while (c.notes[d].pit == a.notes[b].pit);if (b <= a.nhd) {
            if (d <= c.nhd || 0 < c.stem)
                return !1
        } else if (d <= c.nhd && 0 < a.stem)
            return !1;
        m = b;
        b = d;
        d = 0;
        if (e != f)
            if (e < f && (e = f,
            f = a.dur),
            e < h.BLEN / 2)
                c.dots ? d = 2 : a.dots && (d = 1);
            else if (f < h.BLEN / 4) {
                if (a.shiftunison && a.shiftunison & 2)
                    return !1;
                d = c.dur >= h.BLEN / 2 ? 2 : 1
            } else
                return !1;
        0 == d && (d = a.p_v.scale < c.p_v.scale ? 2 : 1);
        if (1 == d) {
            for (d = q; d < b; d++)
                c.notes[d].invis = !0,
                delete c.notes[d].acc;
            for (d = 0; d <= c.nhd; d++)
                c.notes[d].shhd += n
        } else {
            for (b = g; b < m; b++)
                a.notes[b].invis = !0,
                delete a.notes[b].acc;
            for (b = 0; b <= a.nhd; b++)
                a.notes[b].shhd += k
        }
        return !0
    }
    function kf(a) {
        var c, b, d, e = Ke[a.head], f = e, g = [];
        for (b = 0; 96 > b; b++)
            g.push(-100);
        if (-2 < a.nflags)
            for (0 < a.stem ? (f = -f,
            b = 2 * a.notes[0].pit,
            c = 2 * (Math.ceil((a.ymx - 2) / 3) + 18)) : (b = 2 * (Math.ceil((a.ymn + 2) / 3) + 18),
            c = 2 * a.notes[a.nhd].pit),
            0 > b && (b = 0),
            96 <= c && (c = 95); b <= c; )
                g[b++] = f;
        d = a.notes[0 < a.stem ? 0 : a.nhd].shhd;
        for (c = 0; c <= a.nhd; c++)
            f = -a.notes[c].shhd + e + d,
            b = 2 * a.notes[c].pit,
            0 > b ? b = 0 : 95 <= b && (b = 94),
            f > g[b] && (g[b] = f),
            a.head != h.SQUARE && --f,
            f > g[b - 1] && (g[b - 1] = f),
            f > g[b + 1] && (g[b + 1] = f);
        return g
    }
    function lf(a) {
        var c, b, d, e = Ke[a.head], f = e, g = 0 < a.nflags && a.beam_st && a.beam_end, m = [];
        for (b = 0; 96 > b; b++)
            m.push(-100);
        if (-2 < a.nflags)
            for (0 > a.stem ? (f = -f,
            b = 2 * (Math.ceil((a.ymn + 2) / 3) + 18),
            c = 2 * a.notes[a.nhd].pit,
            d = b + 4) : (b = 2 * a.notes[0].pit,
            c = 2 * (Math.ceil((a.ymx - 2) / 3) + 18)),
            0 > b && (b = 0),
            96 < c && (c = 96); b < c; )
                m[b++] = f;
        if (g)
            if (0 < a.stem)
                for (b = 0 == a.xmx ? 2 * a.notes[a.nhd].pit : 2 * a.notes[0].pit,
                b += 4,
                0 > b && (b = 0); 96 > b && b <= c - 4; b++)
                    m[b] = 11;
            else
                for (b = d,
                0 > b && (b = 0); 96 > b && b <= 2 * a.notes[0].pit - 4; b++)
                    m[b] = 3.5;
        d = a.notes[0 < a.stem ? 0 : a.nhd].shhd;
        for (c = 0; c <= a.nhd; c++)
            f = a.notes[c].shhd + e - d,
            b = 2 * a.notes[c].pit,
            0 > b ? b = 0 : 95 <= b && (b = 94),
            f > m[b] && (m[b] = f),
            a.head != h.SQUARE && --f,
            f > m[b - 1] && (m[b - 1] = f),
            f > m[b + 1] && (m[b + 1] = f);
        return m
    }
    function dh(a) {
        for (var c, b, d = a.p_v; a.type == h.CLEF || a.type == h.KEY || a.type == h.METER; )
            if (a.type == h.METER && a.time > d.sym.time && (ce |= 1),
            a = a.prev,
            !a)
                return;
        if (a.type == h.BAR && (void 0 != a.text && (d.bar_start = A(a),
        d.bar_start.bar_type = "",
        delete a.text,
        delete a.a_gch),
        c = a.bar_type,
        ":" != c && ":" == c.slice(-1)))
            if (d.bar_start || (d.bar_start = A(a)),
            ":" != c[0]) {
                if ("||:" == c)
                    return d.bar_start.bar_type = "[|:",
                    a.bar_type = "||",
                    !0;
                d.bar_start.bar_type = c;
                a.prev && a.prev.type == h.BAR ? lb(a) : a.bar_type = "|"
            } else {
                for (b = 0; ":" == c[b]; )
                    b++;
                if (b < c.length) {
                    a.bar_type = c.slice(0, b) + "|]";
                    for (b = c.length - 1; ":" == c[b]; )
                        b--;
                    d.bar_start.bar_type = "[|" + c.slice(b + 1)
                } else
                    b = c.length / 2 | 0,
                    a.bar_type = c.slice(0, b) + "|]",
                    d.bar_start.bar_type = "[|" + c.slice(b);
                return !0
            }
    }
    function eh(a) {
        for (var c = W; c && !c.nl; c = c.ts_next)
            c.st == a && c.type != h.CLEF && (c.st++,
            c.invis = !0)
    }
    function Sf(a) {
        switch (a.subtype) {
        case "leftmargin":
        case "rightmargin":
        case "pagescale":
        case "pagewidth":
        case "scale":
        case "staffwidth":
            zd();
            ba.set_format(a.subtype, a.param);
            break;
        case "ml":
            zd();
            w.img_out(a.text);
            break;
        case "newpage":
            Lc();
            hb.newpage = !0;
            zb();
            break;
        case "sep":
            fb();
            ja(a.sk1);
            z += '<path class="stroke"\n\td="M';
            qb(a.x, " ", 0);
            z += "h" + a.l.toFixed(1) + '"/>\n';
            ja(a.sk2);
            break;
        case "text":
            Ad(a.text, a.opt);
            break;
        case "title":
            de(a.text, !0);
            break;
        case "vskip":
            ja(a.sk);
            break;
        default:
            K(2, a, "Block $1 not treated", a.subtype)
        }
    }
    function fh() {
        function a(a) {
            var b = u[a]
              , c = k.staves[a];
            b || (b = u[a] = {});
            b.y = 0;
            b.stafflines = c.stafflines;
            b.staffscale = c.staffscale;
            b.ann_top = b.ann_bot = 0
        }
        function c() {
            var a, b, c, d = k.staves.length;
            for (a = 0; a < d; a++)
                if (k.staves[a].flags & 257) {
                    c = 0;
                    for (b = a; a < d; ) {
                        c |= q[a] ? 1 : 2;
                        if (k.staves[a].flags & 514)
                            break;
                        a++
                    }
                    if (3 == c)
                        for (; b <= a; )
                            q[b] = !0,
                            n[b++] = !0
                }
        }
        var b, d, e, f, g, m, q = [], n = [], k = F;
        S = f = k.nstaff;
        for (e = 0; e <= f; e++)
            a(e);
        for (b = W; b && !b.nl; b = b.ts_next) {
            b.ts_next || (d = b);
            switch (b.type) {
            case h.STAVES:
                c();
                k.st_print = new Uint8Array(q);
                k = b.sy;
                f = k.nstaff;
                if (S < f) {
                    for (e = S + 1; e <= f; e++)
                        a(e);
                    S = f
                }
                q = [];
                continue;
            case h.BLOCK:
                Le.push(b);
                lb(b);
                d && (d = b.ts_prev);
                continue
            }
            e = b.st;
            if (!q[e]) {
                switch (b.type) {
                default:
                    continue;
                case h.CLEF:
                    e > S && (u[e].clef = b,
                    lb(b));
                    continue;
                case h.BAR:
                    if (b.bar_mrep || 1 < k.staves[e].staffnonote)
                        break;
                    continue;
                case h.GRACE:
                    break;
                case h.NOTE:
                case h.REST:
                case h.SPACE:
                case h.MREST:
                    if (!(1 < k.staves[e].staffnonote)) {
                        if (b.invis)
                            continue;
                        if (0 == k.staves[e].staffnonote && b.type != h.NOTE)
                            continue
                    }
                }
                n[e] = q[e] = !0
            }
        }
        Sb = b;
        c();
        k.st_print = new Uint8Array(q);
        (function() {
            var a, b, c, d, e;
            for (a = 0; a <= S; a++)
                if (b = u[a],
                n[a]) {
                    e = b.stafflines.length;
                    b.topbar = 6 * (e - 1);
                    for (c = 0; c < e - 1; c++) {
                        switch (b.stafflines[c]) {
                        case ".":
                        case "-":
                            continue
                        }
                        break
                    }
                    b.botline = b.botbar = 6 * c;
                    if (c >= e - 2)
                        if ("." != b.stafflines[c])
                            b.botbar -= 6,
                            b.topbar += 6;
                        else {
                            b.botbar -= 12;
                            b.topbar += 12;
                            continue
                        }
                    b.hll = 17 + c;
                    b.hlmap = new Int8Array(Array(2 * (e - c + 1)));
                    for (d = 1; c < e; c++,
                    d += 2)
                        switch (b.stafflines[c]) {
                        case "|":
                        case "[":
                            b.hlmap[d - 1] = 1,
                            b.hlmap[d] = 1,
                            b.hlmap[d + 1] = 1
                        }
                } else
                    b.botbar = b.topbar = 0
        }
        )();
        for (e = 0; e < S; e++)
            n[e] || eh(e);
        n[S] || (u[S].topbar = 0);
        bh();
        E.st_print = new Uint8Array(n);
        if (Sb)
            for (b = Sb,
            delete b.nl,
            d = b.ts_prev,
            d.ts_next = null,
            g = x.length,
            f = 0; f < g; f++) {
                e = x[f];
                if (e.sym && e.sym.time <= Sb.time) {
                    for (b = Sb.ts_prev; b; b = b.ts_prev)
                        if (b.v == f) {
                            e.s_next = b.next;
                            b.next = null;
                            dh(b) && (m = b.wl,
                            ba.set_width(b),
                            b.shrink += b.wl - m);
                            break
                        }
                    if (b)
                        continue
                }
                e.s_next = e.sym;
                e.sym = null
            }
        d.type != h.BAR && (b = Of(d),
        b.space = Nc(b),
        b.space < b.shrink && d.type != h.KEY && (b.space = b.shrink))
    }
    function Tf() {
        for (var a = W, c = a.time; a; a = a.ts_next) {
            if (a.time != c) {
                fb();
                return
            }
            switch (a.type) {
            case h.NOTE:
            case h.REST:
            case h.MREST:
                fb();
                return;
            default:
                continue;
            case h.STAVES:
                F = a.sy;
                break;
            case h.BLOCK:
                Sf(a)
            }
            lb(a);
            a.p_v.s_next == a && (a.p_v.s_next = a.next)
        }
        W = null
    }
    function xc(a) {
        a.fname = l.fname;
        a.istart = l.istart;
        a.iend = l.iend
    }
    function Uf(a) {
        var c = {
            type: h.CLEF,
            clef_line: 2,
            clef_type: "t",
            v: k.v,
            p_v: k,
            time: k.time,
            dur: 0
        }
          , b = 1;
        xc(c);
        switch (a[0]) {
        case '"':
            b = a.indexOf('"', 1);
            c.clef_name = a.slice(1, b);
            b++;
            break;
        case "a":
            if ("u" == a[1]) {
                c.clef_type = "a";
                c.clef_auto = !0;
                b = 4;
                break
            }
            b = 4;
        case "C":
            c.clef_type = "c";
            c.clef_line = 3;
            break;
        case "b":
            b = 4;
        case "F":
            c.clef_type = "b";
            c.clef_line = 4;
            break;
        case "n":
            b = 4;
            c.invis = !0;
            break;
        case "t":
            if ("e" == a[1]) {
                c.clef_type = "c";
                c.clef_line = 4;
                break
            }
            b = 6;
        case "G":
            break;
        case "p":
            b = 4;
        case "P":
            c.clef_type = "p";
            c.clef_line = 3;
            k.key.k_sf = 0;
            k.ckey.k_drum = !0;
            break;
        default:
            t(1, "Unknown clef '$1'", a);
            return
        }
        "1" <= a[b] && "9" >= a[b] && (c.clef_line = Number(a[b]),
        b++);
        if ("8" != a[b + 1])
            return c;
        switch (a[b]) {
        case "^":
            c.clef_oct_transp = !0;
        case "+":
            c.clef_octave = 7;
            break;
        case "_":
            c.clef_oct_transp = !0;
        case "-":
            c.clef_octave = -7
        }
        return c
    }
    function yc(a, c) {
        var b, d, e, f, g = [];
        if ("0" == a[0])
            return 0;
        if (0 <= "123456789-+".indexOf(a[0])) {
            d = 3 * parseInt(a);
            if (isNaN(d) || -108 > d || 108 < d) {
                t(1, "Bad transpose value");
                return
            }
            switch (a.slice(-1)) {
            default:
                return d;
            case "#":
                d++;
                break;
            case "b":
                d += 2
            }
            return 0 < d ? d : d - 3
        }
        if ("instr" == c)
            if (e = a.indexOf("/"),
            r.sound)
                a = 0 > e ? "c" + a : a.replace(/.*\//, "c");
            else {
                if (0 > e)
                    return 0;
                a = a.replace("/", "")
            }
        e = new ea;
        e.buffer = a;
        for (b = 0; 2 > b; b++) {
            f = e.buffer[e.index] ? Oc(e) : null;
            if (!f) {
                t(1, "Bad transpose value");
                return
            }
            f.pit += 124;
            d = 12 * (f.pit / 7 | 0) + gh[f.pit % 7];
            f.acc && 3 != f.acc && (d += f.acc);
            g[b] = d
        }
        d = 3 * (g[1] - g[0]);
        if (f)
            switch (f.acc) {
            default:
                return d;
            case 2:
            case 1:
                d++;
                break;
            case -1:
            case -2:
                d += 2
            }
        return 0 < d ? d : d - 3
    }
    function Vf(a) {
        var c, b;
        if (c = a.match(/(.*?)[= ]*([!"].*[!"])/))
            if (a = c[1],
            b = c[2],
            b.slice(-1) != b[0])
                t(1, "Lack of ending $1 in U:/%%user", b[0]);
            else if ("\\" == a[0] && ("t" == a[1] ? a = "\t" : a[1] || (a = " ")),
            c = a.charCodeAt(0),
            128 <= c)
                t(1, O.not_ascii);
            else {
                switch (Wa[c][0]) {
                case "0":
                case "d":
                case "i":
                case " ":
                    break;
                case '"':
                case "!":
                    if (1 < Wa[c].length)
                        break;
                default:
                    t(1, "Bad user character '$1'", a);
                    return
                }
                switch (b) {
                case "!beambreak!":
                    b = " ";
                    break;
                case "!ignore!":
                    b = "i";
                    break;
                case "!nil!":
                case "!none!":
                    b = "d"
                }
                Wa[c] = b
            }
        else
            t(1, 'Lack of starting ! or " in U: / %%user')
    }
    function hh(a) {
        if (a) {
            if (/^[\]\[|.-]+$/.test(a))
                return a.replace(/\]/g, "[");
            a = parseInt(a);
            switch (a) {
            case 0:
                return "...";
            case 1:
                return "..|";
            case 2:
                return ".||";
            case 3:
                return ".|||"
            }
            if (!(isNaN(a) || 0 > a || 16 < a))
                return "||||||||||||||||".slice(0, a)
        }
    }
    function Bb(a) {
        a = {
            type: h.BLOCK,
            subtype: a,
            dur: 0
        };
        2 == l.state && Ua();
        sa(a);
        return a
    }
    function re(a) {
        k.init || (k.init = !0,
        P.V && (P.V["*"] && (a = P.V["*"].concat(a)),
        P.V[k.id] && (a = P.V[k.id].concat(a))));
        0 != a.length && ba.set_vp(a)
    }
    function Wf(a, c) {
        0 != c.length && (P.V || (P.V = {}),
        P.V[a] ? Array.prototype.push.apply(P.V[a], c) : P.V[a] = c)
    }
    function ad(a, c) {
        var b, d, e;
        switch (a) {
        case "I":
            ba.do_pscom(c);
            break;
        case "L":
            2 == l.state && Ua();
            if (b = c.match(/^1\/(\d+)(=(\d+)\/(\d+))?$/)) {
                d = Number(b[1]);
                if (!d || 0 != (d & d - 1))
                    break;
                d = h.BLEN / d;
                if (b[2]) {
                    e = Number(b[4]);
                    if (!e || 0 != (e & e - 1))
                        break;
                    e = Number(b[3]) / e * h.BLEN
                } else
                    e = d
            } else
                "auto" == c && (d = e = -1);
            if (!e) {
                t(1, "Bad L: value");
                break
            }
            2 > l.state ? za.ulen = d : (k.ulen = d,
            k.dur_fact = e / d);
            break;
        case "M":
            a: {
                b = {
                    type: h.METER,
                    dur: 0,
                    a_meter: []
                };
                e = {};
                var f, g = 0, m = 0, q, n;
                xc(b);
                if (0 == c.indexOf("none"))
                    m = 4,
                    d = 1;
                else
                    for (d = 0; m < c.length && "=" != c[m]; ) {
                        switch (c[m]) {
                        case "C":
                            e.top = c[m++];
                            g || (f = g = 4);
                            break;
                        case "c":
                        case "o":
                            e.top = c[m++];
                            if (!g)
                                switch (g = "c" == c[m - 1] ? 2 : 3,
                                f = 4,
                                c[m]) {
                                case "|":
                                    f /= 2;
                                    break;
                                case ".":
                                    g *= 3,
                                    f *= 2
                                }
                            break;
                        case ".":
                        case "|":
                            g = 0;
                            e.top = c[m++];
                            break;
                        case "(":
                            "(" == c[m + 1] && (n = !0,
                            e.top = c[m++],
                            b.a_meter.push(e),
                            e = {});
                            for (q = m + 1; q < c.length && ")" != c[q] && "/" != c[q]; )
                                q++;
                            if (")" == c[q] && "/" == c[q + 1]) {
                                m++;
                                continue
                            }
                        case ")":
                            n = "(" == c[m];
                            e.top = c[m++];
                            b.a_meter.push(e);
                            e = {};
                            continue;
                        default:
                            if ("0" >= c[m] || "9" < c[m]) {
                                t(1, "Bad char '$1' in M:", c[m]);
                                break a
                            }
                            f = 2;
                            for (e.top = c[m++]; ; ) {
                                for (; "0" <= c[m] && "9" >= c[m]; )
                                    e.top += c[m++];
                                if (")" == c[m]) {
                                    if ("/" != c[m + 1])
                                        break;
                                    m++
                                }
                                if ("/" == c[m]) {
                                    m++;
                                    if ("0" >= c[m] || "9" < c[m]) {
                                        t(1, "Bad char '$1' in M:", c[m]);
                                        break a
                                    }
                                    for (e.bot = c[m++]; "0" <= c[m] && "9" >= c[m]; )
                                        e.bot += c[m++];
                                    break
                                }
                                if (" " != c[m] && "+" != c[m])
                                    break;
                                if (m >= c.length || "(" == c[m + 1])
                                    break;
                                e.top += c[m++]
                            }
                            g = parseInt(e.top)
                        }
                        n || (e.bot && (f = parseInt(e.bot)),
                        d += g * h.BLEN / f);
                        b.a_meter.push(e);
                        for (e = {}; " " == c[m]; )
                            m++;
                        "+" == c[m] && (e.top = c[m++],
                        b.a_meter.push(e),
                        e = {})
                    }
                if ("=" == c[m]) {
                    f = c.substring(++m).match(/^(\d+)\/(\d+)$/);
                    if (!f) {
                        t(1, "Bad duration '$1' in M:", c.substring(m));
                        break a
                    }
                    d = h.BLEN * f[1] / f[2]
                }
                b.wmeasure = d;
                0 > r.writefields.indexOf("M") && (b.a_meter = []);
                if (3 != l.state) {
                    if (P.M = c,
                    za.meter = b,
                    1 <= l.state)
                        for (za.ulen || (za.ulen = 1 >= d || d >= 3 * h.BLEN / 4 ? h.BLEN / 8 : h.BLEN / 16),
                        f = 0; f < x.length; f++)
                            x[f].meter = b,
                            x[f].wmeasure = d
                } else
                    k.wmeasure = d,
                    Bd() ? (k.meter = b,
                    ce = 0 <= r.writefields.indexOf("M") ? 3 : 2) : sa(b)
            }
            break;
        case "U":
            Vf(c);
            break;
        case "P":
            if (0 == l.state)
                break;
            if (1 == l.state) {
                P.P = c;
                break
            }
            2 == l.state && Ua();
            if (0 > r.writefields.indexOf(a))
                break;
            b = {
                type: h.PART,
                text: c,
                dur: 0
            };
            f = x[H.top_voice];
            k.v != f.v ? k.time != f.time || f.last_sym && f.last_sym.type == h.PART || (n = k,
            k = f,
            sa(b),
            k = n) : sa(b);
            break;
        case "Q":
            if (0 == l.state)
                break;
            a: {
                n = 0;
                f = {
                    type: h.TEMPO,
                    dur: 0
                };
                xc(f);
                0 > r.writefields.indexOf("Q") && (f.del = !0);
                if ('"' == c[0]) {
                    n = c.indexOf('"', 1);
                    if (0 > n) {
                        t(1, "Unterminated string in Q:");
                        break a
                    }
                    f.tempo_str1 = c.slice(1, n);
                    for (n++; " " == c[n]; )
                        n++
                }
                b = new ea;
                b.buffer = c;
                for (b.index = n; ; ) {
                    m = c[b.index];
                    if (void 0 == m || "0" >= m || "9" < m)
                        break;
                    n = Nb(b);
                    f.tempo_notes || (f.tempo_notes = []);
                    for (f.tempo_notes.push(h.BLEN * n[0] / n[1]); ; ) {
                        m = c[b.index];
                        if (" " != m)
                            break;
                        b.index++
                    }
                }
                if ("=" == m) {
                    for (m = c[++b.index]; " " == m; )
                        m = c[++b.index];
                    n = b.index;
                    "c" == m && "a" == c[n + 1] && "." == c[n + 2] && " " == c[n + 3] && (f.tempo_ca = "ca. ",
                    b.index += 4);
                    "/" != c[b.index + 1] ? f.tempo = b.get_int() : (n = Nb(b),
                    f.new_beat = h.BLEN * n[0] / n[1]);
                    for (m = c[b.index]; " " == m; )
                        m = c[++b.index]
                }
                if ('"' == m) {
                    b.index++;
                    n = c.indexOf('"', b.index + 1);
                    if (0 > n) {
                        t(1, "Unterminated string in Q:");
                        break a
                    }
                    f.tempo_str2 = c.slice(b.index, n)
                }
                if (3 != l.state) {
                    if (1 == l.state) {
                        P.Q = c;
                        za.tempo = f;
                        break a
                    }
                    Ua()
                }
                k.v == H.top_voice && (sa(f),
                za.tempo && 0 == k.time && (za.tempo.del = !0))
            }
            break;
        case "V":
            Cd(c);
            break;
        case "K":
            if (0 == l.state)
                break;
            a: {
                b: {
                    f = c;
                    n = "FCGDAEB".indexOf(f[0]) - 1;
                    d = 0;
                    e = {
                        type: h.KEY,
                        k_delta: 0,
                        dur: 0
                    };
                    xc(e);
                    g = 1;
                    if (-1 > n)
                        switch (f[0]) {
                        case "H":
                            switch (f[1]) {
                            case "P":
                            case "p":
                                e.k_bagpipe = f[1];
                                n = "P" == f[1] ? 0 : 2;
                                g++;
                                break;
                            default:
                                t(1, "Unknown bagpipe-like key"),
                                m = !0
                            }
                            break;
                        case "P":
                            t(1, "K:P is deprecated");
                            n = 0;
                            m = e.k_drum = !0;
                            break;
                        case "n":
                            if (0 == f.indexOf("none")) {
                                n = 0;
                                e.k_none = !0;
                                g = 4;
                                break
                            }
                        default:
                            n = [e, lc(f)];
                            break b
                        }
                    if (!m) {
                        switch (f[g]) {
                        case "#":
                            n += 7;
                            g++;
                            break;
                        case "b":
                            n -= 7,
                            g++
                        }
                        f = f.slice(g).trim();
                        switch (f.slice(0, 3).toLowerCase()) {
                        default:
                            if ("m" != f[0] || " " != f[1] && "\t" != f[1] && "\n" != f[1]) {
                                m = !0;
                                break
                            }
                        case "aeo":
                        case "m":
                        case "min":
                            n -= 3;
                            d = 5;
                            break;
                        case "dor":
                            n -= 2;
                            d = 1;
                            break;
                        case "ion":
                        case "maj":
                            break;
                        case "loc":
                            n -= 5;
                            d = 6;
                            break;
                        case "lyd":
                            n += 1;
                            d = 3;
                            break;
                        case "mix":
                            --n;
                            d = 4;
                            break;
                        case "phr":
                            n -= 4,
                            d = 2
                        }
                        m || (f = f.replace(/\w+\s*/, ""));
                        0 == f.indexOf("exp ") && ((f = f.replace(/\w+\s*/, "")) || t(1, "No accidental after 'exp'"),
                        e.k_exp = !0);
                        g = f[0];
                        if ("^" == g || "_" == g || "=" == g) {
                            e.k_a_acc = [];
                            m = new ea;
                            m.buffer = f;
                            do {
                                g = Oc(m);
                                if (!g)
                                    break;
                                e.k_a_acc.push(g);
                                for (g = f[m.index]; " " == g; )
                                    g = f[++m.index]
                            } while ("^" == g || "_" == g || "=" == g);f = f.slice(m.index)
                        } else
                            e.k_exp && 0 == f.indexOf("none") && (f = f.replace(/\w+\s*/, ""))
                    }
                    e.k_delta = zc[(n + 7) % 7];
                    e.k_sf = n;
                    e.k_mode = d;
                    n = [e, lc(f)]
                }
                f = n[0];
                n = n[1];
                if (f.k_sf && !f.k_exp && f.k_a_acc) {
                    var B = []
                      , p = []
                      , v = []
                      , D = [];
                    if (0 < f.k_sf)
                        for (g = 0; g < f.k_sf; g++)
                            B[g] = 1,
                            p[g] = [26, 23, 27, 24, 21, 25, 22][g];
                    else
                        for (g = 0; g < -f.k_sf; g++)
                            B[g] = -1,
                            p[g] = [22, 25, 21, 24, 20, 23, 26][g];
                    e = f.k_a_acc.length;
                    for (m = 0; m < e; m++) {
                        q = f.k_a_acc[m];
                        for (d = 0; d < g; d++)
                            if (p[d] == q.pit) {
                                B[d] = q.acc;
                                q.micro_n && (v[d] = q.micro_n,
                                D[d] = q.micro_d);
                                break
                            }
                        d == g && (B[d] = q.acc,
                        p[d] = q.pit,
                        q.micro_n && (v[d] = q.micro_n,
                        D[d] = q.micro_d),
                        g++)
                    }
                    for (m = 0; m < g; m++)
                        (q = f.k_a_acc[m]) || (q = f.k_a_acc[m] = {}),
                        q.acc = B[m],
                        q.pit = p[m],
                        v[m] ? (q.micro_n = v[m],
                        q.micro_d = D[m]) : (delete q.micro_n,
                        delete q.micro_d)
                }
                switch (l.state) {
                case 1:
                    void 0 != f.k_sf || f.k_a_acc || (f.k_sf = 0,
                    f.k_none = !0);
                    for (b = 0; b < x.length; b++)
                        m = x[b],
                        m.key = A(f),
                        m.okey = A(f),
                        m.ckey = A(f);
                    l.ckey = f;
                    0 != n.length && Wf("*", n);
                    za.ulen || (za.ulen = h.BLEN / 8);
                    l.state = 2;
                    break a;
                case 2:
                    Ua(!0)
                }
                0 != n.length && re(n);
                k.ckey.k_bagpipe || k.ckey.k_drum || (b = (r.transp || 0) + (k.transp || 0) + (k.shift || 0));
                if (void 0 == f.k_sf) {
                    if (!f.k_a_acc && !b)
                        break a;
                    f.k_sf = k.okey.k_sf
                }
                k.okey = A(f);
                b && (k.vtransp = b,
                Dd(f));
                f.k_old_sf = k.ckey.k_sf;
                k.ckey = f;
                Bd() ? (k.key = A(f),
                f.k_none && (k.key.k_sf = 0)) : (b = k.last_sym) && b.type == h.METER ? (k.last_sym = b.prev,
                k.last_sym || (k.sym = null),
                sa(f),
                f.next = b,
                b.prev = f,
                k.last_sym = b) : sa(f)
            }
            break;
        case "N":
        case "R":
            P[a] = P[a] ? P[a] + ("\n" + c) : c;
            break;
        case "r":
            if (!w.keep_remark || 3 != l.state)
                break;
            b = {
                type: h.REMARK,
                text: c,
                dur: 0
            };
            sa(b);
            break;
        default:
            t(0, "'$1:' line ignored", a)
        }
    }
    function Xf() {
        var a, c, b, d = l.line, e = {
            type: h.BAR,
            fname: l.fname,
            istart: l.bol + d.index,
            dur: 0,
            multi: 0
        };
        ka && ka.bar && Ac("|");
        za.new_nbar && (e.bar_num = za.new_nbar,
        za.new_nbar = 0);
        for (b = d["char"](); ; ) {
            c = d.next_char();
            switch (c) {
            case "|":
            case "[":
            case "]":
            case ":":
                b += c;
                continue
            }
            break
        }
        ":" == b[0] && (1 == b.length ? (b = "|",
        e.bar_dotted = !0) : e.rbstop = 2);
        ib && ba.gch_build(e);
        Aa && (Xc(Aa, e),
        Aa = null);
        l.ottava.length && (a = e,
        k.cst != k.st && (a = {
            type: h.SPACE,
            fname: l.fname,
            istart: l.bol + d.index,
            dur: 0,
            multi: 0,
            invis: !0,
            width: 1
        },
        sa(a)),
        a.ottava = l.ottava,
        l.ottava = []);
        switch (b.slice(-1)) {
        case "[":
            if (/[0-9" ]/.test(c))
                break;
            b = b.slice(0, -1);
            d.index--;
            c = "[";
            break;
        case ":":
            e.rbstop = 2
        }
        if ("0" < c && "9" >= c) {
            "[" == b.slice(-1) && (b = b.slice(0, -1));
            for (e.text = c; ; ) {
                c = d.next_char();
                if (0 > "0123456789,.-".indexOf(c))
                    break;
                e.text += c
            }
            e.rbstop = 2;
            e.rbstart = 2
        } else if ('"' == c && "[" == b.slice(-1)) {
            b = b.slice(0, -1);
            for (e.text = ""; ; ) {
                c = d.next_char();
                if (!c) {
                    t(1, "No end of repeat string");
                    return
                }
                if ('"' == c) {
                    d.index++;
                    break
                }
                "\\" == c && (e.text += c,
                c = d.next_char());
                e.text += c
            }
            e.text = Vb(e.text);
            e.rbstop = 2;
            e.rbstart = 2
        }
        "]" == b[0] && (e.rbstop = 2,
        1 != b.length ? b = b.slice(1) : e.invis = !0);
        e.iend = l.bol + d.index;
        e.rbstart && k.norepbra && !k.second && (e.norepbra = !0);
        if (0 > k.ulen) {
            var f;
            if ((a = k.last_sym) && a.type != h.MREST && a.type != h.BAR) {
                for (; a.type != h.BAR && a.prev; )
                    a = a.prev;
                c = a.time;
                d = k.time - c;
                if (0 == c) {
                    for (; a && !a.dur; )
                        a = a.next;
                    a && a.type == h.REST && a.invis && (c += a.dur * k.wmeasure / d,
                    a.prev ? a.prev.next = a.next : k.sym = a.next,
                    a.next && (a.next.prev = a.prev),
                    a = a.next)
                }
                if (k.wmeasure != d) {
                    for (; a; a = a.next)
                        if (a.time = c,
                        a.dur && !a.grace && (a.dur = a.dur * k.wmeasure / d,
                        a.dur_orig = a.dur_orig * k.wmeasure / d,
                        c += a.dur,
                        a.type == h.NOTE || a.type == h.REST))
                            for (f = 0; f <= a.nhd; f++)
                                a.notes[f].dur = a.notes[f].dur * k.wmeasure / d;
                    k.time = e.time = c
                }
            }
        }
        if ((a = k.last_sym) && a.time == k.time)
            if (a.type == h.SPACE)
                a.time--;
            else if ("[" == b || "|:" == b) {
                do {
                    if (a.type == h.BAR)
                        break;
                    if (gb[a.type])
                        break;
                    a = a.prev
                } while (a);if (a && a.type == h.BAR) {
                    if ("[" == b && !a.text && (0 == k.st || H.staves[k.st - 1].flags & 64 || e.norepbra)) {
                        e.text && (a.text = e.text);
                        e.a_gch && (a.a_gch = e.a_gch);
                        e.norepbra && (a.norepbra = e.norepbra);
                        e.rbstart && (a.rbstart = e.rbstart);
                        e.rbstop && (a.rbstop = e.rbstop);
                        return
                    }
                    if (a.st == k.st && "|:" == b) {
                        if (":|" == a.bar_type) {
                            a.bar_type = "::";
                            a.rbstop = 2;
                            return
                        }
                        if ("||" == a.bar_type) {
                            a.bar_type = "||:";
                            a.rbstop = 2;
                            return
                        }
                    }
                }
            }
        switch (b) {
        case "[":
            e.rbstop = 2;
        case "[]":
        case "[|]":
            e.invis = !0;
            b = "[]";
            break;
        case ":|:":
        case ":||:":
            b = "::";
            break;
        case "||":
            if (!r.rbdbstop)
                break;
        case "[|":
        case "|]":
            e.rbstop = 2
        }
        e.bar_type = b;
        k.lyric_restart || (k.lyric_restart = e);
        k.sym_restart || (k.sym_restart = e);
        sa(e);
        e.st = k.st;
        e.rbstart && !k.norepbra && 0 < k.st && !(H.staves[k.st - 1].flags & 64) && (a = {
            type: h.BAR,
            fname: e.fname,
            istart: e.istart,
            iend: e.iend,
            bar_type: "[",
            multi: 0,
            invis: !0,
            text: e.text,
            rbstart: 2
        },
        sa(a),
        a.st = k.st,
        delete e.text,
        e.rbstart = 0)
    }
    function lc(a) {
        if (!a)
            return [];
        a = a.match(/=?[^\s"=]+=?|".+?"/g);
        return a ? a : (t(1, "Unterminated string"),
        [])
    }
    function Ge(a, c) {
        var b, d, e;
        d = 0;
        b = c;
        0 != b % 12 && K(1, a, "Invalid note duration $1", b);
        b /= 12;
        0 == b && K(1, a, "Note too short");
        for (e = 5; 0 != b && !(b & 1); b >>= 1,
        e--)
            ;
        b >>= 1;
        switch (b) {
        case 0:
            break;
        case 1:
            d = 1;
            break;
        case 3:
            d = 2;
            break;
        case 7:
            d = 3;
            break;
        default:
            K(1, a, "Invalid note duration $1", c),
            e += (11 - b) / 4 | 0,
            d = 4
        }
        e -= d;
        if (0 <= e)
            b = h.FULL;
        else
            switch (e) {
            default:
                K(1, a, "Note too long"),
                e = -4;
            case -4:
                b = h.SQUARE;
                break;
            case -3:
                b = r.squarebreve ? h.SQUARE : h.OVALBARS;
                break;
            case -2:
                b = h.OVAL;
                break;
            case -1:
                b = h.EMPTY
            }
        return [b, d, e]
    }
    function Nb(a) {
        var c, b, d;
        Ed.lastIndex = a.index;
        c = Ed.exec(a.buffer);
        if (!c[0])
            return [1, 1];
        b = c[1] || 1;
        d = c[3] || 1;
        c[3] || (d *= 1 << c[2].length);
        a.index = Ed.lastIndex;
        return [b, d]
    }
    function Oc(a) {
        var c, b, d, e, f = a["char"]();
        switch (f) {
        case "^":
            f = a.next_char();
            "^" == f ? (c = 2,
            f = a.next_char()) : c = 1;
            break;
        case "=":
            c = 3;
            f = a.next_char();
            break;
        case "_":
            f = a.next_char(),
            "_" == f ? (c = -2,
            f = a.next_char()) : c = -1
        }
        if (c && 3 != c && "1" <= f && "9" >= f || "/" == f)
            d = Nb(a),
            b = d[0],
            d = d[1],
            d = 1 == d ? k ? k.uscale : 1 : 2 * d,
            f = a["char"]();
        e = cd.indexOf(f) + 16;
        f = a.next_char();
        if (16 > e)
            t(1, "'$1' is not a note", a.buffer[a.index - 1]);
        else {
            for (; "'" == f; )
                e += 7,
                f = a.next_char();
            for (; "," == f; )
                e -= 7,
                f = a.next_char();
            a = {
                pit: e,
                shhd: 0,
                shac: 0,
                ti1: 0
            };
            c && (a.acc = c,
            b && (a.micro_n = b,
            a.micro_d = d));
            return a
        }
    }
    function Yf(a) {
        var c, b = "abcdefg"[(a.pit + 77) % 7];
        a.acc && (b = "__ _  ^ ^^ =".split(" ")[a.acc + 2] + b);
        for (c = a.pit; 30 <= c; c -= 7)
            b += "'";
        for (c = a.pit; 23 > c; c += 7)
            b += ",";
        return b
    }
    function Pc() {
        var a = l.line
          , c = 0;
        "." != a.buffer[a.index - 1] || Aa || (c = h.SL_DOTTED);
        switch (a.next_char()) {
        case "'":
            return a.index++,
            c + h.SL_ABOVE;
        case ",":
            return a.index++,
            c + h.SL_BELOW
        }
        return c + h.SL_AUTO
    }
    function mf(a) {
        a.notes = a.notes.sort(function(a, b) {
            return a.pit - b.pit
        })
    }
    function Ff() {
        function a(f) {
            for (var v, u, x, y; ; ) {
                v = p["char"]();
                if (!v)
                    break;
                if ("." == v)
                    switch (p.buffer[p.index + 1]) {
                    case "(":
                    case "-":
                    case "|":
                        v = p.next_char()
                    }
                u = v.charCodeAt(0);
                if (128 <= u) {
                    t(1, O.not_ascii);
                    p.index++;
                    break
                }
                if (!f && vd[u]) {
                    y = 0;
                    for (x in Lb)
                        if (Lb.hasOwnProperty(x) && x[0] == v) {
                            if (0 > x.indexOf("n")) {
                                if (p.buffer.indexOf(x, p.index) != p.index)
                                    continue;
                                p.index += x.length
                            } else {
                                a: {
                                    y = void 0;
                                    var w, z, A = x;
                                    z = 1;
                                    for (w = p.index + 1; z < A.length; z++,
                                    w++)
                                        if (A[z] != p.buffer[w]) {
                                            if ("n" != A[z]) {
                                                y = void 0;
                                                break a
                                            }
                                            y = cd.indexOf(p.buffer[w]);
                                            if (0 > y) {
                                                y = void 0;
                                                break a
                                            }
                                            for (; "'" == p.buffer[w + 1]; )
                                                y += 7,
                                                w++;
                                            for (; "," == p.buffer[w + 1]; )
                                                y -= 7,
                                                w++
                                        }
                                    p.index = w
                                }
                                if (!y)
                                    continue
                            }
                            var A = Lb[x]
                              , C = y;
                            y = p;
                            w = l.istart;
                            l.line = p = new ea;
                            l.istart += y.index;
                            z = p;
                            if (C) {
                                var E, F = C, R = "", K = A.length;
                                for (i = 0; i < K; i++)
                                    if (E = A[i],
                                    "h" <= E && "z" >= E) {
                                        C = F + E.charCodeAt(0) - 110;
                                        for (E = ""; 0 > C; )
                                            C += 7,
                                            E += ",";
                                        for (; 14 < C; )
                                            C -= 7,
                                            E += "'";
                                        R += cd[C] + E
                                    } else
                                        R += E;
                                A = R
                            }
                            z.buffer = A;
                            a(!0);
                            l.line = p = y;
                            l.istart = w;
                            y = 1;
                            break
                        }
                    if (y)
                        continue
                }
                u = Wa[u];
                switch (u[0]) {
                case " ":
                    if (y = k.last_note)
                        y.beam_end = !0,
                        c && (c.gr_shift = !0);
                    break;
                case "\n":
                    if (r.barsperstaff)
                        break;
                    0 == H.voices[k.v].range && k.last_sym && (k.last_sym.eoln = !0);
                    break;
                case "&":
                    if (c) {
                        t(1, O.bad_char, v);
                        break
                    }
                    v = p.next_char();
                    if (")" == v) {
                        Ac(")");
                        break
                    }
                    Ac("&");
                    continue;
                case "(":
                    v = p.next_char();
                    if ("0" < v && "9" >= v) {
                        u = p.get_int();
                        y = ih[u];
                        w = u;
                        v = p["char"]();
                        if (":" == v && (v = p.next_char(),
                        "0" < v && "9" >= v && (y = p.get_int(),
                        v = p["char"]()),
                        ":" == v))
                            if (v = p.next_char(),
                            "0" < v && "9" >= v)
                                w = p.get_int(),
                                p["char"]();
                            else {
                                t(1, "Invalid 'r' in tuplet");
                                continue
                            }
                        if (0 == y || void 0 == y)
                            y = 0 == k.wmeasure % 9 ? 3 : 2;
                        (m = g[++q]) || (g[q] = m = {});
                        m.p = u;
                        m.q = y;
                        m.r = w;
                        m.f = r.tuplets;
                        m.fact = n * y / u;
                        n = m.fact;
                        continue
                    }
                    if ("&" == v) {
                        if (c) {
                            t(1, O.bad_char, v);
                            break
                        }
                        Ac("(");
                        break
                    }
                    B <<= 4;
                    p.index--;
                    B += Pc();
                    continue;
                case ")":
                    if (k.ignore)
                        break;
                    if (y = k.last_sym)
                        switch (y.type) {
                        case h.NOTE:
                        case h.REST:
                        case h.SPACE:
                            break;
                        default:
                            y = null
                        }
                    if (!y) {
                        t(1, O.bad_char, v);
                        break
                    }
                    y.slur_end ? y.slur_end++ : y.slur_end = 1;
                    break;
                case "!":
                    Aa || (Aa = []);
                    if (1 < u.length)
                        y = u.slice(1, -1);
                    else {
                        y = "";
                        for (u = p.index; ; ) {
                            v = p.next_char();
                            if (!v)
                                break;
                            if ("!" == v)
                                break;
                            y += v
                        }
                        if (!v) {
                            p.index = u;
                            t(1, "No end of decoration");
                            break
                        }
                    }
                    void 0 != Zf[y] ? (za.ottava = !0,
                    l.ottava.push(Zf[y])) : Aa.push(y);
                    break;
                case '"':
                    $f(u);
                    break;
                case "-":
                    if (!k.last_note || k.last_note.type != h.NOTE) {
                        t(1, "No note before '-'");
                        break
                    }
                    v = Pc();
                    y = k.last_note;
                    for (u = 0; u <= y.nhd; u++)
                        y.notes[u].ti1 ? 0 == y.nhd && t(1, "Too many ties") : y.notes[u].ti1 = v;
                    y.ti1 = !0;
                    c && (c.ti1 = !0);
                    continue;
                case "[":
                    y = p.buffer[p.index + 1];
                    if (0 <= '|[]: "'.indexOf(y) || "1" <= y && "9" >= y) {
                        if (c) {
                            t(1, O.bar_grace);
                            break
                        }
                        Xf();
                        continue
                    }
                    if (":" == p.buffer[p.index + 2]) {
                        u = p.buffer.indexOf("]", p.index + 1);
                        if (0 > u) {
                            t(1, "Lack of ']'");
                            break
                        }
                        v = p.buffer.slice(p.index + 3, u).trim();
                        l.istart = l.bol + p.index;
                        l.iend = l.bol + ++u;
                        p.index = 0;
                        ad(y, v);
                        p.index = u;
                        continue
                    }
                case "n":
                    y = ba.new_note(c, n);
                    if (!y)
                        continue;
                    y.type == h.NOTE && B && (y.slur_start = B,
                    B = 0);
                    if (c) {
                        0 <= q && (y.in_tuplet = !0);
                        continue
                    }
                    0 <= q && y.notes && (y.in_tuplet = !0,
                    0 < q ? (g[0].p && (y.tp0 = g[0].p,
                    y.tq0 = g[0].q,
                    y.tf = g[0].f,
                    g[0].p = 0),
                    g[0].r--,
                    m.p && (y.tp1 = m.p,
                    y.tq1 = m.q,
                    y.tf = m.f,
                    m.p = 0)) : m.p && (y.tp0 = m.p,
                    y.tq0 = m.q,
                    y.tf = m.f,
                    m.p = 0),
                    m.r--,
                    0 == m.r && (0 == q-- ? (y.tp0 ? y.tp0 = !1 : y.te0 = !0,
                    n = 1,
                    k.time = Math.round(k.time),
                    y.dur = k.time - y.time) : (y.tp1 ? y.tp1 = !1 : y.te1 = !0,
                    m = g[0],
                    0 == m.r ? (q--,
                    y.te0 = !0,
                    n = 1,
                    k.time = Math.round(k.time),
                    y.dur = k.time - y.time) : n = m.fact)));
                    continue;
                case "<":
                    if (!k.last_note) {
                        t(1, "No note before '<'");
                        break
                    }
                    if (c) {
                        t(1, "Cannot have a broken rhythm in grace notes");
                        break
                    }
                    for (y = "<" == v ? 1 : -1; "<" == v || ">" == v; )
                        y *= 2,
                        v = p.next_char();
                    k.brk_rhythm = y;
                    continue;
                case "i":
                    break;
                case "{":
                    if (c) {
                        t(1, "'{' in grace note");
                        break
                    }
                    b = k.last_note;
                    k.last_note = null;
                    d = Aa;
                    Aa = void 0;
                    c = {
                        type: h.GRACE,
                        fname: l.fname,
                        istart: l.bol + p.index,
                        dur: 0,
                        multi: 0
                    };
                    switch (k.pos.gst) {
                    case h.SL_ABOVE:
                        c.stem = 1;
                        break;
                    case h.SL_BELOW:
                        c.stem = -1;
                        break;
                    case h.SL_HIDDEN:
                        c.stem = 2
                    }
                    sa(c);
                    v = p.next_char();
                    if ("/" == v) {
                        c.sappo = !0;
                        break
                    }
                    continue;
                case "|":
                    if (c) {
                        t(1, O.bar_grace);
                        break
                    }
                    v = p.buffer[p.index - 1];
                    Xf();
                    "." == v && (k.last_sym.bar_dotted = !0);
                    continue;
                case "}":
                    y = k.last_note;
                    if (!c || !y) {
                        t(1, O.bad_char, v);
                        break
                    }
                    Aa && t(1, "Decoration ignored");
                    c.extra = c.next;
                    c.extra.prev = null;
                    c.next = null;
                    k.last_sym = c;
                    c = null;
                    if (!y.prev && !k.ckey.k_bagpipe) {
                        for (u = 0; u <= y.nhd; u++)
                            y.notes[u].dur *= 2;
                        y.dur *= 2;
                        y.dur_orig *= 2
                    }
                    k.last_note = b;
                    Aa = d;
                    break;
                case "\\":
                    if (!p.buffer[p.index + 1]) {
                        e = !0;
                        break
                    }
                default:
                    t(1, O.bad_char, v)
                }
                p.index++
            }
        }
        var c, b, d, e, f, g = [], m, q = -1, n = 1, B = 0, p = l.line;
        if (3 != l.state) {
            if (2 != l.state)
                return;
            Ua()
        }
        a();
        if (0 <= q)
            for (t(1, "No end of tuplet"),
            f = k.last_note; f; f = f.prev)
                if (f.tp1 && (f.tp1 = 0),
                f.tp0) {
                    f.tp0 = 0;
                    break
                }
        c && (t(1, "No end of grace note sequence"),
        k.last_sym = c.prev,
        k.last_note = b,
        c.prev && (c.prev.next = null));
        r.breakoneoln && k.last_note && (k.last_note.beam_end = !0);
        e || r.barsperstaff || "\n" != Wa[10] || 0 != H.voices[k.v].range || !k.last_sym || (k.last_sym.eoln = !0)
    }
    function bd(a) {
        a = a.charCodeAt(0);
        if (128 <= a) {
            if (768 <= a && 880 > a)
                return 0;
            a = 97
        }
        return ag[a]
    }
    function ra(a) {
        "string" == typeof a && (a = mc(a));
        ag = "sans" == a.name.slice(0, 4) ? jh : bg;
        E.curfont = E.deffont = a
    }
    function cg(a) {
        var c, b = E.curfont, d = b;
        z += a.replace(/<|>|&[^&]*?;|&|  |\$./g, function(a) {
            switch (a) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "  ":
                return " \u00a0";
            default:
                if ("$" == a[0]) {
                    if ("0" == a[1])
                        c = E.deffont,
                        Kb(c);
                    else if ("1" <= a[1] && "9" >= a[1])
                        c = mc("u" + a[1]);
                    else
                        break;
                    a = "";
                    if (c != d && (d != b && (a = "</tspan>"),
                    d = c,
                    d != b))
                        return a + '<tspan\n\tclass="' + be(c) + '">'
                }
            }
            return a
        });
        d != b && (z += "</tspan>",
        E.curfont = d)
    }
    function na(a, c, b, d, e, f) {
        f || (f = Pa(b));
        z += '<text class="' + be(E.curfont);
        "j" != d && 5 < b.length && E.curfont.wadj && (z += '" lengthAdjust="' + E.curfont.wadj + '" textLength="' + f[0].toFixed(1));
        z += '" x="';
        qb(a, '" y="', c + .2 * f[1]);
        switch (d) {
        case "c":
            a -= f[0] / 2;
            z += '" text-anchor="middle">';
            break;
        case "j":
            z += '" textLength="' + e.toFixed(1) + '">';
            break;
        case "r":
            a -= f[0];
            z += '" text-anchor="end">';
            break;
        default:
            z += '">'
        }
        cg(b);
        z += "</text>\n";
        !e && E.curfont.box && (z += '<rect class="stroke" x="',
        qb(a - 2, '" y="', c + f[1]),
        z += '" width="' + (f[0] + 4).toFixed(1) + '" height="' + (f[1] + 2).toFixed(1) + '"/>\n')
    }
    function ud() {
        return (ga.width - ga.lm - ga.rm - 2) / r.scale
    }
    function de(a, c) {
        var b, d;
        if (a) {
            fb();
            b = a;
            if (r.titletrim)
                if (d = b.lastIndexOf(", "),
                0 > d || "A" > b[d + 2] || "Z" < b[d + 2])
                    d = 0;
                else if (1 == r.titletrim) {
                    if (d < b.length - 7 || 0 <= b.indexOf(" ", d + 3))
                        d = 0
                } else
                    d < b.length - r.titletrim - 2 && (d = 0);
            !c && 0 <= r.writefields.indexOf("X") && (b = P.X + ".  " + b);
            d && (b = b.slice(d + 2).trim() + " " + b.slice(0, d));
            a = r.titlecaps ? b.toUpperCase() : b;
            c ? (ra("subtitle"),
            b = r.subtitlespace) : (ra("title"),
            b = r.titlespace);
            d = Pa(a);
            ja(d[1] + b);
            r.titleleft ? na(0, 0, a, null, null, d) : na(ud() / 2, 0, a, "c", null, d)
        }
    }
    function dg(a, c, b, d, e) {
        if (!b) {
            if (!d)
                return;
            b = d;
            d = null
        }
        d ? na(a, c, b + " (" + d + ")", e) : na(a, c, b, e)
    }
    function Ad(a, c) {
        if ("s" != c) {
            ra("text");
            fb();
            var b, d, e = ud();
            d = E.curfont.size;
            var f = d * r.lineskipfac, g = d * r.parskipfac, m = hb.started ? function() {}
            : zb, h = hb.started ? zd : Lc, n, k, p, l, u;
            m();
            switch (c) {
            default:
                switch (c) {
                case "c":
                    e /= 2;
                    break;
                case "r":
                    break;
                default:
                    e = 0
                }
                k = 0;
                for (d = E.curfont; ; ) {
                    n = a.indexOf("\n", k);
                    if (0 > n) {
                        l = a.slice(k);
                        b = Pa(l);
                        E.curfont = d;
                        ja(b[1] * r.lineskipfac);
                        na(e, 0, l, c, null, b);
                        d = E.curfont;
                        break
                    }
                    if (n == k) {
                        ja(g);
                        h();
                        for (Kb(E.curfont); "\n" == a[n + 1]; )
                            ja(f),
                            n++;
                        if (n == a.length)
                            break;
                        m()
                    } else
                        l = a.slice(k, n),
                        b = Pa(l),
                        E.curfont = d,
                        ja(b[1] * r.lineskipfac),
                        na(e, 0, l, c, null, b),
                        d = E.curfont;
                    k = n + 1
                }
                ja(g);
                h();
                break;
            case "f":
            case "j":
                for (k = 0; ; ) {
                    n = a.indexOf("\n\n", k);
                    p = 0 > n ? a.slice(k) : a.slice(k, n);
                    p = p.split(/\s+/);
                    b = l = 0;
                    d = E.curfont;
                    for (k = 0; k < p.length; k++)
                        u = Pa(p[k] + " ")[0],
                        b += u,
                        b >= e && (l = p.slice(l, k).join(" "),
                        E.curfont = d,
                        b = Pa(l),
                        E.curfont = d,
                        ja(b[1] * r.lineskipfac),
                        na(0, 0, l, c, e, b),
                        d = E.curfont,
                        l = k,
                        b = u);
                    0 != b && (l = p.slice(l).join(" "),
                    E.curfont = d,
                    b = Pa(l),
                    E.curfont = d,
                    ja(b[1] * r.lineskipfac),
                    na(0, 0, l, null, null, b));
                    ja(g);
                    h();
                    if (0 > n)
                        break;
                    for (; "\n" == a[n + 2]; )
                        ja(f),
                        n++;
                    if (n == a.length)
                        break;
                    m();
                    Kb(E.curfont);
                    k = n + 2
                }
            }
        }
    }
    function Vg(a) {
        function c(a, b, c) {
            c = 0;
            var d, e;
            "$" == a[c] && "0" <= a[c + 1] && "9" >= a[c + 1] && (c += 2);
            e = 0;
            d = c;
            if ("0" <= a[c] && "9" >= a[c] || "." == a[c + 1]) {
                for (; c < a.length && (c++,
                " " != a[c] && ":" != a[c - 1] && "." != a[c - 1]); )
                    ;
                for (e = c; " " == a[c]; )
                    c++
            }
            0 != e && na(b, 0, a.slice(d, e), "r");
            c < a.length && na(b + 5, 0, a.slice(c), "l");
            return c >= a.length && 0 == e
        }
        var b, d, e, f, g, m, h;
        ra("words");
        var k = ud() / 2;
        m = (k - 45) / (bd("a") * E.curfont.swfac);
        f = 0;
        a = a.split("\n");
        g = a.length;
        for (d = 0; d < g; d++) {
            b = a[d];
            if (b.length > m) {
                f = 0;
                break
            }
            b ? h = !0 : h && (f++,
            h = !1)
        }
        if (0 < f) {
            d = f = (f + 1) / 2 | 0;
            h = !1;
            for (m = 0; m < g; m++) {
                b = a[m];
                for (e = 0; " " == b[e]; )
                    e++;
                if (e == b.length) {
                    if (h && 0 >= --d)
                        break;
                    h = !1
                } else
                    h = !0
            }
            b = m + 1
        } else
            b = m = g;
        ja(r.wordsspace);
        for (d = 0; d < m || b < g; d++)
            d < m && 0 == a[d].length && (zb(),
            Kb(E.curfont)),
            ja(r.lineskipfac * E.curfont.size),
            d < m && c(a[d], 45, 0),
            b < g && (c(a[b], 20 + k, 1) && 0 == --f && (d < m ? f++ : b < a.length - 1 && (k *= .6)),
            b++)
    }
    function Fd(a) {
        return a.replace(/[Cco]\||[co]\.|./g, function(a) {
            a = Yd["mtr" + a];
            return a.x || a.y ? '<tspan dx="' + a.x.toFixed(1) + '" dy="' + a.y.toFixed(1) + '">' + a.c + "</tspan>" : a.c
        })
    }
    function eg(a) {
        var c, b;
        if (!ee[a])
            if (ee[a] = !0,
            b = Hb[a]) {
                for (c = 0; ; ) {
                    a = b.indexOf('xlink:href="#', c);
                    if (0 > a)
                        break;
                    a += 13;
                    c = b.indexOf('"', a);
                    eg(b.slice(a, c))
                }
                fe += "\n" + b
            } else
                K(1, null, "Unknown glyph: '$1'", a)
    }
    function Gd() {
        C.started && (C.started = !1,
        z += "</g>\n");
        if (1 != C.scale || C.color)
            z += "<g ",
            1 != C.scale && (z = 0 > C.st ? z + x[C.v].scale_str : 0 > C.v ? z + u[C.st].scale_str : z + ('transform="translate(0,' + (ia - C.dy).toFixed(1) + ") scale(" + C.scale.toFixed(2) + ')"')),
            C.color && (1 != C.scale && (z += " "),
            z += 'color="' + C.color + '" fill="' + C.color + '"'),
            z += ">\n",
            C.started = !0
    }
    function Tb(a) {
        if (a != C.color) {
            var c = C.color;
            C.color = a;
            Gd();
            return c
        }
    }
    function eb(a) {
        var c, b;
        a != C.st && 1 != C.scale && (C.scale = 0);
        c = 0 <= a ? u[a].staffscale : 1;
        b = 0 <= a && 1 != c ? u[a].y : ia;
        if (c != C.scale || b != C.dy)
            C.scale = c,
            C.dy = b,
            C.st = a,
            C.v = -1,
            Gd()
    }
    function dd(a) {
        var c, b = a.p_v.scale;
        if (1 == b)
            eb(a.st);
        else if (c = ia,
        1 != u[a.st].staffscale && (b *= u[a.st].staffscale,
        c = u[a.st].y),
        b != C.scale || C.dy != ia)
            C.scale = b,
            C.dy = c,
            C.st = 1 == u[a.st].staffscale ? -1 : a.st,
            C.v = a.v,
            Gd()
    }
    function Ub(a, c) {
        z && (0 > C.st ? u[0].output += z : 1 == C.scale ? u[C.st].output += z : u[C.st].sc_out += z,
        z = "");
        C.scale = 0 > a ? 1 : c ? 1 : u[a].staffscale;
        C.st = a;
        C.dy = 0
    }
    function fg(a, c, b) {
        if (void 0 != a.istart) {
            var d = a.type
              , e = a.ymx - a.ymn + 4
              , f = a.wl || 2
              , g = a.wr || 2;
            a.grace && (d = h.GRACE);
            b(c || gg[d], a.istart, a.iend, a.x - f - 2, u[a.st].y + a.ymn + e - 2, f + g + 4, e, a)
        }
    }
    function kh(a, c) {
        fg(a, c, w.anno_start)
    }
    function lh(a, c) {
        fg(a, c, w.anno_stop)
    }
    function hg() {}
    function X(a, c, b, d, e) {
        c = Hd(c);
        b = Id(b);
        z += a.replace(/X|Y|A|B|F|G/g, function(a) {
            switch (a) {
            case "X":
                return c.toFixed(1);
            case "Y":
                return b.toFixed(1);
            case "A":
                return d;
            case "B":
                return e;
            case "F":
                return d.toFixed(1);
            default:
                return e.toFixed(1)
            }
        })
    }
    function $d(a, c, b, d, e) {
        X('<g transform="translate(X,Y', a, c);
        b && (z += ") rotate(" + b.toFixed(2));
        d && (z = e ? z + (") scale(" + d.toFixed(2) + ", " + e.toFixed(2)) : z + (") scale(" + d.toFixed(2)));
        z += ')">\n';
        C.g++
    }
    function ae() {
        C.g--;
        z += "</g>\n"
    }
    function Hd(a) {
        return C.g ? a : (a + jc) / C.scale
    }
    function Id(a) {
        return C.g ? -a : 1 == C.scale ? ia - a : 0 <= C.v ? (C.dy - a) / x[C.v].scale : C.dy - a
    }
    function qb(a, c, b) {
        a = Hd(a);
        b = Id(b);
        z += a.toFixed(1) + c + b.toFixed(1)
    }
    function Xd(a, c, b) {
        b ? X('<path d="mX Y', a, c) : X('<path class="stroke" d="mX Y', a, c)
    }
    function ca(a, c, b) {
        var d = Yd[b];
        d && !Hb[b] ? (a += d.x * C.scale,
        c -= d.y,
        d.sc ? X('<text transform="translate(X,Y) scale(A)">B</text>\n', a, c, d.sc, d.c) : X('<text x="X" y="Y">A</text>\n', a, c, d.c)) : Hb[b] ? (eg(b),
        X('<use x="X" y="Y" xlink:href="#A"/>\n', a, c, b)) : K(1, null, "no definition of $1", b)
    }
    function Af(a, c, b) {
        X('<text style="font:italic 12px serif"\n\tx="X" y="Y" text-anchor="middle">A</text>\n', a, c, b.toString())
    }
    function ig(a, c, b) {
        var d, e = 25 + 3 * (b / 20 | 0);
        d = 15 < b ? (b - 15) / e | 0 : 0;
        X('<path class="stroke" stroke-width="1.2"\n\tstroke-dasharray="5,A"\n\td="mX YhB"/>\n', a + (b - e * d - 5) / 2, c + 6, Math.round((e - 5) / C.scale), e * d + 5)
    }
    function Yc(a, c, b, d, e, f) {
        var g = d ? kc : 3.5
          , m = -b;
        0 > b && (g = -g);
        a += g * C.scale;
        0 <= C.v && (m /= x[C.v].scale);
        X('<path class="sW" d="mX YvF"/>\n', a, c, m);
        if (e) {
            c += b;
            if (0 < b)
                if (f)
                    if (z += '<path d="',
                    d)
                        for (; 0 <= --e; )
                            X("MX Yl3 1.5 0 2 -3 -1.5z\n", a, c),
                            c -= 3;
                    else
                        for (c += 1; 0 <= --e; )
                            X("MX Yl7 3.2 0 3.2 -7 -3.2z\n", a, c),
                            c -= 5.4;
                else if (d)
                    if (z += '<path d="',
                    1 == e)
                        X("MX Yc0.6 3.4 5.6 3.8 3 10\n\t1.2 -4.4 -1.4 -7 -3 -7\n", a, c);
                    else
                        for (; 0 <= --e; )
                            X("MX Yc1 3.2 5.6 2.8 3.2 8\n\t1.4 -4.8 -2.4 -5.4 -3.2 -5.2\n", a, c),
                            c -= 3.5;
                else {
                    ca(a, c, "flu" + e);
                    return
                }
            else if (f) {
                if (z += '<path d="',
                !d)
                    for (c += 1; 0 <= --e; )
                        X("MX Yl7 -3.2 0 -3.2 -7 3.2z\n", a, c),
                        c += 5.4
            } else if (d)
                if (z += '<path d="',
                1 == e)
                    X("MX Yc0.6 -3.4 5.6 -3.8 3 -10\n\t1.2 4.4 -1.4 7 -3 7\n", a, c);
                else
                    for (; 0 <= --e; )
                        X("MX Yc1 -3.2 5.6 -2.8 3.2 -8\n\t1.4 4.8 -2.4 5.4 -3.2 5.2\n", a, c),
                        c += 3.5;
            else {
                ca(a, c, "fld" + e);
                return
            }
            z += '"/>\n'
        }
    }
    function ge(a, c, b) {
        X('<path class="stroke" stroke-width="0.8" d="mX YhF"/>\n', a, c + 3, b)
    }
    function jg(a, c, b, d) {
        var e = mh[b];
        e ? (a += e.dx,
        c += e.dy,
        e.def || (oc += "\n." + b + " {" + e.style + "}",
        e.def = !0),
        X('<text x="X" y="Y" class="A"B>', a, c, b, e.anchor || ""),
        ra("annotation"),
        cg(d),
        z += "</text>\n") : ca(a, c, b)
    }
    function kg(a, c, b) {
        $d(a, c, 270);
        a = 0;
        for (b = Math.ceil(b / 6); 0 <= --b; )
            ca(a, 6, "ltr"),
            a += 6;
        ae()
    }
    function lg(a, c, b) {
        c += 4;
        for (b = Math.ceil(b / 6); 0 <= --b; )
            ca(a, c, "ltr"),
            a += 6
    }
    function nf(a, c, b, d, e) {
        if (mg[b])
            mg[b](a, c, d, e);
        else
            K(1, null, "No function for decoration '$1'", b)
    }
    function ja(a) {
        ia += a
    }
    function zd() {
        if (!Qa && z && w.img_out && 0 != ia) {
            var a = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"\n\txmlns:xlink="http://www.w3.org/1999/xlink"\n\tcolor="'
              , c = ""
              , a = r.fgcolor ? a + (r.fgcolor + '" fill="' + r.fgcolor + '"') : a + 'black"'
              , a = a + ' class="music" stroke-width=".7"';
            r.bgcolor && (a += ' style="background-color: ' + r.bgcolor + '"');
            ia *= r.scale;
            a = w.imagesize ? a + ("\n" + w.imagesize + ' viewBox="0 0 ' + ga.width.toFixed(0) + " " + ia.toFixed(0) + '">\n') : a + ('\n\twidth="' + ga.width.toFixed(0) + 'px" height="' + ia.toFixed(0) + 'px">\n');
            if (oc || wc || Wb)
                a += '<style type="text/css">' + oc + wc,
                Wb && (a = 0 < Wb.indexOf("(") ? a + ('\n.music{font:24px music}\n@font-face {\n  font-family:"music";\n  src:' + Wb + "}") : a + ("\n.music{font:24px " + Wb + "}")),
                a += "\n</style>\n";
            (fe += se) && (a += "<defs>" + fe + "\n</defs>\n");
            1 != r.scale && (a += '<g class="g" transform="scale(' + r.scale.toFixed(2) + ')">\n',
            c = "</g>\n");
            ng && ng.ps_flush(!0);
            w.img_out(a + z + c + "</svg>");
            wc = z = "";
            if (r.fullsvg)
                for (ee = {},
                a = 0; a < Zc.length; a++)
                    Zc[a].used = !1;
            else
                se = oc = Wb = "";
            fe = "";
            ia = 0
        }
    }
    function zb() {
        !Qa && w.img_out && (Lc(),
        w.page_format && !hb.started && (hb.started = !0,
        hb.newpage ? (hb.newpage = !1,
        w.img_out('<div class="nobrk newpage">')) : w.img_out('<div class="nobrk">')))
    }
    function Lc() {
        zd();
        hb.started && (hb.started = !1,
        w.img_out("</div>"))
    }
    function nh() {
        function a(a, c) {
            var b;
            b = new RegExp(c);
            if (b.test(k.id) || b.test(k.nm))
                for (b = 0; b < a.length; b++)
                    ba.do_pscom(a[b])
        }
        var c;
        if (l.voice_opts)
            for (c in l.voice_opts)
                l.voice_opts.hasOwnProperty(c) && a(l.voice_opts[c], c);
        if (l.tune_v_opts)
            for (c in l.tune_v_opts)
                l.tune_v_opts.hasOwnProperty(c) && a(l.tune_v_opts[c], c)
    }
    function sa(a) {
        a.fname || xc(a);
        k.ignore || (l.last_sym = a,
        (a.prev = k.last_sym) ? k.last_sym.next = a : k.sym = a,
        k.last_sym = a);
        a.v = k.v;
        a.p_v = k;
        a.st = k.cst;
        a.time = k.time;
        a.dur && !a.grace && (k.time += a.dur);
        a.pos = k.pos;
        k.second && (a.second = !0);
        k.floating && (a.floating = !0)
    }
    function Mc(a, c) {
        var b = {
            type: c,
            dur: 0
        }, d;
        d = k;
        k = a;
        sa(b);
        k = d;
        d = b.prev;
        d || (d = b.next);
        d && (b.fname = d.fname,
        b.istart = d.istart,
        b.iend = d.iend);
        return b
    }
    function og(a) {
        var c, b, d, e = a.nmes, f = a.dur / e, g = a.a_dd;
        a.type = h.REST;
        a.dur = a.dur_orig = f;
        d = a.next;
        c = a.p_v;
        c.last_sym = a;
        c.time = a.time + f;
        c.cst = a.st;
        for (b = a; 0 < --e; )
            b = Mc(c, h.BAR),
            b.bar_type = "|",
            b = Mc(c, h.REST),
            a.invis && (b.invis = !0),
            b.dur = b.dur_orig = f,
            c.time += f;
        if (b.next = d)
            d.prev = b;
        b.a_dd = g
    }
    function pg() {
        var a, c, b;
        (c = za.tempo) && 0 >= jb && (b = H.top_voice,
        a = x[b],
        a.sym && a.sym.type != h.TEMPO && (c = A(c),
        c.v = b,
        c.p_v = a,
        c.st = a.st,
        c.time = 0,
        c.next = a.sym,
        c.next && (c.next.prev = c),
        a.sym = c));
        for (b = 0; b < x.length; b++) {
            a = x[b];
            a.ignore && (a.ignore = !1);
            for (c = a.sym; c && !(c.time >= jb); c = c.next)
                ;
            for (; c; c = c.next) {
                switch (c.type) {
                case h.GRACE:
                    c.next && c.next.type == h.BAR && c.time--;
                    if (!r.graceword)
                        continue;
                    for (a = c.next; a; a = a.next) {
                        switch (a.type) {
                        case h.SPACE:
                            continue;
                        case h.NOTE:
                            a.a_ly && (c.a_ly = a.a_ly,
                            a.a_ly = null)
                        }
                        break
                    }
                    continue
                }
                if (c.feathered_beam) {
                    var d, e, f, g, m, q;
                    d = c;
                    f = d.dur;
                    var k = 1;
                    for (q = d; q && !q.beam_end && q.next; q = q.next)
                        k++;
                    if (1 >= k)
                        delete d.feathered_beam;
                    else {
                        m = q;
                        e = f / 2;
                        a = f / (k - 1);
                        g = d.time;
                        if (0 < d.feathered_beam)
                            for (q = d,
                            d = k - 1; q != m; q = q.next,
                            d--)
                                f = (a * d | 0) + e,
                                q.dur = f,
                                q.time = g,
                                g += f;
                        else
                            for (q = d,
                            d = 0; q != m; q = q.next,
                            d++)
                                f = (a * d | 0) + e,
                                q.dur = f,
                                q.time = g,
                                g += f;
                        q.dur = q.time + q.dur - g;
                        q.time = g
                    }
                }
            }
        }
    }
    function qg() {
        var a, c, b, d, e, f, g, m = x.length;
        for (f = 0; f < m; f++)
            if (a = x[f],
            c = a.clone) {
                a.clone = null;
                for (b = a.sym; b && !(b.time >= jb); b = b.next)
                    ;
                c.clef = A(a.clef);
                for (k = c; b; b = b.next)
                    if (b.type != h.STAVES) {
                        a = A(b);
                        if (b.notes)
                            for (a.notes = [],
                            g = 0; g <= b.nhd; g++)
                                a.notes.push(A(b.notes[g]));
                        sa(a);
                        c.second ? a.second = !0 : delete a.second;
                        c.floating ? a.floating = !0 : delete a.floating;
                        delete a.a_ly;
                        if (d = a.extra)
                            for (e = A(d),
                            a = a.extra = e,
                            a.v = c.v,
                            a.p_v = c,
                            a.st = c.st,
                            d = d.next; d; d = d.next) {
                                e = A(d);
                                if (d.notes)
                                    for (e.notes = [],
                                    g = 0; g <= d.nhd; g++)
                                        e.notes.push(A(d.notes[g]));
                                a.next = e;
                                e.prev = a;
                                a = e;
                                a.v = c.v;
                                a.p_v = c;
                                a.st = c.st
                            }
                    }
            }
    }
    function rg(a) {
        var c, b = {
            voices: [],
            staves: [],
            top_voice: 0
        };
        if (a)
            F = H = b;
        else {
            for (a = 0; a < x.length; a++) {
                if (0 <= H.voices[a].range) {
                    c = H.voices[a].st;
                    c = H.staves[c];
                    var d = x[a];
                    void 0 != d.staffnonote && (c.staffnonote = d.staffnonote);
                    d.staffscale && (c.staffscale = d.staffscale)
                }
                b.voices[a] = A(H.voices[a]);
                b.voices[a].range = -1;
                delete b.voices[a].second
            }
            for (c = 0; c < H.staves.length; c++)
                b.staves[c] = A(H.staves[c]),
                b.staves[c].flags = 0;
            H = H.next = b
        }
    }
    function Jd() {
        var a;
        if (!k.ckey.k_bagpipe && !k.ckey.k_drum && (r.transp && k.transp && t(0, "Mix of old and new transposition syntaxes"),
        a = (r.transp || 0) + (k.transp || 0) + (k.shift || 0),
        a != (k.vtransp || 0)))
            if (k.vtransp = a,
            a = k.last_sym) {
                for (; a.type != h.KEY; ) {
                    if (!a.prev) {
                        a = k.key;
                        break
                    }
                    a = a.prev
                }
                Dd(a);
                k.ckey = A(a);
                k.key.k_none && (a.k_sf = 0)
            } else
                k.key = A(k.okey),
                Dd(k.key),
                k.ckey = A(k.key),
                k.key.k_none && (k.key.k_sf = 0)
    }
    function Df() {
        var a, c;
        ka && (t(1, "No end of voice overlay"),
        Ac(ka.bar ? "|" : ")"));
        if (0 != x.length) {
            pg();
            qg();
            var b, d, e, f, g, m, q, k, l = x.length, p = [], r = [], u = -1;
            for (b = 0; b < l; b++)
                p.push(x[b].sym);
            for (var z = 1, A = F; ; ) {
                if (A && z)
                    for (k = A,
                    A = null,
                    f = -1,
                    r = [],
                    b = 0; b < l; b++)
                        k.voices[b] ? (e = k.voices[b].range,
                        0 > e || (r[e] = b,
                        f++)) : k.voices[b] = {
                            range: -1
                        };
                d = c = 1E6;
                for (e = 0; e < l; e++) {
                    b = r[e];
                    if (void 0 == b)
                        break;
                    !(a = p[b]) || a.time > c || (b = gb[a.type],
                    a.time < c ? (c = a.time,
                    d = b) : b < d && (d = b),
                    a.type == h.MREST && (1 == a.nmes ? og(a) : 0 < f && (u = c)))
                }
                if (127 < d)
                    break;
                if (c == u) {
                    for (e = m = 0; e < l; e++) {
                        b = r[e];
                        if (void 0 == b)
                            break;
                        if ((a = p[b]) && a.time == c && gb[a.type] == d) {
                            if (a.type != h.MREST) {
                                u = -1;
                                break
                            }
                            if (0 == m)
                                m = a.nmes;
                            else if (m != a.nmes) {
                                u = -1;
                                break
                            }
                        }
                    }
                    if (0 > u)
                        for (e = 0; e < l; e++) {
                            b = r[e];
                            if (void 0 == b)
                                break;
                            (a = p[b]) && a.type == h.MREST && og(a)
                        }
                }
                for (e = 0; e < l; e++) {
                    b = r[e];
                    if (void 0 == b)
                        break;
                    if ((a = p[b]) && a.time == c && gb[a.type] == d) {
                        if (a.type == h.STAVES) {
                            A = a.sy;
                            for (m = 0; m < l && void 0 != r[m]; m++)
                                ;
                            for (q = 0; q < l; q++)
                                A.voices[q] && (e = A.voices[q].range,
                                0 > e || 0 <= k.voices[q].range || (r[m++] = q))
                        }
                        z && (z = 0,
                        a.seqst = !0);
                        (a.ts_prev = g) ? g.ts_next = a : W = a;
                        g = a;
                        p[b] = a.next
                    }
                }
                z = d
            }
            if (W && (ba.set_bar_num(),
            W)) {
                w.get_abcmodel && w.get_abcmodel(W, x, gg, P);
                w.img_out && ba.output_music();
                for (a = 0; a < x.length; a++)
                    c = x[a],
                    c.time = 0,
                    c.sym = c.last_sym = null,
                    c.st = F.voices[a].st,
                    c.second = F.voices[a].second,
                    delete c.have_ly,
                    c.hy_st = 0,
                    delete c.bar_start,
                    delete c.slur_st,
                    delete c.s_tie,
                    delete c.s_rtie;
                jb = 0
            }
        }
    }
    function Dd(a) {
        var c = k.vtransp / 3 | 0
          , c = (c & -2) + 7 * (c & 1) + a.k_sf;
        switch ((k.vtransp + 210) % 3) {
        case 1:
            c = (c + 4 + 48) % 12 - 4;
            break;
        case 2:
            c = (c + 7 + 48) % 12 - 7;
            break;
        default:
            c = (c + 5 + 48) % 12 - 5
        }
        a.k_sf = c;
        a.k_delta = zc[(c + 7) % 7]
    }
    function oh(a) {
        var c, b, d = k.last_sym.prev;
        if (d)
            for (b = d.time; d; d = d.prev)
                switch (d.type) {
                case h.BAR:
                    if (d.time < b)
                        return;
                    for (; ; ) {
                        d = d.prev;
                        if (!d)
                            return;
                        if (d.type == h.NOTE) {
                            if (d.time + d.dur == b)
                                break;
                            return
                        }
                        if (d.time < b)
                            return
                    }
                    for (c = 0; c <= d.nhd; c++)
                        if (d.notes[c].pit == a && d.notes[c].ti1)
                            return d.notes[c].acc;
                    return;
                case h.NOTE:
                    for (c = 0; c <= d.nhd; c++)
                        if (d.notes[c].pit == a)
                            return d.notes[c].acc
                }
    }
    function sg(a, c) {
        var b, d, e, f, g, m, q;
        b = [];
        e = !1;
        var n = m = d = g = f = 0, r, p = c.match(/\w+|[^\s]/g);
        if (p) {
            for (; ; ) {
                r = p.shift();
                if (!r)
                    break;
                switch (r) {
                case "[":
                    if (m || 2 <= g + d) {
                        t(1, O.misplaced, "[");
                        e = !0;
                        break
                    }
                    f |= 0 == g + d ? 4 : 1024;
                    d++;
                    n <<= 8;
                    n |= 4;
                    break;
                case "{":
                    if (m || g || 2 <= d) {
                        t(1, O.misplaced, "{");
                        e = !0;
                        break
                    }
                    f |= d ? 256 : 1;
                    g++;
                    n <<= 8;
                    n |= 1;
                    break;
                case "(":
                    if (m) {
                        t(1, O.misplaced, "(");
                        e = !0;
                        break
                    }
                    f |= 16;
                    m++;
                    n <<= 8;
                    n |= 16;
                    break;
                case "*":
                    !g || m || f & 257 || (f |= 128);
                    break;
                case "+":
                    f |= 4096;
                    break;
                default:
                    if (/\w/.test(r)) {
                        for (q = r; ; ) {
                            r = p.shift();
                            if (!r)
                                break;
                            switch (r) {
                            case "]":
                                if (!(n & 4)) {
                                    t(1, O.misplaced, "]");
                                    e = !0;
                                    break
                                }
                                d--;
                                f |= 0 == g + d ? 8 : 2048;
                                n >>= 8;
                                continue;
                            case "}":
                                if (!(n & 1)) {
                                    t(1, O.misplaced, "}");
                                    e = !0;
                                    break
                                }
                                g--;
                                f |= d ? 512 : 2;
                                f &= -129;
                                n >>= 8;
                                continue;
                            case ")":
                                if (!(n & 16)) {
                                    t(1, O.misplaced, ")");
                                    e = !0;
                                    break
                                }
                                m--;
                                f |= 32;
                                n >>= 8;
                                continue;
                            case "|":
                                f |= 64;
                                continue
                            }
                            break
                        }
                        b.push([q, f]);
                        f = 0;
                        r && p.unshift(r)
                    } else
                        t(1, "Bad voice ID in %%staves"),
                        e = !0
                }
            }
            0 != n && (t(1, "'}', ')' or ']' missing in %%staves"),
            e = !0);
            q = e || 0 == b.length ? void 0 : b
        } else
            t(1, O.bad_val, "%%staves"),
            q = void 0;
        if (q) {
            0 != x.length && (pg(),
            qg());
            g = 0;
            e = !0;
            for (f = 0; f < x.length; f++)
                b = x[f],
                b.time > g && (g = b.time),
                b.sym && (e = !1);
            if (e || 0 == g && 0 > jb)
                for (f = 0; f < H.voices.length; f++)
                    H.voices[f].range = -1;
            else {
                for (f = 0; f < H.voices.length; f++)
                    if (0 <= H.voices[f].range) {
                        k = x[f];
                        break
                    }
                k.time = g;
                b = {
                    type: h.STAVES,
                    dur: 0
                };
                sa(b);
                H.nstaff = S;
                rg();
                b.sy = H
            }
            jb = g;
            for (f = 0; f < x.length; f++)
                b = x[f],
                delete b.second,
                delete b.ignore,
                delete b.floating;
            for (e = m = 0; e < q.length; e++) {
                b = q[e][0];
                b = he(b);
                b.time = g;
                f = b.v;
                0 == e && (H.top_voice = b.v);
                if (0 <= H.voices[f].range) {
                    d = A(b);
                    H.voices[x.length] = A(H.voices[f]);
                    f = x.length;
                    d.v = f;
                    d.sym = d.last_sym = null;
                    d.time = g;
                    x.push(d);
                    for (delete d.clone; b.clone; )
                        b = b.clone;
                    b = b.clone = d
                }
                q[e][0] = b;
                H.voices[f].range = m++
            }
            if ("t" == a[1])
                for (e = 0; e < q.length; e++)
                    d = q[e][1],
                    d & 257 && 3 != (d & 3) && 768 != (d & 768) && 0 == q[e + 1][1] && !(d & 16 || q[e + 2][1] & 16) && (q[e + 2][1] & 514 ? q[e + 1][1] |= 128 : 0 == q[e + 2][1] && q[e + 3][1] & 514 && (q[e][1] |= 16,
                    q[e + 1][1] |= 32,
                    q[e + 2][1] |= 16,
                    q[e + 3][1] |= 32));
            g = -1;
            for (e = 0; e < q.length; e++)
                if (d = q[e][1],
                48 == (d & 48) && (d &= -49,
                q[e][1] = d),
                b = q[e][0],
                d & 128 ? (b.floating = !0,
                b.second = !0) : (g++,
                H.staves[g] || (H.staves[g] = {
                    stafflines: "|||||",
                    staffscale: 1
                }),
                H.staves[g].flags = 0),
                f = b.v,
                b.st = b.cst = H.voices[f].st = g,
                H.staves[g].flags |= d,
                d & 16) {
                    for (d = b; e < q.length - 1 && !(b = q[++e][0],
                    f = b.v,
                    q[e][1] & 4096 ? (d.second = !0,
                    d = b) : b.second = !0,
                    b.st = b.cst = H.voices[f].st = g,
                    q[e][1] & 32); )
                        ;
                    H.staves[g].flags |= q[e][1]
                }
            0 > g && (g = 0);
            H.nstaff = S = g;
            if ("c" == a[1])
                for (g = 0; g < S; g++)
                    H.staves[g].flags ^= 64;
            for (f = 0; f < x.length; f++)
                b = x[f],
                0 > H.voices[f].range ? b.ignore = !0 : (H.voices[f].second = b.second,
                g = b.st,
                !(0 < g) || b.norepbra || H.staves[g - 1].flags & 64 || (b.norepbra = !0));
            k = 2 <= l.state ? x[H.top_voice] : null
        }
    }
    function Ac(a) {
        function c(a) {
            var b, c;
            for (b = 0; b < x.length; b++)
                if (c = x[b],
                c.id == a)
                    return c;
            c = A(k);
            c.v = x.length;
            c.id = a;
            c.sym = c.last_sym = null;
            delete c.nm;
            delete c.snm;
            delete c.new_name;
            delete c.lyric_restart;
            delete c.lyric_cont;
            delete c.ly_a_h;
            delete c.sym_restart;
            delete c.sym_cont;
            delete c.have_ly;
            x.push(c);
            return c
        }
        var b, d, e;
        if (!k.ignore)
            if ("|" == a || ")" == a)
                k.last_note ? (k.last_note.beam_end = !0,
                ka ? (k.time != ka.p_voice.time && (t(1, "Wrong duration in voice overlay"),
                k.time > ka.p_voice.time && (ka.p_voice.time = k.time)),
                k = ka.p_voice,
                ka = null) : t(1, "Erroneous end of voice overlay")) : t(1, O.nonote_vo);
            else if ("(" == a)
                ka ? t(1, "Voice overlay already started") : ka = {
                    p_voice: k,
                    time: k.time
                };
            else if (k.last_note) {
                k.last_note.beam_end = !0;
                a = k.voice_down;
                if (!a) {
                    a = c(k.id + "o");
                    k.voice_down = a;
                    a.time = 0;
                    a.second = !0;
                    e = a.v;
                    H.voices[e] = {
                        st: k.st,
                        second: !0
                    };
                    var f = void 0 != k.clone ? 1 : 0;
                    d = H.voices[k.v].range;
                    for (b = 0; b < H.voices.length; b++)
                        H.voices[b].range > d && (H.voices[b].range += f + 1);
                    H.voices[e].range = d + 1;
                    f && (b = c(a.id + "c"),
                    b.second = !0,
                    e = b.v,
                    H.voices[e] = {
                        second: !0,
                        range: d + 2
                    },
                    a.clone = b)
                }
                a.ulen = k.ulen;
                a.dur_fact = k.dur_fact;
                k.uscale && (a.uscale = k.uscale);
                if (ka)
                    k != ka.p_voice && k.time != ka.p_voice.time && (t(1, "Wrong duration in voice overlay"),
                    k.time > ka.p_voice.time && (ka.p_voice.time = k.time));
                else {
                    ka = {
                        bar: !0,
                        p_voice: k
                    };
                    b = a.time;
                    for (d = k.last_sym; !(d.type == h.BAR || d.time <= b); d = d.prev)
                        ;
                    ka.time = d.time
                }
                a.time = ka.time;
                k = a
            } else
                t(1, O.nonote_vo)
    }
    function Bd() {
        var a;
        if (!k.sym)
            return !0;
        if (0 != k.time)
            return !1;
        for (a = k.last_sym; a; a = a.prev)
            if (0 != gb[a.type])
                return !1;
        return !0
    }
    function tg(a) {
        Bd() ? k.clef = a : (sa(a),
        a.clef_small = !0)
    }
    function he(a) {
        var c, b, d = x.length;
        if (1 == d && x[0]["default"] && (delete x[0]["default"],
        0 == x[0].time))
            return c = x[0],
            c.id = a,
            r.transp && 2 <= l.state && (a = k,
            k = c,
            Jd(),
            k = a),
            c;
        for (b = 0; b < d; b++)
            if (c = x[b],
            c.id == a)
                return c;
        c = {
            v: b,
            id: a,
            time: 0,
            "new": !0,
            pos: {
                dyn: 0,
                gch: 0,
                gst: 0,
                orn: 0,
                stm: 0,
                voc: 0,
                vol: 0
            },
            scale: 1,
            ulen: za.ulen,
            dur_fact: 1,
            key: A(l.ckey),
            ckey: A(l.ckey),
            okey: A(l.ckey),
            meter: A(za.meter),
            wmeasure: za.meter.wmeasure,
            clef: {
                type: h.CLEF,
                clef_auto: !0,
                clef_type: "a",
                time: 0
            },
            hy_st: 0
        };
        x.push(c);
        H.voices[b] = {
            range: -1
        };
        return c
    }
    function Ef() {
        S = -1;
        x = [];
        k = null;
        rg(!0);
        jb = -1;
        E = {};
        qa = []
    }
    function Cd(a) {
        var c;
        a = lc(a);
        var b = a.shift();
        if (b)
            if (0 < b.indexOf(",") && (c = b.split(","),
            b = c.shift()),
            2 > l.state)
                0 != a.length && Wf(b, a),
                "*" != b && 1 == l.state && (k = he(b));
            else if ("*" == b)
                t(1, "Cannot have V:* in tune body");
            else if (k = he(b),
            re(a),
            2 == l.state && Ua(),
            Jd(),
            a = k.v,
            k["new"] && (delete k["new"],
            0 > jb && (k.st = k.cst = ++S,
            H.nstaff = S,
            H.voices[a].st = S,
            H.voices[a].range = a,
            H.staves[S] = {
                stafflines: k.stafflines || "|||||",
                staffscale: 1
            }),
            0 > H.voices[a].range && 0 <= jb && (k.ignore = !0)),
            k.filtered || k.ignore || !l.voice_opts && !l.tune_v_opts || (k.filtered = !0,
            nh()),
            c) {
                var d, e;
                a = l.file;
                for (d = b = l.eol + 1; ; ) {
                    e = a.indexOf("\n", d);
                    if (0 > e) {
                        e = 0;
                        break
                    }
                    if (/%.*|\n.*|.:.|\[.:/.test(a.slice(e + 1, e + 4)))
                        break;
                    d = e + 1
                }
                nc++;
                $c(l.fname, a, b, e);
                for (d = 0; d < c.length; d++)
                    Cd(c[d]),
                    $c(l.fname, a, b, e);
                nc--
            }
    }
    function Ua(a) {
        var c, b = {
            type: h.STAVES,
            dur: 0,
            sy: H
        };
        fb();
        var d, e, f, g, m, q, n, B = ud();
        zb();
        ja(r.topspace);
        if (r.titleformat) {
            var p, v, u, t, w;
            d = {};
            e = A(ph);
            f = {
                A: r.infospace,
                C: r.composerspace,
                O: r.composerspace,
                R: r.infospace
            };
            g = {};
            m = "";
            q = r.titleformat;
            for (n = 0; ; ) {
                for (; " " == q[n]; )
                    n++;
                if (n >= q.length)
                    break;
                c = q[n++];
                if ("A" > c || "Z" < c)
                    "+" == c ? 0 != m.length && "+" != m.slice(-1) && (m = m.slice(0, -1) + "+") : "," == c && ("+" == m.slice(-1) && (m = m.slice(0, -1) + "l"),
                    m += "\n");
                else {
                    if (d[c])
                        g[c]++;
                    else {
                        if (!P[c])
                            continue;
                        d[c] = P[c].split("\n");
                        g[c] = 1
                    }
                    m += c;
                    switch (q[n]) {
                    case "-":
                        m += "l";
                        n++;
                        break;
                    case "0":
                        m += "c";
                        n++;
                        break;
                    case "1":
                        m += "r";
                        n++;
                        break;
                    default:
                        m += "c"
                    }
                }
            }
            "+" == m.slice(-1) && (m = m.slice(0, -1) + "l");
            m += "\n";
            var y = {
                l: r.titlespace,
                c: r.titlespace,
                r: r.titlespace
            }, z = {
                l: 0,
                c: .5 * B,
                r: B
            }, C = {}, F;
            q = m;
            for (n = 0; ; ) {
                C.l = C.c = C.r = t = 0;
                for (u = n; ; ) {
                    c = q[u++];
                    if ("\n" == c)
                        break;
                    v = q[u++];
                    if ("+" == v)
                        v = q[u + 1];
                    else if (0 != C[v])
                        continue;
                    if (F = d[c])
                        (B = e[c]) || (B = "history"),
                        p = mc(B),
                        w = 1.1 * p.size,
                        f[c] && (w += f[c]),
                        t < w && (t = w),
                        C[v] = w
                }
                y.l += t - C.l;
                y.c += t - C.c;
                for (y.r += t - C.r; ; ) {
                    c = q[n++];
                    if ("\n" == c)
                        break;
                    v = q[n++];
                    if (0 != d[c].length) {
                        F = d[c].shift();
                        "+" == v && (g[c]--,
                        c = q[n++],
                        v = q[n++],
                        0 < d[c].length && (F = F ? F + (" " + d[c].shift()) : " " + d[c].shift()));
                        (B = e[c]) || (B = "history");
                        p = mc(B);
                        w = 1.1 * p.size;
                        f[c] && (w += f[c]);
                        ra(p);
                        u = z[v];
                        t = y[v] + w;
                        "Q" == c ? (Lf(za.tempo),
                        za.tempo.del || ("l" != v && (p = tf(za.tempo),
                        "c" == v && (p *= .5),
                        u -= p),
                        uf(za.tempo, u, -t))) : F && na(u, -t, F, v);
                        "T" == c && (B = e.T = "subtitle",
                        f.T = r.subtitlespace);
                        if (1 >= g[c])
                            for ("T" == c && (p = mc(B),
                            w = 1.1 * p.size,
                            f[c] && (w += f[c]),
                            ra(p)); 0 < d[c].length; )
                                t += w,
                                F = d[c].shift(),
                                na(u, -t, F, v);
                        g[c]--;
                        y[v] = t
                    }
                }
                y.c > y.l && (y.l = y.c);
                y.r > y.l && (y.l = y.r);
                if (n >= m.length)
                    break;
                y.c = y.r = y.l
            }
            ja(y.l);
            ja(r.musicspace)
        } else {
            if (P.T && 0 <= r.writefields.indexOf("T"))
                for (c = 0; ; ) {
                    d = P.T.indexOf("\n", c);
                    if (0 > d) {
                        de(P.T.substring(c), 0 != c);
                        break
                    }
                    de(P.T.slice(c, d), 0 != c);
                    c = d + 1
                }
            q = 0;
            l.ckey.k_bagpipe && !r.infoline && 0 <= r.writefields.indexOf("R") && (m = P.R);
            m && (ra("composer"),
            na(0, -r.composerspace, m),
            q = r.composerspace);
            e = P.A;
            0 <= r.writefields.indexOf("C") && (f = P.C);
            0 <= r.writefields.indexOf("O") && (g = P.O);
            if (f || g || r.infoline) {
                ra("composer");
                ja(r.composerspace);
                0 > r.aligncomposer ? (y = 0,
                v = " ") : 0 == r.aligncomposer ? (y = .5 * B,
                v = "c") : (y = B,
                v = "r");
                n = q;
                if (f || g) {
                    0 <= r.aligncomposer && q != n && ja(q - n);
                    for (c = 0; ; ) {
                        ja(E.curfont.size);
                        d = f ? f.indexOf("\n", c) : -1;
                        if (0 > d) {
                            dg(y, 0, f ? f.substring(c) : null, g, v);
                            break
                        }
                        na(y, 0, f.slice(c, d), v);
                        q += E.curfont.size;
                        c = d + 1
                    }
                    n > q && ja(n - q)
                }
                ((m = m ? null : P.R) || e) && r.infoline && (ra("info"),
                ja(E.curfont.size + r.infospace),
                dg(B, 0, m, e, "r"),
                q += E.curfont.size + r.infospace)
            } else
                n = r.composerspace;
            P.P && 0 <= r.writefields.indexOf("P") && (ra("parts"),
            q = r.partsspace + E.curfont.size - q,
            0 < q && (n += q),
            .01 < n && ja(n),
            na(0, 0, P.P),
            n = 0);
            ja(n + r.musicspace)
        }
        ce = 0 <= r.writefields.indexOf("M") ? 3 : 2;
        E.nbar = r.measurefirst;
        l.state = 3;
        0 == x.length ? (Cd("1"),
        k.clef.istart = k.key.istart,
        k.clef.iend = k.key.iend,
        k["default"] = !0) : k || (k = x[0 > jb ? 0 : H.top_voice]);
        k.init || a || (re([]),
        Jd());
        for (a = 0; a < x.length; a++)
            c = x[a],
            c.ulen = za.ulen,
            c.ckey.k_bagpipe && !c.pos.stm && (c.pos = A(c.pos),
            c.pos.stm = h.SL_BELOW);
        if (0 > jb) {
            S = x.length - 1;
            for (a = 0; a <= S; a++)
                c = x[a],
                delete c["new"],
                c.st = c.cst = H.voices[a].st = H.voices[a].range = a,
                H.staves[a] = {
                    stafflines: c.stafflines || "|||||",
                    staffscale: 1
                };
            H.nstaff = S
        }
        c = k;
        k = x[H.top_voice];
        sa(b);
        k = c
    }
    function Xg(a, c) {
        var b, d, e, f, g;
        if (!k.ignore) {
            if (c) {
                if (b = k.sym_cont,
                !b) {
                    t(1, "+: symbol line without music");
                    return
                }
            } else if (k.sym_restart ? (k.sym_start = b = k.sym_restart,
            k.sym_restart = null) : b = k.sym_start,
            b || (b = k.sym),
            !b) {
                t(1, "s: without music");
                return
            }
            for (e = 0; ; ) {
                for (; " " == a[e] || "\t" == a[e]; )
                    e++;
                d = a[e];
                if (!d)
                    break;
                switch (d) {
                case "|":
                    for (; b && b.type != h.BAR; )
                        b = b.next;
                    if (!b) {
                        t(1, "Not enough measure bars for symbol line");
                        return
                    }
                    b = b.next;
                    e++;
                    continue;
                case "!":
                case '"':
                    f = ++e;
                    e = a.indexOf(d, f);
                    if (0 > e) {
                        t(1, "!" == d ? "No end of decoration" : "No end of guitar chord");
                        e = a.length;
                        continue
                    }
                    g = a.slice(f - 1, e + 1);
                    break;
                case "*":
                    break;
                default:
                    g = d.charCodeAt(0);
                    if (128 > g && (g = Wa[g],
                    1 < g.length && ("!" == g[0] || '"' == g[0]))) {
                        d = g[0];
                        break
                    }
                    t(1, O.bad_char, d)
                }
                for (; b && (b.type != h.NOTE || b.grace); )
                    b = b.next;
                if (!b) {
                    t(1, "Too many elements in symbol line");
                    return
                }
                switch (d) {
                case "!":
                    Xc([g.slice(1, -1)], b, b.prev);
                    break;
                case '"':
                    ib = b.a_gch,
                    $f(g),
                    ib && ba.gch_build(b)
                }
                b = b.next;
                e++
            }
            k.lyric_cont = b
        }
    }
    function Yg(a, c) {
        var b, d, e, f;
        if (!k.ignore) {
            k.pos.voc != h.SL_HIDDEN && (k.have_ly = !0);
            if (c) {
                if (b = k.lyric_cont,
                !b) {
                    t(1, "+: lyric without music");
                    return
                }
            } else if (ra("vocal"),
            k.lyric_restart ? (k.lyric_start = b = k.lyric_restart,
            k.lyric_restart = null,
            k.lyric_line = 0) : (k.lyric_line++,
            b = k.lyric_start),
            b || (b = k.sym),
            !b) {
                t(1, "w: without music");
                return
            }
            for (e = 0; ; ) {
                for (; " " == a[e] || "\t" == a[e]; )
                    e++;
                if (!a[e])
                    break;
                f = l.istart + e + 2;
                switch (a[e]) {
                case "|":
                    for (; b && b.type != h.BAR; )
                        b = b.next;
                    if (!b) {
                        t(1, "Not enough measure bars for lyric line");
                        return
                    }
                    b = b.next;
                    e++;
                    continue;
                case "-":
                    d = "-\n";
                    break;
                case "_":
                    d = "_\n";
                    break;
                case "*":
                    d = "";
                    break;
                default:
                    if ("\\" == a[e] && e == a.length - 1) {
                        k.lyric_cont = b;
                        return
                    }
                    for (d = ""; a[e]; ) {
                        switch (a[e]) {
                        case "_":
                        case "*":
                        case "|":
                            e--;
                        case " ":
                        case "\t":
                            break;
                        case "~":
                            d += "\u00a0";
                            e++;
                            continue;
                        case "-":
                            d += "\n";
                            break;
                        case "\\":
                            d += a[++e];
                            e++;
                            continue;
                        default:
                            d += a[e++];
                            continue
                        }
                        break
                    }
                }
                for (; b && (b.type != h.NOTE || b.grace); )
                    b = b.next;
                if (!b) {
                    t(1, "Too many words in lyric line");
                    return
                }
                d && b.pos.voc != h.SL_HIDDEN && (d.match(/^\$\d/) && ("0" == d[1] ? ra("vocal") : ra("u" + d[1]),
                d = d.slice(2)),
                d = {
                    t: d,
                    font: E.curfont,
                    wh: Pa(d),
                    istart: f,
                    iend: f + d.length
                },
                b.a_ly || (b.a_ly = []),
                b.a_ly[k.lyric_line] = d);
                b = b.next;
                e++
            }
            k.lyric_cont = b
        }
    }
    function Mf(a, c) {
        var b, d, e, f, g, m, k, n, l = a.a_ly;
        for (k = f = 0; k < l.length; k++)
            if (b = l[k])
                if (n = b.t,
                "-\n" == n || "_\n" == n)
                    b.shift = 0;
                else {
                    m = b.wh[0];
                    e = b.font.swfac;
                    g = m + 2 * bd(" ") * e;
                    a.type == h.GRACE ? m = a.wl : "0" <= n[0] && "9" >= n[0] && 2 < n.length || ":" == n[1] || "(" == n[0] || ")" == n[0] ? ("(" == n[0] ? d = bd("(") * e : (d = n.indexOf("\u00a0"),
                    ra(b.font),
                    d = 0 < d ? Pa(n.slice(0, d))[0] : .2 * m),
                    m = .4 * (m - d + 2 * bd(" ") * e),
                    20 < m && (m = 20),
                    m += d,
                    "0" <= b.t[0] && "9" >= b.t[0] && m > f && (f = m)) : (m = .4 * g,
                    20 < m && (m = 20));
                    b.shift = m;
                    c < m && (c = m);
                    g -= m;
                    m = 2 * bd(" ") * e;
                    for (b = a.next; b; b = b.next) {
                        switch (b.type) {
                        case h.NOTE:
                        case h.REST:
                            if (b.a_ly && b.a_ly[k])
                                if ("-\n" == b.a_ly[k].t || "_\n" == b.a_ly[k].t)
                                    g -= m;
                                else
                                    break;
                            else
                                g -= 9;
                            if (0 >= g)
                                break;
                            continue;
                        case h.CLEF:
                        case h.METER:
                        case h.KEY:
                            g -= 10;
                            continue;
                        default:
                            g -= 5
                        }
                        break
                    }
                    g > a.wr && (a.wr = g)
                }
        if (0 < f)
            for (k = 0; k < l.length; k++)
                (b = l[k]) && "0" <= b.t[0] && "9" >= b.t[0] && (b.shift = f);
        return c
    }
    function ug(a, c, b) {
        var d, e, f, g, m, k, n, l, p, v;
        a.hy_st & 1 << c && (n = !0,
        a.hy_st &= ~(1 << c));
        for (g = a.sym; g.type == h.CLEF || g.type == h.KEY || g.type == h.METER; g = g.next)
            ;
        e = g.prev ? g.prev.x : W.x;
        for (p = 0; g; g = g.next)
            if (k = g.a_ly ? g.a_ly[c] : null)
                if (k.font != E.curfont && (E.curfont = k.font),
                d = k.t,
                f = k.wh[0],
                v = k.shift,
                n && ("_\n" == d ? d = "-\n" : "-\n" != d && (ig(e, b, g.x - v - e),
                n = !1,
                e = g.x + g.wr)),
                l && "_\n" != d && (ge(e + 3, b, p - e + 3),
                l = !1,
                e = g.x + g.wr),
                "-\n" == d || "_\n" == d)
                    0 == p && e > g.x - 18 && (e = g.x - 18),
                    "-" == d[0] ? n = !0 : l = !0,
                    p = g.x - v;
                else {
                    p = g.x - v;
                    "\n" == d.slice(-1) && (d = d.slice(0, -1),
                    n = !0);
                    if (w.anno_start || w.anno_stop)
                        m = {
                            st: g.st,
                            istart: k.istart,
                            iend: k.iend,
                            x: p,
                            y: b,
                            ymn: b,
                            ymx: b + E.curfont.size,
                            wl: 0,
                            wr: f
                        },
                        rb(m, "lyrics");
                    na(p, b, d, null, null, k.wh);
                    yb(m, "lyrics");
                    e = p + f
                }
            else
                switch (g.type) {
                case h.REST:
                case h.MREST:
                    l && (ge(e + 3, b, p - e),
                    l = !1,
                    e = g.x + g.wr)
                }
        n && (p = Ba - 10,
        p < e + 10 && (p = e + 10),
        ig(e, b, p - e),
        r.hyphencont && (a.hy_st |= 1 << c));
        for (a.s_next; g; g = g.next)
            if (g.type == h.NOTE) {
                if (!g.a_ly)
                    break;
                (k = g.a_ly[c]) && "_\n" == k.t && (l = !0,
                p = Ba - 15,
                p < e + 12 && (p = e + 12));
                break
            }
        l && ge(e + 3, b, p - e + 3)
    }
    function vg(a, c, b, d, e) {
        var f = u[a.st].staffscale;
        ra("vocal");
        if (0 < e) {
            d > -r.vocalspace && (d = -r.vocalspace);
            d *= f;
            for (e = 0; e < c; e++)
                d -= 1.1 * b[e],
                ug(a, e, d);
            return (d - b[e - 1] / 6) / f
        }
        e = u[a.st].topbar + r.vocalspace;
        d < e && (d = e);
        d *= f;
        for (e = c; 0 <= --e; )
            ug(a, e, d),
            d += 1.1 * b[e];
        return d / f
    }
    function $f(a) {
        function c() {
            for (var a = ""; ; ) {
                b = d[m++];
                if (0 > "1234567890.-".indexOf(b))
                    return parseFloat(a);
                a += b
            }
        }
        var b, d, e, f, g, m, q, n, r = mc("annotation"), p = r.size;
        e = l.line;
        q = l.bol + e.index;
        if (1 < a.length)
            d = a.slice(1, -1),
            n = q + 1;
        else {
            for (d = ""; ; ) {
                b = e.next_char();
                if (!b) {
                    t(1, "No end of guitar chord");
                    return
                }
                if ('"' == b)
                    break;
                "\\" == b && (d += b,
                b = e.next_char());
                d += b
            }
            n = l.bol + e.index + 1
        }
        if (k.pos.gch != h.SL_HIDDEN)
            for (r.box && (p += 3),
            m = 0,
            a = "g"; ; ) {
                b = d[m];
                if (!b)
                    break;
                e = {
                    text: "",
                    istart: q,
                    iend: n,
                    font: r
                };
                switch (b) {
                case "@":
                    a = b;
                    m++;
                    f = c();
                    "," != b ? (t(1, "',' lacking in annotation '@x,y'"),
                    g = 0) : (g = c(),
                    " " != b && m--);
                    e.x = f;
                    e.y = g - p / 2;
                    break;
                case "^":
                case "_":
                case "<":
                case ">":
                    m++;
                    a = b;
                    break;
                default:
                    switch (a) {
                    case "g":
                        e.font = mc("gchord");
                        break;
                    case "@":
                        e.x = f,
                        g -= p,
                        e.y = g - p / 2
                    }
                }
                for (e.type = a; ; ) {
                    b = d[m];
                    if (!b)
                        break;
                    switch (b) {
                    case "\\":
                        b = d[++m];
                        if (!b || "n" == b)
                            break;
                        e.text += "\\";
                    default:
                        e.text += b;
                        m++;
                        continue;
                    case "&":
                        for (; ; ) {
                            e.text += b;
                            b = d[++m];
                            switch (b) {
                            default:
                                continue;
                            case ";":
                            case void 0:
                            case "\\":
                            }
                            break
                        }
                        if (";" == b) {
                            m++;
                            e.text += b;
                            continue
                        }
                    case ";":
                    }
                    m++;
                    break
                }
                ib || (ib = []);
                ib.push(e)
            }
    }
    function wg(a, c) {
        var b, d, e, f, g, m = a.split("/");
        for (b = 0; b < m.length; b++)
            if (a = m[b],
            d = a.search(/[ABCDEFG]/),
            !(0 > d)) {
                g = d + 1;
                for (f = 0; "#" == a[g]; )
                    f++,
                    g++;
                for (; "b" == a[g]; )
                    f--,
                    g++;
                e = "CDEFGAB".indexOf(a[d]);
                f = xg[e] + c + 7 * f;
                e = zc[(f + 112) % 7];
                f = (((f + 22) / 7 | 0) + 159) % 5;
                m[b] = a.slice(0, d) + "CDEFGAB"[e] + qh[f] + a.slice(g)
            }
        return m.join("/")
    }
    function rh(a) {
        var c, b, d = k.ckey.k_sf - k.okey.k_sf;
        for (b = 0; b < a.a_gch.length; b++)
            c = a.a_gch[b],
            "g" == c.type && (c.text = wg(c.text, d))
    }
    function Wg() {
        function a(a) {
            for (var b = 0; b < a.length; b++)
                a[b](ba)
        }
        var c = abc2svg.modules.hooks
          , b = abc2svg.modules.g_hooks;
        yg ? c.length && (a(c),
        b.push.apply(b, c),
        abc2svg.modules.hooks = []) : (c.length && (b.push.apply(b, c),
        abc2svg.modules.hooks = []),
        a(b),
        yg = !0)
    }
    var h = abc2svg.C, O = {
        bad_char: "Bad character '$1'",
        bad_val: "Bad value in $1",
        bar_grace: "Cannot have a bar in grace notes",
        ignored: "$1: inside tune - ignored",
        misplaced: "Misplaced '$1' in %%staves",
        must_note: "!$1! must be on a note",
        must_note_rest: "!$1! must be on a note or a rest",
        nonote_vo: "No note in voice overlay",
        not_ascii: "Not an ASCII character",
        not_enough_n: "Not enough notes/rests for %%repeat",
        not_enough_m: "Not enough measures for %%repeat",
        not_in_tune: "Cannot have '$1' inside a tune"
    }, ba = this, za = {
        meter: {
            type: h.METER,
            wmeasure: 1,
            a_meter: []
        }
    }, P = {}, Lb = {}, vd = new Int8Array(128), l = {
        ctx: {},
        prefix: "%",
        state: 0,
        ottava: [],
        line: new ea
    }, ng, vc = {}, qa, rd = {
        dot: "0 stc 5 1 1",
        tenuto: "0 emb 5 3 3",
        slide: "1 sld 3 7 0",
        arpeggio: "2 arp 12 10 0",
        roll: "3 roll 7 6 6",
        fermata: "3 hld 12 7 7",
        emphasis: "3 accent 7 4 4",
        lowermordent: "3 lmrd 10 5 5",
        coda: "3 coda 24 10 10",
        uppermordent: "3 umrd 10 5 5",
        segno: "3 sgno 22 8 8",
        trill: "3 trl 14 5 5",
        upbow: "3 upb 10 5 5",
        downbow: "3 dnb 9 5 5",
        gmark: "3 grm 6 5 5",
        wedge: "3 wedge 8 3 3",
        turnx: "3 turnx 10 0 5",
        breath: "3 brth 0 1 20",
        longphrase: "3 lphr 0 1 1",
        mediumphrase: "3 mphr 0 1 1",
        shortphrase: "3 sphr 0 1 1",
        invertedfermata: "3 hld 12 7 7",
        invertedturn: "3 turn 10 0 5",
        invertedturnx: "3 turnx 10 0 5",
        0: "3 fng 8 3 3 0",
        1: "3 fng 8 3 3 1",
        2: "3 fng 8 3 3 2",
        3: "3 fng 8 3 3 3",
        4: "3 fng 8 3 3 4",
        5: "3 fng 8 3 3 5",
        plus: "3 dplus 7 3 3",
        "+": "3 dplus 7 3 3",
        accent: "3 accent 7 4 4",
        ">": "3 accent 7 4 4",
        marcato: "3 marcato 9 3 3",
        "^": "3 marcato 9 3 3",
        mordent: "3 lmrd 10 5 5",
        open: "3 opend 10 3 3",
        snap: "3 snap 14 3 3",
        thumb: "3 thumb 14 3 3",
        dacapo: "3 dacs 16 20 20 Da Capo",
        dacoda: "3 dacs 16 20 20 Da Coda",
        "D.C.": "3 dcap 16 10 10",
        "D.S.": "3 dsgn 16 10 10",
        "D.C.alcoda": "3 dacs 16 38 38 D.C. al Coda",
        "D.S.alcoda": "3 dacs 16 38 38 D.S. al Coda",
        "D.C.alfine": "3 dacs 16 38 38 D.C. al Fine",
        "D.S.alfine": "3 dacs 16 38 38 D.S. al Fine",
        fine: "3 dacs 16 10 10 Fine",
        turn: "3 turn 10 0 5",
        "trill(": "3 ltr 8 0 0",
        "trill)": "3 ltr 8 0 0",
        f: "6 f 18 1 7",
        ff: "6 ff 18 2 10",
        fff: "6 fff 18 4 13",
        ffff: "6 ffff 18 6 16",
        mf: "6 mf 18 6 13",
        mp: "6 mp 18 6 16",
        p: "6 p 18 2 8",
        pp: "6 pp 18 5 14",
        ppp: "6 ppp 18 8 20",
        pppp: "6 pppp 18 10 25",
        pralltriller: "3 umrd 10 5 5",
        sfz: "6 sfz 18 4 10",
        ped: "4 ped 18 8 8",
        "ped-up": "4 pedoff 18 8 8",
        "ped(": "4 lped 20 1 1",
        "ped)": "4 lped 20 1 1",
        "crescendo(": "6 cresc 18 0 0",
        "crescendo)": "6 cresc 18 0 0",
        "<(": "6 cresc 18 0 0",
        "<)": "6 cresc 18 0 0",
        "diminuendo(": "6 dim 18 0 0",
        "diminuendo)": "6 dim 18 0 0",
        ">(": "6 dim 18 0 0",
        ">)": "6 dim 18 0 0",
        "-(": "8 gliss 0 0 0",
        "-)": "8 gliss 0 0 0",
        "~(": "8 glisq 0 0 0",
        "~)": "8 glisq 0 0 0",
        "8va(": "3 8va 10 0 0",
        "8va)": "3 8va 10 0 0",
        "8vb(": "4 8vb 10 0 0",
        "8vb)": "4 8vb 10 0 0",
        "15ma(": "3 15ma 10 0 0",
        "15ma)": "3 15ma 10 0 0",
        "15mb(": "4 15mb 10 0 0",
        "15mb)": "4 15mb 10 0 0",
        invisible: "32 0 0 0 0",
        beamon: "33 0 0 0 0",
        trem1: "34 0 0 0 0",
        trem2: "34 0 0 0 0",
        trem3: "34 0 0 0 0",
        trem4: "34 0 0 0 0",
        xstem: "35 0 0 0 0",
        beambr1: "36 0 0 0 0",
        beambr2: "36 0 0 0 0",
        rbstop: "37 0 0 0 0",
        "/": "38 0 0 6 6",
        "//": "38 0 0 6 6",
        "///": "38 0 0 6 6",
        "beam-accel": "39 0 0 0 0",
        "beam-rall": "39 0 0 0 0",
        stemless: "40 0 0 0 0",
        rbend: "41 0 0 0 0"
    }, Kg = [!0, !0, !0], sh = [!1, !1, !1, !0, !0, !0, !1, !1, !0], pd = [!1, !1, !1, !1, !1, !1, !0, !0], cf = [function(a) {
        var c, b, d = a.s, e = a.dd;
        e.str || (c = (b = d.multi ? 0 < d.multi : 0 > d.stem) ? d.ymx | 0 : d.ymn - e.h | 0,
        -6 < c && 24 > c && (b && (c += 3),
        c = 6 * ((c + 6) / 6 | 0) - 6),
        b ? d.ymx = c + e.h : d.ymn = c,
        a.y = c,
        d.type == h.NOTE && (a.x += d.notes[0 <= d.stem ? 0 : d.nhd].shhd),
        "d" == e.name[0] && -1 <= d.nflags && (b ? 0 < d.stem && (a.x += 3.5) : 0 > d.stem && (a.x -= 3.5)))
    }
    , function(a) {
        var c, b, d = a.s, e = d.notes[0].pit, f = 5;
        for (c = 0; c <= d.nhd; c++) {
            if (d.notes[c].acc)
                b = 4 + d.notes[c].shac;
            else
                switch (b = 5 - d.notes[c].shhd,
                d.head) {
                case h.SQUARE:
                    b += 3.5;
                    break;
                case h.OVALBARS:
                case h.OVAL:
                    b += 2
                }
            d.notes[c].pit <= e + 3 && b > f && (f = b)
        }
        a.x -= f;
        a.y = 3 * (e - 18)
    }
    , function(a) {
        var c, b, d = a.s, e = a.dd, f = 5;
        if (d.type == h.NOTE)
            for (c = 0; c <= d.nhd; c++) {
                if (d.notes[c].acc)
                    b = 5 + d.notes[c].shac;
                else
                    switch (b = 6 - d.notes[c].shhd,
                    d.head) {
                    case h.SQUARE:
                        b += 3.5;
                        break;
                    case h.OVALBARS:
                    case h.OVAL:
                        b += 2
                    }
                b > f && (f = b)
            }
        b = 3 * (d.notes[d.nhd].pit - d.notes[0].pit) + 4;
        c = e.h;
        b < c && (b = c);
        a.has_val = !0;
        a.val = b;
        a.x -= f;
        a.y = 3 * (d.notes[0].pit - 18) - 3
    }
    , Fe, Fe, Wc, function(a) {
        var c, b, d, e = a.s, f = a.dd, g;
        if (!a.ldst)
            if (a.start)
                Vc(a);
            else {
                a.val = f.wl + f.wr;
                if (d = La(e, e.pos.vol))
                    a.up = !0;
                b = e.x - f.wl;
                0 < a.ix && (g = qa[a.ix - 1],
                g.s == e && (a.up && !g.up || !a.up && g.up) && (c = g.dd,
                pd[c.func] && (c = g.x + g.val + 4,
                c > b && (b = c))));
                a.x = b;
                a.y = U(e.st, d, b, a.val);
                d || (a.y -= f.h)
            }
    }
    , Vc], kc = 2.3, Jc, th = [[16, 16, 14, 12, 10, 10], [14, 14, 10, 9, 9, 9]];
    Abc.prototype.draw_hl = function(a, c, b) {
        var d, e, f;
        e = [];
        var g = u[c.st];
        if (g.hll) {
            for (d = 0; d <= c.nhd; d++)
                g.hlmap[c.notes[d].pit - g.hll] || e.push(3 * (c.notes[d].pit - 18));
            if (f = e.length) {
                c = g.y;
                var m = g.stafflines
                  , h = 6 * (m.length - 1)
                  , k = g = g.botline
                  , l = h;
                for (d = 0; d < e.length; d++)
                    e[d] < k ? (k = 6 * ((e[d] + 51) / 6 | 0) - 48,
                    f--) : e[d] > l && (l = 6 * (e[d] / 6 | 0),
                    f--);
                for (; k < g; k += 6)
                    ca(a, c + k, b);
                for (; l > h; l -= 6)
                    ca(a, c + l, b);
                if (f) {
                    d = k;
                    for (e = l; d > g && "-" == m[d / 6]; )
                        d -= 6;
                    for (; e < h && "-" == m[e / 6]; )
                        e += 6;
                    for (; d < e; d += 6)
                        "-" == m[d / 6] && ca(a, c + d, b)
                }
            }
        }
    }
    ;
    var zg = new Int8Array([24, 9, 15, 21, 6, 12, 18])
      , Ag = new Int8Array([12, 18, 24, 9, 15, 21, 6])
      , Bg = new Int8Array([-9, 12, -9, -9, 12, -9])
      , Cg = new Int8Array([12, -9, 12, -9, 12, -9])
      , Dg = new Int8Array([9, -12, 9, -12, 9, -12])
      , Eg = new Int8Array([-12, 9, -12, 9, -12, 9]);
    Abc.prototype.draw_keysig = function(a, c) {
        if (!c.k_none) {
            var b = c.k_old_sf, d = c.st, e = u[d].y, f, g, h = c.k_y_clef;
            h & 1 && (h += 7);
            for (h /= 2; 0 > h; )
                h += 7;
            h %= 7;
            if (!c.k_a_acc) {
                if (r.cancelkey || 0 == c.k_sf)
                    if (0 == c.k_sf || 0 > b * c.k_sf) {
                        f = zg[h];
                        g = 9 < f ? Bg : Cg;
                        for (d = 0; d < b; d++)
                            ca(a, e + f, "acc3"),
                            f += g[d],
                            a += 5.5;
                        f = Ag[h];
                        g = 18 > f ? Dg : Eg;
                        for (d = 0; d > b; d--)
                            ca(a, e + f, "acc3"),
                            f += g[-d],
                            a += 5.5;
                        0 != c.k_sf && (a += 3)
                    }
                if (0 < c.k_sf) {
                    f = zg[h];
                    g = 9 < f ? Bg : Cg;
                    for (d = 0; d < c.k_sf; d++)
                        ca(a, e + f, "acc1"),
                        f += g[d],
                        a += 5.5;
                    if (r.cancelkey && d < b)
                        for (a += 2; d < b; d++)
                            ca(a, e + f, "acc3"),
                            f += g[d],
                            a += 5.5
                }
                if (0 > c.k_sf) {
                    f = Ag[h];
                    g = 18 > f ? Dg : Eg;
                    for (d = 0; d > c.k_sf; d--)
                        ca(a, e + f, "acc-1"),
                        f += g[-d],
                        a += 5.5;
                    if (r.cancelkey && d > b)
                        for (a += 2; d > b; d--)
                            ca(a, e + f, "acc3"),
                            f += g[-d],
                            a += 5.5
                }
            } else if (c.k_a_acc.length)
                for (var b = c.k_a_acc[0].acc, h = 100, k = {
                    st: d,
                    nhd: 0,
                    notes: [{}]
                }, d = 0; d < c.k_a_acc.length; d++)
                    g = c.k_a_acc[d],
                    f = 3 * (c.k_y_clef + g.pit - 18),
                    0 != d && (f > h + 18 || f < h - 18) ? a -= 5.5 : g.acc != b && (a += 3),
                    b = g.acc,
                    k.notes[0].pit = f / 3 + 18,
                    ba.draw_hl(a, k, "hl"),
                    h = f,
                    Zd(a, e + f, g.acc, g.micro_n, g.micro_d),
                    a += 5.5
        }
    }
    ;
    var uh = "r128 r64 r32 r16 r8 r4 r2 r1 r0 r00".split(" ")
      , Wb = 'url("data:application/octet-stream;base64,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LjAgOiBhYmMyc3ZnIDogOC0zLTIwMTkAAGEAYgBjADIAcwB2AGcAAGFiYzJzdmcAAFYAZQByAHMAaQBvAG4AIAAgAABWZXJzaW9uICAAAGEAYgBjADIAcwB2AGcAAGFiYzJzdmcAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACDAAAAAQACAQIAAwEDAQQBBQEGAQcBCAEJAQoBCwEMAQ0BDgEPARABEQESARMBFAEVARYBFwEYARkBGgEbARwBHQEeAR8BIAEhASIBIwEkASUBJgEnASgBKQEqASsBLAEtAS4BLwEwATEBMgEzATQBNQE2ATcBOAE5AToBOwE8AT0BPgE/AUABQQFCAUMBRAFFAUYBRwFIAUkBSgFLAUwBTQFOAU8BUAFRAVIBUwFUAVUBVgFXAVgBWQFaAVsBXAFdAV4BXwFgAWEBYgFjAWQBZQFmAWcBaAFpAWoBawFsAW0BbgFvAXABcQFyAXMBdAF1AXYBdwF4AXkBegF7AXwBfQF+AX8BgAYubm9kZWYHdW5pRTAwMAd1bmlFMDIyB3VuaUUwMjMHdW5pRTAyNAd1bmlFMDMwB3VuaUUwMzgHdW5pRTAzOQd1bmlFMDQzB3VuaUUwNDUHdW5pRTA0Ngd1bmlFMDQ3B3VuaUUwNDgHdW5pRTA1MAd1bmlFMDVDB3VuaUUwNjIHdW5pRTA2OQd1bmlFMDdBB3VuaUUwN0IHdW5pRTA3Qwd1bmlFMDdEB3VuaUUwODAHdW5pRTA4MQd1bmlFMDgyB3VuaUUwODMHdW5pRTA4NAd1bmlFMDg1B3VuaUUwODYHdW5pRTA4Nwd1bmlFMDg4B3VuaUUwODkHdW5pRTA4QQd1bmlFMDhCB3VuaUUwOEMHdW5pRTA5NAd1bmlFMDk1B3VuaUUwQTAHdW5pRTBBMQd1bmlFMEEyB3VuaUUwQTMHdW5pRTBBNAd1bmlFMEE5B3VuaUUwQjMHdW5pRTEwMQd1bmlFMUI5B3VuaUUxQkIHdW5pRTFFNwd1bmlFMjQwB3VuaUUyNDEHdW5pRTI0Mgd1bmlFMjQzB3VuaUUyNDQHdW5pRTI0NQd1bmlFMjQ2B3VuaUUyNDcHdW5pRTI0OAd1bmlFMjQ5B3VuaUUyNjAHdW5pRTI2MQd1bmlFMjYyB3VuaUUyNjMHdW5pRTI2NAd1bmlFMjgwB3VuaUUyODEHdW5pRTI4Mgd1bmlFMjgzB3VuaUU0QTAHdW5pRTRBMgd1bmlFNEE0B3VuaUU0QTgHdW5pRTRBQwd1bmlFNEMwB3VuaUU0Q0UHdW5pRTRFMQd1bmlFNEUyB3VuaUU0RTMHdW5pRTRFNAd1bmlFNEU1B3VuaUU0RTYHdW5pRTRFNwd1bmlFNEU4B3VuaUU0RTkHdW5pRTRFQQd1bmlFNEVFB3VuaUU1MDAHdW5pRTUwMQd1bmlFNTIwB3VuaUU1MjEHdW5pRTUyMgd1bmlFNTI0B3VuaUU1MjUHdW5pRTUyOQd1bmlFNTJBB3VuaUU1MkIHdW5pRTUyQwd1bmlFNTJEB3VuaUU1MkYHdW5pRTUzMAd1bmlFNTMxB3VuaUU1MzkHdW5pRTU2Ngd1bmlFNTY3B3VuaUU1NjkHdW5pRTU2Qwd1bmlFNTZEB3VuaUU1ODIHdW5pRTVEMAd1bmlFNUUyB3VuaUU2MTAHdW5pRTYxMgd1bmlFNjE0B3VuaUU2MTgHdW5pRTYyNAd1bmlFNjMwB3VuaUU2NTAHdW5pRTY1NQd1bmlFOTEwB3VuaUU5MTEHdW5pRTkxMgd1bmlFOTE0B3VuaUU5MTUHdW5pRTkxOAd1bmlFOTIwB3VuaUU5MjUHdW5pRTk1RAd1bmlFQTAyB3VuaUVBQTQAAAAAAf//AAIAAQAAAAAAAAAMABQABAAAAAIAAAABAAAAAQAAAAAAAQAAAADYcJpYAAAAANGXIhcAAAAA2CMtUg==") format("truetype")'
      , Zc = []
      , Cf = {
        serif: 1,
        serifBold: 1,
        "sans-serif": 1,
        "sans-serifBold": 1,
        Palatino: 1.1,
        monospace: 1.35
    }
      , Fg = {}
      , r = {
        annotationfont: {
            name: "sans-serif",
            size: 12
        },
        aligncomposer: 1,
        breaklimit: .7,
        breakoneoln: !0,
        cancelkey: !0,
        composerfont: {
            name: "serifItalic",
            size: 14
        },
        composerspace: 6,
        dblrepbar: ":][:",
        decoerr: !0,
        dynalign: !0,
        footerfont: {
            name: "serif",
            size: 16
        },
        fullsvg: "",
        gchordfont: {
            name: "sans-serif",
            size: 12
        },
        gracespace: new Float32Array([4, 8, 11]),
        graceslurs: !0,
        headerfont: {
            name: "serif",
            size: 16
        },
        historyfont: {
            name: "serif",
            size: 16
        },
        hyphencont: !0,
        indent: 0,
        infofont: {
            name: "serifItalic",
            size: 14
        },
        infoname: 'R "Rhythm: "\nB "Book: "\nS "Source: "\nD "Discography: "\nN "Notes: "\nZ "Transcription: "\nH "History: "',
        infospace: 0,
        keywarn: !0,
        leftmargin: 1.4 * 37.8,
        lineskipfac: 1.1,
        linewarn: !0,
        maxshrink: 1,
        maxstaffsep: 2E3,
        maxsysstaffsep: 2E3,
        measurefirst: 1,
        measurefont: {
            name: "serifItalic",
            size: 10
        },
        measurenb: -1,
        musicspace: 6,
        partsfont: {
            name: "serif",
            size: 15
        },
        parskipfac: .4,
        partsspace: 8,
        pagewidth: 793.8,
        printmargin: 0,
        rightmargin: 1.4 * 37.8,
        rbdbstop: !0,
        rbmax: 4,
        rbmin: 2,
        repeatfont: {
            name: "serif",
            size: 13
        },
        scale: 1,
        slurheight: 1,
        staffsep: 46,
        stemheight: 21,
        stretchlast: .25,
        stretchstaff: !0,
        subtitlefont: {
            name: "serif",
            size: 16
        },
        subtitlespace: 3,
        sysstaffsep: 34,
        tempofont: {
            name: "serifBold",
            size: 12
        },
        textfont: {
            name: "serif",
            size: 16
        },
        textspace: 14,
        titlefont: {
            name: "serif",
            size: 20
        },
        titlespace: 6,
        titletrim: !0,
        topspace: 22,
        tuplets: [0, 0, 0, 0],
        vocalfont: {
            name: "serifBold",
            size: 13
        },
        vocalspace: 10,
        voicefont: {
            name: "serifBold",
            size: 13
        },
        writefields: "CMOPQsTWw",
        wordsfont: {
            name: "serif",
            size: 16
        },
        wordsspace: 5
    }
      , Gg = {
        align: "j",
        center: "c",
        fill: "f",
        justify: "j",
        ragged: "f",
        right: "r",
        skip: "s"
    }
      , ie = {
        above: h.SL_ABOVE,
        auto: 0,
        below: h.SL_BELOW,
        down: h.SL_BELOW,
        hidden: h.SL_HIDDEN,
        opposite: h.SL_HIDDEN,
        under: h.SL_BELOW,
        up: h.SL_ABOVE
    };
    Abc.prototype.style_font = Kc;
    var Ya = {}
      , Tg = {
        "=D": "\u0110",
        "=H": "\u0126",
        "=T": "\u0166",
        "=d": "\u0111",
        "=h": "\u0127",
        "=t": "\u0167",
        "/O": "\u00d8",
        "/o": "\u00f8",
        "/L": "\u0141",
        "/l": "\u0142",
        vL: "\u013d",
        vl: "\u013e",
        vd: "\u010f",
        ".i": "\u0131",
        AA: "\u00c5",
        aa: "\u00e5",
        AE: "\u00c6",
        ae: "\u00e6",
        DH: "\u00d0",
        dh: "\u00f0",
        OE: "\u0152",
        oe: "\u0153",
        ss: "\u00df",
        TH: "\u00de",
        th: "\u00fe"
    }
      , Sg = {
        1: "\u266f",
        2: "\u266d",
        3: "\u266e",
        4: "&#x1d12a;",
        5: "&#x1d12b;"
    }
      , nc = 0;
    Abc.prototype.tosvg = $c;
    var E, u, S, Sb, Ba, ce, te, mb = new Float32Array([8, 10, 14, 18, 23, 30, 39, 50, 65, 85]), wd, Hf = new Float32Array([10, 10, 11, 13, 13]), Zg = new Float32Array([4.5, 5, 6, 7, 8]), Ke = new Float32Array([3.5, 3.7, 5, 6, 7]), Kd = {
        t: -4,
        c: 0,
        b: 4,
        p: -6
    }, Hg = [[18, 18], [12, 18], [12, 12], [0, 12], [6, 8], [10, 10], [6, 4], [10, 0], [10, 4], [10, 10]], Le = [], ib, Aa, Qa, Ab = {}, ih = new Int8Array([0, 1, 3, 2, 3, 0, 2, 0, 3, 0]), cd = "CDEFGABcdefgab", gh = new Int8Array([0, 2, 4, 5, 7, 9, 11]), Ed = /(\d*)(\/*)(\d*)/g, xg = new Int8Array([0, 2, 4, -1, 1, 3, 5]), zc = new Int8Array([0, 4, 1, 5, 2, 6, 3]), vh = new Int8Array([-2, -1, 3, 1, 2]), J = ["0"], Wa = [J, J, J, J, J, J, J, J, J, " ", "\n", J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, " ", "!", '"', "i", "\n", J, "&", J, "(", ")", "i", J, J, "-", "!dot!", J, J, J, J, J, J, J, J, J, J, J, "|", "i", "<", "n", "<", "i", "i", "n", "n", "n", "n", "n", "n", "n", "!fermata!", "d", "d", "d", "!emphasis!", "!lowermordent!", "d", "!coda!", "!uppermordent!", "d", "d", "!segno!", "!trill!", "d", "d", "d", "n", "d", "n", "[", "\\", "|", "n", "n", "i", "n", "n", "n", "n", "n", "n", "n", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "d", "!upbow!", "!downbow!", "d", "n", "n", "n", "{", "|", "}", "!gmark!", J], Zf = {
        "8va(": 1,
        "8va)": 0,
        "15ma(": 2,
        "15ma)": 0,
        "8vb(": -1,
        "8vb)": 0,
        "15mb(": -2,
        "15mb)": 0
    }, bg = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .25, .333, .408, .5, .5, .833, .778, .333, .333, .333, .5, .564, .25, .564, .25, .278, .5, .5, .5, .5, .5, .5, .5, .5, .5, .5, .278, .278, .564, .564, .564, .444, .921, .722, .667, .667, .722, .611, .556, .722, .722, .333, .389, .722, .611, .889, .722, .722, .556, .722, .667, .556, .611, .722, .722, .944, .722, .722, .611, .333, .278, .333, .469, .5, .333, .444, .5, .444, .5, .444, .333, .5, .5, .278, .278, .5, .278, .778, .5, .5, .5, .5, .333, .389, .278, .5, .5, .722, .5, .5, .444, .48, .2, .48, .541, .5]), jh = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .278, .278, .355, .556, .556, .889, .667, .191, .333, .333, .389, .584, .278, .333, .278, .278, .556, .556, .556, .556, .556, .556, .556, .556, .556, .556, .278, .278, .584, .584, .584, .556, 1.015, .667, .667, .722, .722, .667, .611, .778, .722, .278, .5, .667, .556, .833, .722, .778, .667, .778, .722, .667, .611, .722, .667, .944, .667, .667, .611, .278, .278, .278, .469, .556, .333, .556, .556, .5, .556, .556, .278, .556, .556, .222, .222, .5, .222, .833, .556, .556, .556, .556, .333, .5, .278, .556, .5, .722, .5, .5, .5, .334, .26, .334, .584, .512]), ag = bg, Pa = "undefined" != typeof document ? function(a) {
        a.style.position = "absolute";
        a.style.top = "-1000px";
        a.style.padding = "0";
        document.body.appendChild(a);
        return function(c) {
            var b, d = E.curfont, e = d.size, f = 0, g = 0, h = 0;
            a.style.font = Kc(d).slice(5);
            for (c = c.replace(/<|>|&[^&]*?;|&|  /g, function(a) {
                switch (a) {
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case "&":
                    return "&amp;";
                case "  ":
                    return " \u00a0"
                }
                return a
            }); ; ) {
                h = c.indexOf("$", h);
                if (0 > h)
                    break;
                b = c[h + 1];
                if ("0" == b)
                    d = E.deffont;
                else if ("1" <= b && "9" >= b)
                    d = mc("u" + b);
                else {
                    h++;
                    continue
                }
                a.innerHTML = c.slice(g, h);
                f += a.clientWidth;
                d.size > e && (e = d.size);
                a.style.font = Kc(d).slice(5);
                g = h += 2
            }
            a.innerHTML = c.slice(g);
            f += a.clientWidth;
            E.curfont = d;
            return [f, e]
        }
    }(document.createElement("div")) : function(a) {
        var c = E.curfont, b = c.swfac, d = c.size, e = 0, f, g, h, k = a.length;
        for (f = 0; f < k; f++) {
            h = a[f];
            switch (h) {
            case "$":
                h = a[f + 1];
                if ("0" == h)
                    c = E.deffont;
                else if ("1" <= h && "9" >= h)
                    c = mc("u" + h);
                else {
                    h = "$";
                    break
                }
                f++;
                b = c.swfac;
                c.size > d && (d = c.size);
                continue;
            case "&":
                g = a.indexOf(";", f),
                0 < g && 10 > g - f && (f = g,
                h = "a")
            }
            e += bd(h) * b
        }
        E.curfont = c;
        return [e, d]
    }
    , ph = {
        A: "info",
        C: "composer",
        O: "composer",
        P: "parts",
        Q: "tempo",
        R: "info",
        T: "title",
        X: "title"
    }, z = "", oc = "\ntext, tspan{fill:currentColor}\n.stroke{stroke:currentColor;fill:none}\n.bW{stroke:currentColor;fill:none;stroke-width:1}\n.bthW{stroke:currentColor;fill:none;stroke-width:3}\n.slW{stroke:currentColor;fill:none;stroke-width:.7}\n.slthW{stroke:currentColor;fill:none;stroke-width:1.5}\n.sW{stroke:currentColor;fill:none;stroke-width:.7}", wc = "", jc = r.leftmargin / r.scale, ia = 0, ga = {
        width: r.pagewidth,
        lm: r.leftmargin,
        rm: r.rightmargin
    }, ee = {}, fe = "", se = "", C = {
        scale: 1,
        dy: 0,
        st: -1,
        v: -1,
        g: 0
    }, hb = {}, Yd = {
        "mtr ": {
            x: 0,
            y: 0,
            c: " "
        },
        brace: {
            x: 0,
            y: 0,
            c: "\ue000"
        },
        hl: {
            x: -4,
            y: 0,
            c: "\ue022"
        },
        hl1: {
            x: -6,
            y: 0,
            c: "\ue023"
        },
        ghl: {
            x: -4,
            y: 0,
            c: "\ue024"
        },
        lphr: {
            x: 0,
            y: 24,
            c: "\ue030"
        },
        mphr: {
            x: 0,
            y: 24,
            c: "\ue038"
        },
        sphr: {
            x: 0,
            y: 27,
            c: "\ue039"
        },
        rdots: {
            x: -1,
            y: 0,
            c: "\ue043"
        },
        dsgn: {
            x: -4,
            y: -4,
            c: "\ue045"
        },
        dcap: {
            x: -4,
            y: -4,
            c: "\ue046"
        },
        sgno: {
            x: -6,
            y: 0,
            c: "\ue047"
        },
        coda: {
            x: -12,
            y: -6,
            c: "\ue048"
        },
        tclef: {
            x: -8,
            y: 0,
            c: "\ue050"
        },
        cclef: {
            x: -8,
            y: 0,
            c: "\ue05c"
        },
        bclef: {
            x: -8,
            y: 0,
            c: "\ue062"
        },
        pclef: {
            x: -6,
            y: 0,
            c: "\ue069"
        },
        spclef: {
            x: -6,
            y: 0,
            c: "\ue069"
        },
        stclef: {
            x: -8,
            y: 0,
            c: "\ue07a"
        },
        scclef: {
            x: -8,
            y: 0,
            c: "\ue07b"
        },
        sbclef: {
            x: -7,
            y: 0,
            c: "\ue07c"
        },
        oct: {
            x: 0,
            y: 2,
            c: "\ue07d"
        },
        mtr0: {
            x: 0,
            y: 0,
            c: "\ue080"
        },
        mtr1: {
            x: 0,
            y: 0,
            c: "\ue081"
        },
        mtr2: {
            x: 0,
            y: 0,
            c: "\ue082"
        },
        mtr3: {
            x: 0,
            y: 0,
            c: "\ue083"
        },
        mtr4: {
            x: 0,
            y: 0,
            c: "\ue084"
        },
        mtr5: {
            x: 0,
            y: 0,
            c: "\ue085"
        },
        mtr6: {
            x: 0,
            y: 0,
            c: "\ue086"
        },
        mtr7: {
            x: 0,
            y: 0,
            c: "\ue087"
        },
        mtr8: {
            x: 0,
            y: 0,
            c: "\ue088"
        },
        mtr9: {
            x: 0,
            y: 0,
            c: "\ue089"
        },
        mtrC: {
            x: 0,
            y: 0,
            c: "\ue08a"
        },
        "mtr+": {
            x: 0,
            y: 0,
            c: "\ue08c"
        },
        "mtr(": {
            x: 0,
            y: 0,
            c: "\ue094"
        },
        "mtr)": {
            x: 0,
            y: 0,
            c: "\ue095"
        },
        HDD: {
            x: -7,
            y: 0,
            c: "\ue0a0"
        },
        breve: {
            x: -7,
            y: 0,
            c: "\ue0a1"
        },
        HD: {
            x: -5.2,
            y: 0,
            c: "\ue0a2"
        },
        Hd: {
            x: -3.8,
            y: 0,
            c: "\ue0a3"
        },
        hd: {
            x: -3.7,
            y: 0,
            c: "\ue0a4"
        },
        ghd: {
            x: 2,
            y: 0,
            c: "\ue0a4",
            sc: .66
        },
        pshhd: {
            x: -3.7,
            y: 0,
            c: "\ue0a9"
        },
        pfthd: {
            x: -3.7,
            y: 0,
            c: "\ue0b3"
        },
        x: {
            x: -3.7,
            y: 0,
            c: "\ue0a9"
        },
        "circle-x": {
            x: -3.7,
            y: 0,
            c: "\ue0b3"
        },
        srep: {
            x: -5,
            y: 0,
            c: "\ue101"
        },
        diamond: {
            x: -4,
            y: 0,
            c: "\ue1b9"
        },
        triangle: {
            x: -4,
            y: 0,
            c: "\ue1bb"
        },
        dot: {
            x: -2,
            y: 0,
            c: "\ue1e7"
        },
        flu1: {
            x: -.3,
            y: 0,
            c: "\ue240"
        },
        fld1: {
            x: -.3,
            y: 0,
            c: "\ue241"
        },
        flu2: {
            x: -.3,
            y: 0,
            c: "\ue242"
        },
        fld2: {
            x: -.3,
            y: 0,
            c: "\ue243"
        },
        flu3: {
            x: -.3,
            y: 3.5,
            c: "\ue244"
        },
        fld3: {
            x: -.3,
            y: -4,
            c: "\ue245"
        },
        flu4: {
            x: -.3,
            y: 8,
            c: "\ue246"
        },
        fld4: {
            x: -.3,
            y: -9,
            c: "\ue247"
        },
        flu5: {
            x: -.3,
            y: 12.5,
            c: "\ue248"
        },
        fld5: {
            x: -.3,
            y: -14,
            c: "\ue249"
        },
        "acc-1": {
            x: -1,
            y: 0,
            c: "\ue260"
        },
        acc3: {
            x: -1,
            y: 0,
            c: "\ue261"
        },
        acc1: {
            x: -2,
            y: 0,
            c: "\ue262"
        },
        acc2: {
            x: -3,
            y: 0,
            c: "\ue263"
        },
        "acc-2": {
            x: -3,
            y: 0,
            c: "\ue264"
        },
        "acc-1_1_4": {
            x: -2,
            y: 0,
            c: "\ue280"
        },
        "acc-1_3_4": {
            x: -3,
            y: 0,
            c: "\ue281"
        },
        acc1_1_4: {
            x: -1,
            y: 0,
            c: "\ue282"
        },
        acc1_3_4: {
            x: -3,
            y: 0,
            c: "\ue283"
        },
        accent: {
            x: -3,
            y: 0,
            c: "\ue4a0"
        },
        stc: {
            x: -1,
            y: -2,
            c: "\ue4a2"
        },
        emb: {
            x: -4,
            y: -2,
            c: "\ue4a4"
        },
        wedge: {
            x: -1,
            y: 0,
            c: "\ue4a8"
        },
        marcato: {
            x: -3,
            y: 0,
            c: "\ue4ac"
        },
        hld: {
            x: -7,
            y: 0,
            c: "\ue4c0"
        },
        brth: {
            x: 0,
            y: 0,
            c: "\ue4ce"
        },
        r00: {
            x: -1.5,
            y: 0,
            c: "\ue4e1"
        },
        r0: {
            x: -1.5,
            y: 0,
            c: "\ue4e2"
        },
        r1: {
            x: -3.5,
            y: -6,
            c: "\ue4e3"
        },
        r2: {
            x: -3.2,
            y: 0,
            c: "\ue4e4"
        },
        r4: {
            x: -3,
            y: 0,
            c: "\ue4e5"
        },
        r8: {
            x: -3,
            y: 0,
            c: "\ue4e6"
        },
        r16: {
            x: -4,
            y: 0,
            c: "\ue4e7"
        },
        r32: {
            x: -4,
            y: 0,
            c: "\ue4e8"
        },
        r64: {
            x: -4,
            y: 0,
            c: "\ue4e9"
        },
        r128: {
            x: -4,
            y: 0,
            c: "\ue4ea"
        },
        mrest: {
            x: -10,
            y: 0,
            c: "\ue4ee"
        },
        mrep: {
            x: -6,
            y: 0,
            c: "\ue500"
        },
        mrep2: {
            x: -9,
            y: 0,
            c: "\ue501"
        },
        p: {
            x: -4,
            y: -6,
            c: "\ue520"
        },
        f: {
            x: -4,
            y: -6,
            c: "\ue522"
        },
        pppp: {
            x: -4,
            y: -6,
            c: "\ue529"
        },
        ppp: {
            x: -4,
            y: -6,
            c: "\ue52a"
        },
        pp: {
            x: -4,
            y: -6,
            c: "\ue52b"
        },
        mp: {
            x: -4,
            y: -6,
            c: "\ue52c"
        },
        mf: {
            x: -4,
            y: -6,
            c: "\ue52d"
        },
        ff: {
            x: -4,
            y: -6,
            c: "\ue52f"
        },
        fff: {
            x: -4,
            y: -6,
            c: "\ue530"
        },
        ffff: {
            x: -4,
            y: -6,
            c: "\ue531"
        },
        sfz: {
            x: -4,
            y: -6,
            c: "\ue539"
        },
        trl: {
            x: -4,
            y: -4,
            c: "\ue566"
        },
        turn: {
            x: -5,
            y: -4,
            c: "\ue567"
        },
        turnx: {
            x: -5,
            y: -4,
            c: "\ue569"
        },
        umrd: {
            x: -7,
            y: -2,
            c: "\ue56c"
        },
        lmrd: {
            x: -7,
            y: -2,
            c: "\ue56d"
        },
        dplus: {
            x: -4,
            y: 10,
            c: "\ue582"
        },
        sld: {
            x: -8,
            y: 12,
            c: "\ue5d0"
        },
        grm: {
            x: -2,
            y: 0,
            c: "\ue5e2"
        },
        dnb: {
            x: -4,
            y: 0,
            c: "\ue610"
        },
        upb: {
            x: -3,
            y: 0,
            c: "\ue612"
        },
        opend: {
            x: -2,
            y: 0,
            c: "\ue614"
        },
        roll: {
            x: 0,
            y: 0,
            c: "\ue618"
        },
        thumb: {
            x: 0,
            y: 0,
            c: "\ue624"
        },
        snap: {
            x: -2,
            y: 0,
            c: "\ue630"
        },
        ped: {
            x: -10,
            y: 0,
            c: "\ue650"
        },
        pedoff: {
            x: -5,
            y: 0,
            c: "\ue655"
        },
        mtro: {
            x: 0,
            y: 0,
            c: "\ue911"
        },
        mtrc: {
            x: 0,
            y: 0,
            c: "\ue915"
        },
        "mtr.": {
            x: 0,
            y: 0,
            c: "\ue920"
        },
        "mtr|": {
            x: 0,
            y: 0,
            c: "\ue925"
        },
        longa: {
            x: -3.7,
            y: 0,
            c: "\ue95d"
        },
        custos: {
            x: -4,
            y: 3,
            c: "\uea02"
        },
        ltr: {
            x: 2,
            y: 6,
            c: "\ueaa4"
        }
    }, Hb = {}, gg = "bar clef custos  grace key meter Zrest note part rest yspace staves Break tempo  block remark".split(" "), rb = w.anno_start ? kh : hg, yb = w.anno_stop ? lh : hg;
    Abc.prototype.out_svg = function(a) {
        z += a
    }
    ;
    Abc.prototype.sx = Hd;
    Abc.prototype.sy = Id;
    Abc.prototype.sh = function(a) {
        return 0 > C.st ? a / C.scale : a
    }
    ;
    Abc.prototype.ax = function(a) {
        return a + jc
    }
    ;
    Abc.prototype.ay = function(a) {
        return 0 > C.st ? ia - a : ia + (C.dy - a) * C.scale - C.dy
    }
    ;
    Abc.prototype.ah = function(a) {
        return 0 > C.st ? a : a * C.scale
    }
    ;
    Abc.prototype.out_sxsy = qb;
    Abc.prototype.xypath = Xd;
    var mh = {
        crdc: {
            dx: 0,
            dy: 5,
            style: "font:italic 14px serif"
        },
        dacs: {
            dx: 0,
            dy: 3,
            style: "font:16px serif",
            anchor: ' text-anchor="middle"'
        },
        fng: {
            dx: 0,
            dy: 1,
            style: "font-family:Bookman; font-size:8px",
            anchor: ' text-anchor="middle"'
        },
        pf: {
            dx: 0,
            dy: 5,
            style: "font:italic bold 16px serif"
        },
        "@": {
            dx: 0,
            dy: 5,
            style: "font: 12px sans-serif"
        }
    }
      , mg = {
        arp: kg,
        cresc: function(a, c, b, d) {
            a += b;
            b = -b;
            X('<path class="stroke"\n\td="mX YlA ', a, c + 5, b);
            z = d.nost ? z + ("-2.2m0 -3.6l" + (-b).toFixed(1) + ' -2.2"/>\n') : z + ("-4l" + (-b).toFixed(1) + ' -4"/>\n')
        },
        dim: function(a, c, b, d) {
            X('<path class="stroke"\n\td="mX YlA ', a, c + 5, b);
            z = d.noen ? z + ("-2.2m0 -3.6l" + (-b).toFixed(1) + ' -2.2"/>\n') : z + ("-4l" + (-b).toFixed(1) + ' -4"/>\n')
        },
        ltr: lg,
        lped: function(a, c, b, d) {
            c += 4;
            d.nost || ca(a, c, "ped");
            d.noen || ca(a + b, c, "pedoff")
        },
        "8va": function(a, c, b, d) {
            d.nost ? b -= 5 : (X('<text x="X" y="Y" style="font:italic bold 12px serif">8<tspan dy="-4" style="font-size:10px">va</tspan></text>\n', a - 8, c),
            a += 12,
            b -= 12);
            c += 6;
            X('<path class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n', a, c, b);
            d.noen || X('<path class="stroke" d="mX Yv6"/>\n', a + b, c)
        },
        "8vb": function(a, c, b, d) {
            d.nost ? b -= 5 : (X('<text x="X" y="Y" style="font:italic bold 12px serif">8<tspan dy="-4" style="font-size:10px">vb</tspan></text>\n', a - 8, c),
            a += 4,
            b -= 4);
            X('<path class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n', a, c, b);
            d.noen || X('<path class="stroke" d="mX Yv-6"/>\n', a + b, c)
        },
        "15ma": function(a, c, b, d) {
            d.nost ? b -= 5 : (X('<text x="X" y="Y" style="font:italic bold 12px serif">15<tspan dy="-4" style="font-size:10px">ma</tspan></text>\n', a - 10, c),
            a += 20,
            b -= 20);
            c += 6;
            X('<path class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n', a, c, b);
            d.noen || X('<path class="stroke" d="mX Yv6"/>\n', a + b, c)
        },
        "15mb": function(a, c, b, d) {
            d.nost ? b -= 5 : (X('<text x="X" y="Y" style="font:italic bold 12px serif">15<tspan dy="-4" style="font-size:10px">mb</tspan></text>\n', a - 10, c),
            a += 7,
            b -= 7);
            X('<path class="stroke" stroke-dasharray="6,6" d="mX YhF"/>\n', a, c, b);
            d.noen || X('<path class="stroke" d="mX Yv-6"/>\n', a + b, c)
        }
    }
      , Ig = {
        glisq: function(a, c, b) {
            b = b.start;
            var d = b.x
              , e = b.y + u[b.st].y;
            c = Math.atan2(e - c, a - d);
            a = (a - d) / Math.cos(c);
            $d(d, e, c / Math.PI * 180);
            d = b.s.dots ? 13 + b.s.xmx : 8;
            a = (a - d - 6) / 6 | 0;
            for (1 > a && (a = 1); 0 <= --a; )
                ca(d, 0, "ltr"),
                d += 6;
            ae()
        },
        gliss: function(a, c, b) {
            b = b.start;
            var d = b.x
              , e = b.y + u[b.st].y;
            c = -Math.atan2(c - e, a - d);
            a = (a - d) / Math.cos(c);
            $d(d, e, c / Math.PI * 180);
            d = b.s.dots ? 13 + b.s.xmx : 8;
            a -= d + 8;
            Xd(d, 0);
            z += "h" + a.toFixed(1) + '" stroke-width="1"/>\n';
            ae()
        }
    };
    Abc.prototype.blk_out = zb;
    Abc.prototype.blk_flush = Lc;
    var H, F, x, k, jb, ka, W, gb = new Uint8Array([2, 1, 8, 0, 3, 5, 6, 9, 9, 0, 9, 3, 0, 7, 0, 0, 0, 0]), qh = ["bb", "b", "", "#", "##"];
    Ef();
    Abc.prototype.add_style = function(a) {
        oc += a
    }
    ;
    Abc.prototype.calculate_beam = function(a, c) {
        var b, d, e, f, g, m, k, n, l, p, v, t, x, w, y;
        c.beam_st || (d = b = vf(c),
        g = c,
        d.next = g,
        d.prev = g.prev,
        d.prev ? d.prev.next = d : d.p_v.sym = d,
        g.prev = d,
        Mb(b, c),
        b.x -= 12,
        b.x > c.prev.x + 12 && (b.x = c.prev.x + 12),
        b.beam_st = !0,
        delete b.beam_end,
        b.tmp = !0,
        delete b.slur_start,
        delete b.slur_end,
        c = b);
        f = g = 0;
        k = n = !1;
        m = c.st;
        e = c.v;
        t = c.grace ? kc : 3.5;
        for (d = c; d.type != h.NOTE || (d.nflags > g && (g = d.nflags),
        f++,
        d.st != m && (k = !0),
        d.stem != c.stem && (n = !0),
        l || d.invis || d.stemless && !d.trem2 || (l = !0),
        !d.beam_end); d = d.next)
            if (!d.next) {
                for (; d.type != h.NOTE; d = d.prev)
                    ;
                b = vf(d);
                b.next = d.next;
                b.next && (b.next.prev = b);
                d.next = b;
                b.prev = d;
                b.ts_next = d.ts_next;
                b.ts_next && (b.ts_next.ts_prev = b);
                d.ts_next = b;
                b.ts_prev = d;
                delete b.beam_st;
                b.beam_end = !0;
                b.tmp = !0;
                delete b.slur_start;
                delete b.slur_end;
                b.x += 12;
                b.x < Ba - 12 && (b.x = Ba - 12);
                d = b;
                f++;
                break
            }
        if (!l)
            return !1;
        a.s2 = d;
        if (0 == u[m].y) {
            if (k)
                return !1
        } else if (!k)
            return a.s1 = c,
            a.a = (c.ys - d.ys) / (c.xs - d.xs),
            a.b = c.ys - c.xs * a.a + u[m].y,
            a.nflags = g,
            !0;
        w = c;
        x = 100;
        v = 0;
        for (b = c; b.type != h.NOTE || (1 == (y = b.p_v.scale) && (y = u[b.st].staffscale),
        0 <= b.stem ? (l = t + b.notes[0].shhd,
        b.notes[b.nhd].pit > v && (v = b.notes[b.nhd].pit,
        w = b)) : (l = -t + b.notes[b.nhd].shhd,
        b.notes[0].pit < x && (x = b.notes[0].pit,
        w = b)),
        b.xs = b.x + l * y,
        b != d); b = b.next)
            ;
        r.flatbeams ? p = 0 : !n && 3 <= f && w != c && w != d && (p = 0);
        l = c.ys + u[m].y;
        void 0 == p && (p = (d.ys + u[d.st].y - l) / (d.xs - c.xs));
        0 != p && (p = 0 < p ? .4 * p / (.4 + p) : .4 * p / (.4 - p));
        f = (l + d.ys + u[d.st].y) / 2 - p * (d.xs + c.xs) / 2;
        t = 0;
        b = c;
        if (n)
            l = .5 * ((c.grace ? 3.5 : 5) * (g - 1) + 3.2),
            f = c.stem != d.stem && c.nflags < d.nflags ? f + l * d.stem : f + l * c.stem;
        else if (c.grace)
            for (; l = p * b.xs + f - u[b.st].y,
            v = 13,
            v = 0 < b.stem ? v - (l - 3 * (b.notes[b.nhd].pit - 18)) : v + (l - 3 * (b.notes[0].pit - 18)),
            v += 3 * (b.nflags - 1),
            v > t && (t = v),
            b != d; b = b.next)
                ;
        else {
            for (x = 3.2 + 5 * (g - 1); b.ts_prev && b.ts_prev.type == h.NOTE && b.ts_prev.time == b.time && b.ts_prev.x > c.xs; )
                b = b.ts_prev;
            for (; b && b.time <= d.time; b = b.ts_next)
                if (!(b.type != h.NOTE || b.invis || b.st != m && b.v != e)) {
                    l = b.v == e ? b.xs : b.x;
                    l = p * l + f - u[b.st].y;
                    if (b.v == e)
                        v = th[0 == b.nhd ? 0 : 1][b.nflags],
                        0 < b.stem ? (26 < b.notes[b.nhd].pit && (v -= 2,
                        28 < b.notes[b.nhd].pit && (v -= 2)),
                        v -= l - 3 * (b.notes[b.nhd].pit - 18)) : (18 > b.notes[0].pit && (v -= 2,
                        16 > b.notes[0].pit && (v -= 2)),
                        v -= 3 * (b.notes[0].pit - 18) - l),
                        v += 3.2 + 5 * (b.nflags - 1);
                    else {
                        if (0 < c.stem)
                            if (0 < b.stem) {
                                if (b.ymn > l + 4 || b.ymx < l - x - 2)
                                    continue;
                                v = b.v > e ? b.ymx - l : b.ymn + 8 - l
                            } else
                                v = b.ymx - l;
                        else if (0 > b.stem) {
                            if (b.ymx < l - 4 || b.ymn > l - x - 2)
                                continue;
                            v = b.v < e ? l - b.ymn : l - b.ymx + 8
                        } else
                            v = l - b.ymn;
                        v += 2 + x
                    }
                    v > t && (t = v)
                }
        }
        0 < t && (f += c.stem * t);
        if (!k && !n)
            for (b = c.next; ; b = b.next) {
                switch (b.type) {
                case h.REST:
                    if (e = b.ts_next,
                    !e || e.st != m || e.type != h.NOTE && e.type != h.REST)
                        break;
                case h.BAR:
                    if (b.invis)
                        break;
                case h.CLEF:
                    l = p * b.x + f;
                    0 < c.stem ? (l = b.ymx - l + 3.2 + 5 * (g - 1) + 2,
                    0 < l && (f += l)) : (l = b.ymn - l - 3.2 - 5 * (g - 1) - 2,
                    0 > l && (f += l));
                    break;
                case h.GRACE:
                    for (e = b.extra; e; e = e.next)
                        l = p * e.x + f,
                        0 < c.stem ? (l = e.ymx - l + 3.2 + 5 * (g - 1) + 2,
                        0 < l && (f += l)) : (l = e.ymn - l - 3.2 - 5 * (g - 1) - 2,
                        0 > l && (f += l))
                }
                if (b == d)
                    break
            }
        0 == p && (f += Lg(c.grace, c.stem, g, f - u[m].y));
        for (b = c; ; b = b.next) {
            switch (b.type) {
            case h.NOTE:
                b.ys = p * b.xs + f - u[b.st].y;
                0 < b.stem ? (b.ymx = b.ys + 2.5,
                b.ts_prev && 0 < b.ts_prev.stem && b.ts_prev.st == b.st && b.ts_prev.ymn < b.ymx && b.ts_prev.x == b.x && 0 == b.notes[0].shhd && (b.ts_prev.x -= 3,
                b.ts_prev.xs -= 3)) : b.ymn = b.ys - 2.5;
                break;
            case h.REST:
                l = p * b.x + f - u[b.st].y;
                e = 3.2 + 5 * (g - 1) + (b.head != h.FULL ? 4 : 9);
                if (0 < c.stem) {
                    if (l -= e,
                    0 == c.multi && 12 < l && (l = 12),
                    b.y <= l)
                        break
                } else if (l += e,
                0 == c.multi && 12 > l && (l = 12),
                b.y >= l)
                    break;
                b.head != h.FULL && (l = 6 * ((l + 3 + 12) / 6 | 0) - 12);
                b.y = l
            }
            if (b == d)
                break
        }
        if (0 == u[m].y)
            return !1;
        a.s1 = c;
        a.a = p;
        a.b = f;
        a.nflags = g;
        return !0
    }
    ;
    Abc.prototype.cfmt = function() {
        return r
    }
    ;
    Abc.prototype.clone = A;
    Abc.prototype.deco_cnv = Xc;
    Abc.prototype.do_pscom = function(a) {
        var c, b;
        if (b = a.match(/(\w|-)+/)) {
            b = b[0];
            a = a.replace(b, "").trim();
            if (" lock" == a.slice(-5))
                Fg[b] = !0,
                a = a.slice(0, -5).trim();
            else if (Fg[b])
                return;
            switch (b) {
            case "center":
                if (2 <= l.state) {
                    b = Bb("text");
                    b.text = Vb(a);
                    b.opt = "c";
                    return
                }
                Ad(Vb(a), "c");
                return;
            case "clef":
                2 <= l.state && (2 == l.state && Ua(),
                (b = Uf(a)) && tg(b));
                return;
            case "deco":
                b = a.match(/(\S*)\s+(.*)/);
                rd[b[1]] = b[2];
                return;
            case "linebreak":
                for (b = 0; 128 > b; b++)
                    "\n" == Wa[b] && (Wa[b] = J);
                a = a.split(/\s+/);
                for (b = 0; b < a.length; b++) {
                    c = a[b];
                    switch (c) {
                    case "!":
                    case "$":
                    case "*":
                    case ";":
                    case "?":
                    case "@":
                        break;
                    case "<none>":
                        continue;
                    case "<EOL>":
                        c = "\n";
                        break;
                    default:
                        t(1, "Bad value '$1' in %%linebreak - ignored", c);
                        continue
                    }
                    Wa[c.charCodeAt(0)] = "\n"
                }
                return;
            case "map":
                a: if (a) {
                    var d;
                    b = lc(a);
                    if (3 > b.length)
                        t(1, "Not enough parameters in %%map");
                    else {
                        d = b[1];
                        if (0 == d.indexOf("octave,") || 0 == d.indexOf("key,"))
                            d = d.replace(/[,']+$/m, "").toLowerCase(),
                            "k" == d[0] && (d = d.replace(/[_=^]+/, ""));
                        else if ("*" == d[0] || 0 == d.indexOf("all"))
                            d = "all";
                        else {
                            d = new ea;
                            d.buffer = b[1];
                            a = Oc(d);
                            if (!a) {
                                t(1, "Bad note in %%map");
                                break a
                            }
                            d = Yf(a)
                        }
                        (c = Ab[b[0]]) || (Ab[b[0]] = c = {});
                        (a = c[d]) || (c[d] = a = []);
                        if (b[2]) {
                            c = 2;
                            if (0 > b[2].indexOf("=")) {
                                "*" != b[2][0] && (d = new ea,
                                d.buffer = b[2],
                                a[1] = Oc(d));
                                if (!b[3])
                                    break a;
                                c++;
                                0 > b[3].indexOf("=") && (a[0] = b[3].split(","),
                                c++)
                            }
                            for (; c < b.length; c++)
                                switch (b[c]) {
                                case "heads=":
                                    a[0] = b[++c].split(",");
                                    break;
                                case "print=":
                                    if ("play" == r.sound)
                                        break;
                                    d = new ea;
                                    d.buffer = b[++c];
                                    a[1] = Oc(d);
                                    break;
                                case "color=":
                                    a[2] = b[++c]
                                }
                        }
                    }
                }
                return;
            case "maxsysstaffsep":
                if (3 == l.state) {
                    H.voices[k.v].maxsep = Va(a);
                    return
                }
                break;
            case "multicol":
                Df();
                switch (a) {
                case "start":
                    zb();
                    Qa = {
                        posy: ia,
                        maxy: ia,
                        lmarg: r.leftmargin,
                        rmarg: r.rightmargin,
                        state: l.state
                    };
                    break;
                case "new":
                    if (!Qa) {
                        t(1, "%%multicol new without start");
                        break
                    }
                    ia > Qa.maxy && (Qa.maxy = ia);
                    r.leftmargin = Qa.lmarg;
                    r.rightmargin = Qa.rmarg;
                    ga.chg = !0;
                    fb();
                    ia = Qa.posy;
                    break;
                case "end":
                    if (!Qa) {
                        t(1, "%%multicol end without start");
                        break
                    }
                    ia < Qa.maxy && (ia = Qa.maxy);
                    r.leftmargin = Qa.lmarg;
                    r.rightmargin = Qa.rmarg;
                    Qa = void 0;
                    Lc();
                    ga.chg = !0;
                    fb();
                    break;
                default:
                    t(1, "Unknown keyword '$1' in %%multicol", a)
                }
                return;
            case "musicfont":
                Wb = a;
                return;
            case "ottava":
                if (3 != l.state) {
                    if (2 != l.state)
                        return;
                    Ua()
                }
                b = parseInt(a);
                if (isNaN(b) || -2 > b || 2 < b) {
                    t(1, O.bad_val, "%%ottava");
                    return
                }
                za.ottava = !0;
                l.ottava.push(b);
                return;
            case "repbra":
                2 <= l.state && (2 == l.state && Ua(),
                k.norepbra = !Ib(a));
                return;
            case "repeat":
                if (3 != l.state)
                    return;
                if (!k.last_sym) {
                    t(1, "%%repeat cannot start a tune");
                    return
                }
                if (a.length) {
                    a = a.split(/\s+/);
                    b = parseInt(a[0]);
                    a = parseInt(a[1]);
                    if (isNaN(b) || 1 > b || k.last_sym.type == h.BAR && 2 < b) {
                        t(1, "Incorrect 1st value in %%repeat");
                        return
                    }
                    if (isNaN(a))
                        a = 1;
                    else if (1 > a) {
                        t(1, "Incorrect 2nd value in %%repeat");
                        return
                    }
                } else
                    a = b = 1;
                l.repeat_n = k.last_sym.type == h.BAR ? b : -b;
                l.repeat_k = a;
                return;
            case "sep":
                var e, f;
                fb();
                f = ga.width - ga.lm - ga.rm;
                c = d = e = 0;
                a && (a = a.split(/\s+/),
                c = Va(a[0]),
                a[1] && (d = Va(a[1]),
                a[2] && (e = Va(a[2]))));
                1 > c && (c = 14);
                1 > d && (d = c);
                1 > e && (e = 90);
                if (2 <= l.state) {
                    b = Bb(b);
                    b.x = (f - e) / 2 / r.scale;
                    b.l = e / r.scale;
                    b.sk1 = c;
                    b.sk2 = d;
                    return
                }
                zb();
                ja(c);
                z += '<path class="stroke"\n\td="M';
                qb((f - e) / 2 / r.scale, " ", 0);
                z += "h" + (e / r.scale).toFixed(1) + '"/>\n';
                ja(d);
                Lc();
                return;
            case "setbarnb":
                c = parseInt(a);
                isNaN(c) || 1 > c ? t(1, "Bad %%setbarnb value") : 2 <= l.state ? za.new_nbar = c : r.measurefirst = c;
                return;
            case "staff":
                if (3 != l.state) {
                    if (2 != l.state)
                        return;
                    Ua()
                }
                c = parseInt(a);
                if (isNaN(c)) {
                    t(1, "Bad %%staff value '$1'", a);
                    return
                }
                b = "+" == a[0] || "-" == a[0] ? k.cst + c : c - 1;
                if (0 > b || b > S) {
                    t(1, "Bad %%staff number $1 (cur $2, max $3)", b, k.cst, S);
                    return
                }
                delete k.floating;
                k.cst = b;
                return;
            case "staffbreak":
                if (3 != l.state) {
                    if (2 != l.state)
                        return;
                    Ua()
                }
                b = {
                    type: h.STBRK,
                    dur: 0
                };
                "0" <= a[0] && "9" >= a[0] ? (b.xmx = Va(a),
                "f" == a.slice(-1) && (b.stbrk_forced = !0)) : (b.xmx = 14,
                "f" == a[0] && (b.stbrk_forced = !0));
                sa(b);
                return;
            case "stafflines":
            case "staffscale":
            case "staffnonote":
                Jb(b, a);
                return;
            case "staves":
            case "score":
                if (0 == l.state)
                    return;
                l.scores && 0 < l.scores.length ? (a = l.scores.shift(),
                b = a.match(/([^\s]+)\s*(.*)/),
                sg(b[1], b[2])) : sg(b, a);
                return;
            case "sysstaffsep":
                if (3 == l.state) {
                    H.voices[k.v].sep = Va(a);
                    return
                }
                break;
            case "text":
                if (2 <= l.state) {
                    b = Bb(b);
                    b.text = Vb(a);
                    b.opt = r.textoption;
                    return
                }
                Ad(Vb(a), r.textoption);
                return;
            case "transpose":
                if (r.sound)
                    return;
                switch (l.state) {
                case 0:
                    r.transp = 0;
                case 1:
                case 2:
                    r.transp = (r.transp || 0) + yc(a);
                    return
                }
                for (b = k.last_sym; b; b = b.prev) {
                    switch (b.type) {
                    case h.NOTE:
                        b = A(k.okey);
                        b.k_old_sf = k.ckey.k_sf;
                        sa(b);
                        break;
                    case h.KEY:
                        break;
                    default:
                        continue
                    }
                    break
                }
                ad("V", k.id + " shift=" + a);
                return;
            case "tune":
                return;
            case "user":
                Vf(a);
                return;
            case "voicecolor":
                if (3 != l.state) {
                    if (2 != l.state)
                        return;
                    Ua()
                }
                k.color = a;
                return;
            case "vskip":
                c = Va(a);
                if (0 > c) {
                    t(1, "%%vskip cannot be negative");
                    return
                }
                if (2 <= l.state) {
                    b = Bb(b);
                    b.sk = c;
                    return
                }
                ja(c);
                return;
            case "newpage":
            case "leftmargin":
            case "rightmargin":
            case "pagescale":
            case "pagewidth":
            case "printmargin":
            case "scale":
            case "staffwidth":
                if (3 == l.state) {
                    b = Bb(b);
                    b.param = a;
                    return
                }
                if ("newpage" == b) {
                    Lc();
                    hb.newpage = !0;
                    return
                }
            }
            ba.set_format(b, a)
        }
    }
    ;
    Abc.prototype.do_begin_end = function(a, c, b) {
        switch (a) {
        case "js":
            ya(b);
            break;
        case "ml":
            2 <= l.state ? (a = Bb(a),
            a.text = b) : (zd(),
            w.img_out && w.img_out(b));
            break;
        case "svg":
            for (a = 0; ; ) {
                c = b.indexOf('<style type="text/css">\n', a);
                if (0 > c)
                    break;
                a = b.indexOf("</style>", c);
                if (0 > a) {
                    t(1, "No </style> in %%beginsvg sequence");
                    break
                }
                oc += b.slice(c + 23, a).replace(/\s+$/, "")
            }
            for (a = 0; ; ) {
                c = b.indexOf("<defs>\n", a);
                if (0 > c)
                    break;
                a = b.indexOf("</defs>", c);
                if (0 > a) {
                    t(1, "No </defs> in %%beginsvg sequence");
                    break
                }
                var d, e, f, g = b.slice(c + 6, a);
                f = 0;
                for (g = g.replace(/\x3c!--.*?--\x3e/g, ""); ; ) {
                    c = g.indexOf("<", f);
                    if (0 > c)
                        break;
                    d = g.indexOf('id="', c);
                    if (0 > d)
                        break;
                    d += 4;
                    f = g.indexOf('"', d);
                    if (0 > f)
                        break;
                    e = g.slice(d, f);
                    f = g.indexOf(">", f);
                    if (0 > f)
                        break;
                    if ("/" == g[f - 1])
                        f++;
                    else {
                        d = g.indexOf(" ", c);
                        if (0 > d)
                            break;
                        d = g.slice(c + 1, d);
                        f = g.indexOf("</" + d + ">", f);
                        if (0 > f)
                            break;
                        f += 3 + d.length
                    }
                    "<filter" == g.substr(c, 7) ? se += "\n" + g.slice(c, f) : Hb[e] = g.slice(c, f)
                }
            }
            break;
        case "text":
            c = Gg[c],
            c || (c = r.textoption),
            2 <= l.state ? (a = Bb(a),
            a.text = Vb(b),
            a.opt = c) : Ad(Vb(b), c)
        }
    }
    ;
    Abc.prototype.draw_gchord = function(a, c, b) {
        var d, e, f, g, h, k, n, l = 0, p = a.dur ? 3 * ((a.notes[a.nhd].pit + a.notes[0].pit >> 1) - 18) : 12;
        for (e = 0; e < a.a_gch.length; e++)
            d = a.a_gch[e],
            d.wh[0] > l && (l = d.wh[0]);
        k = U(a.st, 1, a.x - 3, l);
        n = U(a.st, 0, a.x - 3, l);
        k < b && (k = b);
        n > c && (n = c);
        Ub(a.st);
        for (e = 0; e < a.a_gch.length; e++) {
            d = a.a_gch[e];
            Kb(d.font);
            ra(d.font);
            h = d.font.size;
            g = d.font.box ? 2 : 0;
            l = d.wh[0];
            b = a.x + d.x;
            c = d.text;
            switch (d.type) {
            case "_":
                f = d.y + n;
                R(a.st, 0, b, l, f - g);
                break;
            case "^":
                f = d.y + k + g;
                R(a.st, 1, b, l, f + h + g);
                break;
            case "<":
                a.notes[0].acc && (b -= a.notes[0].shac);
                f = d.y + p - h / 2;
                break;
            case ">":
                a.xmx && (b += a.xmx);
                a.dots && (b += 1.5 + 3.5 * a.dots);
                f = d.y + p - h / 2;
                break;
            default:
                0 <= d.y ? (f = d.y + k + g,
                R(a.st, !0, b, l, f + h + g)) : (f = d.y + n,
                R(a.st, !1, b, l, f - g));
                break;
            case "@":
                f = d.y + p,
                0 < f ? (g = f + h,
                g > u[a.st].ann_top && (u[a.st].ann_top = g)) : f < u[a.st].ann_bot && (u[a.st].ann_bot = f)
            }
            w.anno_start && w.anno_start("annot", d.istart, d.iend, b - 2, f + h + 2, l + 4, h + 4, a);
            na(b, f, c, null, null, d.wh);
            w.anno_stop && w.anno_stop("annot", d.istart, d.iend, b - 2, f + h + 2, l + 4, h + 4, a)
        }
    }
    ;
    Abc.prototype.draw_note = sd;
    Abc.prototype.draw_symbols = function(a) {
        var c = {}, b, d, e;
        for (b = a.sym; b; b = b.next) {
            if (b.invis)
                switch (b.type) {
                case h.KEY:
                    a.key = b;
                default:
                    continue;
                case h.NOTE:
                }
            e = b.st;
            d = b.x;
            Tb(b.color);
            switch (b.type) {
            case h.NOTE:
                dd(b);
                b.beam_st && !b.beam_end && ba.calculate_beam(c, b) && wf(c);
                b.invis || (rb(b),
                sd(b, !c.s2),
                yb(b));
                b == c.s2 && (c.s2 = null);
                break;
            case h.REST:
                if (b.invis || !u[e].topbar)
                    break;
                var f = void 0, g, m, k;
                e = b;
                var n = u[e.st];
                if (e.dur_orig == e.p_v.meter.wmeasure || e.rep_nb && 0 <= e.rep_nb) {
                    e.nflags = e.dur < 2 * h.BLEN ? -2 : e.dur < 4 * h.BLEN ? -3 : -4;
                    e.dots = 0;
                    for (g = e.ts_next; g && g.time != e.time + e.dur; )
                        g = g.ts_next;
                    d = g ? g.x : Ba;
                    for (g = e; !g.seqst; )
                        g = g.ts_prev;
                    g = g.ts_prev;
                    d = (d + g.x) / 2;
                    if (e.a_dd) {
                        k = e;
                        var l = d - e.x
                          , p = qa.length;
                        for (m = 0; m < p; m++)
                            g = qa[m],
                            g.s == k && (g.x += l)
                    }
                    e.x = d
                } else
                    d = e.x,
                    e.notes[0].shhd && (d += e.notes[0].shhd * C.scale);
                if (!e.invis) {
                    g = n.y;
                    if (e.rep_nb)
                        eb(e.st),
                        rb(e),
                        g = "|||||" == n.stafflines ? g + 12 : g + (n.topbar + n.botbar) / 2,
                        0 > e.rep_nb ? ca(d, g, "srep") : (ca(d, g, "mrep"),
                        2 < e.rep_nb && e.v == F.top_voice && (ra("annotation"),
                        E.curfont.box && (E.curfont.box = !1,
                        f = !0),
                        na(d, g + n.topbar - 9, e.rep_nb.toString(), "c"),
                        f && (E.curfont.box = !0)));
                    else {
                        dd(e);
                        rb(e);
                        e.notes[0].color && Tb(e.notes[0].color);
                        f = e.y;
                        k = 5 - e.nflags;
                        7 == k && 12 == f && 2 >= n.stafflines.length && (f -= 6);
                        ca(d, f + g, e.notes[0].head || uh[k]);
                        if (6 <= k) {
                            m = f / 6;
                            switch (k) {
                            default:
                                switch (n.stafflines[m + 1]) {
                                case "|":
                                case "[":
                                    break;
                                default:
                                    ca(d, f + 6 + g, "hl1")
                                }
                                9 == k && (f -= 6,
                                m--);
                                break;
                            case 7:
                                f += 6,
                                m++;
                            case 6:
                            }
                            switch (n.stafflines[m]) {
                            case "|":
                            case "[":
                                break;
                            default:
                                ca(d, f + g, "hl1")
                            }
                        }
                        if (e.dots)
                            for (d += 8,
                            f += g + 3,
                            k = 0; k < e.dots; k++)
                                ca(d, f, "dot"),
                                d += 3.5;
                        Tb()
                    }
                    yb(e)
                }
                break;
            case h.BAR:
                break;
            case h.CLEF:
                b.time >= u[e].clef.time && (u[e].clef = b);
                if (b.second || b.invis || !u[e].topbar)
                    break;
                Tb();
                eb(e);
                rb(b);
                e = u[e].y;
                b.clef_name ? ca(d, e + b.y, b.clef_name) : b.clef_small ? ca(d, e + b.y, "s" + b.clef_type + "clef") : ca(d, e + b.y, b.clef_type + "clef");
                b.clef_octave && (0 < b.clef_octave ? (e += b.ymx - 10,
                b.clef_small && --e) : (e += b.ymn + 6,
                b.clef_small && (e += 1)),
                ca(d - 2, e, "oct"));
                yb(b);
                break;
            case h.METER:
                a.meter = b;
                if (b.second || !u[b.st].topbar)
                    break;
                Tb();
                eb(b.st);
                rb(b);
                d = b;
                if (d.a_meter)
                    for (n = u[d.st],
                    e = n.y,
                    "|||||" != n.stafflines && (e += (n.topbar + n.botbar) / 2 - 12),
                    f = 0; f < d.a_meter.length; f++)
                        n = d.a_meter[f],
                        g = d.x + d.x_meter[f],
                        n.bot ? X('<g transform="translate(X,Y)" text-anchor="middle">\n\t<text y="-12">A</text>\n\t<text>B</text>\n</g>\n', g, e + 6, Fd(n.top), Fd(n.bot)) : X('<text x="X" y="Y" text-anchor="middle">A</text>\n', g, e + 12, Fd(n.top));
                yb(b);
                break;
            case h.KEY:
                a.key = b;
                if (b.second || b.invis || !u[b.st].topbar)
                    break;
                Tb();
                eb(b.st);
                rb(b);
                ba.draw_keysig(d, b);
                yb(b);
                break;
            case h.MREST:
                dd(b);
                d += 32;
                rb(b);
                ca(d, u[b.st].y + 12, "mrest");
                X('<text style="font:bold 15px serif"\n\tx ="X" y="Y" text-anchor="middle">A</text>\n', d, u[b.st].y + 28, b.nmes);
                yb(b);
                break;
            case h.GRACE:
                dd(b);
                var v;
                d = b;
                e = {};
                for (f = d.extra; f && (f.beam_st && !f.beam_end && ba.calculate_beam(e, f) && wf(e),
                rb(f),
                sd(f, !e.s2),
                f == e.s2 && (e.s2 = null),
                yb(f),
                f.next); f = f.next)
                    ;
                d.sappo && (f = d.extra,
                f.next ? (e = .5 * (f.next.x - f.x) + 4,
                n = .5 * (f.ys + f.next.ys) - f.y,
                n = 0 < f.stem ? n - 1 : n + 1) : (e = 9,
                n = 0 < f.stem ? 5 : -5),
                m = f.notes[0 > f.stem ? 0 : f.nhd],
                g = f.x + m.shhd * C.scale,
                m = u[f.st].y + 3 * (m.pit - 18),
                0 < f.stem ? (--g,
                m += 4) : (g -= 5,
                m -= 4),
                X('<path class="stroke" d="mX YlF G"/>\n', g, m, e, -n));
                if (!d.p_v.key.k_bagpipe && r.graceslurs && !d.slur_start && d.next && d.next.type == h.NOTE) {
                    e = f;
                    if (0 <= e.stem) {
                        n = 127;
                        for (f = d.extra; f; f = f.next)
                            f.y < n && (n = f.y,
                            e = f);
                        k = e.x;
                        m = e.y - 5;
                        d.extra != e && (k -= 4,
                        m += 1);
                        d = d.next;
                        g = d.x - 1;
                        0 > d.stem && (g -= 4);
                        f = 3 * (d.notes[0].pit - 18) - 5;
                        n = .4 * (g - k);
                        3 < n && (n = 3);
                        l = n;
                        v = .2;
                        p = .8;
                        m > f + 7 ? (k = e.x - 1,
                        m += .5,
                        f += 6.5,
                        g = d.x - 5.5,
                        n = .8 * (m - f),
                        l = .2 * (m - f),
                        v = 0) : f > m + 4 && (f = m + 4,
                        k = e.x + 2,
                        m = e.y - 4)
                    } else {
                        n = -127;
                        for (f = d.extra; f; f = f.next)
                            f.y > n && (n = f.y,
                            e = f);
                        k = e.x;
                        m = e.y + 5;
                        d.extra != e && (k -= 4,
                        --m);
                        d = d.next;
                        g = d.x - 1;
                        0 <= d.stem && (g -= 2);
                        f = 3 * (d.notes[d.nhd].pit - 18) + 5;
                        n = .4 * (k - g);
                        -3 > n && (n = -3);
                        l = n;
                        v = .2;
                        p = .8;
                        m < f - 7 ? (k = e.x - 1,
                        m -= .5,
                        f -= 6.5,
                        g = d.x - 5.5,
                        n = .8 * (m - f),
                        l = .2 * (m - f),
                        v = 0) : f < m - 4 && (f = m - 4,
                        k = e.x + 2,
                        m = e.y + 4)
                    }
                    e = v * g + (1 - v) * k - k;
                    n = v * f + (1 - v) * m - n - m;
                    v = p * g + (1 - p) * k - k;
                    l = p * f + (1 - p) * m - l - m;
                    rb(d, "slur");
                    Xd(k, m + u[d.st].y);
                    z += "c" + e.toFixed(1) + " " + (-n).toFixed(1) + " " + v.toFixed(1) + " " + (-l).toFixed(1) + " " + (g - k).toFixed(1) + " " + (-f + m).toFixed(1) + '"/>\n';
                    yb(d, "slur")
                }
                break;
            case h.SPACE:
            case h.STBRK:
                break;
            case h.CUSTOS:
                dd(b);
                sd(b, 0);
                break;
            case h.BLOCK:
            case h.PART:
            case h.REMARK:
            case h.STAVES:
            case h.TEMPO:
                break;
            default:
                K(2, b, "draw_symbols - Cannot draw symbol " + b.type)
            }
        }
        dd(a.sym);
        Og(a);
        Tb()
    }
    ;
    Abc.prototype.errs = O;
    Abc.prototype.font_class = be;
    Abc.prototype.gch_build = function(a) {
        var c, b, d, e, f = k.pos.gch == h.SL_BELOW ? -1 : 1, g = 0, m = 0, l = 0, n = 0;
        a.a_gch = ib;
        ib = null;
        k.vtransp && rh(a);
        for (e = 0; e < a.a_gch.length; e++) {
            c = a.a_gch[e];
            if ("g" == c.type)
                r.chordnames && (c.otext = c.text,
                c.text = c.text.replace(/A|B|C|D|E|F|G/g, function(a) {
                    return r.chordnames[a]
                }),
                "H" == r.chordnames.B && (c.text = c.text.replace(/Hb/g, "Bb"))),
                c.text = c.text.replace(/##|#|=|bb|b|  /g, function(a) {
                    switch (a) {
                    case "##":
                        return "&#x1d12a;";
                    case "#":
                        return "\u266f";
                    case "=":
                        return "\u266e";
                    case "b":
                        return "\u266d";
                    case "  ":
                        return " \u00a0"
                    }
                    return "&#x1d12b;"
                });
            else if (c.text = Vb(c.text),
            "@" == c.type && !w.anno_start && !w.anno_stop) {
                c.wh = [0, 0];
                continue
            }
            ra(c.font);
            b = Pa(c.text);
            c.wh = b;
            c.font.box && (b[1] += 4);
            switch (c.type) {
            case "@":
                break;
            case "^":
                d = .4 * b[0];
                8 < d && (d = 8);
                c.x = -d;
                g -= b[1];
                c.y = g;
                break;
            case "_":
                d = .4 * b[0];
                8 < d && (d = 8);
                c.x = -d;
                m -= b[1];
                c.y = m;
                break;
            case "<":
                c.x = -(b[0] + 6);
                l -= b[1];
                c.y = l + b[1] / 2;
                break;
            case ">":
                c.x = 6;
                n -= b[1];
                c.y = n + b[1] / 2;
                break;
            default:
                d = .4 * b[0],
                8 < d && (d = 8),
                c.x = -d,
                0 > f ? (m -= b[1],
                c.y = m) : (g -= b[1],
                c.y = g)
            }
        }
        l /= 2;
        n /= 2;
        for (e = 0; e < a.a_gch.length; e++)
            switch (c = a.a_gch[e],
            c.type) {
            case "^":
                c.y -= g;
                break;
            case "<":
                c.y -= l;
                break;
            case ">":
                c.y -= n;
                break;
            case "g":
                0 < f && (c.y -= g)
            }
    }
    ;
    Abc.prototype.gch_tr1 = wg;
    Abc.prototype.get_a_gch = function() {
        return ib
    }
    ;
    Abc.prototype.get_bool = Ib;
    Abc.prototype.get_cur_sy = function() {
        return F
    }
    ;
    Abc.prototype.get_curvoice = function() {
        return k
    }
    ;
    Abc.prototype.get_delta_tb = function() {
        return Kd
    }
    ;
    Abc.prototype.get_decos = function() {
        return rd
    }
    ;
    Abc.prototype.get_fname = function() {
        return l.fname
    }
    ;
    Abc.prototype.get_font = mc;
    Abc.prototype.get_font_style = function() {
        return wc
    }
    ;
    Abc.prototype.get_glyphs = function() {
        return Hb
    }
    ;
    Abc.prototype.get_img = function() {
        return ga
    }
    ;
    Abc.prototype.get_maps = function() {
        return Ab
    }
    ;
    Abc.prototype.get_multi = function() {
        return Qa
    }
    ;
    Abc.prototype.get_newpage = function() {
        if (hb.newpage)
            return hb.newpage = !1,
            !0
    }
    ;
    Abc.prototype.get_posy = function() {
        var a = ia;
        ia = 0;
        return a
    }
    ;
    Abc.prototype.get_staff_tb = function() {
        return u
    }
    ;
    Abc.prototype.get_top_v = function() {
        return H.top_voice
    }
    ;
    Abc.prototype.get_tsfirst = function() {
        return W
    }
    ;
    Abc.prototype.get_unit = Va;
    Abc.prototype.get_voice_tb = function() {
        return x
    }
    ;
    Abc.prototype.goto_tune = Ua;
    Abc.prototype.info = function() {
        return P
    }
    ;
    Abc.prototype.new_block = Bb;
    Abc.prototype.new_note = function(a, c) {
        var b, d, e, f, g;
        g = 0;
        var m = l.line
          , q = Aa;
        Aa = null;
        l.stemless = !1;
        d = {
            type: h.NOTE,
            fname: l.fname,
            stem: 0,
            multi: 0,
            nhd: 0,
            xmx: 0
        };
        d.istart = l.bol + m.index;
        k.color && (d.color = k.color);
        a ? d.grace = !0 : (ib && ba.gch_build(d),
        l.repeat_n && (d.repeat_n = l.repeat_n,
        d.repeat_k = l.repeat_k,
        l.repeat_n = 0));
        f = m["char"]();
        switch (f) {
        case "X":
            d.invis = !0;
        case "Z":
            d.type = h.MREST;
            f = m.next_char();
            d.nmes = "0" < f && "9" >= f ? m.get_int() : 1;
            d.dur = k.wmeasure * d.nmes;
            if (k.second) {
                k.time += d.dur;
                return
            }
            1 == d.nmes && (d.type = h.REST,
            d.dur_orig = d.dur,
            d.notes = [{
                pit: 18,
                dur: d.dur
            }]);
            break;
        case "y":
            d.type = h.SPACE;
            d.invis = !0;
            d.dur = 0;
            f = m.next_char();
            d.width = "0" <= f && "9" >= f ? m.get_int() : 10;
            break;
        case "x":
            d.invis = !0;
        case "z":
            d.type = h.REST;
            m.index++;
            e = Nb(m);
            d.dur_orig = (0 > k.ulen ? h.BLEN : k.ulen) * e[0] / e[1];
            d.dur = d.dur_orig * k.dur_fact;
            d.notes = [{
                pit: 18,
                dur: d.dur_orig
            }];
            break;
        case "[":
            e = !0,
            f = m.next_char();
        default:
            k.uscale && (d.uscale = k.uscale);
            for (d.notes = []; ; ) {
                if (e)
                    for (; f; ) {
                        f = f.charCodeAt(0);
                        if (128 <= f) {
                            t(1, O.not_ascii);
                            return
                        }
                        f = Wa[f];
                        switch (f[0]) {
                        case "(":
                            g <<= 4;
                            g += Pc();
                            f = m["char"]();
                            continue;
                        case "!":
                            Aa || (Aa = []);
                            if (1 < f.length)
                                Aa.push(f.slice(1, -1));
                            else {
                                for (b = ""; ; ) {
                                    f = m.next_char();
                                    if (!f) {
                                        t(1, "No end of decoration");
                                        return
                                    }
                                    if ("!" == f)
                                        break;
                                    b += f
                                }
                                Aa.push(b)
                            }
                            f = m.next_char();
                            continue
                        }
                        break
                    }
                var n;
                n = m;
                f = d.grace ? h.BLEN / 4 : 0 > k.ulen ? h.BLEN : k.ulen;
                (b = Oc(n)) ? ("0" == n["char"]() && (l.stemless = !0,
                n.index++),
                n = Nb(n),
                b.dur = f * n[0] / n[1]) : b = void 0;
                if (!b)
                    return;
                k.octave && (b.pit += 7 * k.octave);
                g && (b.sl1 = g,
                d.sl1 ? d.sl1++ : d.sl1 = 1,
                g = 0);
                Aa && (b.a_dcn = Aa,
                Aa = null);
                d.notes.push(b);
                if (!e)
                    break;
                for (f = m["char"](); ; ) {
                    switch (f) {
                    case ")":
                        b.sl2 ? b.sl2++ : b.sl2 = 1;
                        d.sl2 ? d.sl2++ : d.sl2 = 1;
                        f = m.next_char();
                        continue;
                    case "-":
                        b.ti1 = Pc();
                        d.ti1 = !0;
                        f = m["char"]();
                        continue;
                    case ".":
                        if (f = m.next_char(),
                        "-" != f)
                            t(1, "Misplaced dot");
                        else
                            continue
                    }
                    break
                }
                if ("]" == f) {
                    m.index++;
                    e = Nb(m);
                    d.nhd = d.notes.length - 1;
                    for (f = 0; f <= d.nhd; f++)
                        b = d.notes[f],
                        b.dur = b.dur * e[0] / e[1];
                    break
                }
            }
            d.dur_orig = d.notes[0].dur;
            d.dur = d.notes[0].dur * k.dur_fact
        }
        if (d.grace && d.type != h.NOTE)
            t(1, "Not a note in grace note sequence");
        else {
            if (d.notes) {
                if (d.grace) {
                    e = k.ckey.k_bagpipe ? 8 : 4;
                    for (f = 0; f <= d.nhd; f++)
                        d.notes[f].dur /= e;
                    d.dur /= e;
                    d.dur_orig /= e;
                    a.stem && (d.stem = a.stem)
                } else {
                    switch (k.pos.stm) {
                    case h.SL_ABOVE:
                        d.stem = 1;
                        break;
                    case h.SL_BELOW:
                        d.stem = -1;
                        break;
                    case h.SL_HIDDEN:
                        d.stemless = !0
                    }
                    d.dur *= c;
                    if (b = k.brk_rhythm) {
                        k.brk_rhythm = 0;
                        g = k.last_note;
                        if (0 < b) {
                            e = 2 * b - 1;
                            d.dur = d.dur * e / b;
                            d.dur_orig = d.dur_orig * e / b;
                            for (f = 0; f <= d.nhd; f++)
                                d.notes[f].dur = d.notes[f].dur * e / b;
                            g.dur /= b;
                            g.dur_orig /= b;
                            for (f = 0; f <= g.nhd; f++)
                                g.notes[f].dur /= b
                        } else {
                            b = -b;
                            e = 2 * b - 1;
                            d.dur /= b;
                            d.dur_orig /= b;
                            for (f = 0; f <= d.nhd; f++)
                                d.notes[f].dur /= b;
                            g.dur = g.dur * e / b;
                            g.dur_orig = g.dur_orig * e / b;
                            for (f = 0; f <= g.nhd; f++)
                                g.notes[f].dur = g.notes[f].dur * e / b
                        }
                        k.time = g.time + g.dur;
                        for (g = g.next; g; g = g.next)
                            g.time = k.time
                    }
                }
                k.last_note = d
            }
            sa(d);
            if (d.type == h.NOTE) {
                if (k.vtransp) {
                    var u, p, v, x, w, z;
                    f = d.nhd;
                    e = k.okey.k_sf;
                    g = k.ckey.k_sf - e;
                    b = zc[(g + 28) % 7];
                    n = k.vtransp;
                    0 > n && 0 != b && (b -= 7);
                    b += 7 * (n / 3 / 12 | 0);
                    for (n = 0; n <= f; n++) {
                        z = d.notes[n];
                        p = z.pit;
                        z.pit += b;
                        w = xg[(p + 5 + 112) % 7];
                        v = z.acc;
                        if (!v)
                            if (k.okey.a_acc)
                                for (u = 0; u < k.okey.a_acc.length; u++) {
                                    if (x = k.okey.a_acc[u],
                                    0 == (p + 112 - x.pit) % 7) {
                                        v = x.acc;
                                        break
                                    }
                                }
                            else
                                0 < e ? w < e - 1 && (v = 1) : 0 > e && w >= e + 6 && (v = -1);
                        u = w + g;
                        v && 3 != v && (u += 7 * v);
                        w = (((u + 1 + 21) / 7 | 0) + 2 - 3 + 160) % 5;
                        v = vh[w];
                        if (!z.acc)
                            if (k.ckey.k_none) {
                                if (3 == v || oh(z.pit))
                                    continue
                            } else if (k.ckey.a_acc) {
                                w = zc[(u + 112) % 7];
                                for (u = 0; u < k.ckey.a_acc.length && 0 != (w + 112 - k.ckey.a_acc[u].pits) % 7; u++)
                                    ;
                                if (u < k.ckey.a_acc.length)
                                    continue
                            } else
                                continue;
                        w = z.acc;
                        if ((u = z.micro_d) && w != v)
                            switch (p = z.micro_n,
                            v) {
                            case 3:
                                p > u / 2 ? (p -= u / 2,
                                z.micro_n = p,
                                v = w) : v = -w;
                                break;
                            case 2:
                                p > u / 2 ? (z.pit += 1,
                                p -= u / 2) : p += u / 2;
                                v = w;
                                z.micro_n = p;
                                break;
                            case -2:
                                p >= u / 2 ? (--z.pit,
                                p -= u / 2) : p += u / 2,
                                v = w,
                                z.micro_n = p
                            }
                        z.acc = v
                    }
                }
                if (k.map && Ab[k.map])
                    for (f = 0; f <= d.nhd; f++)
                        a: {
                            e = d.notes[f];
                            g = Ab[k.map];
                            b = Yf(e);
                            if (!(g[b] || (b = "octave," + b.replace(/[',]/g, ""),
                            g[b] || (b = "key," + "abcdefg"[(e.pit + 77 - k.ckey.k_delta) % 7],
                            g[b] || (b = "all",
                            g[b])))))
                                break a;
                            e.map = g[b];
                            e.map[1] && (e.pit = e.map[1].pit,
                            e.acc = e.map[1].acc)
                        }
            }
            r.shiftunison && (d.shiftunison = r.shiftunison);
            a || (k.lyric_restart || (k.lyric_restart = d),
            k.sym_restart || (k.sym_restart = d));
            q && Xc(q, d, d.prev);
            l.ottava.length && (d.ottava = l.ottava,
            l.ottava = []);
            l.stemless && (d.stemless = !0);
            d.iend = l.bol + m.index;
            return d
        }
    }
    ;
    Abc.prototype.out_arp = kg;
    Abc.prototype.out_deco_str = jg;
    Abc.prototype.out_deco_val = nf;
    Abc.prototype.out_ltr = lg;
    Abc.prototype.output_music = function() {
        var a, c, b, d;
        Tf();
        if (W) {
            var e, f, g, k, l;
            l = F;
            for (f = l.nstaff; ; ) {
                l = l.next;
                if (!l)
                    break;
                l.nstaff > f && (f = l.nstaff)
            }
            S = f;
            k = x.length;
            for (g = 0; g < k; g++) {
                e = x[g];
                for (var n = void 0, t = void 0, p = void 0, v = void 0, D = void 0, H = !0, O = 127, D = e.sym; D; D = D.next)
                    if (D.type == h.NOTE) {
                        O = D.notes[0].pit;
                        break
                    }
                for (D = e.sym; D; D = D.next) {
                    switch (D.type) {
                    case h.MREST:
                        H = !0;
                        break;
                    case h.BAR:
                        D.bar_type = Mg(D.bar_type);
                        D.beam_on || (H = !0);
                        !D.next && D.prev && D.prev.head == h.OVALBARS && (D.prev.head = h.SQUARE);
                        break;
                    case h.NOTE:
                    case h.REST:
                        if (n = Ge(D, D.dur_orig),
                        D.head = n[0],
                        D.dots = n[1],
                        D.nflags = n[2],
                        -2 >= D.nflags && (D.stemless = !0),
                        D.xstem && (D.nflags = 0),
                        D.trem1 && (D.nflags = 0 < D.nflags ? D.nflags + D.ntrem : D.ntrem),
                        !D.next || !D.next.trem2)
                            if (D.trem2)
                                D.prev.trem2 = !0,
                                D.prev.nflags = --D.nflags,
                                D.prev.head = ++D.head,
                                0 < D.nflags ? D.nflags += D.ntrem : (-2 >= D.nflags && (D.stemless = !0,
                                D.prev.stemless = !0),
                                D.nflags = D.ntrem),
                                D.prev.nflags = D.nflags;
                            else {
                                p = D.nflags;
                                D.ntrem && (p += D.ntrem);
                                D.type == h.REST && D.beam_end && (D.beam_end = !1,
                                H = !0);
                                if (H || 0 >= p)
                                    t && (t.beam_end = !0,
                                    t = null),
                                    0 >= p ? (D.beam_st = !0,
                                    D.beam_end = !0) : D.type == h.NOTE && (D.beam_st = !0,
                                    H = !1);
                                D.beam_end && (H = !0);
                                D.type == h.NOTE && (t = D)
                            }
                    }
                    if (D.type == h.NOTE)
                        for (0 != D.nhd && mf(D),
                        O = D.notes[0].pit,
                        v = D.prev; v && v.type == h.REST; v = v.prev)
                            v.notes[0].pit = O;
                    else
                        D.notes || (D.notes = [],
                        D.notes[0] = {},
                        D.nhd = 0),
                        D.notes[0].pit = O
                }
                t && (t.beam_end = !0);
                for (var y = void 0, P = void 0, J = e.sym; J; )
                    if (J.type != h.BAR || !J.rbstart || J.norepbra)
                        J = J.next;
                    else
                        for (y = 0,
                        P = null,
                        J = J.next; J; J = J.next)
                            if (J.type == h.BAR) {
                                y++;
                                if (J.rbstop)
                                    break;
                                if (!J.next) {
                                    J.rbstop = 2;
                                    break
                                }
                                y == r.rbmin && (P = J);
                                if (y == r.rbmax) {
                                    P && (J = P);
                                    J.rbstop = 1;
                                    break
                                }
                            }
            }
            var X, ia, ea, xa, ta, La, ya, sa;
            for (xa = 0; xa < x.length; xa++)
                for (X = x[xa],
                ea = !1,
                ia = X.st,
                ta = X.sym; ta; ta = ta.next) {
                    if (!ta.floating) {
                        for (; ta && !ta.floating; )
                            ta = ta.next;
                        if (!ta)
                            break;
                        ea = !1
                    }
                    if (ta.dur)
                        if (19 <= ta.notes[0].pit)
                            ea = !1;
                        else if (12 >= ta.notes[ta.nhd].pit)
                            ea = !0,
                            ta.st++;
                        else {
                            ya = 127;
                            for (La = ta.ts_prev; La && La.st == ia && La.v != ta.v; La = La.ts_prev)
                                La.type == h.NOTE && La.notes[0].pit < ya && (ya = La.notes[0].pit);
                            if (127 == ya)
                                ea && ta.st++;
                            else if (ta.notes[ta.nhd].pit > ya - 3)
                                ea = !1;
                            else {
                                sa = -127;
                                for (La = ta.ts_next; La && La.st == ia + 1 && La.v != ta.v; La = La.ts_next)
                                    La.type == h.NOTE && La.notes[La.nhd].pit > sa && (sa = La.notes[La.nhd].pit);
                                if (-127 == sa)
                                    ea && ta.st++;
                                else {
                                    if (ta.notes[0].pit < sa + 3)
                                        ea = !0;
                                    else if (ya -= ta.notes[ta.nhd].pit,
                                    sa = ta.notes[0].pit - sa,
                                    !ea) {
                                        if (ya < sa + 3)
                                            continue;
                                        ea = !0
                                    } else if (ya < sa - 3) {
                                        ea = !1;
                                        continue
                                    }
                                    ta.st++
                                }
                            }
                        }
                    else
                        ea && ta.st++
                }
            za.ottava && "play" != r.sound && ah();
            var Z, ka, Q, Y, Ia, Ma, Aa, Wc, Qa, Za = Array(S), fa = F, Ya = [];
            u = Array(S);
            for (Q = 0; Q <= S; Q++)
                Za[Q] = {
                    autoclef: !0
                },
                u[Q] = {
                    output: "",
                    sc_out: ""
                };
            for (Y = 0; Y < x.length; Y++)
                Ia = x[Y],
                0 > fa.voices[Y].range || (Q = fa.voices[Y].st,
                fa.voices[Y].second || (void 0 != Ia.staffnonote && (fa.staves[Q].staffnonote = Ia.staffnonote),
                Ia.staffscale && (fa.staves[Q].staffscale = Ia.staffscale),
                fa.voices[Y].sep && (fa.staves[Q].sep = fa.voices[Y].sep),
                fa.voices[Y].maxsep && (fa.staves[Q].maxsep = fa.voices[Y].maxsep)),
                fa.voices[Y].second || Ia.clef.clef_auto || (Za[Q].autoclef = !1));
            for (Y = 0; Y < x.length; Y++)
                Ia = x[Y],
                0 > fa.voices[Y].range || fa.voices[Y].second || (Q = fa.voices[Y].st,
                Z = Ia.clef,
                Za[Q].autoclef && (Z.clef_type = hf(Q, W, Z.clef_type),
                Z.clef_line = "t" == Z.clef_type ? 2 : 4),
                Za[Q].clef = u[Q].clef = Z);
            for (Q = 0; Q <= fa.nstaff; Q++)
                Ya[Q] = 3 * (fa.staves[Q].stafflines.length - 1);
            for (Z = W; Z; Z = Z.ts_next) {
                Z.repeat_n && $g(Z);
                switch (Z.type) {
                case h.STAVES:
                    fa = Z.sy;
                    for (Q = 0; Q <= S; Q++)
                        Za[Q].autoclef = !0;
                    for (Y = 0; Y < x.length; Y++)
                        0 > fa.voices[Y].range || (Ia = x[Y],
                        Q = fa.voices[Y].st,
                        fa.voices[Y].second || (void 0 != Ia.staffnonote && (fa.staves[Q].staffnonote = Ia.staffnonote),
                        Ia.staffscale && (fa.staves[Q].staffscale = Ia.staffscale),
                        fa.voices[Y].sep && (fa.staves[Q].sep = fa.voices[Y].sep),
                        fa.voices[Y].maxsep && (fa.staves[Q].maxsep = fa.voices[Y].maxsep)),
                        ka = Ia.clef,
                        ka.clef_auto || (Za[Q].autoclef = !1));
                    for (Q = 0; Q <= fa.nstaff; Q++)
                        Ya[Q] = 3 * (fa.staves[Q].stafflines.length - 1);
                    for (Y = 0; Y < x.length; Y++)
                        if (!(0 > fa.voices[Y].range || fa.voices[Y].second))
                            if (Ia = x[Y],
                            Q = fa.voices[Y].st,
                            ka = Ia.clef,
                            ka.clef_auto ? (Aa = hf(Q, Z, Za[Q].clef ? Za[Q].clef.clef_type : "a"),
                            Wc = "t" == Aa ? 2 : 4) : (Aa = ka.clef_type,
                            Wc = ka.clef_line),
                            !Za[Q].clef)
                                ka.clef_auto && ("a" != ka.type && (Ia.clef = A(Ia.clef)),
                                Ia.clef.clef_type = Aa,
                                Ia.clef.clef_line = Wc),
                                u[Q].clef = Za[Q].clef = Ia.clef;
                            else if (Aa != Za[Q].clef.clef_type || Wc != Za[Q].clef.clef_line) {
                                for (Ma = Z.ts_prev; Ma && Ma.time == Z.time && (Ma.v != Y || Ma.st != Q); )
                                    Ma = Ma.ts_prev;
                                if (!Ma || Ma.time != Z.time) {
                                    for (Ma = Z.ts_next; Ma && (Ma.v != Y || Ma.st != Q); )
                                        Ma = Ma.ts_next;
                                    Ma && Ma.time == Z.time || (Ma = Z)
                                }
                                Ma.type != h.CLEF && (Ma = Jf(Ma, Aa, Wc),
                                ka.clef_auto && (Ma.clef_auto = !0));
                                Za[Q].clef = Ia.clef = Ma
                            }
                    continue;
                default:
                    Z.mid = Ya[Z.st];
                    continue;
                case h.CLEF:
                }
                "a" == Z.clef_type && (Z.clef_type = hf(Z.st, Z.ts_next, Za[Z.st].clef.clef_type),
                Z.clef_line = "t" == Z.clef_type ? 2 : 4);
                Ia = Z.p_v;
                Ia.clef = Z;
                if (Z.second)
                    lb(Z);
                else {
                    Q = Z.st;
                    if (Za[Q].clef) {
                        if (Z.clef_type == Za[Q].clef.clef_type && Z.clef_line == Za[Q].clef.clef_line)
                            continue
                    } else
                        u[Q].clef = Z;
                    Za[Q].clef = Z
                }
            }
            fa = F;
            for (Y = 0; Y < x.length; Y++)
                if (!(0 > fa.voices[Y].range) && (ka = x[Y].sym) && 127 == ka.notes[0].pit) {
                    Q = fa.voices[Y].st;
                    switch (u[Q].clef.clef_type) {
                    default:
                        Qa = 22;
                        break;
                    case "c":
                        Qa = 16;
                        break;
                    case "b":
                        Qa = 10
                    }
                    for (Z = ka; Z; Z = Z.next)
                        Z.notes[0].pit = Qa
                }
            ba.set_pitch(null);
            1 < x.length && ba.set_stem_dir();
            for (a = 0; a < x.length; a++) {
                var Ua, Vc, Wa, hb, Va, jb = void 0, qb = void 0, ua, aa, fb = -1;
                for (aa = x[a].sym; aa; aa = aa.next)
                    if (aa.type != h.NOTE) {
                        if (aa.type == h.GRACE)
                            if (ua = aa.extra,
                            2 == ua.stem)
                                jb = aa;
                            else
                                for (aa.stem || 0 != (aa.stem = aa.multi) || (aa.stem = 1); ua; ua = ua.next)
                                    ua.stem = aa.stem,
                                    ua.multi = aa.multi
                    } else {
                        if (aa.stem || 0 != (aa.stem = aa.multi))
                            aa.beam_st && !aa.beam_end && (qb = !0);
                        else if (Wa = aa.mid / 3 + 18,
                        qb)
                            aa.stem = fb;
                        else if (aa.beam_st && !aa.beam_end) {
                            qb = !0;
                            Vc = aa.notes[aa.nhd].pit;
                            Ua = aa.notes[0].pit;
                            for (ua = aa.next; ua; ua = ua.next)
                                if (ua.type == h.NOTE) {
                                    if (ua.stem || ua.multi) {
                                        aa.stem = ua.stem || ua.multi;
                                        break
                                    }
                                    ua.notes[ua.nhd].pit > Vc && (Vc = ua.notes[ua.nhd].pit);
                                    ua.notes[0].pit < Ua && (Ua = ua.notes[0].pit);
                                    if (ua.beam_end)
                                        break
                                }
                            ua.beam_end && ((Vc + Ua) / 2 < Wa ? aa.stem = 1 : (Vc + Ua) / 2 > Wa ? aa.stem = -1 : r.bstemdown && (aa.stem = -1));
                            aa.stem || (aa.stem = fb)
                        } else {
                            Va = (aa.notes[aa.nhd].pit + aa.notes[0].pit) / 2;
                            if (Va == Wa) {
                                for (hb = Va = 0; hb <= aa.nhd; hb++)
                                    Va += aa.notes[hb].pit;
                                Va /= aa.nhd + 1
                            }
                            aa.stem = Va < Wa ? 1 : Va > Wa ? -1 : r.bstemdown ? -1 : fb
                        }
                        aa.beam_end && (qb = !1);
                        fb = aa.stem;
                        if (jb) {
                            for (ua = jb.extra; ua; ua = ua.next)
                                ua.stem = -fb;
                            jb.stem = -fb;
                            jb = null
                        }
                    }
            }
            ba.set_stems();
            if (1 < x.length) {
                var I, ha, ib, Vb, Bb, Xb, Yb, Zb, Ja, gb, mb, Kb = [], zb = F;
                for (I = W; I; I = I.ts_next)
                    if (!I.invis && (I.type == h.STAVES && (zb = I.sy),
                    I.dur && (Xb = Kb[I.v],
                    Xb || (Xb = {},
                    Kb[I.v] = Xb),
                    Xb.s = I,
                    Xb.st = I.st,
                    Xb.end_time = I.time + I.dur,
                    I.type == h.REST))) {
                        Zb = -127;
                        Yb = 127;
                        Bb = gb = !1;
                        for (ib = 0; ib <= Kb.length; ib++)
                            !(Xb = Kb[ib]) || !Xb.s || Xb.st != I.st || ib == I.v || Xb.end_time <= I.time || (Bb = !0,
                            ha = Xb.s,
                            zb.voices[ib].range < zb.voices[I.v].range ? ha.time == I.time ? ha.ymn < Yb && (Yb = ha.ymn,
                            ha.dots && (gb = !0)) : ha.y < Yb && (Yb = ha.y) : ha.time == I.time ? ha.ymx > Zb && (Zb = ha.ymx,
                            ha.dots && (gb = !0)) : ha.y > Zb && (Zb = ha.y));
                        Vb = I.time + I.dur;
                        for (ha = I.ts_next; ha && !(ha.time >= Vb); ha = ha.ts_next)
                            ha.st == I.st && ha.dur && !ha.invis && (Bb = !0,
                            zb.voices[ha.v].range < zb.voices[I.v].range ? ha.time == I.time ? ha.ymn < Yb && (Yb = ha.ymn,
                            ha.dots && (gb = !0)) : ha.y < Yb && (Yb = ha.y) : ha.time == I.time ? ha.ymx > Zb && (Zb = ha.ymx,
                            ha.dots && (gb = !0)) : ha.y > Zb && (Zb = ha.y));
                        Bb ? (127 == Yb && 12 > I.y && (Ja = 12 - I.y,
                        I.y += Ja,
                        I.ymx += Ja,
                        I.ymn += Ja),
                        -127 == Zb && 12 < I.y && (Ja = I.y - 12,
                        I.y -= Ja,
                        I.ymx -= Ja,
                        I.ymn -= Ja),
                        Ja = Yb - I.ymx,
                        0 > Ja ? (Ja = 6 * Math.ceil(-Ja / 6),
                        I.ymn - Ja >= Zb ? (I.y -= Ja,
                        I.ymx -= Ja,
                        I.ymn -= Ja) : (mb = gb ? 15 : 10,
                        I.notes[0].shhd = mb,
                        I.xmx = mb)) : (Ja = Zb - I.ymn,
                        0 < Ja && (Ja = 6 * Math.ceil(Ja / 6),
                        I.ymx + Ja <= Yb ? (I.y += Ja,
                        I.ymx += Ja,
                        I.ymn += Ja) : (mb = gb ? 15 : 10,
                        I.notes[0].shhd = mb,
                        I.xmx = mb)))) : (I.y = 12,
                        I.ymx = 24,
                        I.ymn = 0)
                    }
                var Xa, T, L, Bc, M, nb, Qc, Ra, Hb, Ab, Wb, $a, Da, Ib, Ld, lc, Jb, ed, nc, Lb, Mb, fd, gd;
                for (Xa = W; Xa; Xa = Xa.ts_next)
                    if (Xa.type == h.NOTE && !Xa.invis) {
                        if (Xa.xstem && 0 > Xa.ts_prev.stem)
                            for (Ra = 0; Ra <= Xa.nhd; Ra++)
                                Xa.notes[Ra].shhd -= 7,
                                Xa.notes[Ra].shac += 16;
                        for (L = Xa; ; ) {
                            L = L.ts_next;
                            if (!L)
                                break;
                            if (L.time != Xa.time) {
                                L = null;
                                break
                            }
                            if (L.type == h.NOTE && !L.invis && L.st == Xa.st)
                                break
                        }
                        if (L && (T = Xa,
                        F.voices[T.v].range < F.voices[L.v].range ? L.dot_low = !0 : T.dot_low = !0,
                        !(T.ymn > L.ymx || T.ymx < L.ymn || ch(T, L))))
                            if (0 < T.stem && 0 > L.stem && T.notes[0].pit == L.notes[L.nhd].pit + 1 || 0 > T.stem && 0 < L.stem && T.notes[T.nhd].pit + 1 == L.notes[0].pit) {
                                0 > T.stem && (T = L,
                                L = Xa);
                                for (Ra = 0; Ra <= L.nhd; Ra++)
                                    L.notes[Ra].shhd += 7;
                                L.xmx += 7;
                                T.xmx = L.xmx
                            } else {
                                ed = lf(T);
                                nc = kf(L);
                                if ((Bc = T.ts_prev) && Bc.time == T.time && Bc.st == T.st && Bc.type == h.NOTE && !Bc.invis)
                                    for (Mb = lf(Bc),
                                    M = 0; 96 > M; M++)
                                        Mb[M] > ed[M] && (ed[M] = Mb[M]);
                                else
                                    Bc = null;
                                $a = -10;
                                for (M = 0; 96 > M; M++)
                                    nc[M] + ed[M] > $a && ($a = nc[M] + ed[M]);
                                if (!(-3 > $a && (!T.dots || !L.dots || !L.dot_low || 0 < T.stem || 0 > L.stem || T.notes[T.nhd].pit + 2 != L.notes[0].pit || L.notes[0].pit & 1))) {
                                    Lb = lf(L);
                                    Jb = kf(T);
                                    if (Bc)
                                        for (Mb = kf(Bc),
                                        M = 0; 96 > M; M++)
                                            Mb[M] > Jb[M] && (Jb[M] = Mb[M]);
                                    Da = Ib = Ld = -100;
                                    for (M = 0; 96 > M; M++)
                                        Jb[M] + Lb[M] > Da && (Da = Jb[M] + Lb[M]),
                                        Lb[M] > Ld && (Ld = Lb[M]),
                                        ed[M] > Ib && (Ib = ed[M]);
                                    Ab = 0;
                                    nb = T.nhd;
                                    for (Qc = L.nhd; ; ) {
                                        Wb = T.notes[nb].pit - L.notes[Qc].pit;
                                        switch (Wb) {
                                        case 0:
                                            if (T.notes[nb].acc != L.notes[Qc].acc) {
                                                Ab = -1;
                                                break
                                            }
                                            L.notes[Qc].acc && (L.notes[Qc].acc = 0);
                                            T.dots && L.dots && T.notes[nb].pit & 1 && (Ab = 1);
                                            break;
                                        case -1:
                                            T.dots && L.dots && (T.notes[nb].pit & 1 ? (T.dot_low = !1,
                                            L.dot_low = !1) : (T.dot_low = !0,
                                            L.dot_low = !0));
                                            break;
                                        case -2:
                                            !T.dots || !L.dots || T.notes[nb].pit & 1 || (T.dot_low = !1,
                                            L.dot_low = !1)
                                        }
                                        if (0 > Ab)
                                            break;
                                        if (0 <= Wb && 0 > --nb)
                                            break;
                                        if (0 >= Wb && 0 > --Qc)
                                            break
                                    }
                                    if (0 > Ab) {
                                        var $b = void 0
                                          , Cb = void 0
                                          , ac = T
                                          , Ob = L
                                          , Oc = nb;
                                        if (Ob.notes[Qc].acc) {
                                            $b = 2 * Ke[ac.head] + ac.xmx + Ob.notes[Qc].shac + 2;
                                            Ob.notes[Qc].micro && ($b += 2);
                                            ac.dots && ($b += 6);
                                            for (Cb = 0; Cb <= Ob.nhd; Cb++)
                                                Ob.notes[Cb].shhd += $b,
                                                Ob.notes[Cb].shac -= $b;
                                            Ob.xmx += $b
                                        } else {
                                            $b = 2 * Ke[Ob.head] + Ob.xmx + ac.notes[Oc].shac + 2;
                                            ac.notes[Oc].micro && ($b += 2);
                                            Ob.dots && ($b += 6);
                                            for (Cb = 0; Cb <= ac.nhd; Cb++)
                                                ac.notes[Cb].shhd += $b,
                                                ac.notes[Cb].shac -= $b;
                                            ac.xmx += $b
                                        }
                                    } else {
                                        Hb = 0;
                                        T.dots ? L.dots && (Ab || (Hb = 1)) : L.dots && Da + Ib < $a + Ld && (Hb = 1);
                                        fd = nc;
                                        gd = Lb;
                                        !Bc && Da + Ib < $a + Ld && (T = L,
                                        L = Xa,
                                        $a = Da,
                                        fd = Jb,
                                        gd = ed,
                                        Ld = Ib);
                                        $a += 3;
                                        0 > $a && ($a = 0);
                                        Ra = 0 <= T.stem ? 0 : T.nhd;
                                        $a += T.notes[Ra].shhd;
                                        Ra = 0 <= L.stem ? 0 : L.nhd;
                                        $a -= L.notes[Ra].shhd;
                                        if (T.dots)
                                            if (lc = 7.7 + T.xmx + 3.5 * T.dots - 3.5 + 3,
                                            !Hb) {
                                                Da = -100;
                                                for (nb = 0; nb <= T.nhd; nb++)
                                                    M = T.notes[nb].pit,
                                                    M & 1 || (T.dot_low ? M-- : M++),
                                                    M *= 2,
                                                    1 > M ? M = 1 : 95 <= M && (M = 94),
                                                    fd[M] > Da && (Da = fd[M]),
                                                    fd[M - 1] + 1 > Da && (Da = fd[M - 1] + 1),
                                                    fd[M + 1] + 1 > Da && (Da = fd[M + 1] + 1);
                                                lc + Da + 2 > $a && ($a = lc + Da + 2)
                                            } else if (lc < $a + Ld + L.xmx) {
                                                for (nb = Da = 0; nb <= T.nhd; nb++)
                                                    M = T.notes[nb].pit,
                                                    M & 1 || (T.dot_low ? M-- : M++),
                                                    M *= 2,
                                                    1 > M ? M = 1 : 95 <= M && (M = 94),
                                                    gd[M] > Da && (Da = gd[M]),
                                                    gd[M - 1] + 1 > Da && (Da = gd[M - 1] = 1),
                                                    gd[M + 1] + 1 > Da && (Da = gd[M + 1] + 1);
                                                4.5 < Da && 7.7 + T.xmx + 2 < $a + Da + L.xmx && (L.xmx = Da + 3 - 7.7)
                                            }
                                        for (Ra = L.nhd; 0 <= Ra; Ra--)
                                            L.notes[Ra].shhd += $a;
                                        L.xmx += $a;
                                        Hb && (T.xmx = L.xmx)
                                    }
                                }
                            }
                    }
            }
            var sb, pc, Nb, oc, vc, Xc, Yc;
            for (sb = W; sb; )
                if (sb.type != h.NOTE || sb.invis)
                    sb = sb.ts_next;
                else {
                    Nb = sb.st;
                    Xc = sb.time;
                    vc = !1;
                    for (pc = sb; pc && pc.time == Xc && pc.type == h.NOTE && pc.st == Nb; pc = pc.ts_next)
                        if (!vc)
                            for (oc = 0; oc <= pc.nhd; oc++)
                                if (pc.notes[oc].acc) {
                                    vc = !0;
                                    break
                                }
                    if (vc) {
                        Yc = Hf[sb.head];
                        for (Nb = {
                            notes: []
                        }; sb != pc; sb = sb.ts_next)
                            Array.prototype.push.apply(Nb.notes, sb.notes);
                        mf(Nb);
                        If(Nb.notes, Yc)
                    } else
                        sb = pc
                }
            for (var kc, Ic, Jc, tb, wc, Na = W, Sa = Na, xc = 0, yc = [], Md = [], Nd = 0; ; ) {
                kc = xc;
                do
                    Na.a_gch && !wc && (wc = Na),
                    ba.set_width(Na),
                    tb = Na.st,
                    void 0 == yc[tb] && (yc[tb] = 0),
                    void 0 == Md[tb] && (Md[tb] = 0),
                    Ic = yc[tb] + Md[tb] + Na.wl,
                    Ic > kc && (kc = Ic),
                    Na = Na.ts_next;
                while (Na && !Na.seqst);Sa.shrink = kc - xc;
                Nd || (Sa.space = Sa.ts_prev ? Nc(Sa) : 0);
                0 == Sa.shrink && 0 == Sa.space && Sa.type == h.CLEF && (delete Sa.seqst,
                Sa.time = Sa.ts_prev.time);
                if (!Na)
                    break;
                for (tb = 0; tb < Md.length; tb++)
                    Md[tb] = 0;
                xc = kc;
                do
                    tb = Sa.st,
                    yc[tb] = xc,
                    Sa.wr > Md[tb] && (Md[tb] = Sa.wr),
                    Sa.tp0 && 1 == ++Nd && !Jc && (Jc = Sa),
                    Sa.te0 && Nd--,
                    Sa = Sa.ts_next;
                while (!Sa.seqst)
            }
            if (wc)
                for (var Cc = wc, zc, je, Ac, Od, sd, Kc = 0, Zc = 0; Cc; Cc = Cc.ts_next)
                    if (Cc.shrink && (Kc += Cc.shrink,
                    Zc++),
                    Cc.a_gch)
                        for (zc = 0; zc < Cc.a_gch.length; zc++)
                            if (je = Cc.a_gch[zc],
                            !("g" != je.type || 0 > je.y)) {
                                if (Ac && Ac > Kc + je.x)
                                    for (sd = (Ac - Kc - je.x) / Zc; Od = Od.ts_next,
                                    Od.shrink && (Od.shrink += sd),
                                    Od != Cc; )
                                        ;
                                Od = Cc;
                                Ac = je.wh[0];
                                Kc = Zc = 0;
                                break
                            }
            if (Na = Jc) {
                do {
                    Sa = Na;
                    Nd = 1;
                    do
                        Na = Na.ts_next,
                        Na.tp0 && Nd++,
                        Na.te0 && Nd--;
                    while (0 != Nd);var Dc = void 0
                      , ub = Sa
                      , Ec = Na
                      , $c = ub.time
                      , vd = Ec.time + Ec.dur - $c
                      , ad = Nf(ub, vd / ub.tq0) * ub.tq0 / vd;
                    do
                        ub = ub.ts_next;
                    while (!ub.seqst);do
                        Ec = Ec.ts_next ? Ec.ts_next : Dc = Of(Ec);
                    while (!Ec.seqst);for (Dc = ub; ; ) {
                        Dc.dur && Dc.dur * ad < Dc.shrink && (ad = Dc.shrink / Dc.dur);
                        if (Dc == Ec)
                            break;
                        Dc = Dc.ts_next
                    }
                    for (; ; ) {
                        ub.seqst && (ub.space = (ub.time - $c) * ad,
                        $c = ub.time);
                        if (ub == Ec)
                            break;
                        ub = ub.ts_next
                    }
                    do
                        Na = Na.ts_next;
                    while (Na && !Na.tp0)
                } while (Na)
            }
            b = jf(!0);
            if (r.singleline)
                a = Pf(),
                c = b + a[0] + a[1] + Qf(W, null),
                ga.width = c * r.scale + ga.lm + ga.rm + 2;
            else {
                var Mc = c = ud(), ue = b, ob, Rc, qc = W;
                0 != ue && (Rc = jf(),
                Mc -= Rc,
                ue -= Rc);
                Rc = Pf();
                Mc -= Rc[0];
                ue += Rc[1];
                r.custos && 1 == x.length && (Mc -= 12);
                if (r.barsperstaff)
                    for (Rc = r.barsperstaff,
                    ob = qc; ob; ob = ob.ts_next)
                        ob.type != h.BAR || !ob.bar_num || 0 < --Rc || (ob.eoln = !0,
                        Rc = r.barsperstaff);
                for (ob = qc; qc; qc = qc.ts_next) {
                    if (!qc.ts_next)
                        qc = qc.ts_next;
                    else if (!qc.eoln)
                        continue;
                    a: {
                        for (var ve = void 0, ke = void 0, we = void 0, xe = void 0, bc = void 0, ye = void 0, Pd = void 0, Oa = void 0, ze = void 0, xd = void 0, N = ob, Ta = qc, Ad = Mc, cd = ue; Ta && !Ta.eoln; Ta = Ta.ts_next)
                            ;
                        for (we = Qf(N, Ta) + cd; ; ) {
                            ke = Math.ceil(we / Ad);
                            if (1 >= ke) {
                                Ta && (Ta = gf(Ta));
                                ob = Ta;
                                break a
                            }
                            ze = xd = N;
                            ye = N.x - N.shrink - cd;
                            xe = ye + Ad;
                            bc = ye + we / ke;
                            ye += we / ke * r.breaklimit;
                            for (N = N.ts_next; N != Ta && !(N.x && (N.type == h.BAR && (ze = N),
                            N.x >= ye)); N = N.ts_next)
                                ;
                            if (N == Ta) {
                                Ta && (Ta = gf(Ta));
                                ob = Ta;
                                break a
                            }
                            ve = !1;
                            for (Oa = null; N != Ta; N = N.ts_next)
                                if (Pd = N.x) {
                                    if (Pd > xe)
                                        break;
                                    if (N.type == h.BAR)
                                        if (Pd < bc)
                                            Oa = N;
                                        else {
                                            if (!Oa || Pd - bc < bc - Oa.x)
                                                Oa = N;
                                            break
                                        }
                                }
                            Oa && (N = Oa,
                            ve = !0);
                            if (!ve) {
                                for (var Pc = 0, fe = ze.time, xe = xe - 8, N = ze, Oa = null; N != Ta; N = N.ts_next)
                                    if (N.beam_st && Pc++,
                                    N.beam_end && 0 < Pc && Pc--,
                                    Pd = N.x) {
                                        if (Pd + N.wr >= xe)
                                            break;
                                        if (!Pc && !N.in_tuplet)
                                            if (0 == (N.time - fe) % (h.BLEN / 4))
                                                Oa = N;
                                            else if (!Oa || N.x < bc)
                                                Oa = N;
                                            else {
                                                if (Oa > bc)
                                                    break;
                                                if (bc - Oa.x < N.x - bc)
                                                    break;
                                                Oa = N;
                                                break
                                            }
                                    }
                                Oa && (N = Oa,
                                ve = !0)
                            }
                            if (!ve) {
                                for (Oa = N = ze; N != Ta; N = N.ts_next)
                                    if (Pd = N.x)
                                        if (N.x < bc)
                                            Oa = N;
                                        else {
                                            if (Oa > bc)
                                                break;
                                            if (bc - Oa.x < N.x - bc)
                                                break;
                                            Oa = N;
                                            break
                                        }
                                N = Oa
                            }
                            if (N.nl)
                                for (K(0, N, "Line split problem - adjust maxshrink and/or breaklimit"),
                                ke = 2,
                                N = N.ts_next; N != Ta && !(N.x && 0 >= --ke); N = N.ts_next)
                                    ;
                            N = gf(N);
                            if (!N || Ta && N.time >= Ta.time)
                                break;
                            we -= N.x - xd.x;
                            cd = 0
                        }
                        ob = N
                    }
                    if (!ob)
                        break;
                    ob.ts_prev ? (qc = ob.ts_prev,
                    ue = 0) : delete ob.nl
                }
            }
            for (te = 1.2; ; ) {
                fh();
                ba.set_sym_glue(c - b);
                if (0 != Ba) {
                    0 != b && (jc += b);
                    var qd, rd, Sc, cc, hd, vb, rc, id, dc, G, Pb, jd, pe = z;
                    z = "";
                    for (dc = 0; dc < x.length; dc++) {
                        var Yd = {}
                          , Zd = !0;
                        jd = x[dc];
                        for (G = jd.sym; G; G = G.next)
                            switch (G.type) {
                            case h.GRACE:
                                for (vb = G.extra; vb; vb = vb.next)
                                    vb.beam_st && !vb.beam_end && ba.calculate_beam(Yd, vb);
                                break;
                            case h.NOTE:
                                if (G.beam_st && !G.beam_end || Zd && !G.beam_st)
                                    Zd = !1,
                                    ba.calculate_beam(Yd, G)
                            }
                    }
                    for (id = 0; id <= S; id++)
                        for (Pb = u[id],
                        Pb.top || (Pb.top = new Float32Array(256),
                        Pb.bot = new Float32Array(256)),
                        cc = 0; 256 > cc; cc++)
                            Pb.top[cc] = 0,
                            Pb.bot[cc] = 24;
                    for (var td = void 0, ec = void 0, le = void 0, Me = void 0, Db = void 0, oa = void 0, be = void 0, Me = 0; Me < x.length; Me++)
                        if (be = x[Me],
                        oa = be.sym)
                            if (oa = oa.next) {
                                var ab, kd, wd, Eb, fc, da, pa;
                                for (pa = oa; pa; pa = pa.next)
                                    if (pa.ti1)
                                        if (0 != pa.multi)
                                            for (Eb = 0 < pa.multi ? h.SL_ABOVE : h.SL_BELOW,
                                            da = 0; da <= pa.nhd; da++)
                                                ab = pa.notes[da].ti1,
                                                (ab & 7) == h.SL_AUTO && (pa.notes[da].ti1 = ab & h.SL_DOTTED | Eb);
                                        else {
                                            wd = fc = 0;
                                            kd = 128;
                                            for (da = 0; da <= pa.nhd; da++)
                                                pa.notes[da].ti1 && (fc++,
                                                128 > kd && pa.notes[da].pit <= kd + 1 && wd++,
                                                kd = pa.notes[da].pit);
                                            if (1 >= fc)
                                                for (Eb = 0 > pa.stem ? h.SL_ABOVE : h.SL_BELOW,
                                                da = 0; da <= pa.nhd; da++) {
                                                    if (ab = pa.notes[da].ti1) {
                                                        (ab & 7) == h.SL_AUTO && (pa.notes[da].ti1 = ab & h.SL_DOTTED | Eb);
                                                        break
                                                    }
                                                }
                                            else if (0 == wd)
                                                if (fc & 1)
                                                    for (fc = (fc - 1) / 2,
                                                    Eb = h.SL_BELOW,
                                                    da = 0; da <= pa.nhd; da++)
                                                        ab = pa.notes[da].ti1,
                                                        0 != ab && (0 == fc && 22 <= pa.notes[da].pit && (Eb = h.SL_ABOVE),
                                                        (ab & 7) == h.SL_AUTO && (pa.notes[da].ti1 = ab & h.SL_DOTTED | Eb),
                                                        0 == fc-- && (Eb = h.SL_ABOVE));
                                                else
                                                    for (fc /= 2,
                                                    Eb = h.SL_BELOW,
                                                    da = 0; da <= pa.nhd; da++)
                                                        ab = pa.notes[da].ti1,
                                                        0 != ab && ((ab & 7) == h.SL_AUTO && (pa.notes[da].ti1 = ab & h.SL_DOTTED | Eb),
                                                        0 == --fc && (Eb = h.SL_ABOVE));
                                            else {
                                                kd = 128;
                                                for (da = 0; da <= pa.nhd; da++)
                                                    if (pa.notes[da].ti1) {
                                                        if (128 > kd && pa.notes[da].pit <= kd + 1) {
                                                            fc = da;
                                                            break
                                                        }
                                                        kd = pa.notes[da].pit
                                                    }
                                                Eb = h.SL_BELOW;
                                                for (da = 0; da <= pa.nhd; da++)
                                                    ab = pa.notes[da].ti1,
                                                    0 != ab && (fc == da && (Eb = h.SL_ABOVE),
                                                    (ab & 7) == h.SL_AUTO && (pa.notes[da].ti1 = ab & h.SL_DOTTED | Eb))
                                            }
                                        }
                                for (; oa; oa = oa.next)
                                    if (oa.ti1 && (20 > oa.notes[0].pit && (oa.notes[0].ti1 & 7) == h.SL_BELOW || 24 < oa.notes[oa.nhd].pit && (oa.notes[oa.nhd].ti1 & 7) == h.SL_ABOVE)) {
                                        for (Db = oa.next; Db && Db.type != h.NOTE; )
                                            Db = Db.next;
                                        if (Db) {
                                            if (Db.st != oa.st)
                                                continue;
                                            le = Db.x - oa.x - 10
                                        } else
                                            le = Ba - oa.x - 10;
                                        td = 100 > le ? 9 : 300 > le ? 12 : 16;
                                        24 < oa.notes[oa.nhd].pit && (ec = 3 * (oa.notes[oa.nhd].pit - 18) + td,
                                        oa.ymx < ec && (oa.ymx = ec),
                                        Db && Db.ymx < ec && (Db.ymx = ec),
                                        R(oa.st, !0, oa.x + 5, le, ec));
                                        20 > oa.notes[0].pit && (ec = 3 * (oa.notes[0].pit - 18) - td,
                                        oa.ymn > ec && (oa.ymn = ec),
                                        Db && Db.ymn > ec && (Db.ymn = ec),
                                        R(oa.st, !1, oa.x + 5, le, ec))
                                    }
                            }
                    Jg();
                    for (G = W; G; G = G.ts_next)
                        if (!G.invis) {
                            switch (G.type) {
                            case h.GRACE:
                                for (vb = G.extra; vb; vb = vb.next)
                                    R(G.st, !0, vb.x - 2, 4, vb.ymx + 1),
                                    R(G.st, !1, vb.x - 2, 4, vb.ymn - 1);
                                continue;
                            case h.MREST:
                                R(G.st, !0, G.x + 16, 32, G.ymx + 2);
                                continue;
                            default:
                                R(G.st, !0, G.x - G.wl, G.wl + G.wr, G.ymx + 2);
                                R(G.st, !1, G.x - G.wl, G.wl + G.wr, G.ymn - 2);
                                continue;
                            case h.NOTE:
                            }
                            0 < G.stem ? (G.stemless ? (Sc = -5,
                            hd = 10) : G.beam_st ? (Sc = 3,
                            hd = G.beam_end ? 4 : 10) : (Sc = -8,
                            hd = G.beam_end ? 11 : 16),
                            R(G.st, !0, G.x + Sc, hd, G.ymx),
                            R(G.st, !1, G.x - G.wl, G.wl + G.wr, G.ymn)) : (R(G.st, !0, G.x - G.wl, G.wl + G.wr, G.ymx),
                            G.stemless ? (Sc = -5,
                            hd = 10) : G.beam_st ? (Sc = -6,
                            hd = G.beam_end ? 4 : 10) : (Sc = -8,
                            hd = G.beam_end ? 5 : 16),
                            Sc += G.notes[0].shhd,
                            R(G.st, !1, G.x + Sc, hd, G.ymn));
                            G.notes[G.nhd].acc && (rc = G.y + 8,
                            G.ymx < rc && (G.ymx = rc),
                            R(G.st, !0, G.x, 0, rc));
                            G.notes[0].acc && (rc = G.y,
                            rc = 1 == G.notes[0].acc || 3 == G.notes[0].acc ? rc - 7 : rc - 5,
                            G.ymn > rc && (G.ymn = rc),
                            R(G.st, !1, G.x, 0, rc))
                        }
                    for (dc = 0; dc < x.length; dc++)
                        if (jd = x[dc],
                        G = jd.sym) {
                            for (Tb(G.color); G; G = G.next)
                                G.tp0 && ff(G, 0);
                            var Qd = void 0
                              , pb = void 0
                              , Fc = jd
                              , bb = Fc.sym
                              , Tc = Fc.slur_start
                              , Rd = 0;
                            if (bb) {
                                if (Tc)
                                    for (Fc.slur_start = 0; 0 != Tc; )
                                        Rd <<= 4,
                                        Rd |= Tc & 15,
                                        Tc >>= 4;
                                for (ef(bb, void 0); bb; bb = bb.next)
                                    for (; bb.slur_end || bb.sl2; ) {
                                        if (bb.slur_end)
                                            bb.slur_end--,
                                            Qd = -1;
                                        else {
                                            for (Qd = 0; Qd <= bb.nhd && !bb.notes[Qd].sl2; Qd++)
                                                ;
                                            bb.notes[Qd].sl2--;
                                            bb.sl2--
                                        }
                                        Tc = Rd & 15;
                                        pb = rf(bb);
                                        Ie(pb, bb, -1, Qd, Tc);
                                        pb.type == h.BAR && (":" == pb.bar_type[0] || "|]" == pb.bar_type || "[|" == pb.bar_type || pb.text && "1" != pb.text[0]) || (Rd >>= 4)
                                    }
                                for (bb = Fc.sym; 0 != Rd; )
                                    Tc = Rd & 15,
                                    Rd >>= 4,
                                    pb = yf(bb),
                                    Ie(bb, pb, -1, -1, Tc),
                                    pb.type == h.BAR && (":" == pb.bar_type[0] || "|]" == pb.bar_type || "[|" == pb.bar_type || pb.text && "1" != pb.text[0]) || (Fc.slur_start || (Fc.slur_start = 0),
                                    Fc.slur_start <<= 4,
                                    Fc.slur_start += Tc)
                            }
                            for (G = jd.sym; G; G = G.next)
                                G.tp0 && ff(G, 0)
                        }
                    for (id = 0; id <= S; id++)
                        for (Pb = u[id],
                        rd = Pb.topbar + 2,
                        qd = Pb.botbar - 2,
                        cc = 0; 256 > cc; cc++)
                            rd > Pb.top[cc] && (Pb.top[cc] = rd),
                            qd < Pb.bot[cc] && (Pb.bot[cc] = qd);
                    Tb();
                    for (var yd = void 0, de = void 0, Ne = void 0, Oe = void 0, re = qa.length, Oe = 0; Oe < re; Oe++)
                        if (Ne = qa[Oe],
                        de = Ne.dd,
                        yd = de.func,
                        sh[yd] && void 0 == Ne.m)
                            cf[yd](Ne);
                    if (0 <= r.measurenb) {
                        for (var Bd = void 0, Pe = void 0, Qe = void 0, gc = void 0, wa = void 0, ld = void 0, Qb = void 0, Ea = void 0, va = void 0, Cd = F, Ea = 0; Ea <= S && !Cd.st_print[Ea]; Ea++)
                            ;
                        if (!(Ea > S)) {
                            Ub(Ea);
                            1 != u[Ea].staffscale && (Pe = mc("measure").size,
                            Je("measurefont", "* " + (Pe / u[Ea].staffscale).toString()));
                            ra("measure");
                            Bd = bd("0") * E.curfont.swfac;
                            va = W;
                            Qb = E.nbar;
                            if (1 < Qb)
                                if (0 == r.measurenb)
                                    Qe = !0,
                                    wa = U(Ea, !0, 0, 20),
                                    wa < u[Ea].topbar + 14 && (wa = u[Ea].topbar + 14),
                                    na(0, wa, Qb.toString()),
                                    R(Ea, !0, 0, 20, wa + E.curfont.size + 2);
                                else if (0 == Qb % r.measurenb) {
                                    for (; ; va = va.ts_next) {
                                        switch (va.type) {
                                        case h.TIMESIG:
                                        case h.CLEF:
                                        case h.KEYSIG:
                                        case h.FMTCHG:
                                        case h.STBRK:
                                            continue
                                        }
                                        break
                                    }
                                    va.type == h.BAR && va.bar_num || (va.prev && (va = va.prev),
                                    ld = va.x + va.wr,
                                    Qe = !0,
                                    gc = Bd,
                                    10 <= Qb && (gc *= 100 <= Qb ? 3 : 2),
                                    E.curfont.box && (gc += 4),
                                    wa = U(Ea, !0, ld, gc),
                                    wa < u[Ea].topbar + 6 && (wa = u[Ea].topbar + 6),
                                    wa += 2,
                                    na(ld, wa, Qb.toString()),
                                    E.curfont.box && (wa += 2,
                                    gc += 3),
                                    wa += E.curfont.size,
                                    R(Ea, !0, ld, gc, wa),
                                    va.ymx = wa)
                                }
                            for (; va; va = va.ts_next) {
                                switch (va.type) {
                                case h.STAVES:
                                    Cd = va.sy;
                                    for (Ea = 0; Ea < S && !Cd.st_print[Ea]; Ea++)
                                        ;
                                    Ub(Ea);
                                    continue;
                                default:
                                    continue;
                                case h.BAR:
                                    if (!va.bar_num)
                                        continue
                                }
                                Qb = va.bar_num;
                                0 != r.measurenb && 0 == Qb % r.measurenb && va.next && !va.bar_mrep && (Qe || (Qe = !0),
                                gc = Bd,
                                10 <= Qb && (gc *= 100 <= Qb ? 3 : 2),
                                ld = va.x - .4 * gc,
                                wa = U(Ea, !0, ld, gc),
                                wa < u[Ea].topbar + 3 && (wa = u[Ea].topbar + 3),
                                va.next.type == h.NOTE && (0 < va.next.stem ? wa < va.next.ys - E.curfont.size && (wa = va.next.ys - E.curfont.size) : wa < va.next.y && (wa = va.next.y)),
                                wa += 2,
                                E.curfont.box && (wa += 2,
                                gc += 3),
                                na(ld, wa, Qb.toString()),
                                wa += E.curfont.size,
                                E.curfont.box && (wa += 2),
                                R(Ea, !0, ld, gc, wa),
                                va.ymx = wa)
                            }
                            E.nbar = Qb;
                            Pe && Je("measurefont", "* " + Pe.toString())
                        }
                    }
                    for (var Dd = void 0, Ed = void 0, Re = void 0, Ae = void 0, Se = void 0, md = void 0, Fa = void 0, Te = void 0, Ga = void 0, Fd = void 0, sc = void 0, Be = void 0, Ue = void 0, Ve = void 0, Ka = void 0, cb = Array(S), ee = qa.length, Ga = 0; Ga <= S; Ga++)
                        cb[Ga] = {
                            ymin: 0,
                            ymax: 0
                        };
                    for (Ga = 0; Ga < ee; Ga++)
                        Fa = qa[Ga],
                        (md = Fa.dd) && pd[md.func] && void 0 == Fa.m && (cf[md.func](Fa),
                        !md.dd_en && r.dynalign && (Fa.up ? Fa.y > cb[Fa.st].ymax && (cb[Fa.st].ymax = Fa.y) : Fa.y < cb[Fa.st].ymin && (cb[Fa.st].ymin = Fa.y)));
                    for (Ga = 0; Ga < ee; Ga++)
                        Fa = qa[Ga],
                        (md = Fa.dd) && !md.dd_en && pd[md.func] && (r.dynalign ? (sc = Fa.up ? cb[Fa.st].ymax : cb[Fa.st].ymin,
                        Fa.y = sc) : sc = Fa.y,
                        Fa.up && (sc += md.h),
                        R(Fa.st, Fa.up, Fa.x, Fa.val, sc));
                    for (Ga = 0; Ga <= S; Ga++)
                        cb[Ga] = {
                            ymin: 0,
                            ymax: 24
                        };
                    for (Ka = W; Ka; Ka = Ka.ts_next)
                        if (Ka.a_gch) {
                            Ve || (Ve = Ka);
                            Ae = null;
                            for (Re = 0; Re < Ka.a_gch.length && !(Se = Ka.a_gch[Re],
                            "g" == Se.type && (Ae = Se,
                            0 > Se.y)); Re++)
                                ;
                            Ae && (Fd = Ae.wh[0],
                            0 <= Ae.y ? (sc = U(Ka.st, !0, Ka.x, Fd),
                            sc > cb[Ka.st].ymax && (cb[Ka.st].ymax = sc)) : (sc = U(Ka.st, !1, Ka.x, Fd),
                            sc < cb[Ka.st].ymin && (cb[Ka.st].ymin = sc)))
                        }
                    if (Ve) {
                        for (Ga = 0; Ga <= S; Ga++)
                            Dd = u[Ga].botbar,
                            cb[Ga].ymin > Dd - 4 && (cb[Ga].ymin = Dd - 4),
                            Ed = u[Ga].topbar,
                            cb[Ga].ymax < Ed + 4 && (cb[Ga].ymax = Ed + 4);
                        Ub(-1);
                        for (Ka = Ve; Ka; Ka = Ka.ts_next)
                            Ka.a_gch && ba.draw_gchord(Ka, cb[Ka.st].ymin, cb[Ka.st].ymax)
                    }
                    for (Te = 0; Te < x.length; Te++)
                        if (Ue = x[Te],
                        !Ue.second && Ue.sym) {
                            var Gd = void 0, Hd, Ce, Gc, Sd, wb, V, Rb = Ue;
                            Sd = u[Rb.st].topbar + 25;
                            for (V = Rb.sym; V; V = V.next)
                                if (V.type == h.BAR && V.rbstart && !V.norepbra) {
                                    if (!V.next)
                                        break;
                                    Gd || (Gd = V,
                                    ra("repeat"));
                                    for (wb = V; V.next && (V = V.next,
                                    !V.rbstop); )
                                        ;
                                    Gc = U(Rb.st, !0, wb.x, V.x - wb.x);
                                    Sd < Gc && (Sd = Gc);
                                    wb.text && (Hd = Pa(wb.text),
                                    Gc = U(Rb.st, !0, wb.x + 4, Hd[0]),
                                    Gc += Hd[1],
                                    Sd < Gc && (Sd = Gc));
                                    V.rbstart && (V = V.prev)
                                }
                            if (V = Gd)
                                for (Ub(Rb.st, !0),
                                Gc = Sd * u[Rb.st].staffscale; V; V = V.next)
                                    if (V.rbstart && !V.norepbra) {
                                        for (wb = V; V.next && (V = V.next,
                                        !V.rbstop); )
                                            ;
                                        if (wb == V)
                                            break;
                                        Be = wb.x;
                                        Ce = V.type != h.BAR ? V.rbstop ? 0 : V.x - Ba + 4 : 1 < V.bar_type.length && "[]" != V.bar_type || "]" == V.bar_type ? 0 < wb.st && !(F.staves[wb.st - 1].flags & 64) ? V.wl : ":" == V.bar_type.slice(-1) ? 12 : ":" != V.bar_type[0] ? 0 : 8 : V.rbstop ? 0 : 8;
                                        Ce = V.x - Be - Ce;
                                        V.next || V.rbstop || Rb.bar_start || (Rb.bar_start = A(V),
                                        Rb.bar_start.type = h.BAR,
                                        Rb.bar_start.bar_type = "",
                                        delete Rb.bar_start.text,
                                        Rb.bar_start.rbstart = 1,
                                        delete Rb.bar_start.a_gch);
                                        wb.text && na(Be + 4, Gc - E.curfont.size - 3, wb.text);
                                        Xd(Be, Gc);
                                        2 == wb.rbstart && (z += "m0 20v-20");
                                        z += "h" + Ce.toFixed(1);
                                        2 == V.rbstop && (z += "v20");
                                        z += '"/>\n';
                                        R(wb.st, !0, Be, Ce, Sd + 2);
                                        V.rbstart && (V = V.prev)
                                    }
                        }
                    Ub(-1);
                    for (dc = 0; dc < x.length; dc++)
                        if (jd = x[dc],
                        jd.have_ly) {
                            for (var me = void 0, ne = void 0, We = void 0, hc = void 0, Xe = void 0, xb = void 0, De = void 0, la = void 0, db = void 0, Ca = void 0, Fb = Array(S), Td = x.length, nd = Array(Td), Ee = Array(Td), Id = Array(Td), ge = Array(Td), od = 0, Uc = 0, Ha = -1, la = 0; la < Td; la++)
                                if (Ca = x[la],
                                Ca.sym) {
                                    Ca.st != Ha && (Uc = od = 0,
                                    Ha = Ca.st);
                                    De = 0;
                                    if (Ca.have_ly)
                                        for (nd[la] || (nd[la] = []),
                                        db = Ca.sym; db; db = db.next) {
                                            if (ne = db.a_ly) {
                                                Xe = db.x;
                                                We = 10;
                                                for (xb = 0; xb < ne.length; xb++)
                                                    if (me = ne[xb]) {
                                                        Xe -= me.shift;
                                                        We = me.wh[0];
                                                        break
                                                    }
                                                hc = U(Ca.st, 1, Xe, We);
                                                od < hc && (od = hc);
                                                hc = U(Ca.st, 0, Xe, We);
                                                for (Uc > hc && (Uc = hc); De < ne.length; )
                                                    nd[la][De++] = 0;
                                                for (xb = 0; xb < ne.length; xb++)
                                                    (me = ne[xb]) && (!nd[la][xb] || me.font.size > nd[la][xb]) && (nd[la][xb] = me.font.size)
                                            }
                                        }
                                    else
                                        hc = U(Ca.st, 1, 0, Ba),
                                        od < hc && (od = hc),
                                        hc = U(Ca.st, 0, 0, Ba),
                                        Uc > hc && (Uc = hc);
                                    Fb[Ha] || (Fb[Ha] = {});
                                    Fb[Ha].top = od;
                                    Fb[Ha].bot = Uc;
                                    Ee[la] = De;
                                    0 != De && (Id[la] = Ca.pos.voc ? Ca.pos.voc == h.SL_ABOVE : x[la + 1] && x[la + 1].st == Ha && x[la + 1].have_ly ? !0 : !1,
                                    Id[la] ? Fb[Ha].a = !0 : Fb[Ha].b = !0)
                                }
                            for (la = xb = 0; la < Td; la++)
                                Ca = x[la],
                                Ca.sym && Ca.have_ly && (Id[la] ? ge[xb++] = la : (Ha = Ca.st,
                                Ub(Ha, !0),
                                0 < Ee[la] && (Fb[Ha].bot = vg(Ca, Ee[la], nd[la], Fb[Ha].bot, 1))));
                            for (; 0 <= --xb; )
                                la = ge[xb],
                                Ca = x[la],
                                Ha = Ca.st,
                                Ub(Ha, !0),
                                Fb[Ha].top = vg(Ca, Ee[la], nd[la], Fb[Ha].top, -1);
                            for (la = 0; la < Td; la++)
                                if (Ca = x[la],
                                Ca.sym) {
                                    Ha = Ca.st;
                                    if (Fb[Ha].a)
                                        for (od = Fb[Ha].top + 2,
                                        db = Ca.sym.next; db; db = db.next)
                                            db.a_ly && R(Ha, 1, db.x - 2, 10, od);
                                    if (Fb[Ha].b)
                                        if (Uc = Fb[Ha].bot - 2,
                                        0 < Ee[Ca.v])
                                            for (db = Ca.sym.next; db; db = db.next)
                                                db.a_ly && R(Ha, 0, db.x - 2, 10, Uc);
                                        else
                                            R(Ha, 0, 0, Ba, Uc)
                                }
                            break
                        }
                    Ub(-1);
                    z = pe;
                    d = Qg();
                    Rg(b);
                    var Ye, Ze, se = x.length;
                    for (Ye = 0; Ye < se; Ye++)
                        Ze = x[Ye],
                        Ze.sym && void 0 != Ze.sym.x && ba.draw_symbols(Ze);
                    var $e = void 0
                      , oe = void 0
                      , af = void 0
                      , Jd = void 0
                      , Ud = void 0
                      , Vd = void 0
                      , kb = void 0
                      , ic = void 0
                      , Gb = void 0
                      , tc = void 0
                      , he = void 0
                      , Wd = void 0
                      , Hc = void 0
                      , ma = void 0;
                    if (0 != qa.length) {
                        var ie = []
                          , Kd = [];
                        if (!r.dynalign)
                            for (Gb = S,
                            kb = u[Gb].y; 0 <= --Gb; )
                                Vd = u[Gb].y,
                                Kd[Gb] = .5 * (kb + 24 + Vd),
                                kb = Vd;
                        for (; ; ) {
                            ma = qa.shift();
                            if (!ma)
                                break;
                            if ((Hc = ma.dd) && !Hc.dd_en && (Wd = ma.s,
                            tc = Hc.glyph,
                            af = tc.indexOf("/"),
                            0 < af && (tc = 0 <= Wd.stem ? tc.slice(0, af) : tc.slice(af + 1)),
                            pd[Hc.func] ? eb(Wd.st) : dd(Wd),
                            Gb = ma.st,
                            u[Gb].topbar))
                                if (ic = ma.x,
                                kb = ma.y + u[Gb].y,
                                void 0 != ma.m ? (he = Wd.notes[ma.m],
                                ic += he.shhd * C.scale) : pd[Hc.func] && !r.dynalign && (ma.up && 0 < Gb || !ma.up && Gb < S) && (Ud = ma.up ? Kd[--Gb] : Kd[Gb++],
                                Ud -= .5 * Hc.h,
                                ma.up && kb < Ud || !ma.up && kb > Ud) && (Vd = U(Gb, !ma.up, ma.x, ma.val) + u[Gb].y,
                                ma.up && (Vd -= Hc.h),
                                ma.up && Vd > Ud || !ma.up && Vd < Ud) && (kb = Ud),
                                (Jd = w[tc]) && "function" == typeof Jd)
                                    Jd(ic, kb, ma);
                                else if (!ba.psdeco(tc, ic, kb, ma)) {
                                    rb(Wd, "deco");
                                    ma.inv && ($d(ic, kb, 0, 1, -1),
                                    ic = kb = 0);
                                    if (ma.has_val)
                                        2 != Hc.func || 0 > C.st ? nf(ic, kb, tc, ma.val / C.scale, ma.defl) : nf(ic, kb, tc, ma.val, ma.defl),
                                        ma.defl.noen && ie.push(ma.start);
                                    else if (void 0 != Hc.str)
                                        oe = Hc.str,
                                        "@" == oe[0] && ($e = oe.match(/^@([0-9.-]+),([0-9.-]+);?/),
                                        ic += Number($e[1]),
                                        kb += Number($e[2]),
                                        oe = oe.replace($e[0], "")),
                                        jg(ic, kb, tc, oe);
                                    else if (ma.lden) {
                                        var of = ma.dd.glyph;
                                        if (Ig[of])
                                            Ig[of](ic, kb, ma);
                                        else
                                            K(1, null, "No function for decoration '$1'", of)
                                    } else
                                        ca(ic, kb, tc);
                                    C.g && ae();
                                    yb(Wd, "deco")
                                }
                        }
                        qa = ie
                    }
                    eb(-1);
                    var uc;
                    for (uc = 0; uc <= S; uc++)
                        u[uc].sc_out && (z += "<g " + u[uc].scale_str + ">\n" + u[uc].sc_out + "</g>\n",
                        u[uc].sc_out = ""),
                        u[uc].output && (z += '<g transform="translate(0,' + (-u[uc].y).toFixed(1) + ')">\n' + u[uc].output + "</g>\n",
                        u[uc].output = "");
                    ja(d);
                    0 != b && (jc -= b,
                    ce &= -3);
                    for (; 0 != Le.length; )
                        Sf(Le.shift())
                }
                W = Sb;
                r.splittune ? Lc() : zd();
                if (!Sb)
                    break;
                Tf();
                if (!W)
                    break;
                W.ts_prev = null;
                var bf, pf, qf, Fe = x.length;
                for (bf = 0; bf < Fe; bf++)
                    if (qf = x[bf],
                    pf = qf.s_next,
                    qf.sym = pf)
                        pf.prev = null;
                c = ud();
                b = jf()
            }
        }
    }
    ;
    Abc.prototype.param_set_font = Je;
    Abc.prototype.parse = l;
    Abc.prototype.psdeco = function() {
        return !1
    }
    ;
    Abc.prototype.psxygl = function() {
        return !1
    }
    ;
    Abc.prototype.set_bar_num = function() {
        var a, c, b, d, e, f = x[F.top_voice].meter.wmeasure, g = E.nbar;
        for (a = W; ; a = a.ts_next) {
            if (!a)
                return;
            switch (a.type) {
            case h.METER:
                f = a.wmeasure;
            case h.CLEF:
            case h.KEY:
            case h.STBRK:
                continue;
            case h.BAR:
                a.bar_num ? E.nbar = a.bar_num : a.text && !r.contbarnb && ("1" == a.text[0] ? g = E.nbar : (E.nbar = g,
                a.bar_num = E.nbar))
            }
            break
        }
        b = a.time + f;
        if (0 == a.time)
            for (c = a.ts_next; c; c = c.ts_next)
                if (c.type == h.BAR && c.time) {
                    c.time < b && (a = c,
                    b = a.time + f);
                    break
                }
        for (d = E.nbar; a; a = a.ts_next)
            switch (a.type) {
            case h.METER:
                f = a.wmeasure;
                a.time < b && (b = a.time + f);
                break;
            case h.MREST:
                for (d += a.nmes - 1; a.ts_next && a.ts_next.type != h.BAR; )
                    a = a.ts_next;
                break;
            case h.BAR:
                if (a.bar_num && (d = a.bar_num),
                a.time < b)
                    a.text && "1" == a.text[0] && (g = d,
                    e = b - a.time);
                else {
                    b = a.time;
                    c = a;
                    do {
                        if (c.dur)
                            break;
                        if (c.type == h.BAR && c.text)
                            break;
                        c = c.next
                    } while (c && c.time == b);d++;
                    if (c && c.type == h.BAR && c.text)
                        if ("1" == c.text[0])
                            e = 0,
                            g = d;
                        else if (r.contbarnb || (d = g),
                        e) {
                            r.contbarnb && d--;
                            b += e;
                            break
                        }
                    a.bar_num = d;
                    for (b += f; a.ts_next && !a.ts_next.seqst; )
                        a = a.ts_next
                }
            }
        0 > r.measurenb && (E.nbar = d)
    }
    ;
    Abc.prototype.set_cur_sy = function(a) {
        F = a
    }
    ;
    Abc.prototype.set_dscale = Ub;
    Abc.prototype.set_font = ra;
    Abc.prototype.set_format = function(a, c) {
        var b, d, e;
        if (/.+font(-[\d])?$/.test(a))
            Je(a, c);
        else
            switch (a) {
            case "aligncomposer":
            case "barsperstaff":
            case "infoline":
            case "measurefirst":
            case "measurenb":
            case "rbmax":
            case "rbmin":
            case "shiftunison":
                b = parseInt(c);
                if (isNaN(b)) {
                    t(1, "Bad integer value");
                    break
                }
                r[a] = b;
                break;
            case "microscale":
                b = parseInt(c);
                if (isNaN(b) || 4 > b || 256 < b || b % 1) {
                    t(1, O.bad_val, "%%" + a);
                    break
                }
                Jb("uscale", b);
                break;
            case "bgcolor":
            case "fgcolor":
            case "dblrepbar":
            case "titleformat":
                r[a] = c;
                break;
            case "breaklimit":
            case "lineskipfac":
            case "maxshrink":
            case "pagescale":
            case "parskipfac":
            case "scale":
            case "slurheight":
            case "stemheight":
            case "stretchlast":
                b = parseFloat(c);
                if (isNaN(b)) {
                    t(1, O.bad_val, "%%" + a);
                    break
                }
                switch (a) {
                case "scale":
                    b /= .75;
                case "pagescale":
                    a = "scale",
                    ga.chg = !0
                }
                r[a] = b;
                break;
            case "annotationbox":
            case "gchordbox":
            case "measurebox":
            case "partsbox":
                r[a.replace("box", "font")].box = Ib(c);
                break;
            case "bstemdown":
            case "breakoneoln":
            case "cancelkey":
            case "contbarnb":
            case "custos":
            case "decoerr":
            case "dynalign":
            case "flatbeams":
            case "graceslurs":
            case "graceword":
            case "hyphencont":
            case "keywarn":
            case "linewarn":
            case "rbdbstop":
            case "singleline":
            case "squarebreve":
            case "splittune":
            case "straightflags":
            case "stretchstaff":
            case "timewarn":
            case "titlecaps":
            case "titleleft":
                r[a] = Ib(c);
                break;
            case "chordnames":
                b = c.split(",");
                r.chordnames = {};
                for (e = 0; e < b.length; e++)
                    r.chordnames["CDEFGAB"[e]] = b[e];
                break;
            case "composerspace":
            case "indent":
            case "infospace":
            case "maxstaffsep":
            case "maxsysstaffsep":
            case "musicspace":
            case "partsspace":
            case "staffsep":
            case "subtitlespace":
            case "sysstaffsep":
            case "textspace":
            case "titlespace":
            case "topspace":
            case "vocalspace":
            case "wordsspace":
                b = Va(c);
                isNaN(b) ? t(1, O.bad_val, "%%" + a) : r[a] = b;
                break;
            case "print-leftmargin":
                t(0, "$1 is deprecated - use %%printmargin instead", "%%" + a),
                a = "printmargin";
            case "printmargin":
            case "leftmargin":
            case "pagewidth":
            case "rightmargin":
                b = Va(c);
                if (isNaN(b)) {
                    t(1, O.bad_val, "%%" + a);
                    break
                }
                r[a] = b;
                ga.chg = !0;
                break;
            case "concert-score":
                "play" != r.sound && (r.sound = "concert");
                break;
            case "writefields":
                d = c.split(/\s+/);
                if (Ib(d[1]))
                    for (b = 0; b < d[0].length; b++)
                        e = d[0][b],
                        0 > r.writefields.indexOf(e) && (r.writefields += e);
                else
                    for (b = 0; b < d[0].length; b++)
                        e = d[0][b],
                        0 <= r.writefields.indexOf(e) && (r.writefields = r.writefields.replace(e, ""));
                break;
            case "dynamic":
            case "gchord":
            case "gstemdir":
            case "ornament":
            case "stemdir":
            case "vocal":
            case "volume":
                Bf(a, c);
                break;
            case "font":
                e = lc(c);
                1 >= e.length || (b = parseFloat(e[e.length - 1]),
                isNaN(b) || .5 >= b ? t(1, "Bad scale value in %%font") : Cf[e[0]] = b);
                break;
            case "fullsvg":
                if (0 != l.state) {
                    t(1, O.not_in_tune, "%%fullsvg");
                    break
                }
                r[a] = c;
                break;
            case "gracespace":
                b = c.split(/\s+/);
                for (e = 0; 3 > e; e++)
                    if (isNaN(Number(b[e]))) {
                        t(1, O.bad_val, "%%gracespace");
                        break
                    }
                for (e = 0; 3 > e; e++)
                    r[a][e] = Number(b[e]);
                break;
            case "tuplets":
                r[a] = c.split(/\s+/);
                (b = r[a][3]) && ie[b] && (r[a][3] = ie[b]);
                break;
            case "infoname":
                a: {
                    e = r.infoname.split("\n");
                    b = c[0];
                    for (d = 0; d < e.length; d++)
                        if (e[d][0] == b) {
                            1 == c.length ? e.splice(d, 1) : e[d] = c;
                            r.infoname = e.join("\n");
                            break a
                        }
                    r.infoname += "\n" + c
                }
                break;
            case "notespacingfactor":
                b = parseFloat(c);
                if (isNaN(b) || 1 > b || 2 < b) {
                    t(1, O.bad_val, "%%" + a);
                    break
                }
                e = 5;
                for (d = mb[e]; 0 <= --e; )
                    d /= b,
                    mb[e] = d;
                e = 5;
                for (d = mb[e]; ++e < mb.length; )
                    d *= b,
                    mb[e] = d;
                break;
            case "play":
                r.sound = "play";
                break;
            case "pos":
                a = c.split(/\s+/);
                Bf(a[0], a[1]);
                break;
            case "sounding-score":
                "play" != r.sound && (r.sound = "sounding");
                break;
            case "staffwidth":
                b = Va(c);
                if (isNaN(b)) {
                    t(1, O.bad_val, "%%" + a);
                    break
                }
                if (100 > b) {
                    t(1, "%%staffwidth too small");
                    break
                }
                b = r.pagewidth - b - r.leftmargin;
                if (2 > b) {
                    t(1, "%%staffwidth too big");
                    break
                }
                r.rightmargin = b;
                ga.chg = !0;
                break;
            case "textoption":
                r[a] = Gg[c];
                break;
            case "titletrim":
                b = Number(c);
                isNaN(b) ? r[a] = Ib(c) : r[a] = b;
                break;
            case "combinevoices":
                t(1, "%%combinevoices is deprecated - use %%voicecombine instead");
                break;
            case "voicemap":
                Jb("map", c);
                break;
            case "voicescale":
                Jb("scale", c);
                break;
            default:
                0 == l.state && (r[a] = c)
            }
    }
    ;
    Abc.prototype.set_pitch = function(a) {
        var c, b, d, e, f = h.BLEN, g = S + 1, k = new Int16Array(Array(2 * g));
        for (b = 0; b <= S; b++)
            c = u[b].clef,
            k[b] = Kd[c.clef_type] + 2 * c.clef_line,
            c.clefpit && (k[b] += c.clefpit),
            r.sound ? c.clef_octave && !c.clef_oct_transp && (k[b] += c.clef_octave) : c.clef_oct_transp && (k[b] -= c.clef_octave);
        for (c = W; c != a; c = c.ts_next)
            switch (b = c.st,
            c.type) {
            case h.CLEF:
                k[b] = Kd[c.clef_type] + 2 * c.clef_line;
                c.clefpit && (k[b] += c.clefpit);
                r.sound ? c.clef_octave && !c.clef_oct_transp && (k[b] += c.clef_octave) : c.clef_oct_transp && (k[b] -= c.clef_octave);
                yd(c);
                break;
            case h.GRACE:
                for (b = c.extra; b; b = b.next) {
                    d = k[b.st];
                    if (0 != d && !c.p_v.key.k_drum)
                        for (g = 0; g <= b.nhd; g++)
                            e = b.notes[g],
                            e.pit += d;
                    b.ymn = 3 * (b.notes[0].pit - 18) - 2;
                    b.ymx = 3 * (b.notes[b.nhd].pit - 18) + 2
                }
                yd(c);
                break;
            case h.KEY:
                c.k_y_clef = k[b];
            default:
                yd(c);
                break;
            case h.MREST:
                if (c.invis)
                    break;
                c.y = 12;
                c.ymx = 39;
                c.ymn = -2;
                break;
            case h.REST:
                if (1 == x.length) {
                    c.y = 12;
                    c.ymx = 24;
                    c.ymn = 0;
                    break
                }
            case h.NOTE:
                d = k[b];
                if (0 != d && !c.p_v.key.k_drum)
                    for (g = c.nhd; 0 <= g; g--)
                        c.notes[g].opit = c.notes[g].pit,
                        c.notes[g].pit += d;
                c.type == h.NOTE ? (c.ymx = 3 * (c.notes[c.nhd].pit - 18) + 4,
                c.ymn = 3 * (c.notes[0].pit - 18) - 4) : (c.y = 6 * ((c.notes[0].pit - 18) / 2 | 0),
                c.ymx = c.y + Hg[5 - c.nflags][0],
                c.ymn = c.y - Hg[5 - c.nflags][1]);
                c.dur < f && (f = c.dur)
            }
        a || (wd = f)
    }
    ;
    Abc.prototype.set_scale = dd;
    Abc.prototype.set_stem_dir = function() {
        for (var a, c, b, d, e, f, g, k = [], l = W, n = F, u = n.nstaff; l; ) {
            for (a = 0; a <= u; a++)
                k[a] = [];
            g = [];
            for (c = l; c && c.type != h.BAR; c = c.ts_next)
                if (c.type == h.STAVES) {
                    if (c != l)
                        break;
                    n = l.sy;
                    for (a = u; a <= n.nstaff; a++)
                        k[a] = [];
                    u = n.nstaff
                } else if (!(c.type != h.NOTE && c.type != h.REST || c.invis)) {
                    a = c.st;
                    if (a > u)
                        throw c = "*** fatal set_stem_dir(): bad staff number " + a + " max " + u,
                        K(2, null, c),
                        Error(c);
                    b = c.v;
                    d = g[b];
                    d || (d = {
                        st1: -1,
                        st2: -1
                    },
                    g[b] = d);
                    0 > d.st1 ? d.st1 = a : d.st1 != a && (a > d.st1 ? a > d.st2 && (d.st2 = a) : (d.st1 > d.st2 && (d.st2 = d.st1),
                    d.st1 = a));
                    e = k[a];
                    d = n.voices[b].range;
                    for (b = e.length; 0 <= --b && (f = e[b],
                    f.v != d); )
                        ;
                    if (0 > b) {
                        f = {
                            v: d,
                            ymx: 0,
                            ymn: 24
                        };
                        for (b = 0; b < e.length; b++)
                            if (d < e[b].v) {
                                e.splice(b, 0, f);
                                break
                            }
                        b == e.length && e.push(f)
                    }
                    c.type == h.NOTE && (c.ymx > f.ymx && (f.ymx = c.ymx),
                    c.ymn < f.ymn && (f.ymn = c.ymn),
                    c.xstem && (c.ts_prev.st != a - 1 || c.ts_prev.type != h.NOTE ? (K(1, l, "Bad !xstem!"),
                    c.xstem = !1) : (c.ts_prev.multi = 1,
                    c.multi = 1,
                    c.stemless = !0)))
                }
            for (; l != c; l = l.ts_next)
                if (!l.multi) {
                    switch (l.type) {
                    default:
                        continue;
                    case h.REST:
                        if (void 0 != l.combine && 0 > l.combine || !l.ts_next || l.ts_next.type != h.REST || l.ts_next.st != l.st || l.time != l.ts_next.time || l.dur != l.ts_next.dur || l.a_gch && l.ts_next.a_gch || l.invis)
                            break;
                        l.ts_next.a_gch && (l.a_gch = l.ts_next.a_gch);
                        lb(l.ts_next);
                    case h.NOTE:
                    case h.GRACE:
                    }
                    a = l.st;
                    b = l.v;
                    d = g[b];
                    e = k[a];
                    if (d && 0 <= d.st2)
                        a == d.st1 ? l.multi = -1 : a == d.st2 && (l.multi = 1);
                    else if (1 >= e.length)
                        l.floating && (l.multi = a == x[b].st ? -1 : 1);
                    else {
                        d = n.voices[b].range;
                        for (b = e.length; 0 <= --b && e[b].v != d; )
                            ;
                        0 > b || (b == e.length - 1 ? l.multi = -1 : (l.multi = 1,
                        0 != b && b + 2 == e.length && (e[b].ymn - r.stemheight > e[b + 1].ymx && (l.multi = -1),
                        a = l.ts_next,
                        l.ts_prev && l.ts_prev.time == l.time && l.ts_prev.st == l.st && l.notes[l.nhd].pit == l.ts_prev.notes[0].pit && l.beam_st && l.beam_end && (!a || a.st != l.st || a.time != l.time) && (l.multi = -1))))
                    }
                }
            for (; l && l.type == h.BAR; )
                l = l.ts_next
        }
    }
    ;
    Abc.prototype.set_stems = function() {
        var a, c, b, d, e, f, g, k;
        for (a = W; a; a = a.ts_next)
            if (a.type != h.NOTE) {
                if (a.type == h.GRACE) {
                    g = k = a.mid;
                    for (b = a.extra; b; b = b.next)
                        c = Ge(a, b.dur),
                        b.head = c[0],
                        b.dots = c[1],
                        b.nflags = c[2],
                        c = 15,
                        1 < b.nflags && (c += 1.2 * (b.nflags - 1)),
                        e = 3 * (b.notes[0].pit - 18),
                        f = 3 * (b.notes[b.nhd].pit - 18),
                        0 <= a.stem ? (b.y = e,
                        b.ys = f + c,
                        f = Math.round(b.ys)) : (b.y = f,
                        b.ys = e - c,
                        e = Math.round(b.ys)),
                        f += 2,
                        e -= 2,
                        e < g ? g = e : f > k && (k = f),
                        b.ymx = f,
                        b.ymn = e;
                    a.ymx = k;
                    a.ymn = g
                }
            } else {
                Gf(a);
                b = a.nflags;
                if (a.beam_st && !a.beam_end) {
                    a.feathered_beam && (b = ++a.nflags);
                    for (c = a.next; c.type != h.NOTE || (a.feathered_beam && c.nflags++,
                    !c.beam_end); c = c.next)
                        ;
                    c.nflags > b && (b = c.nflags)
                } else if (!a.beam_st && a.beam_end) {
                    for (c = a.prev; !c.beam_st; c = c.prev)
                        ;
                    c.nflags > b && (b = c.nflags)
                }
                c = r.stemheight;
                switch (b) {
                case 2:
                    c += 0;
                    break;
                case 3:
                    c += 4;
                    break;
                case 4:
                    c += 8;
                    break;
                case 5:
                    c += 12
                }
                1 != (d = a.p_v.scale) && (c *= .5 * (d + 1));
                e = 3 * (a.notes[0].pit - 18);
                0 < a.nhd ? (c -= 2,
                f = 3 * (a.notes[a.nhd].pit - 18)) : f = e;
                a.ntrem && (c += 2 * a.ntrem);
                a.stemless ? (0 <= a.stem ? (a.y = e,
                a.ys = f) : (a.ys = e,
                a.y = f),
                -4 == b && (e -= 6),
                a.ymx = f + 4,
                a.ymn = e - 4) : 0 <= a.stem ? (26 < a.notes[a.nhd].pit && (0 >= b || !a.beam_st || !a.beam_end) && (c -= 2,
                28 < a.notes[a.nhd].pit && (c -= 2)),
                a.y = e,
                a.notes[0].ti1 && (e -= 3),
                a.ymn = e - 4,
                a.ys = f + c,
                a.ys < a.mid && (a.ys = a.mid),
                a.ymx = a.ys + 2.5 | 0) : (18 > a.notes[0].pit && (0 >= b || !a.beam_st || !a.beam_end) && (c -= 2,
                16 > a.notes[0].pit && (c -= 2)),
                a.ys = e - c,
                a.ys > a.mid && (a.ys = a.mid),
                a.ymn = a.ys - 2.5 | 0,
                a.y = f,
                a.notes[a.nhd].ti1 && (f += 3),
                a.ymx = f + 4)
            }
    }
    ;
    Abc.prototype.set_sym_glue = function(a) {
        var c, b, d, e, f = 0, g = 0, k = 0, l = 0, n = 0;
        for (c = W; c; c = c.ts_next)
            c.type != h.GRACE || d || (d = c),
            c.seqst && (f += c.shrink,
            c.space ? c.space < c.shrink ? (n += c.shrink,
            g += c.shrink) : g += c.space : l += c.shrink);
        if (0 == g)
            Ba = 0;
        else {
            b = !Sb || Sb.type == h.BLOCK || Le.length;
            if (f >= a) {
                f > a && K(1, c, "Line too much shrunk $1 $2 $3", f.toFixed(1), g.toFixed(1), a.toFixed(1));
                k = 0;
                for (c = W; c; c = c.ts_next)
                    c.seqst && (k += c.shrink),
                    c.x = k;
                te = 0
            } else if (b && g + l > a * (1 - r.stretchlast) || !b && (g + l > a || r.stretchstaff)) {
                g == n && (g += 5);
                for (b = 4; 0 <= --b; ) {
                    e = (a - l - n) / (g - n);
                    k = n = g = 0;
                    for (c = W; c; c = c.ts_next)
                        c.seqst && (c.space ? c.space * e <= c.shrink ? (n += c.shrink,
                        g += c.shrink,
                        k += c.shrink) : (g += c.space,
                        k += c.space * e) : k += c.shrink),
                        c.x = k;
                    if (.1 > Math.abs(k - a))
                        break
                }
                te = e
            } else
                for (e = (a - l - n) / g,
                te < e && (e = te),
                c = W; c; c = c.ts_next)
                    c.seqst && (k += c.space * e <= c.shrink ? c.shrink : c.space * e),
                    c.x = k;
            Ba = k;
            for (c = d; c; c = c.ts_next)
                if (c.type == h.GRACE)
                    for (k = c.gr_shift ? c.prev.x + c.prev.wr : c.x - c.wl,
                    a = c.extra; a; a = a.next)
                        a.x += k
        }
    }
    ;
    Abc.prototype.set_tsfirst = function(a) {
        W = a
    }
    ;
    Abc.prototype.set_vp = function(a) {
        for (var c, b, d, e, f; ; ) {
            b = a.shift();
            if (!b)
                break;
            if ("=" == b[b.length - 1] && 0 == a.length) {
                t(1, O.bad_val, b);
                break
            }
            switch (b) {
            case "clef=":
                c = a.shift();
                break;
            case "clefpitch=":
                if (b = a.shift())
                    if (e = cd.indexOf(b[0]),
                    0 <= e) {
                        switch (b[1]) {
                        case "'":
                            e += 7;
                            break;
                        case ",":
                            e -= 7,
                            "," == b[2] && (e -= 7)
                        }
                        f = 4 - e;
                        break
                    }
                t(1, O.bad_val, b);
                break;
            case "octave=":
            case "uscale=":
                e = parseInt(a.shift());
                isNaN(e) ? t(1, O.bad_val, b) : k[b.slice(0, -1)] = e;
                break;
            case "cue=":
                k.scale = "on" == a.shift() ? .7 : 1;
                break;
            case "instrument=":
                k.transp = yc(a.shift(), "instr");
                break;
            case "map=":
                k.map = a.shift();
                break;
            case "name=":
            case "nm=":
                k.nm = a.shift();
                '"' == k.nm[0] && (k.nm = k.nm.slice(1, -1));
                k.new_name = !0;
                break;
            case "stem=":
            case "pos=":
                b = "pos=" == b ? a.shift().split(" ") : ["stm", a.shift()];
                e = ie[b[1]];
                if (void 0 == e) {
                    t(1, O.bad_val, b[0]);
                    break
                }
                d || (d = {});
                d[b[0]] = e;
                break;
            case "scale=":
                e = parseFloat(a.shift());
                isNaN(e) || .6 > e || 1.5 < e ? t(1, O.bad_val, "%%voicescale") : k.scale = e;
                break;
            case "score=":
                if (r.sound)
                    break;
                b = a.shift();
                0 > b.indexOf("/") && (b += "/c");
                k.transp = yc(b);
                break;
            case "shift=":
                k.shift = yc(a.shift());
                break;
            case "sound=":
            case "transpose=":
                if (!r.sound)
                    break;
                k.transp = yc(a.shift());
                break;
            case "subname=":
            case "sname=":
            case "snm=":
                k.snm = a.shift();
                '"' == k.snm[0] && (k.snm = k.snm.slice(1, -1));
                break;
            case "stafflines=":
                e = hh(a.shift());
                void 0 == e ? t(1, "Bad %%stafflines value") : void 0 != k.st ? H.staves[k.st].stafflines = e : k.stafflines = e;
                break;
            case "staffnonote=":
                e = parseInt(a.shift());
                isNaN(e) ? t(1, "Bad %%staffnonote value") : k.staffnonote = e;
                break;
            case "staffscale=":
                e = parseFloat(a.shift());
                isNaN(e) || .3 > e || 2 < e ? t(1, "Bad %%staffscale value") : k.staffscale = e;
                break;
            default:
                switch (b.slice(0, 4)) {
                case "treb":
                case "bass":
                case "alto":
                case "teno":
                case "perc":
                    c = b;
                    break;
                default:
                    0 <= "GFC".indexOf(b[0]) ? c = b : "=" == b.slice(-1) && a.shift()
                }
            }
        }
        if (d)
            for (b in k.pos = A(k.pos),
            d)
                d.hasOwnProperty(b) && (k.pos[b] = d[b]);
        c && (c = Uf(c)) && (f && (c.clefpit = f),
        tg(c))
    }
    ;
    Abc.prototype.set_v_param = Jb;
    Abc.prototype.set_width = Lf;
    Abc.prototype.sort_pitch = mf;
    Abc.prototype.strwh = Pa;
    Abc.prototype.stv_g = function() {
        return C
    }
    ;
    Abc.prototype.svg_flush = zd;
    Abc.prototype.syntax = t;
    Abc.prototype.unlksym = lb;
    Abc.prototype.use_font = Kb;
    Abc.prototype.xy_str = na;
    Abc.prototype.xygl = ca;
    var yg
}
;
var Abc = abc2svg.Abc;
"object" == typeof module && "object" == typeof exports && (exports.abc2svg = abc2svg,
exports.Abc = Abc);
abc2svg.loadjs || (abc2svg.loadjs = function(w, A, xa) {
    xa && xa()
}
);
abc2svg.modules = {
    ambitus: {
        fn: "ambitus-1.js"
    },
    beginps: {
        fn: "psvg-1.js"
    },
    "break": {
        fn: "break-1.js"
    },
    capo: {
        fn: "capo-1.js"
    },
    clip: {
        fn: "clip-1.js"
    },
    clairnote: {
        fn: "clair-1.js"
    },
    voicecombine: {
        fn: "combine-1.js"
    },
    diagram: {
        fn: "diag-1.js"
    },
    equalbars: {
        fn: "equalbars-1.js"
    },
    grid: {
        fn: "grid-1.js"
    },
    grid2: {
        fn: "grid2-1.js"
    },
    MIDI: {
        fn: "MIDI-1.js"
    },
    pageheight: {
        fn: "page-1.js"
    },
    percmap: {
        fn: "perc-1.js"
    },
    soloffs: {
        fn: "soloffs-1.js"
    },
    sth: {
        fn: "sth-1.js"
    },
    temperament: {
        fn: "temper-1.js"
    },
    nreq: 0,
    hooks: [],
    g_hooks: [],
    load: function(w, A, xa) {
        function K() {
            return "object" == typeof user && user.errmsg ? user.errmsg : "function" == typeof printErr ? printErr : "function" == typeof alert ? function(t) {
                alert(t)
            }
            : "object" == typeof console ? console.log : function() {}
        }
        var ea, t = this.nreq;
        w = w.match(/(^|\n)(%%|I:).+?\b/g);
        if (!w)
            return !0;
        this.cbf = A || function() {}
        ;
        this.errmsg = xa || K();
        for (A = 0; A < w.length; A++)
            (ea = abc2svg.modules[w[A].replace(/\n?(%%|I:)/, "")]) && !ea.loaded && (ea.loaded = !0,
            this.nreq++,
            abc2svg.loadjs(ea.fn, function() {
                0 == --abc2svg.modules.nreq && abc2svg.modules.cbf()
            }, function() {
                abc2svg.modules.errmsg("error loading " + ea.fn);
                0 == --abc2svg.modules.nreq && abc2svg.modules.cbf()
            }));
        return this.nreq == t
    }
};
abc2svg.version = "1.19.5";
abc2svg.vdate = "2019-06-12";
abc2svg.MIDI = {
    do_midi: function(w) {
        function A(t) {
            var w = Number(t);
            if (!isNaN(w))
                return t = 7 * (w / 12 | 0) - 19,
                w %= 12,
                t += K[w],
                note = {
                    pit: t
                },
                ea[w] && (note.acc = ea[w]),
                note
        }
        function xa(t) {
            if (t.match(/^([_^=]*)([A-Ga-g])([,']*)$/))
                return t.match(/[A-Z]/) && (t = t.toLowerCase(),
                t = 0 < t.indexOf("'") ? t.replace("'", "") : t + ","),
                t
        }
        var K = new Int8Array([0, 0, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]), ea = new Int8Array([0, 1, 0, -1, 0, 0, 1, 0, -1, 0, -1, 0]), t, ya;
        ya = this.get_maps();
        var U = w.split(/\s+/);
        switch (U[1]) {
        case "channel":
            if ("10" != U[2])
                break;
            this.set_v_param("midictl", "0 1");
            break;
        case "drummap":
            if ("play" != this.cfmt().sound)
                break;
            w = xa(U[2]);
            t = A(U[3]);
            if (!w || !t) {
                this.syntax(1, this.errs.bad_val, "%%MIDI drummap");
                break
            }
            ya.MIDIdrum || (ya.MIDIdrum = {});
            ya.MIDIdrum[w] = [null, t];
            this.set_v_param("mididrum", "MIDIdrum");
            break;
        case "program":
            t = void 0 != U[3] ? U[3] : U[2];
            t = parseInt(t);
            if (isNaN(t) || 0 > t || 127 < t) {
                this.syntax(1, "Bad program in %%MIDI");
                break
            }
            2 <= this.parse.state ? "play" == this.cfmt().sound && (ya = this.new_block("midiprog"),
            ya.instr = t) : this.set_v_param("instr", t);
            break;
        case "control":
            w = parseInt(U[2]),
            isNaN(w) || 0 > w || 127 < w ? this.syntax(1, "Bad controller number in %%MIDI") : (t = parseInt(U[3]),
            isNaN(t) || 0 > t || 127 < t ? this.syntax(1, "Bad controller value in %%MIDI") : 2 <= this.parse.state ? "play" == this.cfmt().sound && (ya = this.new_block("midictl"),
            ya.ctrl = w,
            ya.val = t) : this.set_v_param("midictl", U[2] + " " + U[3]))
        }
    },
    set_midi: function(w) {
        var A, xa, K = this.get_curvoice();
        for (A = 0; A < w.length; A++)
            switch (w[A]) {
            case "instr=":
                K.instr = w[A + 1];
                break;
            case "midictl=":
                K.midictl || (K.midictl = []);
                xa = w[A + 1].split(" ");
                K.midictl[xa[0]] = Number(xa[1]);
                break;
            case "mididrum=":
                K.map || (K.map = {}),
                K.map = w[A + 1]
            }
    },
    do_pscom: function(w, A) {
        "MIDI " == A.slice(0, 5) ? abc2svg.MIDI.do_midi.call(this, A) : w(A)
    },
    set_vp: function(w, A) {
        abc2svg.MIDI.set_midi.call(this, A);
        w(A)
    },
    set_hooks: function(w) {
        w.do_pscom = abc2svg.MIDI.do_pscom.bind(w, w.do_pscom);
        w.set_vp = abc2svg.MIDI.set_vp.bind(w, w.set_vp)
    }
};
abc2svg.modules.hooks.push(abc2svg.MIDI.set_hooks);
abc2svg.modules.MIDI.loaded = !0;
abc2svg.perc = {
    do_perc: function(w) {
        function A(t) {
            var w, A, R = Number(t);
            if (isNaN(R)) {
                if (A = t.match(/^([_^=]*)([A-Ga-g])([,']*)$/)) {
                    w = "CDEFGABcdefgab".indexOf(A[2]) + 16;
                    switch (A[3]) {
                    case "'":
                        w += 7 * A[3].length;
                        break;
                    case ",":
                        w -= 7 * A[3].length
                    }
                    note = {
                        pit: w
                    };
                    switch (A[1]) {
                    case "^":
                        note.acc = 1;
                        break;
                    case "_":
                        note.acc = -1
                    }
                    return note
                }
                t = t.toLowerCase(t);
                A = t[0];
                for (w = 0; ; ) {
                    w = t.indexOf("-", w);
                    if (0 > w)
                        break;
                    w += 1;
                    A += "-" + t[w]
                }
                R = ea[A];
                if (!R)
                    switch (t[0]) {
                    case "c":
                        switch (t[1]) {
                        case "a":
                            R = ea.ca;
                            break;
                        case "l":
                            R = ea.cl;
                            break;
                        case "o":
                            R = ea.co
                        }
                        break;
                    case "h":
                    case "l":
                        if (w = t.indexOf("-"),
                        "t" == t[w + 1])
                            switch (t[1]) {
                            case "i":
                            case "o":
                                R = ea[A + t[1]]
                            }
                    }
            }
            if (R)
                return t = 7 * (R / 12 | 0) - 19,
                R %= 12,
                t += xa[R],
                note = {
                    pit: t
                },
                K[R] && (note.acc = K[R]),
                note
        }
        var xa = new Int8Array([0, 0, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6]), K = new Int8Array([0, 1, 0, -1, 0, 0, 1, 0, -1, 0, -1, 0]), ea = {
            "a-b-d": 35,
            "a-s": 38,
            "b-d-1": 36,
            ca: 69,
            cl: 75,
            co: 56,
            "c-c": 52,
            "c-c-1": 49,
            "c-c-2": 57,
            "c-h-h": 42,
            "e-s": 40,
            "h-a": 67,
            "h-b": 60,
            "h-c": 39,
            "h-f-t": 43,
            "h-m-t": 48,
            "h-ti": 65,
            "h-to": 50,
            "h-w-b": 76,
            "l-a": 68,
            "l-b": 61,
            "l-c": 64,
            "l-f-t": 41,
            "l-g": 74,
            "l-m-t": 47,
            "l-ti": 66,
            "l-to": 45,
            "l-w": 72,
            "l-w-b": 77,
            m: 70,
            "m-c": 78,
            "m-h-c": 62,
            "m-t": 80,
            "o-c": 79,
            "o-h-c": 63,
            "o-h-h": 46,
            "o-t": 81,
            "p-h-h": 44,
            "r-b": 53,
            "r-c-1": 51,
            "r-c-2": 59,
            "s-c": 55,
            "s-g": 73,
            "s-s": 37,
            "s-w": 71,
            t: 54,
            v: 58
        }, t, ya = this.get_maps(), U = w.split(/\s+/);
        if (w = function(t) {
            if (t.match(/^([_^]*)([A-Ga-g])([,']*)$/))
                return t.match(/[A-Z]/) && (t = t.toLowerCase(),
                t = 0 < t.indexOf("'") ? t.replace("'", "") : t + ","),
                t
        }(U[1])) {
            if ("play" != this.cfmt().sound) {
                if (!U[3])
                    return;
                ya.MIDIdrum || (ya.MIDIdrum = {});
                t = A(w);
                if (!t) {
                    this.syntax(1, this.errs.bad_val, "%%percmap");
                    return
                }
                delete t.acc;
                ya.MIDIdrum[w] = [[U[3]], t]
            } else {
                t = A(U[2]);
                if (!t) {
                    this.syntax(1, this.errs.bad_val, "%%percmap");
                    return
                }
                ya.MIDIdrum || (ya.MIDIdrum = {});
                ya.MIDIdrum[w] = [null, t]
            }
            this.set_v_param("perc", "MIDIdrum")
        } else
            this.syntax(1, this.errs.bad_val, "%%percmap")
    },
    set_perc: function(w) {
        var A, xa = this.get_curvoice();
        for (A = 0; A < w.length; A++)
            switch (w[A]) {
            case "perc=":
                xa.map || (xa.map = {}),
                xa.map = w[A + 1],
                xa.midictl || (xa.midictl = {}),
                xa.midictl[0] = 1
            }
    },
    do_pscom: function(w, A) {
        "percmap " == A.slice(0, 8) ? abc2svg.perc.do_perc.call(this, A) : w(A)
    },
    set_vp: function(w, A) {
        abc2svg.perc.set_perc.call(this, A);
        w(A)
    },
    set_hooks: function(w) {
        w.do_pscom = abc2svg.perc.do_pscom.bind(w, w.do_pscom);
        w.set_vp = abc2svg.perc.set_vp.bind(w, w.set_vp)
    }
};
abc2svg.modules.hooks.push(abc2svg.perc.set_hooks);
abc2svg.modules.percmap.loaded = !0;
