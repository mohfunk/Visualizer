class Point {
    x: number;
    y: number;
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
    ver(p: p5) {
        p.vertex(this.x, this.y);
    }
    line(p: p5, pnt: Point) {
        p.line(this.x, this.y, pnt.x, pnt.y);
    }
    ofline(p: p5, pnt: Point, n: number) {
        p.line(this.x + n, this.y + n, pnt.x + n, pnt.y + n);
    }
    update(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
