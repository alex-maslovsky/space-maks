import SpaceMaxSprite from '../sprites/space-max-sprite';
import GyroService from '../services/gyro-service';
import MovingUnit from './moving-unit';
import { setMaxX, setMaxPolygon } from '../store';

export default class SpaceMax extends MovingUnit {
    constructor(app) {
        super(app, SpaceMaxSprite, 150, 200, app.renderer.screen.height / 2, 3);

        this.gyro = { x: 1, y: 1, z: 1 };
        this.app.ticker.add((delta) => this._onUpdate(delta));

        GyroService.on(this._onGyro.bind(this));
    }

    _onGyro(state) {
        this.gyro = state;
    }

    _onUpdate() {
        const speed = 5;
        const nextStep = this.unit.x - this.gyro.x * speed;
        const rotationOffset = this._getRotationOffset(nextStep);

        this._moveSpaceMax(nextStep, rotationOffset);

        super._onUpdate();

        setMaxX(this.unit.x);
        setMaxPolygon(this.unit.projection);
    }

    _moveSpaceMax(nextStep, rotationOffset) {
        const proximity = 0.4;

        if ((this.gyro.x > proximity || this.gyro.x < -proximity) && this._canMove(nextStep)) {
            this.unit.setPosition(nextStep, this.unit.y, rotationOffset);
        }
    }
}
