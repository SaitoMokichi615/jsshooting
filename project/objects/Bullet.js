export class Bullet {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = 8;
        this.damage = 1;
        this.isDead = false; // ← 弾を消すフラグ
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }

    onHitPlayer(player) {
        player.takeDamage(this.damage);
        this.isDead = true; // 当たったら削除
    }

    collides(target) {
        const dx = this.x - target.x;
        const dy = this.y - target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < this.r + target.hitRadius;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
    }
}
