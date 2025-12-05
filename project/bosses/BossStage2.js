// /bosses/BossStage2.js
import { BossBase } from "./BossBase.js";
import { Bullet } from "../objects/Bullet.js";

export class BossStage2 extends BossBase {
    updatePhase1(dt) {
        if (this.fireTimer > 0.7) {
            this.fireTimer = 0;
            for (let a = -0.5; a <= 0.5; a += 0.25) {
                this.spawnBullet(new Bullet(this.x, this.y, -200, 200 * a, this.game, "boss2_bullet", 16));
            }
            // this.spawnBullet(new Bullet(this.x, this.y, -250, 0));
        }
    }

    updatePhase2(dt) {
        if (this.fireTimer > 0.4) {
            this.fireTimer = 0;
            for (let a = -0.7; a <= 0.7; a += 0.1) {
                this.spawnBullet(new Bullet(this.x, this.y, -200, 200 * a, this.game, "boss2_bullet", 16));
            }
        }
    }

    
    draw(ctx) {
        const img = this.game.assets.getImage("boss2");
        if (img) {
            ctx.drawImage(img, this.x - 20, this.y - 20, 80, 80);
        } 
        else {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x - 20, this.y - 20, 80, 80);
        }
    }
}
