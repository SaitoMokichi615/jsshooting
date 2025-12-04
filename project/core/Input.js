export class Input {
    constructor(canvas) {
        this.keys = {};
        this.mouse = { x: 0, y: 0, clicked: false };

        this.touch = {
            x: 0,
            y: 0,
            active: false,
            dx: 0,
            dy: 0,
            shot: false,
        };

        // --- keyboard ---
        window.addEventListener("keydown", e => {
            this.keys[e.key] = true;
        });
        window.addEventListener("keyup", e => {
            this.keys[e.key] = false;
        });

        // --- mouse ---
        canvas.addEventListener("mousemove", e => {
            const rect = canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener("mousedown", () => {
            this.mouse.clicked = true;
            this.touch.shot = true;  // クリックでも撃てるように
        });

        // --- touch ---
        canvas.addEventListener("touchstart", e => {
            const t = e.touches[0];
            this.touch.x = t.clientX;
            this.touch.y = t.clientY;
            this.touch.active = true;
            this.touch.shot = true;   // タップで弾発射
        });

        canvas.addEventListener("touchmove", e => {
            const t = e.touches[0];
            this.touch.dx = t.clientX - this.touch.x;
            this.touch.dy = t.clientY - this.touch.y;

            this.touch.x = t.clientX;
            this.touch.y = t.clientY;
        });

        canvas.addEventListener("touchend", () => {
            this.touch.active = false;
            this.touch.dx = 0;
            this.touch.dy = 0;
        });
    }
}


// export class Input {
//     constructor(canvas) {
//         this.keys = {};
//         this.mouse = { x: 0, y: 0, clicked: false };
//         this.touch = { x: 0, y: 0, active: false, dx: 0, dy: 0 };

//         // --- keyboard ---
//         window.addEventListener("keydown", e => this.keys[e.key] = true);
//         window.addEventListener("keyup", e => this.keys[e.key] = false);

//         // --- mouse ---
//         canvas.addEventListener("mousemove", e => {
//             const r = canvas.getBoundingClientRect();
//             this.mouse.x = e.clientX - r.left;
//             this.mouse.y = e.clientY - r.top;
//         });
//         canvas.addEventListener("mousedown", () => this.mouse.clicked = true);

//         // --- touch ---
//         canvas.addEventListener("touchstart", e => {
//             const t = e.touches[0];
//             this.touch.x = t.clientX;
//             this.touch.y = t.clientY;
//             this.touch.active = true;
//         });

//         canvas.addEventListener("touchmove", e => {
//             const t = e.touches[0];
//             this.touch.dx = t.clientX - this.touch.x;
//             this.touch.dy = t.clientY - this.touch.y;
//             this.touch.x = t.clientX;
//             this.touch.y = t.clientY;
//         });

//         canvas.addEventListener("touchend", () => {
//             this.touch.active = false;
//         });
//     }
// }

// export class Input {
//     constructor(canvas) {
//         this.keys = {};
//         this.mouse = { x: 0, y: 0, clicked: false };

//         window.addEventListener("keydown", e => {
//             this.keys[e.key] = true;
//         });
//         window.addEventListener("keyup", e => {
//             this.keys[e.key] = false;
//         });

//         canvas.addEventListener("mousemove", e => {
//             const rect = canvas.getBoundingClientRect();
//             this.mouse.x = e.clientX - rect.left;
//             this.mouse.y = e.clientY - rect.top;
//         });

//         canvas.addEventListener("mousedown", () => {
//             this.mouse.clicked = true;
//         });

//         canvas.addEventListener("touchstart", e => {
//             const t = e.touches[0];
//             this.touchX = t.clientX;
//             this.touchY = t.clientY;
//             this.isTouching = true;
//         });

//         canvas.addEventListener("touchmove", e => {
//             const t = e.touches[0];
//             this.deltaX = t.clientX - this.touchX;
//             this.deltaY = t.clientY - this.touchY;
//             this.touchX = t.clientX;
//             this.touchY = t.clientY;
//         });

//         canvas.addEventListener("touchend", e => {
//             this.isTouching = false;
//         });
//     }
// }
