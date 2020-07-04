import { assetsLoader, RESOURCE_NAMES } from '.';

export default function StarSprite() {
    const sprite = new PIXI.Sprite(
        assetsLoader.resources[RESOURCE_NAMES.star].texture,
    );

    sprite.anchor.set(0.5, 0.7);

    return sprite;
}
