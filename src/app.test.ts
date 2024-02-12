import { request } from 'http';
import { server } from './app';

// let testServer;
const PORT = 3000;

beforeAll((done) => {
    server.listen(PORT, done);
});

afterAll((done) => {
    server.close(done);
});

describe('API Tests', () => {
    let userId;

    test('GET /api/users - Get all records', (done) => {
        request(`http://localhost:${PORT}/api/users`, (res) => {
            expect(res.statusCode).toBe(200);
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const users = JSON.parse(data);
                expect(users).toEqual([]);
                done();
            });
        });
    });

//     test('POST /api/users - Create new object', (done) => {
//         const postData = JSON.stringify({ name: 'John', age: 30, hobbies: ['Reading', 'Gaming'] });

//         const req = request({
//             method: 'POST',
//             port: PORT,
//             path: '/api/users',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Content-Length': postData.length
//             }
//         }, (res) => {
//             expect(res.statusCode).toBe(201);
//             let data = '';
//             res.on('data', (chunk) => {
//                 data += chunk;
//             });
//             res.on('end', () => {
//                 const newUser = JSON.parse(data);
//                 userId = newUser.id;
//                 expect(newUser).toHaveProperty('id');
//                 done();
//             });
//         });

//         req.write(postData);
//         req.end();
//     });

//     test('GET /api/users/{userId} - Get created record by id', (done) => {
//         request(`http://localhost:${PORT}/api/users/${userId}`, (res) => {
//             expect(res.statusCode).toBe(200);
//             let data = '';
//             res.on('data', (chunk) => {
//                 data += chunk;
//             });
//             res.on('end', () => {
//                 const user = JSON.parse(data);
//                 expect(user).toHaveProperty('id', userId);
//                 done();
//             });
//         });
//     });

//     test('PUT /api/users/{userId} - Update created record', (done) => {
//         const updatedData = JSON.stringify({ name: 'John Doe' });

//         const req = request({
//             method: 'PUT',
//             port: PORT,
//             path: `/api/users/${userId}`,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Content-Length': updatedData.length
//             }
//         }, (res) => {
//             expect(res.statusCode).toBe(200);
//             let data = '';
//             res.on('data', (chunk) => {
//                 data += chunk;
//             });
//             res.on('end', () => {
//                 const updatedUser = JSON.parse(data);
//                 expect(updatedUser).toHaveProperty('id', userId);
//                 expect(updatedUser).toHaveProperty('name', 'John Doe');
//                 done();
//             });
//         });

//         req.write(updatedData);
//         req.end();
//     });

//     test('DELETE /api/users/{userId} - Delete created record', (done) => {
//         request({
//             method: 'DELETE',
//             port: PORT,
//             path: `/api/users/${userId}`,
//         }, (res) => {
//             expect(res.statusCode).toBe(204);
//             done();
//         });
//     });

//     test('GET /api/users/{userId} - Get deleted record by id', (done) => {
//         request(`http://localhost:${PORT}/api/users/${userId}`, (res) => {
//             expect(res.statusCode).toBe(404);
//             done();
//         });
//     });
});
