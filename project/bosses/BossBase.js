// /bosses/BossBase.js
import { Bullet } from "../objects/Bullet.js";

export class BossBase {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;

        this.hp = 300;
        this.phase = 1;

        this.bullets = [];
        this.fireTimer = 0;
    }

    update(dt) {
        this.fireTimer += dt;

        this.updatePhase();

        if (this.phase === 1) this.updatePhase1(dt);
        if (this.phase === 2) this.updatePhase2(dt);
        if (this.phase === 3) this.updatePhase3(dt);

        this.bullets.forEach(b => b.update(dt));
    }

    updatePhase() {
        if (this.hp < 200 && this.phase === 1) this.phase = 2;
        if (this.hp < 100 && this.phase === 2) this.phase = 3;
    }

    // 各ステージで override
    updatePhase1(dt) {}
    updatePhase2(dt) {}
    updatePhase3(dt) {}

    spawnBullet(b) {
        this.bullets.push(b);
    }

    draw(ctx) {}
}
