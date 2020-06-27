import SpaceMaxSprite from '../sprites/space-max-sprite';
import GyroService from '../services/gyro-service';

const STEPS_AMOUNT = 5;
const STEP_SIZE = 10;
const STEP_SPEED = 2;
const DEAD_STEP_OFFSET = 80;

const STEP_FILTERS = [
    new PIXI.filters.BulgePinchFilter({  radius: 20 }),
    new PIXI.filters.MotionBlurFilter([0, 20])
];

export default class SpaceMax {
    constructor(app) {
        this.gyro = { x: 1, y: 1, z: 1 };

        this.app = app;
        this.spaceMax = this._createSpaceMax();
        this.steps = this._createSteps();

        this.app.stage.addChild(this.spaceMax.sprite, ...this.steps.map(({ sprite }) => sprite));
        this.app.ticker.add((delta) => this._onUpdate(delta));

        GyroService.on(this._onGyro.bind(this));
    }

    _createSteps() {
        const { height } = this.app.renderer.screen;

        return new Array(STEPS_AMOUNT)
            .fill(null)
            .map((_, index) => this._createSpaceMax(height / 2 + index * STEP_SIZE, STEP_FILTERS));
    }

    _onGyro(state) {
        this.gyro = state;
    }

    _onUpdate() {
        const speed = 3;
        const nextStep = this.spaceMax.x - this.gyro.x * speed;
        const rotationOffset = this._getRotationOffest(nextStep);

        this._moveSpaceMax(nextStep, rotationOffset);

        this._moveSteps(rotationOffset);

        this._moveToTop();
    }

    _moveSpaceMax(nextStep, rotationOffset) {
        const proximity = 0.4;

        if ((this.gyro.x > proximity || this.gyro.x < -proximity) && this._canMove(nextStep)) {
            this.spaceMax.setPosition(nextStep, this.spaceMax.y, rotationOffset);
        }
    }

    _moveSteps(rotationOffset) {
        const { height } = this.app.renderer.screen;

        this.steps.forEach((step) => {
            if (step.y > height / 2 + DEAD_STEP_OFFSET) {
                step.setPosition(this.spaceMax.x, height / 2, rotationOffset);
                step.sprite.alpha = 1;
            } else {
                step.setPosition(
                    step.x + this.spaceMax.angleVector.x * STEP_SIZE * STEP_SPEED,
                    step.y + this.spaceMax.angleVector.y * STEP_SIZE * STEP_SPEED,
                    rotationOffset,
                );
                step.sprite.alpha -= 0.2;
            }
        });
    }

    _moveToTop() {
        const { parent } = this.spaceMax.sprite;
        parent.removeChild(this.spaceMax.sprite);
        parent.addChild(this.spaceMax.sprite);
    }

    _getRotationOffest(nextStep) {
        const { width } = this.app.renderer.screen;

        const rotationDelta = 50;
        const rotationPercent = (width / 2 - nextStep) / (width / 2);

        return rotationDelta * rotationPercent;
    }

    _canMove(x) {
        const { width } = this.app.renderer.screen;

        return x > 0 && x < width;
    }

    _createSpaceMax(startY, filters = []) {
        const { width, height } = this.app.renderer.screen;

        const getAngleVector = this._getAngleVector.bind(this);

        const spaceMax = {
            sprite: SpaceMaxSprite(),
            width: 150,
            height: 200,
            setPosition(x0, y0, projectTopX = 0) {
                this.x = x0;
                this.y = y0;

                const topDeltaX = this.width / 3;
                const topDeltaY = this.height / 1.5;
        
                const projection = [
                    { x: this.x - this.width / 2 + topDeltaX + projectTopX, y: this.y - this.height / 2 + topDeltaY },
                    { x: this.x + this.width / 2 - topDeltaX + projectTopX, y: this.y - this.height / 2 + topDeltaY },
                    { x: this.x + this.width / 2, y: this.y + this.height / 2 },
                    { x: this.x - this.width / 2, y: this.y + this.height / 2 },
                ];

                spaceMax.sprite.proj.mapSprite(spaceMax.sprite, projection);
                spaceMax.angleVector = getAngleVector(projection);
            },
        };
 
        spaceMax.setPosition(width / 2, startY || height / 2);
        spaceMax.sprite.filters = filters;

        return spaceMax;
    }

    _getAngleVector([ topLeft, topRight, bottomRight, bottomLeft ]) {
        const x0 = (topLeft.x + topRight.x) / 2;
        const x1 = (bottomLeft.x + bottomRight.x) / 2;

        const length = Math.sqrt((x0 - x1) ** 2 + (topLeft.y - bottomLeft.y) ** 2);

        return {
            x: (x1 - x0) / length,
            y: (bottomLeft.y - topLeft.y) / length,
        };
    }
}
