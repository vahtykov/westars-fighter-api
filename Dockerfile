# Build stage
FROM node:20.17.0-bullseye-slim AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    autoconf \
    automake \
    libtool \
    nasm \
    pkg-config \
    libpng-dev \
    && npm install \
    && npm rebuild bcrypt --build-from-source

COPY . .

RUN npm run build

# Production stage
FROM node:20.17.0-bullseye-slim

WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install pm2 -g

COPY package*.json ./

# Install production dependencies and required packages
RUN apt-get update && apt-get install -y \
    autoconf \
    automake \
    libtool \
    nasm \
    pkg-config \
    libpng-dev \
    && npm ci --only=production \
    && npm cache clean --force \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy built application
COPY --from=builder /usr/src/app/dist ./dist

# Create PM2 ecosystem file
COPY ecosystem.config.js .

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]