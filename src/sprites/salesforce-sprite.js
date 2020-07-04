import { assetsLoader, RESOURCE_NAMES } from '.';

export default function SalesforceSprite() {
    const sprite = new PIXI.projection.Sprite2d(
        assetsLoader.resources[RESOURCE_NAMES.salesforce].texture,
    );

    sprite.anchor.set(0.5, 0.5);

    return sprite;
}
