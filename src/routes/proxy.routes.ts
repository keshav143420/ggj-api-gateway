import { Router } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { config } from '../config/env';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

const proxyOptions = (target: string): Options => ({
  target,
  changeOrigin: true,
  pathRewrite: (path, req) => path.replace(/^\/api/, ''), // Remove /api prefix when forwarding
  onProxyReq: (proxyReq: any, req: any, res: any) => {
      // Forward the user info if authenticated
      if (req.user) {
          proxyReq.setHeader('x-user-id', req.user.id || req.user.userId || '');
      }
  },
  onError: (err: any, req: any, res: any) => {
      console.error(`Proxy Error: ${err.message}`);
      res.status(502).json({ message: 'Bad Gateway' });
  }
});

// Apply auth middleware to protect the routes, but we might want some public routes in users service (like login)
// For this example, let's assume all /api/* routes except login are protected. 
// A better pattern is to handle public/private selectively.
// For simplicity as requested, we'll route these to services.

router.use('/users', createProxyMiddleware(proxyOptions(config.services.users)));
router.use('/posts', authMiddleware, createProxyMiddleware(proxyOptions(config.services.posts)));
router.use('/connections', authMiddleware, createProxyMiddleware(proxyOptions(config.services.connections)));
router.use('/feed', authMiddleware, createProxyMiddleware(proxyOptions(config.services.feed)));

export default router;
