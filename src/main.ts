let sound: any;
let debugMode: boolean = false;
let songDuration: number;
let fft: any;
let amp: any;
let currsong: any;
let sample: number;
let sampleSlider: any;
let sLib: object;
function preload() {
    sLib = loadJSON("../assets/json/songs.json");
    sound = loadSound("../assets/music/new_model/God_Complex.wav");
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
    sampleSlider = createSlider(2, 1024, 2, 64);
    sampleSlider.position(10,10);
    sampleSlider.style("width", "500px");
    pent.shift(-width/2, -height/2);
    pent.scale(10);
    fft = new p5.FFT();
    amp = new p5.Amplitude();
    // songDuration = sound.duration();
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
    var ocbands = fft.getOctaveBands(sampleSlider.value(), 16);
    var logavg = fft.logAverages(ocbands);
    console.log(logavg);
    var rran = random(0.8, 1);
    var gran = random(0.1, 0.2);
    var bran = random(0.1, 0.9);
    for(let i: number = 0; i < logavg.length; ++i) {
        var alpha: number;
        noStroke();
        fill(logavg[i]*(logavg[i]*0.005)*rran, logavg[i]*gran, logavg[i]*0.005*bran, logavg[i]);
        rect(i*1 - (width/2), height * 0.5, 5*logavg[i]*0.2, -logavg[i]*(logavg[i]*0.05)*0.51);
        fill(logavg[i]*(logavg[i]*0.005)*rran, logavg[i]*gran, logavg[i]*bran, logavg[i]);
        rect(i*(-1) + (width/2) - 200, height * 0.5, 5*logavg[i]*0.2, -logavg[i]*(logavg[i]*0.05)*0.51);
    }

        stroke(logavg[55]*(logavg[35]*0.005)*rran, logavg[87]*gran, logavg[23]*bran, 40);
        pent.draw();
}

