import { Bullet } from "../objects/Bullet.js";   // ← 必須！

export class Boss {
    constructor(x, y, stage, game) {
        this.x = x;
        this.y = y;
        this.stage = stage;
        this.game = game;
        this.hp = 150 + stage * 50;
        this.bullets = [];
        this.fireTimer = 0;
        this.fireInterval = 0.5
    }

    update(dt) {
        this.fireTimer += dt;

        if (this.fireTimer > this.fireInterval) {
            this.fireTimer = 0;
            this.firePattern();
        }

        this.bullets.forEach(b => b.update(dt));
    }

    firePattern() {
        if (this.stage === 1) {
            this.bullets.push(new Bullet(this.x, this.y, -200, 0));
        }
        if (this.stage === 2) {
            for (let a = -0.5; a <= 0.5; a += 0.25) {
                this.bullets.push(new Bullet(this.x, this.y, -200, 200 * a));
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x - 30, this.y - 30, 60, 60);

        this.bullets.forEach(b => b.draw(ctx));
    }
}
