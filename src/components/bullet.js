export default class Bullet {
    constructor(app, sprite, spriteWidth, spriteHeight) {
        this.app = app;
        this.sprite = sprite;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.unit = this._createUnit();

        this.isShoot = false;
        this.unit = this._createUnit();

        this.app.stage.addChild(this.unit);
        this.app.ticker.add((delta) => this._onUpdate(delta));
    }

    _onUpdate() {
        if (this.isShoot) {
            this.unit.y += this.speed;
            this.onMove();
        }

        if (!this._canMove()) {
            this.isShoot = false;
        }
    }

    _canMove() {
        const { height } = this.app.renderer.screen;

        return this.unit.y + this.unit.height > 0 && this.unit.y < height;
    }

    _createUnit() {
        const sprite = this.sprite();
        sprite.width = this.spriteWidth;
        sprite.height = this.spriteHeight;
        sprite.x = -100;
        sprite.y = -100;

        return sprite;
    }

    _shoot(x, y, speed) {
        this.isShoot = true;
        this.unit.y = y;
        this.unit.x = x;
        this.speed = speed;
    }
}
