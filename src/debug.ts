interface baseGui {
    elm   : p5.Element;
    label : p5.Element;
    val() : any;
}

class sliderGui implements baseGui {
    elm   : p5.Element;
    label : p5.Element;
    constructor(p: p5, min: number, max: number, def: number, label: string, par: p5.Element) {
        this.elm   = p.createSlider(min, max, def, 0) as p5.Element;
        this.elm.parent(par);
        this.label = p.createP(label) as p5.Element;
        this.label.parent(par);
        this.label.class('lbl');
    }
    val() {
       let n = this.elm.value();
       return n;
    }
}
class Gui {
    private canv: p5.Element;
    private cdiv: p5.Element[] = [];
    private cont: any = [];
    private visi: boolean;
    p: p5;
    setup(p: p5) {
        this.canv = p.createDiv() as p5.Element;
        this.canv.hide();
        this.canv.class('debug');
        this.visi = false;
        this.cdiv[0] = p.createDiv() as p5.Element;
        this.cdiv[0].class('cdiv');
        this.cdiv[0].parent(this.canv);
        this.p = p;
    }
    tog(p: p5) {
        if(this.visi == false) {
            this.visi = true;
            this.canv.show();
        } else {
            this.visi = false;
            this.canv.hide();
        }
    }

    addS(min: number, max: number, def: number, label: string) : number {
        let n: number = this.cont.push( new sliderGui(this.p, min, max, def, label, this.cdiv[0]));
        return n-1;
    }

    val(n: number) {
        return this.cont[n].val();
    }
    draw(p: p5) {
    
    }

}

class tweakable {
    min: number
    max: number
    def: number
    ind: number
    val: number
    i  : number
    uirf: Gui
    constructor(ui: Gui, min: number, max: number, def: number, label: string) {
        this.min = min;
        this.max = max;
        this.def = def;
        this.val = def;
        this.uirf = ui;
        this.i = ui.addS(min, max, def, label);
    }
    v(): number {
        return this.uirf.val(this.i);
    }
}
