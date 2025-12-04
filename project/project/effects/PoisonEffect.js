import { StatusEffect } from "../core/StatusEffect";

export class PoisonEffect extends StatusEffect {
    constructor(duration, dps) {
        super(duration);
        this.dps = dps;
        this.tick = 1.0;
        this.tickTimer = 0;
    }

    update(dt, player) {
        super.update(dt, player);

        this.tickTimer += dt;
        if (this.tickTimer >= this.tick) {
            this.tickTimer = 0;
            player.takeDamage(this.dps);
        }
    }
}
