import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/database';
import boardRoutes from './routes/boardRoutes';
import listRoutes from './routes/listRoutes';
import cardRoutes from './routes/cardRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

connectDB();

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',        // Local development
  'https://azazza.netlify.app',   // Netlify frontend
  process.env.FRONTEND_URL || ''  // Environment variable backup
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    console.log('Request from origin:', origin); // For debugging
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Trello Clone API is running',
    version: '1.0.0'
  });
});

app.use('/api/boards', boardRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/cards', cardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export default app;