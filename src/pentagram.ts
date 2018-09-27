const phi: number = (1 + Math.sqrt(5))/2;
const q:   number = (2*phi) + 1;

class Pentagram {
    length: number;
    a: number;
    b: number;
    l: number;
    portion: number;
    margin: number;
    xPoints: number[];
    yPoints: number[];

    constructor(p: number, m: number, h: number, w: number) {
        this.portion = p;
        this.margin = m;
        this.l = w/this.portion;
        this.len = this.l - (2 * this.margin);
        this.b = this.len/q;
        this.a = phi * this.b;
        this.xPoints = [0,0,0,0,0];
        this.yPoints = [0,0,0,0,0];
        // Point A
        this.xPoints[0] = this.l + this.margin;
        this.yPoints[0] = h/(this.portion - 1);
        // Point B
        this.xPoints[1] = (2 * this.l) - this.margin;
        this.yPoints[1] = this.yPoints[0];
        // Point H
        this.xPoints[2] = this.xPoints[0] + (this.len/2);
        this.yPoints[2] = this.yPoints[0] + this.a;
        // Point C
        this.xPoints[3] = this.xPoints[2] + this.b;
        this.yPoints[3] = this.yPoints[0] - this.a - this.b;
        // Point D
        this.xPoints[4] = this.xPoints[2] - this.b;
        this.yPoints[4] = this.yPoints[3];
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


    draw() {
        // A -> B
        stroke(random(1, 255));
        line(this.xPoints[0], this.yPoints[0], this.xPoints[1], this.yPoints[1]);
        // B -> D
        line(this.xPoints[1], this.yPoints[1], this.xPoints[4], this.yPoints[4]);
        // D -> H
        line(this.xPoints[4], this.yPoints[4], this.xPoints[2], this.yPoints[2]);
        // H -> C
        line(this.xPoints[2], this.yPoints[2], this.xPoints[3], this.yPoints[3]);
        // C -> A
        line(this.xPoints[3], this.yPoints[3], this.xPoints[0], this.yPoints[0]);
    }
}


