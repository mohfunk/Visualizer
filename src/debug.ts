class vis {
    prev: number[];
    curr: number[];
    sample_size: number;
    scor: number[];
    constructor(ss: number) {
        this.sample_size = ss;
        for(let i: number = 0; i < ss; ++i) {
           this.prev[i] = 0;
           this.curr[i] = 0;
           this.scor[i] = 0; 
        }

    }
}
