var Gui = (function () {
    function Gui() {
        this.cdiv = [];
        this.cont = [];
    }
    Gui.prototype.setup = function (p) {
        this.p = p;
        this.canv = p.createDiv();
        this.canv.id('canv');
        this.canv.hide();
        this.canv.class('debug');
        this.visi = false;
        this.cdiv[0] = p.createDiv();
        this.cdiv[0].class('cdiv');
        this.cdiv[0].parent(this.canv);
    };
    Gui.prototype.tog = function (p) {
        if (this.visi == false) {
            this.visi = true;
            this.canv.show();
        }
        else {
            this.visi = false;
            this.canv.hide();
        }
    };
    Gui.prototype.addDiv = function (cls) {
        var n = this.cdiv.push(this.p.createDiv());
        this.cdiv[n - 1].class(cls);
        this.cdiv[n - 1].parent(this.canv);
        return n - 1;
    };
    Gui.prototype.addS = function (min, max, def, label) {
        var n = this.cont.push(new sliderGui(this.p, min, max, def, label, this.cdiv[0]));
        return n - 1;
    };
    Gui.prototype.addelm = function (elm) {
        elm.parent(this.canv);
    };
    Gui.prototype.val = function (n) {
        return this.cont[n].val();
    };
    Gui.prototype.draw = function (p) {
    };
    return Gui;
}());
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.ver = function (p) {
        p.vertex(this.x, this.y);
    };
    Point.prototype.line = function (p, pnt) {
        p.line(this.x, this.y, pnt.x, pnt.y);
    };
    Point.prototype.ofline = function (p, pnt, n) {
        p.line(this.x + n, this.y + n, pnt.x + n, pnt.y + n);
    };
    Point.prototype.update = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Point;
}());
var Controller = (function () {
    function Controller(p, ui, pb) {
        this.p = p;
        this.ui = ui;
        this.pb = pb;
    }
    Controller.prototype.action = function (kc) {
        if (bug)
            console.log('key press: ' + kc);
        if (kc === 68)
            this.ui.tog(this.p);
        if (kc === 82) {
            this.pb.replay();
        }
        if (kc === 77)
            this.pb.mute();
        if (kc === 80)
            this.pb.pause();
        if (kc === 37)
            this.pb.backward();
        if (kc === 39)
            this.pb.forward();
        if (kc === 190)
            this.pb.next();
        if (kc === 188)
            this.pb.prev();
        if (kc === 90)
            this.pb.tog();
    };
    Controller.prototype.cons = function () {
    };
    return Controller;
}());
var step = (2 * Math.PI) / 5;
var smax = 5;
var bug = true;
var burl = '../assets/music/';
var nm = 'NEW_MODEL/';
var Pentagram = (function () {
    function Pentagram() {
        this.pnts = [];
    }
    Pentagram.prototype.dim = function () {
        var i = 0;
        for (var th = 0; th < 2 * Math.PI; th += step, ++i) {
            var xx = this.cx + (this.r * Math.cos(th - Math.PI / 2));
            var yy = this.cy + (this.r * Math.sin(th + Math.PI / 2));
            this.pnts[i].update(xx, yy);
        }
    };
    Pentagram.prototype.setup = function (p, ui) {
        this.p = p;
        this.ui = ui;
        this.r = 60;
        this.sw = new tweakable(ui, 1, 10, 3, 'stroke width');
        this.sr = new tweakable(ui, 0, 255, 255, 'R');
        this.sg = new tweakable(ui, 0, 255, 255, 'G');
        this.sb = new tweakable(ui, 0, 255, 255, 'B');
        for (var i = 0; i < 5; ++i)
            this.pnts[i] = new Point(0, 0);
        this.cx = (p.width / 2) - this.r / 2;
        this.cy = p.height / 2 - this.r / 2;
        this.dim();
    };
    Pentagram.prototype.shift = function (xFactor, yFactor) {
    };
    Pentagram.prototype.scale = function (factor) {
    };
    Pentagram.prototype.draw = function (p) {
        this.dim();
        p.push();
        p.stroke(this.sr.v(), this.sg.v(), this.sb.v());
        p.strokeWeight(this.sw.v());
        p.strokeJoin(p.MITER);
        p.fill(255, 0, 0);
        this.pnts[0].line(p, this.pnts[2]);
        this.pnts[2].line(p, this.pnts[4]);
        this.pnts[4].line(p, this.pnts[1]);
        this.pnts[1].line(p, this.pnts[3]);
        this.pnts[3].line(p, this.pnts[0]);
        p.pop();
    };
    return Pentagram;
}());
var Playback = (function () {
    function Playback(p, ui) {
        this.songs = [];
        this.urls = [];
        this.btns = [];
        this.p = p;
        this.ui = ui;
        for (var i = 0; i < 6; ++i)
            this.urls[i] = burl + nm;
        this.urls[0] += 'Birth_of_the_New_Model.wav';
        this.urls[1] += 'Tactical_Precision_Disarray.wav';
        this.urls[2] += 'Vantablack.wav';
        this.urls[3] += 'Tainted_Empire.wav';
        this.urls[4] += 'God_Complex.wav';
        this.urls[5] += 'Corrupted_by_Design.wav';
        this.visi = false;
    }
    Playback.prototype.setup = function () {
        var _this = this;
        this.btncon = this.p.createDiv();
        this.btncon.class('pb');
        for (var i = 0; i < 6; ++i) {
            this.btns[i] = this.p.createElement('i');
            this.btns[i].parent(this.btncon);
        }
        this.btns[0].class('fas fa-caret-left');
        this.btns[0].mousePressed(function () { return _this.prev(); });
        this.btns[1].class('fas fa-backward');
        this.btns[1].mousePressed(function () { return _this.backward(); });
        this.btns[2].class('fas fa-pause');
        this.btns[2].mousePressed(function () { return _this.pause(); });
        this.btns[3].class('fas fa-forward');
        this.btns[3].mousePressed(function () { return _this.forward(); });
        this.btns[4].class('fas fa-caret-right');
        this.btns[4].mousePressed(function () { return _this.next(); });
    };
    Playback.prototype.btnclick = function () {
        console.log('click');
    };
    Playback.prototype.preload = function () {
        this.songs[0] = this.p.loadSound(this.urls[0]);
        this.songs[1] = this.p.loadSound(this.urls[1]);
        this.songs[2] = this.p.loadSound(this.urls[2]);
        this.songs[3] = this.p.loadSound(this.urls[3]);
        this.songs[4] = this.p.loadSound(this.urls[4]);
        this.songs[5] = this.p.loadSound(this.urls[5]);
        this.playing = this.songs[0];
        this.duration = this.playing.duration();
        this.pi = 0;
    };
    Playback.prototype.play = function (index) {
        if (this.playing.isPlaying())
            this.playing.stop();
        if (index != undefined)
            this.pi = index;
        this.playing.play();
        if (!this.volume)
            this.volume = new tweakable(this.ui, 0.0, 1.0, 1.0, 'Volumn');
    };
    Playback.prototype.pause = function () {
        if (this.playing.isPlaying()) {
            this.playing.pause();
            this.btns[2].removeClass('fa-pause');
            this.btns[2].addClass('fa-play');
        }
        else {
            this.playing.play();
            this.btns[2].removeClass('fa-play');
            this.btns[2].addClass('fa-pause');
        }
    };
    Playback.prototype.replay = function () {
        this.playing.stop();
        this.playing.play();
    };
    Playback.prototype.forward = function () {
        var posn = this.playing.currentTime();
        var dur = this.playing.duration();
        this.playing.jump(posn + 10, (dur - (posn + 10)));
    };
    Playback.prototype.backward = function () {
        var posn = this.playing.currentTime();
        var dur = this.playing.duration();
        this.playing.jump(posn - 10, (dur - (posn - 10)));
    };
    Playback.prototype.mute = function () {
        var vol = this.p.getMasterVolume();
        if (vol != 0)
            this.p.masterVolume(0);
        if (vol != 1)
            this.p.masterVolume(1);
    };
    Playback.prototype.next = function () {
        if (this.pi < smax)
            this.changeSong(1);
        else
            this.play(0);
    };
    Playback.prototype.prev = function () {
        if (this.pi > 0)
            this.changeSong(-1);
        else
            this.play(5);
    };
    Playback.prototype.changeSong = function (d) {
        this.playing.stop();
        this.playing = this.songs[this.pi + d];
        this.duration = this.playing.duration();
        this.pi = this.pi + d;
        this.play();
    };
    Playback.prototype.mov = function () {
    };
    Playback.prototype.tog = function () {
        if (this.visi)
            this.visi = false;
        else
            this.visi = true;
    };
    Playback.prototype.drawGui = function () {
        this.p.masterVolume(this.volume.v());
        if (this.visi) {
            var y = this.p.height - this.p.height / 10;
            var xm = 100;
            this.p.fill(50, 50, 50, 100);
            this.p.rect(xm, y, this.p.width - xm * 2, 10);
            this.p.fill(200, 20, 20);
            console.log(this.duration);
            var xc = this.p.map(this.playing.currentTime(), 0, this.playing.duration(), xm, this.p.width - xm * 2);
            console.log(xc);
            this.p.rect(xc, y - 5, 5, 20);
        }
    };
    return Playback;
}());
var tweakable = (function () {
    function tweakable(ui, min, max, def, label) {
        this.min = min;
        this.max = max;
        this.def = def;
        this.val = def;
        this.uirf = ui;
        this.i = ui.addS(min, max, def, label);
    }
    tweakable.prototype.v = function () {
        return this.uirf.val(this.i);
    };
    return tweakable;
}());
var sliderGui = (function () {
    function sliderGui(p, min, max, def, label, par) {
        this.elm = p.createSlider(min, max, def, 0);
        this.elm.style('width', '500px');
        this.elm.parent(par);
        this.label = p.createP(label);
        this.label.parent(par);
        this.label.class('lbl');
    }
    sliderGui.prototype.val = function () {
        var n = this.elm.value();
        return n;
    };
    return sliderGui;
}());
var Vui = (function () {
    function Vui() {
    }
    Vui.prototype.setup = function (p) {
        this.fft = new p5.FFT();
    };
    Vui.prototype.draw = function (p) {
        this.spc = this.fft.analyze();
        this.oct = this.fft.getOctaveBands(256, 120);
        this.avg = this.fft.logAverages(this.oct);
        for (var i = 0; i < this.avg.length; ++i) {
            var alpha;
            p.noStroke();
            p.fill(this.avg[i] * (this.avg[i] * 0.1), this.avg[i] * 0.005, this.avg[i] * 0.0003, this.avg[i]);
            p.rect(i * 1.5, p.height, 1.5, -p.height - this.avg[i] * 3);
        }
    };
    return Vui;
}());
var sound;
var pents = [];
var ui;
var vi;
var pb;
var cn;
var sketch = function (p) {
    ui = new Gui();
    vi = new Vui();
    pb = new Playback(p, ui);
    cn = new Controller(p, ui, pb);
    for (var i = 0; i < 10; ++i)
        pents[i] = new Pentagram();
    p.preload = function () {
        pb.preload();
    };
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        ui.setup(p);
        vi.setup(p);
        pents[0].setup(p, ui);
        pb.setup();
        pb.play();
        p.frameRate(24);
    };
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        if (pents[0]) {
            pents[0].dim();
        }
    };
    p.draw = function () {
        var frame = 180;
        var time = p.frameCount / frame;
        p.background(0);
        p.resetMatrix();
        pents[0].draw(p);
        p.resetMatrix();
        vi.draw(p);
        p.resetMatrix();
        pb.drawGui();
    };
    p.keyPressed = function () {
        var kc = p.keyCode;
        cn.action(kc);
    };
};
var sketchP = new p5(sketch);
//# sourceMappingURL=build.js.map