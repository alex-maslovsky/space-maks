import { setScore, getScore } from "../store";

const SCORE_SPEED = 1;

export default class Score {
    constructor(app) {
        this.app = app;

        this.label = this._createLabel();

        this.app.stage.addChild(this.label);
        this.app.ticker.add((delta) => this._onUpdate(delta));
    }

    _onUpdate() {
        setScore(getScore() + SCORE_SPEED);
        this.label.text = getScore();
    }

    _createLabel() {
        const label = new PIXI.Text(getScore(), { fontFamily : 'Arial', fontSize: 24, fill : '#00FF22', align : 'center' });

        label.anchor.set(1, 0.5);
        label.y = 10;
        label.x = this.app.renderer.screen.width;

        return label;
    }
}
