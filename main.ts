//% color=#00ff00 icon="\uf183" block="WalkSignal"
namespace WalkSignal {

    //
    // ---------- WALKING PERSON HELPERS ----------
    //

    // Draw the head, shifted by xOffset
    function drawHead(xOffset: number) {
        // Head ~16 pixels tall, local x ~10..20
        for (let x = 10; x <= 20; x++) {
            for (let y = 2; y <= 4; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }
        for (let x = 9; x <= 21; x++) {
            for (let y = 5; y <= 8; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }
        for (let x = 8; x <= 22; x++) {
            for (let y = 9; y <= 12; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }
        for (let x = 9; x <= 21; x++) {
            for (let y = 13; y <= 15; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }
    }

    // Torso in local coordinates, shifted by xOffset
    function drawTorso(xOffset: number) {
        // Thick vertical bar for body, x ~12..18, y ~16..40
        for (let x = 12; x <= 18; x++) {
            for (let y = 16; y <= 40; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }
    }

    // FRAME A — left leg forward, right leg back
    function drawFrameA(xOffset: number) {
        drawHead(xOffset)
        drawTorso(xOffset)

        // Arms:
        // Left arm BACK (higher / shorter), local x ~2..8
        for (let x = 2; x <= 8; x++) {
            for (let y = 18; y <= 26; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }
        // Right arm FORWARD (lower / longer), local x ~22..28
        for (let x = 22; x <= 28; x++) {
            for (let y = 24; y <= 36; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }

        // Legs:
        // Left leg FORWARD, local x ~10..13, y ~41..55 + foot at y=56
        for (let x = 10; x <= 13; x++) {
            for (let y = 41; y <= 55; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }
        for (let x = 8; x <= 15; x++) {
            kitronik_VIEW128x64.setPixel(x + xOffset, 56)
        }

        // Right leg BACK, local x ~17..20, y ~41..50 + foot at y=51
        for (let x = 17; x <= 20; x++) {
            for (let y = 41; y <= 50; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }
        for (let x = 18; x <= 23; x++) {
            kitronik_VIEW128x64.setPixel(x + xOffset, 51)
        }
    }

    // FRAME B — right leg forward, left leg back (mirror-ish)
    function drawFrameB(xOffset: number) {
        drawHead(xOffset)
        drawTorso(xOffset)

        // Arms:
        // Left arm FORWARD (down), local x ~2..8
        for (let x = 2; x <= 8; x++) {
            for (let y = 24; y <= 36; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }
        // Right arm BACK (up), local x ~22..28
        for (let x = 22; x <= 28; x++) {
            for (let y = 18; y <= 26; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }

        // Legs:
        // Left leg BACK
        for (let x = 10; x <= 13; x++) {
            for (let y = 41; y <= 50; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }
        for (let x = 8; x <= 15; x++) {
            kitronik_VIEW128x64.setPixel(x + xOffset, 51)
        }

        // Right leg FORWARD
        for (let x = 17; x <= 20; x++) {
            for (let y = 41; y <= 55; y++) {
                kitronik_VIEW128x64.setPixel(x + xOffset, y)
            }
        }
        for (let x = 15; x <= 23; x++) {
            kitronik_VIEW128x64.setPixel(x + xOffset, 56)
        }
    }

    // Helper: draw a full frame at a given xOffset and show it all at once
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
     * Play a walking crosswalk animation once (big person stepping across screen).
     */
    //% block="walk signal"
    //% weight=100
    export function walkSignal() {
        let xOffset = 0
        const step = 20        // how far to move each step
        const maxOffset = 128  // screen width; wrap when beyond

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

    //
    // ---------- DON'T WALK HAND HELPERS ----------
    //

    // Draw a big "hand" icon centered on the display
    function drawHandIcon() {
        // Palm (big rectangle)
        for (let x = 48; x <= 80; x++) {
            for (let y = 24; y <= 52; y++) {
                kitronik_VIEW128x64.setPixel(x, y)
            }
        }

        // Fingers (four vertical columns above the palm)

        // Finger 1
        for (let x = 50; x <= 56; x++) {
            for (let y = 10; y <= 24; y++) {
                kitronik_VIEW128x64.setPixel(x, y)
            }
        }

        // Finger 2
        for (let x = 58; x <= 64; x++) {
            for (let y = 8; y <= 24; y++) {
                kitronik_VIEW128x64.setPixel(x, y)
            }
        }

        // Finger 3
        for (let x = 66; x <= 72; x++) {
            for (let y = 8; y <= 24; y++) {
                kitronik_VIEW128x64.setPixel(x, y)
            }
        }

        // Finger 4
        for (let x = 74; x <= 80; x++) {
            for (let y = 10; y <= 24; y++) {
                kitronik_VIEW128x64.setPixel(x, y)
            }
        }

        // Thumb on left side
        for (let x = 44; x <= 48; x++) {
            for (let y = 28; y <= 44; y++) {
                kitronik_VIEW128x64.setPixel(x, y)
            }
        }
    }

    /**
     * Show a blinking DON'T WALK hand signal.
     */
    //% block="don't walk hand"
    //% weight=90
    export function dontWalkHand() {
        const blinks = 1       // how many times it blinks
        const onTime = 1500     // ms hand is ON
        const offTime = 200    // ms hand is OFF

        for (let i = 0; i < blinks; i++) {
            // Hand ON
            kitronik_VIEW128x64.clear()
            drawHandIcon()
            kitronik_VIEW128x64.refresh()
            basic.pause(onTime)

            // Hand OFF
            kitronik_VIEW128x64.clear()
            kitronik_VIEW128x64.refresh()
            basic.pause(offTime)
        }
    }
}
