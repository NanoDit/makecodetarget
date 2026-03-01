# NanoDit Blocks

This library provides the blocks and TypeScript APIs for the NanoDit board, powered by the ESP32‑S3 and a MicroPython runtime. It includes LED control, input buttons, sensors, music, radio, and basic utilities modeled after the micro:bit experience.

---

## LED

Control the 5×5 LED matrix.

- **plot(x, y)** — turn on a pixel  
- **unplot(x, y)** — turn off a pixel  
- **toggle(x, y)** — flip a pixel on/off  
- **plot brightness(x, y, value)** — set brightness (0–255 mapped to on/off)  
- **clear screen** — turn off all LEDs  
- **show leds** — draw a 5×5 pattern  
- **scroll text** — scroll a string across the display  

---

## Basic

General-purpose blocks.

- **pause(ms)** — wait for a number of milliseconds  
- **forever(handler)** — run code repeatedly  
- **show string(text)** — display text  
- **show number(num)** — display a number  

---

## Input

Read physical buttons and motion.

- **button A pressed** — returns true when A is pressed  
- **button B pressed** — returns true when B is pressed  
- **shake detected** — returns true when motion is detected  

---

## Music

Play tones and melodies through the onboard speaker.

- **play tone(freq, ms)** — play a tone  
- **play melody(text)** — play a melody string  
- **stop all sounds** — stop playback  

---

## Sensors

Access built‑in I²C sensors.

- **accelerometer raw** — read raw acceleration  
- **magnetometer raw** — read raw magnetic field  

---

## Radio

Simple ESP‑NOW‑based communication.

- **send string(msg)** — broadcast a message  
- **receive string()** — read the last received message  

---

## Notes

- All blocks communicate with the NanoDit MicroPython runtime using a command bridge.  
- The simulator mirrors the LED matrix, buttons, and speaker.  
- Python mode is fully supported.  

---

## License

MIT
