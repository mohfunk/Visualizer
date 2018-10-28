class debugGui {
    private canv: p5.Element;
    private cdiv: p5.Element[] = [];
    private cont: p5.Element[] = [];
    private visi: boolean;
    setup(p: p5) {
        this.canv = p.createDiv() as p5.Element;
        this.canv.hide();
        this.canv.class('debug');
        this.visi = false;
        this.cdiv[0] = p.createDiv() as p5.Element;
        this.cdiv[0].class('cdiv');
        this.cdiv[0].parent(this.canv);
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

    addVar(p: p5) {
        let n: number = this.cont.push(p.createSlider(0,255,100) as p5.Element);
        this.cont[n-1].parent(this.cdiv[0]);
    }
    draw(p: p5) {
    
    }

}
