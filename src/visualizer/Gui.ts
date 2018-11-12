
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.min.js';
import 'p5/lib/addons/p5.dom.min.js';
import sliderGui from './uiElem';
export default class Gui {
    private canv: p5.Element;
    private cdiv: p5.Element[] = [];
    private cont: any = [];
    private visi: boolean;
    p: p5;
    setup(p: p5) {
        this.p = p;
        this.canv = p.createDiv() as p5.Element;
        this.canv.id('canv');
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
    addDiv(cls: string): number {
        let n: number = this.cdiv.push( this.p.createDiv() as p5.Element);
        this.cdiv[n-1].class(cls);
        this.cdiv[n-1].parent(this.canv);
        return n-1;
    }
    addS(min: number, max: number, def: number, label: string) : number {
        let n: number = this.cont.push( new sliderGui(this.p, min, max, def, label, this.cdiv[0]));
        return n-1;
    }
    
    addelm(elm: p5.Element) {
        elm.parent(this.canv);
    }
    val(n: number) {
        return this.cont[n].val();
    }
    draw(p: p5) {

    }

}
