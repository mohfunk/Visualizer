let sound: p5.SoundFile;
let pents: Pentagram[] = [];
let ui: Gui;
let vi: Vui;
let pb: Playback;
let cn: Controller;
var sketch = (p: p5) => {
    ui = new Gui();
    vi = new Vui();
    pb = new Playback(p, ui);
    cn = new Controller(p, ui, pb);

    for(var i = 0; i < 10; ++i) pents[i] = new Pentagram();
    p.preload = () => {
        pb.preload();
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        ui.setup(p);
        vi.setup(p);
        pents[0].setup(p, ui);
        pb.play();
        p.frameRate(24);
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        if(pents[0]) {
            pents[0].dim();
        }
    }

    p.draw = () => {
        let frame: number = 180;
        let time: number = p.frameCount/frame;
        p.background(0);
        p.resetMatrix();
        pents[0].draw(p);
        p.resetMatrix();
        vi.draw(p);
        p.resetMatrix();
        pb.drawGui();

    }
    p.keyPressed = () => {
        let kc: number = p.keyCode;
        cn.action(kc);
    }
}

var sketchP = new p5(sketch);
