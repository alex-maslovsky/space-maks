export const RESOURCE_NAMES = {
    star: 'star',
    max: 'max',
    salesforce: 'salesforce',
    bgMusic: 'bgMusic',
    boom: 'boom',
    fly: 'fly',
    shoot: 'shoot',
};

export const assetsLoader = new PIXI.Loader();

assetsLoader
    .add(RESOURCE_NAMES.star, '/assets/star.png')
    .add(RESOURCE_NAMES.max, '/assets/max.png')
    .add(RESOURCE_NAMES.salesforce, '/assets/salesforce-logo.png')
    .add(RESOURCE_NAMES.bgMusic, '/assets/bg-music.mp3')
    .add(RESOURCE_NAMES.boom, '/assets/boom.mp3')
    .add(RESOURCE_NAMES.fly, '/assets/fly.wav')
    .add(RESOURCE_NAMES.shoot, '/assets/shoot.wav')

export default new Promise((resolve, reject) => {
    assetsLoader.onComplete.once(() => resolve());
    assetsLoader.onError.once(() => reject());

    assetsLoader.load();
});
