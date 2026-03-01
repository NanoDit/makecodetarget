// NanoDit MakeCode Runtime API
// micro:bit‑style blocks for ESP32‑S3 + MicroPython runtime

// INTERNAL SHIM
//% shim=nanodit::sendCommand
declare function sendCommand(cmd: string): void;

// -------------------------------------------------------------
// LED CATEGORY (micro:bit style)
// -------------------------------------------------------------
//% color="#e3008c" weight=100 icon="\uf00a"
namespace led {

    //% block="plot x %x y %y"
    export function plot(x: number, y: number): void {
        sendCommand(`nanodit.set_pixel(${x}, ${y}, 1)`);
        sendCommand("nanodit.show()");
    }

    //% block="unplot x %x y %y"
    export function unplot(x: number, y: number): void {
        sendCommand(`nanodit.set_pixel(${x}, ${y}, 0)`);
        sendCommand("nanodit.show()");
    }

    //% block="toggle x %x y %y"
    export function toggle(x: number, y: number): void {
        sendCommand(`nanodit.set_pixel(${x}, ${y}, 1 - nanodit.get_pixel(${x}, ${y}))`);
        sendCommand("nanodit.show()");
    }

    //% block="plot brightness x %x y %y value %value"
    export function plotBrightness(x: number, y: number, value: number): void {
        const v = value > 0 ? 1 : 0;
        sendCommand(`nanodit.set_pixel(${x}, ${y}, ${v})`);
        sendCommand("nanodit.show()");
    }

    //% block="brightness x %x y %y"
    export function brightness(x: number, y: number): number {
        sendCommand(`__read = nanodit.get_pixel(${x}, ${y})`);
        return 1;
    }

    //% block="clear screen"
    export function clear(): void {
        sendCommand("nanodit.clear()");
    }

    //% block="show leds %leds"
    //% leds.fieldEditor="matrix"
    export function showLeds(leds: string): void {
        const img = leds.replace(/\n/g, ":");
        sendCommand(`nanodit.show_image("${img}")`);
        sendCommand("nanodit.show()");
    }

    //% block="scroll text %text"
    export function scrollText(text: string): void {
        sendCommand(`nanodit.show_text("${text}")`);
    }
}

// -------------------------------------------------------------
// BASIC CATEGORY (micro:bit style)
// -------------------------------------------------------------
//% color="#0078d7" weight=90 icon="\uf0e7"
namespace basic {

    //% block="pause %ms ms"
    export function pause(ms: number): void {
        sendCommand(`time.sleep_ms(${ms})`);
    }

    //% block="forever %handler"
    export function forever(handler: () => void): void {
        while (true) handler();
    }

    //% block="show string %text"
    export function showString(text: string): void {
        sendCommand(`nanodit.show_text("${text}")`);
    }

    //% block="show number %num"
    export function showNumber(num: number): void {
        sendCommand(`nanodit.show_text("${num}")`);
    }
}

// -------------------------------------------------------------
// INPUT CATEGORY (micro:bit style)
// -------------------------------------------------------------
//% color="#00a4ef" weight=80 icon="\uf11c"
namespace input {

    //% block="button A pressed"
    export function buttonA(): boolean {
        sendCommand("__read = nanodit.button_a_pressed()");
        return true;
    }

    //% block="button B pressed"
    export function buttonB(): boolean {
        sendCommand("__read = nanodit.button_b_pressed()");
        return true;
    }

    //% block="shake detected"
    export function shake(): boolean {
        sendCommand("__read = nanodit.accel_raw()");
        return true;
    }
}

// -------------------------------------------------------------
// MUSIC CATEGORY (micro:bit style)
// -------------------------------------------------------------
//% color="#d40000" weight=70 icon="\uf001"
namespace music {

    //% block="play tone %freq Hz for %ms ms"
    export function playTone(freq: number, ms: number): void {
        sendCommand(`nanodit.play_tone(${freq}, ${ms})`);
    }

    //% block="play melody %melody"
    export function playMelody(melody: string): void {
        sendCommand(`nanodit.play_melody("${melody}")`);
    }

    //% block="stop all sounds"
    export function stop(): void {
        sendCommand("nanodit.stop()");
    }
}

// -------------------------------------------------------------
// SENSORS CATEGORY (micro:bit style)
// -------------------------------------------------------------
//% color="#009900" weight=60 icon="\uf2c2"
namespace sensors {

    //% block="accelerometer raw"
    export function accelRaw(): void {
        sendCommand("nanodit.accel_raw()");
    }

    //% block="magnetometer raw"
    export function magRaw(): void {
        sendCommand("nanodit.mag_raw()");
    }
}

// -------------------------------------------------------------
// RADIO CATEGORY (simple ESP-NOW stub)
// -------------------------------------------------------------
//% color="#8a2be2" weight=50 icon="\uf1eb"
namespace radio {

    //% block="send string %msg"
    export function sendString(msg: string): void {
        sendCommand(`nanodit.radio_send("${msg}")`);
    }

    //% block="receive string"
    export function receiveString(): string {
        sendCommand("__read = nanodit.radio_recv()");
        return "";
    }
}
