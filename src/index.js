import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import categoriesRoutes from './routes/categoriesRoutes.js';

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use(categoriesRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));