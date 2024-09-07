const http = require('http');
const https = require('https');

// URL do GitHub Pages para verificar
const githubURL = 'https://github.com/zyutashiro/status-site.git';

// Função para verificar o status do GitHub Pages
function checkGitHubStatus(callback) {
    https.get(githubURL, (res) => {
        const { statusCode } = res;
        if (statusCode === 200) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    }).on('error', (err) => {
        callback(err, false);
    });
}

// Servidor básico em Node.js
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        checkGitHubStatus((err, isUp) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro ao verificar o status do servidor.\n');
            } else if (isUp) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Servidor GitHub Pages está LIGADO.\n');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Servidor GitHub Pages está FORA DO AR ou desatualizado.\n');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada.\n');
    }
});

// Iniciar o servidor na porta 3000
server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});