import { assetsLoader, RESOURCE_NAMES } from '.';

export default function SpaceMaxSprite() {
    const sprite = new PIXI.projection.Sprite2d(
        assetsLoader.resources[RESOURCE_NAMES.max].texture,
    );

    sprite.anchor.set(0.5, 0.5);

    return sprite;
}
