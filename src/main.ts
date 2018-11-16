import 'p5'
require('p5/lib/addons/p5.sound')
import Greeter from './Greeter';
var sketch = (p: p5) => {

    p.preload = () => {
    }
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    }
    p.draw = () => {
    }
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
    p.keyPressed = () => {
    }

}
var sketchP = new p5(sketch);

const greeter = new Greeter("Hello, world!");
document.body.innerHTML = greeter.greet();
