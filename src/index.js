import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import categoriesRoutes from './routes/categoriesRoutes.js';
import gamesRoutes from './routes/gamesRoutes.js';

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use(categoriesRoutes);
app.use(gamesRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));