import express, { Express, Request, Response, NextFunction } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import logger from './config/logger';
import { apiLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import sampleRoutes from './routes/samples';
import testRoutes from './routes/tests';
import dashboardRoutes from './routes/dashboard';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg) } }));
app.use(express.json({ limit: process.env.MAX_REQUEST_SIZE || '10mb' }));
app.use(express.urlencoded({ limit: process.env.MAX_REQUEST_SIZE || '10mb', extended: true }));

// Rate limiting
if (process.env.ENABLE_RATE_LIMITING !== 'false') {
  app.use('/api/', apiLimiter);
}

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/organizations/:orgId/labs/:labId/samples', sampleRoutes);
app.use('/api/v1/organizations/:orgId/labs/:labId/tests', testRoutes);
app.use('/api/v1/organizations/:orgId/labs/:labId/dashboard', dashboardRoutes);

// Health check
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use(errorHandler);

// Graceful shutdown
const gracefulShutdown = () => {
  logger.info('Graceful shutdown initiated');
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
app.listen(PORT, () => {
  logger.info(`LIS Backend running on port ${PORT}`);
});
