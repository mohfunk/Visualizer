class tweakable {
    min: number
    max: number
    def: number
    ind: number
    val: number
    i  : number
    uirf: Gui
    constructor(ui: Gui, min: number, max: number, def: number, label: string) {
        this.min = min;
        this.max = max;
        this.def = def;
        this.val = def;
        this.uirf = ui;
        this.i = ui.addS(min, max, def, label);
    }
    v(): number {
        return this.uirf.val(this.i);
    }
}
