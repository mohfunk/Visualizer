import p5 from 'p5'
import 'p5/lib/addons/p5.sound.min.js'
import 'p5/lib/addons/p5.dom.min.js'
import tweakable from './tweakable'

const smax: number = 3;
let burl = './music/';
let nm = 'NEW_MODEL/';
let am = 'I_AM_THE_NIGHT/';
let uv = 'THE_UNCANNY_VALLEY/';
let dd = 'DANGEROUS_DAYS/';
export default class Playback {
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
    btncon: p5.Element;
    btns    : p5.Element[] = [];

    constructor(p: p5, ui: Gui) {
        this.p = p;
        this.ui = ui;
        for(var i = 0; i < 4; ++i) this.urls[i] = burl;
        this.urls[0] += uv + 'disco-inferno.wav';
        this.urls[1] += nm + 'Tactical_Precision_Disarray.wav';
        this.urls[2] += dd + 'future-club.wav';
        this.urls[3] += am + 'eclipse.wav';
        this.visi = false;

    }
    setup() {
        this.btncon = this.p.createDiv() as p5.Element;
        this.btncon.class('pb');
        for(var i = 0; i < 5; ++i) {
            this.btns[i] = this.p.createElement('i') as p5.Element;
            this.btns[i].parent(this.btncon);

        }
        this.btns[0].class('fas fa-caret-left');
        this.btns[0].mousePressed( () => this.prev());
        this.btns[1].class('fas fa-backward');
        this.btns[1].mousePressed( () => this.backward());
        this.btns[2].class('fas fa-pause');
        this.btns[2].mousePressed( () => this.pause());
        this.btns[3].class('fas fa-forward');
        this.btns[3].mousePressed( () => this.forward());
        this.btns[4].class('fas fa-caret-right');
        this.btns[4].mousePressed( () => this.next());

    }
    btnclick() {
        console.log('click');
    }
    preload() {
        this.songs[0] =  (this.p as any).loadSound(this.urls[0]);
        this.songs[1] =  (this.p as any).loadSound(this.urls[1]);
        this.songs[2] =  (this.p as any).loadSound(this.urls[2]);
        this.songs[3] =  (this.p as any).loadSound(this.urls[3]);
        this.playing  = this.songs[0];
        this.duration = this.playing.duration();
        this.pi = 3;
    }
    play(index?: number) {
        if(this.playing.isPlaying()) this.playing.stop();
        if(index != undefined) this.pi = index;
        this.playing.play();
        if(!this.volume) this.volume = new tweakable(this.ui, 0.0, 1.0, 1.0, 'Volumn');
    }
    pause() {
        if(this.playing.isPlaying()) {
            this.playing.pause();
            this.btns[2].removeClass('fa-pause');
            this.btns[2].addClass('fa-play');
        }
        else { 
            this.playing.play();
            this.btns[2].removeClass('fa-play');
            this.btns[2].addClass('fa-pause');
        }
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
        if(this.pi < smax)
            this.changeSong(1);
        else
            this.play(0);
    }
    prev() {
        if(this.pi > 0)
            this.changeSong(-1);
        else
            this.play(5)
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
