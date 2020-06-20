import * as PIXI from 'pixi.js';
import StarWrap from './components/star-wrap';

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
        new StarWrap(this.app);
    }

    _onResize() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }
}
