import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { validate as uuidValidate } from 'uuid';
import { User, createUser, getAllUsers, getUserById, updateUser, deleteUser } from './user';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;
    const parsedUrl = parse(url || '', true);
    try {
    if (method === 'GET' && parsedUrl.pathname === '/api/users') {
        const users = getAllUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else if (method === 'GET' && parsedUrl.pathname?.startsWith('/api/users/')) {
        const userId = parsedUrl.pathname.split('/')[3];

        if(!uuidValidate(userId)) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid User id');
            return
        }
        const user = getUserById(userId)
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('User not found');
        }
    } else if (method === 'POST' && parsedUrl.pathname === '/api/users') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const newUser: User = JSON.parse(body);
                const createdUser = createUser(newUser);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end(JSON.stringify(createdUser));
            } catch (error) {
                res.statusCode = 400;
                res.end('Invalid JSON');
            }
        });
    } else if (method === 'PUT' && parsedUrl.pathname?.startsWith('/api/users/')) {
        const userId = parsedUrl.pathname.split('/')[3];
    
            if(!uuidValidate(userId)) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid User id');
                return
            }
        
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const updatedUser: User = JSON.parse(body);
                const user = updateUser(userId, updatedUser);
                if (user) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(user));
                } else {
                    res.statusCode = 404;
                    res.end('User not found');
                }
            } catch (error) {
                res.statusCode = 400;
                res.end('Invalid JSON');
            }
        });
    } else if (method === 'DELETE' && parsedUrl.pathname?.startsWith('/api/users/')) {
        const userId = parsedUrl.pathname.split('/')[3];
    
            if(!uuidValidate(userId)) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid User id');
                return 
            }
        
        const success = deleteUser(userId);
        if (success) {
            res.statusCode = 204;
            res.end();
        } else {
            res.statusCode = 404;
            res.end('User not found');
        }
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
} catch(error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
}
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
