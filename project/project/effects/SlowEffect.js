import {StatusEffect} from "../core/StatusEffect"

export class SlowEffect extends StatusEffect {
    constructor(duration, slowRate) {
        super(duration);
        this.slowRate = slowRate; // 0.5 → 50% スロー
    }

    update(dt, player) {
        super.update(dt, player);
        player.slowFactor = Math.min(player.slowFactor, this.slowRate);
    }
}
