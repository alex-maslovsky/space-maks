import SpaceMaxSprite from '../sprites/space-max-sprite';
import GyroService from '../services/gyro-service';

export default class SpaceMax {
    constructor(app) {
        this.gyro = { x: 1, y: 1, z: 1 };

        this.app = app;
        this.spaceMax = this._createSpaceMax();

        this.app.stage.addChild(this.spaceMax.sprite);
        this.app.ticker.add((delta) => this._onUpdate(delta));

        GyroService.on(this._onGyro.bind(this));
    }

    _onGyro(state) {
        this.gyro = state;
    }

    _onUpdate(delta) {
        const proximity = 0.4;
        const speed = 3 * delta;

        if (this.gyro.x > proximity || this.gyro.x < -proximity ) {
            this.spaceMax.setPosition(this.spaceMax.x - this.gyro.x * speed, this.spaceMax.y);
        }
    }

    _createSpaceMax() {
        const { width, height } = this.app.renderer.screen;

        const spaceMax = {
            sprite: SpaceMaxSprite(),
            setPosition(x0, y0) {
                this.x = x0;
                this.y = y0;

                const spriteWidth = 150;
                const spriteHeight = 200;
        
                const topDeltaX = spriteWidth / 3;
                const topDeltaY = spriteHeight / 1.5;
        
                spaceMax.sprite.proj.mapSprite(spaceMax.sprite, [
                    { x: this.x - spriteWidth / 2 + topDeltaX, y: this.y - spriteHeight / 2 + topDeltaY },
                    { x: this.x + spriteWidth / 2 - topDeltaX, y: this.y - spriteHeight / 2 + topDeltaY },
                    { x: this.x + spriteWidth / 2, y: this.y + spriteHeight / 2 },
                    { x: this.x - spriteWidth / 2, y: this.y + spriteHeight / 2 },
                ]);
            },
        };
 
        spaceMax.setPosition(width / 2, height / 2);

        return spaceMax;
    }
}
