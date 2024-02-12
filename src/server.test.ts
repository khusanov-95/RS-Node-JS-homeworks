import { createUser, getAllUsers, getUserById } from './user';
import http from 'http';
import { Server } from 'http';

let server: Server;

beforeAll(() => {
    server = http.createServer((req, res) => {
        const { url, method } = req;
        if (method === 'GET' && url === '/api/users') {
            const users = getAllUsers();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(users));
        } else if (method === 'POST' && url === '/api/users') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const newUser = JSON.parse(body);
                    const createdUser = createUser(newUser);
                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(createdUser));
                } catch (error) {
                    res.statusCode = 400;
                    res.end('Invalid JSON');
                }
            });
        } else if (method === 'GET' && url?.startsWith('/api/users/')) {
            const userId = url.split('/')[3];
            const user = getUserById(userId);
            if (user) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(user));
            } else {
                res.statusCode = 404;
                res.end('User not found');
            }
        } 
    });

    server.listen(3001);
});

afterAll(() => {
    server.close();
});

describe('Crud api tests', () => {
    test('Get all records with a GET api/users request', (done) => {
        http.get('http://localhost:3001/api/users', (res) => {
            expect(res.statusCode).toBe(200);
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                expect(JSON.parse(data)).toEqual([]);
                done();
            });
        });
    });

    test('A new object is created by a POST api/users request', (done) => {
        const newUser = { username: 'Test User', age: 25, hobbies: ['test1', 'test2', 'test3'] };
        const postData = JSON.stringify(newUser);

        const options = {
            hostname: 'localhost',
            port: 3001,
            path: '/api/users',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            expect(res.statusCode).toBe(201);
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const createdUser = createUser(newUser);
                expect(createdUser).toMatchObject(newUser);
                done();
            });
        });

        req.write(postData);
        req.end();
    });

    test('With a GET api/user/{userId} request, we try to get the created record by its id', (done) => {
        const newUser = { username: 'Test User', age: 25, hobbies: ['test1', 'test2', 'test3'] };
        const createdUser = createUser(newUser);

        http.get(`http://localhost:3001/api/users/${createdUser.id}`, (res) => {
            expect(res.statusCode).toBe(200);
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const user = JSON.parse(data);
                expect(user).toEqual(createdUser);
                done();
            });
        });
    });
});
