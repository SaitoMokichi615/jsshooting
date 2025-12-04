import {Bullet} from "../objects/Bullet"

export class MultiHitBullet extends Bullet {
    constructor(x, y, vx, vy) {
        super(x, y, vx, vy);
        this.hitInterval = 0.3;
        this.hitTimer = 0;
    }

    onHitPlayer(player, dt) {
        this.hitTimer += dt;
        if (this.hitTimer >= this.hitInterval) {
            this.hitTimer = 0;
            player.takeDamage(this.damage);
        }
    }
}
