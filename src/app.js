import express from 'express';
import resourceRoutes from './routes/resourceRoutes.js';
import calculationRoutes from './routes/calculationRoutes.js';

const app = express();
app.use(express.json());

app.use('/resources', resourceRoutes);
app.use('/calculations', calculationRoutes);

export default app;
