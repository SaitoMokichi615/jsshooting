// /bosses/BossStage1.js
import { BossBase } from "./BossBase.js";
import { Bullet } from "../objects/Bullet.js";

export class BossStage1 extends BossBase {
    updatePhase1(dt) {
        if (this.fireTimer > 1) {
            this.fireTimer = 0;
            this.spawnBullet(new Bullet(this.x, this.y, -200, 0));
        }
    }

    draw(ctx) {
        const img = this.game.assets.getImage("boss1");
        if (img) {
            ctx.drawImage(img, this.x - 20, this.y - 20, 40, 40);
        } else {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x - 20, this.y - 20, 40, 40);
        }
    }
}
