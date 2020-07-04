import StarWrap from './components/star-wrap';
import SpaceMax from './components/space-max';
import SalesForce from './components/sales-force';
import GameOver from './components/game-over';
import Score from './components/score';
import loadAssetsPromise from './sprites';
import { getScore } from './store';
import appSetting from './app-setting';
import BgMusicSound from './sprites/bg-music-sound';
import BoomSound from './sprites/boom-sound';
import FlySound from './sprites/fly-sound';

const { salesforce, movingUnit } = appSetting;

export default class App {
    constructor(container) {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: true,
            preserveDrawingBuffer: true,
        });

        window.addEventListener('resize', this._onResize.bind(this));

        container.appendChild(this.app.view);

        this._start();
    }

    _start() {
        loadAssetsPromise
            .then(() => {
                this.sound = BgMusicSound();
                this.flySound = FlySound();

                const add = this.app.ticker.add.bind(this.app.ticker);

                this.app.ticker.add = (fn) => {
                    this.app.ticker.events = [ ...(this.app.ticker.events || []), fn ];
                    add(fn);
                };

                new StarWrap(this.app);
                new SpaceMax(this.app);
                new Score(this.app);
                const salesForce = new SalesForce(this.app);

                this.sound.play();
                this.flySound.play();

                salesForce.onLoose = () => {
                    BoomSound().play();
                    this.sound.stop();
                    this.flySound.stop();
                    this.app.stage.removeChildren();
                    this.app.ticker.events.forEach((fn) => this.app.ticker.remove(fn));
                    new GameOver(this.app);
                };

                this.app.ticker.add(() => {
                    const hundreds = ~~(getScore() / 100);

                    this.app.ticker.speed = 0.5 + hundreds * 0.2;

                    salesforce.speed = Math.min(salesforce.maxSpeed, salesforce.minSpeed + hundreds * 0.2);
                    salesforce.bulletSpeed = Math.min(salesforce.maxBulletSpeed, salesforce.minBulletSpeed + hundreds * 0.4);
                    salesforce.reloadingCounter = Math.max(salesforce.minReloadingCounter, salesforce.maxReloadingCounter - hundreds * 2);
                    movingUnit.stepSpeed = Math.min(movingUnit.maxStepSpeed, movingUnit.minStepSpeed + hundreds * 0.1);
                });
            });
    }

    _onResize() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }
}
