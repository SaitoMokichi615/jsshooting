// scenes/StageScene.js
import { Scene } from "../core/Scene.js";
import { Player } from "../objects/Player.js";
import { Boss } from "../objects/Boss.js";
import { TitleScene } from "./TitleScene.js";
import * as Bosses from "../bosses/index.js";

export class StageScene extends Scene {
    constructor(game, stageNumber) {
        super(game);
        this.stageNumber = stageNumber;
        this.state = "playing"; // playing, win, lose
    }

    init() {
        this.player = new Player(50, this.game.canvas.height / 2, this.game);
                // ▼ ボス生成（ファクトリパターン）
        const BossClass = Bosses[`BossStage${this.stageNumber}`] || Bosses.BossBase;
        this.boss = new BossClass(
            this.game.canvas.width - 100,
            this.game.canvas.height / 2,
            this.game
        );

        // ボタンの位置
        this.button = {
            x: 150,
            y: 350,
            w: 120,
            h: 40
        };

        this._onMouseDown = (e) => {
            if (this.state === "win" || this.state === "lose") {
                const rect = this.game.canvas.getBoundingClientRect();
                const mx = e.clientX - rect.left;
                const my = e.clientY - rect.top;

                if (mx >= this.button.x && mx <= this.button.x + this.button.w &&
                    my >= this.button.y && my <= this.button.y + this.button.h) {
                    this.game.changeScene(new TitleScene(this.game));
                }
            }
        };
        this.game.canvas.addEventListener("mousedown", this._onMouseDown);
    }

    update(dt) {
        if (this.state !== "playing") return;

        this.player.update(dt);
        this.boss.update(dt);

        // プレイヤーの弾アップデート
        for (let i = this.player.bullets.length - 1; i >= 0; i--) {
            let b = this.player.bullets[i];
            b.update(dt);

            if (b.collides(this.boss)) {
                this.boss.takeDamage(b.damage ?? 1);
                b.isDead = true;
            }

            if (b.isDead) {
                this.player.bullets.splice(i, 1);
            }
        }

        // プレイヤーとボスの弾の当たり判定
        for (let i = this.boss.bullets.length - 1; i >= 0; i--) {
            const b = this.boss.bullets[i];
            if (b.collides(this.player)) {
                b.onHitPlayer(this.player);
            }

            if (b.isDead) {
                this.boss.bullets.splice(i, 1);
            }
        }

        // 敗北
        if (this.player.hp <= 0) {
            this.state = "lose";
        }

        // 勝利
        if (this.boss.hp <= 0) {
            const old = Number(localStorage.getItem("unlockedStage") || 1);
            localStorage.setItem("unlockedStage", Math.max(old, this.stageNumber + 1));
            this.state = "win";
        }
    }

    draw(ctx) {

        // HP 表示
        ctx.fillStyle = "white";
        ctx.font = "20px sans-serif";
        ctx.fillText(`Player: ${this.player.hp}`, 20, 30);
        ctx.fillText(`Boss: ${this.boss.hp}`, 280, 30);

        // プレイヤー（HP が 0 なら描かない）
        if (this.player.hp > 0) {
            this.player.draw(ctx);
        }

        // ボス（HP が 0 なら描かない）
        if (this.boss.hp > 0) {
            this.boss.draw(ctx);
        }

        // for (let b of this.player.bullets) {
        //     b.draw(ctx);
        // }
        // 弾の描画
        this.player.bullets.forEach(b => b.draw(ctx));
        this.boss.bullets.forEach(b => b.draw(ctx));

        // 勝敗時の UI
        if (this.state === "win") {
            ctx.fillStyle = "green";
            ctx.font = "48px sans-serif";
            ctx.fillText("勝ち!", 150, 200);
            this.drawButton(ctx, "タイトルへ");
        }

        if (this.state === "lose") {
            ctx.fillStyle = "red";
            ctx.font = "48px sans-serif";
            ctx.fillText("負け", 150, 200);
            this.drawButton(ctx, "タイトルへ");
        }
    }

    drawButton(ctx, text) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.button.x, this.button.y, this.button.w, this.button.h);

        ctx.strokeStyle = "black";
        ctx.strokeRect(this.button.x, this.button.y, this.button.w, this.button.h);

        ctx.fillStyle = "black";
        ctx.font = "20px sans-serif";
        ctx.fillText(text, this.button.x + 10, this.button.y + 26);
    }

    destroy() {
        this.game.canvas.removeEventListener("mousedown", this._onMouseDown);
    }
}
