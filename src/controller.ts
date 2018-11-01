class Controller {

    p : p5;
    ui: Gui;
    pb: Playback;
    constructor(p: p5, ui: Gui, pb: Playback) {
        this.p = p5;
        this.ui = ui;
        this.pb = pb;
    }

    action(kc: number) {
        if(bug) console.log('key press: '+ kc)
        if(kc === 68) this.ui.tog(this.p);
        if(kc === 82) {
            this.pb.replay();
        }
    }

    cons() {
    
    }
}
