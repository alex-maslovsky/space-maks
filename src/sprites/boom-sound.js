import { assetsLoader, RESOURCE_NAMES } from '.';

export default function BoomSound() {
    const { sound } = assetsLoader.resources[RESOURCE_NAMES.boom];

    return sound;
}
