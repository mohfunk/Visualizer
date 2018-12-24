class Pentagram {
    cx     : number;
    cy     : number;
    r      : number;
    pnts   : Point[] = [];
    div    : number;
    p      : p5
    ui     : Gui
    rt     : tweakable;
    sw     : tweakable;
    sr     : tweakable;
    sg     : tweakable;
    sb     : tweakable;
    dim() {
        this.r = this.rt.v();
        var i = 0;
        for(var th = 0; th < 2*Math.PI; th+=step, ++i) {
            let xx = this.cx + (this.rt.v() * Math.cos(th - Math.PI/2));
            let yy = this.cy + (this.rt.v() * Math.sin(th + Math.PI/2));
            this.pnts[i].update(xx, yy); 
        }
    }
    setup(p: p5, ui: Gui) {
        this.p  = p;
        this.ui = ui;
        this.cx = p.width/2;
        this.cy = p.height/2;
        this.r  = 25;
        this.sw = new tweakable(ui, 1, 10, 3, 'stroke width');
        this.sr = new tweakable(ui, 0, 255, 255, 'R');
        this.sg = new tweakable(ui, 0, 255, 255, 'G');
        this.sb = new tweakable(ui, 0, 255, 255, 'B');
        this.rt  = new tweakable(ui, 1, 1000, 25, 'Pentagram Radius');
        for(var i = 0; i < 5; ++i) this.pnts[i] = new Point(0,0);
        this.dim();
    }

    shift(xFactor: number, yFactor: number) {
    }

    scale(factor: number) {
    }
    draw(p: p5) {
        this.dim();
        p.push();
        p.stroke(this.sr.v(), this.sg.v(), this.sb.v());
        p.strokeWeight(this.sw.v());
        p.strokeJoin(p.MITER);
        p.fill(255, 0, 0);
        this.pnts[0].line(p, this.pnts[2]);
        this.pnts[2].line(p, this.pnts[4]);
        this.pnts[4].line(p, this.pnts[1]);
        this.pnts[1].line(p, this.pnts[3]);
        this.pnts[3].line(p, this.pnts[0]);
        p.pop();
    }
}
