import {Bullet} from "../objects/Bullet"

export class PoisonBullet extends Bullet {
    onHitPlayer(player) {
        player.applyStatus(new PoisonEffect(3, 2)); // 3秒間 DPS2
        this.isDead = true;
    }
}