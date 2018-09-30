class DebugUI {
    num: number;
    draw: boolean;
    sampleSlider: any;
    constructor() {
        sampleSlider = createSlider(2, 1024, 16, 2);
    }
}
