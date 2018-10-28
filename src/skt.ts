let sound: p5.SoundFile;
let pents: Pentagram[] = [];
var sketch = (p: p5) => {

    const gui = new debugGui();
    for(var i = 0; i < 10; ++i) pents[i] = new Pentagram();
    p.preload = () => {
        sound =  (p as any).loadSound('../assets/music/the_uncanny_valley/12_Souls_At_Zero_(Feat._Astronoid).mp3');
    }
    
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        gui.setup(p);
        pents[0].setup(p, 3, 100, p.height, p.width);
        pents[0].tweek(p, gui);
        sound.play();
    }
    
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
    
    p.draw = () => {
        let frame: number = 180;
        let time: number = p.frameCount/frame;
        p.background(0);
        pents[0].draw(p);
    }
    p.keyPressed = () => {
        let kc: number = p.keyCode;
        if(bug) console.log('key press: '+ kc)
        if(kc === 68) gui.tog(p);
        if(kc === 82) {
            sound.stop();
            sound.play();
        }
    }
}

var sketchP = new p5(sketch);
