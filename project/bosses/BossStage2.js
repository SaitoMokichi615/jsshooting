export class BossStage2 extends BossBase {
    updatePhase1(dt) {
        this.fireStraight(dt);
    }

    updatePhase2(dt) {
        this.fireSpread(dt);
    }

    updatePhase3(dt) {
        this.fireHoming(dt);
    }

    fireStraight(dt) {
        this.fireTimer += dt;
        if (this.fireTimer > 1) {
            this.fireTimer = 0;
            this.spawnBullet(new Bullet(this.x, this.y, -200, 0));
        }
    }

    fireSpread(dt) {
        this.fireTimer += dt;
        if (this.fireTimer > 0.6) {
            this.fireTimer = 0;
            for (let a = -0.5; a <= 0.5; a += 0.2) {
                this.spawnBullet(new Bullet(this.x, this.y, -200, 200 * a));
            }
        }
    }

    fireHoming(dt) {
        this.fireTimer += dt;
        if (this.fireTimer > 1.5) {
            this.fireTimer = 0;
            this.spawnBullet(new HomingBullet(this.x, this.y, 150, this.game.player));
        }
    }
}
