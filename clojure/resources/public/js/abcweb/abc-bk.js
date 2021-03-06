//~ Revision: 193, Copyright (C) 2014-2017: Willem Vree, contributions Stéphane David.
//~ This program is free software; you can redistribute it and/or modify it under the terms of the
//~ GNU General Public License as published by the Free Software Foundation; either version 2 of
//~ the License, or (at your option) any later version.
//~ This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
//~ without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//~ See the GNU General Public License for more details. <http://www.gnu.org/licenses/gpl.html>.
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.owns = function(e, k) {
    return Object.prototype.hasOwnProperty.call(e, k)
}
;
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, k, n) {
    if (n.get || n.set)
        throw new TypeError("ES3 does not support getters and setters.");
    e != Array.prototype && e != Object.prototype && (e[k] = n.value)
}
;
$jscomp.getGlobal = function(e) {
    return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(e, k, n, t) {
    if (k) {
        n = $jscomp.global;
        e = e.split(".");
        for (t = 0; t < e.length - 1; t++) {
            var p = e[t];
            p in n || (n[p] = {});
            n = n[p]
        }
        e = e[e.length - 1];
        t = n[e];
        k = k(t);
        k != t && null != k && $jscomp.defineProperty(n, e, {
            configurable: !0,
            writable: !0,
            value: k
        })
    }
}
;
$jscomp.polyfill("Object.assign", function(e) {
    return e ? e : function(e, n) {
        for (var k = 1; k < arguments.length; k++) {
            var p = arguments[k];
            if (p)
                for (var A in p)
                    $jscomp.owns(p, A) && (e[A] = p[A])
        }
        return e
    }
}, "es6-impl", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {}
    ;
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}
;
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(e) {
    return $jscomp.SYMBOL_PREFIX + (e || "") + $jscomp.symbolCounter_++
}
;
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var e = $jscomp.global.Symbol.iterator;
    e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.arrayIterator(this);
        }
    });
    $jscomp.initSymbolIterator = function() {}
}
;
$jscomp.arrayIterator = function(e) {
    var k = 0;
    return $jscomp.iteratorPrototype(function() {
        return k < e.length ? {
            done: !1,
            value: e[k++]
        } : {
            done: !0
        }
    })
}
;
$jscomp.iteratorPrototype = function(e) {
    $jscomp.initSymbolIterator();
    e = {
        next: e
    };
    e[$jscomp.global.Symbol.iterator] = function() {
        return this
    }
    ;
    return e
}
;
$jscomp.iteratorFromArray = function(e, k) {
    $jscomp.initSymbolIterator();
    e instanceof String && (e += "");
    var n = 0
    , t = {
        next: function() {
            if (n < e.length) {
                var p = n++;
                return {
                    value: k(p, e[p]),
                    done: !1
                }
            }
            t.next = function() {
                return {
                    done: !0,
                    value: void 0
                }
            }
            ;
            return t.next()
        }
    };
    t[Symbol.iterator] = function() {
        return t
    }
    ;
    return t
}
;
$jscomp.polyfill("Array.prototype.keys", function(e) {
    return e ? e : function() {
        return $jscomp.iteratorFromArray(this, function(e) {
            return e
        })
    }
}, "es6-impl", "es3");
$jscomp.findInternal = function(e, k, n) {
    e instanceof String && (e = String(e));
    for (var t = e.length, p = 0; p < t; p++) {
        var A = e[p];
        if (k.call(n, A, p, e))
            return {
                i: p,
                v: A
            }
    }
    return {
        i: -1,
        v: void 0
    }
}
;
$jscomp.polyfill("Array.prototype.find", function(e) {
    return e ? e : function(e, n) {
        return $jscomp.findInternal(this, e, n).v
    }
}, "es6-impl", "es3");

console.log("jscomp == ");

