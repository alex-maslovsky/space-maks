import { assetsLoader, RESOURCE_NAMES } from '.';

export default function BgMusicSound() {
    const { sound } = assetsLoader.resources[RESOURCE_NAMES.bgMusic];

    sound.loop = true;

    return sound;
}
