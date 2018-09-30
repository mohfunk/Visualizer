
function keyPressed() {
    console.log("key pressed");
    console.log(keyCode);
    var soundPosn = sound.currentTime();
    console.log("current time = " + soundPosn);

    // Pause toggle wiht p 
    if(keyCode == 80) {
        if(sound.isPlaying()) {
            sound.pause();

        } else {
            sound.play();
        }

    }

    if(keyCode === LEFT_ARROW) {
        console.log("jumping backwards")
        sound.jump(soundPosn - 5);
    }

    if(keyCode === RIGHT_ARROW) {
        console.log("jumping Forward")
        sound.jump(soundPosn + 10);     
    }
    // d
    if(keyCode == 68) {
        if(debugMode) {
            debugMode = false;
        } else {
            debugMode = true;
        }
    }
    /*
    // +
    if(keyCode == 187) {
        console.log("volume +");
        setVolume(getMasterVolume() + 0.05);
    }
    // -
    if(keyCode == 189) {
        console.log("volume -");
        setVolume((getMasterVolume() - 0.05), 0.1, 0.1);       
    }
     */
}
