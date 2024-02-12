import http from 'http';
import { parse } from 'url';
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.PORT || 3000;


interface User {
    username: string;
    age: number;
    hobbies: string[];
    id?: string;
}

let users: any[] = [];

const server = http.createServer((req, res) => {
    const {url, method} = req;
    const parsedUrl = parse(url || '', true);

    if(method === 'POST' && parsedUrl.pathname === '/api/users') {
        let body = '';
        console.log(uuidv4());
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const newUser = JSON.parse(body);
            users.push(newUser);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        });
    } else if(method === 'GET' && parsedUrl.pathname === '/api/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else if(method === 'GET' && parsedUrl.pathname === '/api/users/:id') {
        const userId = parseInt(parsedUrl.pathname.split('/')[3]);
        const user = users.find(user => user.id === userId);
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('User not found');
        }
    } else if (method === 'PUT' && parsedUrl.pathname === '/api/users/:id') {
        const userId = parseInt(parsedUrl.pathname.split('/')[3]);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const updatedUser = JSON.parse(body);
            const index = users.findIndex(user => user.id === userId);
            if (index !== -1) {
                users[index] = { ...users[index], ...updatedUser };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(users[index]));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Item not found');
            }
        });
    }
    else if (method === 'DELETE' && parsedUrl.pathname === 'api/users/:id') {
        const userId = parseInt(parsedUrl.pathname.split('/')[3]);
        const index = users.findIndex(user => user.id === userId);
        if (index !== -1) {
            users.splice(index, 1);
            res.writeHead(204);
            res.end();
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Item not found');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
