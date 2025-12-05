// core/Input.js
export class Input {
    constructor(canvas) {
        this.canvas = canvas;

        this.keys = {};
        this.mouse = { x: 0, y: 0, clicked: false };
        this.touch = { x: 0, y: 0, active: false, dx: 0, dy: 0, shot: false };

        // キー
        window.addEventListener("keydown", e => this.keys[e.key] = true);
        window.addEventListener("keyup", e => this.keys[e.key] = false);

        // マウス
        canvas.addEventListener("mousedown", e => {
            const { x, y } = this._getPos(e);
            this.mouse.x = x;
            this.mouse.y = y;
            this.mouse.clicked = true;
        });

        canvas.addEventListener("mousemove", e => {
            const { x, y } = this._getPos(e);
            this.mouse.x = x;
            this.mouse.y = y;
        });

        // タッチ
        canvas.addEventListener("touchstart", e => {
            const t = e.touches[0];
            const { x, y } = this._getPos(t);
            this.touch.x = x;
            this.touch.y = y;
            this.touch.active = true;
            this.touch.shot = true; // タップ = ショット
        });

        canvas.addEventListener("touchmove", e => {
            const t = e.touches[0];
            const { x, y } = this._getPos(t);

            this.touch.dx = x - this.touch.x;
            this.touch.dy = y - this.touch.y;

            this.touch.x = x;
            this.touch.y = y;
        });

        canvas.addEventListener("touchend", () => {
            this.touch.active = false;
        });
    }

    // 800x600 の内部座標へ変換
    _getPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas._scaleX ?? 1;
        const scaleY = this.canvas._scaleY ?? 1;

        return {
            x: (e.clientX - rect.left) / scaleX,
            y: (e.clientY - rect.top) / scaleY
        };
    }
}
