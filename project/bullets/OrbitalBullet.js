import { Bullet } from "../objects/Bullet.js";

export class OrbitalBullet extends Bullet {
    constructor(
        boss,
        initialAngle = 0,
        startRadius = 10,
        orbitSpeed = 2,
        radiusSpeed = 80,
        lifeTime = 12,          // ★ 生存時間（秒）を追加
        game,
        spriteName,
        size = 16
    ) {
        super(boss.x, boss.y, 0, 0, game, spriteName, size);

        this.boss = boss;
        this.angle = initialAngle;
        this.orbitSpeed = orbitSpeed;

        this.radiusSpeed = radiusSpeed;
        this.radius = startRadius;

        this.lifeTime = lifeTime; // ★ 寿命（秒）
        this.age = 0;             // ★ 経過時間
    }

    update(dt) {
        // 経過時間を進める
        this.age += dt;
        if (this.age >= this.lifeTime) {
            this.isDead = true;
            return;
        }

        // 回転
        this.angle += this.orbitSpeed * dt;

        // 半径拡大
        this.radius += this.radiusSpeed * dt;

        // 円運動座標
        this.x = this.boss.x + Math.cos(this.angle) * this.radius;
        this.y = this.boss.y + Math.sin(this.angle) * this.radius;
    }
}

// import { Bullet } from "../objects/Bullet.js";

// export class OrbitalBullet extends Bullet {
//     constructor(boss, initialAngle = 0, startRadius = 10, orbitSpeed = 2, radiusSpeed = 80, game, spriteName, size = 16) {
//         super(boss.x, boss.y, 0, 0, game, spriteName, size);

//         this.boss = boss;
//         this.angle = initialAngle;       // 初期角度
//         this.orbitSpeed = orbitSpeed;    // 回転速度（ラジアン/秒）

//         this.radiusSpeed = radiusSpeed;  // 半径が増える速度
//         this.radius = startRadius;       // 現在半径（最初は小さい）
//     }

//     update(dt) {
//         // 角度進行（回転）
//         this.angle += this.orbitSpeed * dt;

//         // 半径は広がり続ける
//         this.radius += this.radiusSpeed * dt;

//         // --- ボス中心の円運動 ---
//         this.x = this.boss.x + Math.cos(this.angle) * this.radius;
//         this.y = this.boss.y + Math.sin(this.angle) * this.radius;

//         // --- 画面外で消滅 ---
//         const w = this.game.canvas.width;
//         const h = this.game.canvas.height;

//         if (this.x < -50 || this.x > w + 50 || this.y < -50 || this.y > h + 50) {
//             this.isDead = true;
//         }
//     }
// }

// // import { Bullet } from "../objects/Bullet.js";

// // export class OrbitalBullet extends Bullet {
// //     constructor(boss, initialAngle = 0, minRadius = 30, maxRadius = 80, orbitSpeed = 2, radiusSpeed = 1, game, spriteName, size = 16) {
// //         super(boss.x, boss.y, 0, 0, game, spriteName, size);

// //         this.boss = boss;
// //         this.angle = initialAngle;       // 現在の角度（ラジアン）
// //         this.orbitSpeed = orbitSpeed;    // 回転速度（ラジアン/秒）

// //         this.minRadius = minRadius;      // 最小半径
// //         this.maxRadius = maxRadius;      // 最大半径
// //         this.radiusSpeed = radiusSpeed;  // 伸縮速度
// //         this.radius = minRadius;         // 現在の半径
// //         this.radiusDir = 1;              // ＋1 で拡大、−1 で縮小
// //     }

// //     update(dt) {
// //         // 角度進行（ぐるぐる回る）
// //         this.angle += this.orbitSpeed * dt;

// //         // 半径の伸縮
// //         this.radius += this.radiusDir * this.radiusSpeed * dt;

// //         if (this.radius > this.maxRadius) {
// //             this.radius = this.maxRadius;
// //             this.radiusDir = -1;
// //         }
// //         if (this.radius < this.minRadius) {
// //             this.radius = this.minRadius;
// //             this.radiusDir = 1;
// //         }

// //         // --- ボスを中心とした円運動座標 ---
// //         this.x = this.boss.x + Math.cos(this.angle) * this.radius;
// //         this.y = this.boss.y + Math.sin(this.angle) * this.radius;
// //     }
// // }
