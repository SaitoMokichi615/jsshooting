import { PlayerBullet } from "./PlayerBullet.js";


export class Player {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.hp = 10;
        this.game = game;
        this.hitRadius = 8;
        this.bullets = [];
        this.shotCooldown = 0; // 連射速度調整

        this.statusEffects = []; // ステータス異常のリスト
        this.speed = 200;
        this.slowFactor = 1.0; // スロー用
    }

    update(dt) {
        // --- ステータス異常の処理 ---
        this.processStatus(dt);

        // --- 移動処理（スロー補正付き） ---
        const input = this.game.input;

        // 弾発射
        this.shotCooldown -= dt;

        if ((input.keys[" "] || input.touch.shot) && this.shotCooldown <= 0) {
            this.shoot();
            this.shotCooldown = 0.2; // 0.2秒ごとに発射
        }

        // 1フレームで消費
        input.touch.shot = false;

        // 移動
        let moveSpeed = this.speed * this.slowFactor;

        if (input.keys["ArrowUp"]) this.y -= moveSpeed * dt;
        if (input.keys["ArrowDown"]) this.y += moveSpeed * dt;
        if (input.keys["ArrowLeft"]) this.x -= moveSpeed * dt;
        if (input.keys["ArrowRight"]) this.x += moveSpeed * dt;
        if (input.isTouching) {
            this.x += input.deltaX;
            this.y += input.deltaY;
        }
        if (input.touch.active) {
            this.x += input.touch.dx;
            this.y += input.touch.dy;
        }

        // 画面外の出ないようにする制御処理
        const r = 20; // キャラの半径
        this.x = Math.max(r, Math.min(this.game.canvas.width - r, this.x));
        this.y = Math.max(r, Math.min(this.game.canvas.height - r, this.y));
    }

    shoot() {
        this.bullets.push(new PlayerBullet(this.x, this.y));
    }


    processStatus(dt) {
        this.slowFactor = 1.0; // 一旦リセットして再計算

        for (let i = this.statusEffects.length - 1; i >= 0; i--) {
            const effect = this.statusEffects[i];
            effect.update(dt, this);

            if (effect.isFinished) {
                this.statusEffects.splice(i, 1);
            }
        }
    }

    applyStatus(effect) {
        this.statusEffects.push(effect);
    }

    takeDamage(dmg) {
        this.hp -= dmg;
    }

    draw(ctx) {
        const img = this.game.assets.getImage("player");
        if (img) {
            ctx.drawImage(img, this.x - 20, this.y - 20, 40, 40);
        } else {
            ctx.fillStyle = "cyan";
            ctx.fillRect(this.x - 20, this.y - 20, 40, 40);
        }
    }
}
