import * as http from 'http';
import { parse } from 'url';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import { validate as uuidValidate } from 'uuid';

// Load environment variables from .env file
dotenv.config();

if (process.env.NODE_ENV === 'development') {
    // Development mode setup
    console.log('Running in development mode');
  }

const PORT = process.env.PORT || 3001;

interface User {
    username: string;
    age: number;
    hobbies: string[];
    id?: string;
}

let users: User[] = [];

export const server = http.createServer((req, res) => {
    const {url, method} = req;
    const parsedUrl = parse(url || '', true);
    try {
        if(method === 'POST' && parsedUrl.pathname === '/api/users') {
            let body = '';
      
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
            try {
                const newUser = JSON.parse(body);
               
                if (!newUser || !newUser.username || !newUser.age || !newUser.hobbies) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Missing required fields');
                    return;
                }
    
                const userId = uuidv4()
    
                users.push({...newUser, id:userId});
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newUser));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON');
            }
        });
        } else if(method === 'GET' && parsedUrl.pathname === '/api/users') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } else if(method === 'GET' && parsedUrl.pathname?.startsWith('/api/users/')) {
            const userId = parsedUrl.pathname.split('/')[3];
    
            if(!uuidValidate(userId)) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid User id');
                return // check
            }
    
            const user = users.find(user => user.id === userId);
    
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('User not found');
            }
        } else if (method === 'PUT' && parsedUrl.pathname?.startsWith('/api/users/')) {
            const userId = parsedUrl.pathname.split('/')[3];
    
            if(!uuidValidate(userId)) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid User id');
                return // check
            }
    
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
                    res.end('User not found');
                }
            });
        }
        else if (method === 'DELETE' && parsedUrl.pathname?.startsWith('/api/users/')) {
            const userId = parsedUrl.pathname.split('/')[3];
    
            if(!uuidValidate(userId)) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid User id');
                return // check
            }
    
            const index = users.findIndex(user => user.id === userId);
            if (index !== -1) {
                users.splice(index, 1);
                res.writeHead(204);
                res.end();
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('User not found');
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found, Invalid Url');
        }
    } catch(error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }

 
});

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
