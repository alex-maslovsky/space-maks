import { assetsLoader, RESOURCE_NAMES } from '.';

export default function ShootSound() {
    const { sound } = assetsLoader.resources[RESOURCE_NAMES.shoot];

    sound.volume = 0.4;

    return sound;
}
