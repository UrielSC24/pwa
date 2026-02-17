const http = require('http');
const PORT = 3001;

let bands = [];
let stages = [];

const sendJSON = (res, data, status = 200) => {
    res.writeHead(status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(data));
};

const readBody = (req) => new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => resolve(JSON.parse(body || '{}')));
});

const server = http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');

    const path = req.url.split('?')[0].replace(/\/$/, '');
    const method = req.method;

    try {
        if (path === '/api/stages') {
            if (method === 'GET') return sendJSON(res, stages);
            if (method === 'POST') {
                const body = await readBody(req);
                if (!body.name) { res.writeHead(400); return res.end(); }
                const newStage = { id: `STAGE_${Date.now()}`, ...body };
                stages.push(newStage);
                return sendJSON(res, newStage, 201);
            }
        }

        if (path.startsWith('/api/stages/')) {
            const id = path.split('/').pop();
            if (method === 'DELETE') {
                stages = stages.filter(s => s.id !== id);
                return sendJSON(res, { success: true });
            }
            if (method === 'PUT') {
                const body = await readBody(req);
                const index = stages.findIndex(s => s.id === id);
                if (index !== -1) {
                    stages[index] = { ...stages[index], name: body.name, id };
                    return sendJSON(res, stages[index]);
                }
                res.writeHead(404); return res.end();
            }
        }

        if (path === '/api/bands') {
            if (method === 'GET') return sendJSON(res, bands);
            if (method === 'POST') {
                const body = await readBody(req);
                const newBand = {
                    id_legacy: Date.now(),
                    nombre_legal: body.nombre_legal,
                    genero_musical: body.genero_musical,
                    horario_inicio: body.horario_inicio,
                    escenario_id: body.escenario_id,
                    popularidad_score: body.popularidad_score || 80
                };
                bands.push(newBand);
                return sendJSON(res, newBand, 201);
            }
        }

        if (path.startsWith('/api/bands/')) {
            const id = parseInt(path.split('/').pop());

            if (method === 'GET') {
                const band = bands.find(b => b.id_legacy === id);
                return band ? sendJSON(res, band) : (res.writeHead(404), res.end());
            }

            if (method === 'PUT') {
                const body = await readBody(req);
                const index = bands.findIndex(b => b.id_legacy === id);
                if (index !== -1) {
                    bands[index] = {
                        ...bands[index],
                        nombre_legal: body.nombre_legal,
                        genero_musical: body.genero_musical,
                        horario_inicio: body.horario_inicio,
                        escenario_id: body.escenario_id,
                        popularidad_score: body.popularidad_score
                    };
                    return sendJSON(res, bands[index]);
                }
                res.writeHead(404); return res.end();
            }

            if (method === 'DELETE') {
                bands = bands.filter(b => b.id_legacy !== id);
                return sendJSON(res, { success: true });
            }
        }

        if (path === '') return sendJSON(res, { status: 'Running', timestamp: Date.now() });
        res.writeHead(404); res.end();

    } catch (err) {
        console.error(err);
        res.writeHead(500); res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
