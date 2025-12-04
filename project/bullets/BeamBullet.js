import {Bullet} from "../objects/Bullet"
import {rectCircleCollision} from "../core/Collision"

export class BeamBullet extends Bullet {
    constructor(x, y, angle) {
        super(x, y, 0, 0);
        this.angle = angle;
        this.length = 300;
        this.width = 10;
        this.damagePerSecond = 30;
    }

    update(dt) {
        // ビームは位置を動かさない
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = "cyan";
        ctx.fillRect(0, -this.width/2, this.length, this.width);

        ctx.restore();
    }

    collides(player) {
        // Rect の当たり判定が必要（後で実装）
        // return rectCircleCollision(...);
            return rectCircleCollision(
                this.x,
                this.y,
                this.length,
                this.width,
                this.angle,
                player.x,
                player.y,
                20 // player 半径
            );
    }

    onHitPlayer(player, dt) {
        player.takeDamage(this.damagePerSecond * dt); // 秒間ダメージ
    }
}
