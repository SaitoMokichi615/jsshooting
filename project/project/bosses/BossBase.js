export class BossBase {
    // constructor(...) {
    //     this.hp = 300;
    //     this.phase = 1;
    // }
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;

        this.hp = 300;
        this.phase = 1;

        this.bullets = [];  // 弾の配列
        this.fireTimer = 0; // 発射間隔
    }

    update(dt) {
        this.updatePhase();

        if (this.phase === 1) this.updatePhase1(dt);
        if (this.phase === 2) this.updatePhase2(dt);
        if (this.phase === 3) this.updatePhase3(dt);

        this.bullets.forEach(b => b.update(dt));
    }

    updatePhase() {
        if (this.hp < 200 && this.phase === 1) {
            this.phase = 2;
            this.onPhaseChange(2);
        }
        if (this.hp < 100 && this.phase === 2) {
            this.phase = 3;
            this.onPhaseChange(3);
        }
    }

    onPhaseChange(p) {
        console.log("PHASE CHANGED:", p);
    }
}
