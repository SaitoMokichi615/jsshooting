// scenes/TitleScene.js
import { Scene } from "../core/Scene.js";
import { StageScene } from "./StageScene.js";
import { SupportSelectScene } from "./SupportSelectScene.js";

export class TitleScene extends Scene {
    init() {
        this.unlockedStage = Number(localStorage.getItem("unlockedStage") || 1);
    }

    update(dt) {
        const mouse = this.game.input.mouse;
        if (!mouse.clicked) return;

        // ------- ステージボタンクリック -------
        for (let i = 1; i <= 5; i++) {
            const x = 100;
            const y = 120 + i * 50;
            const w = 200;
            const h = 40;

            const isClickable = (i <= this.unlockedStage);

            if (isClickable &&
                mouse.x >= x && mouse.x <= x + w &&
                mouse.y >= y && mouse.y <= y + h) {
                
                // 画面遷移
                this.game.changeScene(new StageScene(this.game, i));
                return;
            }
        }

        // ------- 支援ユニット選択画面 -------
        const ux = 100, uy = 450, uw = 200, uh = 40;
        if (mouse.x >= ux && mouse.x <= ux + uw &&
            mouse.y >= uy && mouse.y <= uy + uh) {

            this.game.changeScene(new SupportSelectScene(this.game));
            return;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "24px sans-serif";
        ctx.fillText("Shooting Game", 120, 80);

        // ステージボタン描画
        for (let i = 1; i <= 5; i++) {
            ctx.fillStyle = (i <= this.unlockedStage) ? "green" : "gray";
            ctx.fillRect(100, 120 + i * 50, 200, 40);
            ctx.fillStyle = "white";
            ctx.fillText(`Stage ${i}`, 150, 150 + i * 50);
        }

        // 支援ユニット選択ボタン
        ctx.fillStyle = "blue";
        ctx.fillRect(100, 450, 200, 40);
        ctx.fillStyle = "white";
        ctx.fillText("Support Units", 130, 480);
    }
}
