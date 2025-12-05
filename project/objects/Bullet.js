export class Bullet {
    constructor(x, y, vx, vy, spriteName, r=8) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
        this.spriteName = spriteName
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
        const img = assets.getImage(this.spriteName);
        if (img) {
            ctx.drawImage(img, this.x - 8, this.y - 8, 16, 16);
        } 
        else {
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
