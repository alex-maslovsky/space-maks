import StarSprite from '../sprites/star-sprite';

const STARS_AMOUNT = 1000;
const MAX_Z = 2000;
const STEP = 10;
const Z_STEP = 20;
const BASE_SPEED = 0.5;
const STAR_BASE_SIZE = 0.05;
const STAR_STRETCH = 1;

export default class StarWrap {
    constructor(app) {
        this.cameraZ = 0;

        this.app = app;

        this.stars = this._createStarts();
        this.app.stage.addChild(...this.stars.map(({ sprite }) => sprite));

        this.app.ticker.add((delta) => this._onUpdate(delta));
    }

    _onUpdate(delta) {
        const { width, height } = this.app.renderer.screen;

        this.cameraZ += (delta * STEP) * BASE_SPEED;

        this.stars.forEach((star) => {
            if (star.z < this.cameraZ) {
                this._setRandomStarPosition(star);
                star.z = this.cameraZ + Math.random() * MAX_Z / 2 + MAX_Z;
            }

            const z = star.z - this.cameraZ;

            star.sprite.x = (star.x * (Z_STEP / z) * width + width / 2);
            star.sprite.y = star.y * (Z_STEP / z) * width + height / 2;

            const dxCenter = star.sprite.x - width / 2;
            const dyCenter = star.sprite.y - height / 2;
            const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
            const distanceScale = Math.max(0, (MAX_Z - z) / MAX_Z);

            star.sprite.scale.x = distanceScale * STAR_BASE_SIZE;
            star.sprite.scale.y = distanceScale * STAR_BASE_SIZE + distanceScale * BASE_SPEED * STAR_STRETCH * distanceCenter / width;
            star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
        });
    }

    _createStarts() {
        return new Array(STARS_AMOUNT)
            .fill(null)
            .map(() => this._createStar());
    }

    _createStar() {
        const star = {
            sprite: StarSprite(),
        };

        this._setRandomStarPosition(star);

        return star;
    }

    _setRandomStarPosition(star) {
        const deg = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 1;

        star.x = Math.cos(deg) * distance;
        star.y = Math.sin(deg) * distance;
        star.z = Math.random() * MAX_Z;
    }
}
