const { app, server } = require('../index'); // Ensure both app and server are imported
const request = require('supertest');

describe('GET /api/users', () => {
	it('should return a list of users', async () => {
		const response = await request(app).get('/api/users');

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('users');
		expect(response.body.users).toBeInstanceOf(Array);
		expect(response.body.users.length).toBeGreaterThan(0);

		expect(response.body.users[0]).toHaveProperty('id');
		expect(response.body.users[0]).toHaveProperty('username');
		expect(response.body.users[0]).toHaveProperty('email');

		expect(response.body.users[0]).toEqual({
			id: 1,
			username: 'user1',
			email: 'user1@example.com',
		});
	});
});

// Close the server after all tests
afterAll((done) => {
	if (server) {
		// Check if server is defined
		server.close(done);
	} else {
		done(); // Call done immediately if server is undefined
	}
});
