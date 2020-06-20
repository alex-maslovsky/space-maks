import * as PIXI from 'pixi.js';

export default function StarSprite() {
    const sprite = new PIXI.Sprite(
        PIXI.Texture.from('/assets/star.png'),
    );

    sprite.anchor.set(0.5, 0.7);

    return sprite;
}
