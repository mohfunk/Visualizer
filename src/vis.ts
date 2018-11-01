class Vui {
    fft: p5.FFT;
    amp: p5.Amplitude;
    spc: any;
    oct: any;
    avg: any;
    

    setup(p: p5) {
        this.fft = new p5.FFT();
    }

    draw(p: p5) {
        this.spc = this.fft.analyze();
        this.oct = this.fft.getOctaveBands(256, 120);
        this.avg = this.fft.logAverages(this.oct);
        for(let i: number = 0; i < this.avg.length; ++i) {
            var alpha: number;
            p.strokeWeight(0.1);
            p.fill(this.avg[i]*(this.avg[i]*0.1), this.avg[i]*0.005, this.avg[i]*0.0003, this.avg[i]);
            p.rect(i*2, p.height, 2, -this.avg[i]*3);
        }
    }
}
