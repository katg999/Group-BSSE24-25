import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // To get __dirname in ES6 modules
import connectDb from './config/connectDb.js'; // Add .js extension in ES6 imports
import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoute.js';
import billsRoutes from './routes/billsRoute.js';

dotenv.config();
connectDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bills', billsRoutes);

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, './client/build')));

// Catch-all for serving React app
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Set up the PORT
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
