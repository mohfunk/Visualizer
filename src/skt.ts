let sound: p5.SoundFile[] = [];
let pents: Pentagram[] = [];
var sketch = (p: p5) => {

    const gui = new debugGui();
    for(var i = 0; i < 10; ++i) pents[i] = new Pentagram();

    p.preload = () => {
        sound[0] =  p.loadSound('../assets/music/the_uncanny_valley/03_Death_Squad.mp3');
        sound[1] =  p.loadSound('../assets/music/the_uncanny_valley/06_Disco_Inferno.mp3');
        sound[2] =  p.loadSound('../assets/music/the_uncanny_valley/12_Souls_At_Zero_(Feat._Astronoid).mp3');
    }
    
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        pents[0].setup(p, 3, 100, p.height, p.width);
        gui.setup(p);
        gui.addVar(p);
        sound[1].play();
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
            sound[1].stop();
            sound[1].play();
        }
    }
}

var sketchP = new p5(sketch);
