class Controller {

    p : p5;
    ui: Gui;
    pb: Playback;
    constructor(p: p5, ui: Gui, pb: Playback) {
        this.p = p;
        this.ui = ui;
        this.pb = pb;
    }

    action(kc: number) {
        if(bug) console.log('key press: '+ kc)
        if(kc === 68) this.ui.tog(this.p);
        if(kc === 82) {
            this.pb.replay();
        }
        if(kc === 77) this.pb.mute();
        if(kc === 80) this.pb.pause();
        if(kc === 37) this.pb.backward();
        if(kc === 39) this.pb.forward();
        if(kc === 190) this.pb.next();
        if(kc === 188) this.pb.prev();
        if(kc === 90) this.pb.tog();
    }

    cons() {
    
    }
}
