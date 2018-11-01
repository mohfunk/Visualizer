class Pentagram {
    length : number;
    a      : number;
    b      : number;
    l      : number;
    portion: number;
    margin : number;
    xPoints: number[] = [];
    yPoints: number[] = [];
    div    : number;
    p      : p5
    ui     : Gui
    sw     : tweakable;
    sr     : tweakable;
    sg     : tweakable;
    sb     : tweakable;

    dim() {
        let wid = this.p.width;
        let hei = this.p.height;

        this.l = wid/this.portion;
        this.length = this.l - (2 * this.margin);
        this.b = this.length/q;
        this.a = phi * this.b;
        // Point A
        this.xPoints[0] = this.l + this.margin;
        this.yPoints[0] = hei/(this.portion - 1);
        // Point B
        this.xPoints[1] = (2 * this.l) - this.margin;
        this.yPoints[1] = this.yPoints[0];
        // Point H
        this.xPoints[2] = this.xPoints[0] + (this.length/2);
        this.yPoints[2] = this.yPoints[0] + this.a;
        // Point C
        this.xPoints[3] = this.xPoints[2] + this.b;
        this.yPoints[3] = this.yPoints[0] - this.a - this.b;
        // Point D
        this.xPoints[4] = this.xPoints[2] - this.b;
        this.yPoints[4] = this.yPoints[3];
    }
    setup(p: p5, ui: Gui, por: number, mar: number) {
        this.p = p;
        this.ui = ui;
        this.portion = por; 
        this.margin = mar;
        this.sw = new tweakable(ui, 1, 10, 2, 'stroke width');
        this.sr = new tweakable(ui, 0, 255, 255, 'R');
        this.sg = new tweakable(ui, 0, 255, 255, 'G');
        this.sb = new tweakable(ui, 0, 255, 255, 'B');
        this.dim();
    }


    shift(xFactor: number, yFactor: number) {
        for(let i: number = 0; i < 5; ++i) {
            this.xPoints[i] += xFactor;
            this.yPoints[i] += yFactor;
        }
    }

    scale(factor: number) {
        // Point A
        this.xPoints[0] -= factor ;
        // Point B
        this.xPoints[1] += factor;
        // Point H
        this.yPoints[2] += factor ;
        // Point C
        this.xPoints[3] += factor/phi;
        this.yPoints[3] -= factor/phi;
        // Point D
        this.xPoints[4] -= factor/phi;
        this.yPoints[4] -= factor/phi;

    }

    draw(p: p5) {

        // A -> B
        p.strokeWeight(this.sw.v());
        p.stroke(this.sr.v(), this.sg.v(), this.sb.v());
        p.endShape(p.CLOSE);  
        p.line(this.xPoints[0], this.yPoints[0], this.xPoints[1], this.yPoints[1]);
        // B -> D
        p.line(this.xPoints[1], this.yPoints[1], this.xPoints[4], this.yPoints[4]);
        // D -> H
        p.line(this.xPoints[4], this.yPoints[4], this.xPoints[2], this.yPoints[2]);
        // H -> C
        p.line(this.xPoints[2], this.yPoints[2], this.xPoints[3], this.yPoints[3]);
        // C -> A
        p.line(this.xPoints[3], this.yPoints[3], this.xPoints[0], this.yPoints[0]);
    }
}
