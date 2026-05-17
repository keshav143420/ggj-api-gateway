"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'super-secret-key',
    services: {
        users: process.env.USER_SERVICE_URL || 'http://user-service:3001',
        posts: process.env.POST_SERVICE_URL || 'http://post-service:3002',
        connections: process.env.CONNECTION_SERVICE_URL || 'http://connection-service:3003',
        feed: process.env.FEED_SERVICE_URL || 'http://feed-service:3004',
    },
};
//# sourceMappingURL=env.js.map