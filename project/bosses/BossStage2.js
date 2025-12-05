// /bosses/BossStage2.js
import { BossBase } from "./BossBase.js";
import { OrbitalBullet } from "../bullets/OrbitalBullet.js";

export class BossStage2 extends BossBase {
    

    updatePhase1(dt) {
        if (this.fireTimer > 1.5) {
            this.fireTimer = 0;

            // 6個の円軌道弾を一斉発射
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI * 2 / 6) * i;

                this.spawnBullet(
                    new OrbitalBullet(
                        this,        // ボスの中心を追従
                        angle,       // 初期角度
                        20,          // 最小半径
                        120,         // 最大半径
                        2,           // 回転速度
                        40,          // 半径伸縮速度
                        this.game,
                        "boss2_bullet",
                        16
                    )
                );
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
