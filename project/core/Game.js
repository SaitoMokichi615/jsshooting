// // core/Game.js
// export class Game {
//     constructor(canvas) {
//         this.canvas = canvas;
//         this.ctx = canvas.getContext("2d");
//         this.currentScene = null;
//         this.lastTime = 0;
//     }

//     changeScene(newScene) {
//         this.currentScene = newScene;
//         this.currentScene.init();
//     }

//     loop = (timestamp) => {
//         const dt = (timestamp - this.lastTime) / 1000;
//         this.lastTime = timestamp;

//         this.currentScene.update(dt);
//         this.currentScene.draw(this.ctx);

//         requestAnimationFrame(this.loop);
//     };

//     start() {
//         requestAnimationFrame(this.loop);
//     }
// }
// core/Game.js
import { Input } from "./Input.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.currentScene = null;
        this.lastTime = 0;
        this.input = new Input(canvas);   // ← 入力管理を追加
    }

    changeScene(newScene) {
        if (this.currentScene && typeof this.currentScene.destroy === "function") {
            this.currentScene.destroy();
        }
        this.currentScene = newScene;
        this.currentScene.init();
    }

    // loop の引数 timestamp には、ブラウザが渡す
    // 現在時刻（ミリ秒）が自動的に入る
    loop = (timestamp) => {
        // dt（経過時間・Delta Time）の計算(ミリセカンド単位)
        // timestamp：今回のフレーム時間
        // lastTime：前回のフレーム時間
        // 間を引くことで、
        // 前フレームから何秒経ったかが分かります。
        // ゲームの移動を「毎秒◯ピクセル」で制御するために必要です。
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // ←ここ

        this.currentScene.update(dt);
        this.currentScene.draw(this.ctx);

        // クリックは1回だけ扱う
        this.input.mouse.clicked = false;

        // アニメーションを更新
        // 「画面を更新する直前」にコールバックを呼び出す
        // ※コールバック：「後で呼び出すために関数を渡す仕組み」
        // 「ブラウザさん、この loop 関数を、次のフレーム時に呼んでください」という予約をしている。
        // なので loop は（あなたが直接呼ぶのではなく）
        // ブラウザがタイミングを見て呼ぶ関数 ＝コールバック関数 です。
        requestAnimationFrame(this.loop);
    };

    // start関数は、外部から「ループ開始」をコントロールできるようにするための関数
    // これにより、コントロール性が増す
    // ゲーム読み込み直後にすぐループ開始しない
    // 設定画面・タイトル画面で準備してから開始できる
    start() {
        // アニメーションを更新
        // 「画面を更新する直前」にコールバックを呼び出す
        requestAnimationFrame(this.loop);
    }
}
