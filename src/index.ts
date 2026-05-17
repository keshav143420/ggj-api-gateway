import app from './app';
import { config } from './config/env';

const startServer = () => {
  try {
    app.listen(config.port, () => {
      console.log(`API Gateway is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
