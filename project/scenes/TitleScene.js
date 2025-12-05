// scenes/TitleScene.js
import { Scene } from "../core/Scene.js";
import { StageScene } from "./StageScene.js";
import { SupportSelectScene } from "./SupportSelectScene.js";

export class TitleScene extends Scene {
    init() {
        this.unlockedStage = Number(localStorage.getItem("unlockedStage") || 1);
    }

    update(dt) {
        const input = this.game.input;
        const clicked = input.mouse.clicked || input.touch.shot;

        if (!clicked) return;

        // ------- ステージボタンクリック -------
        for (let i = 1; i <= 5; i++) {
            const x = 100;
            const y = 120 + i * 50;
            const w = 200;
            const h = 40;

            // const isClickable = (i <= this.unlockedStage);

            if (
                // isClickable &&
                input.mouse.x >= x && input.mouse.x <= x + w &&
                input.mouse.y >= y && input.mouse.y <= y + h) {
                
                // 画面遷移
                this.game.changeScene(new StageScene(this.game, i));
                return;
            }
        }

        // ------- 支援ユニット選択画面 -------
        const ux = 100, uy = 450, uw = 200, uh = 40;
        if (input.mouse.x >= ux && input.mouse.x <= ux + uw &&
            input.mouse.y >= uy && input.mouse.y <= uy + uh) {

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
            // ctx.fillStyle = (i <= this.unlockedStage) ? "green" : "gray";
            ctx.fillStyle = "green"
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
