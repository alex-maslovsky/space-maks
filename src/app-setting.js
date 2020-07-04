const minSpeed = 2;
const minBulletSpeed = 2;
const maxReloadingCounter = 60;
const minStepSpeed = 1;

export default {
    salesforce: {
        speed: minSpeed,
        bulletCount: 15,
        bulletSpeed: minBulletSpeed,
        changeDirectionChance: 0.1,
        shootChance: 0.05,
        reloadingCounter: 500,

        minSpeed,
        minBulletSpeed,
        minReloadingCounter: 15,

        maxSpeed: 5,
        maxBulletSpeed: 7,
        maxReloadingCounter,
    },
    movingUnit: {
        stepsAmount: 5,
        stepSize: 10,
        stepSpeed: minStepSpeed,
        deadStepOffset: 80,

        minStepSpeed,

        maxStepSpeed: 2.5,
    },
};