import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimiter } from './middleware/rateLimit.middleware';
import { errorHandler } from './middleware/error.middleware';
import proxyRoutes from './routes/proxy.routes';

const app = express();

// Security and middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Only parses JSON if content-type is application/json

// Global Rate Limiting
app.use(rateLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes (Proxy)
app.use('/api', proxyRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
