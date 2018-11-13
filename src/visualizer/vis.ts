
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.min.js';
import 'p5/lib/addons/p5.dom.min.js';
export default class Vui {
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
            var scal: number = i*i/10000
            p.noStroke();
            p.fill(this.avg[i]*(this.avg[i]*scal), this.avg[i]*0.005, this.avg[i]*0.0003, this.avg[i]+scal);
            p.rect(i*3, p.height, 1, -p.height - this.avg[i]*3);
        }
    }
}
