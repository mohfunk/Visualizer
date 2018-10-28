class debugGui {
    private canv: p5.Element;
    private cont: p5.Element[] = [];
    private visi: boolean;
    setup(p: p5) {
        this.canv = p.createDiv();
        this.canv.hide();
        this.canv.class('debug');
        this.visi = false;
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
        let n: number = this.cont.push(p.createSlider(0,255,100));
        this.cont[n-1].parent(this.canv);
    }
    draw(p: p5) {
        p.resetMatrix();
        p.noStroke();
        p.fill(255, 255, 255, 50);
        p.rect(0, 0, p.width, p.height);
    
    }

}
