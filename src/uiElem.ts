interface baseGui {
    elm   : p5.Element;
    label : p5.Element;
    val() : any;
}

class sliderGui implements baseGui {
    elm   : p5.Element;
    label : p5.Element;
    constructor(p: p5, min: number, max: number, def: number, label: string, par: p5.Element) {
        this.elm = p.createSlider(min, max, def, 0) as p5.Element;
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
