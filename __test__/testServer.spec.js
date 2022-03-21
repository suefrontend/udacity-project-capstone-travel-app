const request = require('supertest');
const app = require('../src/server/server.js');

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe('Testing express server', () => {
	test('It should response the GET method', async () => {
		const response = await request(app).get('/');
		expect(response.statusCode).toBe(200);
	});
});
