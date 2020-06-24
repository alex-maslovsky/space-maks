import isMobile from 'ismobilejs';
import App from './src/app';
import GyroService, { GYRO_ERRORS } from './src/services/gyro-service';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}

document.addEventListener('DOMContentLoaded', () => {
    const { phone: isPhone } = isMobile(window.navigator);

    if (!isPhone) {
        drawIsNotMobileBlock();
    } else {
        drawIsMobileBlock();
    }
});

function drawIsNotMobileBlock() {
    const container = document.getElementById('is-not-mobile');
    container.style.display = '';

    new QRCode(container.getElementsByClassName('qr')[0], {
        text: window.location.href,
        height: 200,
        width: 200,
    });
}

function drawIsMobileBlock() {
    const result = GyroService.use();

    if (result.error) {

    } else {
        const container = document.getElementById('is-mobile');
        container.style.display = '';
        new App(container);
    }
}
