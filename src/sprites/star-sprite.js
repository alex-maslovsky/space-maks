import { assetsLoader, IMAGE_NAMES } from '.';

export default function StarSprite() {
    const sprite = new PIXI.Sprite(
        assetsLoader.resources[IMAGE_NAMES.star].texture,
    );

    sprite.anchor.set(0.5, 0.7);

    return sprite;
}
