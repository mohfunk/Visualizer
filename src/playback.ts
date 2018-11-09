class Playback {
    p       : p5;
    playing : p5.SoundFile;
    duration: number;
    pi      : number;
    songs   : p5.SoundFile[] = [];
    urls    : string[] = [];
    visi    : boolean; 
    ui_index: number;
    ui      : Gui;
    volume  : tweakable;
    timeLine: p5.Element;

    constructor(p: p5, ui: Gui) {
        this.p = p;
        this.ui = ui;
        for(var i = 0; i < 6; ++i) this.urls[i] = burl + nm;
        this.urls[0] += 'Birth_of_the_New_Model.wav';
        this.urls[1] += 'Tactical_Precision_Disarray.wav';
        this.urls[2] += 'Vantablack.wav';
        this.urls[3] += 'Tainted_Empire.wav';
        this.urls[4] += 'God_Complex.wav';
        this.urls[5] += 'Corrupted_by_Design.wav';
        this.visi = false;
    }
    setup() {
    
    }
    preload() {
        this.songs[0] =  (this.p as any).loadSound(this.urls[0]);
        this.songs[1] =  (this.p as any).loadSound(this.urls[1]);
        this.songs[2] =  (this.p as any).loadSound(this.urls[2]);
        this.songs[3] =  (this.p as any).loadSound(this.urls[3]);
        this.songs[4] =  (this.p as any).loadSound(this.urls[4]);
        this.songs[5] =  (this.p as any).loadSound(this.urls[5]);
        this.playing  = this.songs[0];
        this.duration = this.playing.duration();
        this.pi = 0;
    }
    play() {
        this.playing.play();
        if(!this.volume) this.volume = new tweakable(this.ui, 0.0, 1.0, 1.0, 'Volumn');
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
        this.changeSong(1);
    }
    prev() {
        this.changeSong(-1);
    }
    changeSong(d: number) {
        this.playing.stop();
        this.playing = this.songs[this.pi + d];
        this.duration = this.playing.duration();
        this.pi = this.pi + d;
        this.play();
    }
    mov() {
        
    } 
    tog() {
        if(this.visi) this.visi = false;
        else this.visi = true;
    }
    drawGui() {
        this.p.masterVolume(this.volume.v());
        if(this.visi) {
        let y: number = this.p.height - this.p.height/10;
        let xm: number = 100;
        this.p.fill(50, 50, 50, 100);
        this.p.rect(xm, y, this.p.width - xm*2, 10);
        this.p.fill(200, 20, 20);
        console.log(this.duration);
        let xc: number = this.p.map(this.playing.currentTime(), 0, this.playing.duration(), xm, this.p.width - xm*2);
        console.log(xc);
        this.p.rect(xc, y-5, 5, 20);
        }
    }

}
