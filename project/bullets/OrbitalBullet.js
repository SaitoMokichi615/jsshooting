import { Bullet } from "../objects/Bullet.js";

export class OrbitalBullet extends Bullet {
    constructor(boss, initialAngle = 0, minRadius = 30, maxRadius = 80, orbitSpeed = 2, radiusSpeed = 1, game, spriteName, size = 16) {
        super(boss.x, boss.y, 0, 0, game, spriteName, size);

        this.boss = boss;
        this.angle = initialAngle;       // 現在の角度（ラジアン）
        this.orbitSpeed = orbitSpeed;    // 回転速度（ラジアン/秒）

        this.minRadius = minRadius;      // 最小半径
        this.maxRadius = maxRadius;      // 最大半径
        this.radiusSpeed = radiusSpeed;  // 伸縮速度
        this.radius = minRadius;         // 現在の半径
        this.radiusDir = 1;              // ＋1 で拡大、−1 で縮小
    }

    update(dt) {
        // 角度進行（ぐるぐる回る）
        this.angle += this.orbitSpeed * dt;

        // 半径の伸縮
        this.radius += this.radiusDir * this.radiusSpeed * dt;

        if (this.radius > this.maxRadius) {
            this.radius = this.maxRadius;
            this.radiusDir = -1;
        }
        if (this.radius < this.minRadius) {
            this.radius = this.minRadius;
            this.radiusDir = 1;
        }

        // --- ボスを中心とした円運動座標 ---
        this.x = this.boss.x + Math.cos(this.angle) * this.radius;
        this.y = this.boss.y + Math.sin(this.angle) * this.radius;
    }
}
