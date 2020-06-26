import StarWrap from './components/star-wrap';
import SpaceMax from './components/space-max';
import loadAssetsPromise from './sprites';

export default class App {
    constructor(container) {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        window.addEventListener('resize', this._onResize.bind(this));

        container.appendChild(this.app.view);

        this._start();
    }

    _start() {
        loadAssetsPromise
            .then(() => {
                new StarWrap(this.app);
                new SpaceMax(this.app);
            });
    }

    _onResize() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }
}
