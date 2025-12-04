import {Bullet} from "../objects/Bullet"

export class HomingBullet extends Bullet {
    constructor(x, y, speed, player) {
        super(x, y, 0, 0);
        this.speed = speed;
        this.player = player;
    }

    update(dt) {
        const dx = this.player.x - this.x;
        const dy = this.player.y - this.y;

        const len = Math.sqrt(dx*dx + dy*dy);
        this.vx = (dx / len) * this.speed;
        this.vy = (dy / len) * this.speed;

        super.update(dt);
    }
}
