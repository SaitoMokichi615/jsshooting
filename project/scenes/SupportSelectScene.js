import { Scene } from "../core/Scene.js";

export class SupportSelectScene extends Scene {
    init() {
        this.selected = localStorage.getItem("support") || "none";
    }

    update(dt) {}

    draw(ctx) {

        ctx.fillStyle = "white";
        ctx.fillText("Select Support Unit", 100, 80);

        // 3つの支援ユニット例
        ctx.fillStyle = (this.selected === "shield") ? "yellow" : "gray";
        ctx.fillRect(50, 150, 100, 100);

        ctx.fillStyle = (this.selected === "heal") ? "yellow" : "gray";
        ctx.fillRect(150, 150, 100, 100);

        ctx.fillStyle = (this.selected === "bomb") ? "yellow" : "gray";
        ctx.fillRect(250, 150, 100, 100);
    }
}
