class Playback {
    p      : p5;
    playing: p5.SoundFile;
    pi: number
    songs: p5.SoundFile[] = [];
    urls: string[] = [];

    constructor(p: p5) {
        this.p = p;
        this.urls[0] = '../assets/music/nm/Birth_of_the_New_Model.wav';
        this.urls[1] = '../assets/music/nm/Corrupted_by_Design.wav';
        this.urls[2] = '../assets/music/nm/Tactical_Precision_Disarray.wav';
        this.urls[4] = '../assets/music/nm/God_Complex.wav';
        this.urls[5] = '../assets/music/nm/Vantablack.wav';
        this.urls[6] = '../assets/music/nm/Tainted_Empire.wav';
    }
    preload() {
        this.songs[0] =  (this.p as any).loadSound(this.urls[0]);
        this.songs[1] =  (this.p as any).loadSound(this.urls[1]);
        this.songs[2] =  (this.p as any).loadSound(this.urls[2]);
        this.playing  = this.songs[0];
        this.pi = 0;
    }
    play() {
        this.playing.play();
    }
    pause() {
        if(this.playing.isPlaying())
            this.playing.pause();
        else this.playing.play();
    }
    replay() {
        this.playing.stop();
        this.playing.play();
    }
    forward() {
        let posn: number = this.playing.currentTime();
        let dur: number = this.playing.duration();
        this.playing.jump(posn + 10, (dur - (posn + 10)));

    }
    backward() { 
        let posn: number = this.playing.currentTime();
        let dur: number = this.playing.duration();
        this.playing.jump(posn - 10, (dur - (posn - 10)));
    }
    mute() {
        let vol: number = this.p.getMasterVolume();
        if( vol != 0 ) this.p.masterVolume(0); 
        if( vol != 1 ) this.p.masterVolume(1); 
    }
    next() {
        this.playing.stop();
        this.playing = this.songs[this.pi + 1];
        this.pi++;
        this.play();
    }
    prev() {
        this.playing.stop();
        this.playing = this.songs[this.pi - 1];
        this.pi--;
        this.play();
    }
    vu(){
        let vol: number = this.p.getMasterVolume();
        this.p.masterVolume(vol + 0.05); 

    }
    vd() {
        let vol: number = this.p.getMasterVolume();
        this.p.masterVolume(vol - 0.05); 
    }

}
