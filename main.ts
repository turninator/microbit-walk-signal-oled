//% color=#00ff00 icon="\uf183" block="WalkSignal"
namespace WalkSignal {

    // Draw the head, shifted by xOffset
    function drawHead(xOffset: number) {
        for (let x = 10; x <= 20; x++) {
            for (let y = 2; y <= 4; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }
        for (let x = 9; x <= 21; x++) {
            for (let y = 5; y <= 8; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }
        for (let x = 8; x <= 22; x++) {
            for (let y = 9; y <= 12; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }
        for (let x = 9; x <= 21; x++) {
            for (let y = 13; y <= 15; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }
    }

    // Torso in local coordinates, shifted by xOffset
    function drawTorso(xOffset: number) {
        for (let x = 12; x <= 18; x++) {
            for (let y = 16; y <= 40; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }
    }

    function drawFrameA(xOffset: number) {
        drawHead(xOffset)
        drawTorso(xOffset)

        // Arms A
        for (let x = 2; x <= 8; x++) {
            for (let y = 18; y <= 26; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }
        for (let x = 22; x <= 28; x++) {
            for (let y = 24; y <= 36; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }

        // Legs A
        for (let x = 10; x <= 13; x++) {
            for (let y = 41; y <= 55; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }
        for (let x = 8; x <= 15; x++) {
            kitronik_VIEW128x64.setPixel(x + xOffset, 56)
        }

        for (let x = 17; x <= 20; x++) {
            for (let y = 41; y <= 50; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }
        for (let x = 18; x <= 23; x++) {
            kitronik_VIEW128x64.setPixel(x + xOffset, 51)
        }
    }

    function drawFrameB(xOffset: number) {
        drawHead(xOffset)
        drawTorso(xOffset)

        // Arms B
        for (let x = 2; x <= 8; x++) {
            for (let y = 24; y <= 36; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }
        for (let x = 22; x <= 28; x++) {
            for (let y = 18; y <= 26; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }

        // Legs B
        for (let x = 10; x <= 13; x++) {
            for (let y = 41; y <= 50; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }
        for (let x = 8; x <= 15; x++) {
            kitronik_VIEW128x64.setPixel(x + xOffset, 51)
        }

        for (let x = 17; x <= 20; x++) {
            for (let y = 41; y <= 55; y++) kitronik_VIEW128x64.setPixel(x + xOffset, y)
        }
        for (let x = 15; x <= 23; x++) {
            kitronik_VIEW128x64.setPixel(x + xOffset, 56)
        }
    }

    function showFrameAtOffset(xOffset: number, whichFrame: number) {
        kitronik_VIEW128x64.clear()
        if (whichFrame == 0) {
            drawFrameA(xOffset)
        } else {
            drawFrameB(xOffset)
        }
        kitronik_VIEW128x64.refresh()
    }

    /**
     * Play a walking crosswalk animation once.
     */
    //% block="walk signal"
    //% weight=100
    export function walkSignal() {
        let xOffset = 0
        const step = 20
        const maxOffset = 128

        for (let moves = 0; moves < 6; moves++) {
            // alternate frames A/B
            showFrameAtOffset(xOffset, moves % 2)
            basic.pause(220)

            // blink off between steps
            kitronik_VIEW128x64.clear()
            kitronik_VIEW128x64.refresh()
            basic.pause(80)

            // move across
            xOffset += step
            if (xOffset > maxOffset) {
                xOffset = 0
            }
        }
    }
}
