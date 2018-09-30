
let sound: any[];
let debugMode: boolean = false;
let songDuration: number;
let fft: any;
let amp: any;
let currsong: any;
let sample: number;
let sampleSlider: any;
function preload() {
    sLib = new SoundLib(2, '../assets/music');
    currsong = loadSound('../assets/music/the_uncanny_valley/06_Disco_Inferno.mp3');
    sLib.songs[0] = currsong;
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
    sampleSlider = createSlider(2, 1024, 16, 64);
    sampleSlider.position(10,10);
    sampleSlider.style("1000px", "80px");
    pent.shift(-width/2, -height/2);
    pent.scale(10);
    sLib = new SoundLib(2, '../assets/music');
    sLib.load('the_uncanny_valley', '06_Disco_Inferno.mp3');
    sLib.load('the_uncanny_valley', '03_Death_Squad.mp3');
    fft = new p5.FFT();
    amp = new p5.Amplitude();
    // songDuration = sound.duration();
    currsong.play();
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
        push();
        fill(logavg[i]*(logavg[i]*0.005)*rran, logavg[i]*gran, logavg[i]*bran, 90);
        rect(i*20 - (width/2), height * 0.5, 20, -logavg[i]*(logavg[i]*0.05)*0.51);
        stroke(logavg[i]*(logavg[i]*0.005)*rran, logavg[i]*gran, logavg[i]*bran, 40);
        pent.draw();
        pop();
    }
}

