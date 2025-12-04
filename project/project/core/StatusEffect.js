export class StatusEffect {
    constructor(duration) {
        this.duration = duration;
        this.timer = 0;
        this.isFinished = false;
    }

    update(dt, player) {
        this.timer += dt;
        if (this.timer >= this.duration) {
            this.isFinished = true;
        }
    }
}
