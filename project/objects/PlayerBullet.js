export class PlayerBullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 400;
        this.radius = 4;
        this.isDead = false;
        this.damage = 5;
    }

    update(dt) {
        this.x += this.speed * dt;

        if (this.x > 800) {
            this.isDead = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    collides(boss) {
        const dx = this.x - boss.x;
        const dy = this.y - boss.y;
        const r = this.radius + boss.hitRadius;
        return dx*dx + dy*dy <= r*r;
    }
}
