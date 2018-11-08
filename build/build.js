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
    Gui.prototype.val = function (n) {
        return this.cont[n].val();
    };
    Gui.prototype.draw = function (p) {
    };
    return Gui;
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
var phi = (1 + Math.sqrt(5)) / 2;
var q = (2 * phi) + 1;
var sm = 2;
var bug = true;
var Pentagram = (function () {
    function Pentagram() {
        this.xPoints = [];
        this.yPoints = [];
    }
    Pentagram.prototype.dim = function () {
        var wid = this.p.width;
        var hei = this.p.height;
        this.l = wid / this.portion;
        this.length = this.l - (2 * this.margin);
        this.b = this.length / q;
        this.a = phi * this.b;
        this.xPoints[0] = this.l + this.margin;
        this.yPoints[0] = hei / (this.portion - 1);
        this.xPoints[1] = (2 * this.l) - this.margin;
        this.yPoints[1] = this.yPoints[0];
        this.xPoints[2] = this.xPoints[0] + (this.length / 2);
        this.yPoints[2] = this.yPoints[0] + this.a;
        this.xPoints[3] = this.xPoints[2] + this.b;
        this.yPoints[3] = this.yPoints[0] - this.a - this.b;
        this.xPoints[4] = this.xPoints[2] - this.b;
        this.yPoints[4] = this.yPoints[3];
    };
    Pentagram.prototype.setup = function (p, ui, por, mar) {
        this.p = p;
        this.ui = ui;
        this.portion = por;
        this.margin = mar;
        this.sw = new tweakable(ui, 1, 10, 5, 'stroke width');
        this.sr = new tweakable(ui, 0, 255, 255, 'R');
        this.sg = new tweakable(ui, 0, 255, 255, 'G');
        this.sb = new tweakable(ui, 0, 255, 255, 'B');
        this.dim();
    };
    Pentagram.prototype.shift = function (xFactor, yFactor) {
        for (var i = 0; i < 5; ++i) {
            this.xPoints[i] += xFactor;
            this.yPoints[i] += yFactor;
        }
    };
    Pentagram.prototype.scale = function (factor) {
        this.xPoints[0] -= factor;
        this.xPoints[1] += factor;
        this.yPoints[2] += factor;
        this.xPoints[3] += factor / phi;
        this.yPoints[3] -= factor / phi;
        this.xPoints[4] -= factor / phi;
        this.yPoints[4] -= factor / phi;
    };
    Pentagram.prototype.draw = function (p) {
        p.strokeWeight(this.sw.v());
        p.stroke(this.sr.v(), this.sg.v(), this.sb.v());
        p.endShape(p.CLOSE);
        p.line(this.xPoints[0], this.yPoints[0], this.xPoints[1], this.yPoints[1]);
        p.line(this.xPoints[1], this.yPoints[1], this.xPoints[4], this.yPoints[4]);
        p.line(this.xPoints[4], this.yPoints[4], this.xPoints[2], this.yPoints[2]);
        p.line(this.xPoints[2], this.yPoints[2], this.xPoints[3], this.yPoints[3]);
        p.line(this.xPoints[3], this.yPoints[3], this.xPoints[0], this.yPoints[0]);
    };
    return Pentagram;
}());
var Playback = (function () {
    function Playback(p, ui) {
        this.songs = [];
        this.urls = [];
        this.p = p;
        this.ui = ui;
        this.urls[0] = '../assets/music/UNCANNY_VALLEY_BOUNES/Hard_Wired_Instrumental.wav';
        this.urls[1] = '../assets/music/UNCANNY_VALLEY/Disco_Inferno.wav';
        this.urls[2] = '../assets/music/CYGNUS/Cygnus.wav';
        this.urls[3] = '../assets/music/DANGOURS_DAYS/Future_Club.wav';
        this.visi = false;
    }
    Playback.prototype.setup = function () {
    };
    Playback.prototype.preload = function () {
        this.songs[0] = this.p.loadSound(this.urls[0]);
        this.songs[1] = this.p.loadSound(this.urls[1]);
        this.songs[2] = this.p.loadSound(this.urls[2]);
        this.songs[3] = this.p.loadSound(this.urls[3]);
        this.playing = this.songs[0];
        this.duration = this.playing.duration();
        this.pi = 0;
    };
    Playback.prototype.play = function () {
        this.playing.play();
        if (!this.volume)
            this.volume = new tweakable(this.ui, 0.0, 1.0, 1.0, 'Volumn');
    };
    Playback.prototype.pause = function () {
        if (this.playing.isPlaying())
            this.playing.pause();
        else
            this.playing.play();
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
        this.changeSong(1);
    };
    Playback.prototype.prev = function () {
        this.changeSong(-1);
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
        pents[0].setup(p, ui, 3, 100);
        pb.play();
        p.frameRate(144);
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