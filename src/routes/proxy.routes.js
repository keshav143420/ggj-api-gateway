"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const env_1 = require("../config/env");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const proxyOptions = (target) => ({
    target,
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace(/^\/api/, ''), // Remove /api prefix when forwarding
    onProxyReq: (proxyReq, req, res) => {
        // Forward the user info if authenticated
        if (req.user) {
            proxyReq.setHeader('x-user-id', req.user.id || req.user.userId || '');
        }
    },
    onError: (err, req, res) => {
        console.error(`Proxy Error: ${err.message}`);
        res.status(502).json({ message: 'Bad Gateway' });
    }
});
// Apply auth middleware to protect the routes, but we might want some public routes in users service (like login)
// For this example, let's assume all /api/* routes except login are protected. 
// A better pattern is to handle public/private selectively.
// For simplicity as requested, we'll route these to services.
router.use('/users', (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptions(env_1.config.services.users)));
router.use('/posts', auth_middleware_1.authMiddleware, (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptions(env_1.config.services.posts)));
router.use('/connections', auth_middleware_1.authMiddleware, (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptions(env_1.config.services.connections)));
router.use('/feed', auth_middleware_1.authMiddleware, (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptions(env_1.config.services.feed)));
exports.default = router;
//# sourceMappingURL=proxy.routes.js.map