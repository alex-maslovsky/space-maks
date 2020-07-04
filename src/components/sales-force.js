
import SalesForceSprite from '../sprites/salesforce-sprite';
import MovingUnit from './moving-unit';
import { getMaxX, getMaxPolygon } from '../store';
import Bullet from './bullet';
import SalesforceSprite from '../sprites/salesforce-sprite';
import inside from 'point-in-polygon';
import appSettings from '../app-setting';
import ShootSound from '../sprites/shoot-sound';


const { salesforce } = appSettings;

export default class SalesForce extends MovingUnit {
    constructor(app) {
        super(app, SalesForceSprite, 250, 250, 100, 2.5);

        this.reloading = 0;
        this.direction = 1;
        this.app.ticker.add((delta) => this._onUpdate(delta));

        this.bullets = this._createBullets();
        this.shootSound = ShootSound();
    }

    _onUpdate() {
        this._move();
        this._shoot();

        super._onUpdate();
    }

    _shoot() {
        if (this.reloading) {
            this.reloading--;

            return;
        }


        if (Math.random() <= salesforce.shootChance) {
            const bullet = this.bullets.find(({ isShoot }) => !isShoot);

            if (bullet) {
                bullet._shoot(this.unit.x, this.unit.y + this.unit.height / 2, salesforce.bulletSpeed);
                this.shootSound.play();
                this.reloading = salesforce.reloadingCounter;
            }
        }
    }

    _move() {
        this._changeDirection();

        const nextStep = this.unit.x + this.direction * salesforce.speed;

        if (this._canMove(nextStep)) {
            this.unit.setPosition(nextStep, this.unit.y, this._getRotationOffset(nextStep));
        }
    }

    _changeDirection() {
        const nextStep = this.unit.x + this.direction * salesforce.speed;

        const shouldChangeDirection = Math.sign(getMaxX() - this.unit.x) !== this.direction;

        if (Math.random() <= salesforce.changeDirectionChance && shouldChangeDirection) {
            this.direction = this.direction ? -this.direction : 1;
        }
    }

    _createBullets() {
        return new Array(salesforce.bulletCount)
            .fill(null)
            .map((_, index) => {
                const bullet = new Bullet(this.app, SalesforceSprite, 10, 10);

                bullet.onMove = () => {
                    if (inside([bullet.unit.x, bullet.unit.y], getMaxPolygon())) {
                        this.onLoose();
                    }
                };

                return bullet;
            });
    }

    delete() {
        this.unit.delete();
    }
}