var msc_VERSION = 44, opt, onYouTubeIframeAPIReady, msc_credits, media_height, times_arr, offset_js, abc_arr, lpRec, media_file, abc_enc, play_list;
(function() {
    console.log("top fn");
    function e() {
        opt = Object.assign(opt, aa);
        $("#yubuse").prop("checked", !1);
        $("#yvdlbl, #vidyub").css("display", "none");
        msc_credits = void 0;
        $("#credits").html("");
        media_height = void 0;
        $("#buttons").css("height", "");
        ba = "";
        r = 0;
        l = null
    }
    console.log("top fn");
    function k(a, b, c, d, f, e, l) {
	console.log("k");
        this.xs = a;
        this.ymin = b;
        this.ymax = c;
        this.times = d;
        this.times.unshift(0);
        this.tixbts = l;
        this.line = 0;
        this.msre = 1;
        this.width = 0;
        this.wijzer = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
        this.wijzer.attr("id", "wijzer");
        this.wijzer.css("overflow", "visible");
        this.shade = $(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
        this.shade.attr({
            width: "100%",
            height: "100%"
        });
        this.shade.attr("id", "shade");
        this.wijzer.append(this.shade);
        this.tiktak = $(document.createElementNS("http://www.w3.org/2000/svg", "text"));
        this.tiktak.attr("y", 5);
        this.tiktak.css({
            fill: "green",
            stroke: "green",
            "text-anchor": "end",
            "font-size": "xx-large"
        });
        this.wijzer.append(this.tiktak);
        this.atag = $(document.createElementNS("http://www.w3.org/2000/svg", "text"));
        this.atag.attr("id", "atag");
        this.atag.text("<");
        this.atag.css({
            fill: "red",
            stroke: "red",
            "text-anchor": "middle"
        });
        this.btag = $(document.createElementNS("http://www.w3.org/2000/svg", "text"));
        this.btag.attr("id", "btag");
        this.btag.text(">");
        this.btag.css({
            fill: "red",
            stroke: "red",
            "text-anchor": "middle"
        });
        "undefined" == typeof lpRec && (lpRec = {
            loopBtn: 1,
            loopStart: 0,
            loopEnd: d[d.length - 1]
        },
					$("#lopctl").prop("checked", !1),
					opt.lopctl = 0);
        this.hmargin = 100;
        this.vmargin = 50;
        this.tmargin = 0 <= opt.top_margin ? opt.top_margin : this.vmargin;
        this.lastSync = 0;
        this.setScale();
        this.cursorTime = 0;
        this.time_ix = 1;
        this.tixlb = f;
        this.lbtix = e;
        this.repcnt = 1;
        this.tAbcLast = this.nseqCur = this.noCursor = 0
    }
    function n() {
        this.paused = !0;
        this.currentTime = 0;
        this.klok = -1;
        this.step = 200;
        this.playing = 0;
        ja(.1, 4, .05)
    }
    function t(a, b, c) {
        var d = a != v.scrollLeft
        , f = b != v.scrollTop;
        if (d || f)
            ka ? (v.style["scroll-behavior"] = c || d ? "auto" : "smooth",
		  v.scroll(a, b)) : (d && (v.scrollLeft = a),
				     f && $(v).animate({
					 scrollTop: b
				     }))
    }
    function p() {
        var a = $("#abclbl")
        , b = a.html()
        , c = $("#impbox").prop("checked");
        a.toggleClass("abcimp", c);
        a.html(c ? b.replace("score file", "<b>import</b>") : b.replace("<b>import</b>", "score file"));
        c && !opt.btns && $("#btns").click()
    }
    function A(a, b) {
        if (0 > a.indexOf("//# This page"))
            alert("not a preload file");
        else {
            a = b.replace(/\n/g, "");
            var c = a.match(/offset_js = (.*);/);
            1 < c.length && (q = offset_js = parseFloat(c[1]));
            var c = a.match(/times_arr = (.*);abc_arr/), d;
            1 < c.length && (d = la(JSON.parse(c[1])));
            g && (g.times = d,
		  g.times.unshift(0));
            $("#impbox").prop("checked", !1);
            p()
        }
    }
    function ma(a) {
        var b = a.slice(0, 4E3);
        if ($("#impbox").prop("checked"))
            A(b, a);
        else if (0 <= b.indexOf("//# This page") || 0 <= b.indexOf("play_list")) {
            e();
            eval(a);
            for (var c in aa)
                c in opt || (opt[c] = aa[c]);
            G()
        } else
            0 <= b.indexOf("X:") ? na(a) : -1 == b.indexOf("<?xml ") ? alert("not an xml file nor an abc file") : (a = $.parseXML(a),
														   a = vertaal(a, {
														       p: "f",
														       t: 1,
														       u: opt.repufld,
														       v: 3,
														       mnum: 0
														   }),
														   a[1] && $("#err").append(a[1] + "\n"),
														   na(a[0]))
    }
    function Ea(a) {
        $("#err").text("");
        lpRec = offset_js = times_arr = void 0;
        var b = a[0].link;
        E = a[0].name.split(".")[0];
        $("#wait").toggle(!0);
        $("#err").text("link: " + b + "\n");
        $.get(b, "", null, "text").done(function(a, b) {
            $("#err").append("preload: " + b + "\n");
            abc_arr = a.split("\n");
            G()
        }).fail(function(a, b, f) {
            $("#wait").append("\npreload failed: " + b)
        })
    }
    console.log("before oa");
    function oa(a, b) {
	console.log("oa");
        $("#err").text("");
        offset_js = times_arr = void 0;
        $("#impbox").prop("checked") || (lpRec = void 0);
        var c = new FileReader;
        c.onload = function(a) {
            ma(c.result)
        }
        ;
        var d = "dd" == a ? b[0] : $("#fknp").prop("files")[0];
        d && (E = d.name.split(".")[0],
              c.readAsText(d))
    }
    function Fa(a) {
	console.log("Fa");
        a.stopPropagation();
        a.preventDefault();
        $("body").toggleClass("indrag", !1);
        a = a.dataTransfer.files;
        /video|audio/.test(a[0].type) ? ca("dd", a) : oa("dd", a)
    }
    function ca(a, b) {
	console.log("ca");
        var c, d;
        "dbx" == a ? (c = b[0],
		      d = c.link) : (c = "dd" == a ? b[0] : $("#mknp").prop("files")[0],
				     d = window.URL.createObjectURL(c));
        S(c.name, d)
    }
    function Ga() {
        $("#yubid")[0].checkValidity() ? (opt.yubvid = $("#yubid").val(),
					  S("", "")) : alert("The youtube video id should be 11 characters long,\neach from 'A' to 'Z', 'a' to 'z', '0' to '9', '-' or '_'")
    }
    function ja(a, b, c) {
	console.log("ja " + c);
        for (B = []; a <= b + .001; a += c)
            a = Math.round(100 * a) / 100,
        B.push(a)
    }
    function pa(a) {
	console.log("pa");
        function b(a) {
            $("#yubuse").attr("disabled", a);
            $("#yublbl").css("color", a ? "#aaa" : "#000");
            $("#yubload").toggle(a)
        }
        a && (qa = a);
        "undefined" == typeof YT ? (b(!0),
				    $("#yubuse").prop("checked", !1),
				    $.getScript("https://www.youtube.com/iframe_api")) : (b(!1),
											  qa())
    }
    function S(a, b) {
	console.log("S");
        b = b.replace("www.dropbox", "dl.dropboxusercontent").split("?")[0];
        ba = 0 == b.indexOf("http") ? b : a;
        var c;
        a = a.split("?")[0];
        $("#vid, #aud").attr("src", "");
        T && T.stopVideo();
        K.clearKlok();
        var d = 0 <= opt.btime ? opt.btime : q;
        if (a) {
            r = 0;
            if (/\.webm$|\.mp4$/i.test(a)) {
                c = $("#vid");
                if (0 == c.length)
                    return;
                $("#vidyub, #aud").css("display", "none");
                c.css("display", "inline-block");
                $("#buttons").toggleClass("video", !0)
            } else {
                c = $("#aud");
                if (0 == c.length)
                    return;
                $("#vidyub, #vid").css("display", "none");
                c.css("display", "inline-block");
                $("#buttons").toggleClass("video", !1)
            }
            l = c.get(0);
            /\.ogg$/i.test(b) && (l.canPlayType("audio/ogg") || (b = b.replace(/\.ogg$/i, ".mp3")));
            /\.webm$/i.test(b) && (l.canPlayType("video/webm") || (b = b.replace(/\.webm$/i, ".mp4")));
            c.attr("src", b);
            c.on("timeupdate", U);
            c.on("playing", function() {
                K.setKlok(null, 0);
                l.playbackRate = opt.speed
            });
            c.on("pause", function() {
                K.pause()
            });
            c.on("loadedmetadata", function() {
                C();
                l.currentTime = d
            });
            l.volume = .7;
            ja(.5, 2, .05);
            F(0);
            C()
        } else
            r = 1,
        $("#vid, #aud").css("display", "none"),
        $("#vidyub").css("display", "inline-block"),
        $("#buttons").toggleClass("video", !0),
        pa(function() {
            l = T;
            B = l.getAvailablePlaybackRates();
            F(0);
            C();
            l.cueVideoById({
                videoId: opt.yubvid,
                startSeconds: d
            });
            l.setVolume(70)
        })
    }
    function ra() {
	console.log("ra");
        var a = $("#yubuse").prop("checked");
        $("#medlbl").css("display", a ? "none" : "block");
        $("#yvdlbl").css("display", a ? "block" : "none")
    }
    function da() {
	console.log("da");
        var a = parseInt($("body").css("width")) / 2
        , b = parseInt($("#vid").css("width")) / 2
        , c = parseInt($("#vidyub").css("width")) / 2
        , d = parseInt($("#aud").css("width")) / 2;
        $("#vid").css("margin-left", opt.ctrmed ? (a - b).toFixed() + "px" : "0px");
        $("#vidyub").css("margin-left", opt.ctrmed ? (a - c).toFixed() + "px" : "0px");
        $("#aud").css("margin-left", opt.ctrmed ? (a - d).toFixed() + "px" : "0px");
        $("#meddiv").css("text-align", opt.ctrmed ? "left" : "center")
    }
    function C() {
	console.log("C");
        l && $(l).toggle(!opt.noplyr);
        $("#buttons").toggleClass("noheight", !!opt.noplyr);
        var a = $("#btns").prop("checked")
        , b = parseFloat($("#buttons").css("height"))
        , c = parseFloat($("body").css("height"))
        , a = a ? parseFloat($("#err").css("height")) : 0
        , c = 100 - (100 * (b + a) / c).toFixed();
        $("#notation").css("height", c + "%");
        $("#vidyub").css("width", (1.52 * b).toFixed());
        da();
        L()
    }
    console.log("before na");
    function na(a) {
	console.log("inside na");
        function b(a) {
	    console.log("b(a)");
            a = Object.keys(a).map(function(a) {
                return parseFloat(a)
            });
            a.sort(function(a, b) {
                return a - b
            });
            return a
        }
	
        function c(a) {
	    console.log("cc");
            var b = {
                diamond: 1,
                triangle: 1,
                square: 1,
                normal: 1
            }, c = ['%%beginsvg\n<defs>\n<text id="x" x="-3" y="0">&#xe263;</text>\n<text id="x-" x="-3" y="0">&#xe263;</text>\n<text id="x+" x="-3" y="0">&#xe263;</text>\n<text id="normal" x="-3.7" y="0">&#xe0a3;</text>\n<text id="normal-" x="-3.7" y="0">&#xe0a3;</text>\n<text id="normal+" x="-3.7" y="0">&#xe0a4;</text>\n<g id="circle-x"><text x="-3" y="0">&#xe263;</text><circle r="4" class="stroke"/></g>\n<g id="circle-x-"><text x="-3" y="0">&#xe263;</text><circle r="4" class="stroke"/></g>\n<path id="triangle" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="stroke-width:1.4"/>\n<path id="triangle-" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="stroke-width:1.4"/>\n<path id="triangle+" d="m-4 -3.2l4 6.4 4 -6.4z" class="stroke" style="fill:#000"/>\n<path id="square" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="stroke-width:1.4"/>\n<path id="square-" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="stroke-width:1.4"/>\n<path id="square+" d="m-3.5 3l0 -6.2 7.2 0 0 6.2z" class="stroke" style="fill:#000"/>\n<path id="diamond" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="stroke-width:1.4"/>\n<path id="diamond-" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="stroke-width:1.4"/>\n<path id="diamond+" d="m0 -3l4.2 3.2 -4.2 3.2 -4.2 -3.2z" class="stroke" style="fill:#000"/>\n</defs>\n%%endsvg'], d, f, e, y = "default", h = {
                "default": []
            };
            a = a.split("\n");
            for (d = 0; d < a.length; ++d)
                if (f = a[d],
                    0 <= f.indexOf("I:percmap") && (f = f.split(" "),
						    e = f[4],
						    e in b && (e = e + "+," + e),
						    f = "%%map perc" + y + " " + f[1] + " print=" + f[2] + " midi=" + f[3] + " heads=" + e,
						    h[y].push(f)),
                    0 <= f.indexOf("V:") && (e = f.match(/V:\s*(\S+)/)))
                    y = e[1],
            y in h || (h[y] = []);
            for (y in h)
                c = c.concat(h[y]);
            for (d = 0; d < a.length; ++d)
                f = a[d],
            0 <= f.indexOf("I:percmap") || (0 <= f.indexOf("V:") || 0 <= f.indexOf("K:") ? ((e = f.match(/V:\s*(\S+)/)) && (y = e[1]),
											    0 == h[y].length && (y = "default"),
											    c.push(f),
											    0 <= f.indexOf("perc") && -1 == f.indexOf("map=") && (f += " map=perc"),
											    0 <= f.indexOf("map=perc") && 0 < h[y].length && c.push("%%voicemap perc" + y),
											    0 <= f.indexOf("map=off") && c.push("%%voicemap")) : c.push(f));
            return c.join("\n")
        }
        var d = "", f = "", e, u = {}, h = {}, m = [], n, ea = [], p = [], r = [], t = [], v = [], H = [], x = [], M = [[0, 0, 1]], w = [], A = 0, B = [0], C = [], E = {}, F = [], I;
        V = "";
        z = [];
        O = [];
        g = null;
        q = 0;
        P = .1;
        W = 0;
        var J = $("#notation");
        $("body").attr("title", "");
        J.empty();
        J.append('<div style="height:500px">&nbsp</div>');
        I = function(a) {
            var b, c;
            a = a.replace(/\r\n/g, "\n");
            a = a.split(/^\s*X:/m);
            if (1 == a.length)
                return [];
            b = a[1].split(/^\s*$/m);
            b = a[0] + "X:" + b[0];
            a = b.split(/\r\n|[\n\r\u0085\u2028\u2029]/);
            for (b = 0; b < Math.min(100, a.length); ++b)
                (c = a[b].match(/%%scale\s*([\d.]+)/)) && 1 == c[1] && (a[b] = "%%scale 0.99");
            return a
        }(a);
        a = I.join("\n");
        0 <= a.indexOf("percmap") && (a = c(a));
        e = new Abc({
            img_out: function(a) {
                    -1 != a.indexOf("<svg") && (a = a.replace(/width="(\d*)px"\s*height="(\d*)px"/, 'width="$1px" height="$2px" viewbox="0 0 $1 $2"'),
						u = b(u),
						h = b(h),
						1 < u.length && u[1] < Math.min.apply(null, p) && u.splice(0, 1),
						u = u.filter(function(a, b, c) {
						    return 0 == b || 15 < a - c[b - 1]
						}),
						m.push({
						    xs: u,
						    ys: h
						}),
						u = {},
						h = {},
						p = [],
						A += 1);
                d += a
            },
            errmsg: function(a, b, c) {
                f += a + "\n"
            },
            read_file: function(a) {
                return ""
            },
            anno_start: function(a, b, c, d, f, l, g) {
                if ("note" == a || "rest" == a)
                    p.push(e.ax(d)),
                d = Math.round(100 * e.ax(d)) / 100,
                f = Math.round(100 * e.ay(f)) / 100,
                g = e.ah(g),
                E[b] = [A, d, f, l, g];
                "bar" == a && (d = e.ax(d),
			       f = e.ay(f),
			       g = e.ah(g),
			       u[d] = 1,
			       h[f] = 1,
			       h[f + g] = 1,
			       n = e.ax(0),
			       u[n] = 1)
            },
            get_abcmodel: function(a, b, c) {
                var d = 768;
                c = 0;
                var f, e = 0;
                try {
                    f = b[0].meter.a_meter[0].top
                } catch (Sa) {
                    f = "4"
                }
                for (; a; a = a.ts_next) {
                    switch (a.type) {
                    case 8:
                    case 10:
                        C.push({
                            time: a.time,
                            iabc: a.istart,
                            vce: a.v,
                            inv: a.invis
                        })
                    }
                    if (0 == a.v)
                        switch (a.type) {
                        case 14:
                            d = a.tempo_notes.reduce(function(a, b) {
                                return a + b
                            });
                            d = d * a.tempo / 60;
                            break;
                        case 8:
                        case 10:
                            c += a.dur / d;
                            break;
                        case 0:
                            if (a.time == e) {
                                H[H.length - 1] += a.bar_type;
                                break
                            }
                            "eoln"in a && (e = a.time);
                            x.push(c);
                            c = 0;
                            f = f.replace("C|", "2").replace("C", "4");
                            v.push(parseInt(f));
                            H.push(a.bar_type);
                            r.push(a.text);
                            B.push(a.time);
                            break;
                        case 6:
                            f = a.a_meter.length ? a.a_meter[0].top : "4"
                        }
                }
                X.forEach(function(a) {
                    var b = a.parentNode;
                    b && b.removeChild(a)
                });
                Q = [];
                f = "#f9f #3cf #c99 #f66 #fc0 #cc0 #ccc".split(" ");
                b = b.length;
                for (c = 0; c < b; ++c)
                    e = 1 << c & 0 ? "0" : "",
                a = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
                a.setAttribute("fill", f[c % f.length] + e),
                a.setAttribute("fill-opacity", "0.5"),
                a.setAttribute("width", "0"),
                X.push(a),
                Q.push(-1)
            }
        });
        e.tosvg("abc2svg", a);
        "" != f && $("#err").append(f);
        J.append(d);
        J.append('<div style="height:500px">&nbsp;</div>');
        z = J.find("svg");
        z.each(function() {
            var a = $(this).find(".g");
            O.push(a.length ? a : $(this))
        });
        a = [];
        for (var J = [], G = [], N = 0; N < m.length; ++N) {
            var D = m[N];
            a[N] = D.xs;
            J[N] = D.ys[0];
            G[N] = D.ys[D.ys.length - 1]
        }
        (function() {
            for (var a = 0, b = 1, c = m[a].xs.length, d = 0, f = 0, e = 1, h = 0, g = 1, l = 1, u = 0, ia = {}; ; ) {
                var k = r[d - 1];
                if (k = k ? k.match(/[,\d]*(\d)/) : null)
                    k = parseInt(k[1]),
                k != u && (u = k);
                if (!u || u >= g)
                    F.push(d),
                f += x[d],
                ea.push(f),
                t.push(v[d]),
                w[a] || (w[a] = []),
                w[a][b] || (w[a][b] = []),
                w[a][b][l] = M.length,
                M.push([a, b, l]);
                "|" != H[d] && (u = 0);
                k = /^:/.test(H[d]);
                if (!k || 1 != g || ia[d] || opt.repskip) {
                    if (k && (g = 1),
			/:$/.test(H[d]) && (e = M.length,
					    h = d + 1,
					    g = 1),
			d += 1,
			b += 1,
			b >= c) {
                        b = 1;
                        a += 1;
                        if (a >= m.length)
                            break;
                        c = m[a].xs.length
                    }
                } else
                    g = 2,
                l += 1,
                ia[d] = 1,
                d = h,
                b = M[e][1],
                a = M[e][0],
                c = m[a].xs.length
            }
        }
        )();
        "undefined" != typeof times_arr && (ea = la(times_arr));
        "undefined" != typeof offset_js && (q = offset_js);
        opt.offset && (q = opt.offset);
        V = I;
        g = new k(a,J,G,ea,M,w,t);
        z.each(function() {
            $(this).mousedown(Ha)
        });
        l || (l = K);
        setTimeout(function() {
            sa();
            L()
        }, 0);
        I = C.map(function(a) {
            return {
                t: a.time,
                vce: a.vce,
                xy: E[a.iabc]
            }
        });
        a = I[I.length - 1];
        a.t += 1;
        I.push(a);
        g.ntsSeq = I;
        g.barTimes = B;
        g.tix2mix = F
    }
    console.log("before Ia");
    function Ia(a) {
	console.log("IA");
        var b, c, d, f, e, g, h;
        g = X[a.vce];
        (b = a.xy) ? (c = b[0],
		      d = b[1],
		      f = b[2],
		      e = b[3],
		      b = b[4],
		      a.inv && (b = e = 0),
		      c != Q[a.vce] && ((h = g.parentNode) && h.removeChild(g),
					h = O[c][0],
					h.insertBefore(g, h.firstChild),
					Q[a.vce] = c),
		      g.setAttribute("x", d),
		      g.setAttribute("y", f),
		      g.setAttribute("width", e),
		      g.setAttribute("height", b)) : (g.setAttribute("width", 0),
						      g.setAttribute("height", 0))
    }
    console.log("before la");
    function la(a) {
	console.log("la");
        a = a.map(function(a) {
            return a.slice(1)
        });
        return a = a.reduce(function(a, c) {
            return a.concat(c)
        })
    }
    function U() {
	console.log("U");
        if (l) {
            var a = (r ? l.getCurrentTime() : l.currentTime) - q
            , b = a;
            0 > a && (a = 0);
            opt.lopctl && (a > lpRec.loopEnd && (a = lpRec.loopStart),
			   a < lpRec.loopStart && (a = lpRec.loopStart + .01),
			   a != b && (r ? l.seekTo(a + q, !0) : l.currentTime = a + q));
            g && g.time2x(a, 0, 0)
        }
    }
    function Ha(a) {
        a.preventDefault();
        a.stopPropagation();
        var b = z.get().indexOf(this);
        a = a.clientX;
        var c = this.getBoundingClientRect();
        a -= c.left + 10;
        g.x2time(a, b)
    }
    function ta() {
        $("#sync_out").css("display", opt.synbox ? "block" : "none");
        g && opt.synbox && g.showSyncInfo()
    }
    function ua() {
        $("#medbts").css("display", opt.btns ? "inline" : "none");
        $("#err").css("display", opt.btns ? "block" : "none");
        C();
        opt.btns && "undefined" == typeof FileReader && $("#notation").prepend("<h3>Your browser does not support reading of local files ...</h3>but you can use the preload feature.")
    }
    function fa() {
	console.log("fa something == " + L());
        g && (g.nseqCur = 0,
              L());
        $("#notation svg").css("margin-left", opt.ctrnot ? "auto" : "0px");
        $("#notation svg").css("margin-right", opt.ctrnot ? "auto" : "0px")
    }
    function va() {
        var a = $("#spdctl").prop("checked");
        $("#spdlbl").css("display", a ? "block" : "none")
    }
    function wa() {
        function a(a) {
            $("#drpuse").prop("checked", !a);
            $("#drpuse").attr("disabled", a);
            $("#drplbl").css("color", a ? "#aaa" : "#000")
        }
        if ("undefined" == typeof Dropbox)
            a(!0),
        $.ajax({
            url: "https://www.dropbox.com/static/api/2/dropins.js",
            dataType: "script",
            cache: !0
        }).done(function() {
            a(!1);
            Dropbox.init({
                appKey: "ckknarypgq10318"
            });
            Ja();
            wa()
        });
        else {
            var b = $("#drpuse").prop("checked");
            $(".dropbox-dropin-btn").css("display", b ? "inline-block" : "none");
            $("#fknp, #mknp").css("display", b ? "none" : "inline-block")
        }
    }
    function Ka(a, b) {
        function c() {
            f <= d && (w = setTimeout(c, e),
		       g.tiktak.text(f),
		       f += 1)
        }
        var d, f, e;
        clearInterval(w);
        w = 0;
        d = g.tixbts[a - 1];
        f = 1;
        e = (g.times[a] - b) / d / opt.speed * 1E3;
        w = setTimeout(c, 0)
    }
    function xa() {
        g && setTimeout(function() {
            clearInterval(w);
            w = 0;
            g.tiktak.text("")
        }, 0)
    }
    function La(a, b) {
        function c() {
            $("#countin").toggle(!1);
            clearInterval(w);
            w = 0
        }
        function d() {
            $("#countin").html("<b>" + f.num + "</b>").toggle(!0);
            0 == f.num-- && (c(),
			     Y(a, b))
        }
        if (w)
            c();
        else {
            a = a.replace(":true", ":false");
            var f = g.compCountIn();
            d();
            w = setInterval(d, 1E3 * f.time)
        }
    }
    function Y(a, b) {
        if (l) {
            var c = a.split(":")
            , d = "true" == c[0]
            , f = parseFloat(c[1])
            , c = "true" == c[2]
            , e = r ? l.getPlayerState() : 0
            , k = r ? 1 != e : l.paused;
            r ? 5 != e && l.seekTo(f, !0) : l.currentTime = f;
            if (k && d || !k && !d) {
                if (c) {
                    La(a, b);
                    return
                }
                if (b) {
                    setTimeout(function() {
                        Y(a, 0)
                    }, b);
                    return
                }
                r ? l.playVideo() : l.play();
                opt.metro && g && (g.time_ix = 0)
            } else
                r ? 5 != e && l.pauseVideo() : l.pause(),
            opt.metro && xa();
            d = !opt.lncsr && !d;
            g && g.time2x(f - q, d, 0)
        }
    }
    function ga(a, b) {
        var c = a + ":" + b.toFixed(2) + ":" + (a && $("#cntin").prop("checked"));
        x ? x.send(c) : Y(c, 0)
    }
    function D(a) {
        var b = a.key
        , c = 1;
        switch (b) {
        case "ArrowLeft":
        case "Left":
            // g.goMsre(0);
            break;
        case "ArrowRight":
        case "Right":
            g.goMsre(1);
            break;
        case "Spacebar":
        case " ":
            a.preventDefault && a.preventDefault();
            if (!l)
                break;
            ga(!0, r ? l.getCurrentTime() : l.currentTime);
            break;
        case "a":
            $("#autscl").click();
            break;
        case "f":
            $("#btns").click();
            break;
        case "h":
            $("#help").toggleClass("showhlp");
            break;
        case "l":
            $("#lncsr").click();
            break;
        case "m":
            $("#menu label").toggle();
            break;
        case "s":
            opt.spdctl && !opt.lopctl ? $("#lopctl").click() : opt.lopctl && !opt.spdctl ? $("#spdctl").click() : $("#spdctl, #lopctl").click();
            break;
        case "+":
            F(1);
            break;
        case "-":
            F(-1);
            break;
        default:
            c = 0
        }
        if (opt.synbox && g && !c) {
            switch (b) {
            case ",":
                a.ctrlKey ? q += P : g.changeTimesKeyb(P);
                break;
            case ".":
                a.ctrlKey ? q -= P : g.changeTimesKeyb(-P);
                break;
            case "w":
                ya()
            }
            a.preventDefault();
            g.showSyncInfo()
        }
    }
    function ha() {
        da();
        if (g) {
            if (z[0].width.baseVal.value > screen.width || opt.autscl)
                g.setSize.call(g),
            g.setScale.call(g);
            L(!0)
        }
    }
    function Ma(a) {
        a = a.map(function(a) {
            return window.btoa(unescape(encodeURIComponent(a)))
        }).join("++");
        for (var b = [], c = 0; c <= a.length; )
            b.push(a.substr(c, 150)),
        c += 150;
        return b
    }
    function Na(a) {
        function b(b) {
            return a.join("").split(b).map(function(a) {
                return decodeURIComponent(escape(window.atob(a)))
            })
        }
        var c;
        try {
            c = b("++")
        } catch (d) {
            c = b("+")
        }
        return c.join("\n")
    }
    function ya() {
        var a, b, c = [], d, f, e = "[", l, h, k, m;
        d = 'media_file = "' + (r ? "" : ba) + '";\n';
        h = "undefined" != typeof msc_credits ? "msc_credits = " + JSON.stringify(msc_credits) + ";\n" : "";
        f = "offset_js = " + q.toFixed(2) + ";\n";
        opt.synbox = 0;
        k = "opt = " + JSON.stringify(opt) + ";\n";
        opt.synbox = 1;
        m = lpRec.loopBtn ? "lpRec = " + JSON.stringify(lpRec) + ";\n" : "";
        for (b = g.times.map(function(a) {
            return a.toFixed(2)
        }); b.length; )
            l = b[9],
        c.push(e + b.splice(0, 10).join(",") + "]"),
        e = "[" + l + ",";
        b = "times_arr = [" + c.join(",\n") + "];\n";
        $("#encr").prop("checked") ? (e = Ma(V).map(function(a) {
            return JSON.stringify(a)
        }),
				      c = ['"X:1"']) : (e = [""],
							c = V.map(function(a) {
							    return JSON.stringify(a)
							}));
        e = "abc_enc = [" + e.join(",\n") + "];\n";
        c = "abc_arr = [" + c.join(",\n") + "];\n";
        b = '//########################################\n//# This page contains score data, timing data and the media file path. Save it as a text file in\n//# the same folder as abcweb.html. Abcweb preloads score and media when it is opened with the\n//# file name as parameter in the url, for example: http://your.domain.org/abcweb.html?file_name\n//# Also works locally with file:///path/to/abcweb.html?file_name\n//# **** You have to correct the path to the media file below! (media_file="...";) ****\n//########################################\n//#\n' + (d + h + f + k + m + b + c + e);
        var n = "data:text/plain;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(b)));
        if ($("#drpuse").prop("checked"))
            $("#err").text(""),
        Dropbox.save(n, E + ".js", {
            success: function() {
                $("#err").text('"' + E + '.js" saved to your Dropbox.\n')
            },
            progress: function(a) {},
            cancel: function() {},
            error: function(a) {
                $("#err").text("Error: " + a + "\n");
                $("#err").append("fnm: " + E + ", len: " + n.length + "\n")
            }
        });
        else
            try {
                a = document.createElement("a"),
                a.href = n,
                a.download = E + ".js",
                a.text = "Save synchronization data",
                $("#saveDiv").append(a),
                a.click()
            } catch (Ta) {
                confirm("Do you want to save your synchronization data?") && (document.open("text/html"),
									      document.write("<pre>" + b + "</pre>"),
									      document.close())
            }
    }
    function za(a) {
	console.log("za == " ,a);
        e();
        $("#err").text("");
        var b, c = "", d = "", f, g, l, h = "", k;
        b = window.location.href.replace("?dl=0", "").split("?");
        a && (b = ["", a]);
        if (a = b[0].match(/:\/\/([^/:]+)/))
            k = a[1];
        if (1 < b.length) {
            g = b[1].split("&");
            for (l = 0; l < g.length; l++)
                b = g[l].replace(/d:(\w{15}\/[^.]+\.)/, "https://dl.dropboxusercontent.com/s/$1"),
            (a = b.match(/xml=(.*)/)) ? c = decodeURIComponent(a[1]).replace("www.dropbox", "dl.dropboxusercontent") : (a = b.match(/med=(.*)/)) ? h = a[1] : (a = b.match(/tmr=(\d*)/)) ? m.top_margin = parseInt(a[1]) : (a = b.match(/mht=(\d*)/)) ? m.media_height = parseInt(a[1]) : (a = b.match(/tb=([\d.]*)/)) ? m.btime = parseFloat(a[1]) : (a = b.match(/te=([\d.]*)/)) ? m.etime = parseFloat(a[1]) : (a = b.match(/off=([+-]?[\d.]+)/)) ? m.offset = parseFloat(a[1]) : (a = b.match(/ip=(\d+.\d+.\d+.\d+)/)) ? m.ipadr = a[1] : (a = b.match(/^d([\d.]+)$/)) ? m.delay = parseFloat(a[1]) : b.match(/ip=host/) && k ? m.ipadr = k : "mstr" == b ? m.mstr = 1 : "jmp" == b ? m.jump = 1 : "syn" == b ? m.synbox = 1 : "nb" == b ? m.no_menu = 1 : "sp" == b ? m.spdctl = m.lopctl = 1 : "ur" == b ? m.repufld = 1 : "npl" == b ? m.noplyr = 1 : "ncr" == b ? m.nocsr = 1 : "asc" == b ? m.autscl = 1 : "cm" == b ? m.ctrmed = 1 : "cs" == b ? m.ctrnot = 1 : "nomed" == b ? (m.nomed = 1,
																																																																																																																							  m.noplyr = 1) : d = b,
            /(\.xml$)|(\.abc$)/.test(d) && (c = d,
					    d = ""),
            /(\.mp3$)|(\.mp4$)|(\.ogg$)|(\.webm$)/.test(d) && (h = d,
							       d = "");
            h && (11 == h.length && -1 == h.indexOf(".") ? opt.yubvid = h : media_file = decodeURIComponent(h).replace("www.dropbox", "dl.dropboxusercontent"));
            (d || c) && $("#wait").toggle(!0);
            c ? $.get(c, "", null, "text").done(function(a, b) {
                $("#err").append("preload: " + b + "\n");
                abc_arr = a.split("\n");
                G()
            }).fail(function(a, b, c) {
                $("#wait").append("\npreload failed: " + b)
            }) : d && (0 <= d.indexOf("dropbox.com") && (d += "?dl=1"),
		       $.getScript(d).done(function(a, b) {
			   $("#err").append("preload: " + b + "\n");
			   G()
		       }).fail(function(a, b, c) {
			   $("#wait,#err").append("preload failed: " + c + ", trying script tag ...\n");
			   f = document.createElement("script");
			   f.src = d;
			   f.onload = function() {
			       G()
			   }
			   ;
			   f.onerror = function() {
			       $("#wait").append("\npreload failed")
			   }
			   ;
			   document.head.appendChild(f);
			   document.head.removeChild(f)
		       }))
        }
        return d || c
    }
    function G() {
        if (0 == R && play_list)
            $("body").trigger("play_end");
        else {
            if ("undefined" != typeof abc_arr) {
                var a = abc_arr.join("\n");
                "undefined" != typeof abc_enc && abc_enc.length && (a = Na(abc_enc),
								    opt.no_menu = 1);
                ma(a)
            }
            for (var b in m)
                opt[b] = m[b];
            "nospd"in opt && (opt.spdctl = !opt.nospd,
			      opt.nospd = void 0);
            "undefined" != typeof media_file && media_file && !opt.nomed && (S(media_file, media_file),
									     opt.btns = 0);
            opt.yubvid && !opt.nomed && (S("", ""),
					 opt.btns = 0);
            "undefined" != typeof msc_credits && (a = msc_credits.reduce(function(a, b) {
                return a + b
            }),
						  $("#credits").html(a));
            "undefined" != typeof media_height && (opt.media_height = media_height);
            opt.no_menu && ($("#sync").css("display", "none"),
			    opt.btns = 0,
			    $("body").off("dragenter dragleave drop dragover"),
			    $("body").on("contextmenu", function(a) {
				a.preventDefault()
			    }),
			    l.controlsList && l.controlsList.add("nodownload"));
            $("#wait").toggle(!1);
            Aa(!1)
        }
    }
    function Aa(a) {
        var b;
        if (a)
            for (b in m)
                opt[b] = m[b];
        opt.ipadr && Oa(opt.ipadr);
        opt.media_height && $("#buttons").css("height", opt.media_height);
        opt.offrol && $("#rollijn").css("top", opt.offrol);
        opt.offset && (q = opt.offset);
        for (b in opt)
            $("#" + b).prop("checked", opt[b]);
        ua();
        fa();
        va();
        ta();
        ha();
        $("#sync, #medbts, #meddiv, #err").css("visibility", "visible");
        $("#rollijn").css("display", opt.dotted ? "block" : "none");
        R && D({
            key: " "
        })
    }
    function Z(a) {
        $("#err").append(a + "\n")
    }
    function Oa(a) {
        x ? Z("websocket already open") : (x = new WebSocket("ws://" + a + ":8091/"),
					   x.onmessage = function(a) {
					       "master" == a.data ? $("#mbar").css("background", "rgba(255,0,0,0.2)") : Y(a.data, 100 * opt.delay)
					   }
					   ,
					   x.onerror = function(a) {
					       Z("socket error (server inaccessible?)");
					       x = null
					   }
					   ,
					   x.onopen = function(a) {
					       $("#mbar").css("background", "rgba(0,255,0,0.2)");
					       opt.mstr && x.send("master");
					       Z("connection opened")
					   }
					   ,
					   x.onclose = function(a) {
					       $("#mbar").css("background", "");
					       Z("connection closed: " + a.code);
					       x = null
					   }
					  )
    }
    function Pa(a) {
        if (!Ba() && ("meddiv" == a.target.id || "credits" == a.target.id)) {
            a.preventDefault();
            a.stopPropagation();
            $("#buttons").css("opacity", "0.5");
            $("#streep").css("opacity", "1.0");
            var b = "touchstart" == a.type
            , c = $("#meddiv")
            , d = b ? a.originalEvent.touches[0].clientY : a.pageY
            , f = $("#buttons").height();
            c.css("cursor", "row-resize");
            c.on("mousemove touchmove", function(a) {
                var c = $("body").height();
                opt.media_height = (100 * (f + (b ? a.originalEvent.touches[0].clientY : a.pageY) - d) / c).toFixed() + "%";
                $("#buttons").css("height", opt.media_height)
            });
            c.on("mouseup touchend", function(a) {
                $("#buttons").css("opacity", "1.0");
                $("#streep").css("opacity", "0.0");
                c.off("mousemove touchmove mouseup touchend");
                c.css("cursor", "initial");
                C()
            })
        }
    }
    function Qa(a) {
        a.preventDefault();
        var b = "touchstart" == a.type;
        $("#rollijn").toggleClass("rolgroen");
        var c = b ? $("#rollijn") : $("body");
        c.on(b ? "touchmove" : "mousemove", function(a) {
            $("#notation").offset();
            opt.offrol = (100 * ((b ? a.originalEvent.touches[0].clientY : a.clientY) - 15) / document.body.clientHeight).toFixed(2) + "%";
            $("#rollijn").css("top", opt.offrol);
            L(!0)
        });
        c.on(b ? "touchend" : "mouseup", function(a) {
            c.off("mousemove touchmove mouseup touchend");
            $("#rollijn").toggleClass("rolgroen")
        })
    }
    function F(a) {
        if (2 == a) {
            a = $("#speed").val();
            var b = a - opt.speed;
		.06 >= Math.abs(b) ? a = 0 < b ? 1 : -1 : (opt.speed = a,
							   a = 0)
        }
        b = B.map(function(a, b) {
            return {
                x: Math.abs(a - opt.speed),
                i: b
            }
        }).sort(function(a, b) {
            return a.x - b.x
        })[0].i;
            -1 == a && 0 < b && (opt.speed = B[b + a]);
        1 == a && b < B.length - 1 && (opt.speed = B[b + a]);
        0 == a && (opt.speed = B[b]);
        $("#speed").val(opt.speed.toFixed(2));
        l && !r && (l.playbackRate = opt.speed);
        l && r && l.setPlaybackRate(opt.speed)
    }
    function sa() {
        g && g.drawTags();
        opt.lopctl = $("#lopctl").prop("checked");
        $("#atag").css("display", opt.lopctl ? "block" : "none");
        $("#btag").css("display", opt.lopctl ? "block" : "none")
    }
    function Ja() {
        var a = Dropbox.createChooseButton({
            success: Ea,
            cancel: function() {},
            linkType: "direct",
            multiselect: !1,
            extensions: [".xml", ".abc", ".txt", ".js"]
        })
        , b = Dropbox.createChooseButton({
            success: function(a) {
                ca("dbx", a)
            },
            cancel: function() {},
            linkType: "preview",
            multiselect: !1,
            extensions: [".ogg", ".mp3", ".webm", ".mp4"]
        });
        $("#abcfile").append(a);
        $("#mediafile").append(b)
    }
    function Ca(a) {
        a = $(this).prop("checked");
        var b = $(this).attr("id");
        opt[b] = a;
        switch (b) {
        case "ctrnot":
            fa();
            break;
        case "ctrmed":
            da();
            break;
        case "spdctl":
            va();
            break;
        case "autscl":
            ha();
            break;
        case "lncsr":
            fa();
            break;
        case "btns":
            ua();
            break;
        case "synbox":
            ta();
            break;
        case "noplyr":
            C();
            break;
        case "nocsr":
            g && !K.paused && (g.noCursor = a);
            break;
        case "metro":
            a || xa();
            break;
        case "dotted":
            L()
        }
    }
    function Da() {
        $("#menu label").css("display", "none")
    }
    function Ba() {
        var a = "none" != $("#menu label").css("display") || $("#help").hasClass("showhlp");
        a && ($("#help").toggleClass("showhlp", !1),
              setTimeout(Da, 0));
        return a
    }
    function Ra() {
        var a = document.body
        , b = a.requestFullscreen || a.mozRequestFullScreen || a.webkitRequestFullscreen
        , c = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
        b && c && ($("#fscr").prop("checked") ? b.call(a) : c.call(document))
    }
    function L(a) {
	console.log("L(a) ==  " + a)
        $("#rollijn").css("display", opt.dotted ? "block" : "none");
        g && (Q.forEach(function(a, c, d) {
            d[c] = -1
        }),
              g.line = -1,
              g.time2x(g.cursorTime, 0, a))
    }
    var z, O, g, q, ba, V, l, E, T, r = 0, B = [], W = 0, qa, m = {}, x = null, P, K = new n, v, ka = 0;
    opt = {};
    var aa = {
        jump: 0,
        no_menu: 0,
        repufld: 0,
        noplyr: 0,
        nocsr: 0,
        media_height: "",
        btns: 1,
        ipadr: "",
        mstr: 0,
        autscl: 0,
        ctrmed: 0,
        ctrnot: 0,
        lncsr: 0,
        opacity: .2,
        synbox: 0,
        speed: 1,
        top_margin: 0,
        yubvid: "",
        nomed: 0,
        delay: 0,
        repskip: 0,
        spdctl: 0,
        lopctl: 0,
        metro: 0,
        btime: -1,
        etime: 0,
        offrol: 0,
        dotted: 0
    };
    onYouTubeIframeAPIReady = function() {
        T = new YT.Player("vidyub",{
            events: {
                onReady: function() {
                    $("#yubuse").prop("checked", !0);
                    ra();
                    pa()
                },
                onStateChange: function(a) {
                    a.data == YT.PlayerState.PLAYING ? (K.setKlok(U, 100),
							F(0)) : K.pause();
                    a.data == YT.PlayerState.CUED && C()
                }
            }
        })
    }
    ;
    var X = []
    , Q = []
    , R = 0;
    k.prototype.setline = function(a) {
        $("#wijzer").remove();
        this.sety(this.ymin[a], this.ymax[a]);
        this.line = a;
        this.wijzer.prependTo(O[a]);
        this.width = z[a].width.baseVal.value;
        var b = v.scrollTop;
        if (opt.dotted) {
            a = $("#shade")[0].getBoundingClientRect().top;
            var c = $("#rollijn")[0].getBoundingClientRect().top + 30
            , b = b + a - c
        } else if (this.line_offsets[a + 1] > b + v.clientHeight - this.vmargin || this.line_offsets[a] < b + this.vmargin)
            b = this.line_offsets[a] - this.tmargin;
        return b
    }
    ;
    k.prototype.sety = function(a, b) {
        this.wijzer.attr("y", a.toFixed(2));
        this.wijzer.attr("width", "2");
        this.wijzer.attr("height", (b - a).toFixed(2));
        this.shade.attr("fill", "blue")
    }
    ;
    k.prototype.setx = function(a, b, c) {
        var d = v.scrollLeft
        , f = d + v.clientWidth - this.hmargin;
        if (opt.lncsr) {
            if (this.wijzer.attr("width", "0"),
		a /= this.scale,
		a > f || a < d + this.hmargin)
                d = a > this.hmargin ? a - this.hmargin : 0
        } else if (this.wijzer.attr("x", b.toFixed(2)),
		   this.wijzer.attr("width", (c - b).toFixed(2)),
		   this.shade.attr("fill-opacity", this.noCursor ? "0.0" : "" + opt.opacity),
		   b /= this.scale,
		   c /= this.scale,
		   c > f || b < d + this.hmargin)
            d = b > this.hmargin ? b - this.hmargin : 0;
        return v.scrollWidth > v.clientWidth ? d : 0
    }
    ;
    k.prototype.time2x = function(a, b, c) {
        if (!W) {
            this.cursorTime = a;
            var d, f, e, g, h;
            d = this.times;
            for (h = this.time_ix; h < d.length && a > d[h]; )
                h += 1;
            if (opt.etime && a + q > opt.etime || !opt.etime && h == d.length)
                r ? 1 == l.getPlayerState() && l.pauseVideo() : l.paused || l.pause(),
            $("body").trigger("play_end");
            else {
                for (; 0 < h && a < d[h - 1]; )
                    --h;
                b && .3 > d[h] - a && (d[h] = a - .01,
				       console.log("tijdcor: " + (a - .01) + ", maat: " + h),
				       h < d.length - 1 && (h += 1));
                opt.metro && h != this.time_ix && Ka(h, a);
                this.time_ix = h;
                this.repcnt = this.tixlb[h][2];
                this.msre = g = this.tixlb[h][1];
                f = this.tixlb[h][0];
                b = this.line != f ? this.setline(f) : v.scrollTop;
                var k;
                e = this.xs[f];
                f = d[h - 1];
                k = d[h];
                d = e[g - 1] + 10;
                e = e[g] + 10;
                g = (a - f) / (k - f);
                f = d + (e - d) * g;
                k = this.times[this.times.length - 1];
                a = 0 >= a || a > k ? this.setx(0, 0, 0) : this.setx(f, d, e);
                t(a, b, c);
                opt.synbox && this.showSyncInfo();
                if (opt.lncsr) {
                    c = this.tix2mix[h - 1];
                    h = this.barTimes[c];
                    h += (this.barTimes[c + 1] - h) * g;
                    h < this.tAbcLast && (this.nseqCur = 0);
                    for (c = this.nseqCur; c < this.ntsSeq.length; ++c)
                        if (a = this.ntsSeq[c],
                            !(a.t < h && c < this.ntsSeq.length - 1)) {
                            for (a = this.nseqCur; a < c; ++a)
                                Ia(this.ntsSeq[a]);
                            this.nseqCur = c;
                            break
                        }
                    this.tAbcLast = h
                } else
                    X.forEach(function(a) {
                        var b = a.parentNode;
                        b && b.removeChild(a)
                    })
            }
        }
    }
    ;
    k.prototype.drawTags = function() {
        for (var a in {
            atag: 1,
            btag: 1
        })
            if (a in lpRec) {
                var b = lpRec[a];
                this[a].prependTo(O[b.line]);
                this[a].attr("x", b.x);
                this[a].attr("y", this.ymin[b.line])
            }
    }
    ;
    k.prototype.doLoopTag = function(a, b, c, d, e) {
        function f(a, b, c, d, e, f, g, h) {
            if (!opt.lncsr) {
                var k = l.xs[c];
                f = l.times;
                b = k[g - 1];
                k = k[g];
                g = f[h - 1];
                h = f[h];
                lpRec.loopStart == g + .01 && (a = "btag",
					       e = "loopEnd");
                lpRec.loopEnd == h - .01 && (a = "atag",
					     e = "loopStart");
                "loopStart" == e ? f = g + .01 : (b = k,
						  f = h - .01)
            }
            lpRec[a] = {
                x: b.toFixed(2),
                line: c
            };
            lpRec.loopBtn = d;
            lpRec[e] = f;
            l.drawTags()
        }
        var g, h, l = this;
        switch (lpRec.loopBtn) {
        case 1:
            f("atag", a, b, 2, "loopStart", c, d, e);
            break;
        case 2:
            c > lpRec.loopStart && f("btag", a, b, 3, "loopEnd", c, d, e);
            break;
        case 3:
            g = Math.abs(lpRec.loopStart - c),
            h = Math.abs(lpRec.loopEnd - c),
            g < h ? f("atag", a, b, 3, "loopStart", c, d, e) : f("btag", a, b, 3, "loopEnd", c, d, e)
        }
    }
    ;
    k.prototype.x2time = function(a, b) {
        var c, d, e, g, k, h;
        a *= this.scale;
        c = this.xs[b];
        e = 1;
        if (a < c[0])
            D({
                key: " "
            });
        else {
            for (; e < c.length && c[e] < a; )
                e += 1;
            e == c.length ? D({
                key: " "
            }) : (h = this.lbtix[b][e],
		  h[this.repcnt] || (d = Object.keys(h),
				     this.repcnt = this.repcnt < d[0] ? parseInt(d[0]) : parseInt(d[d.length - 1])),
		  h = h[this.repcnt],
		  d = this.times,
		  g = c[e - 1],
		  k = c[e],
		  c = d[h - 1],
		  d = c + (d[h] - c) * (a - g) / (k - g),
		  opt.lopctl ? this.doLoopTag(a, b, d, e, h) : opt.synbox && (r ? l.getPlayerState() == YT.PlayerState.PLAYING : !l.paused) ? this.syncTimes(a, e, b, h) : ga(!1, (opt.lncsr ? d : c + .01) + q))
        }
    }
    ;
    k.prototype.goMsre = function(a) {
        var b = this.time_ix;
        l && (a = a ? this.times[b] + .01 : 2 >= b ? .01 : this.times[b - 2] + .01,
              ga(!1, a + q))
    }
    ;
    k.prototype.showSyncInfo = function() {
        var a = this.time_ix
        , a = this.times[a] - this.times[a - 1];
        $("#sync_info").html("duration&nbsp;measure:<br>" + a.toFixed(3) + " sec.<br>");
        $("#sync_info").append("media&nbsp;offset:<br>" + q.toFixed(3) + " sec.")
    }
    ;
    k.prototype.changeTimesKeyb = function(a) {
        this.changeTimes(this.lbtix[this.line][this.msre][this.repcnt] - 1, a, 0)
    }
    ;
    k.prototype.changeTimes = function(a, b, c) {
        var d, e = this.times;
        for (a += 1; a < e.length; ++a)
            d = c ? e[a - 1] + c : e[a] + b,
        e[a] = d
    }
    ;
    k.prototype.syncTimes = function(a, b, c, d) {
        a = this.lbtix[c][b][this.repcnt] - 1;
        c = (r ? l.getCurrentTime() : l.currentTime) - q - .2;
        0 == a ? (q += c,
		  r ? l.seekTo(q + .01, !0) : l.currentTime = q + .01,
		  W && $("#woff").click()) : (--a,
					      b = 2 == d ? 0 : this.times[d - 2],
					      d = this.times[d - 1],
					      c < b + .5 ? alert("tempo faster than 240 bpm: first sync previous measures") : (this.lastSync > a ? this.changeTimes(a, c - d, 0) : (this.changeTimes(a, 0, c - b),
																						    this.lastSync = a),
															       opt.jump && (r ? l.seekTo(b + q + .01, !0) : l.currentTime = b + q + .01)))
    }
    ;
    k.prototype.setSize = function() {
        var a, b, c, d, e;
        for (a = 0; a < z.length; ++a)
            b = z[a],
        c = b.width.baseVal.value,
        d = b.height.baseVal.value,
        e = $("#notation").prop("clientWidth"),
        b.width.baseVal.value = e,
        b.height.baseVal.value = e * d / c
    }
    ;
    k.prototype.setScale = function() {
        var a, b, c, d;
        b = z[0];
        a = b.getBoundingClientRect().width;
        b = b.viewBox.baseVal.width;
        c = (c = $("svg>g").get(0).transform.baseVal) && c.getItem ? c.getItem(0).matrix.a : 1;
        this.scale = b / c / a;
        c = $("#notation").position();
        d = $("#notation").scrollTop();
        this.line_offsets = [];
        for (a = 0; a < z.length; ++a)
            b = $(z[a]).position(),
        this.line_offsets[a] = d + b.top - c.top;
        this.line_offsets[a] = $("#notation")[0].scrollHeight - 500
    }
    ;
    k.prototype.compCountIn = function() {
        var a = {
            time: .25,
            num: 4
        }
        , b = 1 < this.time_ix ? this.time_ix - 1 : this.time_ix
        , c = Math.min(this.times.length - 1, b + 3);
        if (c > b) {
            var d = this.tixbts.slice(b, c).reduce(function(a, b) {
                return a + b
            }, 0);
            a.time = (this.times[c] - this.times[b]) / d / opt.speed;
            a.num = this.tixbts[b]
        }
        return a
    }
    ;
    n.prototype.pause = function() {
        this.clearKlok();
        U()
    }
    ;
    n.prototype.play = function() {
        this.paused = !1;
        if (-1 == this.klok) {
            var a = this;
            this.setKlok(function() {
                a.currentTime += a.step / 1E3 * opt.speed;
                U()
            }, this.step)
        }
    }
    ;
    n.prototype.setKlok = function(a, b) {
            -1 != this.klok && clearInterval(this.klok);
        this.klok = a ? setInterval(a, b) : -1;
        this.paused = !1;
        g && opt.nocsr && (g.noCursor = 1)
    }
    ;
    n.prototype.clearKlok = function() {
            -1 != this.klok && clearInterval(this.klok);
        this.klok = -1;
        this.paused = !0;
        g && (g.noCursor = 0)
    }
    ;
    var w = 0;
    $(document).ready(function() {
	console.log("doc ready");
        v = document.getElementById("notation");
	xml = document.getElementById("test-div").innerHTML;
	v.innerHTML = xml;
        ka = CSS.supports("scroll-behavior", "smooth");
        $("#drpuse").prop("checked", !1);
        za() || Aa(!0);
        $(window).resize(ha);
        $("body").keydown(D);
        $("#save").click(ya);
        $("#speed").change(function() {
            F(2)
        });
        $("#lopctl").click(sa);
        var a = '<a href="http://wim.vree.org/js/">abcweb</a> (version: ' + msc_VERSION + ")</br>\u00a9Willem Vree"
        , a = a + '<br>using:<br><a href="http://moinejf.free.fr/js/">abc2svg</a>, \u00a9Jef Moine';
        $("#help").prepend('<div style="position: absolute; right: 5px;">' + a + "</div>");
        $("#helpm").click(function() {
            $("#help").toggleClass("showhlp")
        });
        $("#meddiv").on("mousedown touchstart", Pa);
        $("#rollijn").on("mousedown touchstart", Qa);
        $("#fknp").change(function() {
            oa("btn", [])
        });
        $("#mknp").change(function() {
            ca("btn", [])
        });
        $("#yknp").click(Ga);
        $("#yubid").keydown(function(a) {
            a.stopPropagation()
        });
        $("#yubuse").change(ra);
        $("#drpuse").click(wa);
        $("#notation").mousedown(function() {
            Ba() || D({
                key: " "
            })
        });
        $("#jump").change(Ca);
        $("#impbox").change(p);
        $("#menu * input").change(Ca);
        $("#menu label").toggle();
        $("#mbar").click(function() {
            "none" == $("#menu label").css("display") ? $("#menu label").toggle(!0) : Da()
        });
        $("#woff").change(function() {
            W = $(this).prop("checked")
        });
        // $.event.props.push("dataTransfer");
        $("body").on("drop", Fa);
        $("body").on("dragover", function(a) {
            a.stopPropagation();
            a.preventDefault();
            a.dataTransfer.dropEffect = "copy"
        });
        $("body").on("dragenter dragleave", function() {
            $(this).toggleClass("indrag")
        });
        $("#fscr").on("change", Ra);
        $("body").on("fullscreenchange webkitfullscreenchange mozfullscreenchange", function() {
            var a = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
            $("#fscr").prop("checked", null != a)
        });
        $("body").on("play_end", function() {
            R >= play_list.length || (za(play_list[R]),
				      R += 1)
        })
    })
}
)();
