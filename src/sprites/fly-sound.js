import { assetsLoader, RESOURCE_NAMES } from '.';

export default function FlySound() {
    const { sound } = assetsLoader.resources[RESOURCE_NAMES.fly];

    sound.volume = 0.2;
    sound.loop = true;

    return sound;
}
