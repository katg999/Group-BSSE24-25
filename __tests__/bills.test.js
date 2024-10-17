const { app, server } = require('../index'); // Ensure both app and server are imported
const request = require('supertest');

describe('GET /api/bills', () => {
	it('should return a bills of the different users', async () => {
		const response = await request(app).get('/api/bills');

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('bills');
		expect(response.body.bills).toBeInstanceOf(Array);
		expect(response.body.bills.length).toBeGreaterThan(0);

		expect(response.body.bills[0]).toHaveProperty('id');
		expect(response.body.bills[0]).toHaveProperty('amount');
		expect(response.body.bills[0]).toHaveProperty('description');

		expect(response.body.bills[0]).toEqual({
			id: 1,
			amount: 100,
			description: 'Bill 1',
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
