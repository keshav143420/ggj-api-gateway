# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies needed for node-gyp and native modules if any
RUN apk add --no-cache python3 make g++

# Copy package.json and lock file
COPY package*.json ./

# Install all dependencies including devDependencies for build
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npx tsc

# Stage 2: Production image
FROM node:18-alpine AS production

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy package.json and lock file
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy compiled code from the builder stage
COPY --from=builder /app/dist ./dist

# Create a non-root user and switch to it for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
