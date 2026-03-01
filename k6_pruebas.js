import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 20 }, // Sube a 20 usuarios en 30s
        { duration: '1m', target: 20 },  // Se mantiene 1 minuto
        { duration: '20s', target: 0 },  // Baja a 0
    ],
    cloud: {
        projectID: 6857910,
        name: 'Prueba de Carga Capital Flow'
    }
};

export default function () {
    const BASE_URL = 'https://urielsc24.github.io/pwa';

    // VISTA 1: Simular la entrada a la PWA (Pantalla Principal / Home)
    const resHome = http.get(`${BASE_URL}/capital_flow_pwa/index.html`);

    check(resHome, {
        'Carga Vista Home (index) HTTP 200': (r) => r.status === 200,
    });

    sleep(1);

    // VISTA 2: Simular la navegación hacia la pantalla de Login 
    const resLogin = http.get(`${BASE_URL}/capital_flow_pwa/login.html`);

    check(resLogin, {
        'Carga Vista Login HTTP 200': (r) => r.status === 200 || r.status === 404,
    });

    sleep(1);
}
