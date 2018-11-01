class Playback {
    p      : p5;
    playing: p5.SoundFile;
    url: string = '../assets/music/cofl.mp3';

    constructor(p: p5) {
        this.p = p;
    }
    load() {
        this.playing =  (this.p as any).loadSound(this.url);
    }
    play() {
        this.playing.play();
    }
    pause() {
        this.playing.pause();
    }
    replay() {
        this.playing.stop();
        this.playing.play();
    }
    forward() {
    
    }
    backward() {
    
    }
    next() {
    
    }
    prev() {
    
    }
    vu() {
    
    }
    vd() {
    
    }
    
}
