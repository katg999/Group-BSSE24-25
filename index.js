const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/connectDb');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoute');
const billsRoutes = require('./routes/billsRoute');
const path = require('path');

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Sample data for /api/users endpoint
const sampleUsers = [
	{ id: 1, username: 'user1', email: 'user1@example.com' },
	{ id: 2, username: 'user2', email: 'user2@example.com' },
];

// Sample route for /api/users
app.get('/api/users', (req, res) => {
	res.json({ users: sampleUsers });
});

// Sample data for testing
const sampleBills = [
	{ id: 1, amount: 100, description: 'Bill 1' },
	{ id: 2, amount: 200, description: 'Bill 2' },
];

// Sample route for /api/Bills
app.get('/api/bills', (req, res) => {
	res.json({ bills: sampleBills }); // Change 'users' to 'bills'
});

// Serve static files
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const PORT = process.env.PORT || 4001;

if (process.env.NODE_ENV !== 'test') {
	const server = app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});

	// Export the server for testing
	module.exports = { app, server };
} else {
	// Export the app for testing without starting the server
	module.exports = { app };
}
