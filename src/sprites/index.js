export const IMAGE_NAMES = {
    star: 'star',
    max: 'max',
};

export const assetsLoader = new PIXI.Loader();

assetsLoader
    .add(IMAGE_NAMES.star, '/assets/star.png')
    .add(IMAGE_NAMES.max, '/assets/max.png');

export default new Promise((resolve, reject) => {
    assetsLoader.onComplete.once(() => resolve());
    assetsLoader.onError.once(() => reject());

    assetsLoader.load();
});
