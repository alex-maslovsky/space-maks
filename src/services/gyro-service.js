
let callbacks = [];

export const GYRO_ERRORS = {
    NOT_ALLOWED: 'NOT_ALLOWED',
    NOT_SUPPORTED: 'NOT_SUPPORTED',
};

export default class GyroService {
    static on(callback) {
        callbacks.push(callback);
    }

    static off(callback) {
        callbacks = callbacks.filter((x) => x !== callback);
    }

    static use() {
        let accelerometer = null;

        try {
            accelerometer = new Accelerometer({ referenceFrame: 'device', frequency: 60 });
            accelerometer.addEventListener('reading', () => callbacks.forEach((x) => x(accelerometer)));
            accelerometer.start();

            return {};
        } catch (error) {
            if (error.name === 'SecurityError') {
                return { error: GYRO_ERRORS.NOT_ALLOWED };
            } else {
                return { error: GYRO_ERRORS.NOT_SUPPORTED };
            }
        }
    }
}
