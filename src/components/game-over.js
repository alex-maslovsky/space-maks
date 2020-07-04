import { getScore } from "../store";

const LOCAL_STORAGE_KEY = 'score';

export default class GameOver {
    constructor(app) {
        this.app = app;

        if (localStorage.getItem(LOCAL_STORAGE_KEY) && +localStorage.getItem(LOCAL_STORAGE_KEY) >= getScore()) {
            this.maxScoreLabel = this._createLabel(`Max score ${ localStorage.getItem(LOCAL_STORAGE_KEY) }`, this.app.renderer.screen.height / 2 + 50);
            this.app.stage.addChild(this.maxScoreLabel);
        }

        if (!localStorage.getItem(LOCAL_STORAGE_KEY) || +localStorage.getItem(LOCAL_STORAGE_KEY) < getScore()) {
            localStorage.setItem(LOCAL_STORAGE_KEY, getScore());
        }

        this.scoreLabel = this._createLabel(getScore(), this.app.renderer.screen.height / 2);
        this.app.stage.addChild(this.scoreLabel);

        this.tryAgain = this._createLabel('Try again', this.app.renderer.screen.height - 100, () => location.reload());
        this.app.stage.addChild(this.tryAgain);
    }

    _createLabel(text, y, onClick) {
        const label = new PIXI.Text(text, { fontFamily : 'Arial', fontSize: 30, fill : '#00FF22', align : 'center' });

        label.anchor.set(0.5, 0.5);
        label.y = y;
        label.x = this.app.renderer.screen.width / 2;

        if (onClick) {
            label.interactive = true;
            label.on('touchend', onClick);
        }

        return label;
    }
}
