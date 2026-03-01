// NanoDit Simulator
// 5x5 LED matrix + Buttons A/B + Speaker indicator

namespace pxsim {

    // -------------------------------------------------------
    // LED MATRIX STATE
    // -------------------------------------------------------
    let screen: number[][] = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];

    // Update LED matrix
    export function setPixel(x: number, y: number, v: number) {
        if (x < 0 || x > 4 || y < 0 || y > 4) return;
        screen[y][x] = v ? 1 : 0;
        draw();
    }

    export function clear() {
        for (let y = 0; y < 5; y++)
            for (let x = 0; x < 5; x++)
                screen[y][x] = 0;
        draw();
    }

    // -------------------------------------------------------
    // BUTTONS
    // -------------------------------------------------------
    let buttonAState = false;
    let buttonBState = false;

    export function buttonA(): boolean {
        return buttonAState;
    }

    export function buttonB(): boolean {
        return buttonBState;
    }

    // -------------------------------------------------------
    // SPEAKER
    // -------------------------------------------------------
    let audioCtx: AudioContext | null = null;
    let osc: OscillatorNode | null = null;

    export function playTone(freq: number, ms: number) {
        if (!audioCtx) audioCtx = new AudioContext();
        osc = audioCtx.createOscillator();
        osc.frequency.value = freq;
        osc.connect(audioCtx.destination);
        osc.start();
        setTimeout(() => {
            osc?.stop();
            osc = null;
        }, ms);
        showSpeaker(true);
        setTimeout(() => showSpeaker(false), ms);
    }

    // -------------------------------------------------------
    // DRAWING
    // -------------------------------------------------------
    function draw() {
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                const id = `px-${x}-${y}`;
                const el = document.getElementById(id);
                if (el) {
                    el.style.opacity = screen[y][x] ? "1" : "0.15";
                }
            }
        }
    }

    function showSpeaker(on: boolean) {
        const el = document.getElementById("speaker");
        if (el) el.style.opacity = on ? "1" : "0.3";
    }

    // -------------------------------------------------------
    // INIT
    // -------------------------------------------------------
    export function initRuntime() {
        draw();

        // Button A
        const btnA = document.getElementById("btnA");
        if (btnA) {
            btnA.onmousedown = () => { buttonAState = true; };
            btnA.onmouseup = () => { buttonAState = false; };
        }

        // Button B
        const btnB = document.getElementById("btnB");
        if (btnB) {
            btnB.onmousedown = () => { buttonBState = true; };
            btnB.onmouseup = () => { buttonBState = false; };
        }
    }
}
