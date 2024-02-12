import * as http from 'http';
import { cpus } from 'os';
import { createServer } from './server';

const PORT =  4000;

const numCPUs = cpus().length;
const workers: http.Server[] = [];

for (let i = 0; i < numCPUs - 1; i++) {
    const worker = createServer();

    worker.listen(PORT + i + 1);
    workers.push(worker);
}
console.log(workers.length)
const balancer = http.createServer((req, res) => {
    const worker = workers.shift();
    if (worker) {
        worker.emit('request', req, res);
        workers.push(worker);
    } else {
        res.writeHead(503, { 'Content-Type': 'text/plain' });
        res.end('Service Unavailable');
    }
});

balancer.listen(PORT, () => {
    console.log(`Load balancer is listening on port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Shutting down workers...');
    workers.forEach(worker => worker.close());
    console.log('Load balancer is shutting down...');
    balancer.close(() => {
        console.log('Load balancer is shut down');
        process.exit(0);
    });
});
