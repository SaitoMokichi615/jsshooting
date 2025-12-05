// /bosses/BossStage2.js
import { BossBase } from "./BossBase.js";
import { OrbitalBullet } from "../bullets/OrbitalBullet.js";

export class BossStage2 extends BossBase {
    
    updatePhase1(dt) {
        if (this.fireTimer > 1.0) {
            this.fireTimer = 0;

            // 12方向の波状攻撃
            for (let i = 0; i < 12; i++) {
                const angle = (Math.PI * 2 / 12) * i;

                this.spawnBullet(
                    new OrbitalBullet(
                        this,       // ボス中心
                        angle,      // 初期角度
                        10,         // 初期半径
                        1.5,        // 回転速度
                        120,        // 半径拡大速度
                        12,         // 弾生存時間
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
