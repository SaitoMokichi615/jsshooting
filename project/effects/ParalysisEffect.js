import {StatusEffect} from "../core/StatusEffect"

export class ParalysisEffect extends StatusEffect {
    constructor(duration) {
        super(duration);
    }

    update(dt, player) {
        super.update(dt, player);

        // スローを超えた「完全停止」
        player.slowFactor = 0;
    }
}
