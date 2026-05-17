import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'super-secret-key',
  services: {
    users: process.env.USER_SERVICE_URL || 'http://user-service:3001',
    posts: process.env.POST_SERVICE_URL || 'http://post-service:3002',
    connections: process.env.CONNECTION_SERVICE_URL || 'http://connection-service:3003',
    feed: process.env.FEED_SERVICE_URL || 'http://feed-service:3004',
  },
};
