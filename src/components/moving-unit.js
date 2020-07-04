import appSetting from "../app-setting";

const { movingUnit } = appSetting;

const STEP_FILTERS = [
    new PIXI.filters.BulgePinchFilter({  radius: 20 }),
    new PIXI.filters.MotionBlurFilter([0, 20])
];

export default class MovingUnit {
    constructor(app, sprite, spriteWidth, spriteHeight, spriteStartY, topDeltaX) {
        this.app = app;
        this.sprite = sprite;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.spriteStartY = spriteStartY;
        this.topDeltaX = topDeltaX;
        this.unit = this._createUnit();
        this.steps = this._createSteps();

        this.app.stage.addChild(this.unit.sprite, ...this.steps.map(({ sprite }) => sprite));
    }

    _createSteps() {
        return new Array(movingUnit.stepsAmount)
            .fill(null)
            .map((_, index) => this._createUnit(this.spriteStartY + index * movingUnit.stepSize, STEP_FILTERS));
    }

    _onUpdate() {
        const rotationOffset = this._getRotationOffset(this.unit.x);

        this._moveSteps(rotationOffset);

        this._moveToTop();
    }

    _moveSteps(rotationOffset) {
        const { height } = this.app.renderer.screen;

        this.steps.forEach((step) => {
            if (step.y > this.spriteStartY + movingUnit.deadStepOffset) {
                step.setPosition(this.unit.x, this.spriteStartY, rotationOffset);
                step.sprite.alpha = 1;
            } else {
                step.setPosition(
                    step.x + this.unit.angleVector.x * movingUnit.stepSize * movingUnit.stepSpeed,
                    step.y + this.unit.angleVector.y * movingUnit.stepSize * movingUnit.stepSpeed,
                    rotationOffset,
                );
                step.sprite.alpha -= 0.2;
            }
        });
    }

    _moveToTop() {
        const { parent } = this.unit.sprite;
        parent.removeChild(this.unit.sprite);
        parent.addChild(this.unit.sprite);
    }

    _getRotationOffset(nextStep) {
        const { width } = this.app.renderer.screen;

        const rotationDelta = 50;
        const rotationPercent = (width / 2 - nextStep) / (width / 2);

        return rotationDelta * rotationPercent;
    }

    _createUnit(startY, filters = []) {
        const self = this;
        const { width } = this.app.renderer.screen;

        const getAngleVector = this._getAngleVector.bind(this);

        const spaceMax = {
            sprite: this.sprite(),
            width: this.spriteWidth,
            height: this.spriteHeight,
            setPosition(x0, y0, projectTopX = 0) {
                this.x = x0;
                this.y = y0;

                const topDeltaX = this.width / (self.topDeltaX);
                const topDeltaY = this.height / 1.5;

                const projection = [
                    { x: this.x - this.width / 2 + topDeltaX + projectTopX, y: this.y - this.height / 2 + topDeltaY },
                    { x: this.x + this.width / 2 - topDeltaX + projectTopX, y: this.y - this.height / 2 + topDeltaY },
                    { x: this.x + this.width / 2, y: this.y + this.height / 2 },
                    { x: this.x - this.width / 2, y: this.y + this.height / 2 },
                ];

                this.projection = projection;

                spaceMax.sprite.proj.mapSprite(spaceMax.sprite, projection);
                spaceMax.angleVector = getAngleVector(projection);
            },
        };

        spaceMax.setPosition(width / 2, startY || this.spriteStartY);
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

    _canMove(x) {
        const { width } = this.app.renderer.screen;

        return x > 0 && x < width;
    }
}
