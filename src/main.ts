
let sound: any;
let debugMode: boolean = false;
let songDuration: number;
let fft: any;
let amp: any;

function preload() {
    sound = loadSound('../assets/music/new_model/Vantablack.wav');
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if(pent) {
        pent = null;
        pent = new Pentagram(3, 100, height, width);
        pent.shift(-width/2, -height/2);
        pent.scale(10);

    }
}
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    background(0);
    pent = new Pentagram(3, 100, height, width);
    pent.shift(-width/2, -height/2);
    pent.scale(10);
    fft = new p5.FFT();
    amp = new p5.Amplitude();
    songDuration = sound.duration();
    sound.play();
}

function draw() {
    background(0);
    noStroke();
    fill(255, 255, 255, 30);
    if(debugMode) {
        rect(50+(-width/2), height*0.85+(-height/2), width-100, 10);
        let pointer: number = sound.currentTime();
        map(pointer, 0, songDuration, 50, (width-50));
        fill(220, 10, 15);
        rect(pointer,height*0.85+(-height/2), 5, 20);
    }
    var spect = fft.analyze();

    push();
    pent.draw();
    pop();
}


}

function keyPressed() {
    console.log("key pressed");
    console.log(keyCode);
    var soundPosn = sound.currentTime();
    console.log("current time = " + soundPosn);

    // Pause toggle wiht p 
    if(keyCode == 80) {
        if(sound.isPlaying()) {
            sound.pause();

        } else {
            sound.play();
        }

    }

    if(keyCode === LEFT_ARROW) {
        console.log("jumping backwards")
        sound.jump(soundPosn - 5);
    }

    if(keyCode === RIGHT_ARROW) {
        console.log("jumping Forward")
        sound.jump(soundPosn + 10);     
    }
    /*
    // +
    if(keyCode == 187) {
        console.log("volume +");
        setVolume(getMasterVolume() + 0.05);
    }
    // -
    if(keyCode == 189) {
        console.log("volume -");
        setVolume((getMasterVolume() - 0.05), 0.1, 0.1);       
    }
     */
}
